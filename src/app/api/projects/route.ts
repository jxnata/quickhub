import { auth } from "@/helpers/auth"
import { connect } from "@/helpers/database"
import { serverLog } from "@/helpers/server-log"
import Members from "@/models/members"
import Projects from "@/models/projects"
import Users from "@/models/users"
import IUser from "@/models/users/types"
import { Request } from "@/types/api"
import { explode } from "@/utils/explode"
import { NextResponse } from "next/server"

export const POST = auth(async function (req: Request) {
    try {
        if (!req.auth || !req.auth.user) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

        await connect()

        const body = await req.json();

        // get project owner
        const owner = await Users.findOne({ _id: req.auth.user.id });

        if (!owner) return NextResponse.json({ error: 'User not found.' }, { status: 404 });

        // check number of projects for this owner
        if (owner.projects_count >= owner.projects_limit) return NextResponse.json({ error: `Limit of ${owner.projects_limit} projects reached` }, { status: 403 });

        // create project in database
        const project = await Projects.create({
            name: body.name,
            repository: body.repository,
            description: body.description,
            public: body.access === 'public',
            owner: owner._id
        });

        let include_owner = false;
        if (body.members) {
            // check if owner is included in members
            include_owner = body.members.includes(owner.username)

            const members = explode(body.members)

            // find users and create members
            const users = await Users.find({ username: { $in: members } });

            await Members.insertMany(users.map(user => ({
                user: user._id,
                project: project._id,
                role: user._id === owner._id ? 2 : 1
            })))
        }

        // create member for owner if not included
        if (!include_owner) {
            await Members.create({
                user: owner._id,
                project: project._id,
                role: 2
            })
        }

        // update projects count
        await Users.updateOne({ _id: owner._id }, { $inc: { projects_count: 1 } });

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
