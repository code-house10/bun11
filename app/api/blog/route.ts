import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(posts);
}

export async function POST(request: Request) {
    const data = await request.json();
    const post = await prisma.blogPost.create({
        data: { title: data.title, excerpt: data.excerpt, content: data.content, image: data.image, author: data.author || 'المدير', published: data.published ?? true },
    });
    return NextResponse.json(post, { status: 201 });
}
