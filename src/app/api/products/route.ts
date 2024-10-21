import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Asegúrate que la ruta sea correcta

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.error();
  }
}
