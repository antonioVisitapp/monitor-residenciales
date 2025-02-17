import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest) {
    try {


        const token = request.cookies.get('Bearer');

        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.next();

        
    } catch (error) {
        console.log(error)
    }
}
export const config={
    matcher:['protected:/login,']
}