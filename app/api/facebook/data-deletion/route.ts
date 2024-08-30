import { NextResponse, NextRequest } from "next/server";
import crypto from 'crypto';
import { getUserByFacebookUserId , deleteUserV2 } from "@/lib/actions/user.action";

const APP_SECRET = process.env.FB_APP_SECRET || '';

const parseSignedRequest = (signedRequest: string): any => {
    const [encodedSig, payload] = signedRequest.split('.', 2);

    console.log("encodedSig: " + encodedSig);

    console.log("payload: " + payload);
  
    const sig = Buffer.from(encodedSig, 'base64').toString('hex');
    const data = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));

    console.log("APP_SECRET: " + APP_SECRET);

    console.log("sig: " + sig)
  
    const expectedSig = crypto
      .createHmac('sha256', APP_SECRET)
      .update(payload)
      .digest('hex');

    console.log("expectedSig: " + expectedSig);
  
    if (sig !== expectedSig) {
      throw new Error('Ungültige Signatur des signed_request!');
    }

    console.log("encodedData: " + data)
  
    return data;
};


export const POST = async (req: NextRequest, res: NextResponse) => {
  try {

    console.log("Start to delete user data: ")

    const bodyText = await req.text();

    console.log("Raw body text:", bodyText);

    // Verwandle den URL-encoded Body in ein Objekt
    const urlParams = new URLSearchParams(bodyText);
    // const body = Object.fromEntries(urlParams.entries());

    console.log("Parsed body:", urlParams);

    const signedRequest = urlParams.get('signed_request')

    console.log("get signedRequest: ") 
    console.log(signedRequest)

    if(!signedRequest) {
        console.log("signed_request error")
        return NextResponse.json({error: "signed_request error"});
    } 

    const data = parseSignedRequest(signedRequest);


    console.log("end parseSignedRequest: ")
    console.log(data)

    const facebookUserId = data.user_id;

    const { user } = await getUserByFacebookUserId({
          facebookUserId
    })

    if(user) {
      await deleteUserV2({
        clerkId: user.clerkId!,
      });
    }

    const statusUrl = `https://beta.2hand2chance.com/api/users/deletion-status?id=${user.clerkId}`;
    const confirmationCode = user.clerkId; // Verwende die user_id als Bestätigungscode

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
