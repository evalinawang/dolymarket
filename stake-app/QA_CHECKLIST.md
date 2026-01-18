# Stake App - PRD Compliance QA Checklist

**App Version:** 1.0.0 MVP  
**Last Updated:** January 17, 2026  
**QA Status:** Ready for Testing

---

## 1. Authentication & User Management

### Login/Signup Flow
- [ ] User can sign up with email, password, and username
- [ ] Signup validation enforces email format
- [ ] Signup validation enforces password minimum length (8+ chars)
- [ ] Signup validation enforces username (alphanumeric + underscores)
- [ ] User can login with email and password
- [ ] Login persists user session in localStorage
- [ ] User can logout from profile page
- [ ] Logout clears session and redirects to login
- [ ] Auth guard protects all authenticated routes
- [ ] Unauthenticated users redirected to login
- [ ] Auth token persisted and used for API requests

### User Profile
- [ ] Profile page displays user header with name, username, join date
- [ ] Profile shows stats: Total Bets, Wins, Losses, Friends, Following
- [ ] Logout button accessible from profile
- [ ] Dark mode supported on profile page
- [ ] Mobile responsive layout

---

## 2. Circles Management

### Circles List
- [ ] User can view list of circles they belong to
- [ ] Each circle displays: name, member count, created date
- [ ] User can navigate to circle detail from list
- [ ] Circles sorted by most recent first
- [ ] Empty state shown when no circles exist

### Create Circle
- [ ] User can create new circle with name and description
- [ ] Circle creation form validates non-empty name
- [ ] Circle privacy toggle (private/public) works
- [ ] User becomes auto-member of created circle
- [ ] Created circle appears in circles list

### Circle Detail
- [ ] Circle detail displays name, description, members list
- [ ] Members tab shows all circle members with join dates
- [ ] Bets tab shows all bets in circle (with filters)
- [ ] Invite link generation works
- [ ] Copy invite link functionality works
- [ ] Join circle via invite code works
- [ ] User cannot join same circle twice

### Circle Tabs
- [ ] "Members" tab lists all members
- [ ] "Bets" tab shows OPEN + LOCKED bets first
- [ ] Navigation between tabs smooth

---

## 3. Bet Creation & Management

### Create Bet Modal
- [ ] Modal opens from bottom nav "+" button
- [ ] User can select target circle
- [ ] User can enter bet title (required)
- [ ] User can enter description (optional)
- [ ] User can add 2-10 outcome options (names only)
- [ ] User can set deadline with date+time picker
- [ ] Deadline cannot be in the past
- [ ] User can select stake type (fixed / custom)
- [ ] User can select stake amount
- [ ] User can set proof requirement (none / photo / video)
- [ ] User can toggle privacy (CIRCLE_ONLY / FRIENDS_PUBLIC)
- [ ] Form validation prevents incomplete submissions
- [ ] Created bet appears in circle immediately

### Bet Detail Page
- [ ] Bet displays: title, description, host, circle
- [ ] Bet shows countdown to deadline
- [ ] Bet shows current status (OPEN / LOCKED / RESOLVED)
- [ ] Non-host users can see pick options and select outcome
- [ ] Selected pick is highlighted
- [ ] LOCKED state shows all participants' picks (anonymous if CIRCLE_ONLY)
- [ ] Host can resolve bet when deadline passes
- [ ] Host can select winning option
- [ ] Resolving creates stakes for losing participants
- [ ] RESOLVED state displays:
  - [ ] Winner(s) and their outcome
  - [ ] Loser(s) needing proof submission
  - [ ] Winning option clearly marked
  - [ ] Proof status for each participant (pending/completed)

### Proof Submission
- [ ] Losers with PHOTO proof req can upload photo
- [ ] Losers with VIDEO proof req can upload video
- [ ] File preview shown before upload
- [ ] Upload progress indicator displayed
- [ ] Proof marked as completed after upload
- [ ] Proof required only if stake pending (not for winners)

---

## 4. Home Feed

### Feed Display
- [ ] "You Owe" section shows pending stakes
- [ ] Each pending stake card shows:
  - [ ] Bet title
  - [ ] Proof requirement status
  - [ ] Amount owed
  - [ ] Quick access to upload proof
- [ ] "Active Bets" section shows all accessible bets
- [ ] Bets sorted: OPEN + LOCKED first, then RESOLVED
- [ ] Each bet card shows:
  - [ ] Title and description
  - [ ] Circle name
  - [ ] Host username
  - [ ] Deadline with countdown
  - [ ] Stake amount
  - [ ] Privacy badge
  - [ ] Proof requirement badge
  - [ ] Status pill (OPEN / LOCKED / RESOLVED)

### Empty States
- [ ] Empty state shown when no active bets and no pending stakes
- [ ] Loading skeleton shown while fetching
- [ ] Error message if feed fails to load

### Feed Interactions
- [ ] Click bet card navigates to detail page
- [ ] Click pending stake card navigates to bet detail
- [ ] Proof upload modal opens from pending stake card

---

## 5. Explore Feed

### Privacy Rules
- [ ] Only shows FRIENDS_PUBLIC bets (no global/public bets)
- [ ] Shows bets from friends only
- [ ] Shows bets from followed users only
- [ ] Does NOT show CIRCLE_ONLY bets (even if friend's)
- [ ] Does NOT show all bets from strangers

### Sorting Options
- [ ] "Newest" sorts by creation date (default)
- [ ] "Active" shows only OPEN + LOCKED bets
- [ ] "By Deadline" shows nearest deadline first
- [ ] Sort buttons highlight current selection
- [ ] Sort change re-filters instantly

### Display
- [ ] Each bet card shows:
  - [ ] Title and description
  - [ ] Host (friend/following indicator)
  - [ ] Deadline
  - [ ] Stake amount
  - [ ] Status pill
- [ ] Click bet card navigates to detail

### Empty States
- [ ] Empty state when no bets match filters
- [ ] Message suggests following friends
- [ ] "Connections" button navigates to social hub
- [ ] Loading skeleton while fetching

---

## 6. Friend & Follow System

### User Search
- [ ] Search box accepts usernames
- [ ] Real-time search results displayed
- [ ] Results show username, display name, follow status
- [ ] Can add/remove friends from results

### Friend Requests
- [ ] User can send friend request to another user
- [ ] Friend request notifications show pending requests
- [ ] User can accept friend request
- [ ] User can decline friend request
- [ ] Accepted friends show in "Friends" tab
- [ ] Declined requests disappear from notifications

### Friends List
- [ ] Shows all accepted friends
- [ ] Displays friend count in tab
- [ ] Friend cards show username, display name
- [ ] Can unfriend from friends list
- [ ] Empty state when no friends

### Following
- [ ] User can follow any user
- [ ] User can unfollow
- [ ] Following status shows in user cards
- [ ] "Following" list shows all followed users
- [ ] Displays following count in tab
- [ ] Empty state when not following anyone

### Connections Hub
- [ ] "Search" tab: search users, send requests, manage
- [ ] "Friends" tab: view accepted friends, unfriend
- [ ] "Following" tab: view followed users, unfollow
- [ ] Tab counts show friend/following totals
- [ ] Mobile responsive layout

---

## 7. Identity Badges (with Gemini Integration)

### Badge Display
- [ ] Profile shows "Identity Badge" section
- [ ] If badge exists:
  - [ ] Title and description displayed
  - [ ] 4 pillar bars shown (Express/Protect/Create/Evolve)
  - [ ] Each pillar shows 0-100 score
  - [ ] Pillars colored correctly (Express=blue, Protect=green, Create=purple, Evolve=orange)
  - [ ] Average score calculated and displayed
  - [ ] Collapsible details show all 4 pillars
  - [ ] "Refresh Badge" button available

### Badge Generation
- [ ] If no badge:
  - [ ] "Generate Badge" button shown
  - [ ] Button loading state during generation
  - [ ] Success message after generation
  - [ ] Error message if generation fails
- [ ] Backend calls Gemini (not frontend)
- [ ] Generated badge appears immediately after success
- [ ] User can regenerate to recalculate from latest activity

### Loading States
- [ ] Loading skeleton shown while fetching badge
- [ ] Loading spinner shown during generation
- [ ] Smooth transition when badge loads

---

## 8. UI/UX Polish

### Navigation
- [ ] Bottom nav shows 5 tabs: Home, Explore, Add Bet, Circles, Profile
- [ ] Add Bet tab highlights as blue "+" button
- [ ] Current tab highlighted
- [ ] Navigation responsive on mobile

### Empty States
- [ ] All list pages have empty states
- [ ] Empty states include:
  - [ ] Icon
  - [ ] Title
  - [ ] Description
  - [ ] CTA button (if applicable)
- [ ] Visually distinct from content

### Error States
- [ ] Failed API calls show error message
- [ ] Error messages suggest action (retry, try again)
- [ ] Error styling consistent (red background, alert icon)
- [ ] Retry button functional

### Skeleton Loaders
- [ ] Skeleton loaders used for:
  - [ ] Bet cards (3x during load)
  - [ ] Circle cards (3x during load)
  - [ ] User cards (3x during load)
  - [ ] Stats section (5 stat cards)
  - [ ] Badge section (while fetching)
- [ ] Skeleton animations smooth and subtle

### Date & Time Formatting
- [ ] Deadlines show smart format:
  - [ ] "Today at 2:30 PM" if today
  - [ ] "Tomorrow at 2:30 PM" if tomorrow
  - [ ] "Mon, Jan 20 at 2:30 PM" if this year
  - [ ] "Jan 20, 2025 at 2:30 PM" if different year
- [ ] "Closes in X hours/days" format for countdowns
- [ ] Join dates formatted as "Joined Jan 2025"
- [ ] Relative times (e.g., "2 minutes ago") where appropriate

### Dark Mode
- [ ] All pages support dark mode
- [ ] Text contrast meets accessibility standards (dark & light)
- [ ] Colors adjusted for dark backgrounds
- [ ] Gradients visible in both themes
- [ ] No hard-coded color values in component

### Responsive Design
- [ ] Mobile first (tested on iPhone 12, 14, 15)
- [ ] Tablet friendly (verified on iPad sizes)
- [ ] Max width 640px for single-column layout
- [ ] Touch-friendly buttons (min 44x44px)
- [ ] Proper spacing on small screens
- [ ] Bottom nav doesn't cover content

---

## 9. Form Validation

### Signup Form
- [ ] Email format validation
- [ ] Password length validation (8+ chars)
- [ ] Username format validation (alphanumeric + underscore)
- [ ] Required field validation
- [ ] Error messages shown inline
- [ ] Submit button disabled until valid

### Login Form
- [ ] Email field required
- [ ] Password field required
- [ ] Error message on failed login
- [ ] Submit button disabled while submitting

### Create Circle Form
- [ ] Circle name required
- [ ] Circle name max length (100 chars)
- [ ] Description optional
- [ ] Privacy toggle works
- [ ] Submit button disabled until valid

### Create Bet Form
- [ ] Circle selection required
- [ ] Title required
- [ ] Title max length enforced
- [ ] Description optional
- [ ] 2-10 options required
- [ ] Duplicate option names prevented
- [ ] Deadline required and cannot be past
- [ ] Stake amount required and >= 0
- [ ] All fields show validation errors
- [ ] Submit disabled until fully valid

---

## 10. State Management & Persistence

### Auth State
- [ ] User object persisted in localStorage
- [ ] Auth token persisted in localStorage
- [ ] Session restored on page refresh
- [ ] Expired/invalid tokens trigger re-login

### Query Caching
- [ ] TanStack Query used for data fetching
- [ ] API responses cached with 60s stale time
- [ ] Data refetches on focus/mount if stale
- [ ] Mutations invalidate related caches
- [ ] Loading states reflect query status

### Modal State
- [ ] Create Bet modal can be opened/closed
- [ ] Modal content controlled properly
- [ ] Multiple modal interactions don't conflict
- [ ] Form state clears on close

---

## 11. Error Handling

### Network Errors
- [ ] Failed API calls show error message
- [ ] Specific error messages for common issues
- [ ] Retry buttons provided where applicable
- [ ] No unhandled promise rejections in console

### Validation Errors
- [ ] Form validation errors shown inline
- [ ] Required field errors clear
- [ ] Format validation errors descriptive
- [ ] Errors cleared when valid input provided

### Boundary Errors
- [ ] Error Boundary catches unexpected errors
- [ ] Fallback UI shown gracefully
- [ ] Retry button restores page

---

## 12. Performance

### Page Load
- [ ] Initial page load < 3 seconds
- [ ] No layout shifts after load (CLS stable)
- [ ] Images optimized and lazy-loaded
- [ ] Code-splitting working for routes

### Interactions
- [ ] Form submission < 1 second perceived time
- [ ] Navigation between pages smooth
- [ ] Modal open/close instant
- [ ] Search results update in real-time

### Bundle Size
- [ ] Next.js chunks analyzed for optimizations
- [ ] No large unused dependencies
- [ ] CSS properly scoped (Tailwind tree-shaken)

---

## 13. Accessibility

### WCAG 2.1 Level A
- [ ] All text has sufficient contrast
- [ ] Form inputs have associated labels
- [ ] Buttons keyboard-accessible
- [ ] Focus indicators visible
- [ ] Page structure semantic (h1, h2, etc.)

### Screen Reader
- [ ] Icons have aria-labels
- [ ] Alt text on avatars
- [ ] Form error announcements
- [ ] Modal role and labels set

### Keyboard Navigation
- [ ] Tab order logical
- [ ] Enter submits forms
- [ ] Escape closes modals
- [ ] No keyboard traps

---

## 14. TypeScript Compliance

### Type Safety
- [ ] `npx tsc --noEmit` returns 0 errors
- [ ] No `any` types used
- [ ] All API responses typed
- [ ] Component props fully typed
- [ ] Event handlers properly typed

### Type Definitions
- [ ] User interface defined
- [ ] Bet interface defined
- [ ] Circle interface defined
- [ ] All enums defined (BetStatus, Privacy, etc.)
- [ ] Generic types for API responses

---

## 15. Browser Compatibility

- [ ] Chrome (latest) ✅
- [ ] Safari (latest) ✅
- [ ] Firefox (latest) ✅
- [ ] Edge (latest) ✅
- [ ] Mobile Safari (iOS 14+) ✅
- [ ] Chrome Mobile (Android 10+) ✅

---

## Test Flows

### Flow 1: Sign Up & Create Bet
1. [ ] Open app → redirect to login
2. [ ] Click "Sign up"
3. [ ] Enter valid email, password, username
4. [ ] Submit → redirected to home
5. [ ] Click "+" in bottom nav
6. [ ] Select circle (or create new one first)
7. [ ] Enter bet details (title, options, deadline, stake)
8. [ ] Submit → bet appears in home feed
9. [ ] Click bet → detail page shows bet info

### Flow 2: Pick & Resolve
1. [ ] On home feed, click OPEN bet
2. [ ] Click option button to pick
3. [ ] Pick is highlighted
4. [ ] Wait for deadline (or manually resolve)
5. [ ] Host opens bet → shows "Resolve" button
6. [ ] Host selects winning option
7. [ ] Bet transitions to RESOLVED
8. [ ] Losers see "Upload Proof" button
9. [ ] Upload proof file
10. [ ] Proof marked as completed

### Flow 3: Social Discovery
1. [ ] Go to Connections tab
2. [ ] Search for another user
3. [ ] Click "Add" to send friend request
4. [ ] Notifications show pending request
5. [ ] Accept request → friend is added
6. [ ] Go to Explore feed
7. [ ] See only friends' FRIENDS_PUBLIC bets
8. [ ] Follow a user
9. [ ] Explore shows their bets too
10. [ ] Unfollow → no longer appears

### Flow 4: Profile & Badge
1. [ ] Go to Profile tab
2. [ ] See user info and stats
3. [ ] Identity Badge section shown
4. [ ] If no badge: click "Generate"
5. [ ] Loading spinner shows
6. [ ] Badge appears with 4 pillars
7. [ ] Click "Refresh" to regenerate
8. [ ] Click logout → redirect to login

---

## Sign-Off

| Role | Name | Date | Status |
|------|------|------|--------|
| QA Lead | _____________ | _________ | ☐ PASS ☐ FAIL |
| PM | _____________ | _________ | ☐ APPROVED ☐ REVISIONS |
| Dev Lead | _____________ | _________ | ☐ VERIFIED ☐ NEEDS FIXES |

---

## Notes

- All API endpoints assume backend is running on `http://localhost:3001/api`
- Demo data script available at `lib/demoData.ts`
- Run `setupDemoData()` in browser console to populate test data
- Dark mode can be toggled via system preferences or app settings
- No real payments processed (demo only)
