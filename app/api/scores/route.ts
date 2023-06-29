import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Passage from "@passageidentity/passage-node";

const passage = new Passage({
  appID: process.env.NEXT_PUBLIC_PASSAGE_ID as string,
  apiKey: process.env.PASSAGE_API_KEY as string,
});

interface RequestBody {
  userId?: string;
  score?: number;
}

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Authenticate Users
    let userID = await passage.authenticateRequest({
      ...request,
      headers: { ...request.headers, cookie: request.cookies.toString() },
    });
    if (userID) {
      const { userId, score } = (await request.json()) as RequestBody;
      if (!userId || score === undefined) {
        return NextResponse.json(
          { message: "Missing fields." },
          { status: 400 }
        );
      } else {
        try {
          const newScore = await prisma.score.create({
            data: {
              userId,
              score,
            },
          });

          return NextResponse.json(newScore);
        } catch (error) {
          console.log(error);

          return NextResponse.json(
            { message: "Error creating score." },
            { status: 500 }
          );
        }
      }
    } else {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Could not authenticate" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const scores = await prisma.score.findMany({
      orderBy: {
        score: "desc",
      },
      take: 20,
      include: {
        user: true,
      },
    });

    return NextResponse.json(scores);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Error retrieving scores." },
      { status: 500 }
    );
  }
}
