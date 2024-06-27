import mongoose, { Schema } from "mongoose";
import ITask from "./types";

const TaskSchema = new Schema<ITask>({
	title: {
		type: String,
		required: true,
		unique: true,
		maxlength: 128,
	},
	description: {
		type: String,
		required: false,
		default: '',
		maxlength: 2048,
	},
	issue_id: {
		type: Number,
		required: true,
		max: 999999,
		min: 1,
	},
	project: {
		type: Schema.Types.ObjectId,
		ref: "Project",
	},
	status: {
		type: Number,
		enum: [0, 1, 2, 3],
		default: 0,
	},
	tags: {
		type: [String],
		default: [],
		maxlength: 32,
		trim: true,
	},
	priority: {
		type: Number,
		enum: [0, 1, 2],
		default: 0,
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	assignees: {
		type: [Schema.Types.ObjectId],
		ref: "User",
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

const Tasks = mongoose.models?.Task || mongoose.model<ITask>("Task", TaskSchema, "tasks");

export default Tasks;
