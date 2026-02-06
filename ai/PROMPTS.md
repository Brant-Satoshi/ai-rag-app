# Prompt Templates

## Template A (Plan Only)
You MUST NOT write code. Output:
1) changed files list
2) folder tree
3) responsibilities per file
4) verification steps

## Template B (Implement Day0 Only)
Output file-by-file full code for ONLY these:
- app/(chat)/chat/page.tsx
- app/(rag)/files/page.tsx
- app/(eval)/eval/page.tsx
- lib/types.ts
- lib/telemetry/requestId.ts
- lib/api/response.ts

Constraints:
- No extra features.
- Pages should be minimal but runnable.
- Must include standard response shape with requestId.
- End with: commands + checklist.

## Template C (Day-N Implementation Slice)
You MUST implement ONLY the requested day scope (e.g., Day1). Do not add extra features.

Output format:
1) Changed files list (exact paths)
2) Full code for each changed file (file-by-file)
3) Commands to run
4) Acceptance checklist (specific URLs/endpoints to verify)

Rules:
- Keep changes minimal and runnable.
- All API endpoints must use the standard response: { requestId, ok, data?, error? }.
- If adding an API route, include a small example request/response.
