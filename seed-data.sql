-- Rumble App - Complete SQL Seed Data
-- Insert in this exact order to respect foreign key constraints

-- Clear existing data (optional - uncomment to reset)
-- DELETE FROM identity_badges;
-- DELETE FROM proof_uploads;
-- DELETE FROM stake_instances;
-- DELETE FROM bet_resolutions;
-- DELETE FROM bet_picks;
-- DELETE FROM bet_options;
-- DELETE FROM bets;
-- DELETE FROM memberships;
-- DELETE FROM circles;
-- DELETE FROM follows;
-- DELETE FROM friendships;
-- DELETE FROM users;

-- ============================================================================
-- USERS
-- ============================================================================

INSERT INTO users (id, email, username, displayName, bio, avatar, createdAt, updatedAt) VALUES
('user-001', 'alex@rumble.app', 'alexfitness', 'Alex Chen', 'Gym rat and competitive bettor 💪', 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex', '2025-01-01T10:00:00Z', '2025-01-01T10:00:00Z'),
('user-002', 'jordan@rumble.app', 'jordanbaker', 'Jordan Baker', 'Sports enthusiast and amateur gambler 🏈', 'https://api.dicebear.com/7.x/avataaars/svg?seed=jordan', '2025-01-02T11:00:00Z', '2025-01-02T11:00:00Z'),
('user-003', 'sam@rumble.app', 'samstreams', 'Sam Rivers', 'TV addict | Reality show expert 📺', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sam', '2025-01-03T12:00:00Z', '2025-01-03T12:00:00Z'),
('user-004', 'casey@rumble.app', 'caseygames', 'Casey Morgan', 'Gaming competitive & esports fan 🎮', 'https://api.dicebear.com/7.x/avataaars/svg?seed=casey', '2025-01-04T13:00:00Z', '2025-01-04T13:00:00Z'),
('user-005', 'taylor@rumble.app', 'taylortech', 'Taylor Kim', 'Tech startup founder | Coffee addict ☕', 'https://api.dicebear.com/7.x/avataaars/svg?seed=taylor', '2025-01-05T14:00:00Z', '2025-01-05T14:00:00Z'),
('user-006', 'morgan@rumble.app', 'morganarts', 'Morgan Lee', 'Artist | Foodie | Always up for a challenge 🎨', 'https://api.dicebear.com/7.x/avataaars/svg?seed=morgan', '2025-01-06T15:00:00Z', '2025-01-06T15:00:00Z'),
('user-007', 'alex2@rumble.app', 'alexmusic', 'Alex Rodriguez', 'Musician | Music producer 🎵', 'https://api.dicebear.com/7.x/avataaars/svg?seed=alexrod', '2025-01-07T16:00:00Z', '2025-01-07T16:00:00Z'),
('user-008', 'jamie@rumble.app', 'jamieactive', 'Jamie Walsh', 'Rock climber | Outdoor enthusiast 🏔️', 'https://api.dicebear.com/7.x/avataaars/svg?seed=jamie', '2025-01-08T17:00:00Z', '2025-01-08T17:00:00Z');

-- ============================================================================
-- FRIENDSHIPS
-- ============================================================================

INSERT INTO friendships (id, userId1, userId2, status, createdAt) VALUES
('friendship-001', 'user-001', 'user-002', 'CONFIRMED', '2025-01-05T10:00:00Z'),
('friendship-002', 'user-001', 'user-005', 'CONFIRMED', '2025-01-06T10:00:00Z'),
('friendship-003', 'user-002', 'user-003', 'CONFIRMED', '2025-01-07T10:00:00Z'),
('friendship-004', 'user-003', 'user-006', 'CONFIRMED', '2025-01-08T10:00:00Z'),
('friendship-005', 'user-004', 'user-007', 'CONFIRMED', '2025-01-09T10:00:00Z'),
('friendship-006', 'user-005', 'user-008', 'CONFIRMED', '2025-01-10T10:00:00Z'),
('friendship-007', 'user-006', 'user-008', 'CONFIRMED', '2025-01-11T10:00:00Z');

-- ============================================================================
-- FOLLOWS
-- ============================================================================

INSERT INTO follows (id, followerId, followingId, createdAt) VALUES
('follow-001', 'user-001', 'user-003', '2025-01-06T10:00:00Z'),
('follow-002', 'user-002', 'user-005', '2025-01-07T10:00:00Z'),
('follow-003', 'user-004', 'user-008', '2025-01-08T10:00:00Z'),
('follow-004', 'user-007', 'user-001', '2025-01-09T10:00:00Z'),
('follow-005', 'user-008', 'user-005', '2025-01-10T10:00:00Z');

-- ============================================================================
-- CIRCLES
-- ============================================================================

INSERT INTO circles (id, name, description, privacy, hostId, createdAt) VALUES
('circle-001', 'Gym Crew', 'Fitness enthusiasts making accountability bets', 'FRIENDS_PUBLIC', 'user-001', '2025-01-10T10:00:00Z'),
('circle-002', 'Sports Fanatics', 'NFL, NBA, and soccer prediction battles', 'FRIENDS_PUBLIC', 'user-002', '2025-01-11T10:00:00Z'),
('circle-003', 'Reality TV Obsessed', 'Betting on reality show outcomes', 'PRIVATE', 'user-003', '2025-01-12T10:00:00Z'),
('circle-004', 'Tech Startup Squad', 'Friendly competition among tech founders', 'FRIENDS_PUBLIC', 'user-005', '2025-01-13T10:00:00Z');

-- ============================================================================
-- MEMBERSHIPS
-- ============================================================================

INSERT INTO memberships (id, circleId, userId, role, joinedAt) VALUES
('membership-001', 'circle-001', 'user-001', 'HOST', '2025-01-10T10:00:00Z'),
('membership-002', 'circle-001', 'user-005', 'MEMBER', '2025-01-10T11:00:00Z'),
('membership-003', 'circle-001', 'user-008', 'MEMBER', '2025-01-10T12:00:00Z'),
('membership-004', 'circle-002', 'user-002', 'HOST', '2025-01-11T10:00:00Z'),
('membership-005', 'circle-002', 'user-001', 'MEMBER', '2025-01-11T11:00:00Z'),
('membership-006', 'circle-002', 'user-006', 'MEMBER', '2025-01-11T12:00:00Z'),
('membership-007', 'circle-003', 'user-003', 'HOST', '2025-01-12T10:00:00Z'),
('membership-008', 'circle-003', 'user-006', 'MEMBER', '2025-01-12T11:00:00Z'),
('membership-009', 'circle-004', 'user-005', 'HOST', '2025-01-13T10:00:00Z'),
('membership-010', 'circle-004', 'user-002', 'MEMBER', '2025-01-13T11:00:00Z');

-- ============================================================================
-- BETS
-- ============================================================================

INSERT INTO bets (id, title, description, circleId, hostId, status, privacy, deadline, createdAt, resolvedAt, winningOptionId, proofRequirement) VALUES
('bet-001', 'Will Alex hit 20 consecutive pushups by Friday?', 'Alex challenges himself to do 20 consecutive pushups without breaking form. Must be video recorded.', 'circle-001', 'user-001', 'RESOLVED', 'FRIENDS_PUBLIC', '2025-01-24T23:59:59Z', '2025-01-14T10:00:00Z', '2025-01-24T18:00:00Z', 'opt-001', 'VIDEO'),
('bet-002', 'NFL Championship: Which team wins Super Bowl LIX?', 'Who will win the 2025 Super Bowl? Place your bets!', 'circle-002', 'user-002', 'LOCKED', 'FRIENDS_PUBLIC', '2025-02-09T23:59:59Z', '2025-01-12T10:00:00Z', NULL, NULL, 'NONE'),
('bet-003', 'Will Taylor launch a new product this quarter?', 'Will Taylor\'s startup launch a new product before the end of Q1 2025?', 'circle-004', 'user-005', 'OPEN', 'FRIENDS_PUBLIC', '2025-03-31T23:59:59Z', '2025-01-15T10:00:00Z', NULL, NULL, 'NONE'),
('bet-004', 'Reality TV: Who gets eliminated first on Love Island?', 'First contestant to be eliminated on the new Love Island season', 'circle-003', 'user-003', 'RESOLVED', 'PRIVATE', '2025-02-14T23:59:59Z', '2025-01-10T10:00:00Z', '2025-02-14T20:00:00Z', 'opt-010', 'NONE'),
('bet-005', 'Gym Challenge: Who burns 5000 calories by end of week?', 'Fitness tracker comparison - who reaches 5000 calories burned this week?', 'circle-001', 'user-005', 'RESOLVED', 'FRIENDS_PUBLIC', '2025-01-19T23:59:59Z', '2025-01-13T10:00:00Z', '2025-01-19T22:00:00Z', 'opt-014', 'PHOTO'),
('bet-006', 'NBA: Lakers vs Celtics - Who wins next matchup?', 'Upcoming Lakers vs Celtics game - predict the winner', 'circle-002', 'user-006', 'LOCKED', 'FRIENDS_PUBLIC', '2025-02-01T23:59:59Z', '2025-01-14T10:00:00Z', NULL, NULL, 'NONE'),
('bet-007', 'Will Casey pass the gaming certification?', 'Can Casey pass the esports competitive certification exam?', 'circle-004', 'user-002', 'OPEN', 'FRIENDS_PUBLIC', '2025-02-28T23:59:59Z', '2025-01-16T10:00:00Z', NULL, NULL, 'PHOTO'),
('bet-008', 'Roommate Chore Challenge: Dishes done by Sunday?', 'Will Jordan do all the dishes by Sunday night?', 'circle-001', 'user-001', 'RESOLVED', 'FRIENDS_PUBLIC', '2025-01-19T23:59:59Z', '2025-01-14T10:00:00Z', '2025-01-19T21:00:00Z', 'opt-024', 'PHOTO'),
('bet-009', 'Reality TV: Survivor tribal council prediction', 'Who will be voted out at the next tribal council on Survivor?', 'circle-003', 'user-006', 'OPEN', 'PRIVATE', '2025-02-20T23:59:59Z', '2025-01-17T10:00:00Z', NULL, NULL, 'NONE'),
('bet-010', 'Soccer: Champions League Final winner', 'Who will win the UEFA Champions League Final 2025?', 'circle-002', 'user-002', 'OPEN', 'FRIENDS_PUBLIC', '2025-06-01T23:59:59Z', '2025-01-18T10:00:00Z', NULL, NULL, 'NONE'),
('bet-011', 'Podcast Launch Challenge', 'Will Taylor launch their tech podcast by end of February?', 'circle-004', 'user-005', 'OPEN', 'FRIENDS_PUBLIC', '2025-02-28T23:59:59Z', '2025-01-19T10:00:00Z', NULL, NULL, 'PHOTO'),
('bet-012', 'Music Festival Lineup: Will headline artist perform?', 'Will the announced headline artist actually perform at Coachella?', 'circle-003', 'user-003', 'OPEN', 'FRIENDS_PUBLIC', '2025-04-20T23:59:59Z', '2025-01-20T10:00:00Z', NULL, NULL, 'NONE');

-- ============================================================================
-- BET OPTIONS
-- ============================================================================

INSERT INTO bet_options (id, betId, name, description) VALUES
('opt-001', 'bet-001', 'Yes', 'Alex will complete 20 pushups'),
('opt-002', 'bet-001', 'No', 'Alex will fail the challenge'),
('opt-003', 'bet-002', 'Kansas City Chiefs', 'Defending champions'),
('opt-004', 'bet-002', 'San Francisco 49ers', 'Strong Western contender'),
('opt-005', 'bet-002', 'Buffalo Bills', 'Consistent playoff team'),
('opt-006', 'bet-002', 'Other', 'Any other team'),
('opt-007', 'bet-003', 'Yes, new product launch', 'Taylor will announce a product'),
('opt-008', 'bet-003', 'No product launch', 'No new product announcement'),
('opt-009', 'bet-004', 'Marcus', 'Hot-headed contestant'),
('opt-010', 'bet-004', 'Zara', 'Shy contestant'),
('opt-011', 'bet-004', 'Devon', 'Popular contestant'),
('opt-012', 'bet-004', 'Someone else', 'Other contestant'),
('opt-013', 'bet-005', 'Alex Chen', 'The gym legend'),
('opt-014', 'bet-005', 'Taylor Kim', 'The fitness competitor'),
('opt-015', 'bet-005', 'Jamie Walsh', 'The rock climber'),
('opt-016', 'bet-006', 'Lakers', 'Western powerhouse'),
('opt-017', 'bet-006', 'Celtics', 'Eastern champion'),
('opt-018', 'bet-007', 'Pass (85+ score)', 'Casey gets 85 or higher'),
('opt-019', 'bet-007', 'Fail (below 85)', 'Casey scores below 85'),
('opt-020', 'bet-008', 'Yes, done by Sunday', 'All dishes completed'),
('opt-021', 'bet-008', 'Nope, still waiting', 'Dishes still undone'),
('opt-024', 'bet-008', 'Done by Sunday', 'Surprisingly complete'),
('opt-025', 'bet-009', 'Marcus', 'Strong player'),
('opt-026', 'bet-009', 'Samantha', 'Social butterfly'),
('opt-027', 'bet-009', 'Daniel', 'Weak link'),
('opt-028', 'bet-010', 'Real Madrid', 'Record champions'),
('opt-029', 'bet-010', 'Manchester City', 'Current best'),
('opt-030', 'bet-010', 'Bayern Munich', 'Consistent contender'),
('opt-031', 'bet-010', 'Other European team', 'Surprise finalist'),
('opt-032', 'bet-011', 'Yes, podcast launches', 'First episode posted'),
('opt-033', 'bet-011', 'No podcast by deadline', 'Delayed or cancelled'),
('opt-034', 'bet-012', 'Yes, performs at Coachella', 'Headline artist on stage'),
('opt-035', 'bet-012', 'No, cancelled or replaced', 'Doesn\'t perform');

-- ============================================================================
-- BET PICKS
-- ============================================================================

INSERT INTO bet_picks (id, betId, participantId, userId, optionId, status, pickedAt) VALUES
('pick-001', 'bet-001', 'participant-001', 'user-001', 'opt-001', 'PICKED', '2025-01-14T11:00:00Z'),
('pick-002', 'bet-001', 'participant-002', 'user-005', 'opt-001', 'PICKED', '2025-01-14T11:30:00Z'),
('pick-003', 'bet-001', 'participant-003', 'user-008', 'opt-002', 'PICKED', '2025-01-14T12:00:00Z'),
('pick-004', 'bet-002', 'participant-004', 'user-002', 'opt-003', 'PICKED', '2025-01-12T11:00:00Z'),
('pick-005', 'bet-002', 'participant-005', 'user-001', 'opt-004', 'PICKED', '2025-01-12T11:30:00Z'),
('pick-006', 'bet-002', 'participant-006', 'user-006', 'opt-005', 'PICKED', '2025-01-12T12:00:00Z'),
('pick-007', 'bet-003', 'participant-007', 'user-005', 'opt-007', 'PICKED', '2025-01-15T11:00:00Z'),
('pick-008', 'bet-003', 'participant-008', 'user-002', 'opt-008', 'PICKED', '2025-01-15T11:30:00Z'),
('pick-009', 'bet-004', 'participant-009', 'user-003', 'opt-010', 'PICKED', '2025-01-10T11:00:00Z'),
('pick-010', 'bet-004', 'participant-010', 'user-006', 'opt-009', 'PICKED', '2025-01-10T11:30:00Z'),
('pick-011', 'bet-005', 'participant-011', 'user-005', 'opt-014', 'PICKED', '2025-01-13T11:00:00Z'),
('pick-012', 'bet-005', 'participant-012', 'user-001', 'opt-013', 'PICKED', '2025-01-13T11:30:00Z'),
('pick-013', 'bet-005', 'participant-013', 'user-008', 'opt-015', 'PICKED', '2025-01-13T12:00:00Z'),
('pick-014', 'bet-006', 'participant-014', 'user-006', 'opt-016', 'PICKED', '2025-01-14T11:00:00Z'),
('pick-015', 'bet-006', 'participant-015', 'user-002', 'opt-017', 'PICKED', '2025-01-14T11:30:00Z'),
('pick-016', 'bet-007', 'participant-016', 'user-002', 'opt-018', 'PICKED', '2025-01-16T11:00:00Z'),
('pick-017', 'bet-008', 'participant-017', 'user-001', 'opt-024', 'PICKED', '2025-01-14T11:00:00Z'),
('pick-018', 'bet-008', 'participant-018', 'user-002', 'opt-021', 'PICKED', '2025-01-14T11:30:00Z'),
('pick-019', 'bet-009', 'participant-019', 'user-006', 'opt-027', 'PICKED', '2025-01-17T11:00:00Z'),
('pick-020', 'bet-009', 'participant-020', 'user-003', 'opt-025', 'PICKED', '2025-01-17T11:30:00Z'),
('pick-021', 'bet-010', 'participant-021', 'user-002', 'opt-028', 'PICKED', '2025-01-18T11:00:00Z'),
('pick-022', 'bet-010', 'participant-022', 'user-006', 'opt-029', 'PICKED', '2025-01-18T11:30:00Z'),
('pick-023', 'bet-011', 'participant-023', 'user-005', 'opt-032', 'PICKED', '2025-01-19T11:00:00Z'),
('pick-024', 'bet-011', 'participant-024', 'user-002', 'opt-033', 'PICKED', '2025-01-19T11:30:00Z'),
('pick-025', 'bet-012', 'participant-025', 'user-003', 'opt-034', 'PICKED', '2025-01-20T11:00:00Z');

-- ============================================================================
-- BET RESOLUTIONS
-- ============================================================================

INSERT INTO bet_resolutions (id, betId, winningOptionId, resolutionNotes, resolvedAt, resolvedBy) VALUES
('resolution-001', 'bet-001', 'opt-001', 'Video evidence submitted showing Alex completed 20 pushups with proper form', '2025-01-24T18:00:00Z', 'user-001'),
('resolution-002', 'bet-004', 'opt-010', 'Zara was voted out at tribal council episode aired 2025-02-14', '2025-02-14T20:00:00Z', 'user-003'),
('resolution-003', 'bet-005', 'opt-014', 'Taylor Kim\'s fitness tracker shows 5247 calories burned for the week', '2025-01-19T22:00:00Z', 'user-005'),
('resolution-004', 'bet-008', 'opt-024', 'Jordan submitted photo showing all dishes washed and put away', '2025-01-19T21:00:00Z', 'user-001');

-- ============================================================================
-- STAKE INSTANCES
-- ============================================================================

INSERT INTO stake_instances (id, betId, participantId, userId, status, amount, proofRequirement, createdAt, completedAt, dueDate, proofUploadId) VALUES
('stake-001', 'bet-001', 'participant-003', 'user-008', 'PENDING', 25, 'VIDEO', '2025-01-24T18:00:00Z', NULL, '2025-02-07T23:59:59Z', NULL),
('stake-002', 'bet-004', 'participant-010', 'user-006', 'COMPLETED', 20, 'NONE', '2025-02-14T20:00:00Z', '2025-02-15T10:00:00Z', NULL, 'proof-001'),
('stake-003', 'bet-005', 'participant-012', 'user-001', 'COMPLETED', 15, 'PHOTO', '2025-01-19T22:00:00Z', '2025-01-20T14:00:00Z', NULL, 'proof-002'),
('stake-004', 'bet-005', 'participant-013', 'user-008', 'PENDING', 15, 'PHOTO', '2025-01-19T22:00:00Z', NULL, '2025-02-02T23:59:59Z', NULL),
('stake-005', 'bet-008', 'participant-018', 'user-002', 'COMPLETED', 10, 'PHOTO', '2025-01-19T21:00:00Z', '2025-01-20T11:00:00Z', NULL, 'proof-003');

-- ============================================================================
-- PROOF UPLOADS
-- ============================================================================

INSERT INTO proof_uploads (id, stakeId, betId, userId, proofType, proofUrl, uploadedAt, verified, verifiedAt) VALUES
('proof-001', 'stake-002', 'bet-004', 'user-006', 'NONE', 'https://example.com/no-proof', '2025-02-15T10:00:00Z', 1, '2025-02-15T11:00:00Z'),
('proof-002', 'stake-003', 'bet-005', 'user-001', 'PHOTO', 'https://example.com/photos/alex-fitness-tracker.jpg', '2025-01-20T14:00:00Z', 1, '2025-01-20T15:00:00Z'),
('proof-003', 'stake-005', 'bet-008', 'user-002', 'PHOTO', 'https://example.com/photos/dishes-done.jpg', '2025-01-20T11:00:00Z', 1, '2025-01-20T12:00:00Z');

-- ============================================================================
-- IDENTITY BADGES
-- ============================================================================

INSERT INTO identity_badges (id, userId, level, overallScore, generatedAt, pillars_EXPRESS, pillars_PROTECT, pillars_CREATE, pillars_EVOLVE, pillars_CHANGE) VALUES
('badge-001', 'user-001', 'SILVER', 82, '2025-01-20T10:00:00Z', 85, 78, 82, 88, 75),
('badge-002', 'user-003', 'GOLD', 91, '2025-01-20T10:00:00Z', 92, 95, 88, 90, 91),
('badge-003', 'user-005', 'PLATINUM', 94, '2025-01-20T10:00:00Z', 94, 96, 91, 93, 94),
('badge-004', 'user-008', 'SILVER', 82, '2025-01-20T10:00:00Z', 80, 88, 76, 84, 82),
('badge-005', 'user-006', 'GOLD', 88, '2025-01-20T10:00:00Z', 89, 92, 85, 87, 88);

-- ============================================================================
-- VERIFICATION: Run these queries to verify data was imported
-- ============================================================================

-- SELECT COUNT(*) as total_users FROM users;
-- SELECT COUNT(*) as total_bets FROM bets;
-- SELECT COUNT(*) as total_circles FROM circles;
-- SELECT COUNT(*) as total_friendships FROM friendships;
-- SELECT COUNT(*) as total_identity_badges FROM identity_badges;
