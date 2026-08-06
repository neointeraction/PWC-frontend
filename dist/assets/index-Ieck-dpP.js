import{g as i,d as N,r as l,j as s,al as M,b0 as A,aC as w,B as h,b1 as v,x as L}from"./index-BIfikPqx.js";import{d as P}from"./dayjs.min-BO8t-Phv.js";import{T,P as R}from"./PageHeader-hWMsFgih.js";import{T as E,M as J,B as O}from"./Modal-CHcOI8H4.js";import{U as B}from"./upcomingSessions.mock-Y0766zVp.js";import"./Modal.styles-DEidvQxJ.js";const D=i.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,W=i.button`
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
`,G=i.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,U=i.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
`,F=i.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e,$canJoin:p})=>p?e.colors.success:e.colors.textMuted};
  display: inline-flex;
  align-items: center;
  gap: 4px;
`,d=i.div`
  margin-bottom: ${({theme:e})=>e.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`,m=i.h4`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
  margin-bottom: ${({theme:e})=>e.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,u=i.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.md};
  background-color: ${({theme:e})=>e.colors.background};
  padding: ${({theme:e})=>e.spacing.md};
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
`,a=i.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,r=i.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`,c=i.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,Y=i.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing.xs};
  margin-top: 4px;
`,_=i.span`
  background-color: ${({theme:e})=>e.colors.primaryLight};
  color: ${({theme:e})=>e.colors.primary};
  border: 1px solid ${({theme:e})=>`${e.colors.primary}33`};
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  padding: 4px 10px;
  border-radius: 4px;
`,y=i.textarea`
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
`,ee=()=>{const e=N(),[p,z]=l.useState(B),[n,x]=l.useState(null),[g,f]=l.useState(""),[j,S]=l.useState(""),$=t=>{const o=new Date().getTime(),b=(new Date(t).getTime()-o)/(1e3*60);return b<=30&&b>=-90},I=t=>{x(t),f(t.assessmentSheet.counselorNotes),S(t.assessmentSheet.actionItems)},C=()=>{n&&(z(t=>t.map(o=>o.id===n.id?{...o,assessmentSheet:{...o.assessmentSheet,counselorNotes:g,actionItems:j}}:o)),e.success("Assessment Sheet Saved",`Live session notes and action items for ${n.studentName} have been recorded.`),x(null))},k=l.useMemo(()=>[{key:"studentName",header:"Student Name",accessor:"studentName",cell:t=>s.jsx(T,{content:"Click to view assessment sheet",children:s.jsxs(W,{type:"button",onClick:()=>I(t),children:[s.jsx(M,{size:16}),t.studentName]})})},{key:"sessionTitle",header:"Session Title",accessor:"sessionTitle",cell:t=>s.jsx("span",{style:{fontWeight:500},children:t.sessionTitle})},{key:"dateTime",header:"Date & Time",accessor:"dateTime",cell:t=>{const o=$(t.dateTime);return s.jsxs(G,{children:[s.jsx(U,{children:P(t.dateTime).format("MMM DD, YYYY • h:mm A")}),s.jsx(F,{$canJoin:o,children:o?s.jsxs(s.Fragment,{children:[s.jsx(A,{size:14})," Ready to Join"]}):s.jsxs(s.Fragment,{children:[s.jsx(w,{size:14})," Opens 30 mins prior"]})})]})}},{key:"actions",header:"Action",cell:t=>$(t.dateTime)?s.jsx(h,{size:"sm",variant:"primary",leftIcon:s.jsx(v,{size:16}),onClick:()=>window.open(t.meetUrl,"_blank"),children:"JOIN MEET"}):s.jsx(T,{content:"Join button enables 30 minutes before session start time",children:s.jsx(h,{size:"sm",variant:"secondary",disabled:!0,leftIcon:s.jsx(v,{size:16}),children:"JOIN"})})}],[]);return s.jsxs(D,{children:[s.jsx(R,{title:"Upcoming Counseling Sessions",subtitle:"Manage assigned counseling time slots, join video meetings, and record live student assessment notes",breadcrumbs:[{label:"Upcoming Sessions"}]}),s.jsx(E,{data:p,columns:k,keyExtractor:t=>t.id}),n&&s.jsxs(J,{isOpen:!!n,onClose:()=>x(null),title:`Assessment Sheet — ${n.studentName}`,size:"xl",footer:s.jsxs(s.Fragment,{children:[s.jsx(h,{variant:"secondary",onClick:()=>x(null),children:"Close"}),s.jsx(h,{variant:"primary",leftIcon:s.jsx(L,{size:16}),onClick:C,children:"Save Assessment Notes"})]}),children:[s.jsxs(d,{children:[s.jsx(m,{children:"Student Profile Overview"}),s.jsxs(u,{children:[s.jsxs(a,{children:[s.jsx(r,{children:"Student Email"}),s.jsx(c,{children:n.studentEmail})]}),s.jsxs(a,{children:[s.jsx(r,{children:"Grade & Stream"}),s.jsx(c,{children:n.studentGrade})]}),s.jsxs(a,{children:[s.jsx(r,{children:"Institution"}),s.jsx(c,{children:n.institutionName})]}),s.jsxs(a,{children:[s.jsx(r,{children:"Session Status"}),s.jsx(c,{children:s.jsx(O,{variant:"info",children:n.status})})]})]})]}),s.jsxs(d,{children:[s.jsx(m,{children:"Aptitude & Interest Assessment"}),s.jsxs(u,{children:[s.jsxs(a,{children:[s.jsx(r,{children:"Aptitude Test Score"}),s.jsx(c,{children:n.assessmentSheet.aptitudeScore})]}),s.jsxs(a,{children:[s.jsx(r,{children:"Personality Profile"}),s.jsx(c,{children:n.assessmentSheet.personalityType})]})]}),s.jsxs("div",{style:{marginTop:"12px"},children:[s.jsx(r,{children:"Top Career Interests Identified:"}),s.jsx(Y,{children:n.assessmentSheet.topInterests.map((t,o)=>s.jsx(_,{children:t},o))})]})]}),s.jsxs(d,{children:[s.jsx(m,{children:"Academic Performance"}),s.jsx(u,{style:{gridTemplateColumns:"1fr"},children:s.jsxs(a,{children:[s.jsx(r,{children:"Recent Marks / Grades"}),s.jsx(c,{children:n.assessmentSheet.academicPerformance})]})})]}),s.jsxs(d,{children:[s.jsx(m,{children:"Counselor Live Discussion & Assessment Notes"}),s.jsx(y,{value:g,onChange:t=>f(t.target.value),placeholder:"Record live discussion notes, career advice, and assessment observations..."})]}),s.jsxs(d,{children:[s.jsx(m,{children:"Action Items & Recommendations for Student"}),s.jsx(y,{value:j,onChange:t=>S(t.target.value),placeholder:"Enter recommended next steps, courses, or entrance exam prep for the student..."})]})]})]})};export{ee as UpcomingSessionsPage};
