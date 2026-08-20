import{g as t,u as N,r,j as e,B as m,R as A,aX as O,aA as Y,aY as F,aZ as E,aG as T,a_ as J,c as U}from"./index-a7zXg0JL.js";import{d as u}from"./dayjs.min-CjryL_qL.js";import{C as H}from"./Card-DKKLy9Mw.js";import{P}from"./PageHeader-DdaifotM.js";import{T as _}from"./Table-BsJCxA-K.js";import{T as w}from"./Tooltip-D_2DC_R7.js";import{D as G}from"./DatePicker-5FKg75ZV.js";import{g as K}from"./upcomingSessions.mock-B_MecF99.js";import"./Card.styles-MXf9i3yh.js";import"./Breadcrumb-CswGd06t.js";import"./Checkbox-CyX2E4EW.js";import"./Select-BAabmZ1Y.js";import"./Table.styles-Cb89hldY.js";const W=t.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,X=t.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: fit-content;
  max-width: 100%;
`,V=t.button`
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: 4px;
  padding: 12px 18px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);

  &:hover {
    border-color: ${({theme:o})=>o.colors.primary};
  }
`,Z=t.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,C=t.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`,v=t.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({theme:o})=>o.colors.text};
`,D=t.span`
  display: inline-flex;
  align-items: center;
  background-color: rgba(245, 158, 11, 0.12);
  color: #D97706;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
`,q=t.span`
  display: inline-flex;
  align-items: center;
  background-color: ${({theme:o})=>o.colors.successLight};
  color: ${({theme:o})=>o.colors.success};
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`,k=t.span`
  font-size: 12px;
  color: ${({theme:o})=>o.colors.textSecondary};
`,Q=t.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 50;
  min-width: 320px;
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: 4px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`,ee=t.button`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  border: none;
  background-color: ${({$isSelected:o,theme:n})=>o?n.colors.primaryLight:"transparent"};
  color: ${({theme:o})=>o.colors.text};
  text-align: left;
  cursor: pointer;
  transition: background-color 0.15s ease;
  border-bottom: 1px solid ${({theme:o})=>o.colors.border};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({theme:o})=>o.colors.surfaceHover};
  }
`,oe=t.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,g=t.div`
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
`,h=t.div`
  background-color: ${({theme:o})=>o.colors.primaryLight};
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 700;
  color: ${({theme:o})=>o.colors.primary};
  border-bottom: 1px solid rgba(93, 35, 132, 0.08);
`,f=t.div`
  padding: 16px;
  font-size: 24px;
  font-weight: 800;
  color: ${({theme:o})=>o.colors.text};
`,se=t.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`,te=t.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,ne=t.button`
  background: none;
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({theme:o})=>o.colors.primary};
    border-color: ${({theme:o})=>o.colors.primary};
  }
`,ie=t.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,re=t.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.text};
`,ae=t.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: ${({$canJoin:o,theme:n})=>o?n.colors.success:n.colors.textSecondary};
`,le=t.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
`,ce=t.span`
  font-size: 12px;
  color: ${({theme:o})=>o.colors.textSecondary};
`,de=t.button`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  font-weight: 700;
  color: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`,$=[{id:"inst-001",name:"St. Xavier's College, Mumbai",code:"INS001",location:"Mumbai, Maharashtra",status:"Ongoing",totalAllotted:62,session1Balance:18,session2Balance:26},{id:"inst-002",name:"Delhi Public School, Kochi",code:"INS002",location:"Kochi, Kerala",status:"Ongoing",totalAllotted:45,session1Balance:12,session2Balance:19},{id:"inst-003",name:"Loyola College, Chennai",code:"INS003",location:"Chennai, Tamil Nadu",status:"Ongoing",totalAllotted:30,session1Balance:8,session2Balance:14}],Ce=()=>{const o=N(),[n,I]=r.useState($[0]),[b,d]=r.useState(!1),[j]=r.useState(()=>K()),[a,y]=r.useState(""),[c,z]=r.useState("asc"),p=r.useRef(null);r.useEffect(()=>{const s=i=>{p.current&&!p.current.contains(i.target)&&d(!1)};return document.addEventListener("mousedown",s),()=>document.removeEventListener("mousedown",s)},[]);const B=r.useMemo(()=>j.filter(s=>a?u(s.dateTime).format("YYYY-MM-DD")===a:!0).sort((s,i)=>{const x=new Date(s.dateTime).getTime(),l=new Date(i.dateTime).getTime();return c==="asc"?x-l:l-x}),[j,a,c]),M=()=>{z(s=>s==="asc"?"desc":"asc")},S=s=>{const i=new Date().getTime(),l=(new Date(s).getTime()-i)/(1e3*60);return l<=30&&l>=-360},L=s=>{o(U.COUNSELOR_STUDENT_CHART.replace(":sessionId",s.id))},R=r.useMemo(()=>[{key:"studentName",header:"Student Name",accessor:"studentName",cell:s=>e.jsxs(le,{children:[e.jsx(w,{content:"Click to open Counsellor Form Chart & add session notes",children:e.jsx(m,{size:"sm",variant:"secondary",leftIcon:e.jsx(A,{size:16}),onClick:()=>L(s),children:s.studentName})}),e.jsx(ce,{children:s.studentGrade})]})},{key:"dateTime",header:e.jsxs(de,{type:"button",onClick:M,children:["Date & Time",c==="asc"?e.jsx(F,{size:14}):e.jsx(E,{size:14})]}),accessor:"dateTime",sortable:!0,cell:s=>{const i=S(s.dateTime);return e.jsxs(ie,{children:[e.jsx(re,{children:u(s.dateTime).format("DD-MM-YYYY • HH:mm")}),e.jsx(ae,{$canJoin:i,children:i?e.jsxs(e.Fragment,{children:[e.jsx(O,{size:14})," Ready to Join"]}):e.jsxs(e.Fragment,{children:[e.jsx(Y,{size:14})," Opens 30 mins prior"]})})]})}},{key:"sessions",header:"Sessions",cell:s=>S(s.dateTime)?e.jsx(m,{size:"sm",variant:"primary",leftIcon:e.jsx(T,{size:16}),onClick:()=>window.open(s.meetUrl,"_blank"),children:"Join Session"}):e.jsx(w,{content:"Join button enables 30 minutes before session start time",children:e.jsx(m,{size:"sm",variant:"secondary",disabled:!0,leftIcon:e.jsx(T,{size:16}),children:"Join Session"})})}],[c]);return e.jsxs(W,{children:[e.jsx(P,{title:"All Sessions"}),e.jsxs(X,{ref:p,children:[e.jsxs(V,{type:"button",onClick:()=>d(s=>!s),"aria-expanded":b,children:[e.jsxs(Z,{children:[e.jsxs(C,{children:[e.jsx(v,{children:n.name}),e.jsx(D,{children:n.code}),e.jsx(q,{children:n.status})]}),e.jsx(k,{children:n.location})]}),e.jsx(J,{size:20,style:{color:"#64748B"}})]}),b&&e.jsx(Q,{children:$.map(s=>e.jsxs(ee,{type:"button",$isSelected:s.id===n.id,onClick:()=>{I(s),d(!1)},children:[e.jsxs(C,{children:[e.jsx(v,{children:s.name}),e.jsx(D,{children:s.code})]}),e.jsx(k,{children:s.location})]},s.id))})]}),e.jsxs(oe,{children:[e.jsxs(g,{children:[e.jsx(h,{children:"Total Allotted"}),e.jsx(f,{children:n.totalAllotted})]}),e.jsxs(g,{children:[e.jsx(h,{children:"Session 1 Balance"}),e.jsx(f,{children:n.session1Balance})]}),e.jsxs(g,{children:[e.jsx(h,{children:"Session 2 Balance"}),e.jsx(f,{children:n.session2Balance})]})]}),e.jsxs(H,{children:[e.jsx(se,{children:e.jsxs(te,{children:[e.jsx("div",{style:{width:"220px"},children:e.jsx(G,{selected:a?new Date(a):null,onChange:s=>y(s?u(s).format("YYYY-MM-DD"):""),placeholderText:"Filter by date",isClearable:!0})}),a&&e.jsx(ne,{type:"button",onClick:()=>y(""),children:"Clear Filter"})]})}),e.jsx(_,{data:B,columns:R,keyExtractor:s=>s.id,emptyMessage:"No sessions found for the selected date."})]})]})};export{Ce as AllSessionsPage};
