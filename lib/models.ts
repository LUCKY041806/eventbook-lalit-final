// lib/models.ts
import { ObjectId } from "mongodb";

export type UserRole = "user" | "organizer" | "admin";

export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
}

export interface TicketType {
  name: string;
  price: number;
  totalQuantity: number;
  soldQuantity: number;
}

export interface Event {
  _id?: ObjectId;
  organizerId: ObjectId;

  // Basic info
  title: string;
  description: string;
  category: string; // "Concert", "Festival", etc.
  tags?: string[];

  // Performer / artist
  performerName: string;
  performerGenre?: string;
  performerImageUrl?: string;

  // Media
  bannerUrl?: string;
  galleryImages?: string[];

  // Venue
  venue: {
    name: string;
    address: string;
    city: string;
    state?: string;
    mapUrl?: string;
  };

  startDateTime: Date;
  endDateTime: Date;

  ticketTypes: TicketType[];

  // Flags
  isFeatured?: boolean;
  isTrending?: boolean;

  status: "draft" | "published" | "closed" | "completed";
  createdAt: Date;
  updatedAt: Date;
}
