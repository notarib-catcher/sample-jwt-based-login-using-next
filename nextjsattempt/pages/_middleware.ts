/**
 * Note: Add redirects for a final deployment before building!!
 * ------------------------------------------------------------
 * Author: @ribcatcher35378
 * Dated: 10-4-2022
 * Copyright ©ribcatcher 2022 All rights reserved.
 */
import type { NextFetchEvent } from 'next/server'
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'


export async function middleware(request: NextRequest){
    
    let authcookie = request.cookies['usr_log_token']
    if(request.url.endsWith('/login') || request.url.endsWith('/api/auth')){
        try{
            verify(authcookie,"__DEVSECRET__")
            console.log('aaa')
            return NextResponse.redirect('http://localhost:3000/',302)
        }
        catch(error){
            return NextResponse.next()
        }
    }
    
    if(authcookie == null)
    {
        return NextResponse.redirect(new URL('/login', request.url),302)
    }
    try{
        verify(authcookie,"__DEVSECRET__")
        return NextResponse.next()
    }
    catch(error){
    
        return NextResponse.redirect(new URL('/login', request.url),302)
    }
    
    
}