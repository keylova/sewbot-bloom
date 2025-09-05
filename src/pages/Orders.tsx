import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Plus, 
  Eye,
  Clock,
  DollarSign,
  Calendar,
  User,
  Building2,
  ShoppingBag
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

const Orders = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const orders = [
    {
      id: "ORD-1234",
      clientName: "John Doe",
      category: "Custom Textile",
      status: "pending",
      budget: "$2,500",
      deadline: "2024-12-25",
      bidsCount: 5,
      createdAt: "2024-12-01",
      description: "Custom fabric manufacturing for winter collection",
      priority: "high"
    },
    {
      id: "ORD-1235",
      clientName: "Sarah Wilson",
      category: "Fabric Sourcing",
      status: "in_progress",
      budget: "$1,200",
      deadline: "2024-12-20",
      bidsCount: 8,
      createdAt: "2024-11-28",
      description: "Organic cotton sourcing for sustainable fashion line",
      priority: "medium"
    },
    {
      id: "ORD-1236",
      clientName: "Mike Chen",
      category: "Pattern Design",
      status: "completed",
      budget: "$800",
      deadline: "2024-12-15",
      bidsCount: 12,
      createdAt: "2024-11-25",
      description: "Digital pattern design for children's clothing",
      priority: "low"
    },
    {
      id: "ORD-1237",
      clientName: "Emily Rodriguez",
      category: "Manufacturing",
      status: "cancelled",
      budget: "$5,000",
      deadline: "2024-12-30",
      bidsCount: 3,
      createdAt: "2024-11-30",
      description: "Large-scale garment manufacturing project",
      priority: "high"
    },
    {
      id: "ORD-1238",
      clientName: "David Kim",
      category: "Quality Control",
      status: "review",
      budget: "$900",
      deadline: "2024-12-22",
      bidsCount: 7,
      createdAt: "2024-12-02",
      description: "Quality inspection for exported textiles",
      priority: "medium"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: "bg-warning/20 text-warning border-warning/30",
      in_progress: "bg-primary/20 text-primary border-primary/30",
      completed: "bg-success/20 text-success border-success/30",
      cancelled: "bg-destructive/20 text-destructive border-destructive/30",
      review: "bg-accent/20 text-accent border-accent/30"
    };
    
    return cn(
      "capitalize border backdrop-blur-sm font-medium",
      variants[status] || "bg-muted/20 text-muted-foreground border-muted/30"
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, string> = {
      high: "bg-destructive/20 text-destructive border-destructive/30",
      medium: "bg-warning/20 text-warning border-warning/30",
      low: "bg-success/20 text-success border-success/30"
    };
    
    return cn(
      "capitalize border backdrop-blur-sm text-xs",
      variants[priority] || "bg-muted/20 text-muted-foreground border-muted/30"
    );
  };

  const handleViewOrder = (orderId: string) => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground">
            Manage and track all customer orders and requests
          </p>
        </div>
        <Button variant="glow" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Order
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-card-border backdrop-blur-md hover:shadow-glow transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-foreground">{orders.length}</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-accent animate-glow-pulse" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-card-border backdrop-blur-md hover:shadow-glow transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">
                  {orders.filter(o => o.status === 'pending').length}
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
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-primary">
                  {orders.filter(o => o.status === 'in_progress').length}
                </p>
              </div>
              <Building2 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-card-border backdrop-blur-md hover:shadow-glow transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-success">$10.4K</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
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
                placeholder="Search orders by ID, client name, or category..."
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
                    Status
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover/95 backdrop-blur-md border-glass-border">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSelectedFilter("all")}>
                    All Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("pending")}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("in_progress")}>
                    In Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("completed")}>
                    Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("review")}>
                    Under Review
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="bg-gradient-card border-card-border backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <ShoppingBag className="h-5 w-5 text-accent" />
            Order Management
          </CardTitle>
          <CardDescription>
            Track and manage customer orders and production requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-glass-border hover:bg-glass/30">
                <TableHead className="text-foreground font-semibold">Order</TableHead>
                <TableHead className="text-foreground font-semibold">Client</TableHead>
                <TableHead className="text-foreground font-semibold">Category</TableHead>
                <TableHead className="text-foreground font-semibold">Status</TableHead>
                <TableHead className="text-foreground font-semibold">Budget</TableHead>
                <TableHead className="text-foreground font-semibold">Deadline</TableHead>
                <TableHead className="text-foreground font-semibold">Bids</TableHead>
                <TableHead className="text-foreground font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow 
                  key={order.id} 
                  className="border-glass-border hover:bg-glass/20 transition-all duration-300 cursor-pointer"
                  onClick={() => handleViewOrder(order.id)}
                >
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-glass/30 px-2 py-1 rounded text-accent font-semibold">
                          {order.id}
                        </code>
                        <Badge className={getPriorityBadge(order.priority)}>
                          {order.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate max-w-48">
                        {order.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
                        {order.clientName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{order.clientName}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-foreground">{order.category}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(order.status)}>
                      {order.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-success" />
                      <span className="font-medium text-success">{order.budget}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(order.deadline).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      <span className="font-medium text-primary">{order.bidsCount}</span>
                      <span className="text-xs text-muted-foreground">bids</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="glass" 
                      size="sm" 
                      className="flex items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewOrder(order.id);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
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

export default Orders;