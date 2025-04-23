import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const sizesId = await parseInt(params.id, 10);
    if (isNaN(sizesId)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const sizes = await prisma.productSize.findUnique({
      where: { id: sizesId }, 
    });

    if (!sizes) {
      return NextResponse.json({ error: "Product sizes not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        id: sizes.id,
        name: sizes.size,
        range: sizes.range,
  
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching product details:", error);
    return NextResponse.json(
      { error: "Failed to fetch product details" },
      { status: 500 }
    );
  }
}
