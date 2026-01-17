# Stake Frontend - Skeleton & Setup Guide

## ✅ Completed Checklist

### 1. Project Structure ✅
- ✅ `/app` - Next.js App Router routes
- ✅ `/components` - UI components (ui + shared)
- ✅ `/features` - Feature modules (auth, friends, circles, bets, profile)
- ✅ `/lib` - Utilities (apiClient, auth, queryClient, utils)
- ✅ `/types` - Shared TypeScript type definitions
- ✅ `.env.local` - Environment configuration

### 2. Core Dependencies ✅
- ✅ Next.js 16 with App Router
- ✅ TypeScript with strict mode
- ✅ Tailwind CSS 4 for styling
- ✅ Radix UI primitives (Dialog, Navigation Menu, Tabs)
- ✅ TanStack Query v5 for server state
- ✅ React Context for auth state
- ✅ Lucide React for icons
- ✅ React Hook Form for forms (ready to use)
- ✅ Zod for validation (ready to use)

### 3. Authentication ✅
- ✅ `AuthContext` with login/signup/logout functions
- ✅ `useAuth()` hook for consuming auth state
- ✅ localStorage-based token persistence
- ✅ Auth guard component for route protection
- ✅ Automatic redirects (login → home, protected → login)

### 4. API Integration ✅
- ✅ Fetch-based `apiClient` wrapper (`lib/apiClient.ts`)
- ✅ Automatic Bearer token injection
- ✅ Standard error handling with `ApiError` class
- ✅ GET, POST, PUT, PATCH, DELETE methods
- ✅ Base URL from `NEXT_PUBLIC_API_BASE_URL` env var

### 5. TanStack Query ✅
- ✅ `QueryClient` configured with sensible defaults
- ✅ `Providers` wrapper for QueryClientProvider
- ✅ Ready for queries and mutations

### 6. Routing & Pages ✅

**Public Routes (No Auth Required):**
- ✅ `/login` - Login page
- ✅ `/signup` - Signup page

**Authenticated Routes (Protected):**
- ✅ `/home` - Home feed (main page)
- ✅ `/explore` - Explore public bets
- ✅ `/circles` - List user circles
- ✅ `/circles/[circleId]` - Circle detail page
- ✅ `/bets/[betId]` - Bet detail page
- ✅ `/profile` - User profile
- ✅ `/create-bet` - Create bet modal route

### 7. Navigation ✅
- ✅ Bottom navigation bar with 5 tabs:
  - Home (house icon)
  - Explore (compass icon)
  - Add Bet (plus icon - special styling)
  - Circles (users icon)
  - Profile (user icon)
- ✅ Active tab highlighting
- ✅ Persistent across authenticated pages
- ✅ Mobile-first design

### 8. Layout & Shell ✅
- ✅ `PageShell` component with header + content + bottom nav
- ✅ Responsive padding to avoid content overlap with bottom nav
- ✅ Dark mode support (Tailwind dark class)
- ✅ Placeholder cards on home and explore pages

### 9. Type Definitions ✅
All core entity types defined in `/types/index.ts`:
- ✅ `User`
- ✅ `Circle`
- ✅ `Bet`
- ✅ `BetOption`
- ✅ `BetParticipant`
- ✅ `StakeTemplate`
- ✅ `StakeInstance`
- ✅ `ProofUpload`
- ✅ `IdentityBadge`
- ✅ `ApiResponse<T>` - Generic API response wrapper
- ✅ `AuthToken` - Token response type
- ✅ `AuthState` - Auth context state type

### 10. Build & Dev ✅
- ✅ TypeScript compilation passes ✓
- ✅ Next.js build succeeds
- ✅ No ESLint errors
- ✅ Ready for `npm run dev`

---

## 📁 Project Structure

```
stake-app/
├── app/
│   ├── (auth)/                    # Public auth routes
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (authenticated)/           # Protected routes with bottom nav
│   │   ├── home/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── explore/page.tsx
│   │   ├── circles/
│   │   │   ├── page.tsx
│   │   │   └── [circleId]/page.tsx
│   │   ├── bets/[betId]/page.tsx
│   │   ├── profile/page.tsx
│   │   └── create-bet/page.tsx
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Redirects to /login
│   ├── providers.tsx              # Client-side providers (Query, Auth)
│   └── globals.css
├── components/
│   ├── ui/                        # UI component library (ready for shadcn)
│   └── shared/
│       ├── AuthGuard.tsx          # Route protection wrapper
│       ├── BottomNav.tsx          # Bottom navigation bar
│       └── PageShell.tsx          # Page layout with header + nav
├── features/
│   ├── auth/
│   │   ├── authContext.tsx        # Auth context provider
│   │   └── useAuth.ts             # useAuth hook
│   ├── friends/                   # Placeholder for friends feature
│   ├── circles/                   # Placeholder for circles feature
│   ├── bets/                      # Placeholder for bets feature
│   └── profile/                   # Placeholder for profile feature
├── lib/
│   ├── apiClient.ts               # Fetch-based API wrapper
│   ├── auth.ts                    # Auth storage utilities
│   ├── queryClient.ts             # TanStack Query configuration
│   └── utils.ts                   # Utility functions (cn, etc.)
├── types/
│   └── index.ts                   # All TypeScript type definitions
├── public/                        # Static assets
├── .env.local                     # Environment variables
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

---

## 🚀 Getting Started

### Installation
```bash
cd stake-app
npm install
```

### Development
```bash
npm run dev
```
Visit `http://localhost:3000` and you'll be redirected to `/login`.

### Build for Production
```bash
npm run build
npm start
```

### Type Checking
```bash
npm run build  # Includes TypeScript check
```

---

## 🔐 Authentication Flow

1. **Initial Load**: Check localStorage for token + user
2. **Login Page**: User enters email/password
   - POST to `/api/auth/login` → returns `{ user, token }`
   - Store token + user in localStorage
   - Redirect to `/home`
3. **Protected Routes**: `AuthGuard` checks `isAuthenticated`
   - If false → redirect to `/login`
4. **Logout**: Call `logout()` from `useAuth()` hook
   - Clears localStorage
   - Redirects to `/login`

### Using Auth in Components
```tsx
import { useAuth } from '@/features/auth/useAuth';

export default function MyComponent() {
  const { user, token, isAuthenticated, login, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated && <p>Hello, {user?.displayName}</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## 📡 API Integration

### Using the API Client
```tsx
import apiClient from '@/lib/apiClient';
import { User } from '@/types';

// Simple GET request
const user = await apiClient.get<User>('/users/me');

// POST with body
const newBet = await apiClient.post<Bet>('/bets', {
  title: 'Will it rain tomorrow?',
  options: [{ label: 'Yes' }, { label: 'No' }],
});

// Error handling
try {
  await apiClient.post('/auth/login', { email, password });
} catch (err) {
  if (err instanceof ApiError) {
    console.error(`API Error ${err.status}: ${err.message}`);
  }
}
```

### Using with TanStack Query
```tsx
import { useQuery, useMutation } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';
import { Bet } from '@/types';

// Query
const { data: bet, isLoading } = useQuery({
  queryKey: ['bets', betId],
  queryFn: () => apiClient.get<Bet>(`/bets/${betId}`),
});

// Mutation
const { mutate: createBet } = useMutation({
  mutationFn: (data: any) => apiClient.post<Bet>('/bets', data),
  onSuccess: () => {
    // Invalidate cache, show toast, etc.
  },
});
```

---

## 🎨 UI Components

### BottomNav
Automatically highlights active tab based on current route. 5 tabs with icons.

```tsx
import { BottomNav } from '@/components/shared/BottomNav';

// Included in PageShell, but can be used standalone:
<BottomNav />
```

### PageShell
Wraps content with header, auto-manages spacing for bottom nav.

```tsx
import { PageShell } from '@/components/shared/PageShell';

export default function MyPage() {
  return (
    <PageShell
      header={
        <div className="p-4">
          <h1>My Page</h1>
        </div>
      }
    >
      <div className="p-4">Content here</div>
    </PageShell>
  );
}
```

---

## 📝 Environment Variables

Edit `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

For production:
```
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

---

## 🧪 Next Steps - Features to Implement

1. **Login/Signup Integration**
   - Wire actual API endpoints in `authContext.tsx`
   - Add form validation with zod + react-hook-form

2. **Home Feed**
   - Query user's bets from `/api/bets?status=active`
   - Display bet cards with options

3. **Create Bet Modal**
   - Add dialog for creating new bets
   - Integrate with `/api/bets` POST endpoint

4. **Circles Feature**
   - List user circles
   - Create new circles
   - Add members

5. **Profile Page**
   - Display user info
   - Edit profile form
   - Logout button

6. **Error Handling**
   - Global error boundary
   - Toast notifications (use `sonner` or `react-hot-toast`)

7. **Dark Mode**
   - Add theme toggle (use `next-themes`)

---

## 🛠 Troubleshooting

**Port 3000 already in use:**
```bash
npm run dev -- -p 3001
```

**Build fails with TypeScript errors:**
```bash
npm run build
# Check error messages and fix in source files
```

**Auth not persisting:**
- Check browser's localStorage
- Verify token key matches `AUTH_TOKEN_KEY` in `lib/auth.ts`

**API requests failing:**
- Check `NEXT_PUBLIC_API_BASE_URL` matches your backend
- Verify token is being sent in Authorization header
- Check CORS if backend is on different domain

---

## 📚 Useful References

- [Next.js Documentation](https://nextjs.org/docs)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [TypeScript](https://www.typescriptlang.org/docs)

---

**Status**: ✅ Frontend skeleton complete and ready for feature development!
