import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params: { passage_id } }: { params: { passage_id: string } }
) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        passage_id: passage_id,
      },
    });

    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting user." },
      { status: 500 }
    );
  }
}
