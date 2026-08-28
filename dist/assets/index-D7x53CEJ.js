import{g as t,u as y,r as c,j as r,B as d,R as S,aY as z,aZ as j,a_ as k,az as T,aG as m,c as F}from"./index-Bw790BVp.js";import{d as x}from"./dayjs.min-aW1V044l.js";import{C}from"./Card-B7O1DSEf.js";import{P as v}from"./PageHeader-CtkDWmsE.js";import{T as B}from"./Table--rB9Za6j.js";import{T as g}from"./Tooltip-DVjunIWN.js";import{g as D}from"./upcomingSessions.mock-cDxNZ5Vc.js";import"./Card.styles-BQGvdCGA.js";import"./Breadcrumb-D5qQxgOH.js";import"./Checkbox-DarQh2Zg.js";import"./Select-DGOp38p5.js";import"./Table.styles-CMb45pz0.js";const N=t.div`
  display: flex;
  flex-direction: column;
`;t.button`
  background: none;
  border: none;
  padding: 0;
  color: ${({theme:o})=>o.colors.primary};
  font-weight: ${({theme:o})=>o.fontWeight.semibold};
  font-size: ${({theme:o})=>o.fontSize.base};
  cursor: pointer;
  text-align: left;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color ${({theme:o})=>o.transition.fast};

  &:hover {
    color: ${({theme:o})=>o.colors.primaryHover};
    text-decoration: underline;
  }
`;const R=t.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,w=t.span`
  font-size: ${({theme:o})=>o.fontSize.sm};
  font-weight: ${({theme:o})=>o.fontWeight.medium};
  color: ${({theme:o})=>o.colors.text};
`,W=t.span`
  font-size: ${({theme:o})=>o.fontSize.xs};
  font-weight: ${({theme:o})=>o.fontWeight.semibold};
  color: ${({theme:o,$canJoin:i})=>i?o.colors.success:o.colors.textMuted};
  display: inline-flex;
  align-items: center;
  gap: 4px;
`,E=t.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`,U=t.span`
  font-size: ${({theme:o})=>o.fontSize.xs};
  color: ${({theme:o})=>o.colors.textSecondary};
  font-weight: ${({theme:o})=>o.fontWeight.normal};
`,A=t.button`
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
  font-weight: ${({theme:o})=>o.fontWeight.semibold};
  font-size: ${({theme:o})=>o.fontSize.sm};

  &:hover {
    color: ${({theme:o})=>o.colors.primary};
  }
`,L=t.span`
  font-size: ${({theme:o})=>o.fontSize.sm};
  font-weight: ${({theme:o})=>o.fontWeight.semibold};
  color: ${({theme:o})=>o.colors.text};
`,J=t.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 26px;
  padding: 0 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 700;
  border: 1px solid;
  ${({$session:o,theme:i})=>o==="S1"?`
        background-color: ${i.colors.primaryLight||"#F4ECF8"};
        color: ${i.colors.primary||"#5D2384"};
        border-color: ${i.colors.primary}40;
      `:o==="S2"?`
        background-color: #FFF7ED;
        color: #EA580C;
        border-color: #FDBA74;
      `:`
      background-color: ${i.colors.background};
      color: ${i.colors.textSecondary};
      border-color: ${i.colors.border};
    `}
`;t.div`
  margin-bottom: ${({theme:o})=>o.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;t.h4`
  font-size: ${({theme:o})=>o.fontSize.sm};
  font-weight: ${({theme:o})=>o.fontWeight.semibold};
  color: ${({theme:o})=>o.colors.text};
  margin-bottom: ${({theme:o})=>o.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;t.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:o})=>o.spacing.md};
  background-color: ${({theme:o})=>o.colors.background};
  padding: ${({theme:o})=>o.spacing.md};
  border-radius: 4px;
  border: 1px solid ${({theme:o})=>o.colors.border};
`;t.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;t.span`
  font-size: ${({theme:o})=>o.fontSize.xs};
  color: ${({theme:o})=>o.colors.textSecondary};
`;t.span`
  font-size: ${({theme:o})=>o.fontSize.sm};
  font-weight: ${({theme:o})=>o.fontWeight.semibold};
  color: ${({theme:o})=>o.colors.text};
`;t.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({theme:o})=>o.spacing.xs};
  margin-top: 4px;
`;t.span`
  background-color: ${({theme:o})=>o.colors.primaryLight};
  color: ${({theme:o})=>o.colors.primary};
  border: 1px solid ${({theme:o})=>`${o.colors.primary}33`};
  font-size: ${({theme:o})=>o.fontSize.xs};
  font-weight: ${({theme:o})=>o.fontWeight.medium};
  padding: 4px 10px;
  border-radius: 4px;
`;t.textarea`
  width: 100%;
  min-height: 90px;
  padding: ${({theme:o})=>o.spacing.md};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: 4px;
  background-color: ${({theme:o})=>o.colors.surface};
  color: ${({theme:o})=>o.colors.text};
  font-family: inherit;
  font-size: ${({theme:o})=>o.fontSize.sm};
  line-height: 1.5;
  resize: vertical;
  transition: border-color ${({theme:o})=>o.transition.fast};

  &:focus {
    outline: none;
    border-color: ${({theme:o})=>o.colors.primary};
  }
`;t.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;t.button`
  width: 32px;
  height: 32px;
  border: 1px solid
    ${({$variant:o,theme:i})=>o==="primary"?i.colors.primary:i.colors.border};
  border-radius: 4px;
  background-color: ${({$variant:o,theme:i})=>o==="primary"?i.colors.primary:i.colors.surface};
  color: ${({$variant:o,theme:i})=>o==="primary"?"#FFFFFF":i.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${({theme:o})=>o.colors.primary};
    color: ${({$variant:o,theme:i})=>o==="primary"?"#FFFFFF":i.colors.primary};
    background-color: ${({$variant:o,theme:i})=>o==="primary"?i.colors.primaryHover||i.colors.primary:i.colors.primaryLight||"rgba(79, 70, 229, 0.05)"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;const Q=()=>{const o=y(),[i]=c.useState(()=>D()),[a,f]=c.useState("asc"),u=c.useMemo(()=>[...i].sort((e,s)=>{const l=new Date(e.dateTime).getTime(),n=new Date(s.dateTime).getTime();return a==="asc"?l-n:n-l}),[i,a]),b=()=>{f(e=>e==="asc"?"desc":"asc")},p=e=>{const s=new Date().getTime(),n=(new Date(e).getTime()-s)/(1e3*60);return n<=30&&n>=-360},h=e=>{o(F.COUNSELOR_STUDENT_CHART.replace(":sessionId",e.id))},$=c.useMemo(()=>[{key:"studentName",header:"Student Name",accessor:"studentName",cell:e=>r.jsxs(E,{children:[e.isBooked&&e.studentName?r.jsx(g,{content:"Click to open Counsellor Form Chart & add session notes",children:r.jsx(d,{size:"sm",variant:"secondary",leftIcon:r.jsx(S,{size:16}),onClick:()=>h(e),children:e.studentName})}):r.jsx("span",{style:{fontStyle:"italic",color:"#94A3B8",fontWeight:600,fontSize:"0.85rem",padding:"4px 0"},children:"Unbooked Slot"}),r.jsxs(U,{children:[e.institutionName,e.studentGrade?` • ${e.studentGrade}`:""]})]})},{key:"date",header:r.jsxs(A,{type:"button",onClick:b,children:["Date",a==="asc"?r.jsx(z,{size:14}):r.jsx(j,{size:14})]}),accessor:"dateTime",sortable:!0,cell:e=>r.jsx(L,{children:x(e.dateTime).format("DD MMM YYYY")})},{key:"time",header:"Time",cell:e=>{const s=e.isBooked?p(e.dateTime):!1;return r.jsxs(R,{children:[r.jsx(w,{children:e.timeSlot||x(e.dateTime).format("HH:mm")}),e.isBooked?r.jsx(W,{$canJoin:s,children:s?r.jsxs(r.Fragment,{children:[r.jsx(k,{size:14})," Ready to Join"]}):r.jsxs(r.Fragment,{children:[r.jsx(T,{size:14})," Opens 30 mins prior"]})}):r.jsx("span",{style:{fontSize:"11px",color:"#64748B",fontStyle:"italic"},children:"Available for Booking"})]})}},{key:"sessionNumber",header:"Session",cell:e=>e.sessionNumber?r.jsx(J,{$session:e.sessionNumber,children:e.sessionNumber}):r.jsx("span",{style:{color:"#94A3B8"},children:"—"})},{key:"actions",header:"Action",cell:e=>e.isBooked?p(e.dateTime)?r.jsx(d,{size:"sm",variant:"primary",leftIcon:r.jsx(m,{size:16}),onClick:()=>window.open(e.meetUrl,"_blank"),children:"Join Session"}):r.jsx(g,{content:"Join button enables 30 minutes before session start time",children:r.jsx(d,{size:"sm",variant:"secondary",disabled:!0,leftIcon:r.jsx(m,{size:16}),children:"Join Session"})}):r.jsx("span",{style:{fontSize:"0.8rem",fontWeight:600,color:"#64748B",backgroundColor:"#F1F5F9",padding:"4px 10px",borderRadius:"4px",border:"1px solid #E2E8F0"},children:"Unbooked"})}],[a]);return r.jsxs(N,{children:[r.jsx(v,{title:"Upcoming Counseling Sessions"}),r.jsx(C,{children:r.jsx(B,{data:u,columns:$,keyExtractor:e=>e.id})})]})};export{Q as UpcomingSessionsPage};
