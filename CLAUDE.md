# Working in this repo

## Keep sessions lean (reduces token usage)

- **Start a new session per distinct task** (e.g. "bind Counsellors API", "merge master into integration") rather than one long-running thread. Conversation history is resent in full on every turn, so long sessions get expensive fast — this matters far more than anything below.
- **End the current session at natural checkpoints** instead of continuing into the next task in the same thread. A checkpoint is any point where the working tree is clean or committed and verified, e.g.:
  - Right after a `git merge`/`git rebase` is resolved, typechecked, and committed.
  - Right after a feature/API binding is verified end-to-end (typecheck + a manual smoke test) and committed.
  - Right after a review or investigation question is answered, if no code changed.
  Starting fresh at these points means the next session begins with a small, relevant prompt instead of re-sending this entire history.
- Prefer targeted reads (`grep`, `sed -n`, `Read` with `offset`/`limit`) over full-file reads for anything over ~200 lines.
- Pipe verbose command output through `--short` / `-q` / `head` / `grep`. In particular, never dump full `git merge`/`git status`/`git log` output that includes `dist/` — it's build output, always untracked (see `.gitignore`), and merge conflicts there should be resolved with `git rm -rf --cached dist && rm -rf dist`, not read line-by-line.
- Don't re-read a file immediately after editing it — a successful `Edit`/`Write` call already confirms the change landed.
- Batch independent tool calls in parallel instead of sequential round-trips.

## Backend integration context

- **Do NOT change the existing UI design when integrating.** Integration means swapping mock/static data for real API data **only** — the UI must look and behave exactly as before. Keep all markup, layout, styling, component structure, labels, copy, and interactions unchanged; the *only* difference after integration is where the data comes from. If real integration seems to require a visual change, stop and ask first rather than redesigning.
- Backend API reference: `docs/api-list.md` — check its "Last updated" line before assuming an endpoint exists; it can lag behind the actual backend by a commit or two.
- The frontend integrates against a separate backend repo (`PWC-backend`). Real endpoints get bound module-by-module; anything not yet in `docs/api-list.md` stays on mock services in `src/mocks/` / `src/services/*.service.ts`.
- `master` and `integration` diverge on the Projects feature: `master` has an unmerged mock-only soft-delete/restore/draft/completed status model for Projects that doesn't match the real backend (`ProjectStatus` is just `ACTIVE`/`CLOSED`, no soft-delete, no restore endpoint). Expect this to conflict on every merge until it's resolved at the source (see conversation history / ask the backend dev) — resolve in favor of the real-API version on `integration`, not master's mock UI.
