import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { BASE_PATH_SERVICES } from './env';

export function middleware(request: NextRequest) {
    console.log(request.nextUrl.pathname)
    if (request.nextUrl.pathname.startsWith('/img')) {
        const headers = new Headers(request.headers);
        headers.set("fluffy-user", "martin");
        console.log(headers);
        return NextResponse.rewrite(`${BASE_PATH_SERVICES}${request.nextUrl.pathname}`, {
            headers: headers
        });
    }

    NextResponse.next();
}