"use server"

import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export async function createOnrampTransaction(provider: string, amount: number){
    // create a transaction on onramp
    const session =  await getServerSession(authOptions)
    if(!session?.user || !session?.user?.id){
        return {
            message:"unauthorized request"
        }
    }

    const token = (Math.random() * 1000).toString();

    await prisma.onRampTransaction.create({
        data:{
            status:"Processing",
            startTime: new Date(),
            amount: amount * 100,
            userId:Number(session?.user?.id),
            token:token,
            provider
        }
    })
    return {
        message : "Done"
    }
}