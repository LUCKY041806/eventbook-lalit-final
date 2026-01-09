// app/page.tsx
import Link from "next/link";

type EventItem = {
  _id: string;
  title: string;
  description?: string;
  category: string;
  tags?: string[];
  performerName: string;
  performerGenre?: string;
  performerImageUrl?: string;
  bannerUrl?: string;
  galleryImages?: string[];
  venue: { name?: string; city: string; state?: string };
  startDateTime: string;
  endDateTime?: string;
  ticketTypes?: Array<{ name: string; price: number; currency: string }>;
  isFeatured?: boolean;
  isTrending?: boolean;
  status?: string;
};

async function getEvents(): Promise<EventItem[]> {
  return [
    // 🔥 FEATURED EVENTS (First 5)
    {
      _id: "1",
      title: "AP Dhillon: Night Drive Tour",
      performerName: "AP Dhillon",
      performerGenre: "Punjabi Hip-Hop",
      category: "Concert",
      bannerUrl: "/images/banners/ap-dhillon-night-drive.jpg",
      performerImageUrl: "/images/artists/ap-dhillon.jpg",
      venue: { city: "Mumbai", state: "Maharashtra" },
      startDateTime: "2025-12-30T20:00:00Z",
      isFeatured: true,
      ticketTypes: [{ name: "Regular", price: 1500, currency: "INR" }],
    },
    {
      _id: "2",
      title: "Ed Sheeran Live in India",
      performerName: "Ed Sheeran",
      performerGenre: "Pop",
      category: "Concert",
      bannerUrl: "/images/banners/ed-sheeran-india.jpg",
      performerImageUrl: "/images/artists/ed-sheeran.jpg",
      venue: { city: "Mumbai", state: "Maharashtra" },
      startDateTime: "2025-12-31T20:00:00Z",
      isFeatured: true,
      ticketTypes: [{ name: "VIP", price: 8000, currency: "INR" }],
    },
    // 3) Honey Singh featured
    {
      _id: "3",
      title: "Yo Yo Honey Singh Live",
      performerName: "Yo Yo Honey Singh",
      performerGenre: "Rap/Hip-Hop",
      category: "Concert",
      bannerUrl: "/images/banners/honey-singh-mumbai.jpg", // ✅ exists
      performerImageUrl: "/images/artists/honey-singh.jpg", // ✅ exists
      venue: { city: "Pune", state: "Maharashtra" },
      startDateTime: "2026-01-04T21:00:00Z",
      isFeatured: true,
      ticketTypes: [{ name: "Premium", price: 3000, currency: "INR" }],
    },

    // 4) Arijit featured
    {
      _id: "4",
      title: "Arijit Singh Magical Night",
      performerName: "Arijit Singh",
      performerGenre: "Bollywood",
      category: "Concert",
      bannerUrl: "/images/banners/arijit-pune.jpg", // ✅ exists
      performerImageUrl: "/images/artists/arijit-singh.jpg", // ✅ exists
      venue: { city: "Goa", state: "Goa" },
      startDateTime: "2026-01-10T21:00:00Z",
      isFeatured: true,
      ticketTypes: [{ name: "VIP", price: 4500, currency: "INR" }],
    },

    {
      _id: "5",
      title: "Coldplay Mumbai Concert",
      performerName: "Coldplay",
      performerGenre: "Rock",
      category: "Concert",
      bannerUrl: "/images/banners/coldplay-mumbai.jpg",
      performerImageUrl: "/images/artists/coldplay.jpg",
      venue: { city: "Mumbai", state: "Maharashtra" },
      startDateTime: "2026-01-15T19:00:00Z",
      isFeatured: true,
      ticketTypes: [{ name: "General", price: 5000, currency: "INR" }],
    },

    // 🔥 REGULAR EVENTS (All remaining 12)
    {
      _id: "6",
      title: "Honey Singh Mumbai Show",
      performerName: "Honey Singh",
      category: "Concert",
      bannerUrl: "/images/banners/honey-singh-mumbai.jpg",
      performerImageUrl: "/images/artists/honey-singh.jpg",
      venue: { city: "Nagpur", state: "Maharashtra" },
      startDateTime: "2026-01-08T20:00:00Z",
      ticketTypes: [{ name: "Regular", price: 2500, currency: "INR" }],
    },
    {
      _id: "7",
      title: "Justin Bieber Mumbai",
      performerName: "Justin Bieber",
      category: "Concert",
      bannerUrl: "/images/banners/justin-bieber-mumbai.jpg",
      performerImageUrl: "/images/artists/justin-bieber.jpg",
      venue: { city: "Nashik", state: "Maharashtra" },
      startDateTime: "2026-01-12T20:00:00Z",
      ticketTypes: [{ name: "Premium", price: 6000, currency: "INR" }],
    },
    {
      _id: "8",
      title: "Sunset EDM Festival Goa",
      performerName: "Various DJs",
      category: "Festival",
      bannerUrl: "/images/banners/sunset-edm-goa.jpg",
      performerImageUrl: "/images/artists/edm-dj.jpg",
      venue: { city: "Goa", state: "Goa" },
      startDateTime: "2026-01-18T18:00:00Z",
      ticketTypes: [{ name: "3-Day Pass", price: 4000, currency: "INR" }],
    },
    {
      _id: "9",
      title: "Techno Night Goa",
      performerName: "Techno DJs",
      category: "EDM",
      bannerUrl: "/images/banners/techno-night-goa.jpg",
      performerImageUrl: "/images/artists/techno-dj.jpg",
      venue: { city: "Goa", state: "Goa" },
      startDateTime: "2026-01-20T22:00:00Z",
      ticketTypes: [{ name: "Night Pass", price: 2000, currency: "INR" }],
    },
    {
      _id: "10",
      title: "Indie Night Festival",
      performerName: "Indie Artists",
      category: "Festival",
      bannerUrl: "/images/banners/indie-night-mumbai.jpg",
      performerImageUrl: "/images/artists/indie-night.jpg",
      venue: { city: "Aurangabad", state: "Maharashtra" },
      startDateTime: "2026-01-22T19:30:00Z",
      ticketTypes: [{ name: "General", price: 1500, currency: "INR" }],
    },
    {
      _id: "11",
      title: "Justin Bieber EDM Show",
      performerName: "Justin Bieber",
      category: "EDM",
      bannerUrl: "/images/banners/justin-bieber-mumbai.jpg",
      performerImageUrl: "/images/artists/justin-bieber.jpg",
      venue: { city: "Kolhapur", state: "Maharashtra" },
      startDateTime: "2026-01-25T21:00:00Z",
      ticketTypes: [{ name: "VIP", price: 7000, currency: "INR" }],
    },
    {
      _id: "12",
      title: "EDM DJ Festival",
      performerName: "EDM DJs",
      category: "Festival",
      bannerUrl: "/images/banners/sunset-edm-goa.jpg",
      performerImageUrl: "/images/artists/edm-dj.jpg",
      venue: { city: "Thane", state: "Maharashtra" },
      startDateTime: "2026-01-28T20:00:00Z",
      ticketTypes: [{ name: "General", price: 2500, currency: "INR" }],
    },
    {
      _id: "13",
      title: "AP Dhillon Live",
      performerName: "AP Dhillon",
      category: "Concert",
      bannerUrl: "/images/banners/ap-dhillon-night-drive.jpg",
      performerImageUrl: "/images/artists/ap-dhillon.jpg",
      venue: { city: "Nashik", state: "Maharashtra" },
      startDateTime: "2026-02-01T20:00:00Z",
      ticketTypes: [{ name: "Gold", price: 2000, currency: "INR" }],
    },
    {
      _id: "14",
      title: "Coldplay Live",
      performerName: "Coldplay",
      category: "Concert",
      bannerUrl: "/images/banners/coldplay-mumbai.jpg",
      performerImageUrl: "/images/artists/coldplay.jpg",
      venue: { city: "Pune", state: "Maharashtra" },
      startDateTime: "2026-02-05T19:00:00Z",
      ticketTypes: [{ name: "Platinum", price: 10000, currency: "INR" }],
    },
    {
      _id: "15",
      title: "Honey Singh Night",
      performerName: "Honey Singh",
      category: "Concert",
      bannerUrl: "/images/banners/honey-singh-mumbai.jpg",
      performerImageUrl: "/images/artists/honey-singh.jpg",
      venue: { city: "Goa", state: "Goa" },
      startDateTime: "2026-02-10T21:00:00Z",
      ticketTypes: [{ name: "Royal", price: 4000, currency: "INR" }],
    },
    {
      _id: "16",
      title: "Techno DJ Night",
      performerName: "Techno DJ",
      category: "EDM",
      bannerUrl: "/images/banners/techno-night-goa.jpg",
      performerImageUrl: "/images/artists/techno-dj.jpg",
      venue: { city: "Mumbai", state: "Maharashtra" },
      startDateTime: "2026-02-15T23:00:00Z",
      ticketTypes: [{ name: "Night Pass", price: 1800, currency: "INR" }],
    },
    {
      _id: "17",
      title: "Indie Night Goa",
      performerName: "Indie Bands",
      category: "Concert",
      bannerUrl: "/images/banners/indie-night-mumbai.jpg",
      performerImageUrl: "/images/artists/indie-night.jpg",
      venue: { city: "Goa", state: "Goa" },
      startDateTime: "2026-02-20T20:30:00Z",
      ticketTypes: [{ name: "General", price: 1200, currency: "INR" }],
    },
  ];
}

export default async function HomePage() {
  const events = await getEvents();
  const featured = events.filter((e) => e.isFeatured);
  const regular = events.filter((e) => !e.isFeatured);

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
      {/* Hero */}
      <section className="text-center space-y-3">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          Discover events and book tickets
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Curated concerts and festivals across Maharashtra and Goa with rich
          artist profiles, venues, and real-time ticket availability.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
          <Link
            href="/events"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700 text-center"
          >
            Browse events
          </Link>
          <Link
            href="/organizer"
            className="inline-block border border-indigo-600 text-indigo-300 px-4 py-2 rounded text-sm hover:bg-indigo-50/10 text-center"
          >
            Organizer panel
          </Link>
        </div>
      </section>

      {/* Featured shows slider (manual scroll) */}
      <section className="space-y-3">
        <h3 className="font-semibold text-base sm:text-lg">Featured shows</h3>
        {featured.length === 0 ? (
          <p className="text-sm text-slate-500">
            No featured events yet. Use the seed API or organizer panel to add
            some.
          </p>
        ) : (
          <div className="overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 scrollbar-hide">
            <div className="flex gap-3 sm:gap-4 min-w-max">
              {featured.map((event) => (
                <Link
                  key={event._id}
                  href={`/events/${event._id}`}
                  className="w-64 sm:w-72 md:w-80 flex-shrink-0 bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 hover:border-indigo-500 transition snap-start"
                >
                  <div
                    className="h-40 sm:h-52 md:h-64 bg-cover bg-center"
                    style={{
                      backgroundImage: event.bannerUrl
                        ? `url(${event.bannerUrl})`
                        : "linear-gradient(to right,#4f46e5,#9333ea)",
                    }}
                  />
                  <div className="p-3 sm:p-4 flex gap-2 sm:gap-3 items-center -mt-10">
                    {event.performerImageUrl && (
                      <img
                        src={event.performerImageUrl}
                        alt={event.performerName}
                        className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover border-2 border-slate-900 bg-slate-900"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-[10px] sm:text-[11px] uppercase tracking-wide text-indigo-400">
                        {event.category}
                      </p>
                      <h4 className="text-xs sm:text-sm font-semibold line-clamp-2">
                        {event.title}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-400">
                        {event.performerName}
                        {event.performerGenre
                          ? ` • ${event.performerGenre}`
                          : ""}{" "}
                        • {event.venue.city}, {event.venue.state}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1">
                        {new Date(event.startDateTime)
                          .toISOString()
                          .split("T")[0]}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* All upcoming events - MANUAL HORIZONTAL SCROLL */}
      <section className="space-y-3">
        <h3 className="font-semibold text-base sm:text-lg">
          All upcoming events
        </h3>
        {regular.length === 0 ? (
          <p className="text-sm text-slate-500">
            No events yet. Create                                                                                  one from the organizer panel.
          </p>
        ) : (
          <div className="overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 scrollbar-hide">
            <div className="flex gap-3 sm:gap-4 min-w-max">
              {regular.map((event) => (
                <Link
                  key={event._id}
                  href={`/events/${event._id}`}
                  className="w-64 sm:w-72 md:w-80 flex-shrink-0 border border-slate-800 rounded-xl bg-slate-950/60 hover:border-indigo-500 transition-all duration-300 overflow-hidden snap-start"
                >
                  <div
                    className="h-40 sm:h-52 md:h-64 bg-cover bg-center"
                    style={{
                      backgroundImage: event.bannerUrl
                        ? `url(${event.bannerUrl})`
                        : "linear-gradient(to right,#0f172a,#1e293b)",
                    }}
                  />
                  <div className="p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3">
                    {event.performerImageUrl && (
                      <img
                        src={event.performerImageUrl}
                        alt={event.performerName}
                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border border-slate-700"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-[10px] sm:text-[11px] uppercase tracking-wide text-slate-500">
                        {event.category}
                      </p>
                      <h4 className="font-semibold text-xs sm:text-sm mt-0.5 line-clamp-2">
                        {event.title}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-400">
                        {event.performerName} • {event.venue.city},{" "}
                        {event.venue.state}
                      </p>
                      <p className="mt-1 text-[10px] sm:text-[11px] text-slate-500">
                        {new Date(event.startDateTime)
                          .toISOString()
                          .split("T")[0]}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
