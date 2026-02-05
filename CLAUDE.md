# Project Rules (Day0)

Goal: Implement Day0 skeleton only.
- Next.js App Router project.
- Create routes: /chat, /files, /eval
- Create folders: lib/llm, lib/rag, lib/db, lib/telemetry
- Define shared types: Message, Conversation, FileDoc, Chunk, Citation
- Standard API response shape must include requestId for ALL endpoints: { requestId, ok, data?, error? }

Constraints:
- Do NOT implement RAG/LLM logic yet.
- Do NOT add extra pages, auth, database migrations, or fancy UI.
- Keep changes minimal and runnable.

Output format whenever asked to implement:
1) List changed files
2) Provide file-by-file code
3) Provide commands to run + checklist to verify
