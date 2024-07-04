import { auth } from "@/helpers/auth"
import { connect } from "@/helpers/database"
import { serverLog } from "@/helpers/server-log"
import Members from "@/models/members"
import Tasks from "@/models/tasks"
import { Request } from "@/types/api"
import { NextResponse } from "next/server"

export const PUT = auth(async function (req: Request, { params }) {
    try {
        if (!req.auth || !req.auth.user) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

        if (!params) return NextResponse.json({ message: "Not found" }, { status: 404 })

        await connect()

        const task = await Tasks.findById(params.id)

        if (!task) return NextResponse.json({ message: "Task not found" }, { status: 404 })

        // check if user has access to modify tasks in this project
        const member = await Members.findOne({ user: req.auth.user.id, project: task.project, role: { $in: [1, 2] } })

        if (!member) return NextResponse.json({ message: "Not authorized to modify tasks" }, { status: 401 })

        const body = await req.json();

        // update task status
        await Tasks.updateOne({ _id: params.id }, { status: body.status });

        return NextResponse.json({ task }, { status: 200 });
    } catch (error) {
        serverLog(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
})
