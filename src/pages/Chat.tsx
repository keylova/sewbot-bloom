import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  MessageSquare, 
  Users, 
  Send,
  MoreHorizontal,
  Phone,
  Video,
  Info,
  Paperclip,
  Smile,
  Lock,
  Unlock
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

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  const chats = [
    {
      id: 1,
      participantName: "John Doe",
      participantRole: "Client",
      lastMessage: "Can we discuss the fabric quality requirements?",
      timestamp: "2 min ago",
      unreadCount: 3,
      isLocked: false,
      orderId: "ORD-1234",
      avatar: "JD"
    },
    {
      id: 2,
      participantName: "TextilePro Industries",
      participantRole: "Vendor",
      lastMessage: "We can start production next week",
      timestamp: "15 min ago",
      unreadCount: 0,
      isLocked: false,
      orderId: "ORD-1234",
      avatar: "TP"
    },
    {
      id: 3,
      participantName: "Sarah Wilson",
      participantRole: "Client",
      lastMessage: "The samples look perfect, let's proceed",
      timestamp: "1 hour ago",
      unreadCount: 1,
      isLocked: true,
      orderId: "ORD-1235",
      avatar: "SW"
    },
    {
      id: 4,
      participantName: "Eco Fabrics Co.",
      participantRole: "Vendor",
      lastMessage: "Updated pricing sent via email",
      timestamp: "2 hours ago",
      unreadCount: 0,
      isLocked: false,
      orderId: "ORD-1236",
      avatar: "EF"
    }
  ];

  const messages = [
    {
      id: 1,
      senderId: "user",
      senderName: "Admin",
      content: "Hello John, I see you have questions about the fabric quality requirements for order ORD-1234?",
      timestamp: "10:30 AM",
      isAdmin: true
    },
    {
      id: 2,
      senderId: "john_doe",
      senderName: "John Doe",
      content: "Yes, I need clarification on the thread count and durability standards. This is for a high-end fashion line.",
      timestamp: "10:32 AM",
      isAdmin: false
    },
    {
      id: 3,
      senderId: "john_doe",
      senderName: "John Doe",
      content: "Also, what certifications can you provide for organic materials?",
      timestamp: "10:33 AM",
      isAdmin: false
    },
    {
      id: 4,
      senderId: "user",
      senderName: "Admin",
      content: "I'll connect you with our quality assurance team. They can provide detailed specifications and all necessary certifications.",
      timestamp: "10:35 AM",
      isAdmin: true
    },
    {
      id: 5,
      senderId: "john_doe",
      senderName: "John Doe",
      content: "That would be great! When can we schedule a call?",
      timestamp: "10:38 AM",
      isAdmin: false
    }
  ];

  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const getRoleBadge = (role: string) => {
    return role === "Client" 
      ? "bg-accent/20 text-accent border-accent/30"
      : "bg-primary/20 text-primary border-primary/30";
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chat Panel</h1>
          <p className="text-muted-foreground">
            Monitor and participate in conversations between users and vendors
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-success/20 text-success border-success/30">
            {chats.filter(chat => chat.unreadCount > 0).length} unread
          </Badge>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
        {/* Chat List */}
        <Card className="lg:col-span-4 bg-gradient-card border-card-border backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <MessageSquare className="h-5 w-5 text-accent" />
              Active Conversations
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                className="pl-10 bg-glass/50 border-glass-border backdrop-blur-sm"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-20rem)]">
              <div className="space-y-2 p-4">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={cn(
                      "p-4 rounded-lg cursor-pointer transition-all duration-300 border",
                      selectedChat === chat.id 
                        ? "bg-gradient-card border-accent/30 shadow-glow" 
                        : "bg-glass/30 hover:bg-glass/50 border-glass-border/50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
                          {chat.avatar}
                        </div>
                        {chat.isLocked && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-warning rounded-full flex items-center justify-center">
                            <Lock className="h-2 w-2 text-background" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground truncate">
                              {chat.participantName}
                            </p>
                            <Badge className={cn("text-xs", getRoleBadge(chat.participantRole))}>
                              {chat.participantRole}
                            </Badge>
                          </div>
                          {chat.unreadCount > 0 && (
                            <Badge className="bg-destructive text-destructive-foreground h-5 w-5 p-0 text-xs rounded-full flex items-center justify-center">
                              {chat.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate mb-1">
                          {chat.lastMessage}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{chat.timestamp}</span>
                          <code className="text-xs bg-glass/30 px-1 py-0.5 rounded text-accent">
                            {chat.orderId}
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-8 bg-gradient-card border-card-border backdrop-blur-md flex flex-col">
          {selectedChatData && (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b border-glass-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                      {selectedChatData.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-foreground">{selectedChatData.participantName}</CardTitle>
                        <Badge className={getRoleBadge(selectedChatData.participantRole)}>
                          {selectedChatData.participantRole}
                        </Badge>
                        {selectedChatData.isLocked ? (
                          <Lock className="h-4 w-4 text-warning" />
                        ) : (
                          <Unlock className="h-4 w-4 text-success" />
                        )}
                      </div>
                      <CardDescription>
                        Order {selectedChatData.orderId} • {selectedChatData.isLocked ? "Contacts locked" : "Contacts unlocked"}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="glass" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="glass" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="glass" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-popover/95 backdrop-blur-md border-glass-border">
                        <DropdownMenuLabel>Chat Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:bg-glass/50">
                          <Info className="h-4 w-4 mr-2" />
                          View Order Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-glass/50">
                          <Users className="h-4 w-4 mr-2" />
                          View Participants
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:bg-glass/50 text-warning">
                          <Lock className="h-4 w-4 mr-2" />
                          {selectedChatData.isLocked ? "Unlock Contacts" : "Lock Contacts"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[calc(100vh-24rem)] p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id}
                        className={cn(
                          "flex",
                          message.isAdmin ? "justify-end" : "justify-start"
                        )}
                      >
                        <div className={cn(
                          "max-w-xs lg:max-w-md px-4 py-3 rounded-lg",
                          message.isAdmin 
                            ? "bg-gradient-primary text-primary-foreground shadow-glow" 
                            : "bg-glass/50 border border-glass-border text-foreground"
                        )}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium opacity-90">
                              {message.senderName}
                            </span>
                            <span className="text-xs opacity-70">
                              {message.timestamp}
                            </span>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="border-t border-glass-border p-4">
                <div className="flex items-center gap-2">
                  <Button variant="glass" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder={selectedChatData.isLocked ? "Contacts are locked - unlock to enable messaging" : "Type your message..."}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      disabled={selectedChatData.isLocked}
                      className="bg-glass/50 border-glass-border backdrop-blur-sm pr-10"
                    />
                    <Button 
                      variant="glass" 
                      size="icon" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                    >
                      <Smile className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button 
                    variant="glow" 
                    onClick={handleSendMessage}
                    disabled={selectedChatData.isLocked || !newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                {selectedChatData.isLocked && (
                  <p className="text-xs text-warning mt-2 flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    Contact information is locked for this conversation
                  </p>
                )}
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Chat;