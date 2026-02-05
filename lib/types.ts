// Message type for chat
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
  status: 'pending' | 'streaming' | 'complete' | 'error';
}

// Conversation type
export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

// FileDoc type for uploaded files
export interface FileDoc {
  id: string;
  name: string;
  type: string;
  size: number;
  status: 'pending' | 'processing' | 'indexed' | 'error';
  createdAt: Date;
}

// Chunk type for document chunks
export interface Chunk {
  id: string;
  fileId: string;
  idx: number;
  text: string;
  meta: {
    page?: number;
    start?: number;
    end?: number;
  };
}

// Citation type for RAG responses
export interface Citation {
  fileId: string;
  chunkId: string;
  page?: number;
  quote: string;
}
