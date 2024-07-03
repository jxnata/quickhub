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
		type: Number,
		enum: [0, 1, 2],
		default: 0,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

const Members: mongoose.Model<IMember> = mongoose.models?.Member || mongoose.model<IMember>("Member", MemberSchema, "members");

export default Members;
