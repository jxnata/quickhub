import { Document } from "mongoose";

export default interface IUser extends Document {
	name: string;
	email: string;
	image: string;
	username: string;
	customer_id: string;
	price_id: string;
	projects_limit: number;
	tasks_limit: number;
	has_access: boolean;
	created_at: Date;
}
