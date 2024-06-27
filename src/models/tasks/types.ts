import mongoose, { Document } from "mongoose";

export default interface ITask extends Document<string> {
	title: string;
	description: string;
	issue_id: number;
	status: number;
	tags: string[];
	priority: number;
	creator: mongoose.Types.ObjectId;
	project: mongoose.Types.ObjectId;
	assignees: mongoose.Types.ObjectId[];
	created_at: Date;
}
