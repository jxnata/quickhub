import mongoose, { Schema } from "mongoose";
import IUser from "./types";

const UserSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	image: {
		type: String,
	},
	customer_id: {
		type: String,
	},
	price_id: {
		type: String,
	},
	has_access: {
		type: Boolean,
		default: false,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

const Users = mongoose.model<IUser>("User", UserSchema, "Users");

export default Users;
