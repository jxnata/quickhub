import mongoose, { Schema } from "mongoose";
import IMember from "./types";

const MemberSchema = new Schema<IMember>({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	project: {
		type: Schema.Types.ObjectId,
		ref: "Project",
	},
	role: {
		type: String,
		enum: ["owner", "editor", "viewer"],
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

const Members = mongoose.model<IMember>("Member", MemberSchema, "Members");

export default Members;
