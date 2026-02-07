import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const slide = await prisma.heroSlide.findUnique({
            where: { id },
        });
        if (!slide) {
            return NextResponse.json({ error: 'Hero slide not found' }, { status: 404 });
        }
        return NextResponse.json(slide);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch hero slide' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await request.json();
        const slide = await prisma.heroSlide.update({
            where: { id },
            data: {
                title: data.title,
                subtitle: data.subtitle,
                description: data.description,
                image: data.image,
                order: data.order,
            },
        });
        return NextResponse.json(slide);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update hero slide' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.heroSlide.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete hero slide' }, { status: 500 });
    }
}
