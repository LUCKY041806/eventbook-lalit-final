// app/events/page.tsx
import Link from "next/link";

type EventItem = {
  _id: string;
  title: string;
  category: string;
  performerName: string;
  performerGenre?: string;
  performerImageUrl?: string;
  bannerUrl?: string;
  venue: { city: string; state?: string };
  startDateTime: string;
  description: string;
};

async function getEvents(): Promise<EventItem[]> {
  const res = await fetch("http://localhost:3001/api/events", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.events as EventItem[];
}

export default async function EventsPage() {
  const events = await getEvents();

  if (!events || events.length === 0) {
    return (
      <p className="text-sm text-slate-400">
        No events found. Add some from the organizer panel.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Upcoming events</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60 shadow-sm"
          >
            {/* Top banner image */}
            <div
              className="h-28 bg-cover bg-center"
              style={{
                backgroundImage: event.bannerUrl
                  ? `url(${event.bannerUrl})`
                  : "linear-gradient(to right, #4f46e5, #9333ea)",
              }}
            />

            <div className="p-4 flex gap-3">
              {/* Artist avatar */}
              {event.performerImageUrl && (
                <img
                  src={event.performerImageUrl}
                  alt={event.performerName}
                  className="h-12 w-12 rounded-full object-cover border border-slate-700"
                />
              )}

              <div className="flex-1">
                <p className="text-[11px] uppercase tracking-wide text-slate-500">
                  {event.category}
                </p>
                <h3 className="font-semibold text-sm mt-0.5">
                  {event.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {event.performerName}
                  {event.performerGenre ? ` • ${event.performerGenre}` : ""} •{" "}
                  {event.venue.city}, {event.venue.state}
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  {new Date(event.startDateTime).toLocaleString()}
                </p>

                <p className="mt-2 text-xs line-clamp-2 text-slate-400">
                  {event.description}
                </p>

    <Link href={`/events/${event._id}`}>View Details & Book</Link>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
