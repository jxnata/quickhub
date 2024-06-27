import { auth } from '@/helpers/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const session = await auth();

    if (request.nextUrl.pathname.startsWith('/app')) {

        if (!session) {
            const url = request.nextUrl.clone();
            url.pathname = '/auth';
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    }

    if (request.nextUrl.pathname.startsWith('/auth')) {

        if (session) {
            const url = request.nextUrl.clone();
            url.pathname = '/app';
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    }
}