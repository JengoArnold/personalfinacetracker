import { auth } from "@/auth";
import { NextResponse } from "next/server";
import pool from "@/lib/database";

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json(
                { message: "Not authenticated" },
                { status: 401 }
            );
        }

        const userId = (
            session.user as typeof session.user & { id: string }
        ).id;

        const [rows] = await pool.execute(
            `SELECT * FROM transactions
             WHERE user_id = ?`,
            [userId]
        );

        return NextResponse.json({
            transactions: rows
        });

    } catch (error) {
        console.error("Fetching transactions failed:", error);

        return NextResponse.json(
            { message: "Failed to fetch transactions" },
            { status: 500 }
        );
    }
}

export async function POST(request:Request) {
   try{
const session = await auth();
 
if(!session?.user){
    return NextResponse.json(
        {message:"not authenticated"},
        { status:401}
    );
}

// logged in users database ID 
const userId = (
 session.user as typeof session.user & { id: string }
).id;

//read the information sent to the front end 
 const body = await request.json()




}

   }
}