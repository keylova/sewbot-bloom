import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  ShoppingBag, 
  Building2, 
  TrendingUp, 
  Activity, 
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Orders",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: ShoppingBag,
      color: "accent"
    },
    {
      title: "Active Users",
      value: "1,294",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "success"
    },
    {
      title: "Verified Vendors",
      value: "156",
      change: "+3%",
      trend: "up",
      icon: Building2,
      color: "primary"
    },
    {
      title: "Revenue",
      value: "$84,290",
      change: "+24%",
      trend: "up",
      icon: TrendingUp,
      color: "warning"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "order",
      title: "New order submitted",
      description: "ORD-1234 - Custom textile manufacturing",
      time: "2 minutes ago",
      status: "pending",
      user: "John Doe"
    },
    {
      id: 2,
      type: "vendor",
      title: "Vendor verification completed",
      description: "TextilePro Industries approved",
      time: "15 minutes ago",
      status: "approved",
      user: "System"
    },
    {
      id: 3,
      type: "moderation",
      title: "Content flagged for review",
      description: "Order description needs moderation",
      time: "1 hour ago",
      status: "warning",
      user: "Auto-Moderator"
    },
    {
      id: 4,
      type: "order",
      title: "Order completed",
      description: "ORD-1187 - Fabric sourcing completed",
      time: "2 hours ago",
      status: "completed",
      user: "Sarah Smith"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4 text-warning" />;
      case "approved": return <CheckCircle className="h-4 w-4 text-success" />;
      case "completed": return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: "bg-warning/20 text-warning border-warning/30",
      approved: "bg-success/20 text-success border-success/30",
      completed: "bg-success/20 text-success border-success/30",
      warning: "bg-destructive/20 text-destructive border-destructive/30"
    };
    
    return cn(
      "capitalize border backdrop-blur-sm",
      variants[status] || "bg-muted/20 text-muted-foreground border-muted/30"
    );
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to Sew Bot Admin OS. Monitor your production management system.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card 
            key={stat.title}
            className="bg-gradient-card border-card-border backdrop-blur-md hover:shadow-glow transition-all duration-300 group"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={cn(
                "h-5 w-5 transition-all duration-300",
                stat.color === "accent" && "text-accent group-hover:animate-glow-pulse",
                stat.color === "success" && "text-success group-hover:animate-glow-pulse",
                stat.color === "primary" && "text-primary group-hover:animate-glow-pulse",
                stat.color === "warning" && "text-warning group-hover:animate-glow-pulse"
              )} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className={cn(
                "text-xs flex items-center gap-1",
                stat.trend === "up" ? "text-success" : "text-destructive"
              )}>
                <TrendingUp className="h-3 w-3" />
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-card border-card-border backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Recent Activity</CardTitle>
                <CardDescription>Latest system events and notifications</CardDescription>
              </div>
              <Button variant="glass" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-start gap-4 p-4 rounded-lg bg-glass/30 hover:bg-glass/50 transition-all duration-300 border border-glass-border/50"
                >
                  <div className="flex-shrink-0">
                    {getStatusIcon(activity.status)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <Badge className={getStatusBadge(activity.status)}>
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{activity.time}</span>
                      <span>•</span>
                      <span>{activity.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="bg-gradient-card border-card-border backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
              <CardDescription>Frequently used operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="glow" className="w-full justify-start">
                <ShoppingBag className="h-4 w-4 mr-2" />
                View Pending Orders
              </Button>
              <Button variant="glass" className="w-full justify-start">
                <Building2 className="h-4 w-4 mr-2" />
                Review Vendors
              </Button>
              <Button variant="neon" className="w-full justify-start">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Moderation Queue
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                User Management
              </Button>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="bg-gradient-card border-card-border backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-foreground">System Status</CardTitle>
              <CardDescription>Real-time system health</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">API Status</span>
                <Badge className="bg-success/20 text-success border-success/30">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Database</span>
                <Badge className="bg-success/20 text-success border-success/30">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Cache</span>
                <Badge className="bg-success/20 text-success border-success/30">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Queue</span>
                <Badge className="bg-warning/20 text-warning border-warning/30">Processing</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;