import { editWhatsappGroup, getWhatsappGroups, saveWhatsappGroup } from "@lib/actions/whatsapp.action";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from '@clerk/backend'
import { getUserById } from "@lib/actions/user.action";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get('page') ?? '1';
    const pageSize = url.searchParams.get('pageSize') ?? '10';
    const filter = url.searchParams.get('filter') ?? 'diep';
    const searchQuery = url.searchParams.get('searchQuery') ?? '';

    const { whatsappGroup, isNext } = await getWhatsappGroups({
      searchQuery,
      filter,
      page: Number(page),
      pageSize: Number(pageSize),
    }
    );

    return NextResponse.json({ whatsappGroup, isNext });
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return NextResponse.error();
  }
};


export const POST = async (req: NextRequest) => {

  try {
    let user = null

    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    // Token verifizieren
    let verifiedToken = null;
    try {
      verifiedToken = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      })

    } catch (error) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
    }

    if (verifiedToken != null) {
      user = await getUserById({ userId: verifiedToken.sub });
    }
    if (user !== undefined && user !== null) {

      const numbersString = process.env.PRECIOUS_NUMBER || "";
      const preciousNumbers = numbersString.split(',').map(Number);
      const isNumberInArray = preciousNumbers.includes(user.preciousNumber);
      if (isNumberInArray) {
        const data = await req.json();
        await saveWhatsappGroup(data)
        return NextResponse.json({ data });
      } else {
        return NextResponse.json({ message: 'Invalid role' }, { status: 403 });
      }
    }

  } catch (error) {
    console.error('Failed to save whatsapp group:', error);
    return NextResponse.error();
  }

}


export const PUT = async (req: NextRequest) => {

  try {

    let user = null

    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    // Token verifizieren
    let verifiedToken = null;
    try {

      console.log()
      verifiedToken = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      })

    } catch (error) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
    }

    if (verifiedToken != null) {
      user = await getUserById({ userId: verifiedToken.sub });
    }

    if (user !== undefined && user !== null) {

      const numbersString = process.env.PRECIOUS_NUMBER || "";
      const preciousNumbers = numbersString.split(',').map(Number);
      const isNumberInArray = preciousNumbers.includes(user.preciousNumber);
      if (isNumberInArray) {
        const data = await req.json();
        const updatedData = await editWhatsappGroup(data)
        return NextResponse.json({ updatedData });
      } else {
        return NextResponse.json({ message: 'Invalid role' }, { status: 403 });
      }
    }

  } catch (error) {
    console.error('Failed to save whatsapp group:', error);
    return NextResponse.error();
  }

}


