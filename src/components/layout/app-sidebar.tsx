import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Building2, 
  Shield, 
  MessageSquare,
  Settings,
  Zap
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview & Analytics"
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
    description: "Manage Users"
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ShoppingBag,
    description: "Order Management"
  },
  {
    title: "Vendors",
    url: "/vendors",
    icon: Building2,
    description: "Vendor Management"
  },
  {
    title: "Moderation",
    url: "/moderation",
    icon: Shield,
    description: "Content Moderation"
  },
  {
    title: "Chat Panel",
    url: "/chat",
    icon: MessageSquare,
    description: "Communication Hub"
  }
];

const bottomItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings
  }
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/dashboard" && location.pathname === "/") return true;
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <Sidebar 
      className={cn(
        "border-r border-glass-border bg-sidebar backdrop-blur-xl",
        open ? "w-64" : "w-16"
      )}
    >
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          {open && (
            <div className="animate-fade-in">
              <h1 className="text-xl font-bold text-foreground">Sew Bot</h1>
              <p className="text-sm text-muted-foreground">Admin OS</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground uppercase tracking-wider text-xs">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden",
                          active 
                            ? "bg-gradient-card border border-accent/30 text-accent shadow-glow" 
                            : "hover:bg-glass/50 hover:text-accent-foreground text-muted-foreground hover:border hover:border-glass-border"
                        )}
                      >
                        <item.icon className={cn(
                          "w-5 h-5 transition-all duration-300",
                          active ? "text-accent animate-glow-pulse" : "group-hover:text-accent"
                        )} />
                        {open && (
                          <div className="flex flex-col animate-slide-in">
                            <span className="font-medium text-sm">{item.title}</span>
                            <span className="text-xs opacity-70">{item.description}</span>
                          </div>
                        )}
                        {active && (
                          <div className="absolute inset-0 bg-gradient-glow opacity-20 animate-glass-shine" />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Section */}
        <div className="mt-auto pb-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {bottomItems.map((item) => {
                  const active = isActive(item.url);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className={cn(
                            "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300",
                            active 
                              ? "bg-gradient-card border border-accent/30 text-accent" 
                              : "hover:bg-glass/50 hover:text-accent-foreground text-muted-foreground"
                          )}
                        >
                          <item.icon className="w-5 h-5" />
                          {open && <span className="font-medium text-sm">{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}