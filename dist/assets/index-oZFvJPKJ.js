import{g as s,u as ee,e as oe,r as c,j as o,aN as g,c as j,b as re,B as f,S as se,bK as ie,h as $,t as L,aO as k,H as T,bD as ne,v as M}from"./index-DxfnM77Y.js";const te=s.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  margin: 0 auto;
`,le=s.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
`,ae=s.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 28px;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  background: linear-gradient(180deg, ${({theme:e})=>e.colors.surface} 0%, ${({theme:e})=>e.colors.background} 100%);
`,ce=s.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 4px;
`,de=s.button`
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

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,pe=s.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
  letter-spacing: -0.3px;
`,xe=s.p`
  font-size: 14px;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
`,fe=s.div`
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
`,ue=s.div`
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
`,me=s.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
`,ge=s.p`
  font-size: 14px;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
  line-height: 1.6;
`,he=s.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`,ye=s.div`
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`,be=s.div`
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
`,R=s.div`
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
`,B=s.span`
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
`,A=s.span`
  font-size: 13px;
  font-weight: ${({$active:e,$completed:r})=>e||r?"700":"500"};
  color: ${({$active:e,$completed:r,theme:n})=>e?"#ffffff":r?n.colors.text:n.colors.textSecondary};
`,Se=s.div`
  flex: 1;
  height: 2px;
  min-width: 30px;
  margin: 0 12px;
  background-color: ${({$completed:e,theme:r})=>e?r.colors.primary:r.colors.border};
  transition: background-color 0.2s ease;

  @media (max-width: 640px) {
    display: none;
  }
`,v=s.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,w=s.h2`
  font-size: 17px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`,d=s.p`
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
`;const E=s.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  width: 100%;
`,_=s.div`
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
`,h=s.button`
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
`;const I=s.button`
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
`,F=s.span`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.8;
`,W=s.span`
  font-size: 16px;
  font-weight: 800;
`,N=s.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
`,O=s.button`
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
`,je=s.div`
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
`,$e=s.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,ke=s.span`
  font-size: 12px;
  font-weight: 700;
  color: ${({theme:e})=>e.name==="dark"?"#4ADE80":"#047857"};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,ve=s.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({theme:e})=>e.name==="dark"?"#86EFAC":"#065f46"};
`,we=s.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  background-color: ${({theme:e})=>e.colors.background};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
`,G=s.div`
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
`;const De=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 28px;
  background-color: ${({theme:e})=>e.colors.background};
  border-top: 1px solid ${({theme:e})=>e.colors.border};
`,D=[{fullDate:"2026-05-12",day:"Tue",number:"May 12"},{fullDate:"2026-05-13",day:"Wed",number:"May 13"},{fullDate:"2026-05-14",day:"Thu",number:"May 14"},{fullDate:"2026-05-15",day:"Fri",number:"May 15"},{fullDate:"2026-05-16",day:"Sat",number:"May 16"},{fullDate:"2026-05-18",day:"Mon",number:"May 18"},{fullDate:"2026-05-19",day:"Tue",number:"May 19"},{fullDate:"2026-05-20",day:"Wed",number:"May 20"},{fullDate:"2026-05-21",day:"Thu",number:"May 21"},{fullDate:"2026-05-22",day:"Fri",number:"May 22"},{fullDate:"2026-05-23",day:"Sat",number:"May 23"},{fullDate:"2026-05-25",day:"Mon",number:"May 25"},{fullDate:"2026-05-26",day:"Tue",number:"May 26"},{fullDate:"2026-05-27",day:"Wed",number:"May 27"},{fullDate:"2026-05-28",day:"Thu",number:"May 28"},{fullDate:"2026-05-29",day:"Fri",number:"May 29"},{fullDate:"2026-05-30",day:"Sat",number:"May 30"},{fullDate:"2026-06-01",day:"Mon",number:"Jun 01"},{fullDate:"2026-06-02",day:"Tue",number:"Jun 02"},{fullDate:"2026-06-03",day:"Wed",number:"Jun 03"},{fullDate:"2026-06-04",day:"Thu",number:"Jun 04"},{fullDate:"2026-06-05",day:"Fri",number:"Jun 05"}],H=["10:00 AM - 11:00 AM","11:30 AM - 12:30 PM","02:00 PM - 03:00 PM","03:30 PM - 04:30 PM","05:00 PM - 06:00 PM","06:30 PM - 07:30 PM"],ze=()=>{const e=ee(),r=oe(),[n,C]=c.useState(!1),[t,z]=c.useState(1),[l,J]=c.useState("2026-05-12"),[p,U]=c.useState("05:00 PM - 06:00 PM"),[a,P]=c.useState("2026-05-15"),[x,V]=c.useState("05:00 PM - 06:00 PM"),y=c.useRef(null),b=c.useRef(null),u=(i,m)=>{if(i.current){const S=m==="left"?-220:220;i.current.scrollBy({left:S,behavior:"smooth"})}};c.useEffect(()=>{const i=localStorage.getItem("pwc_parent_form_submitted")==="true";C(i)},[]);const K=i=>{if(J(i),a<=i){const m=D.find(S=>S.fullDate>i);m&&P(m.fullDate)}},Y=()=>{localStorage.setItem("pwc_parent_form_submitted","true"),C(!0),r.success("Parent Assessment Completed!","Parent form marked as submitted. Session booking unlocked!")},q=()=>{r.info("Parent Assessment Link Sent","Form link sent to parent email & WhatsApp number.")},Q=()=>{const i=`${window.location.origin}${j.PARENT_PRE_COUNSELLING_FORM}`;navigator.clipboard.writeText(i),r.success("Parent Form Link Copied!","Pre-Counselling Form Parent link copied to clipboard.")},X=()=>{if(!l||!p){r.warning("Select Session 1 Slot","Please choose a date and time slot for Session 1.");return}if(!a||!x){r.warning("Select Session 2 Slot","Please choose a date and time slot for Session 2.");return}r.success("Session Slots Saved",`Session 1: ${l} • Session 2: ${a}`),z(2)},Z=()=>{localStorage.setItem("pwc_sessions_booked","true"),localStorage.setItem("pwc_session_1_slot",`${l} ${p}`),localStorage.setItem("pwc_session_2_slot",`${a} ${x}`),r.success("Sessions 1 & 2 Booked Successfully!","Confirmation notifications dispatched to Student, Parent, and Counsellor."),e(j.STUDENT_PORTAL)};return o.jsx(te,{children:o.jsxs(le,{children:[o.jsxs(ae,{children:[o.jsx(ce,{children:o.jsx(de,{type:"button",onClick:()=>e(j.STUDENT_PORTAL),"aria-label":"Back to Student Portal",children:o.jsx(g,{size:18})})}),o.jsx(pe,{children:"BOOK YOUR COUNSELLING SESSIONS"}),o.jsx(xe,{children:"Schedule 1-on-1 Guidance Calls (Session 1 & Session 2) with Senior Counsellor Sarah Jenkins (M.Sc Psych)"})]}),n?o.jsxs(ye,{children:[o.jsxs(be,{children:[o.jsxs(R,{$active:t===1,$completed:t>1,children:[o.jsx(B,{$active:t===1,$completed:t>1,children:t>1?o.jsx($,{size:14}):"1"}),o.jsx(A,{$active:t===1,$completed:t>1,children:"Select Session Slots (Session 1 & 2)"})]}),o.jsx(Se,{$completed:t>1}),o.jsxs(R,{$active:t===2,$completed:t>2,children:[o.jsx(B,{$active:t===2,$completed:t>2,children:"2"}),o.jsx(A,{$active:t===2,$completed:t>2,children:"Final Confirmation"})]})]}),t===1&&o.jsxs(o.Fragment,{children:[o.jsxs(v,{children:[o.jsxs(w,{children:[o.jsx(L,{size:20,style:{color:"#2563EB"}}),o.jsx("span",{children:"Select Date & Time Slot for Session 1 (Discovery & Assessment Review)"})]}),o.jsx(d,{children:"Choose an available date and 1-hour time slot for your initial 1-on-1 video call."})]}),o.jsxs("div",{children:[o.jsx(d,{style:{fontWeight:700,marginBottom:8,color:"#1E293B"},children:"Available Dates for Session 1:"}),o.jsxs(E,{children:[o.jsx(h,{type:"button","aria-label":"Scroll dates left",onClick:()=>u(y,"left"),children:o.jsx(g,{size:18})}),o.jsx(_,{ref:y,children:D.map(i=>o.jsxs(I,{$selected:l===i.fullDate,onClick:()=>K(i.fullDate),style:{minWidth:120,flexShrink:0},children:[o.jsx(F,{children:i.day}),o.jsx(W,{children:i.number})]},i.fullDate))}),o.jsx(h,{type:"button","aria-label":"Scroll dates right",onClick:()=>u(y,"right"),children:o.jsx(k,{size:18})})]})]}),o.jsxs("div",{children:[o.jsxs(d,{style:{fontWeight:700,marginBottom:8,color:"#1E293B"},children:["Available Time Slots for Session 1 (",l,"):"]}),o.jsx(N,{children:H.map(i=>o.jsxs(O,{$selected:p===i,onClick:()=>U(i),children:[o.jsx(T,{size:16}),o.jsx("span",{children:i})]},i))})]}),o.jsxs(v,{style:{marginTop:32},children:[o.jsxs(w,{children:[o.jsx(L,{size:20,style:{color:"#5D2384"}}),o.jsx("span",{children:"Select Date & Time Slot for Session 2 (Roadmap & Recommendations)"})]}),o.jsx(d,{children:"Choose a date for your second session (Recommended 3–5 days after Session 1)."})]}),o.jsxs("div",{children:[o.jsx(d,{style:{fontWeight:700,marginBottom:8,color:"#1E293B"},children:"Available Dates for Session 2:"}),o.jsxs(E,{children:[o.jsx(h,{type:"button","aria-label":"Scroll dates left",onClick:()=>u(b,"left"),children:o.jsx(g,{size:18})}),o.jsx(_,{ref:b,children:D.filter(i=>i.fullDate>l).map(i=>o.jsxs(I,{$selected:a===i.fullDate,onClick:()=>P(i.fullDate),style:{minWidth:120,flexShrink:0},children:[o.jsx(F,{children:i.day}),o.jsx(W,{children:i.number})]},i.fullDate))}),o.jsx(h,{type:"button","aria-label":"Scroll dates right",onClick:()=>u(b,"right"),children:o.jsx(k,{size:18})})]})]}),o.jsxs("div",{children:[o.jsxs(d,{style:{fontWeight:700,marginBottom:8,color:"#1E293B"},children:["Available Time Slots for Session 2 (",a,"):"]}),o.jsx(N,{children:H.map(i=>o.jsxs(O,{$selected:x===i,onClick:()=>V(i),children:[o.jsx(T,{size:16}),o.jsx("span",{children:i})]},i))})]}),l&&p&&a&&x&&o.jsxs(je,{children:[o.jsxs($e,{children:[o.jsx(ke,{children:"Selected Counselling Sessions"}),o.jsxs(ve,{style:{fontSize:"0.9rem",lineHeight:1.5},children:[o.jsx("strong",{children:"Session 1:"})," ",l," • ",p,o.jsx("br",{}),o.jsx("strong",{children:"Session 2:"})," ",a," • ",x]})]}),o.jsx(f,{variant:"primary",size:"md",rightIcon:o.jsx(k,{size:16}),onClick:X,children:"Proceed to Final Confirmation"})]})]}),t===2&&o.jsxs(we,{children:[o.jsxs(v,{children:[o.jsxs(w,{children:[o.jsx(ne,{size:20,style:{color:"#5D2384"}}),o.jsx("span",{children:"Review & Confirm Session Booking"})]}),o.jsx(d,{children:"Please double check your scheduled 1-on-1 sessions below."})]}),o.jsxs(G,{children:[o.jsx(M,{size:24,style:{color:"#2563EB",flexShrink:0,marginTop:2}}),o.jsxs("div",{children:[o.jsx("strong",{children:"Session 1 (Discovery & Assessment)"}),o.jsx("br",{}),o.jsxs("span",{children:["Date: ",l," • Time: ",p]})]})]}),o.jsxs(G,{children:[o.jsx(M,{size:24,style:{color:"#5D2384",flexShrink:0,marginTop:2}}),o.jsxs("div",{children:[o.jsx("strong",{children:"Session 2 (Roadmap & Recommendations)"}),o.jsx("br",{}),o.jsxs("span",{children:["Date: ",a," • Time: ",x]})]})]}),o.jsxs(De,{children:[o.jsx(f,{type:"button",variant:"secondary",size:"md",leftIcon:o.jsx(g,{size:16}),onClick:()=>z(1),children:"Back to Slot Selection"}),o.jsx(f,{type:"button",variant:"primary",size:"md",leftIcon:o.jsx($,{size:16}),onClick:Z,children:"Confirm Both Sessions & Book Now"})]})]})]}):o.jsx(fe,{children:o.jsxs(ue,{children:[o.jsxs(me,{children:[o.jsx(re,{size:24,style:{color:"#D97706"}}),o.jsx("span",{children:"Parent Pre-Counselling Assessment Pending"})]}),o.jsx(ge,{children:"Session booking can only be done after your parent submits their pre-counselling assessment form. Once your parent completes the assessment, this scheduling workspace will unlock automatically."}),o.jsxs(he,{children:[o.jsx(f,{variant:"secondary",size:"md",leftIcon:o.jsx(se,{size:16}),onClick:Q,children:"Copy Pre-Counselling Form Parent Link"}),o.jsx(f,{variant:"secondary",size:"md",leftIcon:o.jsx(ie,{size:16}),onClick:q,children:"Resend Parent Link"}),o.jsx(f,{variant:"primary",size:"md",leftIcon:o.jsx($,{size:16}),onClick:Y,children:"Simulate Parent Form Completion"})]})]})})]})})};export{ze as BookSessionsPage,ze as default};
