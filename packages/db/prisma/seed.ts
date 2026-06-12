import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const campus = await prisma.campus.upsert({
    where: { name_city: { name: "Mumbai Arts College", city: "Mumbai" } },
    update: {},
    create: { name: "Mumbai Arts College", city: "Mumbai", state: "Maharashtra" }
  });

  const user = await prisma.user.upsert({
    where: { firebaseUid: "demo-firebase-mira" },
    update: {},
    create: {
      firebaseUid: "demo-firebase-mira",
      username: "mira.moves",
      displayName: "Mira",
      campusId: campus.id,
      city: "Mumbai",
      settings: { create: { motionSensitivity: 72, notifyWorldDrop: true, notifyDuels: true, notifyMatches: true } },
      wallet: { create: { balance: 1200 } },
      vibeDna: {
        create: {
          vector: { intensity: 86, rhythm: 72, creativity: 91, humor: 64, confidence: 88, tempo: 78 },
          strand: ["pulse-84", "spark-19", "flow-72", "echo-38", "lift-93"],
          clipCount: 10
        }
      }
    }
  });

  const challenge = await prisma.challenge.create({
    data: {
      kind: "WORLD_DROP",
      title: "India Pulse Drop",
      prompt: "Create a 6-second movement clip that turns a jump into a bass drop.",
      tokenReward: 500
    }
  });

  const clip = await prisma.clip.create({
    data: {
      creatorId: user.id,
      caption: "Mirror Moment unlocked at the station stairs.",
      challengeTag: "#MumbaiJumpDrop",
      durationMs: 6000,
      vibeScore: 94,
      moderationStatus: "APPROVED",
      motionVector: { intensity: 86, rhythm: 72, creativity: 91, humor: 64, confidence: 88, tempo: 78 },
      soundAlchemy: { bpm: 150, bass: 95, synth: 82, reverb: 56, dropMomentsMs: [1200, 3100, 4800] },
      metrics: { create: { likes: 1804, comments: 92, shares: 341, saves: 127 } },
      assets: {
        create: {
          kind: "video",
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
          mimeType: "video/mp4"
        }
      }
    }
  });

  await prisma.lifeStamp.create({
    data: {
      userId: user.id,
      kind: "FIRST_CLIP",
      title: "First Mirror Moment",
      detail: "Created the first qanbie clip.",
      clipId: clip.id
    }
  });

  await prisma.comment.create({
    data: {
      clipId: clip.id,
      userId: user.id,
      body: "First seeded comment for the qanbie social layer.",
      likes: 12
    }
  });

  console.log({ campus: campus.id, user: user.id, challenge: challenge.id, clip: clip.id });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
