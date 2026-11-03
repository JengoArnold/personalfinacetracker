
import { NextResponse } from "next/server";
import pool from "@/lib/database";

export async function GET() {
    try {
        const [rows] = await pool.query("SELECT 1 AS result");

        return NextResponse.json({
            message: "Database connected successfully!",
            data: rows,
        });

    } catch (error) {
        console.error("Database connection failed:", error);

        return NextResponse.json(
            { message: "Database connection failed." },
            { status: 500 }
        );
    }
}
