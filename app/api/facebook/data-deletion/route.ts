import { NextApiResponse, NextApiRequest } from "next";
import crypto from 'crypto';
import { deleteUserWithFacebook } from "@/lib/actions/user.action";

const APP_SECRET = process.env.FACEBOOK_APP_SECRET || '';

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

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    const { signed_request } = await req.body();

    if(!signed_request) {
        return res.status(400).json({error: "signed_request error"});
    }

    const data = parseSignedRequest(signed_request);
    const userId = data.user_id;

    const { clerkId } = await deleteUserWithFacebook({
        clerkId: userId!,
      });

    const statusUrl = `https://beta.buddyknows.org/api/users/deletion?id=${userId}`;
    const confirmationCode = clerkId; // Verwende die user_id als Bestätigungscode

    const responseData = {
      url: statusUrl,
      confirmation_code: confirmationCode,
    };

    return res.status(200).json(responseData);

  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
