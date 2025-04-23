import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
  // Singleton Prisma client

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Pagination
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const skip = (page - 1) * pageSize;

    // Filters
    const categoryIds = searchParams.get("categoryId")?.split(",").map(Number).filter(id => !isNaN(id)) || [];
    const categoryNames = searchParams.get("category")?.split(",").map(name => name.trim()) || [];
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const size = searchParams.get("size");

    // Build filter object
    const filters: any = {};

    if (categoryIds.length > 0 || categoryNames.length > 0) {
      filters.OR = [];

      if (categoryIds.length > 0) {
        filters.OR.push({
          categoryId: { in: categoryIds },
        });
      }

      if (categoryNames.length > 0) {
        filters.OR.push({
          category: {
            name: { in: categoryNames, mode: "insensitive" },
          },
        });
      }
    }

    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice && !isNaN(Number(minPrice))) filters.price.gte = Number(minPrice);
      if (maxPrice && !isNaN(Number(maxPrice))) filters.price.lte = Number(maxPrice);
    }

    if (size) {
      filters.images = {
        some: {
          size: {
            size,
          },
        },
      };
    }

    // Query products with filters and pagination
    const products = await prisma.product.findMany({
      where: filters,
      include: {
        category: { select: { name: true } }, // Include category name
        images: {
          select: {
            id: true,
            colorCode:true,
            name:true,
            media:{
              select:{
                id:true,
                url:true
              }
            }
          
          },
        },
      },
      skip,
      take: pageSize,
    });

    // Get total count of products matching filters
    const totalProducts = await prisma.product.count({ where: filters });

    // Transform the response to match the expected format
    const formattedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      categoryName: product.category?.name || null, // Include category name in response
      images: product.images.length > 0
        ? {
            id: product.images[0].id,
            media: product.images[0].media, 
          }
        : null,
    }));

    return NextResponse.json(
      {
        total: totalProducts,
        page,
        pageSize,
        totalPages: Math.ceil(totalProducts / pageSize),
        data: formattedProducts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

