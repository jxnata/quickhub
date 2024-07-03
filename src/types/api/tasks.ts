import { Project } from "./projects";
import { User } from "./users";

export type Task = {
    _id: string;
    title: string;
    description: string;
    issue_id: number;
    status: number;
    tags: string[];
    priority: number;
    creator: string;
    project: Project;
    assignees: User[];
    created_at: Date;
}

export type TaskList = {
    tasks: {
        backlog: Task[],
        todo: Task[],
        in_progress: Task[],
        done: Task[],
    }
}

export type TaskView = {
    task: Task
}