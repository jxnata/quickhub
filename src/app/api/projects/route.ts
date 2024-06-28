import { auth } from "@/helpers/auth"
import { connect } from "@/helpers/database"
import { serverLog } from "@/helpers/server-log"
import Members from "@/models/members"
import Projects from "@/models/projects"
import Users from "@/models/users"
import { Request } from "@/types/api"
import { NextResponse } from "next/server"

export const POST = auth(async function (req: Request) {
    try {
        if (!req.auth || !req.auth.user) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

        await connect()

        const body = await req.json();

        const owner = await Users.findOne({ _id: req.auth.user.id });

        if (!owner) return NextResponse.json({ error: 'User not found.' }, { status: 404 });

        const project = await Projects.create({
            name: body.name,
            repository: body.repository,
            description: body.description,
            public: body.access === 'public',
            owner: owner._id
        });

        await Members.create({
            user: owner._id,
            project: project._id,
            role: 2
        })

        return NextResponse.json({ project }, { status: 201 });
    } catch (error) {
        serverLog(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
})

export const GET = auth(async function (req: Request) {
    try {
        if (!req.auth || !req.auth.user) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

        await connect()

        const { searchParams } = new URL(req.url)

        const skip = Number(searchParams.get('skip') || '0')
        const limit = Number(searchParams.get('limit') || '0')

        const projects = await Projects.aggregate([
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: 'Tasks',
                    localField: '_id',
                    foreignField: 'project',
                    as: 'tasks',
                },
            },
            {
                $addFields: {
                    tasks_count: { $size: '$tasks' },
                },
            },
            {
                $project: {
                    tasks: 0,
                },
            },
        ]);

        return NextResponse.json({ projects, skip, limit }, { status: 200 });
    } catch (error) {
        serverLog(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
})
