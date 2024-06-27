import mongoose, { Document } from "mongoose";

export default interface IProject extends Document<string> {
	name: string;
	repository: string;
	description: string;
	public: boolean;
	creator: mongoose.Types.ObjectId;
	created_at: Date;
}
