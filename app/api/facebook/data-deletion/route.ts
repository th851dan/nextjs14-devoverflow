import { NextResponse, NextRequest } from "next/server";
import crypto from 'crypto';
// import { deleteUserV2 } from "@/lib/actions/user.action";

const APP_SECRET = process.env.FACEBOOK_APP_SECRET || '';

const parseSignedRequest = (signedRequest: string): any => {
    const [encodedSig, payload] = signedRequest.split('.', 2);

    console.log("encodedSig: " + encodedSig);

    console.log("payload: " + payload);
  
    const sig = Buffer.from(encodedSig, 'base64').toString('hex');
    const data = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
  
    const expectedSig = crypto
      .createHmac('sha256', APP_SECRET)
      .update(payload)
      .digest('hex');
  
    if (sig !== expectedSig) {
      throw new Error('Ungültige Signatur des signed_request!');
    }

    console.log("encodedData: " + data)
  
    return data;
};


export const POST = async (req: NextRequest, res: NextResponse) => {
  try {

    console.log("Start to delete user data: ")

    console.log("Request headers:", req.headers);

    console.log("Request body debug:", await req.text());

    const body = await req.json();

    console.log("Request body:", body);

    const signedRequest  = body.signedRequest;

    console.log("get signedRequest: ") 
    console.log(signedRequest)

    if(!signedRequest) {
        console.log("signed_request error")
        return NextResponse.json({error: "signed_request error"});
    } 

    const data = parseSignedRequest(signedRequest);


    console.log("end parseSignedRequest: ")
    console.log(data)

    const userId = data.user_id;

  /*   const { clerkId } = await deleteUserV2({
        clerkId: userId!,
      }); */

    const statusUrl = `https://beta.2hand2chance.com/api/users/deletion-status?id=${userId}`;
    const confirmationCode = userId; // Verwende die user_id als Bestätigungscode

    const responseData = {
      url: statusUrl,
      confirmation_code: confirmationCode,
    };

    console.log("ended to delete data user")

    return NextResponse.json(responseData);

  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
