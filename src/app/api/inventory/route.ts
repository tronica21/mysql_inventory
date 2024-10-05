/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handler untuk GET request (ambil semua inventory)
export async function GET() {
  try {
    const items = await prisma.inventory.findMany();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inventory items' }, { status: 500 });
  }
}

// Handler untuk POST request (tambah item baru)
export async function POST(request: Request) {
  try {
    const { name, quantity, price, unit, imagePath } = await request.json();

    // Validasi input jika perlu
    if (!name || !quantity || !price || !unit) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Buat item inventory baru di database
    const newItem = await prisma.inventory.create({
      data: {
        name,
        quantity,
        price,
        unit,
        imagePath, // field baru untuk menyimpan path gambar
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create new inventory item' }, { status: 500 });
  }
}
