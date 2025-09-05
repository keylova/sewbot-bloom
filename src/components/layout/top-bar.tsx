import { Search, Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function TopBar() {
  return (
    <header className="h-16 bg-gradient-glass border-b border-glass-border backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <SidebarTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-glass/50">
            <Menu className="h-5 w-5" />
          </Button>
        </SidebarTrigger>
        
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search orders, users, vendors..."
            className="pl-10 bg-glass/50 border-glass-border backdrop-blur-sm hover:bg-glass/70 focus:bg-glass/80 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-glass/50">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-destructive text-xs border-0">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-80 bg-popover/95 backdrop-blur-md border-glass-border"
          >
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-glass/50">
              <div className="space-y-1">
                <p className="text-sm font-medium">New order submitted</p>
                <p className="text-xs text-muted-foreground">Order #ORD-1234 requires attention</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-glass/50">
              <div className="space-y-1">
                <p className="text-sm font-medium">Vendor verification pending</p>
                <p className="text-xs text-muted-foreground">2 vendors awaiting approval</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-glass/50">
              <div className="space-y-1">
                <p className="text-sm font-medium">Moderation queue alert</p>
                <p className="text-xs text-muted-foreground">5 items need review</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-glass/50 px-3">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@sewbot.com</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-56 bg-popover/95 backdrop-blur-md border-glass-border"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-glass/50">Profile Settings</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-glass/50">Preferences</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-glass/50">API Keys</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-glass/50 text-destructive">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}