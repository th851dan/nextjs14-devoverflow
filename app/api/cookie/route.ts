import {
  saveCookieConsent,
  updateCookieConsent,
} from "@/lib/actions/cookie.action";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    await saveCookieConsent(data);

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Failed to save whatsapp group:", error);
    return NextResponse.error();
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const updatedData = await updateCookieConsent(data);

    return NextResponse.json({ updatedData });
  } catch (error) {
    console.error("Failed to save whatsapp group:", error);
    return NextResponse.error();
  }
};
