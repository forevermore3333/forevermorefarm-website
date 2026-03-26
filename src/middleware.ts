import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const password = process.env.STUDIO_PASSWORD

  // If no password is set, block access entirely
  if (!password) {
    return new NextResponse('Access Denied: Studio is not configured.', {
      status: 403,
    })
  }

  const authHeader = request.headers.get('authorization')

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ')

    if (scheme === 'Basic' && encoded) {
      const decoded = Buffer.from(encoded, 'base64').toString('utf-8')
      const [username, ...passwordParts] = decoded.split(':')
      const providedPassword = passwordParts.join(':')

      if (username === 'admin' && providedPassword === password) {
        return NextResponse.next()
      }
    }
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Sanity Studio"',
    },
  })
}

export const config = {
  matcher: ['/studio/:path*'],
}
