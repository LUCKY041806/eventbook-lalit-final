// app/organizer/page.tsx
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrganizerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    bannerUrl: "",
    venueName: "",
    city: "",
    address: "",
    startDateTime: "",
    endDateTime: "",
    regularPrice: "",
    regularQuantity: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: form.title,
        description: form.description,
        category: form.category || "Concert",
        bannerUrl: form.bannerUrl || undefined,
        venue: {
          name: form.venueName,
          city: form.city,
          address: form.address,
        },
        startDateTime: new Date(form.startDateTime),
        endDateTime: new Date(form.endDateTime),
        ticketTypes: [
          {
            name: "Regular",
            price: Number(form.regularPrice),
            totalQuantity: Number(form.regularQuantity),
            soldQuantity: 0,
          },
        ],
      };

      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create event");

      setForm({
        title: "",
        description: "",
        category: "",
        bannerUrl: "",
        venueName: "",
        city: "",
        address: "",
        startDateTime: "",
        endDateTime: "",
        regularPrice: "",
        regularQuantity: "",
      });

      router.push("/events");
    } catch (err) {
      console.error(err);
      alert("Could not create event. Check API / console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">Organizer Panel</h2>
      <p className="text-sm text-slate-400">
        Simple event creation form. Fill details and create an event; it will
        appear on the events page.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-slate-950/60 border border-slate-800 rounded-xl p-5"
      >
        <div>
          <label className="block text-xs mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded border px-3 py-2 text-sm bg-white text-black"
            placeholder="Event title"
          />
        </div>

        <div>
          <label className="block text-xs mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full rounded border px-3 py-2 text-sm bg-white text-black h-24"
            placeholder="Short description"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1">Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2 text-sm bg-white text-black"
              placeholder="Concert, Tech, Workshop..."
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Banner URL (optional)</label>
            <input
              name="bannerUrl"
              value={form.bannerUrl}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2 text-sm bg-white text-black"
              placeholder="https://example.com/banner.jpg"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1">Venue name</label>
            <input
              name="venueName"
              value={form.venueName}
              onChange={handleChange}
              required
              className="w-full rounded border px-3 py-2 text-sm bg-white text-black"
              placeholder="Hall / Ground name"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">City</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full rounded border px-3 py-2 text-sm bg-white text-black"
              placeholder="City"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs mb-1">Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-sm bg-white text-black"
            placeholder="Full address"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1">Start</label>
            <input
              type="datetime-local"
              name="startDateTime"
              value={form.startDateTime}
              onChange={handleChange}
              required
              className="w-full rounded border px-3 py-2 text-sm bg-white text-black"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">End</label>
            <input
              type="datetime-local"
              name="endDateTime"
              value={form.endDateTime}
              onChange={handleChange}
              required
              className="w-full rounded border px-3 py-2 text-sm bg-white text-black"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1">Regular price (₹)</label>
            <input
              name="regularPrice"
              value={form.regularPrice}
              onChange={handleChange}
              required
              type="number"
              min={0}
              className="w-full rounded border px-3 py-2 text-sm bg-white text-black"
              placeholder="e.g. 500"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Regular quantity</label>
            <input
              name="regularQuantity"
              value={form.regularQuantity}
              onChange={handleChange}
              required
              type="number"
              min={1}
              className="w-full rounded border px-3 py-2 text-sm bg-white text-black"
              placeholder="Total seats"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create event"}
        </button>
      </form>
    </div>
  );
}
