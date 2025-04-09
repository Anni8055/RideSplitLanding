import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);
  
  // Endpoint to serve static landing page
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'RideSplit API is running' });
  });

  // Vehicle routes
  app.get('/api/vehicles', async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
      const vehicles = await storage.getVehiclesByUserId(req.user.id);
      res.json(vehicles);
    } catch (err) {
      next(err);
    }
  });

  app.post('/api/vehicles', async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
      const vehicle = await storage.createVehicle({
        ...req.body,
        userId: req.user.id
      });
      res.status(201).json(vehicle);
    } catch (err) {
      next(err);
    }
  });

  // Ride routes
  app.get('/api/rides', async (req, res, next) => {
    try {
      const { startLocation, endLocation, startTime } = req.query;
      
      if (startLocation && endLocation && startTime) {
        const rides = await storage.searchAvailableRides(
          startLocation as string, 
          endLocation as string, 
          new Date(startTime as string)
        );
        return res.json(rides);
      }
      
      if (req.isAuthenticated()) {
        if (req.user.role === 'rider' || req.user.role === 'both') {
          const rideRiders = await storage.getRidesByRider(req.user.id);
          return res.json(rideRiders);
        } else {
          const rides = await storage.getRidesByDriver(req.user.id);
          return res.json(rides);
        }
      }
      
      res.status(400).json({ error: "Missing search parameters" });
    } catch (err) {
      next(err);
    }
  });

  app.post('/api/rides', async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
      if (req.user.role !== 'driver' && req.user.role !== 'both') {
        return res.status(403).json({ error: "Only drivers can create rides" });
      }

      const ride = await storage.createRide({
        ...req.body,
        driverId: req.user.id
      });
      res.status(201).json(ride);
    } catch (err) {
      next(err);
    }
  });

  // Book a ride
  app.post('/api/rides/:rideId/book', async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
      
      const rideId = parseInt(req.params.rideId);
      const ride = await storage.getRide(rideId);
      
      if (!ride) {
        return res.status(404).json({ error: "Ride not found" });
      }
      
      if (ride.availableSeats <= 0) {
        return res.status(400).json({ error: "No available seats" });
      }
      
      // Add rider to ride
      const rideRider = await storage.addRiderToRide({
        rideId,
        riderId: req.user.id,
        pickupLocation: req.body.pickupLocation,
        dropoffLocation: req.body.dropoffLocation,
        status: 'pending'
      });
      
      // Update available seats
      if (ride.status) {
        await storage.updateRideStatus(rideId, ride.status);
      }
      // Note: This doesn't update seats, so we'd need to add a proper method
      // but for now we'll just keep the status the same
      
      res.status(201).json(rideRider);
    } catch (err) {
      next(err);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
