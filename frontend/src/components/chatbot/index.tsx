"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/hooks/api";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatBotContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Import & Export Web Portal Assistant AI. How can I help you manage products, shipments, suppliers, or orders today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const { mutate: sendToAI, isPending } = useMutation({
    mutationFn: async (input: string) => {
      const chatMessages = messages.map((m) => ({
        role: m.sender === "bot" ? "ASSISTANT" : "USER",
        content: m.text,
      }));

      // Call your Express AI backend
      const response = await api.post("/chatbot", {
        messages: chatMessages,
        message: input,
      });

      console.log({ data: response.data });
      return response.data;
    },
    onSuccess: (res: any) => {
      const botMessage: Message = {
        id: Date.now(),
        text: res.reply,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    },
  });

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    sendToAI(inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50 border-white border-2"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
        <span className="sr-only">Toggle chat</span>
      </Button>

      {isOpen && (
        <Card className="overflow-hidden fixed pt-0 bottom-24 right-6 w-[380px] h-[500px] shadow-2xl z-50 flex flex-col border-zinc-700 bg-zinc-900">
          <CardHeader className="border-b border-zinc-700 pt-4 bg-zinc-800 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg text-white">
                    Import & Export Assistant
                  </CardTitle>
                  <p className="text-xs text-zinc-400">
                    AI operations helper
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.sender === "bot" && (
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-zinc-700 flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[75%] rounded-lg px-4 py-2",
                    message.sender === "user"
                      ? "bg-primary text-white"
                      : "bg-zinc-700 text-zinc-100"
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className="mt-1 text-xs opacity-50">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {message.sender === "user" && (
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-zinc-700 flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isPending && (
              <p className="text-sm text-zinc-400 italic text-left">
                AI is thinking...
              </p>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <CardFooter className="border-t border-zinc-700 p-4 bg-zinc-800">
            <div className="flex w-full gap-2">
              <Input
                placeholder="Ask about products, shipments, or orders..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isPending}
                className="flex-1 py-6 bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400 focus-visible:ring-zinc-500"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                disabled={isPending}
                className="py-6 px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
