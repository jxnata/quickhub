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
	projects_count: number;
	tasks_count: number;
	has_access: boolean;
	ai_api_key: string;
	created_at: Date;
}
