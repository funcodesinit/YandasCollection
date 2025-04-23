import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// Get all orders (or customize this to return only user-specific ones)
export async function GET() {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

    
        const orders = await prisma.order.findMany({ 
            include:{
                orderItems:{
                   include:{
                        cartItem:{
                            include:{
                                product: {
                                    select: {
                                      name: true,
                                      price: true,
                                    },
                                  },
                                  productImage: {
                                    select: {
                                      media: {
                                        select: {
                                          url: true,
                                        },
                                        take: 1, // Only first image
                                      },
                                    },
                                  },
                                  size: {
                                    select: {
                                      id: true,
                                      size: true,
                                      range: true
                                    }
                                  }
                            }
                        }
                   }
                }
            }
        });

        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        console.error("GET /api/public/order error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}