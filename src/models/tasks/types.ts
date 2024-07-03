import mongoose, { Document } from "mongoose";

export default interface ITask extends Document<string> {
	title: string;
	description: string;
	issue_id: number;
	status: number; // 0 - backlog, 1 - todo, 2 - in progress, 3 - done
	tags: string[];
	priority: number;
	creator: mongoose.Types.ObjectId;
	project: mongoose.Types.ObjectId;
	assignees: mongoose.Types.ObjectId[];
	created_at: Date;
}
