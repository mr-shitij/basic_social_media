import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id!;
    const { targetUserId } = await req.json();

    const record = await prisma.follows.create({
        data: {
            followerId: currentUserId,
            followingId: targetUserId,
        },
    });

    return NextResponse.json(record);
}

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id!;
    const targetUserId = req.nextUrl.searchParams.get('targetUserId');

    const record = await prisma.follows.delete({
        where: {
            followerId_followingId: {
                followerId: currentUserId,
                followingId: targetUserId!,
            },
        },
    });

  return NextResponse.json(record);
}