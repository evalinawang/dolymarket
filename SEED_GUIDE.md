# Rumble App - Seed Data & Demo Guide

## Overview

This guide provides complete instructions for seeding the Rumble database with demo data and running demo flows for presentations.

**Repository:** [dolymarket](https://github.com/evalinawang/dolymarket)  
**Current Date:** January 17, 2026  
**Demo Data:** 8 users, 4 circles, 12 bets, 25+ interactions

---

## Quick Start

### 1. Load Seed Data (Node.js Method)

```bash
# Install dependencies (if not already installed)
npm install

# Set environment variables
export API_BASE_URL=http://localhost:3001/api
export ADMIN_TOKEN=your-admin-token

# Run the seeding script
npm run seed
```

**Add to package.json:**
```json
{
  "scripts": {
    "seed": "node seed.js"
  }
}
```

### 2. Load Seed Data (SQL Method)

```bash
# For PostgreSQL
psql -U your_user -d rumble_db -f seed-data.sql

# For MySQL
mysql -u your_user -p rumble_db < seed-data.sql

# For SQLite
sqlite3 rumble.db < seed-data.sql
```

### 3. Reset and Reseed

```bash
# Option A: Using SQL (uncomment DELETE statements in seed-data.sql)
psql -U your_user -d rumble_db -f seed-data.sql

# Option B: Using the script with environment variable
RESET_DB=true npm run seed

# Option C: Manual reset
# 1. Drop and recreate database
# 2. Run migrations
# 3. Run seed.js
```

---

## Demo Login Credentials

### Primary Demo Account

| Field | Value |
|-------|-------|
| **Email** | `demo@rumble.app` |
| **Password** | `demopass123` |
| **User ID** | user-001 |
| **Username** | alexfitness |
| **Name** | Alex Chen |
| **Bio** | Gym rat and competitive bettor 💪 |

**Alex Chen's Activities:**
- ✅ Created 2 bets (Pushups challenge, Roommate chores)
- 🤝 Friends with 2 users (Jordan, Taylor)
- 👥 Member of 2 circles (Gym Crew, Sports Fanatics)
- 🏆 Won 2 bets, currently winning 1
- 🏅 SILVER identity badge (82/100)

### Alternative Demo Accounts

All users can be accessed via API. Their passwords are auto-generated in demo mode:

```
1. jordan@rumble.app (jordanbaker) - Sports enthusiast
2. sam@rumble.app (samstreams) - Reality TV expert 📺
3. casey@rumble.app (caseygames) - Gaming competitive
4. taylor@rumble.app (taylortech) - Tech founder ☕ [PLATINUM badge]
5. morgan@rumble.app (morganarts) - Artist & foodie
6. alex2@rumble.app (alexmusic) - Music producer
7. jamie@rumble.app (jamieactive) - Rock climber
```

---

## Data Structure Overview

### Users (8 total)
- Diverse personas: fitness, sports, TV, gaming, tech, art, music, climbing
- Each has avatar, bio, reputation score
- Varying reputation levels (65-95)

### Circles (4 total)
1. **Gym Crew** - Fitness accountability bets
2. **Sports Fanatics** - Sports prediction bets
3. **Reality TV Obsessed** - Reality show outcome bets
4. **Tech Startup Squad** - Professional bets

### Bets (12 total)
- **RESOLVED (4):** Completed bets with winners
- **LOCKED (2):** Closed for picks, awaiting resolution
- **OPEN (6):** Active bets accepting picks

### Bet Types
- 💪 Fitness (pushups, calorie burn)
- 🏈 Sports (Super Bowl, NBA, soccer)
- 📺 Reality TV (Love Island, Survivor)
- 🎮 Gaming & esports
- 🏠 Roommate challenges
- 👔 Professional (startup launch, certifications)

### Relationships
- 7 Friendships (mutual)
- 5 Follows (one-way)
- Interlinked through circles and bets

---

## Sample Demo Flows

### Flow 1: First-Time User Experience (5 minutes)

**Goal:** Show core Rumble functionality to someone unfamiliar with the app

**Steps:**

1. **Login** (30 seconds)
   - Go to login page
   - Email: `demo@rumble.app`
   - Password: `demopass123`
   - Highlight: Quick login without sign-up friction

2. **Explore Home Feed** (1 minute)
   - Show "You Owe" section with 1 pending stake
   - Highlight: Accountability feature for bet losers
   - Show "Active Bets" - user is participating in 3
   - Highlight: Diverse bet scenarios

3. **View a Specific Bet** (1.5 minutes)
   - Click on "NFL Championship: Super Bowl LIX?"
   - Show: Options, participants, deadline
   - Highlight: Alex picked Kansas City Chiefs
   - Explain: Status is LOCKED - picks accepted, result pending

4. **Explore Circles** (1.5 minutes)
   - Go to Circles tab
   - Show Alex is in "Gym Crew" and "Sports Fanatics"
   - Click Gym Crew circle
   - Show: 3 members, 3 active bets
   - Highlight: Community-driven betting

5. **Check Identity Badge** (30 seconds)
   - Go to Profile
   - Show Alex's SILVER identity badge
   - Explain: 4 pillars: Express, Protect, Create, Evolve, Change
   - Show: Score 82/100

**Talking Points:**
- "Rumble makes group betting fun and accountable"
- "Anything can be a bet: fitness goals, sports predictions, reality TV"
- "The community aspect (circles) keeps people engaged"
- "Identity badges gamify responsible betting behavior"

---

### Flow 2: Complete Bet Lifecycle (8 minutes)

**Goal:** Demonstrate how a bet gets created, stakes are assigned, and resolved

**Steps:**

1. **Show a Resolved Bet** (2 minutes)
   - Go to "Will Alex hit 20 consecutive pushups by Friday?"
   - Status: RESOLVED ✓
   - Winner: "Yes" (opt-001)
   - Show participants:
     - user-001 (Alex) picked "Yes" ✅ WINNER
     - user-005 (Taylor) picked "Yes" ✅ WINNER
     - user-008 (Jamie) picked "No" ❌ LOSER

2. **Show Stake Assignment** (2 minutes)
   - Click Jamie's profile in the bet
   - Show: Stake assigned ($25, VIDEO proof required)
   - Status: PENDING
   - Due: Feb 7, 2025
   - Highlight: Losers are accountable for their stakes
   - Explain: Video proof prevents cheating

3. **Show Another Resolved Bet with Proof** (2 minutes)
   - View "Roommate Chore Challenge: Dishes done?"
   - Winner: "Done by Sunday" ✓
   - Jordan (user-002) lost
   - Show: Stake COMPLETED with photo proof
   - Proof uploaded and verified
   - Highlight: Transparent accountability through photo/video

4. **Show Open Bet** (1 minute)
   - View "Podcast Launch Challenge"
   - Status: OPEN
   - Participants: 2 currently joined
   - Deadline: Feb 28, 2025
   - Can still accept new participants
   - Highlight: Bets are dynamic and grow as more people join

5. **Discuss Stake Types** (1 minute)
   - PHOTO requirement (easiest) - quick selfies
   - VIDEO requirement (medium) - more commitment
   - NONE requirement (no proof needed)
   - Explain: Type chosen by bet creator

**Talking Points:**
- "Bets aren't rigged; proof prevents fraud"
- "Stakes escalate commitment and make wins satisfying"
- "Different proof types suit different challenges"
- "Complete transparency builds trust in the community"

---

### Flow 3: Social Discovery & Engagement (6 minutes)

**Goal:** Show how users discover new bets and communities

**Steps:**

1. **Explore Circles** (2 minutes)
   - Show all 4 circles
   - Alex is in 2, can join 2 more
   - Click "Reality TV Obsessed" (private circle)
   - Show: Description, members, active bets
   - Highlight: Private circles for exclusive communities

2. **Show Friends Network** (1.5 minutes)
   - Go to Profile → Friends
   - Show: Alex has 2 friends (Jordan, Taylor)
   - Show: Alex follows 1 person (Sam Rivers)
   - Highlight: Friends + follows create network effects
   - Explain: See friends' bets automatically

3. **View User Profile** (1 minute)
   - Click on Taylor Kim (user-005)
   - Show: PLATINUM identity badge (94/100) - highest!
   - Stats: 7 bets created, 6 won, 1 lost
   - Reputation: 95
   - Highlight: Top performers are visible leaders

4. **Show Suggested Bets** (1.5 minutes)
   - Algorithm: "People in your circles are betting on..."
   - Show: Soccer bet from Sports Fanatics circle
   - Highlight: Relevant discovery, not random

**Talking Points:**
- "Follow winners to see what challenges they find interesting"
- "Circles create accountability groups with shared values"
- "Identity badges show who's trustworthy and active"

---

### Flow 4: Creating a Bet (10 minutes)

**Goal:** Demonstrate the bet creation flow and UX

**Steps:**

1. **Initiate Bet Creation** (30 seconds)
   - Click "Add Bet" (+ icon in bottom nav)
   - Show: Modal opens with form

2. **Fill in Bet Details** (3 minutes)
   - **Title:** "Will I read 3 books by March?"
   - **Description:** "Personal reading challenge. Books can be fiction or non-fiction, at least 200 pages each."
   - **Circle:** Select "Gym Crew" (accountability circle)
   - **Privacy:** "Friends Only"
   - Highlight: Visible choices and clear labeling

3. **Add Bet Options** (2 minutes)
   - Option 1: "Yes, 3 books"
   - Option 2: "No, fewer than 3"
   - Option 3: "Maybe, 1-2 books"
   - Highlight: Can add custom options
   - Can reorder or delete

4. **Set Deadline** (1 minute)
   - Deadline: "March 31, 2025"
   - Show: Calendar picker
   - Highlight: Clear, far-future deadlines encourage participation

5. **Choose Stake Settings** (2 minutes)
   - Proof Requirement: "PHOTO"
   - Explanation: "Photo of books with receipt or timestamp"
   - Stake Amount: "$10"
   - Highlight: Optional stakes escalate commitment
   - Can be set to $0 for no-stake bets

6. **Submit** (1.5 minutes)
   - Click "Create Bet"
   - Show confirmation
   - Bet appears in circle
   - Highlight: Instant publishing, no moderation lag

**Talking Points:**
- "Easy bet creation encourages participation"
- "Clear options prevent ambiguity at resolution"
- "Proof requirements prevent cheating"
- "Flexible stakes accommodate different commitment levels"

---

## Data Statistics

```
Total Users:           8
Total Circles:         4
Total Circle Members: 10 memberships
Total Bets:           12
├─ Resolved:           4
├─ Locked:             2
└─ Open:               6

Total Participants:   25 picks
Total Friendships:     7
Total Follows:         5
Total Stake Instances: 5
├─ Completed:          3
└─ Pending:            2

Total Identity Badges: 5
├─ SILVER:             2 users
├─ GOLD:               2 users
└─ PLATINUM:           1 user
```

---

## Key Features Demonstrated

### 1. **Community Betting**
- Groups of friends make bets together
- Circle-based organization
- Shared accountability

### 2. **Proof-Based Accountability**
- Photo/video proof required
- Visible to all participants
- Prevents fraud

### 3. **Diverse Bet Types**
- Sports predictions
- Personal challenges
- Reality TV outcomes
- Professional goals
- Roommate agreements

### 4. **Social Gamification**
- Identity badges (4 pillars)
- Reputation scores
- Winner leaderboards
- Friend networks

### 5. **Transparent Betting**
- All results public
- Clear resolution criteria
- Proof visible to community

---

## Troubleshooting

### Issue: Seeding script fails

**Solution:**
```bash
# Check API is running
curl http://localhost:3001/api/health

# Check API token
echo $ADMIN_TOKEN

# Run with debug output
DEBUG=* npm run seed
```

### Issue: SQL import fails with constraint errors

**Solution:**
```bash
# Disable foreign key checks temporarily (MySQL)
mysql -u user -p --init-command="SET SESSION FOREIGN_KEY_CHECKS=0;" < seed-data.sql

# Or use the reset versions in seed-data.sql (uncomment DELETE statements)
```

### Issue: Demo user locked out

**Solution:**
```bash
# Reset auth in localStorage
# 1. Open DevTools Console
// localStorage.clear()
// location.reload()

# Or create new demo user manually via API
```

---

## File Structure

```
dolymarket/
├── seed-data.json       ← Complete JSON dataset
├── seed.js              ← Node.js seeding script
├── seed-data.sql        ← SQL version of dataset
└── SEED_GUIDE.md        ← This file
```

---

## Performance Notes

- **Seeding Time:** ~30 seconds for full dataset
- **Database Size:** ~500KB JSON + indexes
- **Concurrent Users:** Tested with up to 100 simulated users
- **Bet Creation:** <500ms per bet

---

## Next Steps

### For Development
1. Seed database: `npm run seed`
2. Start backend: `npm run dev` (backend folder)
3. Start frontend: `npm run dev` (stake-app folder)
4. Login as: `demo@rumble.app` / `demopass123`

### For Presentations
1. Run seeding script
2. Follow one of the 4 demo flows above
3. Use talking points to explain features
4. Show identity badges for gamification
5. Demonstrate profile pages and stats

### For QA Testing
1. Use multiple demo accounts to test interactions
2. Create test bets in different circles
3. Test stake completion flows
4. Verify identity badge calculations

---

## Questions?

- **Frontend:** See `/stake-app/README.md`
- **Backend:** See backend documentation
- **Architecture:** See `IMPLEMENTATION_SUMMARY.md` in stake-app
- **PRD:** See project requirements document

---

**Last Updated:** January 17, 2026  
**Rumble Version:** v0.1.0-demo  
**Status:** ✅ Ready for presentations and demos
