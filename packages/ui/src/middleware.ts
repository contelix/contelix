import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { BASE_PATH_SERVICES } from './env';

export function middleware(request: NextRequest) {
    console.log(`Path: ${BASE_PATH_SERVICES}${request.nextUrl.pathname}`);
    if (request.nextUrl.pathname.startsWith('/img')) {
        const headers = new Headers(request.headers);
        headers.set("user", "martin");
        return NextResponse.rewrite(`${BASE_PATH_SERVICES}${request.nextUrl.pathname}`, {
            headers: headers
        });
    }

    NextResponse.next();
}