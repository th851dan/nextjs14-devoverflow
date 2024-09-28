import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";
import {
  getUserByFacebookUserId,
} from "@lib/actions/user.action";
import { deleteUserWithClerkClient } from "@lib/clerkclient";

const APP_SECRET = process.env.FB_APP_SECRET || '';

const parseSignedRequest = (signedRequest: string): any => {
  const [encodedSig, payload] = signedRequest.split('.', 2);

  const sig = Buffer.from(encodedSig, 'base64').toString('hex');
  const data = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));

  const expectedSig = crypto
    .createHmac('sha256', APP_SECRET)
    .update(payload)
    .digest('hex');

  if (sig !== expectedSig) {
    throw new Error('Ungültige Signatur des signed_request!');
  }

  return data;
};


export const POST = async (req: NextRequest, res: NextResponse) => {
  try {

    const bodyText = await req.text();

    // Verwandle den URL-encoded Body in ein Objekt
    const urlParams = new URLSearchParams(bodyText);
    // const body = Object.fromEntries(urlParams.entries());

    const signedRequest = urlParams.get('signed_request')

    if (!signedRequest) {
      console.log("signed_request error")
      return NextResponse.json({ error: "signed_request error" });
    }

    const data = parseSignedRequest(signedRequest);


    const facebookUserId = data.user_id;

    const { user } = await getUserByFacebookUserId({
      facebookUserId,
    });

    if (user) {
      await deleteUserWithClerkClient({
        clerkId: user.id!,
      });

    } else {
      console.error(`User with facebook_id ${facebookUserId} not found`);
      return NextResponse.json({
        error: `User with facebook_id ${facebookUserId} not found`,
      });
    }

    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("host");
    const fullUrl = `${protocol}://${host}`;
    const statusUrl = `${fullUrl}/api/users/deletion-status?id=${user?.id}`;
    const confirmationCode = user?.id; // Verwende die user_id als Bestätigungscode

    const responseData = {
      url: statusUrl,
      confirmation_code: confirmationCode,
    };

    return NextResponse.json(responseData);

  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
