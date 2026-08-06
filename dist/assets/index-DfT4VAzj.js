import{g as n,u,r as d,j as o,b6 as p,b7 as f,c as m,al as b,b8 as h,aG as $}from"./index-BLYAqq6p.js";import{d as y}from"./dayjs.min-h6X9sEe-.js";import{T as r,P as j}from"./PageHeader-CT1IpXxa.js";import{T}from"./Table-D4O82cND.js";import{g as S}from"./upcomingSessions.mock-BMf92Uzb.js";import"./Table.styles-DkGFl9kv.js";import"./Select-HMUU6vG0.js";const z=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,k=n.button`
  background: none;
  border: none;
  padding: 0;
  color: ${({theme:e})=>e.colors.primary};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  font-size: ${({theme:e})=>e.fontSize.base};
  cursor: pointer;
  text-align: left;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color ${({theme:e})=>e.transition.fast};

  &:hover {
    color: ${({theme:e})=>e.colors.primaryHover};
    text-decoration: underline;
  }
`,v=n.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,C=n.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
`,F=n.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e,$canJoin:i})=>i?e.colors.success:e.colors.textMuted};
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;n.div`
  margin-bottom: ${({theme:e})=>e.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;n.h4`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
  margin-bottom: ${({theme:e})=>e.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;n.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.md};
  background-color: ${({theme:e})=>e.colors.background};
  padding: ${({theme:e})=>e.spacing.md};
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
`;n.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;n.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`;n.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`;n.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing.xs};
  margin-top: 4px;
`;n.span`
  background-color: ${({theme:e})=>e.colors.primaryLight};
  color: ${({theme:e})=>e.colors.primary};
  border: 1px solid ${({theme:e})=>`${e.colors.primary}33`};
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  padding: 4px 10px;
  border-radius: 4px;
`;n.textarea`
  width: 100%;
  min-height: 90px;
  padding: ${({theme:e})=>e.spacing.md};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.text};
  font-family: inherit;
  font-size: ${({theme:e})=>e.fontSize.sm};
  line-height: 1.5;
  resize: vertical;
  transition: border-color ${({theme:e})=>e.transition.fast};

  &:focus {
    outline: none;
    border-color: ${({theme:e})=>e.colors.primary};
  }
`;const R=n.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,a=n.button`
  width: 32px;
  height: 32px;
  border: 1px solid
    ${({$variant:e,theme:i})=>e==="primary"?i.colors.primary:i.colors.border};
  border-radius: 4px;
  background-color: ${({$variant:e,theme:i})=>e==="primary"?i.colors.primary:i.colors.surface};
  color: ${({$variant:e,theme:i})=>e==="primary"?"#FFFFFF":i.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({$variant:e,theme:i})=>e==="primary"?"#FFFFFF":i.colors.primary};
    background-color: ${({$variant:e,theme:i})=>e==="primary"?i.colors.primaryHover||i.colors.primary:i.colors.primaryLight||"rgba(79, 70, 229, 0.05)"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,D=()=>{const e=u(),[i]=d.useState(()=>S()),l=s=>{const t=new Date().getTime(),c=(new Date(s).getTime()-t)/(1e3*60);return c<=30&&c>=-360},g=s=>{e(m.COUNSELOR_STUDENT_CHART.replace(":sessionId",s.id))},x=d.useMemo(()=>[{key:"actions",header:"Action",cell:s=>{const t=l(s.dateTime);return o.jsxs(R,{children:[t?o.jsx(r,{content:"Join video meeting",children:o.jsx(a,{$variant:"primary","aria-label":"Join Meet",onClick:()=>window.open(s.meetUrl,"_blank"),children:o.jsx(p,{size:16})})}):o.jsx(r,{content:"Join button enables 30 minutes before session start time",children:o.jsx(a,{disabled:!0,"aria-label":"Join disabled",children:o.jsx(p,{size:16})})}),o.jsx(r,{content:"Generate & view Student Career IKIGAI Report",children:o.jsx(a,{"aria-label":"Generate Report",onClick:()=>e(m.GENERATE_REPORT.replace(":sessionId",s.id)),children:o.jsx(f,{size:16})})})]})}},{key:"studentName",header:"Student Name",accessor:"studentName",cell:s=>o.jsx(r,{content:"Click to open Counsellor Form Chart & add session notes",children:o.jsxs(k,{type:"button",onClick:()=>g(s),children:[o.jsx(b,{size:16}),s.studentName]})})},{key:"sessionTitle",header:"Session Title",accessor:"sessionTitle",cell:s=>o.jsx("span",{style:{fontWeight:500},children:s.sessionTitle})},{key:"dateTime",header:"Date & Time",accessor:"dateTime",cell:s=>{const t=l(s.dateTime);return o.jsxs(v,{children:[o.jsx(C,{children:y(s.dateTime).format("MMM DD, YYYY • h:mm A")}),o.jsx(F,{$canJoin:t,children:t?o.jsxs(o.Fragment,{children:[o.jsx(h,{size:14})," Ready to Join"]}):o.jsxs(o.Fragment,{children:[o.jsx($,{size:14})," Opens 30 mins prior"]})})]})}}],[]);return o.jsxs(z,{children:[o.jsx(j,{title:"Upcoming Counseling Sessions",subtitle:"Manage assigned counseling time slots, join video meetings, and record live student assessment notes",breadcrumbs:[{label:"Upcoming Sessions"}]}),o.jsx(T,{data:i,columns:x,keyExtractor:s=>s.id})]})};export{D as UpcomingSessionsPage};
