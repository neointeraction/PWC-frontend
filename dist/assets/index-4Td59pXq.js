import{g as i,d as N,r as l,j as s,al as M,b4 as A,aG as w,B as h,b5 as v,x as L}from"./index-BlnJ6RPY.js";import{d as R}from"./dayjs.min-DUA92PPA.js";import{T,P as J}from"./PageHeader-DnomRfRw.js";import{T as P,M as B,B as E}from"./Modal-wN5hG3EV.js";import{g as D}from"./upcomingSessions.mock-BMf92Uzb.js";import"./Modal.styles-B_QFbYeL.js";const W=i.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,G=i.button`
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
`,O=i.div`
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
`,H=i.span`
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
`,ee=()=>{const e=N(),[p,z]=l.useState(()=>D()),[t,x]=l.useState(null),[g,f]=l.useState(""),[j,S]=l.useState(""),$=n=>{const o=new Date().getTime(),b=(new Date(n).getTime()-o)/(1e3*60);return b<=30&&b>=-360},I=n=>{x(n),f(n.assessmentSheet.counselorNotes),S(n.assessmentSheet.actionItems)},k=()=>{t&&(z(n=>n.map(o=>o.id===t.id?{...o,assessmentSheet:{...o.assessmentSheet,counselorNotes:g,actionItems:j}}:o)),e.success("Assessment Sheet Saved",`Live session notes and action items for ${t.studentName} have been recorded.`),x(null))},C=l.useMemo(()=>[{key:"studentName",header:"Student Name",accessor:"studentName",cell:n=>s.jsx(T,{content:"Click to view assessment sheet",children:s.jsxs(G,{type:"button",onClick:()=>I(n),children:[s.jsx(M,{size:16}),n.studentName]})})},{key:"sessionTitle",header:"Session Title",accessor:"sessionTitle",cell:n=>s.jsx("span",{style:{fontWeight:500},children:n.sessionTitle})},{key:"dateTime",header:"Date & Time",accessor:"dateTime",cell:n=>{const o=$(n.dateTime);return s.jsxs(O,{children:[s.jsx(U,{children:R(n.dateTime).format("MMM DD, YYYY • h:mm A")}),s.jsx(F,{$canJoin:o,children:o?s.jsxs(s.Fragment,{children:[s.jsx(A,{size:14})," Ready to Join"]}):s.jsxs(s.Fragment,{children:[s.jsx(w,{size:14})," Opens 30 mins prior"]})})]})}},{key:"actions",header:"Action",cell:n=>$(n.dateTime)?s.jsx(h,{size:"sm",variant:"primary",leftIcon:s.jsx(v,{size:16}),onClick:()=>window.open(n.meetUrl,"_blank"),children:"JOIN MEET"}):s.jsx(T,{content:"Join button enables 30 minutes before session start time",children:s.jsx(h,{size:"sm",variant:"secondary",disabled:!0,leftIcon:s.jsx(v,{size:16}),children:"JOIN"})})}],[]);return s.jsxs(W,{children:[s.jsx(J,{title:"Upcoming Counseling Sessions",subtitle:"Manage assigned counseling time slots, join video meetings, and record live student assessment notes",breadcrumbs:[{label:"Upcoming Sessions"}]}),s.jsx(P,{data:p,columns:C,keyExtractor:n=>n.id}),t&&s.jsxs(B,{isOpen:!!t,onClose:()=>x(null),title:`Assessment Sheet — ${t.studentName}`,size:"xl",footer:s.jsxs(s.Fragment,{children:[s.jsx(h,{variant:"secondary",onClick:()=>x(null),children:"Close"}),s.jsx(h,{variant:"primary",leftIcon:s.jsx(L,{size:16}),onClick:k,children:"Save Assessment Notes"})]}),children:[s.jsxs(d,{children:[s.jsx(m,{children:"Student Profile Overview"}),s.jsxs(u,{children:[s.jsxs(a,{children:[s.jsx(r,{children:"Student Email"}),s.jsx(c,{children:t.studentEmail})]}),s.jsxs(a,{children:[s.jsx(r,{children:"Grade & Stream"}),s.jsx(c,{children:t.studentGrade})]}),s.jsxs(a,{children:[s.jsx(r,{children:"Institution"}),s.jsx(c,{children:t.institutionName})]}),s.jsxs(a,{children:[s.jsx(r,{children:"Session Status"}),s.jsx(c,{children:s.jsx(E,{variant:"info",children:t.status})})]})]})]}),s.jsxs(d,{children:[s.jsx(m,{children:"Aptitude & Interest Assessment"}),s.jsxs(u,{children:[s.jsxs(a,{children:[s.jsx(r,{children:"Aptitude Test Score"}),s.jsx(c,{children:t.assessmentSheet.aptitudeScore})]}),s.jsxs(a,{children:[s.jsx(r,{children:"Personality Profile"}),s.jsx(c,{children:t.assessmentSheet.personalityType})]})]}),s.jsxs("div",{style:{marginTop:"12px"},children:[s.jsx(r,{children:"Top Career Interests Identified:"}),s.jsx(Y,{children:t.assessmentSheet.topInterests.map((n,o)=>s.jsx(H,{children:n},o))})]})]}),s.jsxs(d,{children:[s.jsx(m,{children:"Academic Performance"}),s.jsx(u,{style:{gridTemplateColumns:"1fr"},children:s.jsxs(a,{children:[s.jsx(r,{children:"Recent Marks / Grades"}),s.jsx(c,{children:t.assessmentSheet.academicPerformance})]})})]}),s.jsxs(d,{children:[s.jsx(m,{children:"Counselor Live Discussion & Assessment Notes"}),s.jsx(y,{value:g,onChange:n=>f(n.target.value),placeholder:"Record live discussion notes, career advice, and assessment observations..."})]}),s.jsxs(d,{children:[s.jsx(m,{children:"Action Items & Recommendations for Student"}),s.jsx(y,{value:j,onChange:n=>S(n.target.value),placeholder:"Enter recommended next steps, courses, or entrance exam prep for the student..."})]})]})]})};export{ee as UpcomingSessionsPage};
