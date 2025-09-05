import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MessageSquare,
  Eye,
  User,
  Building2,
  ShoppingBag,
  Calendar,
  Timer
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const Moderation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const moderationItems = [
    {
      id: 1,
      type: "order",
      entityId: "ORD-1240",
      title: "Custom textile manufacturing order",
      shortInfo: "Client requesting large-scale manufacturing with specific quality requirements",
      createdAt: "2024-12-05T10:30:00Z",
      submittedBy: "John Doe",
      priority: "high",
      slaTimeLeft: "1h 12m",
      flagReason: "Potential copyright infringement in design specifications",
      status: "pending"
    },
    {
      id: 2,
      type: "vendor",
      entityId: "VEN-0089",
      title: "EcoFabrics Co. profile verification",
      shortInfo: "New vendor registration with sustainable fabric specialization",
      createdAt: "2024-12-05T08:15:00Z",
      submittedBy: "Sarah Wilson",
      priority: "medium",
      slaTimeLeft: "3h 45m",
      flagReason: "Documentation verification required",
      status: "in_review"
    },
    {
      id: 3,
      type: "order",
      entityId: "ORD-1241",
      title: "Fabric sourcing request",
      shortInfo: "Bulk fabric sourcing for fashion startup",
      createdAt: "2024-12-05T06:00:00Z",
      submittedBy: "Mike Chen",
      priority: "low",
      slaTimeLeft: "6h 20m",
      flagReason: "Automated flag: unusual payment terms mentioned",
      status: "pending"
    },
    {
      id: 4,
      type: "vendor",
      entityId: "VEN-0090",
      title: "TextilePro Industries portfolio update",
      shortInfo: "Vendor updating portfolio with new manufacturing capabilities",
      createdAt: "2024-12-05T14:20:00Z",
      submittedBy: "Emily Rodriguez",
      priority: "medium",
      slaTimeLeft: "2h 30m",
      flagReason: "Quality assurance review needed",
      status: "claimed"
    },
    {
      id: 5,
      type: "order",
      entityId: "ORD-1242",
      title: "Pattern design consultation",
      shortInfo: "Custom pattern design for vintage textile reproduction",
      createdAt: "2024-12-05T12:45:00Z",
      submittedBy: "David Kim",
      priority: "high",
      slaTimeLeft: "45m",
      flagReason: "Potential trademark issues with historical patterns",
      status: "escalated"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "order": return <ShoppingBag className="h-4 w-4 text-accent" />;
      case "vendor": return <Building2 className="h-4 w-4 text-primary" />;
      default: return <AlertTriangle className="h-4 w-4 text-warning" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const variants: Record<string, string> = {
      order: "bg-accent/20 text-accent border-accent/30",
      vendor: "bg-primary/20 text-primary border-primary/30"
    };
    
    return cn(
      "capitalize border backdrop-blur-sm font-medium",
      variants[type] || "bg-muted/20 text-muted-foreground border-muted/30"
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, string> = {
      high: "bg-destructive/20 text-destructive border-destructive/30",
      medium: "bg-warning/20 text-warning border-warning/30",
      low: "bg-success/20 text-success border-success/30"
    };
    
    return cn(
      "capitalize border backdrop-blur-sm text-xs font-medium",
      variants[priority] || "bg-muted/20 text-muted-foreground border-muted/30"
    );
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: "bg-warning/20 text-warning border-warning/30",
      in_review: "bg-primary/20 text-primary border-primary/30",
      claimed: "bg-accent/20 text-accent border-accent/30",
      escalated: "bg-destructive/20 text-destructive border-destructive/30",
      approved: "bg-success/20 text-success border-success/30",
      rejected: "bg-muted/20 text-muted-foreground border-muted/30"
    };
    
    return cn(
      "capitalize border backdrop-blur-sm text-xs font-medium",
      variants[status] || "bg-muted/20 text-muted-foreground border-muted/30"
    );
  };

  const getSlaColor = (timeLeft: string) => {
    const minutes = parseInt(timeLeft.split('h')[0]) * 60 + (parseInt(timeLeft.split('h')[1]?.split('m')[0]) || 0);
    if (minutes < 60) return "text-destructive";
    if (minutes < 180) return "text-warning";
    return "text-success";
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffMs = now.getTime() - created.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m ago`;
    }
    return `${diffMinutes}m ago`;
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Moderation Queue</h1>
          <p className="text-muted-foreground">
            Review and moderate content submissions and vendor applications
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-destructive/20 text-destructive border-destructive/30">
            {moderationItems.filter(item => item.status === "pending" || item.status === "escalated").length} urgent
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-card-border backdrop-blur-md hover:shadow-glow transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Queue Total</p>
                <p className="text-2xl font-bold text-foreground">{moderationItems.length}</p>
              </div>
              <Shield className="h-8 w-8 text-accent animate-glow-pulse" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-card-border backdrop-blur-md hover:shadow-glow transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">
                  {moderationItems.filter(item => item.status === "pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-card-border backdrop-blur-md hover:shadow-glow transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Review</p>
                <p className="text-2xl font-bold text-primary">
                  {moderationItems.filter(item => item.status === "in_review" || item.status === "claimed").length}
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
                <p className="text-sm text-muted-foreground">SLA Breached</p>
                <p className="text-2xl font-bold text-destructive">0</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
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
                placeholder="Search by entity ID, title, or submitter..."
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
                    Priority
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover/95 backdrop-blur-md border-glass-border">
                  <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSelectedFilter("all")}>
                    All Items
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("high")}>
                    High Priority
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("medium")}>
                    Medium Priority
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("low")}>
                    Low Priority
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Moderation Queue */}
      <div className="space-y-4">
        {moderationItems.map((item) => (
          <Card 
            key={item.id} 
            className="bg-gradient-card border-card-border backdrop-blur-md hover:shadow-glow transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    {getTypeIcon(item.type)}
                    <Badge className={getTypeBadge(item.type)}>
                      {item.type}
                    </Badge>
                    <code className="text-sm bg-glass/30 px-2 py-1 rounded text-accent font-semibold">
                      {item.entityId}
                    </code>
                    <Badge className={getPriorityBadge(item.priority)}>
                      {item.priority} priority
                    </Badge>
                  </div>

                  {/* Title and Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item.shortInfo}
                    </p>
                  </div>

                  {/* Flag Reason */}
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <span className="text-sm font-medium text-destructive">Flagged for Review</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.flagReason}</p>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Submitted by {item.submittedBy}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatTimeAgo(item.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className={cn("h-4 w-4", getSlaColor(item.slaTimeLeft))} />
                      <span className={getSlaColor(item.slaTimeLeft)}>
                        ⏳{item.slaTimeLeft} left
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end gap-3">
                  <Badge className={getStatusBadge(item.status)}>
                    {item.status.replace('_', ' ')}
                  </Badge>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="success" size="sm" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approve
                    </Button>
                    <Button variant="destructive" size="sm" className="text-xs">
                      <XCircle className="h-3 w-3 mr-1" />
                      Reject
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="glass" size="sm" className="text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      Review
                    </Button>
                    <Button variant="neon" size="sm" className="text-xs">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Ask Info
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State (if no items) */}
      {moderationItems.length === 0 && (
        <Card className="bg-gradient-card border-card-border backdrop-blur-md">
          <CardContent className="p-12 text-center">
            <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No items in moderation queue
            </h3>
            <p className="text-muted-foreground">
              All submissions have been reviewed and processed.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Moderation;