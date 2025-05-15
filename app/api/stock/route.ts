// app/api/product-image/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  const formData = await req.formData()

  const json = JSON.parse(formData.get('data') as string)
  const files: File[] = formData.getAll('files') as File[]

  try {
    const { productId, productImages } = json

    const createdImages = []

    let fileIndex = 0

    for (const imgGroup of productImages) {
      const { colorCode, name, stocks } = imgGroup

      // 1. Create ProductImage entry
      const productImage = await prisma.productImage.create({
        data: {
          colorCode,
          name,
          productId,
        },
      })

      // 2. Upload mediaFiles to Cloudinary and link to Media table
      for (let i = 0; i < imgGroup?.mediaFiles?.length; i++) {
        const file = files[fileIndex++]
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const uploadRes = await new Promise<{ secure_url: string }>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: 'products' }, (err, result) => {
              if (err || !result) return reject(err)
              resolve(result)
            })
            .end(buffer)
        })

        await prisma.media.create({
          data: {
            url: uploadRes.secure_url,
            productImageId: productImage.id,
          },
        })
      }

      // 3. Save stock info for each size
      for (const stockEntry of stocks) {
        await prisma.productStock.create({
          data: {
            productImageId: productImage.id,
            sizeId: parseInt(stockEntry.sizeId),
            stock: stockEntry.stock,
          },
        })
      }

      createdImages.push(productImage)
    }

    return NextResponse.json({ success: true, productImages: createdImages })
  } catch (err) {
    console.log('[PRODUCT_IMAGE_POST_ERROR]', err)
    return NextResponse.json({ error: 'Failed to save product images' }, { status: 500 })
  }
}
