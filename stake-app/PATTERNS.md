# Quick Reference - Code Patterns

## Creating a New Feature Page

```tsx
// app/(authenticated)/my-feature/page.tsx
'use client';

import { PageShell } from '@/components/shared/PageShell';

export default function MyFeaturePage() {
  return (
    <PageShell
      header={
        <div className="p-4">
          <h1 className="text-2xl font-bold">My Feature</h1>
        </div>
      }
    >
      <div className="p-4 space-y-4">
        {/* Your content here */}
      </div>
    </PageShell>
  );
}
```

## Using Auth

```tsx
'use client';

import { useAuth } from '@/features/auth/useAuth';

export default function Profile() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Hello, {user?.displayName}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## API Query with TanStack Query

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';
import { Bet } from '@/types';

export default function MyBets() {
  const { data: bets, isLoading, error } = useQuery({
    queryKey: ['bets'],
    queryFn: () => apiClient.get<Bet[]>('/bets'),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {bets?.map((bet) => (
        <div key={bet.id}>{bet.title}</div>
      ))}
    </div>
  );
}
```

## API Mutation with TanStack Query

```tsx
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';
import { Bet } from '@/types';

export default function CreateBetForm() {
  const queryClient = useQueryClient();

  const { mutate: createBet, isPending } = useMutation({
    mutationFn: (data: { title: string; options: { label: string }[] }) =>
      apiClient.post<Bet>('/bets', data),
    onSuccess: () => {
      // Invalidate bets list to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['bets'] });
    },
  });

  return (
    <button
      onClick={() =>
        createBet({
          title: 'New Bet',
          options: [{ label: 'Yes' }, { label: 'No' }],
        })
      }
      disabled={isPending}
    >
      {isPending ? 'Creating...' : 'Create Bet'}
    </button>
  );
}
```

## Form Validation with Zod + React Hook Form

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

type BetForm = z.infer<typeof schema>;

export default function BetForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BetForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: BetForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title')} placeholder="Bet title" />
      {errors.title && <span>{errors.title.message}</span>}

      <input {...register('description')} placeholder="Description" />

      <button type="submit">Create Bet</button>
    </form>
  );
}
```

## Conditional Rendering Based on Route

```tsx
'use client';

import { usePathname } from 'next/navigation';

export default function MyComponent() {
  const pathname = usePathname();
  const isOnHome = pathname === '/home';

  return <div>{isOnHome && <p>Welcome to home!</p>}</div>;
}
```

## Adding Type-Safe Links

```tsx
import Link from 'next/link';

// TypeScript will auto-complete paths (Next.js 14+)
export default function Navigation() {
  return (
    <nav>
      <Link href="/home">Home</Link>
      <Link href="/circles/abc123">Circle</Link>
      <Link href="/bets/xyz789">Bet</Link>
    </nav>
  );
}
```

## Custom Hook Pattern

Create `features/example/useExample.ts`:

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';
import { Bet } from '@/types';

export function useBets(userId?: string) {
  return useQuery({
    queryKey: userId ? ['bets', userId] : ['bets'],
    queryFn: () =>
      apiClient.get<Bet[]>(
        userId ? `/users/${userId}/bets` : '/bets'
      ),
  });
}
```

Usage:

```tsx
import { useBets } from '@/features/bets/useBets';

export default function MyBets() {
  const { data, isLoading } = useBets();
  // ...
}
```

## Styling with Tailwind + cn()

```tsx
import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  variant?: 'default' | 'highlighted';
}

export function Card({ className, variant = 'default' }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        variant === 'default' && 'bg-white border-gray-200',
        variant === 'highlighted' && 'bg-blue-50 border-blue-300',
        className
      )}
    >
      {/* content */}
    </div>
  );
}
```

## Error Handling

```tsx
import apiClient, { ApiError } from '@/lib/apiClient';

try {
  const result = await apiClient.post('/bets', data);
} catch (err) {
  if (err instanceof ApiError) {
    console.error(`HTTP ${err.status}: ${err.message}`);
    // Show toast or error message
  }
}
```

## Environment Variables in Client Code

Prefix with `NEXT_PUBLIC_` to expose to browser:

```tsx
// lib/apiClient.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

// Component
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
```

---

Use these patterns as a foundation for implementing features!
