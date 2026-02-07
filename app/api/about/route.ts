import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        let about = await prisma.about.findUnique({ where: { id: 'about' } });
        if (!about) {
            about = await prisma.about.create({ data: { id: 'about' } });
        }
        return NextResponse.json(about);
    } catch (error) {
        console.error('Error fetching about:', error);
        return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const data = await request.json();
    const about = await prisma.about.upsert({
        where: { id: 'about' },
        update: {
            title: data.title,
            description: data.description,
            image1: data.image1,
            image2: data.image2,
            experience: data.experience,
            feature1Title: data.feature1Title,
            feature1Desc: data.feature1Desc,
            feature2Title: data.feature2Title,
            feature2Desc: data.feature2Desc,
        },
        create: {
            id: 'about',
            title: data.title,
            description: data.description,
            image1: data.image1,
            image2: data.image2,
            experience: data.experience,
            feature1Title: data.feature1Title,
            feature1Desc: data.feature1Desc,
            feature2Title: data.feature2Title,
            feature2Desc: data.feature2Desc,
        },
    });
    return NextResponse.json(about);
}
