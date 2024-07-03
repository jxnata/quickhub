import mongoose, { Schema } from "mongoose";
import IUser from "./types";
import { plans } from "@/constants/plans";

const UserSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
		maxlength: 128,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		maxlength: 64,
	},
	username: {
		type: String,
		required: true,
		unique: true,
		maxlength: 64,
	},
	image: {
		type: String,
		maxlength: 128,
		required: true,
	},
	customer_id: {
		type: String,
		maxlength: 64,
		validate: (value: string) => value.startsWith("cus_"),
		select: false,
	},
	price_id: {
		type: String,
		maxlength: 64,
		validate: (value: string) => value.startsWith("price_"),
		select: false,
	},
	has_access: {
		type: Boolean,
		default: false,
	},
	projects_limit: {
		type: Number,
		required: true,
		default: plans.free.limits.projects,
	},
	tasks_limit: {
		type: Number,
		required: true,
		default: plans.free.limits.tasks,
	},
	ai_api_key: {
		type: String,
		maxlength: 128,
		select: false,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

const Users: mongoose.Model<IUser> = mongoose.models?.User || mongoose.model<IUser>("User", UserSchema, "users");

export default Users;
