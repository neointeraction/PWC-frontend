import{g as i,u as $,r as c,j as o,B as d,R as y,G as S,H as z,b4 as j,b5 as T,v as p,c as v}from"./index-8F0JLEEw.js";import{d as k}from"./dayjs.min-LQr4xHmr.js";import{P as w}from"./PageHeader-KpQVPwcf.js";import{T as C}from"./Table-De9tPJgC.js";import{T as g}from"./Tooltip-K2tZS8Xo.js";import{g as F}from"./upcomingSessions.mock-BMf92Uzb.js";import"./Breadcrumb-BKyN92ya.js";import"./Checkbox-CuNKoPRx.js";import"./Select-DOe36KaS.js";import"./Table.styles-ChZe2G4O.js";const R=i.div`
  display: flex;
  flex-direction: column;
`;i.button`
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
`;const D=i.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,U=i.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
`,J=i.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e,$canJoin:t})=>t?e.colors.success:e.colors.textMuted};
  display: inline-flex;
  align-items: center;
  gap: 4px;
`,L=i.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`,W=i.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
  font-weight: ${({theme:e})=>e.fontWeight.normal};
`,H=i.button`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  font-size: ${({theme:e})=>e.fontSize.sm};

  &:hover {
    color: ${({theme:e})=>e.colors.primary};
  }
`;i.div`
  margin-bottom: ${({theme:e})=>e.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;i.h4`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
  margin-bottom: ${({theme:e})=>e.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;i.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.md};
  background-color: ${({theme:e})=>e.colors.background};
  padding: ${({theme:e})=>e.spacing.md};
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
`;i.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;i.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`;i.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`;i.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing.xs};
  margin-top: 4px;
`;i.span`
  background-color: ${({theme:e})=>e.colors.primaryLight};
  color: ${({theme:e})=>e.colors.primary};
  border: 1px solid ${({theme:e})=>`${e.colors.primary}33`};
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  padding: 4px 10px;
  border-radius: 4px;
`;i.textarea`
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
`;i.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;i.button`
  width: 32px;
  height: 32px;
  border: 1px solid
    ${({$variant:e,theme:t})=>e==="primary"?t.colors.primary:t.colors.border};
  border-radius: 4px;
  background-color: ${({$variant:e,theme:t})=>e==="primary"?t.colors.primary:t.colors.surface};
  color: ${({$variant:e,theme:t})=>e==="primary"?"#FFFFFF":t.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({$variant:e,theme:t})=>e==="primary"?"#FFFFFF":t.colors.primary};
    background-color: ${({$variant:e,theme:t})=>e==="primary"?t.colors.primaryHover||t.colors.primary:t.colors.primaryLight||"rgba(79, 70, 229, 0.05)"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;const G=()=>{const e=$(),[t]=c.useState(()=>F()),[a,x]=c.useState("asc"),f=c.useMemo(()=>[...t].sort((s,r)=>{const l=new Date(s.dateTime).getTime(),n=new Date(r.dateTime).getTime();return a==="asc"?l-n:n-l}),[t,a]),u=()=>{x(s=>s==="asc"?"desc":"asc")},m=s=>{const r=new Date().getTime(),n=(new Date(s).getTime()-r)/(1e3*60);return n<=30&&n>=-360},b=s=>{e(v.COUNSELOR_STUDENT_CHART.replace(":sessionId",s.id))},h=c.useMemo(()=>[{key:"studentName",header:"Student Name",accessor:"studentName",cell:s=>o.jsxs(L,{children:[o.jsx(g,{content:"Click to open Counsellor Form Chart & add session notes",children:o.jsx(d,{size:"sm",variant:"secondary",leftIcon:o.jsx(y,{size:16}),onClick:()=>b(s),children:s.studentName})}),o.jsxs(W,{children:[s.institutionName," • ",s.studentGrade]})]})},{key:"dateTime",header:o.jsxs(H,{type:"button",onClick:u,children:["Date & Time",a==="asc"?o.jsx(j,{size:14}):o.jsx(T,{size:14})]}),accessor:"dateTime",sortable:!0,cell:s=>{const r=m(s.dateTime);return o.jsxs(D,{children:[o.jsx(U,{children:k(s.dateTime).format("DD-MM-YYYY • HH:mm")}),o.jsx(J,{$canJoin:r,children:r?o.jsxs(o.Fragment,{children:[o.jsx(S,{size:14})," Ready to Join"]}):o.jsxs(o.Fragment,{children:[o.jsx(z,{size:14})," Opens 30 mins prior"]})})]})}},{key:"sessions",header:"Sessions",cell:s=>m(s.dateTime)?o.jsx(d,{size:"sm",variant:"primary",leftIcon:o.jsx(p,{size:16}),onClick:()=>window.open(s.meetUrl,"_blank"),children:"Join Session"}):o.jsx(g,{content:"Join button enables 30 minutes before session start time",children:o.jsx(d,{size:"sm",variant:"secondary",disabled:!0,leftIcon:o.jsx(p,{size:16}),children:"Join Session"})})}],[a]);return o.jsxs(R,{children:[o.jsx(w,{title:"Upcoming Counseling Sessions",subtitle:"Manage assigned counseling time slots, join video meetings, and record live student assessment notes",breadcrumbs:[{label:"Upcoming Sessions"}]}),o.jsx(C,{data:f,columns:h,keyExtractor:s=>s.id})]})};export{G as UpcomingSessionsPage};
