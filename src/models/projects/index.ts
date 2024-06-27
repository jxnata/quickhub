import mongoose, { Schema } from "mongoose";
import IProject from "./types";

const ProjectSchema = new Schema<IProject>({
	name: {
		type: String,
		required: true,
		unique: true,
		maxlength: 128,
	},
	description: {
		type: String,
		required: true,
		maxlength: 1024,
	},
	repository: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		maxlength: 128,
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	public: {
		type: Boolean,
		default: false,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

const Projects = mongoose.models?.Project || mongoose.model<IProject>("Project", ProjectSchema, "projects");

export default Projects;
