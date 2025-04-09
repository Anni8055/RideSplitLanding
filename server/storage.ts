import { 
  users, 
  vehicles, 
  rides, 
  rideRiders, 
  reviews,
  type User, 
  type InsertUser,
  type Vehicle,
  type InsertVehicle,
  type Ride,
  type InsertRide,
  type RideRider,
  type InsertRideRider,
  type Review,
  type InsertReview
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gt, lt, desc, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined>;
  
  // Vehicle operations
  getVehiclesByUserId(userId: number): Promise<Vehicle[]>;
  getVehicle(id: number): Promise<Vehicle | undefined>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  updateVehicle(id: number, vehicleData: Partial<InsertVehicle>): Promise<Vehicle | undefined>;
  
  // Ride operations
  getRidesByDriver(driverId: number): Promise<Ride[]>;
  getRidesByRider(riderId: number): Promise<RideRider[]>;
  getRide(id: number): Promise<Ride | undefined>;
  createRide(ride: InsertRide): Promise<Ride>;
  updateRideStatus(id: number, status: string): Promise<Ride | undefined>;
  
  // RideRider operations
  addRiderToRide(rideRider: InsertRideRider): Promise<RideRider>;
  getRideRiders(rideId: number): Promise<RideRider[]>;
  updateRideRiderStatus(id: number, status: string): Promise<RideRider | undefined>;
  
  // Review operations
  createReview(review: InsertReview): Promise<Review>;
  getReviewsByUser(userId: number): Promise<Review[]>;
  getReviewsForUser(userId: number): Promise<Review[]>;
  getReviewsByRide(rideId: number): Promise<Review[]>;
  
  // Search operations
  searchAvailableRides(startLocation: string, endLocation: string, startTime: Date): Promise<Ride[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  // Vehicle operations
  async getVehiclesByUserId(userId: number): Promise<Vehicle[]> {
    return db.select().from(vehicles).where(eq(vehicles.userId, userId));
  }
  
  async getVehicle(id: number): Promise<Vehicle | undefined> {
    const [vehicle] = await db.select().from(vehicles).where(eq(vehicles.id, id));
    return vehicle;
  }
  
  async createVehicle(vehicle: InsertVehicle): Promise<Vehicle> {
    const [createdVehicle] = await db.insert(vehicles).values(vehicle).returning();
    return createdVehicle;
  }
  
  async updateVehicle(id: number, vehicleData: Partial<InsertVehicle>): Promise<Vehicle | undefined> {
    const [updatedVehicle] = await db
      .update(vehicles)
      .set(vehicleData)
      .where(eq(vehicles.id, id))
      .returning();
    return updatedVehicle;
  }

  // Ride operations
  async getRidesByDriver(driverId: number): Promise<Ride[]> {
    return db.select().from(rides).where(eq(rides.driverId, driverId));
  }
  
  async getRidesByRider(riderId: number): Promise<RideRider[]> {
    return db.select().from(rideRiders).where(eq(rideRiders.riderId, riderId));
  }
  
  async getRide(id: number): Promise<Ride | undefined> {
    const [ride] = await db.select().from(rides).where(eq(rides.id, id));
    return ride;
  }
  
  async createRide(ride: InsertRide): Promise<Ride> {
    const [createdRide] = await db.insert(rides).values(ride).returning();
    return createdRide;
  }
  
  async updateRideStatus(id: number, status: string): Promise<Ride | undefined> {
    const [updatedRide] = await db
      .update(rides)
      .set({ status: status as any })
      .where(eq(rides.id, id))
      .returning();
    return updatedRide;
  }

  // RideRider operations
  async addRiderToRide(rideRider: InsertRideRider): Promise<RideRider> {
    const [createdRideRider] = await db.insert(rideRiders).values(rideRider).returning();
    return createdRideRider;
  }
  
  async getRideRiders(rideId: number): Promise<RideRider[]> {
    return db.select().from(rideRiders).where(eq(rideRiders.rideId, rideId));
  }
  
  async updateRideRiderStatus(id: number, status: string): Promise<RideRider | undefined> {
    const [updatedRideRider] = await db
      .update(rideRiders)
      .set({ status })
      .where(eq(rideRiders.id, id))
      .returning();
    return updatedRideRider;
  }

  // Review operations
  async createReview(review: InsertReview): Promise<Review> {
    const [createdReview] = await db.insert(reviews).values(review).returning();
    return createdReview;
  }
  
  async getReviewsByUser(userId: number): Promise<Review[]> {
    return db.select().from(reviews).where(eq(reviews.reviewerId, userId));
  }
  
  async getReviewsForUser(userId: number): Promise<Review[]> {
    return db.select().from(reviews).where(eq(reviews.reviewedId, userId));
  }
  
  async getReviewsByRide(rideId: number): Promise<Review[]> {
    return db.select().from(reviews).where(eq(reviews.rideId, rideId));
  }

  // Search operations
  async searchAvailableRides(startLocation: string, endLocation: string, startTime: Date): Promise<Ride[]> {
    const oneHourBefore = new Date(startTime);
    oneHourBefore.setHours(oneHourBefore.getHours() - 1);
    
    const oneHourAfter = new Date(startTime);
    oneHourAfter.setHours(oneHourAfter.getHours() + 1);
    
    return db
      .select()
      .from(rides)
      .where(
        and(
          sql`${rides.startLocation} ILIKE ${`%${startLocation}%`}`,
          sql`${rides.endLocation} ILIKE ${`%${endLocation}%`}`,
          gt(rides.availableSeats, 0),
          gt(rides.startTime, oneHourBefore),
          lt(rides.startTime, oneHourAfter),
          eq(rides.status, 'scheduled')
        )
      )
      .orderBy(rides.startTime);
  }
}

export const storage = new DatabaseStorage();
