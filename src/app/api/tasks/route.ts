import { auth } from "@/helpers/auth"
import { connect } from "@/helpers/database"
import { getOctokit } from "@/helpers/github"
import { serverLog } from "@/helpers/server-log"
import Projects from "@/models/projects"
import Tasks from "@/models/tasks"
import Users from "@/models/users"
import IUser from "@/models/users/types"
import { Request } from "@/types/api"
import { explode } from "@/utils/explode"
import { NextResponse } from "next/server"

export const POST = auth(async function (req: Request) {
    try {
        if (!req.auth || !req.auth.user) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

        const session = await auth()

        if (!session || !session.accessToken) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

        await connect()

        const body = await req.json();

        const owner = await Users.findOne<IUser>({ _id: req.auth.user.id });

        if (!owner) return NextResponse.json({ error: 'User not found.' }, { status: 404 });

        const octokit = getOctokit(session.accessToken)

        const issue = await octokit.issues.create({
            owner: owner.username,
            repo: body.project_repo.split('/')[1],
            title: body.title,
            body: body.description,
            labels: explode(body.tags),
            assignees: explode(body.assignees)
        })

        if (!issue || !issue.data) return NextResponse.json({ error: 'Error when creating github issue.' }, { status: 500 });

        const assignees = await Users.find<IUser>({ username: { $in: explode(body.assignees) } });

        const task = await Tasks.create({
            title: body.title,
            description: body.description,
            project: body.project_id,
            status: body.status,
            priority: body.priority,
            tags: explode(body.tags),
            assignees: assignees.map(u => u._id),
            issue_id: issue.data.number,
            creator: owner._id
        });

        return NextResponse.json({ task }, { status: 201 });
    } catch (error) {
        serverLog(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
})
