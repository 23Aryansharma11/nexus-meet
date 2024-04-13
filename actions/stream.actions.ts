"use server";

import { currentUser } from "@clerk/nextjs";
import { StreamClient } from "@stream-io/node-sdk";
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async ()=>{
    const user = await currentUser();

    if(!user) throw new Error("User not authenticated | Logged in")
    if(!apiKey) throw new Error("Missing Api key")
    if(!apiSecret) throw new Error("Missing Api Secret")
    
        const client = new StreamClient(apiKey, apiSecret, )
            //Expiry Date: Valid for 1 hour
        const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
            // Time the token was called
        const issued = Math.floor(Date.now()/1000) -60;

        const token = client.createToken(user.id, exp, issued)

        return token;
}