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
}
