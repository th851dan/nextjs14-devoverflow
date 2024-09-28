import { updateCookieConsent } from "@lib/actions/cookie.action";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const { success } = await updateCookieConsent(data);

    return NextResponse.json({ success });
  } catch (error) {
    console.error("Failed to save cookie in database:", error);
    return NextResponse.error();
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const updatedData = await updateCookieConsent(data);

    return NextResponse.json({ updatedData });
  } catch (error) {
    console.error("Failed to update cookie in database:", error);
    return NextResponse.error();
  }
};
