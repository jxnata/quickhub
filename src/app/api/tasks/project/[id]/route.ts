import { auth } from "@/helpers/auth"
import { connect } from "@/helpers/database"
import { serverLog } from "@/helpers/server-log"
import Members from "@/models/members"
import Tasks from "@/models/tasks"
import { Request } from "@/types/api"
import { NextResponse } from "next/server"

export const GET = auth(async function (req: Request, { params }) {
    try {
        if (!req.auth || !req.auth.user) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

        await connect()

        if (!params) return NextResponse.json({ message: "Please provide a project" }, { status: 404 })

        // check if user is member of project
        const member = await Members.findOne({ user: req.auth.user.id, project: params.id });

        if (!member) return NextResponse.json({ message: "Not authorized" }, { status: 401 })

        // get tasks from database
        const tasks = await Tasks.find({ project: params.id }).sort({ priority: 1 }).populate(['assignees', 'project']);

        // sort tasks by priority
        const sortMethod = (a: any, b: any) => a.priority - b.priority;

        const backlog = tasks.filter(task => task.status === 0).sort(sortMethod);
        const todo = tasks.filter(task => task.status === 1).sort(sortMethod);
        const in_progress = tasks.filter(task => task.status === 2).sort(sortMethod);
        const done = tasks.filter(task => task.status === 3).sort(sortMethod);

        return NextResponse.json({ tasks: { backlog, todo, in_progress, done } }, { status: 200 });
    } catch (error) {
        serverLog(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
})
