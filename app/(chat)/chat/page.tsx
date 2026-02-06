'use client';

import { useState } from 'react';
import { Message } from '@/lib/types';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      createdAt: new Date().toISOString(),
      status: 'done',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content }),
      });

      const data = await res.json();

      if (data.ok && data.data) {
        const assistantMsg: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.data.reply,
          createdAt: new Date().toISOString(),
          status: 'done',
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error(data?.error?.message || 'Unknown error');
      }
    } catch (err) {
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `Error: ${err instanceof Error ? err.message : 'Failed to send message'}`,
        createdAt: new Date().toISOString(),
        status: 'error',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>

      <div className="border rounded-lg h-[500px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <p className="text-muted-foreground text-center">Send a message to start chatting</p>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white ml-auto max-w-[80%]'
                  : 'bg-black text-white mr-auto max-w-[80%]'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              {msg.status === 'error' && (
                <p className="text-red-500 text-xs mt-1">Error</p>
              )}
            </div>
          ))}
          {loading && (
            <div className="bg-black rounded-lg p-3 mr-auto max-w-[80%]">
              <p className="text-sm text-white">Thinking...</p>
            </div>
          )}
        </div>

        <div className="border-t p-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) sendMessage();
            }}
            placeholder="Type a message..."
            className="flex-1 border rounded-lg px-3 py-2"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
