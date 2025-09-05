import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  Calendar,
  DollarSign,
  User,
  Building2,
  MessageSquare,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  ThumbsUp,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app this would come from API
  const order = {
    id: id || "ORD-1234",
    clientName: "John Doe",
    clientId: "@johndoe123",
    category: "Custom Textile",
    status: "in_progress",
    budget: "$2,500",
    deadline: "2024-12-25",
    createdAt: "2024-12-01",
    description: "Custom fabric manufacturing for winter collection. Need high-quality organic cotton with custom dye patterns. The project requires sustainable materials and eco-friendly processes.",
    priority: "high",
    requirements: [
      "Organic cotton material",
      "Custom dye patterns",
      "Eco-friendly processes",
      "Quality certification",
      "Delivery by December 25th"
    ]
  };

  const bids = [
    {
      id: 1,
      vendorName: "TextilePro Industries",
      vendorRating: 4.8,
      price: "$2,200",
      leadTime: "18 days",
      experience: "8+ years",
      proposal: "We specialize in organic textile manufacturing with certified eco-friendly processes...",
      matchScore: 95,
      verified: true,
      portfolioCount: 47
    },
    {
      id: 2,
      vendorName: "Eco Fabrics Co.",
      vendorRating: 4.6,
      price: "$2,400",
      leadTime: "15 days",
      experience: "5+ years",
      proposal: "Sustainable fabric solutions with innovative dyeing techniques...",
      matchScore: 88,
      verified: true,
      portfolioCount: 32
    },
    {
      id: 3,
      vendorName: "GreenWeave Ltd.",
      vendorRating: 4.2,
      price: "$2,800",
      leadTime: "22 days",
      experience: "6+ years",
      proposal: "Premium organic materials with custom pattern development...",
      matchScore: 82,
      verified: false,
      portfolioCount: 28
    }
  ];

  const chats = [
    {
      id: 1,
      participant: "John Doe (Client)",
      lastMessage: "Can we discuss the timeline in detail?",
      timestamp: "2 hours ago",
      unreadCount: 2
    },
    {
      id: 2,
      participant: "TextilePro Industries",
      lastMessage: "We can start production next week",
      timestamp: "4 hours ago",
      unreadCount: 0
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: "bg-warning/20 text-warning border-warning/30",
      in_progress: "bg-primary/20 text-primary border-primary/30",
      completed: "bg-success/20 text-success border-success/30",
      cancelled: "bg-destructive/20 text-destructive border-destructive/30"
    };
    
    return cn(
      "capitalize border backdrop-blur-sm font-medium",
      variants[status] || "bg-muted/20 text-muted-foreground border-muted/30"
    );
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="glass" 
          size="icon"
          onClick={() => navigate('/orders')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">Order Details</h1>
          <p className="text-muted-foreground">View and manage order #{order.id}</p>
        </div>
        <Badge className={getStatusBadge(order.status)}>
          {order.status.replace('_', ' ')}
        </Badge>
      </div>

      {/* Order Summary */}
      <Card className="bg-gradient-card border-card-border backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <CheckCircle className="h-5 w-5 text-accent" />
            Order Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Client</p>
                <p className="font-medium text-foreground">{order.clientName}</p>
                <p className="text-xs text-accent">{order.clientId}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Budget</p>
                <p className="font-medium text-success">{order.budget}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium text-foreground">{order.category}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Deadline</p>
                <p className="font-medium text-warning">
                  {new Date(order.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="font-medium text-foreground">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Priority</p>
                <Badge className="bg-destructive/20 text-destructive border-destructive/30 capitalize">
                  {order.priority}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Content */}
      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="bg-glass/50 border border-glass-border backdrop-blur-md">
          <TabsTrigger value="info">Order Info</TabsTrigger>
          <TabsTrigger value="bids">Bids ({bids.length})</TabsTrigger>
          <TabsTrigger value="chats">Chats</TabsTrigger>
          <TabsTrigger value="matching">Matching</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-6">
          <Card className="bg-gradient-card border-card-border backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-foreground">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{order.description}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-card-border backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-foreground">Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {order.requirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                    <span className="text-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bids" className="space-y-6">
          {bids.map((bid) => (
            <Card key={bid.id} className="bg-gradient-card border-card-border backdrop-blur-md hover:shadow-glow transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                      {bid.vendorName.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-foreground flex items-center gap-2">
                        {bid.vendorName}
                        {bid.verified && <Award className="h-4 w-4 text-accent" />}
                      </CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-warning fill-current" />
                            {bid.vendorRating}
                          </span>
                          <span>{bid.experience} experience</span>
                          <span>{bid.portfolioCount} projects</span>
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn("text-2xl font-bold", getMatchScoreColor(bid.matchScore))}>
                      {bid.matchScore}%
                    </div>
                    <p className="text-xs text-muted-foreground">match</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-success" />
                    <span className="font-medium text-success">{bid.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{bid.leadTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-accent" />
                    <span className="text-foreground">Recommended</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{bid.proposal}</p>
                <div className="flex gap-2">
                  <Button variant="glow" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="glass" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="chats">
          <Card className="bg-gradient-card border-card-border backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-foreground">Communications</CardTitle>
              <CardDescription>Chat history with client and vendors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {chats.map((chat) => (
                <div 
                  key={chat.id}
                  className="p-4 rounded-lg bg-glass/30 hover:bg-glass/50 transition-all border border-glass-border/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-accent" />
                      <span className="font-medium text-foreground">{chat.participant}</span>
                      {chat.unreadCount > 0 && (
                        <Badge className="bg-destructive/20 text-destructive border-destructive/30">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{chat.lastMessage}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matching">
          <Card className="bg-gradient-card border-card-border backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-foreground">AI Matching Results</CardTitle>
              <CardDescription>Vendor compatibility scores based on requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {bids.map((bid) => (
                <div key={bid.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{bid.vendorName}</span>
                    <span className={cn("font-bold", getMatchScoreColor(bid.matchScore))}>
                      {bid.matchScore}%
                    </span>
                  </div>
                  <Progress 
                    value={bid.matchScore} 
                    className="h-2"
                  />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div className="text-center">
                      <p className="text-muted-foreground">Price</p>
                      <p className="font-medium text-success">90%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground">Timeline</p>
                      <p className="font-medium text-warning">85%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground">Experience</p>
                      <p className="font-medium text-primary">95%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground">Quality</p>
                      <p className="font-medium text-accent">{bid.vendorRating * 20}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderDetail;