import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Eye,
  Star,
  Building2,
  MapPin,
  Award,
  Camera,
  Users,
  TrendingUp
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const Vendors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const vendors = [
    {
      id: 1,
      name: "TextilePro Industries",
      owner: "Sarah Johnson",
      city: "Los Angeles",
      operations: ["Manufacturing", "Quality Control"],
      verified: true,
      published: true,
      rating: 4.8,
      projectsCount: 47,
      portfolioImages: 3,
      joinDate: "2023-08-15",
      description: "Leading textile manufacturer specializing in organic fabrics",
      category: "Manufacturing"
    },
    {
      id: 2,
      name: "Eco Fabrics Co.",
      owner: "Michael Chen",
      city: "San Francisco",
      operations: ["Sourcing", "Design"],
      verified: true,
      published: true,
      rating: 4.6,
      projectsCount: 32,
      portfolioImages: 5,
      joinDate: "2023-09-22",
      description: "Sustainable fabric solutions and eco-friendly materials",
      category: "Sourcing"
    },
    {
      id: 3,
      name: "Custom Pattern Studio",
      owner: "Emma Davis",
      city: "New York",
      operations: ["Design", "Consulting"],
      verified: false,
      published: false,
      rating: 4.2,
      projectsCount: 18,
      portfolioImages: 8,
      joinDate: "2024-01-10",
      description: "Digital pattern design and custom textile solutions",
      category: "Design"
    },
    {
      id: 4,
      name: "GreenWeave Ltd.",
      owner: "Robert Wilson",
      city: "Seattle",
      operations: ["Manufacturing", "Sourcing"],
      verified: true,
      published: true,
      rating: 4.4,
      projectsCount: 28,
      portfolioImages: 4,
      joinDate: "2023-12-05",
      description: "Premium organic materials with sustainable processes",
      category: "Manufacturing"
    },
    {
      id: 5,
      name: "Quality Textiles Inc.",
      owner: "Lisa Martinez",
      city: "Chicago",
      operations: ["Quality Control", "Testing"],
      verified: false,
      published: true,
      rating: 4.0,
      projectsCount: 15,
      portfolioImages: 2,
      joinDate: "2024-02-18",
      description: "Professional textile testing and quality assurance services",
      category: "Quality Control"
    }
  ];

  const getVerificationBadge = (verified: boolean) => {
    return verified 
      ? "bg-success/20 text-success border-success/30"
      : "bg-warning/20 text-warning border-warning/30";
  };

  const getPublishBadge = (published: boolean) => {
    return published 
      ? "bg-primary/20 text-primary border-primary/30"
      : "bg-muted/20 text-muted-foreground border-muted/30";
  };

  const getCategoryBadge = (category: string) => {
    const variants: Record<string, string> = {
      Manufacturing: "bg-accent/20 text-accent border-accent/30",
      Sourcing: "bg-primary/20 text-primary border-primary/30",
      Design: "bg-warning/20 text-warning border-warning/30",
      "Quality Control": "bg-success/20 text-success border-success/30"
    };
    
    return cn(
      "border backdrop-blur-sm",
      variants[category] || "bg-muted/20 text-muted-foreground border-muted/30"
    );
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vendors</h1>
          <p className="text-muted-foreground">
            Manage vendor profiles, verification, and marketplace visibility
          </p>
        </div>
        <Button variant="glow" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Vendor
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-card-border backdrop-blur-md hover:shadow-glow transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Vendors</p>
                <p className="text-2xl font-bold text-foreground">{vendors.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-accent animate-glow-pulse" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-card-border backdrop-blur-md hover:shadow-glow transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verified</p>
                <p className="text-2xl font-bold text-success">
                  {vendors.filter(v => v.verified).length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-card-border backdrop-blur-md hover:shadow-glow transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-2xl font-bold text-primary">
                  {vendors.filter(v => v.published).length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-card-border backdrop-blur-md hover:shadow-glow transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold text-warning">4.4</p>
              </div>
              <Star className="h-8 w-8 text-warning fill-current" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-gradient-card border-card-border backdrop-blur-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search vendors by name, owner, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-glass/50 border-glass-border backdrop-blur-sm"
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="glass" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Category
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover/95 backdrop-blur-md border-glass-border">
                  <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSelectedFilter("all")}>
                    All Categories
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("manufacturing")}>
                    Manufacturing
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("sourcing")}>
                    Sourcing
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("design")}>
                    Design
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("quality")}>
                    Quality Control
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vendors Table */}
      <Card className="bg-gradient-card border-card-border backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Building2 className="h-5 w-5 text-accent" />
            Vendor Management
          </CardTitle>
          <CardDescription>
            Monitor and manage vendor profiles and marketplace status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-glass-border hover:bg-glass/30">
                <TableHead className="text-foreground font-semibold">Vendor</TableHead>
                <TableHead className="text-foreground font-semibold">Owner</TableHead>
                <TableHead className="text-foreground font-semibold">Location</TableHead>
                <TableHead className="text-foreground font-semibold">Operations</TableHead>
                <TableHead className="text-foreground font-semibold">Status</TableHead>
                <TableHead className="text-foreground font-semibold">Performance</TableHead>
                <TableHead className="text-foreground font-semibold">Portfolio</TableHead>
                <TableHead className="text-foreground font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow 
                  key={vendor.id} 
                  className="border-glass-border hover:bg-glass/20 transition-all duration-300"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                        {vendor.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{vendor.name}</p>
                          {vendor.verified && <Award className="h-4 w-4 text-accent" />}
                        </div>
                        <Badge className={getCategoryBadge(vendor.category)}>
                          {vendor.category}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{vendor.owner}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {vendor.city}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {vendor.operations.map((op, index) => (
                        <Badge 
                          key={index} 
                          className="bg-glass/30 text-foreground border-glass-border text-xs"
                        >
                          {op}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={getVerificationBadge(vendor.verified)}>
                        {vendor.verified ? "Verified" : "Pending"}
                      </Badge>
                      <Badge className={getPublishBadge(vendor.published)}>
                        {vendor.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-warning fill-current" />
                        <span className="text-sm font-medium text-foreground">{vendor.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3" />
                        {vendor.projectsCount} projects
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Camera className="h-4 w-4 text-accent" />
                      <span className="text-sm text-foreground">{vendor.portfolioImages}</span>
                      <span className="text-xs text-muted-foreground">images</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-glass/50">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-popover/95 backdrop-blur-md border-glass-border">
                        <DropdownMenuLabel>Vendor Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:bg-glass/50">
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-glass/50">
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:bg-glass/50 text-success">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {vendor.verified ? "Remove Verification" : "Verify Vendor"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-glass/50 text-primary">
                          <Eye className="h-4 w-4 mr-2" />
                          {vendor.published ? "Unpublish" : "Publish"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:bg-glass/50 text-destructive">
                          <XCircle className="h-4 w-4 mr-2" />
                          Suspend Vendor
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Vendors;