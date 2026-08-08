import{g as r,u as Z,d as ee,r as x,j as o,aB as k,c as w,b as oe,B as f,bH as g,f as m,bc as C,aG as z,aC as D,bx as se,aX as B,bI as re}from"./index-CormbGNw.js";const ie=r.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  margin: 0 auto;
`,ne=r.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
`,te=r.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 28px;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  background: linear-gradient(180deg, ${({theme:e})=>e.colors.surface} 0%, ${({theme:e})=>e.colors.background} 100%);
`,le=r.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 4px;
`,ae=r.button`
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
`,ce=r.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
  letter-spacing: -0.3px;
`,de=r.p`
  font-size: 14px;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
`,xe=r.div`
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
`,pe=r.div`
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
`,fe=r.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
`,me=r.p`
  font-size: 14px;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
  line-height: 1.6;
`,ue=r.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`,ge=r.div`
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`,he=r.div`
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
`,h=r.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid
    ${({$active:e,$completed:s,theme:t})=>e||s?t.colors.primary:t.colors.border};
  background-color: ${({$active:e,$completed:s,theme:t})=>e?t.colors.primary:s?t.colors.primaryLight:t.colors.surface};
  color: ${({$active:e,$completed:s,theme:t})=>e?"#ffffff":s?t.colors.text:t.colors.textSecondary};
  transition: all 0.2s ease;
  white-space: nowrap;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: flex-start;
  }
`,j=r.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  background-color: ${({$active:e,$completed:s,theme:t})=>e?"rgba(255, 255, 255, 0.25)":s?t.colors.primary:t.colors.background};
  color: ${({$active:e,$completed:s,theme:t})=>e||s?"#ffffff":t.colors.textSecondary};
  border: 1px solid
    ${({$active:e,$completed:s,theme:t})=>e||s?"transparent":t.colors.border};
`,y=r.span`
  font-size: 13px;
  font-weight: ${({$active:e,$completed:s})=>e||s?"700":"500"};
  color: ${({$active:e,$completed:s,theme:t})=>e?"#ffffff":s?t.colors.text:t.colors.textSecondary};
`,P=r.div`
  flex: 1;
  height: 2px;
  min-width: 30px;
  margin: 0 12px;
  background-color: ${({$completed:e,theme:s})=>e?s.colors.primary:s.colors.border};
  transition: background-color 0.2s ease;

  @media (max-width: 640px) {
    display: none;
  }
`,S=r.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,b=r.h2`
  font-size: 17px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`,p=r.p`
  font-size: 13px;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
`,je=r.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background-color: ${({theme:e})=>e.colors.primaryLight};
  border: 1px solid ${({theme:e})=>e.colors.primary};
  border-radius: 4px;
`,ye=r.div`
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
`,Se=r.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,be=r.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
`,$e=r.span`
  font-size: 13px;
  color: ${({theme:e})=>e.colors.textSecondary};
`,A=r.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 12px;
`,L=r.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 14px 10px;
  border-radius: 4px;
  border: 1px solid
    ${({$selected:e,theme:s})=>e?s.colors.primary:s.colors.border};
  background-color: ${({$selected:e,theme:s})=>e?s.colors.primaryLight:s.colors.surface};
  color: ${({$selected:e,theme:s})=>e?s.colors.text:s.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
    color: ${({theme:e})=>e.colors.text};
  }
`,T=r.span`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.8;
`,M=r.span`
  font-size: 16px;
  font-weight: 800;
`,R=r.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
`,E=r.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 4px;
  border: 1px solid
    ${({$selected:e,theme:s})=>e?s.colors.primary:s.colors.border};
  background-color: ${({$selected:e,theme:s})=>e?s.colors.primary:s.colors.surface};
  color: ${({$selected:e,theme:s})=>e?"#ffffff":s.colors.text};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: ${({$disabled:e})=>e?.4:1};
  pointer-events: ${({$disabled:e})=>e?"none":"auto"};

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    background-color: ${({$selected:e,theme:s})=>e?s.colors.primary:s.colors.primaryLight};
    color: ${({$selected:e,theme:s})=>e?"#ffffff":s.colors.primary};
  }
`,I=r.div`
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
`,_=r.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,F=r.span`
  font-size: 12px;
  font-weight: 700;
  color: ${({theme:e})=>e.name==="dark"?"#4ADE80":"#047857"};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,N=r.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({theme:e})=>e.name==="dark"?"#86EFAC":"#065f46"};
`,ve=r.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  background-color: ${({theme:e})=>e.colors.background};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
`,W=r.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
`,ke=r.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 8px;
`,$=r.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 4px;
  background-color: ${({$bg:e})=>e};
  color: ${({$color:e})=>e};
  font-size: 12px;
  font-weight: 700;
`,we=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 28px;
  background-color: ${({theme:e})=>e.colors.background};
  border-top: 1px solid ${({theme:e})=>e.colors.border};
`,O=[{fullDate:"2026-05-12",day:"Tue",number:"May 12"},{fullDate:"2026-05-13",day:"Wed",number:"May 13"},{fullDate:"2026-05-14",day:"Thu",number:"May 14"},{fullDate:"2026-05-15",day:"Fri",number:"May 15"},{fullDate:"2026-05-16",day:"Sat",number:"May 16"},{fullDate:"2026-05-18",day:"Mon",number:"May 18"},{fullDate:"2026-05-19",day:"Tue",number:"May 19"}],G=["10:00 AM - 11:00 AM","11:30 AM - 12:30 PM","02:00 PM - 03:00 PM","03:30 PM - 04:30 PM","05:00 PM - 06:00 PM","06:30 PM - 07:30 PM"],ze=()=>{const e=Z(),s=ee(),[t,v]=x.useState(!1),[i,u]=x.useState(1),[l,J]=x.useState("2026-05-12"),[c,H]=x.useState("05:00 PM - 06:00 PM"),[a,U]=x.useState("2026-05-15"),[d,V]=x.useState("05:00 PM - 06:00 PM");x.useEffect(()=>{const n=localStorage.getItem("pwc_parent_form_submitted")==="true";v(n)},[]);const K=()=>{localStorage.setItem("pwc_parent_form_submitted","true"),v(!0),s.success("Parent Assessment Completed!","Parent form marked as submitted. Session booking unlocked!")},X=()=>{s.info("Parent Assessment Link Sent","Form link sent to parent email & WhatsApp number.")},Y=()=>{if(!l||!c){s.warning("Select Time Slot","Please choose a date and time slot for Session 1.");return}s.success("Session 1 Slot Saved",`Selected: ${l} at ${c}`),u(2)},q=()=>{if(!a||!d){s.warning("Select Time Slot","Please choose a date and time slot for Session 2.");return}s.success("Session 2 Slot Saved",`Selected: ${a} at ${d}`),u(3)},Q=()=>{localStorage.setItem("pwc_sessions_booked","true"),localStorage.setItem("pwc_session_1_slot",`${l} ${c}`),localStorage.setItem("pwc_session_2_slot",`${a} ${d}`),s.success("Sessions 1 & 2 Booked Successfully!","Confirmation notifications dispatched to Student, Parent, and Counsellor."),e(w.STUDENT_PORTAL)};return o.jsx(ie,{children:o.jsxs(ne,{children:[o.jsxs(te,{children:[o.jsx(le,{children:o.jsx(ae,{type:"button",onClick:()=>e(w.STUDENT_PORTAL),"aria-label":"Back to Student Portal",children:o.jsx(k,{size:18})})}),o.jsx(ce,{children:"BOOK YOUR COUNSELLING SESSIONS"}),o.jsx(de,{children:"Schedule 1-on-1 Guidance Calls (Session 1 & Session 2) with Senior Counsellor Sarah Jenkins (M.Sc Psych)"})]}),t?o.jsxs(ge,{children:[o.jsxs(he,{children:[o.jsxs(h,{$active:i===1,$completed:i>1,children:[o.jsx(j,{$active:i===1,$completed:i>1,children:i>1?o.jsx(m,{size:14}):"1"}),o.jsx(y,{$active:i===1,$completed:i>1,children:"Session 1 Slot"})]}),o.jsx(P,{$completed:i>1}),o.jsxs(h,{$active:i===2,$completed:i>2,children:[o.jsx(j,{$active:i===2,$completed:i>2,children:i>2?o.jsx(m,{size:14}):"2"}),o.jsx(y,{$active:i===2,$completed:i>2,children:"Session 2 Slot"})]}),o.jsx(P,{$completed:i>2}),o.jsxs(h,{$active:i===3,$completed:i>3,children:[o.jsx(j,{$active:i===3,$completed:i>3,children:"3"}),o.jsx(y,{$active:i===3,$completed:i>3,children:"Final Confirmation"})]})]}),o.jsxs(je,{children:[o.jsx(ye,{children:"SJ"}),o.jsxs(Se,{children:[o.jsx(be,{children:"Sarah Jenkins, M.Sc Psych"}),o.jsx($e,{children:"Senior Career Counsellor • Assigned to your profile for Session 1 & 2 continuity"})]})]}),i===1&&o.jsxs(o.Fragment,{children:[o.jsxs(S,{children:[o.jsxs(b,{children:[o.jsx(C,{size:20,style:{color:"#2563EB"}}),o.jsx("span",{children:"Select Date & Time Slot for Session 1 (Discovery & Assessment Review)"})]}),o.jsx(p,{children:"Choose an available date and 1-hour time slot for your initial 1-on-1 video call."})]}),o.jsxs("div",{children:[o.jsx(p,{style:{fontWeight:700,marginBottom:8,color:"#1E293B"},children:"Available Dates:"}),o.jsx(A,{children:O.map(n=>o.jsxs(L,{$selected:l===n.fullDate,onClick:()=>J(n.fullDate),children:[o.jsx(T,{children:n.day}),o.jsx(M,{children:n.number})]},n.fullDate))})]}),o.jsxs("div",{children:[o.jsxs(p,{style:{fontWeight:700,marginBottom:8,color:"#1E293B"},children:["Available Time Slots for ",l,":"]}),o.jsx(R,{children:G.map(n=>o.jsxs(E,{$selected:c===n,onClick:()=>H(n),children:[o.jsx(z,{size:16}),o.jsx("span",{children:n})]},n))})]}),l&&c&&o.jsxs(I,{children:[o.jsxs(_,{children:[o.jsx(F,{children:"Selected Session 1 Slot"}),o.jsxs(N,{children:[l," • ",c]})]}),o.jsx(f,{variant:"primary",size:"md",rightIcon:o.jsx(D,{size:16}),onClick:Y,children:"Confirm Session 1 Slot"})]})]}),i===2&&o.jsxs(o.Fragment,{children:[o.jsxs(S,{children:[o.jsxs(b,{children:[o.jsx(C,{size:20,style:{color:"#2563EB"}}),o.jsx("span",{children:"Select Date & Time Slot for Session 2 (Roadmap & Recommendations)"})]}),o.jsx(p,{children:"Choose a date for your second session with Sarah Jenkins (Recommended 3–5 days after Session 1)."})]}),o.jsxs("div",{children:[o.jsx(p,{style:{fontWeight:700,marginBottom:8,color:"#1E293B"},children:"Available Dates for Session 2:"}),o.jsx(A,{children:O.filter(n=>n.fullDate>l).map(n=>o.jsxs(L,{$selected:a===n.fullDate,onClick:()=>U(n.fullDate),children:[o.jsx(T,{children:n.day}),o.jsx(M,{children:n.number})]},n.fullDate))})]}),o.jsxs("div",{children:[o.jsxs(p,{style:{fontWeight:700,marginBottom:8,color:"#1E293B"},children:["Available Time Slots for ",a,":"]}),o.jsx(R,{children:G.map(n=>o.jsxs(E,{$selected:d===n,onClick:()=>V(n),children:[o.jsx(z,{size:16}),o.jsx("span",{children:n})]},n))})]}),a&&d&&o.jsxs(I,{children:[o.jsxs(_,{children:[o.jsx(F,{children:"Selected Session 2 Slot"}),o.jsxs(N,{children:[a," • ",d]})]}),o.jsx(f,{variant:"primary",size:"md",rightIcon:o.jsx(D,{size:16}),onClick:q,children:"Proceed to Final Confirmation"})]})]}),i===3&&o.jsxs(ve,{children:[o.jsxs(S,{children:[o.jsxs(b,{children:[o.jsx(se,{size:20,style:{color:"#5D2384"}}),o.jsx("span",{children:"Review & Confirm Session Booking"})]}),o.jsx(p,{children:"Please double check your scheduled 1-on-1 sessions below."})]}),o.jsxs(W,{children:[o.jsx(B,{size:24,style:{color:"#2563EB",flexShrink:0,marginTop:2}}),o.jsxs("div",{children:[o.jsx("strong",{children:"Session 1 (Discovery & Assessment)"}),o.jsx("br",{}),o.jsxs("span",{children:["Date: ",l," • Time: ",c]}),o.jsx("br",{}),o.jsx("span",{style:{fontSize:13,color:"#64748B"},children:"Counsellor: Sarah Jenkins, M.Sc Psych"})]})]}),o.jsxs(W,{children:[o.jsx(B,{size:24,style:{color:"#5D2384",flexShrink:0,marginTop:2}}),o.jsxs("div",{children:[o.jsx("strong",{children:"Session 2 (Roadmap & Recommendations)"}),o.jsx("br",{}),o.jsxs("span",{children:["Date: ",a," • Time: ",d]}),o.jsx("br",{}),o.jsx("span",{style:{fontSize:13,color:"#64748B"},children:"Counsellor: Sarah Jenkins, M.Sc Psych"})]})]}),o.jsxs("div",{children:[o.jsx("strong",{style:{fontSize:14,color:"#1E293B"},children:"Automated Notification Dispatch:"}),o.jsxs(ke,{children:[o.jsxs($,{$bg:"#DBEAFE",$color:"#1E40AF",children:[o.jsx(g,{size:14})," Student Email Invite"]}),o.jsxs($,{$bg:"#F3E8FF",$color:"#6B21A8",children:[o.jsx(g,{size:14})," Parent Email Invite"]}),o.jsxs($,{$bg:"#D1FAE5",$color:"#047857",children:[o.jsx(re,{size:14})," WhatsApp Confirmation"]})]})]}),o.jsxs(we,{children:[o.jsx(f,{type:"button",variant:"secondary",size:"md",leftIcon:o.jsx(k,{size:16}),onClick:()=>u(2),children:"Back to Session 2 Slot"}),o.jsx(f,{type:"button",variant:"primary",size:"md",leftIcon:o.jsx(m,{size:16}),onClick:Q,children:"Confirm Both Sessions & Book Now"})]})]})]}):o.jsx(xe,{children:o.jsxs(pe,{children:[o.jsxs(fe,{children:[o.jsx(oe,{size:24,style:{color:"#D97706"}}),o.jsx("span",{children:"Parent Pre-Counselling Assessment Pending"})]}),o.jsx(me,{children:"Session booking can only be done after your parent submits their pre-counselling assessment form. Once your parent completes the assessment, this scheduling workspace will unlock automatically."}),o.jsxs(ue,{children:[o.jsx(f,{variant:"secondary",size:"md",leftIcon:o.jsx(g,{size:16}),onClick:X,children:"Resend Parent Link"}),o.jsx(f,{variant:"primary",size:"md",leftIcon:o.jsx(m,{size:16}),onClick:K,children:"Simulate Parent Form Completion"})]})]})})]})})};export{ze as BookSessionsPage,ze as default};
