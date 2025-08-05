import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/queryClient";
import { Heart, User, Send, Loader2 } from "lucide-react";
import type { ConversationItem, ChatMessage } from "@/lib/types";

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("user2");
  const [newMessage, setNewMessage] = useState("");
  const queryClient = useQueryClient();

  const { data: conversations, isLoading: conversationsLoading } = useQuery<ConversationItem[]>({
    queryKey: ["/api/conversations/user1"],
  });

  const { data: messages, isLoading: messagesLoading } = useQuery<ChatMessage[]>({
    queryKey: ["/api/messages/user1", selectedConversation],
    enabled: !!selectedConversation,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: { senderId: string; recipientId: string; content: string }) => {
      const response = await apiRequest("POST", "/api/messages", messageData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages/user1", selectedConversation] });
      queryClient.invalidateQueries({ queryKey: ["/api/conversations/user1"] });
      setNewMessage("");
    },
  });

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    sendMessageMutation.mutate({
      senderId: "user1",
      recipientId: selectedConversation,
      content: newMessage
    });
  };

  const formatTime = (date: Date | string) => {
    const messageDate = new Date(date);
    return messageDate.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const selectedUser = conversations?.find(conv => conv.user.id === selectedConversation)?.user;

  // Fallback conversations if none are loaded
  const fallbackConversations = [
    {
      user: { id: "user2", firstName: "Emily", lastName: "Watson", userType: "donor" },
      lastMessage: { id: "1", content: "Thanks for the update...", timestamp: new Date() }
    },
    {
      user: { id: "user3", firstName: "Sarah", lastName: "Johnson", userType: "patient" },
      lastMessage: { id: "2", content: "When is the next...", timestamp: new Date() }
    },
    {
      user: { id: "user4", firstName: "James", lastName: "Rodriguez", userType: "donor" },
      lastMessage: { id: "3", content: "I'm available for...", timestamp: new Date() }
    }
  ];

  const displayConversations = conversations && conversations.length > 0 ? conversations : fallbackConversations;

  // Fallback messages if none are loaded
  const fallbackMessages = selectedConversation === "user2" ? [
    {
      id: "1",
      senderId: "user2",
      recipientId: "user1",
      content: "Hi! I received your match request. I'm available for donation next week. When would be convenient for you?",
      timestamp: new Date(Date.now() - 60000),
      isRead: true
    },
    {
      id: "2",
      senderId: "user1",
      recipientId: "user2",
      content: "Thank you so much! Tuesday afternoon would work perfectly for me. Should we meet at Apollo Hospital?",
      timestamp: new Date(Date.now() - 30000),
      isRead: true
    },
    {
      id: "3",
      senderId: "user2",
      recipientId: "user1",
      content: "Perfect! Apollo Hospital works great for me. I'll see you Tuesday at 2 PM. Please make sure to eat well and stay hydrated before coming.",
      timestamp: new Date(),
      isRead: false
    }
  ] : [];

  const displayMessages = messages && messages.length > 0 ? messages : fallbackMessages;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tighter mb-2">Messages</h2>
        <p className="text-gray-600 tracking-tighter">Communicate with your donors and patients</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 tracking-tighter mb-4">Conversations</h3>
              {conversationsLoading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-blood-primary" />
                </div>
              ) : (
                <div className="space-y-2">
                  {displayConversations.map((conversation) => (
                    <div
                      key={conversation.user.id}
                      onClick={() => setSelectedConversation(conversation.user.id)}
                      className={`p-3 rounded-lg border border-gray-200 hover:bg-blood-tertiary cursor-pointer transition-colors ${
                        selectedConversation === conversation.user.id ? "bg-blood-tertiary border-blood-primary" : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blood-tertiary rounded-full flex items-center justify-center mr-3">
                          {conversation.user.userType === "donor" ? (
                            <Heart className="text-blood-primary" size={16} />
                          ) : (
                            <User className="text-blood-primary" size={16} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 tracking-tighter truncate">
                            {conversation.user.firstName} {conversation.user.lastName}
                          </div>
                          <div className="text-sm text-gray-600 tracking-tighter truncate">
                            {conversation.lastMessage.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          {selectedConversation ? (
            <Card className="h-96 flex flex-col">
              {/* Chat Header */}
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blood-tertiary rounded-full flex items-center justify-center mr-3">
                    {selectedUser?.userType === "donor" ? (
                      <Heart className="text-blood-primary" size={20} />
                    ) : (
                      <User className="text-blood-primary" size={20} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 tracking-tighter">
                      {selectedUser ? `${selectedUser.firstName} ${selectedUser.lastName}` : "Dr. Emily Watson"}
                    </h3>
                    <p className="text-sm text-gray-600 tracking-tighter">
                      {selectedUser?.userType === "donor" ? "B+ Donor • Online" : "B+ Patient • Online"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messagesLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-blood-primary" />
                  </div>
                ) : (
                  displayMessages.map((message) => (
                    <div key={message.id} className={`flex items-start ${message.senderId === "user1" ? "justify-end" : ""}`}>
                      {message.senderId !== "user1" && (
                        <div className="w-8 h-8 bg-blood-tertiary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <Heart className="text-blood-primary" size={14} />
                        </div>
                      )}
                      
                      <div className={`p-3 max-w-md rounded-lg ${
                        message.senderId === "user1" 
                          ? "bg-blood-primary text-white" 
                          : "bg-white border border-gray-200"
                      }`}>
                        <p className="tracking-tighter">{message.content}</p>
                        <p className={`text-xs mt-2 tracking-tighter ${
                          message.senderId === "user1" ? "text-blood-tertiary" : "text-gray-500"
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>

                      {message.senderId === "user1" && (
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                          <User className="text-white" size={14} />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-4">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 tracking-tighter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || sendMessageMutation.isPending}
                    className="bg-blood-primary hover:bg-blood-primary/90 px-6"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blood-tertiary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Heart className="text-blood-primary" size={24} />
                </div>
                <p className="text-gray-500 tracking-tighter">Select a conversation to start messaging</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Communication Illustration */}
      <div className="mt-8 text-center">
        <div className="w-80 h-60 mx-auto bg-blood-neutral rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blood-primary rounded-full flex items-center justify-center">
                <User className="text-white" size={20} />
              </div>
              <div className="w-12 h-12 bg-blood-secondary rounded-full flex items-center justify-center">
                <Heart className="text-white" size={20} />
              </div>
            </div>
            <p className="text-blood-primary font-semibold tracking-tighter">Patient-Donor Communication</p>
            <p className="text-gray-600 text-sm tracking-tighter">Seamless messaging</p>
          </div>
        </div>
        <p className="text-gray-600 tracking-tighter mt-4">Seamless communication between patients and donors</p>
      </div>
    </div>
  );
}
