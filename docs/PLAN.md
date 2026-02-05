# Day 0: Project Skeleton & Observability Setup

## Objective
Create a Next.js project skeleton with observability-ready infrastructure, extensible folder structure, and basic type definitions. Verify all routes render without errors.

## Key Results
- [ ] `pnpm dev` runs successfully
- [ ] Routes `/chat`, `/files`, `/eval` render without errors
- [ ] All type definitions are in place and imported by pages
- [ ] API response contract enforced with requestId

---

## Task Breakdown

### 1. Initialize Next.js Project
| Order | Task | Description |
|-------|------|-------------|
| 1.1 | Create project | Run `npx create-next-app@latest` with TypeScript, Tailwind, App Router |
| 1.2 | Configure pnpm | Replace npm with pnpm, verify lockfile |
| 1.3 | Add dependencies | Install shadcn/ui components, next-themes |

### 2. Create Folder Structure
| Order | Task | Description |
|-------|------|-------------|
| 2.1 | Create lib folders | `lib/llm/`, `lib/rag/`, `lib/db/`, `lib/telemetry/` |
| 2.2 | Create route groups | `app/(chat)/`, `app/(rag)/`, `app/(eval)/` |
| 2.3 | Create component folders | `components/ui/`, `components/chat/`, `components/rag/` |

### 3. Define TypeScript Types
| Order | Task | Type | Location |
|-------|------|------|----------|
| 3.1 | Message type | `{ id, role, content, createdAt, status }` | `types/index.ts` |
| 3.2 | Conversation type | `{ id, title, createdAt }` | `types/index.ts` |
| 3.3 | FileDoc type | `{ id, name, type, size, status, createdAt }` | `types/index.ts` |
| 3.4 | Chunk type | `{ id, fileId, idx, text, meta:{page?,start?,end?} }` | `types/index.ts` |
| 3.5 | Citation type | `{ fileId, chunkId, page?, quote }` | `types/index.ts` |

### 4. Implement API Response Contract
| Order | Task | Description |
|-------|------|-------------|
| 4.1 | Create response utility | `lib/api/response.ts` with `{ requestId, ok, data?, error? }` |
| 4.2 | Add requestId middleware | Extract/generate requestId for each API call |

### 5. Create Route Pages
| Order | Route | Description |
|-------|-------|-------------|
| 5.1 | `/chat` | `app/(chat)/chat/page.tsx` - Chat interface |
| 5.2 | `/files` | `app/(rag)/files/page.tsx` - File management |
| 5.3 | `/eval` | `app/(eval)/eval/page.tsx` - Evaluation interface |

### 6. Setup Observability
| Order | Task | Description |
|-------|------|-------------|
| 6.1 | Create telemetry lib | `lib/telemetry/index.ts` - Request tracking |
| 6.2 | Add requestId to responses | Ensure all API endpoints include requestId |

---

## Verification Commands
```bash
pnpm dev
# Visit: http://localhost:3000/chat
# Visit: http://localhost:3000/files
# Visit: http://localhost:3000/eval
```

---

## Blockers / Unknowns
- Need to confirm LLM provider (OpenAI, Anthropic, local?)
- Need to confirm database choice (PostgreSQL, SQLite, etc.)
