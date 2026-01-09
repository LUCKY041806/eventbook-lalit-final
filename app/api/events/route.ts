// app/api/events/seed/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { Event } from "@/lib/models";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const db = await getDb();
    const eventsCol = db.collection<Event>("events");
    const events = await eventsCol.find({}).toArray();
    return NextResponse.json({ events });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(_req: NextRequest) {
  try {
    const db = await getDb();
    const eventsCol = db.collection<Event>("events");

    const organizerId = new ObjectId("64a7f4a3c6dd3a6e3c4a1234");
    const now = new Date();

    const events: Event[] = [
      {
        organizerId,
        title: "AP Dhillon: Night Drive Tour – Dombivli",
        description:
          "Experience AP Dhillon live with his chart-topping Punjabi hits, immersive lighting, and a high-energy crowd. Special visual set designed for the Night Drive Tour.",
        category: "Concert",
        tags: ["punjabi", "pop", "live", "concert"],
        performerName: "AP Dhillon",
        performerGenre: "Punjabi Pop",
        performerImageUrl: "/images/artists/ap-dhillon.jpg",
        bannerUrl: "/images/banners/ap-dhillon-night-drive.jpg",
        galleryImages: ["/images/banners/ap-dhillon-night-drive.jpg"],
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
          { name: "Fan Pit", price: 2999, totalQuantity: 100, soldQuantity: 0 },
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
          "A full-power night with Yo Yo Honey Singh performing his biggest Bollywood and independent hits. Massive LED wall, bass-heavy sound system, and non-stop energy.",
        category: "Concert",
        tags: ["bollywood", "rap", "hip hop"],
        performerName: "Yo Yo Honey Singh",
        performerGenre: "Rap / Hip-Hop",
        performerImageUrl: "/images/artists/honey-singh.jpg",
        bannerUrl: "/images/banners/honey-singh-mumbai.jpg",
        galleryImages: ["/images/banners/honey-singh-mumbai.jpg"],
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
          "Sit back and sing along as Arijit Singh performs his most loved romantic and soulful tracks with a full live band and orchestral arrangements.",
        category: "Concert",
        tags: ["romantic", "bollywood", "live"],
        performerName: "Arijit Singh",
        performerGenre: "Playback / Romantic",
        performerImageUrl: "/images/artists/arijit-singh.jpg",
        bannerUrl: "/images/banners/arijit-pune.jpg",
        galleryImages: ["/images/banners/arijit-pune.jpg"],
        venue: {
          name: "Balewadi Stadium",
          address: "Baner – Balewadi, Pune",
          city: "Pune",
          state: "Maharashtra",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=Balewadi+Stadium+Pune",
        },
        startDateTime: new Date("2025-12-26T19:30:00+05:30"),
        endDateTime: new Date("2025-12-26T22:30:00+05:30"),
        ticketTypes: [
          { name: "General", price: 1500, totalQuantity: 3000, soldQuantity: 0 },
          { name: "Premium Seating", price: 2500, totalQuantity: 1000, soldQuantity: 0 },
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
        galleryImages: ["/images/banners/sunset-edm-goa.jpg"],
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
          {
            name: "Day 1 Pass",
            price: 2500,
            totalQuantity: 3000,
            soldQuantity: 0,
          },
          {
            name: "Day 2 Pass",
            price: 2500,
            totalQuantity: 3000,
            soldQuantity: 0,
          },
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
      {
        organizerId,
        title: "Ed Sheeran – Mathematics Tour, India",
        description:
          "Ed Sheeran performs his biggest hits like Shape of You, Perfect, and Bad Habits in an intimate yet electrifying live concert.",
        category: "Concert",
        tags: ["international", "pop", "acoustic", "live"],
        performerName: "Ed Sheeran",
        performerGenre: "Pop / Acoustic",
        performerImageUrl: "/images/artists/ed-sheeran.jpg",
        bannerUrl: "/images/banners/ed-sheeran-india.jpg",
        galleryImages: ["/images/banners/ed-sheeran-india.jpg"],
        venue: {
          name: "Jawaharlal Nehru Stadium",
          address: "Lodhi Road",
          city: "Delhi",
          state: "Delhi",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=Jawaharlal+Nehru+Stadium+Delhi",
        },
        startDateTime: new Date("2026-02-02T19:00:00+05:30"),
        endDateTime: new Date("2026-02-02T22:00:00+05:30"),
        ticketTypes: [
          { name: "General Standing", price: 4500, totalQuantity: 12000, soldQuantity: 0 },
          { name: "Premium Standing", price: 7500, totalQuantity: 6000, soldQuantity: 0 },
          { name: "VIP", price: 12000, totalQuantity: 1000, soldQuantity: 0 },
        ],
        isFeatured: true,
        isTrending: true,
        status: "published",
        createdAt: now,
        updatedAt: now,
      },
      {
        organizerId,
        title: "Justin Bieber – Justice World Tour, Mumbai",
        description:
          "Global pop sensation Justin Bieber returns to Mumbai with a high-energy show featuring chart-topping hits and stunning stage production.",
        category: "Concert",
        tags: ["international", "pop", "dance"],
        performerName: "Justin Bieber",
        performerGenre: "Pop / R&B",
        performerImageUrl: "/images/artists/justin-bieber.jpg",
        bannerUrl: "/images/banners/justin-bieber-mumbai.jpg",
        galleryImages: ["/images/banners/justin-bieber-mumbai.jpg"],
        venue: {
          name: "Jio World Garden",
          address: "BKC",
          city: "Mumbai",
          state: "Maharashtra",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=Jio+World+Garden+BKC",
        },
        startDateTime: new Date("2026-03-05T19:30:00+05:30"),
        endDateTime: new Date("2026-03-05T22:30:00+05:30"),
        ticketTypes: [
          { name: "Silver", price: 4000, totalQuantity: 6000, soldQuantity: 0 },
          { name: "Gold", price: 7000, totalQuantity: 3000, soldQuantity: 0 },
          { name: "VIP Pit", price: 15000, totalQuantity: 500, soldQuantity: 0 },
        ],
        isFeatured: true,
        isTrending: true,
        status: "published",
        createdAt: now,
        updatedAt: now,
      },
      {
        organizerId,
        title: "Indie Night Live – Mumbai",
        description:
          "An evening of soulful indie music featuring top Indian independent artists, chill vibes, and intimate live performances.",
        category: "Concert",
        tags: ["indie", "live", "acoustic"],
        performerName: "Various Indie Artists",
        performerGenre: "Indie / Alternative",
        performerImageUrl: "/images/artists/indie-night.jpg",
        bannerUrl: "/images/banners/indie-night-mumbai.jpg",
        galleryImages: ["/images/banners/indie-night-mumbai.jpg"],
        venue: {
          name: "AntiSocial",
          address: "Lower Parel",
          city: "Mumbai",
          state: "Maharashtra",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=AntiSocial+Lower+Parel",
        },
        startDateTime: new Date("2025-12-20T18:00:00+05:30"),
        endDateTime: new Date("2025-12-20T22:00:00+05:30"),
        ticketTypes: [
          { name: "Entry Pass", price: 799, totalQuantity: 500, soldQuantity: 0 },
          { name: "Front Row", price: 1299, totalQuantity: 150, soldQuantity: 0 },
        ],
        isFeatured: false,
        isTrending: false,
        status: "published",
        createdAt: now,
        updatedAt: now,
      },
      {
        organizerId,
        title: "Techno Night – Underground Goa",
        description:
          "A high-BPM underground techno night with hypnotic beats, warehouse lighting, and Goa’s finest electronic DJs.",
        category: "Nightlife",
        tags: ["techno", "edm", "goa", "nightlife"],
        performerName: "Techno DJs Collective",
        performerGenre: "Techno / Minimal",
        performerImageUrl: "/images/artists/techno-dj.jpg",
        bannerUrl: "/images/banners/techno-night-goa.jpg",
        galleryImages: ["/images/banners/techno-night-goa.jpg"],
        venue: {
          name: "Hilltop",
          address: "Vagator",
          city: "Vagator",
          state: "Goa",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=Hilltop+Vagator+Goa",
        },
        startDateTime: new Date("2025-12-31T22:00:00+05:30"),
        endDateTime: new Date("2026-01-01T06:00:00+05:30"),
        ticketTypes: [
          { name: "Entry", price: 1800, totalQuantity: 1200, soldQuantity: 0 },
          { name: "VIP Deck", price: 3500, totalQuantity: 200, soldQuantity: 0 },
        ],
        isFeatured: true,
        isTrending: false,
        status: "published",
        createdAt: now,
        updatedAt: now,
      },
      {
        organizerId,
        title: "Coldplay – Music of the Spheres, Mumbai",
        description:
          "Coldplay brings their iconic Music of the Spheres tour to Mumbai with stunning visuals, LED wristbands, and an unforgettable stadium experience.",
        category: "Concert",
        tags: ["international", "rock", "pop", "stadium"],
        performerName: "Coldplay",
        performerGenre: "Alternative Rock / Pop",
        performerImageUrl: "/images/artists/coldplay.jpg",
        bannerUrl: "/images/banners/coldplay-mumbai.jpg",
        galleryImages: ["/images/banners/coldplay-mumbai.jpg"],
        venue: {
          name: "DY Patil Stadium",
          address: "Nerul, Navi Mumbai",
          city: "Mumbai",
          state: "Maharashtra",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=DY+Patil+Stadium+Navi+Mumbai",
        },
        startDateTime: new Date("2026-01-25T18:30:00+05:30"),
        endDateTime: new Date("2026-01-25T22:30:00+05:30"),
        ticketTypes: [
          { name: "Upper Bowl", price: 3500, totalQuantity: 15000, soldQuantity: 0 },
          { name: "Lower Bowl", price: 6500, totalQuantity: 8000, soldQuantity: 0 },
          { name: "Ground Standing", price: 9500, totalQuantity: 5000, soldQuantity: 0 },
        ],
        isFeatured: true,
        isTrending: true,
        status: "published",
        createdAt: now,
        updatedAt: now,
      },
    ];

    await eventsCol.deleteMany({});
    const result = await eventsCol.insertMany(events);

    return NextResponse.json({
      success: true,
      insertedCount: result.insertedCount,
    });
  } catch (error) {
    console.error("POST /api/events/seed error:", error);
    return NextResponse.json(
      { success: false, message: "Seed failed" },
      { status: 200 }
    );
  }
}
