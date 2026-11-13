import { auth } from "@/auth";
import { NextResponse } from "next/server";
import pool from "@/lib/database";

export async function GET() {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json(
            {message:"Not authenticated user"},
            {status: 401 }
        );
    }
  const userId = (
    session.user as typeof session.user & { id: string }
).id;

const [rows] = await pool.execute(

 `SELECT * FROM  transactions WHERE user_id = ?`,
    [userId]
);

return NextResponse.json({
    transactions:rows
});
}

export async function POST(request:Request) {
   const body = await request.json();
   

}