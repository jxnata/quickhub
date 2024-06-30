import { auth } from "@/helpers/auth"
import { connect } from "@/helpers/database"
import { NextResponse } from "next/server"
import { Request } from "@/types/api"
import Projects from "@/models/projects"
import { serverLog } from "@/helpers/server-log"
import IProject from "@/models/projects/types"

export const GET = auth(async function (req: Request, { params }) {
    try {
        if (!req.auth || !req.auth.user) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

        await connect()

        if (!params) return NextResponse.json({ message: "Not found" }, { status: 404 })

        const project = await Projects.findOne({ repository: params.org + '/' + params.name })

        if (!project) return NextResponse.json({ message: "Project not found" }, { status: 404 })

        return NextResponse.json({ project }, { status: 200 });
    } catch (error) {
        serverLog(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
})
