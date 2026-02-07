import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const service = await prisma.service.create({
            data: {
                title: data.title,
                description: data.description,
                icon: data.icon,
                features: JSON.stringify(data.features || []),
                order: data.order || 0,
            },
        });
        return NextResponse.json(service, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
    }
}
