import { auth } from "@/helpers/auth"
import { connect } from "@/helpers/database"
import { serverLog } from "@/helpers/server-log"
import Users from "@/models/users"
import { Request } from "@/types/api"
import { NextResponse } from "next/server"

export const GET = auth(async function (req: Request) {
    try {
        if (!req.auth || !req.auth.user) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

        await connect()

        const user = await Users.findOne({ _id: req.auth.user.id }).select('+ai_api_key');

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        serverLog(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
})
