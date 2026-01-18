# Stake App - Testing & QA Guide

## Quick Start Guide

### Running the App

```bash
# From the stake-app directory
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

---

## Testing with Demo Data

### Option 1: Using Demo Data Script (Recommended)

1. **Start the app** at `http://localhost:3000`
2. **Open Browser Console** (F12 or Cmd+Option+J)
3. **Copy and paste** this code:

```javascript
// Load and run demo data script
fetch('/lib/demoData.ts')
  .then(r => r.text())
  .then(code => {
    const script = document.createElement('script');
    script.textContent = code;
    document.body.appendChild(script);
    // Call the setup function
    setTimeout(() => window.setupDemoData?.(), 100);
  });

// Or directly call (if already loaded):
setupDemoData()
```

4. **Refresh the page** and login with demo credentials:
   - **Email:** `demo@stake.app`
   - **Password:** `demo123`
   - **Username:** `demouser`

### Demo Data Includes

- ✅ 1 current user (demo@stake.app)
- ✅ 2 sample circles
- ✅ 3 sample bets (OPEN, LOCKED, RESOLVED)
- ✅ 1 pending stake (proof required)
- ✅ 2 friend relationships
- ✅ 1 follow relationship
- ✅ Sample identity badge (optional backend)

### Demo Scenarios to Test

| Scenario | Steps | Expected Result |
|----------|-------|-----------------|
| **Create Bet** | Home → + button → Fill form → Submit | Bet appears in home feed |
| **Pick Option** | Click OPEN bet → Click option → Save | Option highlighted, locked until deadline |
| **Resolve Bet** | As host, LOCKED bet → "Resolve" → Select winner | Bet shows resolved, loser sees proof upload |
| **Upload Proof** | Click pending stake → Upload video/photo → Submit | Proof marked complete |
| **Add Friend** | Connections → Search user → Add → Accept | Friend appears in Friends list |
| **Explore Feed** | Follow friends → Explore tab → Sort options | Shows only friends' public bets |
| **Identity Badge** | Profile → Generate Badge → Wait | Badge appears with 4 pillars |

---

## QA Checklist

### Automated Tests
```bash
# TypeScript compilation (must pass)
npx tsc --noEmit

# Build verification
npm run build
```

### Manual Testing

See `QA_CHECKLIST.md` for comprehensive checklist covering:

1. ✅ Authentication & User Management
2. ✅ Circles Management
3. ✅ Bet Creation & Management
4. ✅ Home Feed
5. ✅ Explore Feed (Social Privacy)
6. ✅ Friend & Follow System
7. ✅ Identity Badges (Gemini Integration)
8. ✅ UI/UX Polish
9. ✅ Form Validation
10. ✅ Error Handling
11. ✅ Performance
12. ✅ Accessibility
13. ✅ TypeScript Compliance
14. ✅ Browser Compatibility

### Testing on Different Devices

**Mobile:**
- iPhone 12/13/14/15 (Safari)
- Android phones (Chrome)

**Desktop:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Dark Mode:**
- System preference (Mac: System Preferences > General > Appearance)
- Browser DevTools (toggle)

---

## Component Architecture

### Shared Components
- `EmptyState.tsx` - Reusable empty state UI
- `ErrorState.tsx` - Error message display
- `SkeletonLoader.tsx` - Loading skeletons for:
  - Bet cards
  - Circle cards
  - User cards
  - Stats
  - Text content

### Utility Hooks
- `useBets.ts` - Bet CRUD, feed queries
- `useCircles.ts` - Circle management
- `useFriends.ts` - Social graph operations
- `useIdentity.ts` - Identity badge lifecycle
- `useAuth.ts` - Authentication state

### Utility Functions
- `lib/dateFormatter.ts` - Smart date/time formatting:
  - `formatListDate()` - "Today", "Tomorrow", "Jan 20"
  - `formatDateTime()` - "Today at 2:30 PM"
  - `formatDeadline()` - "Closes in 2 hours"
  - `formatRelativeTime()` - "2 minutes ago"
  - `getExpiryStatus()` - Status badge with color
  
- `lib/validation.ts` - Form validation rules

- `lib/demoData.ts` - Demo data generator

### API Client
- `lib/apiClient.ts` - Fetch wrapper with:
  - Bearer token injection
  - Query parameter support
  - JSON error handling
  - API base URL from env

---

## PRD Compliance Matrix

| Feature | Status | Notes |
|---------|--------|-------|
| Auth (signup/login/logout) | ✅ Complete | Email, password, username |
| Circles (create/list/detail/invite) | ✅ Complete | Private/public, 2+ members |
| Bets (create/pick/resolve) | ✅ Complete | OPEN→LOCKED→RESOLVED states |
| Outcomes (2-10 options) | ✅ Complete | Named options, outcomes |
| Deadlines (date+time) | ✅ Complete | Smart formatting, countdowns |
| Stakes (fixed amounts) | ✅ Complete | Post-resolution assignment |
| Proof (photo/video) | ✅ Complete | File upload for losers |
| Home Feed | ✅ Complete | Circle bets + pending stakes |
| Explore Feed | ✅ Complete | Friends-only, social privacy |
| Friends (requests/lists) | ✅ Complete | Send/accept/decline/delete |
| Following (follow/unfollow) | ✅ Complete | One-way relationships |
| Profile (user info + badge) | ✅ Complete | Stats, identity badge |
| Identity Badge (Gemini) | ✅ Backend Only | 4 pillars, generate/regenerate |
| Dark Mode | ✅ Complete | All pages supported |
| Mobile Responsive | ✅ Complete | Mobile-first design |

---

## Known Limitations & TODOs

### Current Limitations
- ❌ No real backend API (mock only)
- ❌ localStorage used instead of persistent database
- ❌ No real image upload/storage
- ❌ No email notifications
- ❌ No real payment processing
- ❌ Gemini calls frontend-only in demo (PRD specifies backend)

### Next Phase (Post-MVP)
- [ ] Backend API integration
- [ ] Real database (PostgreSQL)
- [ ] Authentication (OAuth/JWT)
- [ ] Image storage (S3/Cloud Storage)
- [ ] Email notifications
- [ ] Payment integration (Stripe)
- [ ] Real Gemini integration (backend)
- [ ] User blocking/reporting
- [ ] Bet history/analytics
- [ ] Notifications system
- [ ] Push notifications
- [ ] Referral system

---

## Troubleshooting

### "Module not found" errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Dev server not starting
```bash
# Kill existing process
lsof -ti:3000 | xargs kill -9

# Clear Next.js cache
rm -rf .next

# Restart
npm run dev
```

### TypeScript errors
```bash
# Check compilation
npx tsc --noEmit

# If errors persist, verify imports use @/ alias:
import { Component } from '@/components/path'
```

### Dark mode not working
- Check system preferences (Mac: System Preferences > General > Appearance)
- Or use browser DevTools to simulate dark mode
- Verify Tailwind dark mode is enabled in `tailwind.config.ts`

### Demo data not loading
1. Make sure you're in browser console (F12)
2. Verify function is available: `typeof window.setupDemoData`
3. Check console for errors
4. Refresh page after calling `setupDemoData()`

---

## Deployment Checklist

Before deploying to production:

- [ ] All TypeScript errors fixed (`npx tsc --noEmit`)
- [ ] All tests passing (manual QA checklist)
- [ ] Environment variables configured:
  - [ ] `NEXT_PUBLIC_API_BASE_URL` set to production API
- [ ] Build successful (`npm run build`)
- [ ] No console errors in production build
- [ ] Lighthouse score checked:
  - [ ] Performance > 90
  - [ ] Accessibility > 95
  - [ ] Best Practices > 90
- [ ] SEO metadata added
- [ ] Error tracking configured (Sentry/similar)
- [ ] Analytics configured (optional)
- [ ] Reviewed QA Checklist with team sign-off

---

## Support

For issues or questions:

1. Check `QA_CHECKLIST.md` for test coverage
2. Review component documentation in source code
3. Check console for error messages
4. Verify environment variables are set correctly

---

**Last Updated:** January 17, 2026  
**Version:** 1.0.0 MVP  
**Status:** Ready for Testing
