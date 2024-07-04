import { auth } from "@/helpers/auth"
import { connect } from "@/helpers/database"
import { serverLog } from "@/helpers/server-log"
import Users from "@/models/users"
import IUser from "@/models/users/types"
import { Request } from "@/types/api"
import { NextResponse } from "next/server"

export const POST = auth(async function (req: Request) {
    try {
        if (!req.auth || !req.auth.user) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

        await connect()

        const body = await req.json();

        const user = await Users.findByIdAndUpdate(req.auth.user.id, {
            ai_api_key: body.ai_api_key,
        }, { new: true });

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        serverLog(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
})
