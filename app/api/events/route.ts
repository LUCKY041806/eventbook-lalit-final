// app/api/events/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { Event } from "@/lib/models";
import { ObjectId } from "mongodb";

// GET /api/events -> list all events
export async function GET() {
  try {
    const db = await getDb();

    const events = await db
      .collection<Event>("events")
      .find({})
      .toArray();

    return NextResponse.json({ success: true, events });
  } catch (error) {
    console.error("GET /api/events error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// POST /api/events -> create event
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const db = await getDb();

    const event: Event = {
      organizerId: new ObjectId(body.organizerId),
      title: body.title,
      description: body.description,
      category: body.category,
      venue: body.venue,
      startDateTime: new Date(body.startDateTime),
      endDateTime: new Date(body.endDateTime),
      bannerUrl: body.bannerUrl,
      ticketTypes: body.ticketTypes,
      status: "published",
      createdAt: new Date(),
      updatedAt: new Date(),
      performerName: "",
    };

    const result = await db.collection<Event>("events").insertOne(event);

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("POST /api/events error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create event" },
      { status: 500 }
    );
  }
}
