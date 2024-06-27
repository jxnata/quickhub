import mongoose, { Document } from "mongoose";

export default interface IMember extends Document {
	user: mongoose.Types.ObjectId;
	project: mongoose.Types.ObjectId;
	role: number; // 2 = owner, 1 = editor, 0 = viewer
	created_at: Date;
}
