// app/api/seed/route.ts
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { Event } from "@/lib/models";
import { ObjectId } from "mongodb";

export async function POST() {
  try {
    const db = await getDb();
    const eventsCol = db.collection<Event>("events");

    // Simple dummy organizer id for all seeded events
    const organizerId = new ObjectId("64a7f4a3c6dd3a6e3c4a1234");

    const now = new Date();

    const events: Event[] = [
      {
        organizerId,
        title: "AP Dhillon: Night Drive Tour – Dombivli",
        description:
          "Experience AP Dhillon live with his chart‑topping Punjabi hits, immersive lighting, and a high‑energy crowd. Special visual set designed for the Night Drive Tour.",
        category: "Concert",
        tags: ["punjabi", "pop", "live", "concert"],
        performerName: "AP Dhillon",
        performerGenre: "Punjabi Pop",
        performerImageUrl: "/images/artists/ap-dhillon.jpg",
        bannerUrl: "/images/banners/ap-dhillon-night-drive.jpg",
        galleryImages: [
          "/images/banners/ap-dhillon-night-drive.jpg",
        ],
        venue: {
          name: "Dombivli Gymkhana Grounds",
          address: "Dombivli East, Thane",
          city: "Dombivli",
          state: "Maharashtra",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=Dombivli+Gymkhana+Grounds",
        },
        startDateTime: new Date("2025-12-26T19:30:00+05:30"),
        endDateTime: new Date("2025-12-26T22:30:00+05:30"),
        ticketTypes: [
          { name: "Regular", price: 799, totalQuantity: 1500, soldQuantity: 0 },
          { name: "VIP", price: 1999, totalQuantity: 200, soldQuantity: 0 },
          {
            name: "Fan Pit",
            price: 2999,
            totalQuantity: 100,
            soldQuantity: 0,
          },
        ],
        isFeatured: true,
        isTrending: true,
        status: "published",
        createdAt: now,
        updatedAt: now,
      },
      {
        organizerId,
        title: "Yo Yo Honey Singh – Mumbai Blockbuster Night",
        description:
          "A full‑power night with Yo Yo Honey Singh performing his biggest Bollywood and independent hits. Massive LED wall and bass‑heavy sound system.",
        category: "Concert",
        tags: ["bollywood", "rap", "hip hop"],
        performerName: "Yo Yo Honey Singh",
        performerGenre: "Rap / Hip‑Hop",
        performerImageUrl: "/images/artists/honey-singh.jpg",
        bannerUrl: "/images/banners/honey-singh-mumbai.jpg",
        galleryImages: [
          "/images/banners/honey-singh-mumbai.jpg",
        ],
        venue: {
          name: "Mahalaxmi Race Course",
          address: "Mahalaxmi, Mumbai",
          city: "Mumbai",
          state: "Maharashtra",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=Mahalaxmi+Race+Course+Mumbai",
        },
        startDateTime: new Date("2026-01-18T20:00:00+05:30"),
        endDateTime: new Date("2026-01-19T00:00:00+05:30"),
        ticketTypes: [
          { name: "Silver", price: 999, totalQuantity: 2000, soldQuantity: 0 },
          { name: "Gold", price: 1799, totalQuantity: 1000, soldQuantity: 0 },
          { name: "VVIP Table", price: 9999, totalQuantity: 50, soldQuantity: 0 },
        ],
        isFeatured: true,
        isTrending: true,
        status: "published",
        createdAt: now,
        updatedAt: now,
      },
      {
        organizerId,
        title: "Arijit Singh – Soulful Evenings, Pune",
        description:
          "Sit back and sing along as Arijit Singh performs his most loved romantic and soulful tracks with a full live band and strings section.",
        category: "Concert",
        tags: ["romantic", "bollywood", "live"],
        performerName: "Arijit Singh",
        performerGenre: "Playback / Romantic",
        performerImageUrl: "/images/artists/arijit-singh.jpg",
        bannerUrl: "/images/banners/arijit-pune.jpg",
        galleryImages: [
          "/images/banners/arijit-pune.jpg",
        ],
        venue: {
          name: "Balewadi Stadium",
          address: "Baner – Balewadi, Pune",
          city: "Pune",
          state: "Maharashtra",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=Balewadi+Stadium+Pune",
        },
        startDateTime: new Date("2026-02-10T19:00:00+05:30"),
        endDateTime: new Date("2026-02-10T22:30:00+05:30"),
        ticketTypes: [
          { name: "General", price: 1500, totalQuantity: 3000, soldQuantity: 0 },
          {
            name: "Premium Seating",
            price: 2500,
            totalQuantity: 1000,
            soldQuantity: 0,
          },
          { name: "VIP Lounge", price: 4500, totalQuantity: 200, soldQuantity: 0 },
        ],
        isFeatured: false,
        isTrending: true,
        status: "published",
        createdAt: now,
        updatedAt: now,
      },
      {
        organizerId,
        title: "Sunset EDM Festival – Goa Beach Edition",
        description:
          "A two‑day EDM festival featuring top Indian and international DJs, beach stages, and after‑parties that go on till sunrise.",
        category: "Festival",
        tags: ["EDM", "festival", "goa", "beach"],
        performerName: "Multiple Artists",
        performerGenre: "EDM / House / Trance",
        performerImageUrl: "/images/artists/edm-dj.jpg",
        bannerUrl: "/images/banners/sunset-edm-goa.jpg",
        galleryImages: [
          "/images/banners/sunset-edm-goa.jpg",
        ],
        venue: {
          name: "Calangute Beach Festival Arena",
          address: "Calangute, North Goa",
          city: "Calangute",
          state: "Goa",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=Calangute+Beach+Goa",
        },
        startDateTime: new Date("2025-12-28T16:00:00+05:30"),
        endDateTime: new Date("2025-12-29T23:59:59+05:30"),
        ticketTypes: [
          { name: "Day 1 Pass", price: 2500, totalQuantity: 3000, soldQuantity: 0 },
          { name: "Day 2 Pass", price: 2500, totalQuantity: 3000, soldQuantity: 0 },
          {
            name: "2‑Day Festival Pass",
            price: 4200,
            totalQuantity: 4000,
            soldQuantity: 0,
          },
        ],
        isFeatured: true,
        isTrending: false,
        status: "published",
        createdAt: now,
        updatedAt: now,
      },
    ];

    await eventsCol.deleteMany({}); // optional: clear old events
    const result = await eventsCol.insertMany(events);

    return NextResponse.json({
      success: true,
      insertedCount: result.insertedCount,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Seed failed" },
      { status: 500 },
    );
  }
}
