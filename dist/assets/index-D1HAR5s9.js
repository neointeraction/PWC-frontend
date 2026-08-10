import{d as ee,j as t,R as J,bb as ue,J as te,bc as xe,B as a,f as $,g as s,aV as B,bd as fe,u as he,a as be,r as n,K as Se,c as b,V as ye,be as je,a5 as $e,b2 as Ce,bf as X,al as W,bg as ve,aZ as Z,a_ as we}from"./index-D-K1gLqS.js";import{B as O}from"./Badge-D9t8Ekxv.js";import{u as ke,a as ze,o as Ie,s as S}from"./types-BhCtGHqx.js";import{M as _e}from"./Modal-DKfz2sKK.js";import{I as w}from"./Input-DaM42ekN.js";import{S as Q}from"./Select-dK3oprq0.js";import"./Badge.styles-CTSykKDf.js";const Fe=Ie({fullName:S().min(1,"Full name is required"),email:S().email("Enter a valid email"),schoolName:S().min(1,"School name is required"),grade:S().min(1,"Grade is required"),guardianName:S().min(1,"Guardian name is required"),guardianPhone:S().min(1,"Guardian phone is required"),targetStream:S().min(1,"Select target stream")}),Pe=s.form`
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
`,V=s.h4`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.primary};
  margin: ${({theme:e})=>e.spacing.xs} 0 0 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,Re=({isOpen:e,onClose:i,initialName:r="Alex Johnson",initialEmail:E="student@pwc.com",onSuccess:k})=>{var c,I,d,v,m;const p=ee(),{register:g,handleSubmit:l,setValue:z,watch:C,formState:{errors:u,isSubmitting:x}}=ke({resolver:ze(Fe),defaultValues:{fullName:r,email:E,schoolName:"St. Xavier's Senior Secondary School",grade:"11th Grade (Science)",guardianName:"Robert Johnson",guardianPhone:"+91 98765 43210",targetStream:"Engineering & Technology"}}),L=async f=>{await new Promise(_=>setTimeout(_,500)),p.success("Student Profile Form Completed!",`Profile details for ${f.fullName} saved successfully.`),k&&k(),i()};return t.jsx(_e,{isOpen:e,onClose:i,title:"Student Profile Form (Step 1 - Mandatory)",subtitle:"Fill out your personal information, school details, and guardian contacts.",size:"lg",children:t.jsxs(Pe,{onSubmit:l(L),noValidate:!0,children:[t.jsx(V,{children:"Personal Details"}),t.jsxs(P,{children:[t.jsx(w,{label:"Full Name",placeholder:"Enter full name",leftIcon:t.jsx(J,{size:18}),error:(c=u.fullName)==null?void 0:c.message,...g("fullName")}),t.jsx(w,{label:"Email Address",type:"email",placeholder:"Enter email",leftIcon:t.jsx(ue,{size:18}),error:(I=u.email)==null?void 0:I.message,...g("email")})]}),t.jsx(V,{children:"Academic Information"}),t.jsxs(P,{children:[t.jsx(w,{label:"School / Institution Name",placeholder:"Enter school name",leftIcon:t.jsx(te,{size:18}),error:(d=u.schoolName)==null?void 0:d.message,...g("schoolName")}),t.jsx(Q,{label:"Current Grade / Class",value:C("grade"),onChange:f=>z("grade",f.target.value),options:[{value:"9th Grade",label:"9th Grade"},{value:"10th Grade",label:"10th Grade"},{value:"11th Grade (Science)",label:"11th Grade (Science)"},{value:"11th Grade (Commerce)",label:"11th Grade (Commerce)"},{value:"11th Grade (Arts)",label:"11th Grade (Arts)"},{value:"12th Grade (Science)",label:"12th Grade (Science)"},{value:"12th Grade (Commerce)",label:"12th Grade (Commerce)"}]})]}),t.jsx(P,{children:t.jsx(Q,{label:"Primary Career Stream Focus",value:C("targetStream"),onChange:f=>z("targetStream",f.target.value),options:[{value:"Engineering & Technology",label:"Engineering & Technology"},{value:"Medical & Healthcare",label:"Medical & Healthcare"},{value:"Finance & Commerce",label:"Finance & Commerce"},{value:"Arts & Design",label:"Arts & Design"},{value:"Law & Management",label:"Law & Management"}]})}),t.jsx(V,{children:"Parent / Guardian Contact"}),t.jsxs(P,{children:[t.jsx(w,{label:"Guardian Name",placeholder:"Enter guardian name",leftIcon:t.jsx(J,{size:18}),error:(v=u.guardianName)==null?void 0:v.message,...g("guardianName")}),t.jsx(w,{label:"Guardian Mobile Number",placeholder:"Enter phone number",leftIcon:t.jsx(xe,{size:18}),error:(m=u.guardianPhone)==null?void 0:m.message,...g("guardianPhone")})]}),t.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:12,marginTop:16},children:[t.jsx(a,{type:"button",variant:"secondary",onClick:i,children:"Cancel"}),t.jsx(a,{type:"submit",variant:"primary",leftIcon:t.jsx($,{size:18}),isLoading:x,children:"Save & Complete Profile"})]})]})})},Ee=s.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Le=s.div`
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
`,Me=s.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.xs};
`,Ae=s.h1`
  font-size: ${({theme:e})=>e.fontSize.xxxl};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  margin: 0;
  color: #ffffff;
`,De=s.p`
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
`;const Ne=fe`
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
`,Be=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing.md};
  padding-bottom: ${({theme:e})=>e.spacing.md};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
`,We=s.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
`,Oe=s.h2`
  font-size: ${({theme:e})=>e.fontSize.xl};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,Ve=s.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 2px 0 0 0;
`,Je=s.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: ${({theme:e})=>e.spacing.xs};
`,Ue=s.div`
  display: flex;
  align-items: flex-start;
  gap: ${({theme:e})=>e.spacing.lg};
  position: relative;
  min-height: 54px;

  &:last-child {
    min-height: auto;
  }
`,qe=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 24px;
  flex-shrink: 0;
`,He=s.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  z-index: 2;
  transition: all 0.3s ease;

  ${({$status:e})=>e==="completed"&&B`
      background-color: #16a34a;
      color: #ffffff;
      border: 2px solid #16a34a;
    `}

  ${({$status:e,theme:i})=>e==="current"&&B`
      background-color: ${i.colors.primary};
      color: #ffffff;
      border: 2px solid ${i.colors.primary};
      animation: ${Ne} 2s infinite;
    `}

  ${({$status:e,theme:i})=>e==="upcoming"&&B`
      background-color: ${i.colors.surface};
      color: ${i.colors.textSecondary};
      border: 2px solid ${i.colors.border};
    `}
`,Ke=s.div`
  width: 2px;
  flex: 1;
  min-height: 28px;
  background-color: ${({$completed:e,theme:i})=>e?"#16A34A":i.colors.border};
  margin-top: 2px;
  margin-bottom: 2px;
`,Ye=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding-bottom: ${({theme:e})=>e.spacing.md};
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing.sm};
`,Xe=s.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,Ze=s.h4`
  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({$status:e,theme:i})=>e==="current"?i.fontWeight.bold:e==="completed"?i.fontWeight.semibold:i.fontWeight.medium};
  color: ${({$status:e,theme:i})=>e==="upcoming"?i.colors.textSecondary:i.colors.text};
  margin: 0;
`,Qe=s.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`;s.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: 8px;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${({theme:e})=>e.colors.warningLight};
  color: #B45309;
  border: 1px solid #FCD34D;
`;const R=s.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: 8px;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${({$variant:e,theme:i})=>e==="success"?"#DCFCE7":e==="warning"?i.colors.warningLight:i.colors.primaryLight};
  color: ${({$variant:e,theme:i})=>e==="success"?"#15803D":e==="warning"?"#B45309":i.colors.primary};
  border: 1px solid
    ${({$variant:e})=>e==="success"?"#86EFAC":e==="warning"?"#FCD34D":"#DDD6FE"};
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
`;const et=s.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: ${({$bg:e,theme:i})=>e||i.colors.primaryLight};
  color: ${({$color:e,theme:i})=>e||i.colors.primary};
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
`;const ct=()=>{const e=he(),i=ee(),r=be(o=>o.user),[E,k]=n.useState(!1),[p,g]=n.useState(!1),[l,z]=n.useState(!1),[C,u]=n.useState(!1),[x,L]=n.useState(!1),[c,I]=n.useState(!1),[d,v]=n.useState(!1),[m,f]=n.useState(!1),[_]=n.useState(!1),[U,se]=n.useState(""),[q,ie]=n.useState(""),[y,oe]=n.useState(!1),[H,K]=n.useState(!1);n.useEffect(()=>{const o=localStorage.getItem("pwc_student_profile_completed")==="true",h=localStorage.getItem("pwc_precounselling_submitted")==="true"||localStorage.getItem("pwc_student_precounseling_form_submitted")==="true",A=localStorage.getItem("pwc_parent_form_submitted")==="true",D=localStorage.getItem("pwc_assessment_form_submitted")==="true",T=localStorage.getItem("pwc_sessions_booked")==="true",N=localStorage.getItem("pwc_session_1_completed")==="true",G=localStorage.getItem("pwc_session_2_completed")==="true",F=localStorage.getItem("pwc_session_1_slot")||"May 12, 2026 • 05:00 PM - 06:00 PM",me=localStorage.getItem("pwc_session_2_slot")||"May 15, 2026 • 05:00 PM - 06:00 PM",pe=localStorage.getItem("pwc_student_feedback_submitted")==="true",ge=localStorage.getItem("pwc_parent_feedback_submitted")==="true";g(o),z(h),u(A),L(D),I(T),v(N),f(G),se(F),ie(me),oe(pe),K(ge)},[]);const Y=o=>{const h=o===1?"https://meet.google.com/abc-defg-hij":"https://meet.google.com/xyz-uvwx-rst";window.open(h,"_blank"),i.info(`Launching Video Session ${o}`,"Connecting to video counseling room with Sarah Jenkins (M.Sc Psych)...")},ae=()=>{e(b.BOOK_SESSIONS)},ne=()=>{localStorage.setItem("pwc_session_1_completed","true"),v(!0),i.success("Session 1 Completed!","Session 1 has been marked as completed. Session 2 card is now active on your dashboard.")},re=()=>{localStorage.setItem("pwc_session_2_completed","true"),f(!0),i.success("Session 2 Completed!","Session 2 completed. Feedback & Ikigai Report unlocked!")},le=()=>{u(!0),localStorage.setItem("pwc_parent_form_submitted","true"),i.success("Pre-Counselling Form Parent Completed!","Parent form marked as completed (Form link sent via email to parent).")},ce=()=>{K(!0),localStorage.setItem("pwc_parent_feedback_submitted","true"),i.success("Parent Feedback Completed!","Parent feedback form marked as completed.")},j=(()=>{const o=p?"completed":"current",h=l?"completed":p?"current":"upcoming",A=x?"completed":l?"current":"upcoming",D=c?"completed":x?"current":"upcoming",T=d?"completed":c?"current":"upcoming",N=m?"completed":d?"current":"upcoming",G=y?"completed":m?"current":"upcoming",F=y?"current":"upcoming";return[{id:1,title:"Student Profile Form",subtext:p?"Completed":"Mandatory Step 1 — Personal & Parent Details",status:o,attachedStatus:null,action:p?null:t.jsx(a,{variant:"primary",size:"sm",leftIcon:t.jsx(J,{size:16}),onClick:()=>e(b.STUDENT_PROFILE_FORM),children:"Fill Profile Form"})},{id:2,title:"Pre-Counselling Form Student",subtext:l?"Submitted":p?"Step 2 — Ready to start 20-min interest assessment":"Locked — Complete Student Profile Form first",status:h,attachedStatus:C?t.jsxs(R,{$variant:"success",children:[t.jsx($,{size:13}),t.jsx("span",{children:"Parent Form Completed"})]}):t.jsxs(R,{$variant:"warning",children:[t.jsx(X,{size:13,style:{color:"#D97706"}}),t.jsx("span",{children:"waiting for parent to fill the pre counselling form"})]}),action:t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[p&&!l&&t.jsx(a,{variant:"primary",size:"sm",leftIcon:t.jsx($e,{size:16}),onClick:()=>e(b.PRE_COUNSELLING_FORM),children:"Start Student Form"}),l&&!C&&t.jsx(a,{variant:"secondary",size:"sm",leftIcon:t.jsx(Ce,{size:16}),onClick:le,children:"Complete Parent Form"})]})},{id:3,title:"Assessment Form",subtext:x?"Completed":l?"Step 3 — Psychometric abilities & career interest assessment":"Locked — Complete Pre-Counselling Form first",status:A,attachedStatus:null,action:l&&!x?t.jsx(a,{variant:"primary",size:"sm",leftIcon:t.jsx(W,{size:16}),onClick:()=>e(b.ASSESSMENT_FORM),children:"Start Assessment Form"}):null},{id:4,title:"Booking session 1 & 2",subtext:c?"Sessions Scheduled":x?"Select dates and book 1-on-1 counseling video calls":"Locked — Complete Assessment Form first",status:D,attachedStatus:null,action:x&&!c?t.jsx(a,{variant:"primary",size:"sm",leftIcon:t.jsx(ve,{size:16}),onClick:ae,children:"Book Sessions 1 & 2"}):null},{id:5,title:"Video session 1",subtext:d?`Completed (${U||"May 12, 5pm-6pm"}) • Counsellor Notes Added by Sarah Jenkins`:c?`Scheduled (${U||"May 12, 5pm-6pm"}) • Email & WA Reminders Dispatched`:"Initial Career Exploration Call",status:T,attachedStatus:null,action:c&&!d?t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[t.jsx(a,{variant:"primary",size:"sm",leftIcon:t.jsx(Z,{size:16}),onClick:()=>Y(1),children:_?"Join Video Call (Active)":"Join Video Call"}),t.jsx(a,{variant:"secondary",size:"sm",leftIcon:t.jsx($,{size:16}),onClick:ne,children:"Mark Session 1 Completed"})]}):null},{id:6,title:"Video session 2",subtext:m?`Completed (${q||"May 15, 5pm-6pm"}) • Final Stream & Roadmap Notes Added`:d?`Active Session 2 (${q||"May 15, 5pm-6pm"}) • Email & WA Reminders Dispatched`:"Ikigai & Stream Review Call",status:N,attachedStatus:null,action:d&&!m?t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[t.jsx(a,{variant:"primary",size:"sm",leftIcon:t.jsx(Z,{size:16}),onClick:()=>Y(2),children:_?"Join Video Call (Active)":"Join Video Call"}),t.jsx(a,{variant:"secondary",size:"sm",leftIcon:t.jsx($,{size:16}),onClick:re,children:"Mark Session 2 Completed"})]}):null},{id:7,title:"Student Feedback Form",subtext:y?"Completed":m?"Share your feedback on the counseling experience":"Locked — Complete Session 2 first",status:G,attachedStatus:H?t.jsxs(R,{$variant:"success",children:[t.jsx($,{size:13}),t.jsx("span",{children:"Parent Feedback Completed"})]}):t.jsxs(R,{$variant:"warning",children:[t.jsx(X,{size:13,style:{color:"#D97706"}}),t.jsx("span",{children:"waiting for parent feedback"})]}),action:t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[m&&!y&&t.jsx(a,{variant:"primary",size:"sm",leftIcon:t.jsx(W,{size:16}),onClick:()=>e(b.STUDENT_FEEDBACK_FORM),children:"Complete Student Feedback"}),y&&!H&&t.jsx(a,{variant:"secondary",size:"sm",leftIcon:t.jsx(W,{size:16}),onClick:ce,children:"Complete Parent Feedback"})]})},{id:8,title:"IKigai Report",subtext:y?"Your official Ikigai career roadmap report is ready to view":"Unlock your official Ikigai career roadmap report",status:F,attachedStatus:null,action:F!=="upcoming"?t.jsx(a,{variant:"primary",size:"sm",leftIcon:t.jsx(we,{size:16}),onClick:()=>e(b.GENERATE_REPORT.replace(":sessionId","sess-counselor-1")),children:"View Ikigai Report"}):null}]})(),M=j.filter(o=>o.status==="completed").length,de=Math.round(M/j.length*100);return t.jsxs(Ee,{children:[t.jsxs(Le,{children:[t.jsxs(Me,{children:[t.jsxs(Ae,{children:["Welcome back, ",(r==null?void 0:r.name)||"Alex Johnson","!"]}),t.jsxs(De,{children:[t.jsx(Se,{size:16})," Grade 11 - Science",t.jsxs(Te,{children:[t.jsx(te,{size:12,style:{display:"inline",marginRight:4}}),"St. Xavier's Senior Secondary School"]})]})]}),t.jsx(a,{variant:"secondary",size:"md",leftIcon:t.jsx(ye,{size:18}),onClick:()=>e(b.CAREER_LIBRARY),style:{background:"rgba(255, 255, 255, 0.95)",color:"#5D2384",border:"none"},children:"Explore Careers"})]}),t.jsxs(Ge,{children:[t.jsxs(Be,{children:[t.jsxs(We,{children:[t.jsx(et,{$color:"#5D2384",$bg:"#F4ECF8",children:t.jsx(je,{size:24})}),t.jsxs("div",{children:[t.jsx(Oe,{children:"Your Counseling Journey Progress"}),t.jsx(Ve,{children:"Follow the 8 milestone steps to complete your counseling and receive your Ikigai Report."})]})]}),t.jsxs(O,{variant:M===j.length?"success":"primary",size:"md",children:[M," of ",j.length," Steps Completed (",de,"%)"]})]}),t.jsx(Je,{children:j.map((o,h)=>t.jsxs(Ue,{children:[t.jsxs(qe,{children:[t.jsx(He,{$status:o.status,children:o.status==="completed"?t.jsx($,{size:14}):o.status==="current"?t.jsx("span",{style:{width:8,height:8,borderRadius:"50%",background:"#fff"}}):t.jsx("span",{style:{fontSize:10},children:o.id})}),h<j.length-1&&t.jsx(Ke,{$completed:o.status==="completed"})]}),t.jsxs(Ye,{children:[t.jsxs(Xe,{children:[t.jsxs(Ze,{$status:o.status,children:[o.title,o.status==="completed"&&t.jsx("span",{style:{marginLeft:8},children:t.jsx(O,{variant:"success",size:"sm",children:"Completed"})}),o.status==="current"&&t.jsx("span",{style:{marginLeft:8},children:t.jsx(O,{variant:"primary",size:"sm",children:"In Progress"})}),o.attachedStatus]}),t.jsx(Qe,{children:o.subtext})]}),o.action&&t.jsx("div",{children:o.action})]})]},o.id))})]}),t.jsx(Re,{isOpen:E,onClose:()=>k(!1),initialName:(r==null?void 0:r.name)||"Alex Johnson",initialEmail:(r==null?void 0:r.email)||"student@pwc.com",onSuccess:()=>{g(!0),localStorage.setItem("pwc_student_profile_completed","true")}})]})};export{ct as StudentPortalPage};
