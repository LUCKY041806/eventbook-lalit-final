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
    title: 'AP Dhillon – Night Drive Tour, Mumbai',
    description: 'High-energy Punjabi pop concert featuring AP Dhillon with massive LED visuals and bass-heavy sound.',
    category: 'Concert',
    tags: ['Punjabi', 'Pop', 'Live', 'EDM'],
    performerName: 'AP Dhillon',
    performerGenre: 'Punjabi Hip-Hop',
    performerImageUrl: '/images/artists/ap-dhillon.jpg',
    bannerUrl: '/images/banners/ap-dhillon.jpg',
    galleryImages: [
      '/images/gallery/ap-dhillon-1.jpg',
      '/images/gallery/ap-dhillon-2.jpg'
    ],
    venue: { name: 'DY Patil Stadium', city: 'Mumbai', state: 'Maharashtra' },
    startDateTime: '2025-12-30T19:00:00+05:30',
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
    title: 'Arijit Singh – Soulful Evening, Pune',
    description: 'Soulful melodies and romantic hits in an intimate setting.',
    category: 'Concert',
    tags: ['Bollywood', 'Romantic', 'Live'],
    performerName: 'Arijit Singh',
    performerGenre: 'Bollywood / Romantic',
    performerImageUrl: '/images/artists/arijit-singh.jpg',
    bannerUrl: '/images/banners/arijit-pune.jpg',
    venue: { name: 'Balewadi Stadium', city: 'Pune', state: 'Maharashtra' },
    startDateTime: '2026-01-05T18:30:00+05:30',
    ticketTypes: [
      { name: 'Silver', price: 1500, currency: 'INR' },
      { name: 'Gold', price: 2500, currency: 'INR' }
    ],
    isFeatured: true,
    status: 'published'
  },
  {
    _id: '507f1f77bcf86cd799439013',
    title: 'Coldplay – Music of the Spheres Tour, Mumbai',
    description: 'Coldplay brings breathtaking visuals, LED wristbands, and magic.',
    category: 'Concert',
    tags: ['Rock', 'Pop', 'Live'],
    performerName: 'Coldplay',
    performerGenre: 'Alternative / Pop Rock',
    performerImageUrl: '/images/artists/coldplay.jpg',
    bannerUrl: '/images/banners/coldplay-mumbai.jpg',
    venue: { name: 'Wankhede Stadium', city: 'Mumbai', state: 'Maharashtra' },
    startDateTime: '2026-01-08T20:00:00+05:30',
    ticketTypes: [
      { name: 'Standard', price: 2000, currency: 'INR' },
      { name: 'Premium', price: 4000, currency: 'INR' }
    ],
    isFeatured: false,
    status: 'published'
  },
  {
    _id: '507f1f77bcf86cd799439014',
    title: 'Sunset EDM Festival – Goa Beach Edition',
    description: 'Two days of beachside EDM with international DJs.',
    category: 'Festival',
    tags: ['EDM', 'Beach', 'Party'],
    performerName: 'Various DJs',
    performerGenre: 'EDM',
    performerImageUrl: '/images/artists/edm-dj.jpg',
    bannerUrl: '/images/banners/sunset-edm-goa.jpg',
    venue: { city: 'Goa' },
    startDateTime: '2026-01-18T16:00:00+05:30',
    ticketTypes: [
      { name: 'Day Pass', price: 1000, currency: 'INR' },
      { name: 'Full Pass', price: 1800, currency: 'INR' }
    ],
    isFeatured: false,
    status: 'published'
  },
  {
    _id: '507f1f77bcf86cd799439015',
    title: 'Justin Bieber – Justice World Tour, Mumbai',
    description: 'Global pop icon Justin Bieber returns to India with a spectacular performance.',
    category: 'Concert',
    tags: ['Pop', 'Live'],
    performerName: 'Justin Bieber',
    performerGenre: 'Pop',
    performerImageUrl: '/images/artists/justin-bieber.jpg',
    bannerUrl: '/images/banners/justin-bieber-mumbai.jpg',
    venue: { city: 'Mumbai' },
    startDateTime: '2026-01-12T19:00:00+05:30',
    ticketTypes: [
      { name: 'General', price: 1500, currency: 'INR' },
      { name: 'VIP', price: 3000, currency: 'INR' }
    ],
    isFeatured: false,
    status: 'published'
  },
  {
    _id: '507f1f77bcf86cd799439016',
    title: 'Indie Night Live – Mumbai',
    description: 'A night dedicated to indie music featuring emerging Indian artists.',
    category: 'Music Festival',
    tags: ['Indie', 'Live'],
    performerName: 'Independent Artists',
    performerGenre: 'Indie / Rock',
    performerImageUrl: '/images/artists/indie-night.jpg',
    bannerUrl: '/images/banners/indie-night-mumbai.jpg',
    venue: { city: 'Mumbai' },
    startDateTime: '2026-01-10T21:00:00+05:30',
    ticketTypes: [
      { name: 'Entry', price: 500, currency: 'INR' }
    ],
    isFeatured: false,
    status: 'published'
  },
  {
    _id: '507f1f77bcf86cd799439017',
    title: 'Ed Sheeran – +−=÷× India Tour, Delhi',
    description: 'Ed Sheeran brings his iconic loop pedal magic and heartfelt songs live.',
    category: 'Concert',
    tags: ['Pop', 'Live'],
    performerName: 'Ed Sheeran',
    performerGenre: 'Pop',
    performerImageUrl: '/images/artists/ed-sheeran.jpg',
    bannerUrl: '/images/banners/ed-sheeran-india.jpg',
    venue: { city: 'Delhi' },
    startDateTime: '2025-12-31T19:00:00+05:30',
    ticketTypes: [
      { name: 'Standard', price: 2000, currency: 'INR' },
      { name: 'Premium', price: 4000, currency: 'INR' }
    ],
    isFeatured: true,
    status: 'published'
  },
  {
    _id: '507f1f77bcf86cd799439018',
    title: 'Techno Night – Underground Edition, Goa',
    description: 'A deep, dark techno experience featuring underground DJs.',
    category: 'EDM',
    tags: ['EDM', 'Live', 'Underground'],
    performerName: 'Techno DJs',
    performerGenre: 'EDM',
    performerImageUrl: '/images/artists/techno-dj.jpg',
    bannerUrl: '/images/banners/techno-night-goa.jpg',
    venue: { city: 'Goa' },
    startDateTime: '2026-01-20T23:00:00+05:30',
    ticketTypes: [
      { name: 'Entry', price: 700, currency: 'INR' }
    ],
    isFeatured: false,
    status: 'published'
  },
  {
    _id: '507f1f77bcf86cd799439019',
    title: 'Yo Yo Honey Singh – Mumbai Show',
    description: 'Swipe for Mumbai venue announcement.',
    category: 'Concert',
    tags: ['Rap', 'Hip-Hop', 'Live'],
    performerName: 'Yo Yo Honey Singh',
    performerGenre: 'Rap / Hip-Hop',
    performerImageUrl: '/images/artists/honey-singh.jpg',
    bannerUrl: '/images/banners/honey-singh-mumbai.jpg',
    venue: { city: 'Pune' },
    startDateTime: '2026-01-04T20:00:00+05:30',
    ticketTypes: [
      { name: 'Standard', price: 1200, currency: 'INR' }
    ],
    isFeatured: true,
    status: 'published'
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
