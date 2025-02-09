import dbConnect from "@/lib/db";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json({
                error: "Please fill all credential details..."
            }, { status: 400 })
        }

        await dbConnect();

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return NextResponse.json(
                { error: "Email already registered" },
                { status: 400 }
            );
        }

        const newUser = new User({ email, password });
        await newUser.save();

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        );

    } catch (error) {
        console.log("register--err", error)
        return NextResponse.json({
            error: "Failed to register user"
        }, { status: 500 })
    }
}