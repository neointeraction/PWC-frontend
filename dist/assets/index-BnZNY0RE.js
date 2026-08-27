import{g as t,u as M,r as i,j as e,B as m,R as L,aY as R,aZ as E,a_ as O,aA as Y,aH as k,a$ as U,c as J}from"./index-CQIsxyVc.js";import{d}from"./dayjs.min-CG_gW1pj.js";import{C as H}from"./Card-DBSouhuv.js";import{P}from"./PageHeader-BviCOs3E.js";import{T as _}from"./Table-5vznqd6X.js";import{T}from"./Tooltip-5yEO6vap.js";import{D as G}from"./DatePicker-Ca_VHuKP.js";import{g as W}from"./upcomingSessions.mock-cDxNZ5Vc.js";import"./Card.styles-riY3W49l.js";import"./Breadcrumb-CQhppWVK.js";import"./Checkbox-BLQlg_i7.js";import"./Select-DE5um1RR.js";import"./Table.styles-BoafHu4m.js";const K=t.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,V=t.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: fit-content;
  max-width: 100%;
`,X=t.button`
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
`,$=t.span`
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
`,w=t.span`
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
`,f=t.div`
  background-color: ${({theme:o})=>o.colors.primaryLight};
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 700;
  color: ${({theme:o})=>o.colors.primary};
  border-bottom: 1px solid rgba(93, 35, 132, 0.08);
`,h=t.div`
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
`,re=t.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,ie=t.span`
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
`,pe=t.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.text};
`,xe=t.span`
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
  ${({$session:o,theme:n})=>o==="S1"?`
        background-color: ${n.colors.primaryLight||"#F4ECF8"};
        color: ${n.colors.primary||"#5D2384"};
        border-color: ${n.colors.primary}40;
      `:o==="S2"?`
        background-color: #FFF7ED;
        color: #EA580C;
        border-color: #FDBA74;
      `:`
      background-color: ${n.colors.background};
      color: ${n.colors.textSecondary};
      border-color: ${n.colors.border};
    `}
`,v=[{id:"inst-001",name:"St. Xavier's College, Mumbai",code:"INS001",location:"Mumbai, Maharashtra",status:"Ongoing",totalAllotted:62,session1Balance:18,session2Balance:26},{id:"inst-002",name:"Delhi Public School, Kochi",code:"INS002",location:"Kochi, Kerala",status:"Ongoing",totalAllotted:45,session1Balance:12,session2Balance:19},{id:"inst-003",name:"Loyola College, Chennai",code:"INS003",location:"Chennai, Tamil Nadu",status:"Ongoing",totalAllotted:30,session1Balance:8,session2Balance:14}],De=()=>{const o=M(),[n,B]=i.useState(v[0]),[b,p]=i.useState(!1),[j]=i.useState(()=>W()),[a,y]=i.useState(""),[c,z]=i.useState("asc"),x=i.useRef(null);i.useEffect(()=>{const s=r=>{x.current&&!x.current.contains(r.target)&&p(!1)};return document.addEventListener("mousedown",s),()=>document.removeEventListener("mousedown",s)},[]);const I=i.useMemo(()=>j.filter(s=>a?d(s.dateTime).format("YYYY-MM-DD")===a:!0).sort((s,r)=>{const u=new Date(s.dateTime).getTime(),l=new Date(r.dateTime).getTime();return c==="asc"?u-l:l-u}),[j,a,c]),N=()=>{z(s=>s==="asc"?"desc":"asc")},S=s=>{const r=new Date().getTime(),l=(new Date(s).getTime()-r)/(1e3*60);return l<=30&&l>=-360},A=s=>{o(J.COUNSELOR_STUDENT_CHART.replace(":sessionId",s.id))},F=i.useMemo(()=>[{key:"studentName",header:"Student Name",accessor:"studentName",cell:s=>e.jsxs(le,{children:[s.isBooked&&s.studentName?e.jsx(T,{content:"Click to open Counsellor Form Chart & add session notes",children:e.jsx(m,{size:"sm",variant:"secondary",leftIcon:e.jsx(L,{size:16}),onClick:()=>A(s),children:s.studentName})}):e.jsx("span",{style:{fontStyle:"italic",color:"#94A3B8",fontWeight:600,fontSize:"0.85rem",padding:"4px 0"},children:"Unbooked Slot"}),e.jsxs(ce,{children:[s.institutionName,s.studentGrade?` • ${s.studentGrade}`:""]})]})},{key:"date",header:e.jsxs(de,{type:"button",onClick:N,children:["Date",c==="asc"?e.jsx(R,{size:14}):e.jsx(E,{size:14})]}),accessor:"dateTime",sortable:!0,cell:s=>e.jsx(pe,{children:d(s.dateTime).format("DD MMM YYYY")})},{key:"time",header:"Time",cell:s=>{const r=s.isBooked?S(s.dateTime):!1;return e.jsxs(re,{children:[e.jsx(ie,{children:s.timeSlot||d(s.dateTime).format("HH:mm")}),s.isBooked?e.jsx(ae,{$canJoin:r,children:r?e.jsxs(e.Fragment,{children:[e.jsx(O,{size:14})," Ready to Join"]}):e.jsxs(e.Fragment,{children:[e.jsx(Y,{size:14})," Opens 30 mins prior"]})}):e.jsx("span",{style:{fontSize:"11px",color:"#64748B",fontStyle:"italic"},children:"Available for Booking"})]})}},{key:"sessionNumber",header:"Session",cell:s=>s.sessionNumber?e.jsx(xe,{$session:s.sessionNumber,children:s.sessionNumber}):e.jsx("span",{style:{color:"#94A3B8"},children:"—"})},{key:"actions",header:"Action",cell:s=>s.isBooked?S(s.dateTime)?e.jsx(m,{size:"sm",variant:"primary",leftIcon:e.jsx(k,{size:16}),onClick:()=>window.open(s.meetUrl,"_blank"),children:"Join Session"}):e.jsx(T,{content:"Join button enables 30 minutes before session start time",children:e.jsx(m,{size:"sm",variant:"secondary",disabled:!0,leftIcon:e.jsx(k,{size:16}),children:"Join Session"})}):e.jsx("span",{style:{fontSize:"0.8rem",fontWeight:600,color:"#64748B",backgroundColor:"#F1F5F9",padding:"4px 10px",borderRadius:"4px",border:"1px solid #E2E8F0"},children:"Unbooked"})}],[c]);return e.jsxs(K,{children:[e.jsx(P,{title:"All Sessions"}),e.jsxs(V,{ref:x,children:[e.jsxs(X,{type:"button",onClick:()=>p(s=>!s),"aria-expanded":b,children:[e.jsxs(Z,{children:[e.jsxs(C,{children:[e.jsx($,{children:n.name}),e.jsx(D,{children:n.code}),e.jsx(q,{children:n.status})]}),e.jsx(w,{children:n.location})]}),e.jsx(U,{size:20,style:{color:"#64748B"}})]}),b&&e.jsx(Q,{children:v.map(s=>e.jsxs(ee,{type:"button",$isSelected:s.id===n.id,onClick:()=>{B(s),p(!1)},children:[e.jsxs(C,{children:[e.jsx($,{children:s.name}),e.jsx(D,{children:s.code})]}),e.jsx(w,{children:s.location})]},s.id))})]}),e.jsxs(oe,{children:[e.jsxs(g,{children:[e.jsx(f,{children:"Total Allotted"}),e.jsx(h,{children:n.totalAllotted})]}),e.jsxs(g,{children:[e.jsx(f,{children:"Session 1 Balance"}),e.jsx(h,{children:n.session1Balance})]}),e.jsxs(g,{children:[e.jsx(f,{children:"Session 2 Balance"}),e.jsx(h,{children:n.session2Balance})]})]}),e.jsxs(H,{children:[e.jsx(se,{children:e.jsxs(te,{children:[e.jsx("div",{style:{width:"220px"},children:e.jsx(G,{selected:a?new Date(a):null,onChange:s=>y(s?d(s).format("YYYY-MM-DD"):""),placeholderText:"Filter by date",isClearable:!0})}),a&&e.jsx(ne,{type:"button",onClick:()=>y(""),children:"Clear Filter"})]})}),e.jsx(_,{data:I,columns:F,keyExtractor:s=>s.id,emptyMessage:"No sessions found for the selected date."})]})]})};export{De as AllSessionsPage};
