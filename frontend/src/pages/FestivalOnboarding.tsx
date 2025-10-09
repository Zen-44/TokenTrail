import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar, MapPin, Users, BarChart2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config";

const FestivalOnboarding = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    festivalName: "",
    organizerName: "",
    email: "",
    phone: "",
    location: "",
    startDate: "",
    endDate: "",
    expectedAttendees: "",
    sponsorBudget: "",
    website: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/festivals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");

      toast({
        title: "Application Submitted!",
        description: "We'll contact you within 48 hours to discuss your festival integration.",
      });

      setFormData({
        festivalName: "",
        organizerName: "",
        email: "",
        phone: "",
        location: "",
        startDate: "",
        endDate: "",
        expectedAttendees: "",
        sponsorBudget: "",
        website: "",
      });
    } catch (err) {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-bg px-6 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary-glow mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold glow-text mb-4">
              Partner With TokenTrail
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your festival experience with Web3 quests and token rewards. 
              Engage attendees like never before.
            </p>
          </div>
        </div>

        {/* Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="gamefi-card">
            <CardHeader className="text-center">
              <Users className="w-10 h-10 mx-auto mb-2 text-primary" />
              <CardTitle className="text-lg">Increased Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Keep attendees exploring and interacting with sponsors throughout your event
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="gamefi-card">
            <CardHeader className="text-center">
              <BarChart2 className="w-10 h-10 mx-auto mb-2 text-accent" />
              <CardTitle className="text-lg">User Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Measure participant involvement through quest completion rates in the festival app
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="gamefi-card">
            <CardHeader className="text-center">
              <MapPin className="w-10 h-10 mx-auto mb-2 text-secondary" />
              <CardTitle className="text-lg">Data Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Track attendee movement and preferences with blockchain-verified data
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <Card className="gamefi-card">
          <CardHeader>
            <CardTitle className="text-2xl text-center glow-text">
              Festival Application Form
            </CardTitle>
            <CardDescription className="text-center">
              Tell us about your festival and we'll create a custom quest experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="festivalName">Festival Name *</Label>
                  <Input
                    id="festivalName"
                    name="festivalName"
                    value={formData.festivalName}
                    onChange={handleChange}
                    required
                    className="bg-muted/20 border-primary/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="organizerName">Organizer Name *</Label>
                  <Input
                    id="organizerName"
                    name="organizerName"
                    value={formData.organizerName}
                    onChange={handleChange}
                    required
                    className="bg-muted/20 border-primary/30"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-muted/20 border-primary/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-muted/20 border-primary/30"
                  />
                </div>
              </div>

    

              <div className="space-y-2">
                <Label htmlFor="location">Festival Location *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="bg-muted/20 border-primary/30"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="bg-muted/20 border-primary/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="bg-muted/20 border-primary/30"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="expectedAttendees">Expected Attendees</Label>
                  <Input
                    id="expectedAttendees"
                    name="expectedAttendees"
                    value={formData.expectedAttendees}
                    onChange={handleChange}
                    placeholder="e.g., 10,000"
                    className="bg-muted/20 border-primary/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sponsorBudget">Sponsor Budget Range</Label>
                  <Input
                    id="sponsorBudget"
                    name="sponsorBudget"
                    value={formData.sponsorBudget}
                    onChange={handleChange}
                    placeholder="e.g., $50,000 - $100,000"
                    className="bg-muted/20 border-primary/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Festival Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://yourfestival.com"
                  className="bg-muted/20 border-primary/30"
                />
              </div>

              <div className="text-center pt-4">
                <Button type="submit" className="gamefi-button text-lg px-12 py-3">
                  Submit Application
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FestivalOnboarding;
