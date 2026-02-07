import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const stat = await prisma.stat.findUnique({ where: { id } });
    if (!stat) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(stat);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await request.json();
    const stat = await prisma.stat.update({
        where: { id },
        data: { value: data.value, suffix: data.suffix, label: data.label, order: data.order },
    });
    return NextResponse.json(stat);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await prisma.stat.delete({ where: { id } });
    return NextResponse.json({ success: true });
}
