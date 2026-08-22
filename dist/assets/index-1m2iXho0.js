import{g as r,u as b,r as c,j as o,B as d,R as y,aX as S,aA as z,aY as j,aZ as T,aG as m,c as k}from"./index-BZPOwNvj.js";import{d as v}from"./dayjs.min-Dr5v4u7p.js";import{C as w}from"./Card-pcm2xDaD.js";import{P as C}from"./PageHeader-BFqlWgQu.js";import{T as F}from"./Table-Ddoil0CF.js";import{T as x}from"./Tooltip-BiDsfPmw.js";import{g as R}from"./upcomingSessions.mock-B_MecF99.js";import"./Card.styles-BlbnDXnT.js";import"./Breadcrumb-aCBtmGLf.js";import"./Checkbox-7AayWytc.js";import"./Select-oH8LtK7F.js";import"./Table.styles-B9mywflN.js";const D=r.div`
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
`;const J=r.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,L=r.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
`,U=r.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e,$canJoin:t})=>t?e.colors.success:e.colors.textMuted};
  display: inline-flex;
  align-items: center;
  gap: 4px;
`,W=r.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`,N=r.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
  font-weight: ${({theme:e})=>e.fontWeight.normal};
`,H=r.button`
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
`;const Z=()=>{const e=b(),[t]=c.useState(()=>R()),[a,g]=c.useState("asc"),f=c.useMemo(()=>[...t].sort((i,s)=>{const l=new Date(i.dateTime).getTime(),n=new Date(s.dateTime).getTime();return a==="asc"?l-n:n-l}),[t,a]),u=()=>{g(i=>i==="asc"?"desc":"asc")},p=i=>{const s=new Date().getTime(),n=(new Date(i).getTime()-s)/(1e3*60);return n<=30&&n>=-360},h=i=>{e(k.COUNSELOR_STUDENT_CHART.replace(":sessionId",i.id))},$=c.useMemo(()=>[{key:"studentName",header:"Student Name",accessor:"studentName",cell:i=>o.jsxs(W,{children:[o.jsx(x,{content:"Click to open Counsellor Form Chart & add session notes",children:o.jsx(d,{size:"sm",variant:"secondary",leftIcon:o.jsx(y,{size:16}),onClick:()=>h(i),children:i.studentName})}),o.jsxs(N,{children:[i.institutionName," • ",i.studentGrade]})]})},{key:"dateTime",header:o.jsxs(H,{type:"button",onClick:u,children:["Date & Time",a==="asc"?o.jsx(j,{size:14}):o.jsx(T,{size:14})]}),accessor:"dateTime",sortable:!0,cell:i=>{const s=p(i.dateTime);return o.jsxs(J,{children:[o.jsx(L,{children:v(i.dateTime).format("DD-MM-YYYY • HH:mm")}),o.jsx(U,{$canJoin:s,children:s?o.jsxs(o.Fragment,{children:[o.jsx(S,{size:14})," Ready to Join"]}):o.jsxs(o.Fragment,{children:[o.jsx(z,{size:14})," Opens 30 mins prior"]})})]})}},{key:"sessions",header:"Sessions",cell:i=>p(i.dateTime)?o.jsx(d,{size:"sm",variant:"primary",leftIcon:o.jsx(m,{size:16}),onClick:()=>window.open(i.meetUrl,"_blank"),children:"Join Session"}):o.jsx(x,{content:"Join button enables 30 minutes before session start time",children:o.jsx(d,{size:"sm",variant:"secondary",disabled:!0,leftIcon:o.jsx(m,{size:16}),children:"Join Session"})})}],[a]);return o.jsxs(D,{children:[o.jsx(C,{title:"Upcoming Counseling Sessions"}),o.jsx(w,{children:o.jsx(F,{data:f,columns:$,keyExtractor:i=>i.id})})]})};export{Z as UpcomingSessionsPage};
