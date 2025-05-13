
import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";
import { prisma } from "@/lib/prisma";
import cloudinary from "cloudinary";



cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_CLOUDINARY_API_SECRET,
});

 
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name, description, price, discount, stock, isPub, categoryId, 
      // images
    } = body

    if (!body || Object.keys(body).length === 0) {
      console.error("Error: Empty request body");
      return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
    }
    // Upload images to Cloudinary
    // const imagesWithUrls = await Promise.all(
    //   images.map(async (img: any) => {
    //     const uploadedMedia = await Promise.all(
    //       img.media.map(async (mediaBase64: string) => {
    //         const uploadResponse = await cloudinary.uploader.upload(mediaBase64, {
    //           folder: "products",
    //         });
    //         return uploadResponse.secure_url;
    //       })
    //     );

    //     return {
    //       colorCode: img.colorCode,
    //       name: img.name,
    //       mediaUrls: uploadedMedia,
    //       stock: img.stock,
    //     };
    //   })
    // );

    // console.log('about to save @POST api/products',)
    const processedInput = {
      name,
      description,
      price: parseFloat(price),
      discount: parseFloat(discount),
      stock: parseInt(stock),
      isPublished: isPub,
      category: { connect: { id: parseInt(categoryId) } },
      // images: {
      //   create: imagesWithUrls.map((img) => ({
      //     colorCode: img?.colorCode,
      //     name: img?.name,
      //     media: img.mediaUrls?.length ? { create: img.mediaUrls.map((url: string) => ({ url })) } : undefined,
      //     stock: img.stock?.length ? {
      //       create: img.stock.map((stockItem: any) => ({
      //         stock: parseInt(stockItem.stock),
      //         size: { connect: { id: parseInt(stockItem.sizeId) } },
      //       }))
      //     }
      //       : undefined
      //   })),
      // },
      // end images         
    }
    // console.log('[POST /api/products] Processed input:', processedInput);
    // Save product to the database
    const product = await prisma.product.create({
      data: processedInput
    });
    console.log('[POST /api/products] Product saved:', product);

    // ✅ Always return an object
    return NextResponse.json({
      success: true,
      product
    }, { status: 201 });

  } catch (error: any) {
    // console.log("Error at POST /api/products:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }

}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, description, price, discount, stock, isPub, categoryId, 
      // images
     } = body;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Validate product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { images: { select: { id: true } } },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const productImageIds = existingProduct.images.map(img => img.id);

    // Delete related Media and ProductStock
    await prisma.media.deleteMany({
      where: { productImageId: { in: productImageIds } },
    });

    await prisma.productStock.deleteMany({
      where: { productImageId: { in: productImageIds } },
    });

    // Delete ProductImages
    await prisma.productImage.deleteMany({
      where: { productId: parseInt(id) },
    });

    // Upload new images to Cloudinary and process them
    // const imagesWithUrls = await Promise.all(
    //   images.map(async (img: any) => {
    //     const uploadedMediaUrls = await Promise.all(
    //       img.media.map(async (mediaBase64: string) => {
    //         const uploadRes = await cloudinary.v2.uploader.upload(mediaBase64, {
    //           folder: "products",
    //         });
    //         return uploadRes.secure_url;
    //       })
    //     );

    //     return {
    //       colorCode: img.colorCode,
    //       name: img.name,
    //       mediaUrls: uploadedMediaUrls,
    //       stock: img.stock,
    //     };
    //   })
    // );


    const processedInput = {
      name,
      description,
      price: parseFloat(price),
      discount: parseFloat(discount),
      stock: parseInt(stock),
      isPublished: isPub,
      category: { connect: { id: parseFloat(categoryId) } },
      // images: {
      //   create: imagesWithUrls.map((img) => ({
      //     colorCode: img?.colorCode,
      //     name: img?.name,
      //     media: img.mediaUrls?.length ? { create: img.mediaUrls.map((url: string) => ({ url })) } : undefined,
      //     stock: img.stock?.length ? {
      //       create: img.stock.map((stockItem: any) => ({
      //         stock: parseInt(stockItem.stock),
      //         size: { connect: { id: parseInt(stockItem.sizeId) } },
      //       }))
      //     }
      //       : undefined
 
      //   })),
      // },
      // end images         
    }

    // Update the product fields
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: processedInput
 
    });

    return NextResponse.json({ success: true, product: updatedProduct }, { status: 200 });
  } catch (error: any) {
    console.error("Error at PATCH /api/products:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
