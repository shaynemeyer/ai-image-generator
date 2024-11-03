"use client";

import { runGeminiAi } from "@/actions/geminiai";
import { Button } from "@/components/ui/button";
import React, { ChangeEvent, useEffect, useRef } from "react";
import { ChatFeed, Message as ChatMessage } from "react-chat-ui";

// interface Message {
//   id: number;
//   message: string;
// }

function ChatPage() {
  const [message, setMessage] = React.useState<string>("");
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // create a last ref for the last message container
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim() === "") return;

    // Add user message to chat
    const userMessage = new ChatMessage({
      id: 1, // user id is 1
      message,
    });

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // clear input and show loading state
    setMessage("");
    setIsLoading(true);

    try {
      const botResponse = await runGeminiAi(message);
      const botMessage = new ChatMessage({
        id: 0, // bot id is 0
        message: botResponse ?? "No response",
      });

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error running Gemini AI: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Chat with AI Assistant</h1>
      <div className="chat-box mb-4 max-h-96 overflow-y-auto">
        <ChatFeed
          messages={messages}
          isTyping={isLoading}
          showSenderName={false}
          hasInputField={false}
          bubblesCentered={false}
        />
        <div ref={lastMessageRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          className="flex-1"
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Ask a question..."
        />
        <Button type="submit" disabled={isLoading}>
          Send
        </Button>
      </form>
    </div>
  );
}
export default ChatPage;
