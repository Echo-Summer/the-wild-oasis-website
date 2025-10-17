import { auth } from './app/api/auth/[...nextauth]/route'

export const middleware = auth

// 配置需要保护的路由: 哪些路径需要经过这个 middleware
export const config = {
  matcher: ['/account'],
}
