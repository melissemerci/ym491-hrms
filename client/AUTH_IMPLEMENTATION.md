# Authentication Implementation Guide

## Overview
This document describes the authentication and authorization implementation for the HRiQ application.

## Features Implemented

### 1. **Cookie-Based Authentication**
- Tokens are stored in HTTP cookies (not localStorage) for better security
- Cookies expire after 7 days
- SameSite: 'strict' policy for CSRF protection

### 2. **Route Protection with Middleware**
- Next.js middleware (`src/middleware.ts`) protects all routes
- Automatically redirects unauthenticated users to login
- Redirects authenticated users away from login page
- Preserves redirect URL for post-login navigation

### 3. **Global Auth State**
- `AuthProvider` wraps the entire app in `src/app/layout.tsx`
- Provides `useAuth()` hook for accessing user state anywhere
- Automatically fetches user data when token exists

### 4. **API Integration**
- Axios interceptor automatically adds Bearer token to requests
- Handles 401 errors by clearing token and redirecting to login
- Preserves current URL for redirect after login

### 5. **User Experience**
- Loading states during authentication checks
- Automatic redirect after successful login
- Logout functionality in dashboard
- User info displayed in dashboard header

## File Structure

```
client/src/
├── middleware.ts                          # Route protection
├── app/
│   ├── layout.tsx                         # AuthProvider wrapper
│   ├── page.tsx                           # Landing page (redirects if authenticated)
│   ├── login/
│   │   └── page.tsx                       # Login page
│   └── dashboard/
│       └── layout.tsx                     # Dashboard with logout
├── features/auth/
│   ├── api/
│   │   └── auth-api.ts                    # API calls
│   ├── hooks/
│   │   └── use-auth.ts                    # Auth hooks (useLogin, useLogout, useUser)
│   └── schemas.ts                         # Zod schemas
├── providers/
│   ├── auth-provider.tsx                  # Auth context provider
│   └── query-provider.tsx                 # React Query provider
└── lib/
    └── api.ts                             # Axios instance with interceptors
```

## How It Works

### Login Flow
1. User submits credentials on `/login` page
2. `useLogin()` hook sends credentials to backend `/api/base/auth/token`
3. Backend validates and returns JWT token
4. Token is stored in cookie via `Cookies.set('token', token, { expires: 7, sameSite: 'strict' })`
5. User query is invalidated to fetch fresh user data
6. User is redirected to dashboard (or original destination if redirect param exists)

### Route Protection
1. Middleware runs on every route change
2. Checks for token in cookies
3. If no token and route is protected → redirect to `/login?redirect=<current-path>`
4. If token exists and route is `/login` → redirect to `/dashboard`
5. Otherwise, allow navigation

### Authentication State
1. `AuthProvider` uses `useUser()` hook to fetch user data
2. User data is only fetched if token exists in cookies
3. Components can access auth state via `useAuth()` hook:
   ```tsx
   const { user, isLoading, isAuthenticated, error } = useAuth();
   ```

### Logout Flow
1. User clicks logout button
2. `useLogout()` hook removes token from cookies
3. React Query cache is cleared
4. User is redirected to `/login`

### API Request Flow
1. Request is made via axios instance
2. Request interceptor adds `Authorization: Bearer <token>` header
3. If response is 401:
   - Token is removed from cookies
   - User is redirected to `/login?redirect=<current-path>`

## Usage Examples

### Protecting a Page
Pages under `/dashboard` are automatically protected by middleware. No additional code needed.

### Accessing User Data
```tsx
import { useAuth } from '@/providers/auth-provider';

export default function MyComponent() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Not authenticated</div>;

  return <div>Welcome, {user.email}!</div>;
}
```

### Logging Out
```tsx
import { useLogout } from '@/features/auth/hooks/use-auth';

export default function LogoutButton() {
  const { mutate: logout, isPending } = useLogout();

  return (
    <button onClick={() => logout()} disabled={isPending}>
      {isPending ? 'Logging out...' : 'Logout'}
    </button>
  );
}
```

### Making Authenticated API Calls
```tsx
import { api } from '@/lib/api';

// Token is automatically added to headers
const response = await api.get('/api/base/employees');
```

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost  # Backend API URL
```

## Security Considerations

1. **Cookies over localStorage**: Cookies are more secure and can be set as HttpOnly in production
2. **SameSite Policy**: Prevents CSRF attacks
3. **Token Expiration**: Tokens expire after 7 days
4. **Automatic Logout**: 401 responses automatically log user out
5. **Route Protection**: Middleware ensures no unauthorized access to protected routes

## Testing the Implementation

1. **Start the backend**:
   ```bash
   cd backend
   docker-compose up
   ```

2. **Start the frontend**:
   ```bash
   cd client
   bun dev
   ```

3. **Test scenarios**:
   - Try accessing `/dashboard` without logging in → should redirect to `/login`
   - Login with valid credentials → should redirect to `/dashboard`
   - Refresh the page → should stay logged in
   - Click logout → should redirect to `/login`
   - Try accessing `/login` while logged in → should redirect to `/dashboard`

## Backend API Endpoints

- `POST /api/base/auth/token` - Login (returns JWT token)
- `POST /api/base/auth/register` - Register new user
- `GET /api/base/auth/me` - Get current user info

## Dependencies

- `js-cookie` - Cookie management
- `@tanstack/react-query` - Server state management
- `axios` - HTTP client
- `zod` - Schema validation
- `react-hook-form` - Form handling

