"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { useChat } from "@ai-sdk/react";

export default function AiAssistant() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: "/api/chat",
        onResponse: (response) => {
            console.log('Got response from AI:', response.status);
        },
        onError: (err) => {
            console.error('Assistant error:', err);
        },
        initialMessages: [
            {
                id: "1",
                role: "assistant",
                content: "Hello! I'm your Portfolio Living assistant. How can I help you today?",
            },
        ],
    });

    useEffect(() => {
        if (messages.length > 0) {
            console.log('Current message count:', messages.length);
        }
    }, [messages]);

    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in">
                    {/* Header */}
                    <div className="bg-gray-900 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-3">
                            <div className="bg-red-100 p-2 rounded-full">
                                <Bot size={20} className="text-red-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Portfolio Assistant</h3>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    Online
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="h-96 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "user"
                                        ? "bg-gray-900 text-white rounded-br-none"
                                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm"
                                        }`}
                                >
                                    <p>{msg.content}</p>
                                    {msg.createdAt && (
                                        <span className="text-[10px] opacity-50 mt-1 block">
                                            {new Date(msg.createdAt).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                        {messages.length > 0 && messages[messages.length - 1].role === 'user' && isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm flex gap-1 items-center">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                                </div>
                            </div>
                        )}
                        {messages.length > 0 && messages[messages.length - 1].role === 'assistant' && isLoading && (
                            // Still streaming...
                            null
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form
                        onSubmit={handleSubmit}
                        className="p-3 bg-white border-t border-gray-100 flex gap-2"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Ask me anything..."
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="bg-red-600 text-white p-2 rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative flex items-center justify-center w-14 h-14 bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 transition-all hover:scale-105 active:scale-95"
            >
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                {isOpen ? (
                    <X size={24} className="text-white" />
                ) : (
                    <MessageSquare size={24} className="text-white" />
                )}
            </button>
        </div>
    );
}
