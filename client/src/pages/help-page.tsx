import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ChevronRight, Clock, HelpCircle, Mail, MessageCircle, Phone, Search } from "lucide-react";
import { Link } from "wouter";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">How can we help?</h1>
          <p className="text-lg text-neutral-600">Find answers, get support, or contact us</p>
        </div>

        {/* Search bar */}
        <div className="relative mb-12 max-w-2xl">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-neutral-400" />
          </div>
          <Input 
            type="search" 
            className="block w-full pl-10 py-6 text-neutral-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" 
            placeholder="Search for help topics..."
          />
        </div>

        {/* Main tabs */}
        <Tabs defaultValue="faq" className="mb-10">
          <TabsList className="w-full max-w-2xl grid grid-cols-3 mb-8">
            <TabsTrigger value="faq" className="data-[state=active]:bg-primary-500 data-[state=active]:text-white py-3">
              Frequent Questions
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-primary-500 data-[state=active]:text-white py-3">
              Contact Support
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-primary-500 data-[state=active]:text-white py-3">
              Account Issues
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faq">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="max-w-3xl">
              <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm border border-gray-100">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-4 py-4 hover:bg-gray-50 text-left font-medium">
                    How do I book a ride?
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-2 text-neutral-600">
                    To book a ride, go to the homepage and use the "Find a Ride" tab. Enter your pickup location, destination, date, and time, then click "Find Rides". You'll be shown available rides that match your criteria. Select one that works for you and follow the booking steps.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="px-4 py-4 hover:bg-gray-50 text-left font-medium">
                    How do I offer a ride as a car owner?
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-2 text-neutral-600">
                    To offer a ride, go to the homepage and select the "Offer a Ride" tab. Fill in your starting point, destination, date, and time. After logging in, you'll be able to specify how many passengers you can take, your route, and your price per seat.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="px-4 py-4 hover:bg-gray-50 text-left font-medium">
                    How are prices determined?
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-2 text-neutral-600">
                    Prices are set by car owners, but RideSplit provides suggested pricing based on distance, fuel costs, and local averages. Our goal is to ensure rides are affordable for riders while providing fair compensation to car owners.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="px-4 py-4 hover:bg-gray-50 text-left font-medium">
                    How do I cancel a ride?
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-2 text-neutral-600">
                    You can cancel a booked ride through your dashboard by going to your upcoming rides and selecting "Cancel Ride." Please note that cancellations made less than 24 hours before the scheduled ride may incur a small fee to compensate the car owner.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="px-4 py-4 hover:bg-gray-50 text-left font-medium">
                    Is RideSplit safe?
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-2 text-neutral-600">
                    RideSplit prioritizes safety. All users undergo profile verification, and we have a review system to maintain quality. We also provide in-app communication so you don't need to share personal contact information. Additionally, all rides are tracked for safety purposes.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger className="px-4 py-4 hover:bg-gray-50 text-left font-medium">
                    How do payments work?
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-2 text-neutral-600">
                    Payments are processed securely through the RideSplit platform. Riders pay when they book a ride, and car owners receive their payment after the ride is completed. This ensures both parties are protected from no-shows or cancellations.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white border-gray-100">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                    <MessageCircle className="h-6 w-6 text-primary-500" />
                  </div>
                  <CardTitle>Chat Support</CardTitle>
                  <CardDescription>Get help from our team in real-time</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-5">Average response time: 2 minutes</p>
                  <Button className="w-full" variant="outline">
                    Start Chat
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-100">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-primary-500" />
                  </div>
                  <CardTitle>Call Support</CardTitle>
                  <CardDescription>Speak directly with our team</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-5">Available: 9AM - 8PM local time</p>
                  <Button className="w-full">
                    Call Support
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-100">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-primary-500" />
                  </div>
                  <CardTitle>Email Support</CardTitle>
                  <CardDescription>Send us a detailed message</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-5">Response within 24 hours</p>
                  <Button className="w-full" variant="outline">
                    Send Email
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="account">
            <h2 className="text-2xl font-semibold mb-6">Account & Payments Help</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-primary-500" />
                  Account Management
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-neutral-700 hover:text-primary-600 cursor-pointer">
                    <ChevronRight className="h-4 w-4 mr-2 text-neutral-400" />
                    How to update my profile
                  </li>
                  <li className="flex items-center text-neutral-700 hover:text-primary-600 cursor-pointer">
                    <ChevronRight className="h-4 w-4 mr-2 text-neutral-400" />
                    Changing my password
                  </li>
                  <li className="flex items-center text-neutral-700 hover:text-primary-600 cursor-pointer">
                    <ChevronRight className="h-4 w-4 mr-2 text-neutral-400" />
                    Managing notification settings
                  </li>
                  <li className="flex items-center text-neutral-700 hover:text-primary-600 cursor-pointer">
                    <ChevronRight className="h-4 w-4 mr-2 text-neutral-400" />
                    Deleting my account
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary-500" />
                  Payment Issues
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-neutral-700 hover:text-primary-600 cursor-pointer">
                    <ChevronRight className="h-4 w-4 mr-2 text-neutral-400" />
                    Adding a payment method
                  </li>
                  <li className="flex items-center text-neutral-700 hover:text-primary-600 cursor-pointer">
                    <ChevronRight className="h-4 w-4 mr-2 text-neutral-400" />
                    When am I charged?
                  </li>
                  <li className="flex items-center text-neutral-700 hover:text-primary-600 cursor-pointer">
                    <ChevronRight className="h-4 w-4 mr-2 text-neutral-400" />
                    Requesting a refund
                  </li>
                  <li className="flex items-center text-neutral-700 hover:text-primary-600 cursor-pointer">
                    <ChevronRight className="h-4 w-4 mr-2 text-neutral-400" />
                    Viewing my payment history
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Need more help section */}
        <div className="bg-primary-50 rounded-lg p-8 mt-12 max-w-4xl border border-primary-100">
          <h2 className="text-xl font-semibold mb-4">Need more help?</h2>
          <p className="mb-6 text-neutral-700">Our support team is available 24/7 to assist you with any issues or questions you may have.</p>
          <div className="flex flex-wrap gap-4">
            <Button>
              <Phone className="mr-2 h-4 w-4" /> Contact Support
            </Button>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" /> Email Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}