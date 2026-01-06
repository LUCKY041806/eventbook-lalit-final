'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

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

// 🔥 MOCK DATA - OUTSIDE COMPONENT
const ALL_EVENTS: EventItem[] = [
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
    ticketTypes: [{ name: "Regular", price: 1500, currency: "INR" }]
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
    ticketTypes: [{ name: "VIP", price: 8000, currency: "INR" }]
  },
  {
    _id: "3",
    title: "Yo Yo Honey Singh Live",
    performerName: "Yo Yo Honey Singh",
    performerGenre: "Rap/Hip-Hop",
    category: "Concert",
    bannerUrl: "/images/banners/yo-yo-honey-singh.jpg",
    performerImageUrl: "/images/artists/yo-yo-honey-singh.jpg",
    venue: { city: "Pune", state: "Maharashtra" },
    startDateTime: "2026-01-04T21:00:00Z",
    ticketTypes: [{ name: "Premium", price: 3000, currency: "INR" }]
  },
  {
    _id: "4",
    title: "Arijit Singh Magical Night",
    performerName: "Arijit Singh",
    performerGenre: "Bollywood",
    category: "Concert",
    bannerUrl: "/images/banners/arjit-singh.jpg",
    performerImageUrl: "/images/artists/arjit-singh.jpg",
    venue: { city: "Goa", state: "Goa" },
    startDateTime: "2026-01-10T21:00:00Z",
    ticketTypes: [{ name: "VIP", price: 4500, currency: "INR" }]
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
    ticketTypes: [{ name: "General", price: 5000, currency: "INR" }]
  },
  {
    _id: "6",
    title: "Honey Singh Mumbai Show",
    performerName: "Honey Singh",
    category: "Concert",
    bannerUrl: "/images/banners/honey-singh-mumbai.jpg",
    performerImageUrl: "/images/artists/honey-singh-mumbai.jpg",
    venue: { city: "Nagpur", state: "Maharashtra" },
    startDateTime: "2026-01-08T20:00:00Z",
    ticketTypes: [{ name: "Regular", price: 2500, currency: "INR" }]
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
    ticketTypes: [{ name: "Premium", price: 6000, currency: "INR" }]
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
    ticketTypes: [{ name: "3-Day Pass", price: 4000, currency: "INR" }]
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
    ticketTypes: [{ name: "Night Pass", price: 2000, currency: "INR" }]
  },
  {
    _id: "10",
    title: "Indie Night Festival",
    performerName: "Indie Artists",
    category: "Festival",
    bannerUrl: "/images/banners/indie-night.jpg",
    performerImageUrl: "/images/artists/indie-night.jpg",
    venue: { city: "Aurangabad", state: "Maharashtra" },
    startDateTime: "2026-01-22T19:30:00Z",
    ticketTypes: [{ name: "General", price: 1500, currency: "INR" }]
  },
  {
    _id: "11",
    title: "Justin Bieber EDM Show",
    performerName: "Justin Bieber",
    category: "EDM",
    bannerUrl: "/images/banners/justin-edm.jpg",
    performerImageUrl: "/images/artists/justin-bieber.jpg",
    venue: { city: "Kolhapur", state: "Maharashtra" },
    startDateTime: "2026-01-25T21:00:00Z",
    ticketTypes: [{ name: "VIP", price: 7000, currency: "INR" }]
  },
  {
    _id: "12",
    title: "EDM DJ Festival",
    performerName: "EDM DJs",
    category: "Festival",
    bannerUrl: "/images/banners/edm-dj.jpg",
    performerImageUrl: "/images/artists/edm-dj.jpg",
    venue: { city: "Thane", state: "Maharashtra" },
    startDateTime: "2026-01-28T20:00:00Z",
    ticketTypes: [{ name: "General", price: 2500, currency: "INR" }]
  },
  {
    _id: "13",
    title: "AP Dhillon Live",
    performerName: "AP Dhillon",
    category: "Concert",
    bannerUrl: "/images/banners/ap-dhillon.jpg",
    performerImageUrl: "/images/artists/ap-dhillon.jpg",
    venue: { city: "Nashik", state: "Maharashtra" },
    startDateTime: "2026-02-01T20:00:00Z",
    ticketTypes: [{ name: "Gold", price: 2000, currency: "INR" }]
  },
  {
    _id: "14",
    title: "Coldplay Live",
    performerName: "Coldplay",
    category: "Concert",
    bannerUrl: "/images/banners/coldplay.jpg",
    performerImageUrl: "/images/artists/coldplay.jpg",
    venue: { city: "Pune", state: "Maharashtra" },
    startDateTime: "2026-02-05T19:00:00Z",
    ticketTypes: [{ name: "Platinum", price: 10000, currency: "INR" }]
  },
  {
    _id: "15",
    title: "Honey Singh Night",
    performerName: "Honey Singh",
    category: "Concert",
    bannerUrl: "/images/banners/honey-singh-mumbai.jpg",
    performerImageUrl: "/images/artists/honey-singh-mumbai.jpg",
    venue: { city: "Goa", state: "Goa" },
    startDateTime: "2026-02-10T21:00:00Z",
    ticketTypes: [{ name: "Royal", price: 4000, currency: "INR" }]
  },
  {
    _id: "16",
    title: "Techno DJ Night",
    performerName: "Techno DJ",
    category: "EDM",
    bannerUrl: "/images/banners/techno-dj.jpg",
    performerImageUrl: "/images/artists/techno-dj.jpg",
    venue: { city: "Mumbai", state: "Maharashtra" },
    startDateTime: "2026-02-15T23:00:00Z",
    ticketTypes: [{ name: "Night Pass", price: 1800, currency: "INR" }]
  },
  {
    _id: "17",
    title: "Indie Night Goa",
    performerName: "Indie Bands",
    category: "Concert",
    bannerUrl: "/images/banners/indie-night.jpg",
    performerImageUrl: "/images/artists/indie-night.jpg",
    venue: { city: "Goa", state: "Goa" },
    startDateTime: "2026-02-20T20:30:00Z",
    ticketTypes: [{ name: "General", price: 1200, currency: "INR" }]
  }
];

export default function EventDetailsPage() {
  const params = useParams();
  const eventId = params.id as string;

  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTickets, setSelectedTickets] = useState<{ [key: string]: number }>({});
  const [bookingOpen, setBookingOpen] = useState(false);
useEffect(() => {
  // 🔥 SAME LOGIC AS HOMEPAGE - Works for ALL IDs!
  const foundEvent = ALL_EVENTS.find(e => e._id === eventId);
  if (foundEvent) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEvent(foundEvent);
    setLoading(false);
    return;
  }

  // For MongoDB IDs - use sequential position from ALL_EVENTS
  const mongoIndex = parseInt(eventId.slice(-2), 16) % ALL_EVENTS.length;
  setEvent({ ...ALL_EVENTS[mongoIndex], _id: eventId });
  setLoading(false);
}, [eventId]);

  const handleTicketChange = (ticketName: string, quantity: number) => {
    setSelectedTickets(prev => ({
      ...prev,
      [ticketName]: Math.max(0, quantity)
    }));
  };

  const calculateTotal = () => {
    let total = 0;
    event?.ticketTypes?.forEach(ticket => {
      total += (selectedTickets[ticket.name] || 0) * ticket.price;
    });
    return total;
  };

  // 🔥 FIXED: Mock booking success (no backend call)
  const handleBooking = () => {
    if (Object.values(selectedTickets).every(q => q === 0)) {
      alert('Please select at least one ticket');
      return;
    }

    const total = calculateTotal() + Math.ceil(calculateTotal() * 0.05);
    alert(`🎉 Booking Confirmed!\n\n${event?.title}\nTotal: ₹${total.toLocaleString()}\n\nCheck your email for confirmation!`);
    setSelectedTickets({});
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!event) return <div className="text-center py-20">Event not found</div>;

  const eventDate = new Date(event.startDateTime);
  const formattedDate = eventDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = eventDate.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link href="/" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
          ← Back to Home
        </Link>
      </div>

      {/* Banner */}
      <div className="w-full h-96 relative overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: event.bannerUrl ? `url(${event.bannerUrl})` : 'linear-gradient(to right, #4f46e5, #9333ea)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Event Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Title & Artist */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-indigo-400 text-sm uppercase font-semibold mb-2">
                  {event.category}
                </p>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {event.title}
                </h1>
                <p className="text-xl text-slate-300">
                  by <span className="text-indigo-400 font-semibold">{event.performerName}</span>
                </p>
              </div>
              {event.performerImageUrl && (
                <img
                  src={event.performerImageUrl}
                  alt={event.performerName}
                  className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500 flex-shrink-0"
                />
              )}
            </div>
          </div>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-indigo-600/20 text-indigo-300 rounded-full text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Event Info Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
              <p className="text-slate-400 text-xs uppercase font-semibold mb-2">Date & Time</p>
              <p className="text-white font-semibold">{formattedDate}</p>
              <p className="text-indigo-400 text-sm">{formattedTime}</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
              <p className="text-slate-400 text-xs uppercase font-semibold mb-2">Venue</p>
              <p className="text-white font-semibold">{event.venue.name || 'Venue TBA'}</p>
              <p className="text-indigo-400 text-sm">{event.venue.city}, {event.venue.state}</p>
            </div>
          </div>

          {/* Genre */}
          {event.performerGenre && (
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
              <p className="text-slate-400 text-xs uppercase font-semibold mb-2">Genre</p>
              <p className="text-white font-semibold">{event.performerGenre}</p>
            </div>
          )}

          {/* Description */}
          {event.description && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">About This Event</h2>
              <p className="text-slate-300 leading-relaxed">
                {event.description}
              </p>
            </div>
          )}

          {/* Gallery */}
          {event.galleryImages && event.galleryImages.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Event Gallery</h2>
              <div className="grid grid-cols-2 gap-4">
                {event.galleryImages.map((image, idx) => (
                  <div key={idx} className="rounded-lg overflow-hidden aspect-video bg-slate-900">
                    <img
                      src={image}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 sticky top-4 space-y-6">
            
            {/* Ticket Selection */}
            {event.ticketTypes && event.ticketTypes.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Select Tickets</h3>
                <div className="space-y-4">
                  {event.ticketTypes.map((ticket) => (
                    <div key={ticket.name} className="border border-slate-700 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <p className="text-white font-semibold">{ticket.name}</p>
                          <p className="text-indigo-400 text-sm">
                            ₹{ticket.price.toLocaleString()} {ticket.currency}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleTicketChange(ticket.name, (selectedTickets[ticket.name] || 0) - 1)}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded transition"
                        >
                          −
                        </button>
                        <span className="flex-1 text-center text-white font-semibold">
                          {selectedTickets[ticket.name] || 0}
                        </span>
                        <button
                          onClick={() => handleTicketChange(ticket.name, (selectedTickets[ticket.name] || 0) + 1)}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price Summary */}
            <div className="border-t border-slate-700 pt-4 space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span>₹{calculateTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Booking Fee</span>
                <span>₹{Math.ceil(calculateTotal() * 0.05).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white border-t border-slate-700 pt-2">
                <span>Total</span>
                <span>₹{(calculateTotal() + Math.ceil(calculateTotal() * 0.05)).toLocaleString()}</span>
              </div>
            </div>

            {/* Book Button */}
            <button
              onClick={handleBooking}
              disabled={Object.values(selectedTickets).every(q => q === 0)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition"
            >
              Book Now
            </button>

            {/* Share */}
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-3">Share This Event</p>
              <div className="flex gap-2 justify-center">
                <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded transition text-white text-sm">
                  Share
                </button>
                <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded transition text-white text-sm">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
