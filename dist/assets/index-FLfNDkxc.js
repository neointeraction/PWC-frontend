import{g as s,u as ce,bI as de,e as pe,r as c,j as o,i as y,c as b,b as xe,B as x,y as fe,bJ as ue,h as S,aH as R,at as j,aA as P,bC as me,aG as B}from"./index-BVWJ6WpZ.js";import{d as ge}from"./dayjs.min-CTY_jxzB.js";import{T as he}from"./Tooltip-C1eXP5zv.js";const ye=s.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  margin: 0 auto;
`,be=s.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
`,Se=s.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 28px;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  background: linear-gradient(180deg, ${({theme:e})=>e.colors.surface} 0%, ${({theme:e})=>e.colors.background} 100%);
`;s.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 4px;
`;const je=s.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,$e=s.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,ke=s.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.3px;
`,ve=s.p`
  font-size: 14px;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
`,we=s.div`
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
`,De=s.div`
  background-color: ${({theme:e})=>e.colors.warningLight};
  border: 1px solid ${({theme:e})=>e.colors.warning};
  border-left: 4px solid ${({theme:e})=>e.colors.warning};
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  max-width: 640px;
  width: 100%;
  box-shadow: ${({theme:e})=>e.colors.shadow};
`,Ce=s.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
`,ze=s.p`
  font-size: 14px;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
  line-height: 1.6;
`,Te=s.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`,Le=s.div`
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`,Re=s.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 12px 16px 24px 16px;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
`,A=s.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid
    ${({$active:e,$completed:r,theme:n})=>e||r?n.colors.primary:n.colors.border};
  background-color: ${({$active:e,$completed:r,theme:n})=>e?n.colors.primary:r?n.colors.primaryLight:n.colors.surface};
  color: ${({$active:e,$completed:r,theme:n})=>e?"#ffffff":r?n.colors.text:n.colors.textSecondary};
  transition: all 0.2s ease;
  white-space: nowrap;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: flex-start;
  }
`,E=s.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  background-color: ${({$active:e,$completed:r,theme:n})=>e?"rgba(255, 255, 255, 0.25)":r?n.colors.primary:n.colors.background};
  color: ${({$active:e,$completed:r,theme:n})=>e||r?"#ffffff":n.colors.textSecondary};
  border: 1px solid
    ${({$active:e,$completed:r,theme:n})=>e||r?"transparent":n.colors.border};
`,_=s.span`
  font-size: 13px;
  font-weight: ${({$active:e,$completed:r})=>e||r?"700":"500"};
  color: ${({$active:e,$completed:r,theme:n})=>e?"#ffffff":r?n.colors.text:n.colors.textSecondary};
`,Pe=s.div`
  flex: 1;
  height: 2px;
  min-width: 30px;
  margin: 0 12px;
  background-color: ${({$completed:e,theme:r})=>e?r.colors.primary:r.colors.border};
  transition: background-color 0.2s ease;

  @media (max-width: 640px) {
    display: none;
  }
`,$=s.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,k=s.h2`
  font-size: 17px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`,f=s.p`
  font-size: 13px;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
`;s.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background-color: ${({theme:e})=>e.colors.primaryLight};
  border: 1px solid ${({theme:e})=>e.colors.primary};
  border-radius: 4px;
`;s.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${({theme:e})=>e.colors.primary};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
`;s.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;s.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
`;s.span`
  font-size: 13px;
  color: ${({theme:e})=>e.colors.textSecondary};
`;const M=s.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  width: 100%;
`,I=s.div`
  display: flex;
  align-items: center;
  gap: 12px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 6px 2px;
  flex: 1;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`,F=s.button`
  width: 36px;
  height: 36px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }

  &:active {
    transform: scale(0.96);
  }
`;s.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 12px;
`;const W=s.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 14px 16px;
  min-width: 110px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid
    ${({$selected:e,theme:r})=>e?r.colors.primary:r.colors.border};
  background-color: ${({$selected:e,theme:r})=>e?r.colors.primaryLight:r.colors.surface};
  color: ${({$selected:e,theme:r})=>e?r.colors.text:r.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
    color: ${({theme:e})=>e.colors.text};
  }
`,N=s.span`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.8;
`,O=s.span`
  font-size: 16px;
  font-weight: 800;
`,G=s.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
`,H=s.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 4px;
  border: 1px solid
    ${({$selected:e,theme:r})=>e?r.colors.primary:r.colors.border};
  background-color: ${({$selected:e,theme:r})=>e?r.colors.primary:r.colors.surface};
  color: ${({$selected:e,theme:r})=>e?"#ffffff":r.colors.text};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: ${({$disabled:e})=>e?.4:1};
  pointer-events: ${({$disabled:e})=>e?"none":"auto"};

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    background-color: ${({$selected:e,theme:r})=>e?r.colors.primary:r.colors.primaryLight};
    color: ${({$selected:e,theme:r})=>e?"#ffffff":r.colors.primary};
  }
`,U=s.div`
  background-color: ${({theme:e})=>e.colors.successLight};
  border: 1px solid ${({theme:e})=>e.name==="dark"?"#166534":"#a7f3d0"};
  border-left: 4px solid ${({theme:e})=>e.colors.success};
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`,J=s.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Y=s.span`
  font-size: 12px;
  font-weight: 700;
  color: ${({theme:e})=>e.name==="dark"?"#4ADE80":"#047857"};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,V=s.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({theme:e})=>e.name==="dark"?"#86EFAC":"#065f46"};
`,Be=s.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  background-color: ${({theme:e})=>e.colors.background};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
`,K=s.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
`;s.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 8px;
`;s.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 4px;
  background-color: ${({$bg:e})=>e};
  color: ${({$color:e})=>e};
  font-size: 12px;
  font-weight: 700;
`;const Ae=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 28px;
  background-color: ${({theme:e})=>e.colors.background};
  border-top: 1px solid ${({theme:e})=>e.colors.border};
`,q=[{fullDate:"2026-05-12",day:"Tue",number:"May 12"},{fullDate:"2026-05-13",day:"Wed",number:"May 13"},{fullDate:"2026-05-14",day:"Thu",number:"May 14"},{fullDate:"2026-05-15",day:"Fri",number:"May 15"},{fullDate:"2026-05-16",day:"Sat",number:"May 16"},{fullDate:"2026-05-18",day:"Mon",number:"May 18"},{fullDate:"2026-05-19",day:"Tue",number:"May 19"},{fullDate:"2026-05-20",day:"Wed",number:"May 20"},{fullDate:"2026-05-21",day:"Thu",number:"May 21"},{fullDate:"2026-05-22",day:"Fri",number:"May 22"},{fullDate:"2026-05-23",day:"Sat",number:"May 23"},{fullDate:"2026-05-25",day:"Mon",number:"May 25"},{fullDate:"2026-05-26",day:"Tue",number:"May 26"},{fullDate:"2026-05-27",day:"Wed",number:"May 27"},{fullDate:"2026-05-28",day:"Thu",number:"May 28"},{fullDate:"2026-05-29",day:"Fri",number:"May 29"},{fullDate:"2026-05-30",day:"Sat",number:"May 30"},{fullDate:"2026-06-01",day:"Mon",number:"Jun 01"},{fullDate:"2026-06-02",day:"Tue",number:"Jun 02"},{fullDate:"2026-06-03",day:"Wed",number:"Jun 03"},{fullDate:"2026-06-04",day:"Thu",number:"Jun 04"},{fullDate:"2026-06-05",day:"Fri",number:"Jun 05"}],Q=["10:00 - 11:00","11:30 - 12:30","14:00 - 15:00","15:30 - 16:30","17:00 - 18:00","18:30 - 19:30"],Ie=()=>{const e=ce(),[r]=de(),n=pe(),v=r.get("session")||r.get("reschedule"),X=localStorage.getItem("pwc_session_1_completed")==="true",l=v==="2"||X&&v!=="1",[Z,w]=c.useState(!1),[t,D]=c.useState(1),[d,ee]=c.useState(()=>{var i;return((i=localStorage.getItem("pwc_session_1_slot"))==null?void 0:i.split(" ")[0])||"2026-05-12"}),[u,oe]=c.useState("17:00 - 18:00"),m=c.useMemo(()=>{const i=ge(d).add(2,"day").format("YYYY-MM-DD");return q.filter(h=>h.fullDate>=i).slice(0,3)},[d]),[a,C]=c.useState("2026-05-14"),[p,se]=c.useState("17:00 - 18:00");c.useEffect(()=>{m.length>0&&!m.some(i=>i.fullDate===a)&&C(m[0].fullDate)},[m,a]);const g=c.useRef(null),re=c.useRef(null),z=(i,L)=>{if(i.current){const h=L==="left"?-220:220;i.current.scrollBy({left:h,behavior:"smooth"})}};c.useEffect(()=>{const i=localStorage.getItem("pwc_parent_form_submitted")==="true";w(i)},[]);const ie=i=>{ee(i)},ne=()=>{localStorage.setItem("pwc_parent_form_submitted","true"),w(!0),n.success("Parent Assessment Completed!","Parent form marked as submitted. Session booking unlocked!")},te=()=>{n.info("Parent Assessment Link Sent","Form link sent to parent email & WhatsApp number.")},le=()=>{const i=`${window.location.origin}${b.PARENT_PRE_COUNSELLING_FORM}`;navigator.clipboard.writeText(i),n.success("Parent Form Link Copied!","Pre-Counselling Form Parent link copied to clipboard.")},T=()=>{if(!l&&(!d||!u)){n.warning("Select Session 1 Slot","Please choose a date and time slot for Session 1.");return}if(!a||!p){n.warning("Select Session 2 Slot","Please choose a date and time slot for Session 2.");return}l?n.success("Session 2 Slot Saved",`Session 2: ${a} • ${p}`):n.success("Session Slots Saved",`Session 1: ${d} • Session 2: ${a}`),D(2)},ae=()=>{localStorage.setItem("pwc_sessions_booked","true"),l||localStorage.setItem("pwc_session_1_slot",`${d} ${u}`),localStorage.setItem("pwc_session_2_slot",`${a} ${p}`),l?n.success("Session 2 Rescheduled Successfully!",`New Slot: ${a} • ${p}`):n.success("Sessions 1 & 2 Booked Successfully!","Confirmation notifications dispatched to Student, Parent, and Counsellor."),e(b.STUDENT_PORTAL)};return o.jsx(ye,{children:o.jsxs(be,{children:[o.jsxs(Se,{children:[o.jsx(he,{content:"Back to Student Portal",position:"right",children:o.jsx($e,{type:"button",onClick:()=>e(b.STUDENT_PORTAL),"aria-label":"Back to Student Portal",children:o.jsx(y,{size:18})})}),o.jsxs(je,{children:[o.jsx(ke,{children:l?"RESCHEDULE SESSION 2":"BOOK YOUR COUNSELLING SESSIONS"}),o.jsx(ve,{children:l?"Select a new date & time slot for Session 2 (Roadmap & Recommendations)":"Schedule 1-on-1 Guidance Calls (Session 1 & Session 2)"})]})]}),Z?o.jsxs(Le,{children:[o.jsxs(Re,{children:[o.jsxs(A,{$active:t===1,$completed:t>1,children:[o.jsx(E,{$active:t===1,$completed:t>1,children:t>1?o.jsx(S,{size:14}):"1"}),o.jsx(_,{$active:t===1,$completed:t>1,children:l?"Select Session 2 Slot":"Select Session Slots (Session 1 & 2)"})]}),o.jsx(Pe,{$completed:t>1}),o.jsxs(A,{$active:t===2,$completed:t>2,children:[o.jsx(E,{$active:t===2,$completed:t>2,children:"2"}),o.jsx(_,{$active:t===2,$completed:t>2,children:"Final Confirmation"})]})]}),t===1&&o.jsxs(o.Fragment,{children:[!l&&o.jsxs(o.Fragment,{children:[o.jsxs($,{children:[o.jsxs(k,{children:[o.jsx(R,{size:20,style:{color:"#2563EB"}}),o.jsx("span",{children:"Select Date & Time Slot for Session 1 (Discovery & Assessment Review)"})]}),o.jsx(f,{children:"Choose an available date and 1-hour time slot for your initial 1-on-1 video call."})]}),o.jsxs("div",{children:[o.jsx(f,{style:{fontWeight:700,marginBottom:8,color:"#1E293B"},children:"Available Dates for Session 1:"}),o.jsxs(M,{children:[o.jsx(F,{type:"button","aria-label":"Scroll dates left",onClick:()=>z(g,"left"),children:o.jsx(y,{size:18})}),o.jsx(I,{ref:g,children:q.map(i=>o.jsxs(W,{$selected:d===i.fullDate,onClick:()=>ie(i.fullDate),style:{minWidth:120,flexShrink:0},children:[o.jsx(N,{children:i.day}),o.jsx(O,{children:i.number})]},i.fullDate))}),o.jsx(F,{type:"button","aria-label":"Scroll dates right",onClick:()=>z(g,"right"),children:o.jsx(j,{size:18})})]})]}),o.jsxs("div",{children:[o.jsxs(f,{style:{fontWeight:700,marginBottom:8,color:"#1E293B"},children:["Available Time Slots for Session 1 (",d,"):"]}),o.jsx(G,{children:Q.map(i=>o.jsxs(H,{$selected:u===i,onClick:()=>oe(i),children:[o.jsx(P,{size:16}),o.jsx("span",{children:i})]},i))})]})]}),o.jsxs($,{style:{marginTop:l?0:32},children:[o.jsxs(k,{children:[o.jsx(R,{size:20,style:{color:"#5D2384"}}),o.jsx("span",{children:"Select Date & Time Slot for Session 2 (Roadmap & Recommendations)"})]}),o.jsx(f,{children:"Choose a date for your second session."})]}),o.jsxs("div",{children:[o.jsx(f,{style:{fontWeight:700,marginBottom:8,color:"#1E293B"},children:"Available Dates for Session 2:"}),o.jsx(M,{children:o.jsx(I,{ref:re,style:{justifyContent:"flex-start"},children:m.map(i=>o.jsxs(W,{$selected:a===i.fullDate,onClick:()=>C(i.fullDate),style:{minWidth:120,flexShrink:0},children:[o.jsx(N,{children:i.day}),o.jsx(O,{children:i.number})]},i.fullDate))})})]}),o.jsxs("div",{children:[o.jsxs(f,{style:{fontWeight:700,marginBottom:8,color:"#1E293B"},children:["Available Time Slots for Session 2 (",a,"):"]}),o.jsx(G,{children:Q.map(i=>o.jsxs(H,{$selected:p===i,onClick:()=>se(i),children:[o.jsx(P,{size:16}),o.jsx("span",{children:i})]},i))})]}),l?a&&p&&o.jsxs(U,{children:[o.jsxs(J,{children:[o.jsx(Y,{children:"Selected Session 2 Slot"}),o.jsxs(V,{style:{fontSize:"0.9rem",lineHeight:1.5},children:[o.jsx("strong",{children:"Session 2:"})," ",a," • ",p]})]}),o.jsx(x,{variant:"primary",size:"md",rightIcon:o.jsx(j,{size:16}),onClick:T,children:"Proceed to Final Confirmation"})]}):d&&u&&a&&p&&o.jsxs(U,{children:[o.jsxs(J,{children:[o.jsx(Y,{children:"Selected Counselling Sessions"}),o.jsxs(V,{style:{fontSize:"0.9rem",lineHeight:1.5},children:[o.jsx("strong",{children:"Session 1:"})," ",d," • ",u,o.jsx("br",{}),o.jsx("strong",{children:"Session 2:"})," ",a," • ",p]})]}),o.jsx(x,{variant:"primary",size:"md",rightIcon:o.jsx(j,{size:16}),onClick:T,children:"Proceed to Final Confirmation"})]})]}),t===2&&o.jsxs(Be,{children:[o.jsxs($,{children:[o.jsxs(k,{children:[o.jsx(me,{size:20,style:{color:"#5D2384"}}),o.jsx("span",{children:l?"Review & Confirm Session 2 Reschedule":"Review & Confirm Session Booking"})]}),o.jsx(f,{children:l?"Please double check your updated Session 2 slot below.":"Please double check your scheduled 1-on-1 sessions below."})]}),!l&&o.jsxs(K,{children:[o.jsx(B,{size:24,style:{color:"#2563EB",flexShrink:0,marginTop:2}}),o.jsxs("div",{children:[o.jsx("strong",{children:"Session 1 (Discovery & Assessment)"}),o.jsx("br",{}),o.jsxs("span",{children:["Date: ",d," • Time: ",u]})]})]}),o.jsxs(K,{children:[o.jsx(B,{size:24,style:{color:"#5D2384",flexShrink:0,marginTop:2}}),o.jsxs("div",{children:[o.jsx("strong",{children:"Session 2 (Roadmap & Recommendations)"}),o.jsx("br",{}),o.jsxs("span",{children:["Date: ",a," • Time: ",p]})]})]}),o.jsxs(Ae,{children:[o.jsx(x,{type:"button",variant:"secondary",size:"md",leftIcon:o.jsx(y,{size:16}),onClick:()=>D(1),children:"Back to Slot Selection"}),o.jsx(x,{type:"button",variant:"primary",size:"md",leftIcon:o.jsx(S,{size:16}),onClick:ae,children:l?"Confirm & Reschedule Session 2":"Confirm Both Sessions & Book Now"})]})]})]}):o.jsx(we,{children:o.jsxs(De,{children:[o.jsxs(Ce,{children:[o.jsx(xe,{size:24,style:{color:"#D97706"}}),o.jsx("span",{children:"Parent Pre-Counselling Assessment Pending"})]}),o.jsx(ze,{children:"Session booking can only be done after your parent submits their pre-counselling assessment form. Once your parent completes the assessment, this scheduling workspace will unlock automatically."}),o.jsxs(Te,{children:[o.jsx(x,{variant:"secondary",size:"md",leftIcon:o.jsx(fe,{size:16}),onClick:le,children:"Copy Pre-Counselling Form Parent Link"}),o.jsx(x,{variant:"secondary",size:"md",leftIcon:o.jsx(ue,{size:16}),onClick:te,children:"Resend Parent Link"}),o.jsx(x,{variant:"primary",size:"md",leftIcon:o.jsx(S,{size:16}),onClick:ne,children:"Simulate Parent Form Completion"})]})]})})]})})};export{Ie as BookSessionsPage,Ie as default};
