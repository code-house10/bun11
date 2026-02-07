import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } });
        return NextResponse.json(testimonials);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const testimonial = await prisma.testimonial.create({
            data: { name: data.name, role: data.role, text: data.text, image: data.image, rating: data.rating || 5, order: data.order || 0 },
        });
        return NextResponse.json(testimonial, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
    }
}
