import mongoose, { Schema } from "mongoose";
import IProject from "./types";

const ProjectSchema = new Schema<IProject>({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	repository: {
		type: String,
		required: true,
		unique: true,
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

const Projects = mongoose.model<IProject>("Project", ProjectSchema, "Projects");

export default Projects;
