import { auth } from "@/auth";
import { NextResponse } from "next/server";


export async function GET () {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json(
            {message: "Not authenticated"},
            { status:401}
        );
    }
    return NextResponse.json({
        message : "Authentication successful",
        user: session.user,
        databaseUserId: session.user.id
    });
    
}