import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon,
  Bell,
  Shield,
  Database,
  Zap,
  Globe,
  Mail,
  Key,
  Palette,
  Server,
  Users,
  Eye,
  Copy,
  RefreshCw,
  Save,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Settings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Settings state
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Sew Bot Admin OS",
    siteDescription: "Production Management System for Textile Industry",
    adminEmail: "admin@sewbot.com",
    supportEmail: "support@sewbot.com",
    timeZone: "UTC+3",
    language: "Russian"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newOrderAlerts: true,
    vendorApplications: true,
    moderationQueue: true,
    systemAlerts: true,
    weeklyReports: false,
    maintenanceAlerts: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "8",
    passwordPolicy: true,
    loginAttempts: "3",
    apiRateLimit: "1000",
    ipWhitelist: false
  });

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    debugMode: false,
    cacheEnabled: true,
    autoBackups: true,
    logRetention: "30",
    maxFileSize: "10"
  });

  const apiKeys = [
    {
      name: "Telegram Bot API",
      key: "bot123456:AAH4f5t6g7h8i9j0k1l2m3n4o5p6q7r8s9t",
      status: "active",
      lastUsed: "2 hours ago"
    },
    {
      name: "Payment Gateway",
      key: "pk_live_51234567890abcdefghijklmnop",
      status: "active", 
      lastUsed: "15 minutes ago"
    },
    {
      name: "Email Service",
      key: "SG.1a2b3c4d5e6f7g8h9i0j.k1l2m3n4o5p6q7r8s9t0",
      status: "inactive",
      lastUsed: "Never"
    }
  ];

  const handleSave = async (section: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Settings saved",
      description: `${section} settings have been updated successfully.`,
    });
    setIsLoading(false);
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.substring(0, 4) + "•".repeat(key.length - 8) + key.substring(key.length - 4);
  };

  const getStatusBadge = (status: string) => {
    return status === "active" 
      ? "bg-success/20 text-success border-success/30"
      : "bg-muted/20 text-muted-foreground border-muted/30";
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Configure system preferences, security, and integrations
          </p>
        </div>
        <Button variant="glow" onClick={() => handleSave("All")} disabled={isLoading}>
          {isLoading ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save All Changes
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-glass/50 border border-glass-border backdrop-blur-md">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API & Integrations</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="bg-gradient-card border-card-border backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Globe className="h-5 w-5 text-accent" />
                General Configuration
              </CardTitle>
              <CardDescription>
                Basic system settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                    className="bg-glass/50 border-glass-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={generalSettings.adminEmail}
                    onChange={(e) => setGeneralSettings({...generalSettings, adminEmail: e.target.value})}
                    className="bg-glass/50 border-glass-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})}
                    className="bg-glass/50 border-glass-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeZone">Time Zone</Label>
                  <Input
                    id="timeZone"
                    value={generalSettings.timeZone}
                    onChange={(e) => setGeneralSettings({...generalSettings, timeZone: e.target.value})}
                    className="bg-glass/50 border-glass-border"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                  className="bg-glass/50 border-glass-border"
                  rows={3}
                />
              </div>
              <Button variant="glass" onClick={() => handleSave("General")}>
                <Save className="h-4 w-4 mr-2" />
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-gradient-card border-card-border backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Bell className="h-5 w-5 text-accent" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure when and how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 rounded-lg bg-glass/30 border border-glass-border/50">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {key.includes('email') && "Receive notifications via email"}
                        {key.includes('push') && "Browser push notifications"}
                        {key.includes('order') && "New order submissions"}
                        {key.includes('vendor') && "Vendor applications and updates"}
                        {key.includes('moderation') && "Items needing moderation"}
                        {key.includes('system') && "System errors and alerts"}
                        {key.includes('weekly') && "Weekly summary reports"}
                        {key.includes('maintenance') && "Scheduled maintenance notifications"}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, [key]: checked})
                      }
                    />
                  </div>
                ))}
              </div>
              <Button variant="glass" onClick={() => handleSave("Notifications")}>
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-gradient-card border-card-border backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Shield className="h-5 w-5 text-accent" />
                Security Configuration
              </CardTitle>
              <CardDescription>
                Manage access control and security policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-glass/30 border border-glass-border/50">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-foreground">Two-Factor Authentication</Label>
                    <p className="text-xs text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => 
                      setSecuritySettings({...securitySettings, twoFactorAuth: checked})
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                      className="bg-glass/50 border-glass-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                    <Input
                      id="loginAttempts"
                      type="number"
                      value={securitySettings.loginAttempts}
                      onChange={(e) => setSecuritySettings({...securitySettings, loginAttempts: e.target.value})}
                      className="bg-glass/50 border-glass-border"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-glass/30 border border-glass-border/50">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-foreground">Strong Password Policy</Label>
                    <p className="text-xs text-muted-foreground">Enforce complex password requirements</p>
                  </div>
                  <Switch
                    checked={securitySettings.passwordPolicy}
                    onCheckedChange={(checked) => 
                      setSecuritySettings({...securitySettings, passwordPolicy: checked})
                    }
                  />
                </div>
              </div>
              <Button variant="glass" onClick={() => handleSave("Security")}>
                <Save className="h-4 w-4 mr-2" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api" className="space-y-6">
          <Card className="bg-gradient-card border-card-border backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Key className="h-5 w-5 text-accent" />
                API Keys & Integrations
              </CardTitle>
              <CardDescription>
                Manage API keys and external service integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {apiKeys.map((api, index) => (
                  <div key={index} className="p-4 rounded-lg bg-glass/30 border border-glass-border/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                          <Key className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{api.name}</h4>
                          <p className="text-xs text-muted-foreground">Last used: {api.lastUsed}</p>
                        </div>
                      </div>
                      <Badge className={getStatusBadge(api.status)}>
                        {api.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        value={maskApiKey(api.key)}
                        readOnly
                        className="bg-glass/50 border-glass-border font-mono text-sm"
                      />
                      <Button variant="glass" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="glass" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="neon">
                <Key className="h-4 w-4 mr-2" />
                Generate New API Key
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card className="bg-gradient-card border-card-border backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Server className="h-5 w-5 text-accent" />
                System Configuration
              </CardTitle>
              <CardDescription>
                Advanced system settings and maintenance options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <Label className="text-sm font-medium text-destructive">Maintenance Mode</Label>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Enable to temporarily disable user access for system updates
                  </p>
                  <Switch
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => 
                      setSystemSettings({...systemSettings, maintenanceMode: checked})
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-glass/30 border border-glass-border/50">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-foreground">Debug Mode</Label>
                      <p className="text-xs text-muted-foreground">Enable detailed logging</p>
                    </div>
                    <Switch
                      checked={systemSettings.debugMode}
                      onCheckedChange={(checked) => 
                        setSystemSettings({...systemSettings, debugMode: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-glass/30 border border-glass-border/50">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-foreground">Cache Enabled</Label>
                      <p className="text-xs text-muted-foreground">Improve performance</p>
                    </div>
                    <Switch
                      checked={systemSettings.cacheEnabled}
                      onCheckedChange={(checked) => 
                        setSystemSettings({...systemSettings, cacheEnabled: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-glass/30 border border-glass-border/50">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-foreground">Auto Backups</Label>
                      <p className="text-xs text-muted-foreground">Daily automated backups</p>
                    </div>
                    <Switch
                      checked={systemSettings.autoBackups}
                      onCheckedChange={(checked) => 
                        setSystemSettings({...systemSettings, autoBackups: checked})
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logRetention">Log Retention (days)</Label>
                    <Input
                      id="logRetention"
                      type="number"
                      value={systemSettings.logRetention}
                      onChange={(e) => setSystemSettings({...systemSettings, logRetention: e.target.value})}
                      className="bg-glass/50 border-glass-border"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="glass" onClick={() => handleSave("System")}>
                  <Save className="h-4 w-4 mr-2" />
                  Save System Settings
                </Button>
                <Button variant="destructive">
                  <Database className="h-4 w-4 mr-2" />
                  Clear Cache
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;