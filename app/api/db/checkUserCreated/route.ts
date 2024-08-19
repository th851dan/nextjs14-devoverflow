// pages/api/checkUserCreated.ts (or app/api/checkUserCreated/route.ts if using the app directory)

import { NextRequest, NextResponse } from "next/server";
import { checkUserCreationFlag } from "@/lib/actions/user.action";

// Handle GET requests
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "Invalid or missing userId" },
      { status: 400 }
    );
  }

  try {
    const isUserCreated = await checkUserCreationFlag(userId);

    return NextResponse.json({ created: isUserCreated }, { status: 200 });
  } catch (error) {
    console.error("Error checking user creation status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
