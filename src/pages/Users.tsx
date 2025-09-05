import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  UserPlus, 
  MoreHorizontal,
  Shield,
  Ban,
  RefreshCw,
  MapPin,
  MessageSquare
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

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const users = [
    {
      id: 1,
      name: "John Doe",
      telegramId: "@johndoe123",
      role: "Client",
      city: "New York",
      status: "active",
      joinDate: "2024-01-15",
      ordersCount: 12,
      isModerator: false
    },
    {
      id: 2,
      name: "Sarah Wilson",
      telegramId: "@sarahw",
      role: "Vendor",
      city: "Los Angeles",
      status: "active",
      joinDate: "2024-02-08",
      ordersCount: 45,
      isModerator: true
    },
    {
      id: 3,
      name: "Mike Chen",
      telegramId: "@mikechen88",
      role: "Admin",
      city: "San Francisco",
      status: "active",
      joinDate: "2023-11-20",
      ordersCount: 3,
      isModerator: true
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      telegramId: "@emilyrod",
      role: "Client",
      city: "Chicago",
      status: "banned",
      joinDate: "2024-03-12",
      ordersCount: 2,
      isModerator: false
    },
    {
      id: 5,
      name: "David Kim",
      telegramId: "@davidk",
      role: "Vendor",
      city: "Seattle",
      status: "inactive",
      joinDate: "2024-01-30",
      ordersCount: 23,
      isModerator: false
    }
  ];

  const getRoleBadge = (role: string) => {
    const variants: Record<string, string> = {
      Admin: "bg-accent/20 text-accent border-accent/30",
      Vendor: "bg-primary/20 text-primary border-primary/30",
      Client: "bg-muted/20 text-foreground border-muted/30"
    };
    
    return cn(
      "border backdrop-blur-sm font-medium",
      variants[role] || "bg-muted/20 text-muted-foreground border-muted/30"
    );
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      active: "bg-success/20 text-success border-success/30",
      inactive: "bg-warning/20 text-warning border-warning/30",
      banned: "bg-destructive/20 text-destructive border-destructive/30"
    };
    
    return cn(
      "capitalize border backdrop-blur-sm",
      variants[status] || "bg-muted/20 text-muted-foreground border-muted/30"
    );
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <Button variant="glow" className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="bg-gradient-card border-card-border backdrop-blur-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name, Telegram ID, or city..."
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
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover/95 backdrop-blur-md border-glass-border">
                  <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSelectedFilter("all")}>
                    All Users
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("admin")}>
                    Admins
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("vendor")}>
                    Vendors
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("client")}>
                    Clients
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-gradient-card border-card-border backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Shield className="h-5 w-5 text-accent" />
            User Management
          </CardTitle>
          <CardDescription>
            {users.length} total users registered in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-glass-border hover:bg-glass/30">
                <TableHead className="text-foreground font-semibold">User</TableHead>
                <TableHead className="text-foreground font-semibold">Telegram ID</TableHead>
                <TableHead className="text-foreground font-semibold">Role</TableHead>
                <TableHead className="text-foreground font-semibold">Location</TableHead>
                <TableHead className="text-foreground font-semibold">Status</TableHead>
                <TableHead className="text-foreground font-semibold">Orders</TableHead>
                <TableHead className="text-foreground font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow 
                  key={user.id} 
                  className="border-glass-border hover:bg-glass/20 transition-all duration-300"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Joined {new Date(user.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-accent" />
                      <code className="text-sm bg-glass/30 px-2 py-1 rounded text-accent">
                        {user.telegramId}
                      </code>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge className={getRoleBadge(user.role)}>
                        {user.role}
                      </Badge>
                      {user.isModerator && (
                        <Badge className="bg-accent/20 text-accent border-accent/30">
                          Mod
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {user.city}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-foreground">{user.ordersCount}</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-glass/50">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-popover/95 backdrop-blur-md border-glass-border">
                        <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:bg-glass/50">
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-glass/50">
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:bg-glass/50 text-accent">
                          <Shield className="h-4 w-4 mr-2" />
                          Toggle Moderator
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-glass/50 text-warning">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Reset Role
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:bg-glass/50 text-destructive">
                          <Ban className="h-4 w-4 mr-2" />
                          {user.status === "banned" ? "Unban User" : "Ban User"}
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

export default Users;