#!/usr/bin/env node

/**
 * Rumble App - Database Seed Script
 * Reads seed-data.json and populates the database via API calls
 * 
 * Usage: npm run seed
 */

const fs = require('fs');
const path = require('path');

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin-seed-token';

// Helper function to make API calls
async function apiCall(method, endpoint, data = null, token = ADMIN_TOKEN) {
  const url = `${API_BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${json.message || JSON.stringify(json)}`);
    }

    return json;
  } catch (error) {
    console.error(`❌ Request failed for ${method} ${endpoint}:`, error.message);
    throw error;
  }
}

// Seed data loader
async function loadSeedData() {
  const seedPath = path.join(__dirname, 'seed-data.json');
  const rawData = fs.readFileSync(seedPath, 'utf8');
  return JSON.parse(rawData);
}

// Seeding functions
async function seedUsers(users) {
  console.log('\n📋 Seeding Users...');
  const createdUsers = {};

  for (const user of users) {
    try {
      const response = await apiCall('POST', '/users', {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        bio: user.bio,
        avatar: user.avatar,
      });

      createdUsers[user.id] = response;
      console.log(`  ✅ Created user: ${user.displayName} (${user.username})`);
    } catch (error) {
      console.log(`  ⚠️  User ${user.username} may already exist`);
    }
  }

  return createdUsers;
}

async function seedCircles(circles) {
  console.log('\n🔵 Seeding Circles...');
  const createdCircles = {};

  for (const circle of circles) {
    try {
      const response = await apiCall('POST', '/circles', {
        id: circle.id,
        name: circle.name,
        description: circle.description,
        privacy: circle.privacy,
        hostId: circle.hostId,
      });

      createdCircles[circle.id] = response;
      console.log(`  ✅ Created circle: ${circle.name}`);
    } catch (error) {
      console.log(`  ⚠️  Circle ${circle.name} may already exist`);
    }
  }

  return createdCircles;
}

async function seedMemberships(memberships) {
  console.log('\n👥 Seeding Circle Memberships...');

  for (const membership of memberships) {
    try {
      await apiCall('POST', `/circles/${membership.circleId}/members`, {
        userId: membership.userId,
        role: membership.role,
      });

      console.log(`  ✅ Added member ${membership.userId} to circle ${membership.circleId}`);
    } catch (error) {
      console.log(`  ⚠️  Membership may already exist: ${membership.userId} in ${membership.circleId}`);
    }
  }
}

async function seedBets(bets) {
  console.log('\n🎲 Seeding Bets...');
  const createdBets = {};

  for (const bet of bets) {
    try {
      const response = await apiCall('POST', '/bets', {
        id: bet.id,
        title: bet.title,
        description: bet.description,
        circleId: bet.circleId,
        hostId: bet.hostId,
        status: bet.status,
        privacy: bet.privacy,
        deadline: bet.deadline,
        proofRequirement: bet.proofRequirement,
      });

      createdBets[bet.id] = response;
      console.log(`  ✅ Created bet: ${bet.title.substring(0, 50)}...`);
    } catch (error) {
      console.log(`  ⚠️  Bet "${bet.title}" may already exist`);
    }
  }

  return createdBets;
}

async function seedBetOptions(betOptions) {
  console.log('\n🏷️  Seeding Bet Options...');

  for (const option of betOptions) {
    try {
      await apiCall('POST', `/bets/${option.betId}/options`, {
        id: option.id,
        name: option.name,
        description: option.description,
      });

      console.log(`  ✅ Added option: ${option.name} to bet ${option.betId}`);
    } catch (error) {
      console.log(`  ⚠️  Option may already exist: ${option.id}`);
    }
  }
}

async function seedBetPicks(betPicks) {
  console.log('\n✋ Seeding Bet Picks...');

  for (const pick of betPicks) {
    try {
      await apiCall('POST', `/bets/${pick.betId}/picks`, {
        participantId: pick.participantId,
        userId: pick.userId,
        optionId: pick.optionId,
      });

      console.log(`  ✅ Added pick from ${pick.userId} on bet ${pick.betId}`);
    } catch (error) {
      console.log(`  ⚠️  Pick may already exist: ${pick.id}`);
    }
  }
}

async function seedBetResolutions(betResolutions) {
  console.log('\n🏆 Seeding Bet Resolutions...');

  for (const resolution of betResolutions) {
    try {
      await apiCall('PATCH', `/bets/${resolution.betId}/resolve`, {
        winningOptionId: resolution.winningOptionId,
        resolutionNotes: resolution.resolutionNotes,
      });

      console.log(`  ✅ Resolved bet ${resolution.betId}`);
    } catch (error) {
      console.log(`  ⚠️  Bet resolution may already exist: ${resolution.betId}`);
    }
  }
}

async function seedStakeInstances(stakeInstances) {
  console.log('\n💰 Seeding Stake Instances...');

  for (const stake of stakeInstances) {
    try {
      await apiCall('POST', '/stakes', {
        id: stake.id,
        betId: stake.betId,
        participantId: stake.participantId,
        userId: stake.userId,
        amount: stake.amount,
        proofRequirement: stake.proofRequirement,
        status: stake.status,
      });

      console.log(`  ✅ Created stake ${stake.id} for user ${stake.userId}`);
    } catch (error) {
      console.log(`  ⚠️  Stake may already exist: ${stake.id}`);
    }
  }
}

async function seedProofUploads(proofUploads) {
  console.log('\n📸 Seeding Proof Uploads...');

  for (const proof of proofUploads) {
    try {
      await apiCall('POST', `/stakes/${proof.stakeId}/proof`, {
        proofType: proof.proofType,
        proofUrl: proof.proofUrl,
      });

      console.log(`  ✅ Added proof upload for stake ${proof.stakeId}`);
    } catch (error) {
      console.log(`  ⚠️  Proof upload may already exist: ${proof.id}`);
    }
  }
}

async function seedFriendships(friendships) {
  console.log('\n🤝 Seeding Friendships...');

  for (const friendship of friendships) {
    try {
      await apiCall('POST', '/friends/request', {
        recipientId: friendship.userId2,
      }, 'user-token-' + friendship.userId1);

      await apiCall('POST', '/friends/accept', {
        senderId: friendship.userId1,
      }, 'user-token-' + friendship.userId2);

      console.log(`  ✅ Created friendship between ${friendship.userId1} and ${friendship.userId2}`);
    } catch (error) {
      console.log(`  ⚠️  Friendship may already exist: ${friendship.userId1} <-> ${friendship.userId2}`);
    }
  }
}

async function seedFollows(follows) {
  console.log('\n👁️  Seeding Follows...');

  for (const follow of follows) {
    try {
      await apiCall('POST', `/users/${follow.followingId}/follow`, {}, 'user-token-' + follow.followerId);

      console.log(`  ✅ ${follow.followerId} now follows ${follow.followingId}`);
    } catch (error) {
      console.log(`  ⚠️  Follow may already exist: ${follow.followerId} -> ${follow.followingId}`);
    }
  }
}

async function seedIdentityBadges(identityBadges) {
  console.log('\n🏅 Seeding Identity Badges...');

  for (const badge of identityBadges) {
    try {
      await apiCall('POST', `/users/${badge.userId}/identity-badge`, {
        level: badge.level,
        pillars: badge.pillars,
        overallScore: badge.overallScore,
      });

      console.log(`  ✅ Generated ${badge.level} identity badge for user ${badge.userId}`);
    } catch (error) {
      console.log(`  ⚠️  Identity badge may already exist: ${badge.id}`);
    }
  }
}

// Main seeding function
async function main() {
  console.log('🌱 Rumble App - Database Seeding Script');
  console.log(`📡 API URL: ${API_BASE_URL}`);
  console.log('─'.repeat(50));

  try {
    // Load seed data
    const seedData = await loadSeedData();
    console.log(`✅ Loaded seed data from seed-data.json`);

    // Seed in correct order (respecting foreign keys)
    await seedUsers(seedData.users);
    await seedCircles(seedData.circles);
    await seedMemberships(seedData.memberships);
    await seedBets(seedData.bets);
    await seedBetOptions(seedData.bet_options);
    await seedBetPicks(seedData.bet_picks);
    await seedBetResolutions(seedData.bet_resolutions);
    await seedStakeInstances(seedData.stake_instances);
    await seedProofUploads(seedData.proof_uploads);
    await seedFriendships(seedData.friendships);
    await seedFollows(seedData.follows);
    await seedIdentityBadges(seedData.identity_badges);

    console.log('\n' + '─'.repeat(50));
    console.log('✅ Database seeding completed successfully!');
    console.log('\n📝 Demo Login Credentials:');
    console.log('   Email: demo@rumble.app');
    console.log('   Password: demopass123');
    console.log('   Account: Alex Chen (alexfitness)');
    console.log('\n🎮 Other demo accounts from seed data:');
    console.log('   - jordan@rumble.app (jordanbaker)');
    console.log('   - sam@rumble.app (samstreams)');
    console.log('   - casey@rumble.app (caseygames)');
    console.log('   - taylor@rumble.app (taylortech)');
    console.log('   - morgan@rumble.app (morganarts)');
    console.log('   - alex2@rumble.app (alexmusic)');
    console.log('   - jamie@rumble.app (jamieactive)');

  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

main();
