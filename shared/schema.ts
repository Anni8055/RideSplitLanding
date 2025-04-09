import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision, pgEnum, varchar, time } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Enums
export const userRoleEnum = pgEnum('user_role', ['rider', 'carowner', 'both']);
export const rideStatusEnum = pgEnum('ride_status', ['scheduled', 'active', 'completed', 'cancelled']);

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  role: userRoleEnum("role").default('rider'),
  phone: varchar("phone", { length: 20 }),
  avatarUrl: text("avatar_url"),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  vehicles: many(vehicles),
  ridesAsRider: many(rides, { relationName: "riderRides" }),
  ridesAsDriver: many(rides, { relationName: "driverRides" }),
  reviews: many(reviews, { relationName: "userReviews" }),
}));

// Vehicles table
export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  color: text("color").notNull(),
  licensePlate: text("license_plate").notNull().unique(),
  capacity: integer("capacity").notNull(),
  fuelType: text("fuel_type"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const vehiclesRelations = relations(vehicles, ({ one, many }) => ({
  user: one(users, {
    fields: [vehicles.userId],
    references: [users.id]
  }),
  rides: many(rides)
}));

// Rides table
export const rides = pgTable("rides", {
  id: serial("id").primaryKey(),
  driverId: integer("driver_id").notNull().references(() => users.id),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  startLocation: text("start_location").notNull(),
  endLocation: text("end_location").notNull(),
  startTime: timestamp("start_time").notNull(),
  estimatedEndTime: timestamp("estimated_end_time"),
  price: doublePrecision("price").notNull(),
  availableSeats: integer("available_seats").notNull(),
  status: rideStatusEnum("status").default('scheduled'),
  createdAt: timestamp("created_at").defaultNow(),
  recurring: boolean("recurring").default(false),
  frequency: text("frequency"),
});

export const ridesRelations = relations(rides, ({ one, many }) => ({
  driver: one(users, {
    fields: [rides.driverId],
    references: [users.id],
    relationName: "driverRides"
  }),
  vehicle: one(vehicles, {
    fields: [rides.vehicleId],
    references: [vehicles.id]
  }),
  rideRiders: many(rideRiders)
}));

// RideRiders table (for many-to-many relationship between rides and riders)
export const rideRiders = pgTable("ride_riders", {
  id: serial("id").primaryKey(),
  rideId: integer("ride_id").notNull().references(() => rides.id),
  riderId: integer("rider_id").notNull().references(() => users.id),
  pickupLocation: text("pickup_location").notNull(),
  dropoffLocation: text("dropoff_location").notNull(),
  status: text("status").notNull().default('pending'),
  createdAt: timestamp("created_at").defaultNow(),
});

export const rideRidersRelations = relations(rideRiders, ({ one }) => ({
  ride: one(rides, {
    fields: [rideRiders.rideId],
    references: [rides.id]
  }),
  rider: one(users, {
    fields: [rideRiders.riderId],
    references: [users.id],
    relationName: "riderRides"
  })
}));

// Reviews table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  reviewerId: integer("reviewer_id").notNull().references(() => users.id),
  reviewedId: integer("reviewed_id").notNull().references(() => users.id),
  rideId: integer("ride_id").references(() => rides.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  reviewer: one(users, {
    fields: [reviews.reviewerId],
    references: [users.id]
  }),
  reviewed: one(users, {
    fields: [reviews.reviewedId],
    references: [users.id],
    relationName: "userReviews"
  }),
  ride: one(rides, {
    fields: [reviews.rideId],
    references: [rides.id]
  })
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  role: true,
  phone: true,
  avatarUrl: true,
  bio: true,
});

export const insertVehicleSchema = createInsertSchema(vehicles).pick({
  userId: true,
  make: true,
  model: true,
  year: true,
  color: true,
  licensePlate: true,
  capacity: true,
  fuelType: true,
});

export const insertRideSchema = createInsertSchema(rides).pick({
  driverId: true,
  vehicleId: true,
  startLocation: true,
  endLocation: true,
  startTime: true,
  estimatedEndTime: true,
  price: true,
  availableSeats: true,
  status: true,
  recurring: true,
  frequency: true,
});

export const insertRideRiderSchema = createInsertSchema(rideRiders).pick({
  rideId: true,
  riderId: true,
  pickupLocation: true,
  dropoffLocation: true,
  status: true,
});

export const insertReviewSchema = createInsertSchema(reviews).pick({
  reviewerId: true,
  reviewedId: true,
  rideId: true,
  rating: true,
  comment: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type Vehicle = typeof vehicles.$inferSelect;

export type InsertRide = z.infer<typeof insertRideSchema>;
export type Ride = typeof rides.$inferSelect;

export type InsertRideRider = z.infer<typeof insertRideRiderSchema>;
export type RideRider = typeof rideRiders.$inferSelect;

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;
