import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Endpoint to serve static landing page
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'RideSplit API is running' });
  });

  const httpServer = createServer(app);

  return httpServer;
}
