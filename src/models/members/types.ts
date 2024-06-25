import mongoose, { Document } from "mongoose";

export default interface IMember extends Document {
	user: mongoose.Types.ObjectId;
	project: mongoose.Types.ObjectId;
	role: string;
	created_at: Date;
}
