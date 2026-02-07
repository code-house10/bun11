import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    const stats = await prisma.stat.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(stats);
}

export async function POST(request: Request) {
    const data = await request.json();
    const stat = await prisma.stat.create({
        data: { value: data.value, suffix: data.suffix, label: data.label, order: data.order || 0 },
    });
    return NextResponse.json(stat, { status: 201 });
}
