import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const slides = await prisma.heroSlide.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(slides);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch hero slides' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const slide = await prisma.heroSlide.create({
            data: {
                title: data.title,
                subtitle: data.subtitle,
                description: data.description,
                image: data.image,
                order: data.order || 0,
            },
        });
        return NextResponse.json(slide, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create hero slide' }, { status: 500 });
    }
}
