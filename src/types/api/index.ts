import { Session } from "next-auth";
import { NextRequest } from "next/server";

export interface Request extends NextRequest {
    auth: Session | null
}