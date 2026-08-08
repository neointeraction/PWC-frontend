import{d as te,j as t,R as H,b8 as ue,J as se,b9 as ge,B as a,f as _,g as s,aV as V,ba as xe,u as fe,a as he,r as n,K as be,c as $,V as Se,bb as ye,a5 as $e,a$ as je,al as J,bc as Ce,aX as Z}from"./index-CormbGNw.js";import{B as U}from"./Badge-BxL85X3Q.js";import{u as ke,a as ve,o as we,s as b}from"./types-EU2TuyfP.js";import{M as ze}from"./Modal-BS2j7pjl.js";import{I as v}from"./Input-DN3oI2gg.js";import{S as ee}from"./Select-7TTQpnrO.js";import"./Badge.styles-Bj8fo-OT.js";const Ie=we({fullName:b().min(1,"Full name is required"),email:b().email("Enter a valid email"),schoolName:b().min(1,"School name is required"),grade:b().min(1,"Grade is required"),guardianName:b().min(1,"Guardian name is required"),guardianPhone:b().min(1,"Guardian phone is required"),targetStream:b().min(1,"Select target stream")}),Fe=s.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,P=s.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,q=s.h4`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.primary};
  margin: ${({theme:e})=>e.spacing.xs} 0 0 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,Pe=({isOpen:e,onClose:o,initialName:r="Alex Johnson",initialEmail:R="student@pwc.com",onSuccess:w})=>{var m,I,l,j,c;const p=te(),{register:u,handleSubmit:g,setValue:z,watch:d,formState:{errors:x,isSubmitting:f}}=ke({resolver:ve(Ie),defaultValues:{fullName:r,email:R,schoolName:"St. Xavier's Senior Secondary School",grade:"11th Grade (Science)",guardianName:"Robert Johnson",guardianPhone:"+91 98765 43210",targetStream:"Engineering & Technology"}}),E=async h=>{await new Promise(F=>setTimeout(F,500)),p.success("Student Profile Form Completed!",`Profile details for ${h.fullName} saved successfully.`),w&&w(),o()};return t.jsx(ze,{isOpen:e,onClose:o,title:"Student Profile Form (Step 1 - Mandatory)",subtitle:"Fill out your personal information, school details, and guardian contacts.",size:"lg",children:t.jsxs(Fe,{onSubmit:g(E),noValidate:!0,children:[t.jsx(q,{children:"Personal Details"}),t.jsxs(P,{children:[t.jsx(v,{label:"Full Name",placeholder:"Enter full name",leftIcon:t.jsx(H,{size:18}),error:(m=x.fullName)==null?void 0:m.message,...u("fullName")}),t.jsx(v,{label:"Email Address",type:"email",placeholder:"Enter email",leftIcon:t.jsx(ue,{size:18}),error:(I=x.email)==null?void 0:I.message,...u("email")})]}),t.jsx(q,{children:"Academic Information"}),t.jsxs(P,{children:[t.jsx(v,{label:"School / Institution Name",placeholder:"Enter school name",leftIcon:t.jsx(se,{size:18}),error:(l=x.schoolName)==null?void 0:l.message,...u("schoolName")}),t.jsx(ee,{label:"Current Grade / Class",value:d("grade"),onChange:h=>z("grade",h.target.value),options:[{value:"9th Grade",label:"9th Grade"},{value:"10th Grade",label:"10th Grade"},{value:"11th Grade (Science)",label:"11th Grade (Science)"},{value:"11th Grade (Commerce)",label:"11th Grade (Commerce)"},{value:"11th Grade (Arts)",label:"11th Grade (Arts)"},{value:"12th Grade (Science)",label:"12th Grade (Science)"},{value:"12th Grade (Commerce)",label:"12th Grade (Commerce)"}]})]}),t.jsx(P,{children:t.jsx(ee,{label:"Primary Career Stream Focus",value:d("targetStream"),onChange:h=>z("targetStream",h.target.value),options:[{value:"Engineering & Technology",label:"Engineering & Technology"},{value:"Medical & Healthcare",label:"Medical & Healthcare"},{value:"Finance & Commerce",label:"Finance & Commerce"},{value:"Arts & Design",label:"Arts & Design"},{value:"Law & Management",label:"Law & Management"}]})}),t.jsx(q,{children:"Parent / Guardian Contact"}),t.jsxs(P,{children:[t.jsx(v,{label:"Guardian Name",placeholder:"Enter guardian name",leftIcon:t.jsx(H,{size:18}),error:(j=x.guardianName)==null?void 0:j.message,...u("guardianName")}),t.jsx(v,{label:"Guardian Mobile Number",placeholder:"Enter phone number",leftIcon:t.jsx(ge,{size:18}),error:(c=x.guardianPhone)==null?void 0:c.message,...u("guardianPhone")})]}),t.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:12,marginTop:16},children:[t.jsx(a,{type:"button",variant:"secondary",onClick:o,children:"Cancel"}),t.jsx(a,{type:"submit",variant:"primary",leftIcon:t.jsx(_,{size:18}),isLoading:f,children:"Save & Complete Profile"})]})]})})},_e=s.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Re=s.div`
  background: linear-gradient(135deg, ${({theme:e})=>e.colors.primary} 0%, #3B82F6 100%);
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xl};
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({theme:e})=>e.spacing.md};
  }
`,Ee=s.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.xs};
`,Le=s.h1`
  font-size: ${({theme:e})=>e.fontSize.xxxl};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  margin: 0;
  color: #ffffff;
`,Me=s.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  flex-wrap: wrap;
`,Te=s.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 10px;
  border-radius: 4px;
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  backdrop-filter: blur(4px);
`;s.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid rgba(2, 132, 199, 0.2);
  border-left: 4px solid #0284C7;
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xl};
  box-shadow: 0 4px 14px rgba(2, 132, 199, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;s.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.primaryLight};
  border-left: 4px solid ${({theme:e})=>e.colors.primary};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xl};
  box-shadow: 0 4px 14px rgba(93, 35, 132, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;s.div`
  display: flex;
  align-items: flex-start;
  gap: ${({theme:e})=>e.spacing.md};
`;s.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.xs};
`;s.h3`
  font-size: ${({theme:e})=>e.fontSize.lg};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`;s.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`;s.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
  margin-top: ${({theme:e})=>e.spacing.xs};
  flex-wrap: wrap;
`;s.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
  background-color: ${({theme:e})=>e.colors.background};
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
`;const Ae=xe`
  0% {
    box-shadow: 0 0 0 0 rgba(93, 35, 132, 0.4);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(93, 35, 132, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(93, 35, 132, 0);
  }
`,Ge=s.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xl};
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Ne=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing.md};
  padding-bottom: ${({theme:e})=>e.spacing.md};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
`,Be=s.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
`,De=s.h2`
  font-size: ${({theme:e})=>e.fontSize.xl};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,We=s.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 2px 0 0 0;
`,Oe=s.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: ${({theme:e})=>e.spacing.xs};
`,Ve=s.div`
  display: flex;
  align-items: flex-start;
  gap: ${({theme:e})=>e.spacing.lg};
  position: relative;
  min-height: 54px;

  &:last-child {
    min-height: auto;
  }
`,Je=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 24px;
  flex-shrink: 0;
`,Ue=s.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  z-index: 2;
  transition: all 0.3s ease;

  ${({$status:e})=>e==="completed"&&V`
      background-color: #16a34a;
      color: #ffffff;
      border: 2px solid #16a34a;
    `}

  ${({$status:e,theme:o})=>e==="current"&&V`
      background-color: ${o.colors.primary};
      color: #ffffff;
      border: 2px solid ${o.colors.primary};
      animation: ${Ae} 2s infinite;
    `}

  ${({$status:e,theme:o})=>e==="upcoming"&&V`
      background-color: ${o.colors.surface};
      color: ${o.colors.textSecondary};
      border: 2px solid ${o.colors.border};
    `}
`,qe=s.div`
  width: 2px;
  flex: 1;
  min-height: 28px;
  background-color: ${({$completed:e,theme:o})=>e?"#16A34A":o.colors.border};
  margin-top: 2px;
  margin-bottom: 2px;
`,He=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding-bottom: ${({theme:e})=>e.spacing.md};
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing.sm};
`,Ke=s.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,Xe=s.h4`
  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({$status:e,theme:o})=>e==="current"?o.fontWeight.bold:e==="completed"?o.fontWeight.semibold:o.fontWeight.medium};
  color: ${({$status:e,theme:o})=>e==="upcoming"?o.colors.textSecondary:o.colors.text};
  margin: 0;
`,Ye=s.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`;s.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({theme:e})=>e.spacing.md};
`;s.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`;const Qe=s.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: ${({$bg:e,theme:o})=>e||o.colors.primaryLight};
  color: ${({$color:e,theme:o})=>e||o.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;s.h3`
  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`;s.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0 0 ${({theme:e})=>e.spacing.md} 0;
  line-height: 1.5;
`;s.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.sm};
  margin-bottom: ${({theme:e})=>e.spacing.lg};
`;s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({theme:e})=>e.fontSize.sm};
  padding: ${({theme:e})=>e.spacing.xs} 0;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;s.span`
  color: ${({theme:e})=>e.colors.textSecondary};
`;s.span`
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
`;const rt=()=>{const e=fe(),o=te(),r=he(i=>i.user),[R,w]=n.useState(!1),[p,u]=n.useState(!1),[g,z]=n.useState(!1),[d,x]=n.useState(!1),[f,E]=n.useState(!1),[m,I]=n.useState(!1),[l,j]=n.useState(!1),[c,h]=n.useState(!1),[F]=n.useState(!1),[K,oe]=n.useState(""),[X,ie]=n.useState(""),[S,ne]=n.useState(!1),[C,Y]=n.useState(!1);n.useEffect(()=>{const i=localStorage.getItem("pwc_student_profile_completed")==="true",k=localStorage.getItem("pwc_precounselling_submitted")==="true"||localStorage.getItem("pwc_student_precounseling_form_submitted")==="true",M=localStorage.getItem("pwc_parent_form_submitted")==="true",T=localStorage.getItem("pwc_assessment_form_submitted")==="true",A=localStorage.getItem("pwc_sessions_booked")==="true",G=localStorage.getItem("pwc_session_1_completed")==="true",N=localStorage.getItem("pwc_session_2_completed")==="true",B=localStorage.getItem("pwc_session_1_slot")||"May 12, 2026 • 05:00 PM - 06:00 PM",D=localStorage.getItem("pwc_session_2_slot")||"May 15, 2026 • 05:00 PM - 06:00 PM",W=localStorage.getItem("pwc_student_feedback_submitted")==="true",O=localStorage.getItem("pwc_parent_feedback_submitted")==="true";u(i),z(k),x(M),E(T),I(A),j(G),h(N),oe(B),ie(D),ne(W),Y(O)},[]);const Q=i=>{o.info(`Launching Video Session ${i}`,"Connecting to video counseling room with Sarah Jenkins (M.Sc Psych)...")},ae=()=>{e($.BOOK_SESSIONS)},re=()=>{localStorage.setItem("pwc_session_1_completed","true"),j(!0),o.success("Session 1 Completed!","Session 1 has been marked as completed. Session 2 card is now active on your dashboard.")},le=()=>{localStorage.setItem("pwc_session_2_completed","true"),h(!0),o.success("Session 2 Completed!","Session 2 completed. Feedback & Ikigai Report unlocked!")},ce=()=>{x(!0),localStorage.setItem("pwc_parent_form_submitted","true"),o.success("Pre-Counselling Form Parent Completed!","Parent form marked as completed (Form link sent via email to parent).")},de=()=>{Y(!0),localStorage.setItem("pwc_parent_feedback_submitted","true"),o.success("Parent Feedback Completed!","Parent feedback form marked as completed.")},y=(()=>{const i=p?"completed":"current",k=g?"completed":p?"current":"upcoming",M=d?"completed":g?"current":"upcoming",T=f?"completed":d?"current":"upcoming",A=m?"completed":f?"current":"upcoming",G=l?"completed":m?"current":"upcoming",N=l?"completed":"upcoming",B=c?"completed":l?"current":"upcoming",D=c?"completed":"upcoming",W=S?"completed":c?"current":"upcoming",O=C?"completed":S?"current":"upcoming",pe=C?"current":"upcoming";return[{id:1,title:"Student Profile Form",subtext:p?"Completed":"Mandatory Step 1 — Personal & Parent Details",status:i,action:p?null:t.jsx(a,{variant:"primary",size:"sm",leftIcon:t.jsx(H,{size:16}),onClick:()=>e($.STUDENT_PROFILE_FORM),children:"Fill Profile Form"})},{id:2,title:"Pre-Counselling Form Student",subtext:g?"Submitted":p?"Step 2 — Ready to start 20-min interest assessment":"Locked — Complete Student Profile Form first",status:k,action:p&&!g?t.jsx(a,{variant:"primary",size:"sm",leftIcon:t.jsx($e,{size:16}),onClick:()=>e($.PRE_COUNSELLING_FORM),children:"Start Student Form"}):null},{id:3,title:"Pre-Counselling Form Parent",subtext:d?"Completed (Submitted via email link)":g?"Step 3 — Form link sent via email to parent. Click to complete.":"Locked — Complete Student Form first",status:M,action:g&&!d?t.jsx(a,{variant:"primary",size:"sm",leftIcon:t.jsx(je,{size:16}),onClick:ce,children:"Complete Parent Form"}):null},{id:4,title:"Assessment Form",subtext:f?"Completed":d?"Step 4 — Psychometric abilities & career interest assessment":"Locked — Complete Pre-Counselling Form Parent first",status:T,action:d&&!f?t.jsx(a,{variant:"primary",size:"sm",leftIcon:t.jsx(J,{size:16}),onClick:()=>e($.ASSESSMENT_FORM),children:"Start Assessment Form"}):null},{id:5,title:"Booking session 1 & 2",subtext:m?"Sessions Scheduled":f?"Select dates and book 1-on-1 counseling video calls":"Locked — Complete Assessment Form first",status:A,action:f&&!m?t.jsx(a,{variant:"primary",size:"sm",leftIcon:t.jsx(Ce,{size:16}),onClick:ae,children:"Book Sessions 1 & 2"}):null},{id:6,title:"Video session 1",subtext:l?`Completed (${K||"May 12, 5pm-6pm"})`:m?`Scheduled (${K||"May 12, 5pm-6pm"}) • Email & WA Reminders Dispatched`:"Initial Career Exploration Call",status:G,action:m&&!l?t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[t.jsx(a,{variant:"primary",size:"sm",leftIcon:t.jsx(Z,{size:16}),onClick:()=>Q(1),children:F?"Join Video Call (Active)":"Join Video Call"}),t.jsx(a,{variant:"secondary",size:"sm",leftIcon:t.jsx(_,{size:16}),onClick:re,children:"Mark Session 1 Completed"})]}):null},{id:7,title:"Counsellor adding notes",subtext:l?"Session 1 Notes Added by Sarah Jenkins":"Session 1 summary & counselor insights",status:N},{id:8,title:"Video session 2",subtext:c?`Completed (${X||"May 15, 5pm-6pm"})`:l?`Active Session 2 (${X||"May 15, 5pm-6pm"}) • Email & WA Reminders Dispatched`:"Ikigai & Stream Review Call",status:B,action:l&&!c?t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[t.jsx(a,{variant:"primary",size:"sm",leftIcon:t.jsx(Z,{size:16}),onClick:()=>Q(2),children:F?"Join Video Call (Active)":"Join Video Call"}),t.jsx(a,{variant:"secondary",size:"sm",leftIcon:t.jsx(_,{size:16}),onClick:le,children:"Mark Session 2 Completed"})]}):null},{id:9,title:"Counsellor adding notes",subtext:"Final stream recommendations & roadmap",status:D},{id:10,title:"Student Feedback Form",subtext:S?"Completed":c?"Share your feedback on the counseling experience":"Locked — Complete Session 2 first",status:W,action:c&&!S?t.jsx(a,{variant:"primary",size:"sm",leftIcon:t.jsx(J,{size:16}),onClick:()=>e($.STUDENT_FEEDBACK_FORM),children:"Complete Student Feedback"}):null},{id:11,title:"Parent Feedback Form",subtext:C?"Completed":S?"Share your feedback on the counseling experience":"Locked — Complete Student Feedback first",status:O,action:S&&!C?t.jsx(a,{variant:"primary",size:"sm",leftIcon:t.jsx(J,{size:16}),onClick:de,children:"Complete Parent Feedback"}):null},{id:12,title:"IKigai Report",subtext:C?"Unlock your official Ikigai career roadmap report":"Locked — Complete Feedback Forms first",status:pe}]})(),L=y.filter(i=>i.status==="completed").length,me=Math.round(L/y.length*100);return t.jsxs(_e,{children:[t.jsxs(Re,{children:[t.jsxs(Ee,{children:[t.jsxs(Le,{children:["Welcome back, ",(r==null?void 0:r.name)||"Alex Johnson","!"]}),t.jsxs(Me,{children:[t.jsx(be,{size:16})," Grade 11 - Science",t.jsxs(Te,{children:[t.jsx(se,{size:12,style:{display:"inline",marginRight:4}}),"St. Xavier's Senior Secondary School"]})]})]}),t.jsx(a,{variant:"secondary",size:"md",leftIcon:t.jsx(Se,{size:18}),onClick:()=>e($.CAREER_LIBRARY),style:{background:"rgba(255, 255, 255, 0.95)",color:"#5D2384",border:"none"},children:"Explore Careers"})]}),t.jsxs(Ge,{children:[t.jsxs(Ne,{children:[t.jsxs(Be,{children:[t.jsx(Qe,{$color:"#5D2384",$bg:"#F4ECF8",children:t.jsx(ye,{size:24})}),t.jsxs("div",{children:[t.jsx(De,{children:"Your Counseling Journey Progress"}),t.jsx(We,{children:"Follow the 12 milestone steps to complete your counseling and receive your Ikigai Report."})]})]}),t.jsxs(U,{variant:L===y.length?"success":"primary",size:"md",children:[L," of ",y.length," Steps Completed (",me,"%)"]})]}),t.jsx(Oe,{children:y.map((i,k)=>t.jsxs(Ve,{children:[t.jsxs(Je,{children:[t.jsx(Ue,{$status:i.status,children:i.status==="completed"?t.jsx(_,{size:14}):i.status==="current"?t.jsx("span",{style:{width:8,height:8,borderRadius:"50%",background:"#fff"}}):t.jsx("span",{style:{fontSize:10},children:i.id})}),k<y.length-1&&t.jsx(qe,{$completed:i.status==="completed"})]}),t.jsxs(He,{children:[t.jsxs(Ke,{children:[t.jsxs(Xe,{$status:i.status,children:[i.title,i.status==="completed"&&t.jsx("span",{style:{marginLeft:8},children:t.jsx(U,{variant:"success",size:"sm",children:"Completed"})}),i.status==="current"&&t.jsx("span",{style:{marginLeft:8},children:t.jsx(U,{variant:"primary",size:"sm",children:"In Progress"})})]}),t.jsx(Ye,{children:i.subtext})]}),i.action&&t.jsx("div",{children:i.action})]})]},i.id))})]}),t.jsx(Pe,{isOpen:R,onClose:()=>w(!1),initialName:(r==null?void 0:r.name)||"Alex Johnson",initialEmail:(r==null?void 0:r.email)||"student@pwc.com",onSuccess:()=>{u(!0),localStorage.setItem("pwc_student_profile_completed","true")}})]})};export{rt as StudentPortalPage};
