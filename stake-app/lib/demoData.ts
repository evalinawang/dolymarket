/**
 * DEMO DATA SCRIPT
 * 
 * This script provides mock demo data to test the Stake app frontend flows.
 * It populates localStorage with sample data and can be run from the browser console.
 * 
 * Usage:
 * 1. Open browser DevTools Console
 * 2. Copy and paste this script content
 * 3. Run: setupDemoData()
 * 4. Refresh page and login with demo credentials
 * 
 * Demo Credentials:
 * - Email: demo@stake.app
 * - Password: demo123
 * - Username: demouser
 */

export function setupDemoData() {
  // Sample User
  const currentUser = {
    id: 'user-demo-001',
    email: 'demo@stake.app',
    username: 'demouser',
    displayName: 'Demo User',
    bio: 'Testing the Stake app',
    createdAt: new Date('2025-01-01').toISOString(),
  };

  // Sample Circles
  const circles = [
    {
      id: 'circle-001',
      name: 'Friends & Games',
      description: 'Close friends betting circle',
      createdBy: currentUser.id,
      createdAt: new Date('2025-01-05').toISOString(),
      members: [
        { userId: currentUser.id, joinedAt: new Date('2025-01-05').toISOString() },
        {
          userId: 'user-002',
          joinedAt: new Date('2025-01-06').toISOString(),
        },
      ],
      isPrivate: true,
    },
    {
      id: 'circle-002',
      name: 'Sports Predictions',
      description: 'Sports betting and predictions',
      createdBy: 'user-003',
      createdAt: new Date('2024-12-20').toISOString(),
      members: [
        { userId: currentUser.id, joinedAt: new Date('2025-01-10').toISOString() },
        {
          userId: 'user-003',
          joinedAt: new Date('2024-12-20').toISOString(),
        },
      ],
      isPrivate: false,
    },
  ];

  // Sample Bets
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const bets = [
    {
      id: 'bet-001',
      title: 'Will it rain tomorrow?',
      description: 'In the San Francisco Bay Area',
      circleId: circles[0].id,
      hostId: 'user-002',
      status: 'OPEN',
      options: [
        { id: 'opt-001', name: 'Yes', description: '' },
        { id: 'opt-002', name: 'No', description: '' },
      ],
      deadline: tomorrow.toISOString(),
      privacy: 'FRIENDS_PUBLIC',
      stakeTemplate: { type: 'fixed', amount: 10 },
      proofRequirement: 'none',
      createdAt: new Date('2025-01-15').toISOString(),
      participants: [
        {
          id: 'part-001',
          betId: 'bet-001',
          userId: currentUser.id,
          pick: 'opt-001',
          status: 'picked',
        },
        {
          id: 'part-002',
          betId: 'bet-001',
          userId: 'user-002',
          pick: 'opt-002',
          status: 'picked',
        },
      ],
    },
    {
      id: 'bet-002',
      title: 'Who will win the Super Bowl?',
      description: 'Jan 26, 2025 - Favorite to win',
      circleId: circles[1].id,
      hostId: 'user-003',
      status: 'OPEN',
      options: [
        { id: 'opt-003', name: 'Chiefs', description: 'Kansas City' },
        { id: 'opt-004', name: '49ers', description: 'San Francisco' },
        { id: 'opt-005', name: 'Other', description: '' },
      ],
      deadline: new Date('2025-01-26').toISOString(),
      privacy: 'FRIENDS_PUBLIC',
      stakeTemplate: { type: 'fixed', amount: 25 },
      proofRequirement: 'photo',
      createdAt: new Date('2025-01-10').toISOString(),
      participants: [
        {
          id: 'part-003',
          betId: 'bet-002',
          userId: currentUser.id,
          pick: 'opt-003',
          status: 'picked',
        },
        {
          id: 'part-004',
          betId: 'bet-002',
          userId: 'user-003',
          pick: 'opt-004',
          status: 'picked',
        },
      ],
    },
    {
      id: 'bet-003',
      title: 'Coffee shop - cappuccino taste test',
      description: 'Best cappuccino in the neighborhood',
      circleId: circles[0].id,
      hostId: currentUser.id,
      status: 'LOCKED',
      options: [
        { id: 'opt-006', name: 'Espresso Lab', description: '' },
        { id: 'opt-007', name: 'Bean There', description: '' },
        { id: 'opt-008', name: 'The Grind House', description: '' },
      ],
      deadline: yesterday.toISOString(),
      privacy: 'CIRCLE_ONLY',
      stakeTemplate: { type: 'fixed', amount: 5 },
      proofRequirement: 'none',
      createdAt: new Date('2025-01-01').toISOString(),
      participants: [
        {
          id: 'part-005',
          betId: 'bet-003',
          userId: currentUser.id,
          pick: 'opt-006',
          status: 'picked',
        },
        {
          id: 'part-006',
          betId: 'bet-003',
          userId: 'user-002',
          pick: 'opt-007',
          status: 'pending',
        },
      ],
      resolvedAt: new Date('2025-01-16').toISOString(),
      winningOptionId: 'opt-007',
    },
  ];

  // Sample Stake Instances (pending stakes user owes)
  const stakeInstances = [
    {
      id: 'stake-001',
      betId: 'bet-003',
      participantId: 'part-005',
      userId: currentUser.id,
      amount: 5,
      status: 'pending',
      proofStatus: 'not_required',
      createdAt: new Date('2025-01-16').toISOString(),
    },
  ];

  // Sample Friends
  const friends = [
    {
      id: 'friend-001',
      userId1: currentUser.id,
      userId2: 'user-002',
      status: 'accepted',
      createdAt: new Date('2025-01-05').toISOString(),
    },
    {
      id: 'friend-002',
      userId1: currentUser.id,
      userId2: 'user-003',
      status: 'accepted',
      createdAt: new Date('2024-12-20').toISOString(),
    },
  ];

  // Sample Following
  const following = [
    {
      id: 'follow-001',
      followerId: currentUser.id,
      followingId: 'user-004',
      createdAt: new Date('2025-01-12').toISOString(),
    },
  ];

  // Store in localStorage
  localStorage.setItem('auth_user', JSON.stringify(currentUser));
  localStorage.setItem('auth_token', 'demo-jwt-token-12345');
  localStorage.setItem('demo_circles', JSON.stringify(circles));
  localStorage.setItem('demo_bets', JSON.stringify(bets));
  localStorage.setItem('demo_stake_instances', JSON.stringify(stakeInstances));
  localStorage.setItem('demo_friends', JSON.stringify(friends));
  localStorage.setItem('demo_following', JSON.stringify(following));

  console.log('✅ Demo data loaded successfully!');
  console.log('---');
  console.log('📋 Loaded:');
  console.log(`  • ${circles.length} circles`);
  console.log(`  • ${bets.length} bets`);
  console.log(`  • ${stakeInstances.length} pending stakes`);
  console.log(`  • ${friends.length} friends`);
  console.log(`  • ${following.length} following`);
  console.log('---');
  console.log('🔑 Demo Credentials:');
  console.log('  Email: demo@stake.app');
  console.log('  Password: demo123');
  console.log('  Username: demouser');
  console.log('---');
  console.log('💡 Next steps:');
  console.log('  1. Refresh the page');
  console.log('  2. Login with demo credentials');
  console.log('  3. Explore the app!');
}

// Make function available globally
if (typeof window !== 'undefined') {
  (window as any).setupDemoData = setupDemoData;
}
