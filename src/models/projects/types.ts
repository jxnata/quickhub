import mongoose, { Document } from "mongoose";

export default interface IProject extends Document {
	name: string;
	repository: string;
	public: boolean;
	creator: mongoose.Types.ObjectId;
	created_at: Date;
}
