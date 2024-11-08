"use client";

import { runGeminiAi } from "@/actions/geminiai";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/chat/ChatBubble";
import { ChatMessageList } from "@/components/chat/ChatMessageList";
import { currentUserDetails, UserDetails } from "@/actions/user";

import { Button } from "@/components/ui/button";
import React, { ChangeEvent, useRef } from "react";

// interface Message {
//   id: number;
//   message: string;
// }

function ChatPage() {
  const [message, setMessage] = React.useState<string>("");
  const [messages, setMessages] = React.useState<MessageType[]>([]);
  const [user, setUser] = React.useState<UserDetails>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const messagesRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    async function fetchUserDetails() {
      const response = await currentUserDetails();
      setUser(response);
    }
    fetchUserDetails();
  }, []);

  if (!user) return null;

  // const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim() === "") return;

    // Add user message to chat
    const userMessage: MessageType = {
      id: 1, // user id is 1
      message,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // clear input and show loading state
    setMessage("");
    setIsLoading(true);

    try {
      const botResponse = await runGeminiAi(message);
      const botMessage: MessageType = {
        id: 0, // bot id is 0
        message: botResponse ?? "No response",
      };

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

  // useEffect(() => {
  //   if (lastMessageRef.current) {
  //     lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages]);

  console.log(user);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Chat with AI Assistant</h1>
      <div className="chat-box mb-4 max-h-[600px] overflow-y-auto">
        <ChatMessageList ref={messagesRef}>
          {/* Messages */}
          {messages &&
            messages.map((message) => {
              return (
                <ChatBubble
                  key={message.id}
                  variant={message.id === 0 ? "received" : "sent"}
                >
                  <ChatBubbleAvatar
                    src={message.id === 0 ? "🤖" : user ? user?.imageUrl : "👤"}
                    fallback={message.id === 0 ? "🤖" : "👤"}
                  />
                  <ChatBubbleMessage>{message.message}</ChatBubbleMessage>
                </ChatBubble>
              );
            })}
          {/* Loading */}
          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar
                src={user ? user?.imageUrl : "👤"}
                fallback="🤖"
              />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
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
