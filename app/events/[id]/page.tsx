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

// 🔥 COMPLETE MOCK DATA - FIXED (10 realistic events for your EventBook)
const ALL_EVENTS: EventItem[] = [
  {
    _id: '507f1f77bcf86cd799439011',
    title: 'AP Dhillon Live Concert',
    description: 'High-energy Punjabi pop concert featuring AP Dhillon with massive LED visuals and bass-heavy sound.',
    category: 'Concert',
    tags: ['Punjabi', 'Pop', 'Live', 'EDM'],
    performerName: 'AP Dhillon',
    performerGenre: 'Punjabi Pop',
    performerImageUrl: 'https://images.unsplash.com/photo-1578631610670-322f5b4e971f?w=200&h=200&fit=crop',
    bannerUrl: '/images/banners/ap-dhillon.jpg',
    galleryImages: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587208?w=400'
    ],
    venue: { name: 'DY Patil Stadium', city: 'Navi Mumbai', state: 'Maharashtra' },
    startDateTime: '2026-02-15T19:00:00+05:30',
    ticketTypes: [
      { name: 'General', price: 999, currency: 'INR' },
      { name: 'VIP', price: 1999, currency: 'INR' },
      { name: 'VVIP', price: 4999, currency: 'INR' }
    ],
    isFeatured: true,
    status: 'published'
  },
  {
    _id: '507f1f77bcf86cd799439012',
    title: 'Arijit Singh Magical Night',
    description: 'Soulful melodies and romantic hits in an intimate setting.',
    category: 'Concert',
    tags: ['Bollywood', 'Romantic', 'Live'],
    performerName: 'Arijit Singh',
    performerGenre: 'Bollywood Playback',
    bannerUrl: '/images/banners/arijit-singh.jpg',
    venue: { name: 'Phoenix Marketcity', city: 'Mumbai', state: 'Maharashtra' },
    startDateTime: '2026-03-10T20:00:00+05:30',
    ticketTypes: [
      { name: 'Silver', price: 1500, currency: 'INR' },
      { name: 'Gold', price: 2500, currency: 'INR' }
    ]
  },
  {
    _id: '507f1f77bcf86cd799439013',
    title: 'TechFest 2026 Hackathon',
    description: 'India\'s largest college hackathon with cash prizes and startup mentorship.',
    category: 'Workshop',
    tags: ['Tech', 'Hackathon', 'Coding', 'Startup'],
    performerName: 'VIT Campus Team',
    bannerUrl: '/images/banners/techfest.jpg',
    venue: { name: 'VIT Convention Centre', city: 'Vellore', state: 'Tamil Nadu' },
    startDateTime: '2026-02-20T09:00:00+05:30',
    ticketTypes: [{ name: 'Team Pass', price: 500, currency: 'INR' }]
  },
  {
    _id: '507f1f77bcf86cd799439014',
    title: 'Badminton Championship',
    category: 'Sports',
    tags: ['Sports', 'Badminton', 'Youth'],
    performerName: 'Thane District Sports',
    bannerUrl: '/images/banners/badminton.jpg',
    venue: { name: 'Thane Municipal Hall', city: 'Thane', state: 'Maharashtra' },
    startDateTime: '2026-02-25T15:00:00+05:30',
    ticketTypes: [
      { name: 'General', price: 200, currency: 'INR' },
      { name: 'Premium', price: 500, currency: 'INR' }
    ]
  },
  {
    _id: '507f1f77bcf86cd799439015',
    title: 'Standup Comedy Night',
    description: 'Laugh out loud with top comedians from Mumbai.',
    category: 'Comedy',
    tags: ['Comedy', 'Standup', 'Entertainment'],
    performerName: 'The Barkha Effect',
    bannerUrl: '/images/banners/comedy-night.jpg',
    venue: { city: 'Mumbai', state: 'Maharashtra' }, // Missing name test
    startDateTime: '2026-02-28T20:30:00+05:30',
    ticketTypes: [{ name: 'General', price: 299, currency: 'INR' }]
  },
  // Add 5 more similar events...
  {
    _id: '507f1f77bcf86cd799439016',
    title: 'Web Dev Workshop',
    category: 'Workshop',
    performerName: 'Your CS Professor',
    venue: { name: 'College Auditorium', city: 'Thane', state: 'Maharashtra' },
    startDateTime: '2026-03-01T10:00:00+05:30'
  },
  {
    _id: '507f1f77bcf86cd799439017',
    title: 'DJ Night',
    category: 'Party',
    performerName: 'DJ Zaeden',
    venue: { city: 'Pune' },
    startDateTime: '2026-03-05T22:00:00+05:30'
  },
  {
    _id: '507f1f77bcf86cd799439018',
    title: 'Startup Pitch Fest',
    category: 'Business',
    performerName: 'Shark Tank India',
    venue: { name: 'Startup Hub', city: 'Bengaluru' },
    startDateTime: '2026-03-08T14:00:00+05:30'
  },
  {
    _id: '507f1f77bcf86cd799439019',
    title: 'Yoga Retreat',
    category: 'Wellness',
    performerName: 'Swami Ji',
    venue: { city: 'Goa' },
    startDateTime: '2026-03-12T06:00:00+05:30'
  },
  {
    _id: '507f1f77bcf86cd799439020',
    title: 'Gaming Tournament',
    category: 'Esports',
    performerName: 'BGMI Pro League',
    venue: { name: 'Gaming Arena', city: 'Delhi' },
    startDateTime: '2026-03-15T12:00:00+05:30'
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
    const foundEvent = ALL_EVENTS.find(e => e._id === eventId);
    if (foundEvent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEvent(foundEvent);
      setLoading(false);
      return;
    }

    const mongoIndex = parseInt(eventId.slice(-2), 16) % ALL_EVENTS.length;
    setEvent({ ...ALL_EVENTS[mongoIndex], _id: eventId });
    setLoading(false);
  }, [eventId]);

  const handleTicketChange = (ticketName: string, quantity: number) => {
    setSelectedTickets(prev => ({
      ...prev,
      [ticketName]: Math.max(0, quantity),
    }));
  };

  const calculateTotal = () => {
    let total = 0;
    event?.ticketTypes?.forEach(ticket => {
      total += (selectedTickets[ticket.name] || 0) * ticket.price;
    });
    return total;
  };

  const handleBooking = () => {
    if (Object.values(selectedTickets).every(q => q === 0)) {
      alert('Please select at least one ticket');
      return;
    }

    const total = calculateTotal() + Math.ceil(calculateTotal() * 0.05);
    alert(
      `🎉 Booking Confirmed!\n\n${event?.title}\nTotal: ₹${total.toLocaleString()}\n\nCheck your email for confirmation!`,
    );
    setSelectedTickets({});
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!event) return <div className="text-center py-20">Event not found</div>;

  const eventDate = new Date(event.startDateTime);
  const formattedDate = eventDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = eventDate.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-slate-950">
           {/* Back Button */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <Link
          href="/"
          className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Banner */}
      <div className="w-full h-56 sm:h-72 md:h-96 relative overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: event.bannerUrl
              ? `url(${event.bannerUrl})`
              : 'linear-gradient(to right, #4f46e5, #9333ea)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left: Event Details */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {/* Title & Artist */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <p className="text-indigo-400 text-xs sm:text-sm uppercase font-semibold mb-1 sm:mb-2">
                  {event.category}
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
                  {event.title}
                </h1>
                <p className="text-base sm:text-lg text-slate-300">
                  by{' '}
                  <span className="text-indigo-400 font-semibold">
                    {event.performerName}
                  </span>
                </p>
              </div>
              {event.performerImageUrl && (
                <img
                  src={event.performerImageUrl}
                  alt={event.performerName}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-indigo-500 flex-shrink-0 self-start"
                />
              )}
            </div>
          </div>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-indigo-600/20 text-indigo-300 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Event Info Cards - ✅ SAFE venue.name & venue.state */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
              <p className="text-slate-400 text-xs uppercase font-semibold mb-2">
                Date & Time
              </p>
              <p className="text-white font-semibold text-sm sm:text-base">
                {formattedDate}
              </p>
              <p className="text-indigo-400 text-xs sm:text-sm">
                {formattedTime}
              </p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
              <p className="text-slate-400 text-xs uppercase font-semibold mb-2">
                Venue
              </p>
              <p className="text-white font-semibold text-sm sm:text-base">
                {event.venue?.name || 'Venue TBA'}
              </p>
              <p className="text-indigo-400 text-xs sm:text-sm">
                {event.venue?.city || ''}, {event.venue?.state || ''}
              </p>
            </div>
          </div>

          {/* Genre */}
          {event.performerGenre && (
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
              <p className="text-slate-400 text-xs uppercase font-semibold mb-2">
                Genre
              </p>
              <p className="text-white font-semibold text-sm sm:text-base">
                {event.performerGenre}
              </p>
            </div>
          )}

          {/* Description */}
          {event.description && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                About This Event
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {event.description}
              </p>
            </div>
          )}

          {/* Gallery */}
          {event.galleryImages && event.galleryImages.length > 0 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                Event Gallery
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {event.galleryImages.map((image, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg overflow-hidden aspect-video bg-slate-900"
                  >
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
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 sm:p-6 lg:sticky lg:top-4 space-y-6">
            {/* Ticket Selection */}
            {event.ticketTypes && event.ticketTypes.length > 0 && (
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                  Select Tickets
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {event.ticketTypes.map(ticket => (
                    <div
                      key={ticket.name}
                      className="border border-slate-700 rounded-lg p-3 sm:p-4"
                    >
                      <div className="flex justify-between items-center mb-2 sm:mb-3">
                        <div>
                          <p className="text-white font-semibold text-sm sm:text-base">
                            {ticket.name}
                          </p>
                          <p className="text-indigo-400 text-xs sm:text-sm">
                            ₹{ticket.price.toLocaleString()} {ticket.currency}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleTicketChange(
                              ticket.name,
                              (selectedTickets[ticket.name] || 0) - 1,
                            )
                          }
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded transition"
                        >
                          −
                        </button>
                        <span className="flex-1 text-center text-white font-semibold">
                          {selectedTickets[ticket.name] || 0}
                        </span>
                        <button
                          onClick={() =>
                            handleTicketChange(
                              ticket.name,
                              (selectedTickets[ticket.name] || 0) + 1,
                            )
                          }
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
            <div className="border-t border-slate-700 pt-4 space-y-2 text-sm sm:text-base">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span>₹{calculateTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Booking Fee</span>
                <span>
                  ₹{Math.ceil(calculateTotal() * 0.05).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-base sm:text-lg font-bold text-white border-t border-slate-700 pt-2">
                <span>Total</span>
                <span>
                  ₹
                  {(
                    calculateTotal() +
                    Math.ceil(calculateTotal() * 0.05)
                  ).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Book Button */}
            <button
              onClick={handleBooking}
              disabled={Object.values(selectedTickets).every(q => q === 0)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-2.5 sm:py-3 rounded-lg transition text-sm sm:text-base"
            >
              Book Now
            </button>

            {/* Share */}
            <div className="text-center">
              <p className="text-slate-400 text-xs sm:text-sm mb-2 sm:mb-3">
                Share This Event
              </p>
              <div className="flex gap-2 justify-center">
                <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded transition text-white text-xs sm:text-sm">
                  Share
                </button>
                <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded transition text-white text-xs sm:text-sm">
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
