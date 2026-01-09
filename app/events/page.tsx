import Link from "next/link";

type EventItem = {
  _id: string;
  title: string;
  category: string;
  performerName: string;
  performerGenre?: string;
  performerImageUrl?: string;
  bannerUrl?: string;
  venue: { city: string };
  startDateTime: string;
  description: string;
};

async function getEvents(): Promise<EventItem[]> {
  try {
    const res = await fetch("http://localhost:3001/api/events", { 
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.events || [];
  } catch (error) {
    console.error("getEvents error:", error);
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  if (!events || events.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl flex items-center justify-center">
            <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mb-2">No Events Yet</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Events will appear here once organizers add them. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Upcoming Events
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Discover amazing live experiences near you
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12 text-center max-w-md mx-auto">
          <div>
            <div className="text-3xl font-bold text-indigo-400">{events.length}</div>
            <div className="text-sm text-slate-400 uppercase tracking-wider">Live Events</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400">{events.filter(e => e.category === 'Concert').length}</div>
            <div className="text-sm text-slate-400 uppercase tracking-wider">Concerts</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-400">{new Set(events.map(e => e.venue.city)).size}</div>
            <div className="text-sm text-slate-400 uppercase tracking-wider">Cities</div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <Link
              key={event._id}
              href={`/events/${event._id}`}
              className="group relative overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 shadow-lg"
            >
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-gradient-to-r from-indigo-500/90 to-purple-600/90 text-xs font-bold text-white rounded-full shadow-lg">
                  {event.category}
                </span>
              </div>

             {/* Banner Image */}
<div className="relative h-48 w-full overflow-hidden rounded-t-2xl 
                bg-gradient-to-br from-slate-800 to-slate-900 
                group-hover:from-indigo-900/20">

  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat 
               opacity-90 group-hover:opacity-100 transition-opacity duration-500"
    style={{
      backgroundImage: `url(${
        event.bannerUrl || "/images/banners/ap-dhillon-night-drive.jpg"
      })`,
    }}
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
</div>

              {/* Content */}
              <div className="p-6">
                {/* Artist Avatar */}
                {event.performerImageUrl && (
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-slate-800/50 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mb-4 mx-auto group-hover:border-indigo-400/50 transition-all">
                    <img
                      src={event.performerImageUrl}
                      alt={event.performerName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-100 mb-2 leading-tight group-hover:text-indigo-300 transition-colors">
                  {event.title}
                </h3>

                {/* Artist & Location */}
                <div className="flex items-center justify-center gap-2 mb-3 text-sm">
                  <div className="flex items-center gap-1 text-indigo-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                    {event.performerName}
                  </div>
                  <span className="text-slate-500">•</span>
                  <div className="flex items-center gap-1 text-emerald-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    {event.venue.city}
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 mb-4 text-xs text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(event.startDateTime).toLocaleDateString('en-IN', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </div>

                {/* Description Preview */}
                <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-2">
                  {event.description}
                </p>

                {/* CTA Button */}
                <div className="pt-4 border-t border-slate-800">
                  <button className="w-full group flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95">
                    <span>Book Tickets</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More / Pagination */}
        {events.length > 8 && (
          <div className="text-center mt-16">
            <button className="px-8 py-3 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-slate-300 font-semibold rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl">
              Load More Events
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
