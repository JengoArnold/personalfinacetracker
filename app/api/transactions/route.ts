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


export async function POST(request: Request) {
    try {
        // 1. Check the user's login session
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json(
                { message: "Not authenticated" },
                { status: 401 }
            );
        }

        // 2. Get the logged-in user's database ID
        const userId = (
            session.user as typeof session.user & { id: string }
        ).id;

        // 3. Read the information sent by the frontend
        const body = await request.json();

        const {
            category_id,
            amount,
            description,
            transaction_date
        } = body;

        // 4. Validate required fields
        if (
            !category_id ||
            !amount ||
            !transaction_date
        ) {
            return NextResponse.json(
                { message: "Please provide all required fields" },
                { status: 400 }
            );
        }

        // 5. Validate the amount
        if (typeof amount !== "number" || amount <= 0) {
            return NextResponse.json(
                { message: "Amount must be a positive number" },
                { status: 400 }
            );
        }

        // 6. Insert the transaction into MySQL
        const [result] = await pool.execute(
            `INSERT INTO transactions
            (user_id, category_id, amount, description, transaction_date)
            VALUES (?, ?, ?, ?, ?)`,
            [
                userId,
                category_id,
                amount,
                description || null,
                transaction_date
            ]
        );

        // 7. Return a success response
        return NextResponse.json(
            {
                message: "Transaction added successfully",
                transactionId: (result as { insertId: number }).insertId
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Transaction creation failed:", error);

        return NextResponse.json(
            { message: "Failed to create transaction" },
            { status: 500 }
        );
    }
}

