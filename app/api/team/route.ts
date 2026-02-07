import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const members = await prisma.teamMember.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(members);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const member = await prisma.teamMember.create({
            data: {
                name: data.name,
                role: data.role,
                image: data.image,
                facebook: data.facebook,
                twitter: data.twitter,
                linkedin: data.linkedin,
                order: data.order || 0,
            },
        });
        return NextResponse.json(member, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
    }
}
