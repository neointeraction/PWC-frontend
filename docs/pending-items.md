# Pending Items — Frontend

Working list of everything still unfinished in the frontend, grouped by the user role that
sees it. Each item names the exact file(s) and, where one exists, the backend endpoint that
should replace the mock. Tick items off as they land.

- Branch: `integration`
- Last updated: 2026-08-30
- Backend reference: `docs/api-list.md` (last updated 2026-08-11)

**Current focus: Super Admin (§1) and App Admin (§2).** Counsellor (§3) and Student/Parent (§4)
are parked until those two are closed.

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
| SA-4 | ☐ | P2 | **`PendingRatificationsPage` is orphaned.** It is exported from `src/pages/career-library/index.ts` but has no route in `src/app/routes.tsx` and no nav entry, so it is unreachable. Decide: route it (as the full review screen) or delete it and keep the dashboard table as the only surface. `src/pages/career-library/PendingRatifications/PendingRatifications.tsx` |
| SA-5 | ✅ | P2 | ~~**`dashboardService.getSummary` is mock.**~~ It was a 300 ms artificial delay gating the whole page while rendering nothing. Call removed and `src/services/dashboard.service.ts` deleted. If the dashboard later wants real counts, build them from `GET /projects` / `GET /students` / `GET /career-library/requests`. |
| SA-10 | ☐ | P1 | **Approving a request does not create the library entry.** `JobRoleApprovalModal` collects a full job-role form and hands it to `onApprove(data)`, but the dashboard ignores that payload — the request flips to `APPROVED` with no `resultingEntryId` and nothing lands in the career library, despite the toast saying it did. Blocker: the modal's cluster/industry/domain are free-text with hardcoded defaults, while `POST /career-library` needs a real `domainId`. Needs the modal switched to the taxonomy pickers (`careerService.getClusters/Industries/Domains`), then create-entry → approve-with-`resultingEntryId`. `src/pages/dashboard/components/JobRoleApprovalModal.tsx:31-58` |
| SA-6 | ☐ | P2 | **Tenant Management: only the kREATE tab works.** The "Institution" and "Counselor" category tabs are `disabled: true, comingSoon: true`. The kREATE tab is fully bound to `/admins`. Confirm whether the other two are in scope; if yes, they need their own backing lists. `src/pages/tenant-management/TenantManagementPage.tsx:235-251` |
| SA-7 | ✅ | P2 | ~~**Career library: education path is unbound.**~~ Bound against the live routes: `GET /career-library/education?domainId=` fills the tick-list, `?search=` backs a typeahead over the global library, `POST /career-library/education` creates a new row (APPROVED at once for an admin), and the ticked ids go out as `educationEntries` on the entry's create/update. New roles start with the domain's whole path ticked; an edit re-seeds from `linkedEducationEntries` and merges in any entry linked from outside the domain. `src/pages/career-library/components/JobRoleFormModal.tsx` |
| SA-11 | ✅ | P2 | ~~**The free-text qualification fields still sit under the same Education Path heading.**~~ Removed from the form. Since `qualification10th12th` is still NOT NULL on the backend and the career detail's Education Path tab renders these columns, a **new** role now derives them from the ticked path: programmes join into the recommended-subjects line, their descriptions into the explanation/defined-pathway note. Creating without a ticked 10+2 entry is blocked client-side with a clear message rather than a raw 400. |
| SA-12 | ☐ | P2 | **Editing a role's education ticks no longer updates its free-text qualification columns.** Edit deliberately omits them (PATCH leaves an omitted scalar alone), because the 1318 imported roles carry descriptive prose that a comma-joined list would destroy. Consequence: the career detail's Education Path tab still renders the old prose after a tick change. The proper fix is for that tab to render `linkedEducationEntries` instead of the legacy columns. `src/pages/career-library/tabs/EducationPathTab.tsx:160-176` |
| SA-13 | ☐ | P2 | **Education entries can be added but not corrected, removed or reviewed.** The live backend exposes `PATCH` / `DELETE /career-library/education/{entryId}` (admin) plus an `approve` / `reject` / `restore` review flow — a counsellor-proposed entry lands `PENDING` and never reaches the pickers until an admin approves it. None of that is surfaced anywhere in the frontend, so there is no queue for those proposals. |
| CC-4 | ☐ | P2 | **`docs/api-list.md` is stale on the education path.** It documents `GET/POST /career-taxonomy/domains/{id}/education` and `PATCH/DELETE /career-taxonomy/education/{entryId}`; those routes no longer exist. Education entries are now **global canonical rows** under `/career-library/education` (`search`, `level`, `status` defaulting to `APPROVED`, `domainId` to scope to a domain, `limit`), find-or-created and shared by every role that names them. Its "Last updated" line still reads 2026-08-11 — worth a refresh before the next module is bound. |
| SA-8 | ☐ | P3 | **Career taxonomy restore is unbound.** Cluster/industry/domain delete is a soft-delete on the backend and `POST /career-taxonomy/{level}/{id}/restore` exists, but the frontend has no restore path — a mistaken delete is unrecoverable from the UI. `src/services/career.service.ts:616-656` |
| SA-9 | ☐ | P3 | **`settings.service.ts` is dead mock code.** `settingsService` is not imported anywhere; both settings screens use `authService.changePassword` and the theme store directly. Delete the service and the settings mocks it pulls in. `src/services/settings.service.ts`, `src/mocks/settings.mock.ts` |

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
| AA-3e | ☐ | P2 | **"Copy meet link" fabricates a URL.** `handleCopyMeetLink` builds `https://meet.google.com/pwc-{counselorId}` and copies it to the clipboard — a link that goes nowhere and could be pasted to a parent. Real links are per **session** (`Session.meetingLink`, set via `PATCH /sessions/{id}/meeting-link`), while the button sits on the **counsellor** card, so there's no single link to copy. Needs a product decision: move it to the session row, or drop it. Left as-is rather than redesigning. `src/pages/projects/ProjectSessionsPage/ProjectSessionsPage.tsx` |
| AA-3f | ☐ | P2 | **"Add Counselors" can only assign counsellors that already exist.** AA-3d/AA-4 made the matched path real (`POST /counsellors/{id}/projects`), but a row that isn't in the directory is reported as unassignable rather than created — `POST /counsellors` needs an `instituteId` and a temp-password flow the modal doesn't have. Decide whether this screen should create counsellors or only assign existing ones. |
| AA-4 | ✅ | P2 | ~~**Counsellor match check uses mock emails.**~~ Done as a prerequisite for AA-3f: `validateCounselors` now matches against `getCounsellorDirectory()` (`GET /counsellors`) and carries the matched `directoryId` and `counsellorCode` through, which is what the project-assignment endpoint needs. |
| AA-5 | ☐ | P2 | **Reports page is mock and unreachable.** The whole table comes from a hardcoded `mockReportData` keyed by `proj-001`, and `/reports` has no sidebar entry or in-app link. Real sources: `GET /students?projectId=`, `GET /sessions?projectId=`, `GET /reports/students/{id}/assessment`. Decide whether this page ships. `src/pages/reports/ReportsPage.tsx:50,138` |
| AA-6 | ✅ | P2 | ~~**`proj-001` fallbacks.**~~ Cleared on all three project pages — every query is now `enabled: Boolean(projectId)`. |
| AA-9 | ☐ | P2 | **Project banner still shows two hardcoded values.** The institute code badge is a literal `INS001`, and the location falls back to `'Mumbai, Maharashtra'` when absent — which is always, because `GET /projects/{id}` includes only `institute: {id, name}` (see `projectInclude` in the backend's `projects.service.ts`). Needs the institute's code/address added to that include, or a second `GET /institutes/{id}` call. Left as-is rather than changing the banner design. `src/pages/projects/ProjectDashboardPage/ProjectDashboardPage.tsx` |
| AA-7 | ☐ | P3 | **`AdminDashboard` is dead code.** `Dashboard.tsx` redirects `admin` straight to Projects, so `AdminDashboard.tsx` and its three widgets (`ProjectStudentStatsWidget`, `ProjectCounselorStatsWidget`, `DataPurgingLogWidget`) never render — they are the only consumers of `DASHBOARD_MOCKS`. Delete them, or route them if an admin dashboard is actually wanted. `src/pages/dashboard/AdminDashboard.tsx`, `src/pages/dashboard/components/`, `src/mocks/dashboard.mock.ts` |
| AA-11 | ✅ | P1 | ~~**The four overview metric cards on the project dashboard are hardcoded.**~~ Counsellors and Total Students now read the project's `_count` (`counselorCount` / `studentCount`); Total Days and Remaining Days are computed from `validFrom`/`validTo`, pinned to UTC midnight so no day is gained or lost to the local timezone, and render `—` when the window is missing or inverted. Saving a student also invalidates `['project', projectId]` so the student card follows. |
| AA-12 | ☐ | P2 | **The Add/Edit Student form has no Parent Email field, but `POST /students` requires `parentEmail`.** Creates currently fall back to the student's own email (the same fallback the import wizard uses), so a real parent address can never be entered from this screen. Adding the input is a form change — needs a design call. `src/pages/projects/ProjectStudentsPage/EditStudentModal.tsx` |
| AA-13 | ☐ | P2 | **The modal's Email field can't be saved on edit.** `PATCH /students/{id}` has no `email` field — the login address lives on the `User` row and no admin endpoint changes it — yet the modal exposes an editable Email input plus a "Send new welcome email to updated address" checkbox that dispatches nothing. AA-2 makes the failure visible (a warning toast saying the email was not changed) rather than silently dropping it, but the real fix is either a backend endpoint or making the field read-only on edit. Design call. |
| AA-14 | ☐ | P3 | **The student-view modal on the sessions page no longer fabricates data**, but counsellor cards show a blank phone for anyone not in `GET /counsellors?projectId`. Minor; verify once real counsellors exist in the dev DB. |
| AA-10 | ☐ | P3 | **`src/mocks/projects.mock.ts`, `src/mocks/projectStudents.mock.ts` and `src/mocks/counselors.mock.ts` are now unused** — AA-1, AA-2 and AA-3/AA-4 removed their last consumers. (`projectSessions.mock.ts` was deleted outright, as its type no longer compiled.) Delete them in the same pass as AA-7/SA-9. |
| AA-8 | ☐ | P3 | **`AddToExistingJobRoleModal` is unreferenced** outside its own barrel export. Confirm it is obsolete and delete. `src/pages/dashboard/components/AddToExistingJobRoleModal.tsx` |

## 3. Counsellor — parked

| # | Status | P | Item |
|---|---|---|---|
| CO-1 | ☐ | P1 | Counsellor Form Chart runs entirely on `studentFormChart.mock.ts` across ~12 step components. Backend: `GET/PUT /counsellor-chart/students/{id}` + mirror-pair amendment endpoints. |
| CO-2 | ☐ | P1 | Student Ikigai / assessment report runs on `studentIkigaiReport.mock.ts` across 8 sections. Backend: `GET /reports/students/{id}/assessment`. |
| CO-3 | ☐ | P1 | Upcoming Sessions and All Sessions use `getMockUpcomingSessions`. Backend: `GET /sessions/counsellors/{id}`, `GET /sessions/counsellors/{id}/my-students`. |
| CO-4 | ☐ | P2 | `studentService.getStudentsByCounselor` / `getPreCounsellingForm` return module-level mock arrays. `src/services/student.service.ts:120,150,245,252` |
| CO-5 | ☐ | P2 | `CounselorDashboard.tsx` is dead code — the counsellor role redirects to Upcoming Sessions. |
| CO-6 | ☐ | P2 | Counsellor satisfaction score is not surfaced anywhere. Backend: `GET /feedback/counsellors/{id}/score`, `GET /feedback/students/{id}/score`. |

## 4. Student / Parent — parked

| # | Status | P | Item |
|---|---|---|---|
| ST-1 | ☐ | P2 | `StudentPortalPage` navigates to the report with a hardcoded `'sess-counselor-1'` session id. `src/pages/student/StudentPortalPage/StudentPortalPage.tsx:749,760` |
| ST-2 | ☐ | P2 | Report view for students depends on CO-2 landing first. |

## 5. Cross-cutting

| # | Status | P | Item |
|---|---|---|---|
| CC-1 | ☐ | P3 | `CLAUDE.md` still says the Projects soft-delete/restore model is a mock-only `master` invention that must be resolved against `integration`. No longer true — the backend has `DELETE /projects/{id}` (soft-delete) and `PATCH /projects/{id}/restore`, and `project.service.ts:190,194` already binds both. Remove that paragraph. |
| CC-2 | ☐ | P3 | Stale comment in `src/services/career.service.ts:678` claiming the career library is read-only with no ratification endpoints. Fix when SA-3 lands. |
| CC-3 | ☐ | P3 | No frontend binding for `GET /languages`, `GET /cohorts`, or the Email module. Confirm none of the admin screens need them. |

---

## Suggested order

1. ~~SA-1 → SA-2 → SA-3 → SA-5 (the super admin dashboard becomes real).~~ **Done.**
1a. SA-10 — approving must actually create the library entry (found while doing SA-2).
2. ~~AA-1 + AA-1b (project dashboard shows, closes and deletes the right project).~~ **Done.**
3. ~~AA-2 (student add/edit persists).~~ **Done.**
4. AA-3 (session changes persist).
5. ~~AA-11 (project dashboard metrics).~~ **Done.**
6. ~~AA-3a–d + AA-4 + AA-6 (project sessions page).~~ **Done.**
7. AA-3e / AA-3f / AA-12 / AA-13 — all four need a product or design call, not code.
6. SA-4/SA-5/SA-6 and the P3 cleanups, once the above are verified.
