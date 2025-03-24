"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}
const PORTFOLIO_INFO = {
  name: "Shreejan Prajapati",
  title: "Frontend Developer",
  skills: "React, Next.js, TypeScript, Node.js, Tailwind CSS",
  experience: "2+ years of experience in web development",
  projects: "E-commerce platform, Portfolio website",
  contact: "newapasa7@gmail.com",
  availability: "Available for freelance projects and full-time opportunities",
};

const API_FORMAT = "gemini";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);
  useEffect(() => {
    if (isFirstVisit) {
      setTimeout(() => {
        setIsOpen(true);
        setTimeout(() => {
          const welcomeMessage: Message = {
            id: Date.now().toString(),
            role: "assistant",
            content: `👋 Hi there! I'm ${PORTFOLIO_INFO.name}'s portfolio assistant. How can I help you today?`,
          };
          setMessages([welcomeMessage]);
        }, 500);
      }, 2000);
    }
  }, [isFirstVisit]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const systemPrompt = `
You are an AI assistant for ${PORTFOLIO_INFO.name}'s portfolio website. 
You are helpful, professional, and concise.

ABOUT ME:
- Name: ${PORTFOLIO_INFO.name}
- Title: ${PORTFOLIO_INFO.title}
- Skills: ${PORTFOLIO_INFO.skills}
- Experience: ${PORTFOLIO_INFO.experience}
- Projects: ${PORTFOLIO_INFO.projects}
- Contact: ${PORTFOLIO_INFO.contact}
- Availability: ${PORTFOLIO_INFO.availability}

When responding:
1. Keep answers brief (1-3 sentences when possible)
2. Be friendly and professional
3. If asked about skills, projects, or contact info, use the information above
4. If asked something you don't know, suggest contacting directly
5. Don't make up information not provided above
`;
      const userPrompt = input;

      let requestBody = {};

      switch (API_FORMAT) {
        case "openai":
          requestBody = {
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            temperature: 0.7,
          };
          break;

        case "gemini":
          requestBody = {
            contents: [
              {
                parts: [{ text: systemPrompt }, { text: userPrompt }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
            },
          };
          break;

        case "anthropic":
          requestBody = {
            model: "claude-2",
            prompt: `${systemPrompt}\n\nHuman: ${userPrompt}\n\nAssistant:`,
            temperature: 0.7,
          };
          break;

        case "basic":
        default:
          requestBody = {
            prompt: `${systemPrompt}\n\nUser: ${userPrompt}`,
            temperature: 0.7,
          };
      }

      console.log("API Format:", API_FORMAT);
      console.log("Request Body:", JSON.stringify(requestBody));

      const response = await fetch(`${process.env.NEXT_PUBLIC_SECRET_API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      let assistantContent = "";

      try {
        if (data.choices && data.choices[0]?.message?.content) {
          assistantContent = data.choices[0].message.content;
        } else if (data.candidates && data.candidates[0]?.content) {
          if (typeof data.candidates[0].content === "string") {
            assistantContent = data.candidates[0].content;
          } else if (
            data.candidates[0].content.parts &&
            Array.isArray(data.candidates[0].content.parts)
          ) {
            assistantContent = data.candidates[0].content.parts
              .map((part) =>
                typeof part.text === "string" ? part.text : JSON.stringify(part)
              )
              .join(" ");
          } else {
            assistantContent = JSON.stringify(data.candidates[0].content);
          }
        } else if (data.candidates && data.candidates[0]?.message?.content) {
          if (typeof data.candidates[0].message.content === "string") {
            assistantContent = data.candidates[0].message.content;
          } else if (typeof data.candidates[0].message.content === "object") {
            assistantContent = JSON.stringify(
              data.candidates[0].message.content
            );
          }
        } else if (data.content) {
          assistantContent =
            typeof data.content === "string"
              ? data.content
              : JSON.stringify(data.content);
        } else if (data.response) {
          assistantContent =
            typeof data.response === "string"
              ? data.response
              : JSON.stringify(data.response);
        } else if (data.text) {
          assistantContent =
            typeof data.text === "string"
              ? data.text
              : JSON.stringify(data.text);
        } else if (data.completion) {
          assistantContent =
            typeof data.completion === "string"
              ? data.completion
              : JSON.stringify(data.completion);
        } else if (typeof data === "string") {
          assistantContent = data;
        } else {
          assistantContent =
            "I received your message. Here's what I know: " +
            JSON.stringify(data).substring(0, 150) +
            "...";
        }
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        assistantContent =
          "I received your message but couldn't parse the response properly.";
      }

      if (typeof assistantContent !== "string") {
        assistantContent = JSON.stringify(assistantContent);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          assistantContent ||
          "I received your message but couldn't generate a proper response.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I'm sorry, I couldn't process your request right now. Please try again later or contact me directly.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-green-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label="Chat with portfolio assistant"
      >
        <span className="absolute inset-0.5 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/40 transition-all duration-300">
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </span>

        {/* Notification dot for first visit */}
        {!isOpen && isFirstVisit && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-black"></span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 h-[450px] rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Glass panel */}
          <div className="relative h-full flex flex-col bg-black/40 backdrop-blur-lg border border-white/10 shadow-xl">
            {/* Chat header */}
            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-blue-500/20 to-green-600/20">
              <h3 className="text-lg font-semibold text-white">
                Portfolio Assistant
              </h3>
              <p className="text-sm text-white/70">
                Ask me anything about {PORTFOLIO_INFO.name}
              </p>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-green-600 text-white"
                        : "bg-white/10 backdrop-blur-sm border border-white/10 text-white"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/10">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-white/70 animate-bounce"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-white/70 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-white/70 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-white/10"
            >
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full px-4 py-2 pr-10 rounded-full bg-white/10 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-600 flex items-center justify-center"
                  disabled={!input.trim() || isTyping}
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
