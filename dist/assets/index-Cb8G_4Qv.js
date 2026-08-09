import{g as r,u as f,r as c,j as o,B as t,al as u,aW as h,aG as b,aX as d,c as p,aY as $}from"./index-DquQY_gK.js";import{d as y}from"./dayjs.min-BAfPGtzO.js";import{P as T}from"./PageHeader-CH8ZQzui.js";import{T as z}from"./Table-DM19dC8H.js";import{T as m}from"./Tooltip-n1WJqe4o.js";import{g as j}from"./upcomingSessions.mock-BMf92Uzb.js";import"./Table.styles-kifmC2_N.js";import"./Select-BWCmQJaH.js";const S=r.div`
  display: flex;
  flex-direction: column;
`;r.button`
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
`;const k=r.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,v=r.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
`,F=r.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e,$canJoin:i})=>i?e.colors.success:e.colors.textMuted};
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;r.div`
  margin-bottom: ${({theme:e})=>e.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;r.h4`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
  margin-bottom: ${({theme:e})=>e.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;r.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.md};
  background-color: ${({theme:e})=>e.colors.background};
  padding: ${({theme:e})=>e.spacing.md};
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
`;r.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;r.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`;r.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`;r.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing.xs};
  margin-top: 4px;
`;r.span`
  background-color: ${({theme:e})=>e.colors.primaryLight};
  color: ${({theme:e})=>e.colors.primary};
  border: 1px solid ${({theme:e})=>`${e.colors.primary}33`};
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  padding: 4px 10px;
  border-radius: 4px;
`;r.textarea`
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
`;r.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;r.button`
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
`;const W=()=>{const e=f(),[i]=c.useState(()=>j()),a=s=>{const n=new Date().getTime(),l=(new Date(s).getTime()-n)/(1e3*60);return l<=30&&l>=-360},g=s=>{e(p.COUNSELOR_STUDENT_CHART.replace(":sessionId",s.id))},x=c.useMemo(()=>[{key:"studentName",header:"Student Name",accessor:"studentName",cell:s=>o.jsx(m,{content:"Click to open Counsellor Form Chart & add session notes",children:o.jsx(t,{size:"sm",variant:"secondary",leftIcon:o.jsx(u,{size:16}),onClick:()=>g(s),children:s.studentName})})},{key:"sessionTitle",header:"Session Title",accessor:"sessionTitle",cell:s=>o.jsx("span",{style:{fontWeight:500},children:s.sessionTitle})},{key:"dateTime",header:"Date & Time",accessor:"dateTime",cell:s=>{const n=a(s.dateTime);return o.jsxs(k,{children:[o.jsx(v,{children:y(s.dateTime).format("MMM DD, YYYY • h:mm A")}),o.jsx(F,{$canJoin:n,children:n?o.jsxs(o.Fragment,{children:[o.jsx(h,{size:14})," Ready to Join"]}):o.jsxs(o.Fragment,{children:[o.jsx(b,{size:14})," Opens 30 mins prior"]})})]})}},{key:"sessions",header:"Sessions",cell:s=>a(s.dateTime)?o.jsx(t,{size:"sm",variant:"primary",leftIcon:o.jsx(d,{size:16}),onClick:()=>window.open(s.meetUrl,"_blank"),children:"Join Session"}):o.jsx(m,{content:"Join button enables 30 minutes before session start time",children:o.jsx(t,{size:"sm",variant:"secondary",disabled:!0,leftIcon:o.jsx(d,{size:16}),children:"Join Session"})})},{key:"report",header:"Report",cell:s=>o.jsx(t,{size:"sm",variant:"secondary",leftIcon:o.jsx($,{size:16}),onClick:()=>e(p.GENERATE_REPORT.replace(":sessionId",s.id)),children:"Generate Report"})}],[]);return o.jsxs(S,{children:[o.jsx(T,{title:"Upcoming Counseling Sessions",subtitle:"Manage assigned counseling time slots, join video meetings, and record live student assessment notes",breadcrumbs:[{label:"Upcoming Sessions"}]}),o.jsx(z,{data:i,columns:x,keyExtractor:s=>s.id})]})};export{W as UpcomingSessionsPage};
