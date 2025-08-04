import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { Bot, User, Send, Phone, Hospital } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "ai" | "user";
  content: string;
  timestamp: Date;
}

export default function ChatAI() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "ai",
      content: "Hello! I'm your AI medical assistant. I can help you with questions about thalassemia, blood donation, and general health guidance. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/ai-chat", { message });
      return response.json();
    },
    onSuccess: (data) => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "ai",
          content: data.response,
          timestamp: new Date()
        }
      ]);
    },
  });

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    sendMessageMutation.mutate(inputMessage);
    setInputMessage("");
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tighter mb-2">AI Medical Assistant</h2>
        <p className="text-gray-600 tracking-tighter">Get instant answers to your thalassemia-related questions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-96 flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex items-start ${message.sender === "user" ? "justify-end" : ""}`}>
                  {message.sender === "ai" && (
                    <div className="w-8 h-8 bg-blood-primary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <Bot className="text-white" size={16} />
                    </div>
                  )}
                  
                  <div className={`p-3 max-w-md rounded-lg ${
                    message.sender === "ai" 
                      ? "bg-white border border-gray-200" 
                      : "bg-blood-primary text-white"
                  }`}>
                    <p className="tracking-tighter whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-2 tracking-tighter ${
                      message.sender === "ai" ? "text-gray-500" : "text-blood-tertiary"
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>

                  {message.sender === "user" && (
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                      <User className="text-white" size={16} />
                    </div>
                  )}
                </div>
              ))}
              
              {sendMessageMutation.isPending && (
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blood-primary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Bot className="text-white" size={16} />
                  </div>
                  <div className="bg-white border border-gray-200 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-4">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about thalassemia or blood donation..."
                  className="flex-1 h-12 resize-none tracking-tighter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || sendMessageMutation.isPending}
                  className="bg-blood-primary hover:bg-blood-primary/90 px-6"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-gray-900 tracking-tighter mb-4">Quick Questions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleQuickQuestion("What is thalassemia?")}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-blood-tertiary hover:border-blood-primary transition-colors tracking-tighter text-sm"
                >
                  What is thalassemia?
                </button>
                <button
                  onClick={() => handleQuickQuestion("What are the blood donation eligibility criteria?")}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-blood-tertiary hover:border-blood-primary transition-colors tracking-tighter text-sm"
                >
                  Blood donation eligibility
                </button>
                <button
                  onClick={() => handleQuickQuestion("How to manage side effects of blood transfusion?")}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-blood-tertiary hover:border-blood-primary transition-colors tracking-tighter text-sm"
                >
                  Managing side effects
                </button>
                <button
                  onClick={() => handleQuickQuestion("What diet is recommended for thalassemia patients?")}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-blood-tertiary hover:border-blood-primary transition-colors tracking-tighter text-sm"
                >
                  Diet recommendations
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-gray-900 tracking-tighter mb-4">Emergency Contacts</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="text-blood-primary mr-3" size={16} />
                  <div>
                    <div className="font-medium text-gray-900 tracking-tighter">Emergency Line</div>
                    <div className="text-sm text-gray-600 tracking-tighter">108</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Hospital className="text-blood-primary mr-3" size={16} />
                  <div>
                    <div className="font-medium text-gray-900 tracking-tighter">Blood Bank</div>
                    <div className="text-sm text-gray-600 tracking-tighter">+91 80 2227 4444</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical AI Illustration */}
          <div className="text-center">
            <div className="w-full h-48 bg-blood-neutral rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blood-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Bot className="text-white" size={24} />
                </div>
                <p className="text-blood-primary font-semibold tracking-tighter">AI Medical Assistant</p>
                <p className="text-gray-600 text-sm tracking-tighter">24/7 healthcare support</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 tracking-tighter mt-2">24/7 AI medical support</p>
          </div>
        </div>
      </div>
    </div>
  );
}
