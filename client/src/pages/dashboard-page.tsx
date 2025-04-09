import { useAuth } from "@/hooks/use-auth";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Vehicle } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { Loader2, Car, MapPin, Calendar, Users, DollarSign } from "lucide-react";
import { useState } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>(
    user?.role === "driver" || user?.role === "both" ? "myRides" : "findRides"
  );
  
  const { data: vehicles = [], isLoading: isLoadingVehicles } = useQuery<Vehicle[]>({
    queryKey: ["/api/vehicles"],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: !!user && (user.role === "driver" || user.role === "both"),
  });
  
  const { data: rides = [], isLoading: isLoadingRides } = useQuery<any[]>({
    queryKey: ["/api/rides"],
    queryFn: getQueryFn({ on401: "throw" }),
  });
  
  const canCreateRides = user?.role === "driver" || user?.role === "both";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {user?.fullName || user?.username}!
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="findRides">Find Rides</TabsTrigger>
            <TabsTrigger value="myBookings">My Bookings</TabsTrigger>
            {canCreateRides && (
              <>
                <TabsTrigger value="myRides">My Rides</TabsTrigger>
                <TabsTrigger value="myVehicles">My Vehicles</TabsTrigger>
              </>
            )}
          </TabsList>
          
          <TabsContent value="findRides" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Find Available Rides</CardTitle>
                <CardDescription>
                  Search for rides that match your commute
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-8">
                  Search functionality coming soon!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="myBookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>
                  Your upcoming and past ride bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingRides ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
                  </div>
                ) : rides && rides.length > 0 ? (
                  <div className="space-y-4">
                    {/* Render rides here */}
                    <p className="text-gray-500 text-center py-8">
                      No bookings found
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    You haven't booked any rides yet
                  </p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("findRides")}>
                  Find a Ride
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {canCreateRides && (
            <TabsContent value="myRides" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Rides</CardTitle>
                  <CardDescription>
                    Rides you're offering as a driver
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingRides ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
                    </div>
                  ) : rides && rides.length > 0 ? (
                    <div className="space-y-4">
                      {/* Render rides here */}
                      <p className="text-gray-500 text-center py-8">
                        No rides found
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      You haven't created any rides yet
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Create a Ride
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          )}
          
          {canCreateRides && (
            <TabsContent value="myVehicles" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Vehicles</CardTitle>
                  <CardDescription>
                    Manage your vehicles for carpooling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingVehicles ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
                    </div>
                  ) : vehicles && vehicles.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      {vehicles.map((vehicle: Vehicle) => (
                        <div key={vehicle.id} className="bg-white border rounded-lg p-4 shadow-sm">
                          <div className="flex items-center mb-2">
                            <Car className="h-5 w-5 text-primary-500 mr-2" />
                            <h3 className="font-medium">{vehicle.make} {vehicle.model}</h3>
                          </div>
                          <div className="text-sm text-gray-500 space-y-1">
                            <p>Year: {vehicle.year}</p>
                            <p>Color: {vehicle.color}</p>
                            <p>License: {vehicle.licensePlate}</p>
                            <p>Capacity: {vehicle.capacity} seats</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      You haven't added any vehicles yet
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Add a Vehicle
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
}