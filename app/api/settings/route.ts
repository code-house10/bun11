import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        let settings = await prisma.settings.findUnique({ where: { id: 'settings' } });
        if (!settings) {
            settings = await prisma.settings.create({
                data: { id: 'settings' },
            });
        }
        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const data = await request.json();
    const settings = await prisma.settings.upsert({
        where: { id: 'settings' },
        update: {
            siteName: data.siteName,
            phone: data.phone,
            email: data.email,
            address: data.address,
            facebook: data.facebook,
            twitter: data.twitter,
            instagram: data.instagram,
            whatsapp: data.whatsapp,
        },
        create: {
            id: 'settings',
            siteName: data.siteName,
            phone: data.phone,
            email: data.email,
            address: data.address,
            facebook: data.facebook,
            twitter: data.twitter,
            instagram: data.instagram,
            whatsapp: data.whatsapp,
        },
    });
    return NextResponse.json(settings);
}
