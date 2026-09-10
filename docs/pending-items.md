# Pending Items — Frontend

Working list of everything still unfinished in the frontend, grouped by the user role that
sees it. Each item names the exact file(s) and, where one exists, the backend endpoint that
should replace the mock. Tick items off as they land.

- Branch: `integration`
- Last updated: 2026-09-10 (product decisions applied on the remaining open items — see note below)
- Backend reference: `docs/api-list.md` — **this file does not exist in the repo.** Drop this
  reference; whatever it once was, it isn't checked in. `docs/frontend-integration-guide.md` is
  the closest thing to a live backend reference now.

**2026-09-08 re-audit note:** most items below had drifted from reality — several marked ☐
(open) turned out to already be fully bound to real endpoints, most notably almost all of
**Counsellor (§3)** and **Student/Parent (§4)**, which this doc's "parked" note (below) had
written off as still mock. Verify against source before trusting any single line here; this
doc has a track record of lagging the actual code by several sessions.

**Current focus: Super Admin (§1) and App Admin (§2)** — this is now stale as a scoping
statement: §3/§4 are mostly done already (see below), not parked.

Priority: **P1** = the page is visibly broken/empty or writes silently go nowhere ·
**P2** = works, but on mock data · **P3** = cleanup / dead code.

---

## 1. Super Admin

Nav surface: Dashboard · Tenant Management · Career Library · Settings.

| # | Status | P | Item |
|---|---|---|---|
| SA-1 | ✅ | P1 | ~~**Dashboard is empty.**~~ Bound to `GET /career-library/requests` (all statuses, so the "& Recent" half of the card title is real too). `SuperAdminDashboard` renders a page header and a "Pending & Recent Requests" table seeded from a local `useState([])` that is never filled, so it always shows "No pending requests found." Bind it to `GET /career-library/requests?status=PENDING`. `src/pages/dashboard/SuperAdminDashboard.tsx` |
| SA-2 | ✅ | P1 | ~~**Approve/reject does nothing server-side.**~~ Both now go through a single `reviewMutation` hitting `POST /career-library/requests/{id}/approve` / `.../reject`, invalidate the list, and surface API errors instead of always reporting success. `src/pages/dashboard/SuperAdminDashboard.tsx` |
| SA-3 | ✅ | P1 | ~~**Ratification service is mock-only.**~~ `ratificationsDb` and `mockPendingRatifications` are gone; `getRatificationRequests` / `getPendingRatifications` / `ratify` / `rejectRatification` call the real endpoints and map onto `PendingRatification`. Requester names are resolved from `GET /counsellors` (the request row only carries `requestedById`), failing soft to `—`. Was: `careerService.getPendingRatifications` / `ratify` / `rejectRatification` operate on an in-memory `ratificationsDb` seeded from `mockPendingRatifications`. The comment above them ("no backend endpoint exists yet") is stale — the endpoints are documented in `docs/api-list.md` → "Ratification requests". `src/services/career.service.ts:441,678-699` |
| SA-4 | ✅ | P2 | ~~**`PendingRatificationsPage` is orphaned.**~~ Product decision: not needed — the `SuperAdminDashboard` table is the only ratification-review surface. Deleted `src/pages/career-library/PendingRatifications/` and its barrel export in `src/pages/career-library/index.ts`. |
| SA-5 | ✅ | P2 | ~~**`dashboardService.getSummary` is mock.**~~ It was a 300 ms artificial delay gating the whole page while rendering nothing. Call removed and `src/services/dashboard.service.ts` deleted. If the dashboard later wants real counts, build them from `GET /projects` / `GET /students` / `GET /career-library/requests`. |
| SA-10 | ✅ | P1 | ~~**Approving a request does not create the library entry.**~~ Already fixed by the time this was picked up: `SuperAdminDashboard` opens the real `JobRoleFormModal` (`entityKind="proposal"`) instead of the dead `JobRoleApprovalModal`, which PATCHes `/career-library/proposals/{id}` with real taxonomy-backed fields and then `ratify()` POSTs `/career-library/proposals/{id}/approve`, which the backend promotes straight into a real `CareerLibraryEntry` from the proposal's own data. `JobRoleApprovalModal.tsx`/`.styles.ts` (hardcoded cluster/industry/domain defaults, never wired to `onApprove`) were dead code — only self-referenced in the barrel export — and have been deleted. `src/pages/dashboard/SuperAdminDashboard.tsx` |
| SA-6 | ☐ | P2 | **Tenant Management: only the kREATE tab works.** The "Institution" and "Counselor" category tabs are `disabled: true, comingSoon: true`. The kREATE tab is fully bound to `/admins`. Confirm whether the other two are in scope; if yes, they need their own backing lists. `src/pages/tenant-management/TenantManagementPage.tsx:235-251` |
| SA-7 | ✅ | P2 | ~~**Career library: education path is unbound.**~~ Bound against the live routes: `GET /career-library/education?domainId=` fills the tick-list, `?search=` backs a typeahead over the global library, `POST /career-library/education` creates a new row (APPROVED at once for an admin), and the ticked ids go out as `educationEntries` on the entry's create/update. New roles start with the domain's whole path ticked; an edit re-seeds from `linkedEducationEntries` and merges in any entry linked from outside the domain. `src/pages/career-library/components/JobRoleFormModal.tsx` |
| SA-11 | ✅ | P2 | ~~**The free-text qualification fields still sit under the same Education Path heading.**~~ Removed from the form. Since `qualification10th12th` is still NOT NULL on the backend and the career detail's Education Path tab renders these columns, a **new** role now derives them from the ticked path: programmes join into the recommended-subjects line, their descriptions into the explanation/defined-pathway note. Creating without a ticked 10+2 entry is blocked client-side with a clear message rather than a raw 400. |
| SA-12 | ✅ | P2 | ~~**Editing a role's education ticks no longer updates its free-text qualification columns.**~~ Fixed as suggested: `EducationPathTab` now renders `linkedEducationEntries` (grouped by level: 10+2 / Graduate / Post-Graduate / two certification levels) when the role has structured entries, falling back to the legacy free-text columns only for older roles that don't. Threaded `linkedEducationEntries` from `careerService.getById` through `JobRoleDetailView` in both `CareerList.tsx` and `SimpleView.tsx`. `src/pages/career-library/tabs/EducationPathTab.tsx` |
| SA-13 | ✅ | P2 | ~~**Education entries can be added but not corrected, removed or reviewed.**~~ "Corrected" was already fixed before this pass (`updateEducationEntry` PATCH is wired into `JobRoleFormModal`). Product decision: no approve/reject review queue needed — Super Admin edits education entries directly. The tick-list wording in `JobRoleFormModal`'s Education Path section was relabeled from generic tick/untick to explicit **Delete** / **No Delete** per row, since unticking removes the entry from what's included with the role. |
| CC-4 | ✅ | P2 | ~~**`docs/api-list.md` is stale on the education path.**~~ Moot — `docs/api-list.md` doesn't exist in this repo at all (confirmed by `ls`), so there's nothing to refresh. The frontend already calls the current route (`/career-library/education`, `src/services/career.service.ts:894,915,929`), never the old `/career-taxonomy/domains/{id}/education` path this item warned about. |
| SA-8 | ✅ | P3 | ~~**Career taxonomy restore is unbound.**~~ Added `restoreCluster` / `restoreIndustry` / `restoreDomain` to `career.service.ts` (`POST /career-taxonomy/{level}/{id}/restore`). `CareerListPage` now shows an inline "Undo" banner right after a cluster/industry/domain delete succeeds, calling the matching restore and invalidating the taxonomy caches — a mistaken delete is recoverable from the UI without a separate "view deleted" screen. `src/pages/career-library/CareerList/CareerList.tsx` |
| SA-9 | ✅ | P3 | ~~**`settings.service.ts` is dead mock code.**~~ Already gone by the time this was picked up — `src/services/settings.service.ts` and `src/mocks/settings.mock.ts` no longer exist in the tree. |

## 2. App Admin

Nav surface: Projects · Counselors List · Career Library · Settings.
Bound and working: project creation wizard (institute → project → classes/divisions → students →
counsellor assignment → slot import), project list/edit/delete/restore, counsellor CRUD + bulk
upload, career library entry CRUD + taxonomy CRUD, project students list, project sessions list.

| # | Status | P | Item |
|---|---|---|---|
| AA-1 | ✅ | P1 | ~~**Project dashboard header reads from mock data.**~~ Now `projectService.getById` via a `['project', projectId]` query. Institute name, status pill and the period line come from the API (the period was hardcoded `01 Aug, 2026 – 31 Oct, 2026`), and `EditProjectModal` invalidates the new key so the banner follows an edit. `src/pages/projects/ProjectDashboardPage/ProjectDashboardPage.tsx` |
| AA-1b | ✅ | P1 | ~~**Close/Delete Project on the dashboard did nothing server-side.**~~ Found while doing AA-1: `handleConfirmClose` only set local state and `handleConfirmDelete` only navigated — both fired a success toast regardless. Now `PATCH /projects/{id}` (`status: CLOSED`) and `DELETE /projects/{id}` (soft-delete), with cache invalidation and real error toasts. |
| AA-2 | ✅ | P1 | ~~**Add/edit student does not persist.**~~ `updateProjectStudent` (in-memory `studentsDb`) is replaced by `saveProjectStudent`: no `id` → `POST /students`, otherwise `PATCH /students/{id}`. The modal's Class/Division names are resolved find-or-create against the project's institute (`GET`/`POST /institutes/{id}/classes[/divisions]`), and only re-sent when they actually changed, so placeholder values can't mint stray divisions. `studentCode` is omitted so the backend generates it. `getProjectStudents` now also returns the real `className`/`division`/`parentEmail` the modal was previously guessing from `grade`. `src/services/project.service.ts` |
| AA-2b | ✅ | P2 | ~~**"Add Student" opened with the title "Edit Student".**~~ Both pages seeded a new row with `id: \`std-new-${Date.now()}\``, and the shared modal picks its title off `student?.id`. New rows now carry `id: ''`, which also tells the service to POST. |
| AA-3 | — | — | **Re-scoped.** The original entry said `updateCounselorSession` backed `ModifySessionModal` — wrong on both counts: neither was referenced anywhere, and the page's real problem was that its entire schedule table was hardcoded local state. Both dead files are deleted. Split into AA-3a…AA-3f below. |
| AA-3a | ✅ | P1 | ~~**The whole schedule table was hardcoded.**~~ `counselorSlotsMap` (four counsellors' slots, students, dates and notes as literals), `counselorCodes` and the `customSessions` local override are gone. `getProjectSessions` now builds each counsellor's rows from `GET /sessions/slots?projectId` joined to `GET /sessions?projectId` via the slot's `sessionId`, seeded from `GET /counsellors?projectId` so an assigned counsellor with no availability yet still gets a card. A session booked outside the slot inventory (admin `POST /sessions`) gets its own row. `isMissed` comes from the backend's lazily-reconciled `studentNoShow`. |
| AA-3b | ✅ | P1 | ~~**Assign Student to a slot wrote to local state.**~~ Now `POST /sessions` (admin manual booking) with the counsellor of the clicked slot and its raw date/time. The modal's student dropdown was eight hardcoded names with hardcoded mobiles; it now lists the project's own students and carries the real student id. |
| AA-3c | ✅ | P1 | ~~**Reschedule wrote to local state.**~~ Now `POST /sessions/{id}/reschedule` with `initiatedBy: ADMIN`, using the session behind the slot; a row with no booking is refused instead of silently "rescheduling" nothing. |
| AA-3d | ✅ | P1 | ~~**Remove Counselor only filtered a local array.**~~ Now `DELETE /counsellors/{id}/projects/{projectId}`. |
| AA-3e | ✅ | P2 | ~~**"Copy meet link" fabricates a URL.**~~ Product decision: use the counsellor's own `meetingLink` (already captured per counsellor in Counselors List → Add/Edit Counselor) instead of a session-level link. Threaded `meetingLink` through `ApiCounsellorDir` → `CounselorSession.counselorMeetingLink` in `project.service.ts`/`project.types.ts`; `handleCopyMeetLink` now copies that real link, or shows "No Meet Link" pointing the admin at Counselors List when none is set. `src/pages/projects/ProjectSessionsPage/ProjectSessionsPage.tsx` |
| AA-3f | ☐ | P2 | **"Add Counselors" can only assign counsellors that already exist.** AA-3d/AA-4 made the matched path real (`POST /counsellors/{id}/projects`), but a row that isn't in the directory is reported as unassignable rather than created — `POST /counsellors` needs an `instituteId` and a temp-password flow the modal doesn't have. Decide whether this screen should create counsellors or only assign existing ones. |
| AA-4 | ✅ | P2 | ~~**Counsellor match check uses mock emails.**~~ Done as a prerequisite for AA-3f: `validateCounselors` now matches against `getCounsellorDirectory()` (`GET /counsellors`) and carries the matched `directoryId` and `counsellorCode` through, which is what the project-assignment endpoint needs. |
| AA-5 | ✅ | P2 | ~~**Reports page is still mock.**~~ Rewired to real data: project selector uses the real project list, the table is built from `projectService.getProjectStudents()`, and "Recommended Pathway"/"Report Status" come from `reportsService.getStudentAssessmentReport()` (fetched only for students who've finished Session 2, since the backend 404s until then). Metric tiles are computed from the real data instead of hardcoded numbers. Still no sidebar/nav entry pointing at the page — `ROUTES.REPORTS` is reachable by URL only. `src/pages/reports/ReportsPage.tsx` |
| AA-6 | ✅ | P2 | ~~**`proj-001` fallbacks.**~~ Cleared on all three project pages — every query is now `enabled: Boolean(projectId)`. |
| AA-9 | ✅ | P2 | ~~**Project banner still shows two hardcoded values.**~~ Product decision: show the project's own `code` (already returned by `GET /projects/{id}`) instead of an institute code. The badge only renders when `project.code` is present, and the location line now hides itself (rather than falling back to `'Mumbai, Maharashtra'`) when the project has no address. `src/pages/projects/ProjectDashboardPage/ProjectDashboardPage.tsx` |
| AA-7 | ✅ | P3 | ~~**`AdminDashboard` is dead code.**~~ `AdminDashboard.tsx` and the three widget `.tsx` files were already gone; their orphaned `.styles.ts` files (`AdminDashboard.styles.ts`, `ProjectStudentStatsWidget.styles.ts`, `ProjectCounselorStatsWidget.styles.ts`, `DataPurgingLogWidget.styles.ts`) and the now-unreferenced `src/mocks/dashboard.mock.ts` (`DASHBOARD_MOCKS`) have been deleted. |
| AA-11 | ✅ | P1 | ~~**The four overview metric cards on the project dashboard are hardcoded.**~~ Counsellors and Total Students now read the project's `_count` (`counselorCount` / `studentCount`); Total Days and Remaining Days are computed from `validFrom`/`validTo`, pinned to UTC midnight so no day is gained or lost to the local timezone, and render `—` when the window is missing or inverted. Saving a student also invalidates `['project', projectId]` so the student card follows. |
| AA-12 | ✅ | P2 | ~~**The Add/Edit Student form has no Parent Email field.**~~ `EditStudentModal.tsx:233-237` now has a "Parent Email Address" input bound to `formData.parentEmail` with its own validation (lines 111-112). A real address can be entered. |
| AA-13 | ✅ | P2 | ~~**The modal's Email field can't be saved on edit.**~~ Product decision: keep it read-only on edit rather than wait on a backend endpoint. `EditStudentModal.tsx`'s Email input is now `disabled`/`readOnly` with a hint ("Login email cannot be changed here") when editing an existing student; still a normal required field when adding a new one. Removed the dead "send welcome email on change" checkbox/notice that never actually sent anything. |
| AA-14 | ☐ | P3 | **The student-view modal on the sessions page no longer fabricates data**, but counsellor cards show a blank phone for anyone not in `GET /counsellors?projectId`. Minor; verify once real counsellors exist in the dev DB. |
| AA-10 | ✅ | P3 | ~~**`projects.mock.ts` / `projectStudents.mock.ts` / `counselors.mock.ts` unused.**~~ Already gone by the time this was picked up — none exist in `src/mocks/` any more. |
| AA-8 | ✅ | P3 | ~~**`AddToExistingJobRoleModal` is unreferenced.**~~ Confirmed obsolete (only self-referenced in its own file and the barrel export) and deleted, along with its barrel export in `src/pages/dashboard/components/index.ts`. |

## 3. Counsellor

Was marked "parked" as of 2026-08-30; the 2026-09-08 re-audit found almost all of it already
bound to real endpoints. No longer parked — CO-6 is the only real gap left.

| # | Status | P | Item |
|---|---|---|---|
| CO-1 | ✅ | P1 | ~~**Counsellor Form Chart runs entirely on `studentFormChart.mock.ts`.**~~ `StudentFormChartPage.tsx` and its ~12 step components call `counsellorChartService.getChart/saveChart/amendMirrorPair/revertMirrorPairAmendment` — real `GET/PUT /counsellor-chart/students/{id}` plus the mirror-pair amendment endpoints (`src/services/counsellorChart.service.ts:29-50`). `studentFormChart.mock.ts` still exists but now holds only TypeScript interfaces (18 `export interface`s, no data), imported purely for types. |
| CO-2 | ✅ | P1 | ~~**Student Ikigai / assessment report runs on `studentIkigaiReport.mock.ts`.**~~ `studentIkigaiReport.mock.ts` doesn't exist any more. `StudentCareerIkigaiReportPage` and all 7 section components call real `reportsService`/`counsellorChartService`/`sessionsService`, backed by `GET /reports/students/{id}/assessment`. |
| CO-3 | ✅ | P1 | ~~**Upcoming Sessions and All Sessions use `getMockUpcomingSessions`.**~~ That function no longer exists anywhere in the repo (zero grep hits). |
| CO-4 | ✅ | P2 | ~~**`studentService.getStudentsByCounselor` / `getPreCounsellingForm` return module-level mock arrays.**~~ Neither function name exists anywhere in `src` any more — refactored away. |
| CO-5 | ✅ | P2 | ~~**`CounselorDashboard.tsx` is dead code.**~~ The file has been deleted outright, not just left unrouted. |
| CO-6 | ➖ | — | ~~Counsellor satisfaction score is not surfaced anywhere.~~ **Descoped** (2026-09-10 product decision) — not needed. Backend endpoints (`GET /feedback/counsellors/{id}/score`, `GET /feedback/students/{id}/score`) remain unused by design. |
| CO-7 | ☐(backend) | P2 | **Frontend is fully wired; the backend endpoint is the only gap.** `StudentCareerIkigaiReportPage.tsx:115-119,249` calls `acceptReportMutation` → `reportsService.acceptReport(studentId)` → `POST /reports/students/{id}/accept` (`src/services/reports.service.ts:208-210`), and the accepted state is meant to persist via an acceptance field on the GET response. The service's own comment (lines 205-208) confirms the backend route doesn't exist yet, so the accepted state still only lives in local component state and resets on reload. This is a backend ticket now, not frontend work. |

## 4. Student / Parent

Was marked "parked"; both items here are resolved now that CO-2 landed.

| # | Status | P | Item |
|---|---|---|---|
| ST-1 | ✅ | P2 | ~~**`StudentPortalPage` navigates to the report with a hardcoded `'sess-counselor-1'` session id.**~~ Gone — navigation now uses `ROUTES.GENERATE_REPORT.replace(':sessionId', session1?.id ?? '')` with `session1` resolved from the student's real session data (`StudentPortalPage.tsx:114,705,716`). |
| ST-2 | ✅ | P2 | ~~**Report view for students depends on CO-2 landing first.**~~ CO-2 landed. There's no separate student-facing report page — `/counselor/report/:sessionId` (`GENERATE_REPORT`, `src/app/routes.tsx:194`) routes to the same real `StudentCareerIkigaiReportPage`, on real data regardless of which role reaches it. |

## 5. Cross-cutting

| # | Status | P | Item |
|---|---|---|---|
| CC-1 | ✅ | P3 | ~~`CLAUDE.md` still says the Projects soft-delete/restore model is a mock-only `master` invention that must be resolved against `integration`.~~ Stale paragraph removed from `CLAUDE.md` — the backend already has `DELETE /projects/{id}` (soft-delete) and `PATCH /projects/{id}/restore`, both bound in `project.service.ts:190,194`. |
| CC-2 | ✅ | P3 | ~~**Stale comment claiming the career library is read-only with no ratification endpoints.**~~ Gone — the comment near `career.service.ts:656-663` now correctly describes the real proposal/ratification flow (`/career-library/proposals`, renamed from `/career-library/requests`), and calls out that it's `docs/api-list.md` that's stale on the naming, not the frontend. |
| CC-3 | ☐ | P3 | `/cohorts` is now bound (`src/services/cohorts.service.ts`, used in `Step4SectionD.tsx`) — that half is done. `/languages` is still unbound (zero hits in `src/services`). 2026-09-10 product decision: languages selection belongs to project creation, not built yet — assume default values until that flow exists. Revisit when project creation adds a language step. |

---

## Suggested order

Everything except the items below is **done**. What's actually left:

1. **AA-3f** — "Add Counselors" can only assign counsellors already in the directory; no create-a-counsellor path from this screen. Needs a product decision on whether this screen should create counsellors or only assign existing ones (confirmed still open, acknowledged 2026-09-10 — no change made).
2. **SA-6** — Tenant Management's Institution/Counselor tabs are still `disabled`/`comingSoon`; confirm with product whether these ship or should be removed from the UI (acknowledged 2026-09-10 — no change made).
3. **CO-7** — needs a backend endpoint (`POST /reports/students/{id}/accept` + an acceptance flag on the assessment GET); frontend side is already done.
4. **CC-1** — remove the stale Projects soft-delete paragraph from `CLAUDE.md` (still present).
5. **CC-3 (`/languages` only)** — deferred by design to the project-creation flow; assume defaults until that flow exists.

~~SA-1 → SA-2 → SA-3 → SA-4, SA-5, SA-8, SA-9, SA-10, SA-11, SA-12, SA-13~~ ·
~~AA-1/1b/2/2b/3a-d/3e/4/5/6/7/8/9/10/11/12/13~~ · ~~CO-1/2/3/4/5/6(descoped)~~ · ~~ST-1/2~~ ·
~~CC-2/CC-3(cohorts)/CC-4~~ — done as of the 2026-09-10 pass (see the section rows above for what changed and why).
