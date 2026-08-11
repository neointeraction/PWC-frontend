import{e as le,j as t,R as Q,d as $e,a0 as ce,bg as we,B as n,h as C,g as s,bh as D,bi as ke,u as ve,a as ze,r,a1 as Ie,c as S,a8 as Fe,bj as Pe,z as Y,aM as _e,G as Re,X as Ae,b5 as H,ak as Ee,D as Le,bk as oe,w as q,y as De}from"./index-DdWrmQ5m.js";import{B as y}from"./Badge-CTcJLLEK.js";import{A as Me}from"./AlertModal-DlN31LTO.js";import{u as Te,a as Be,o as Ne,s as j}from"./types-DcN95KYk.js";import{M as Ge}from"./Modal-EIZwMx4m.js";import{I as F}from"./Input-DX62Yo-K.js";import{S as ie}from"./Select-Dfnrq2lj.js";import"./Badge.styles-Cr71j-Ji.js";import"./ConfirmDialog-DZs2pxRC.js";import"./SuccessModal-DTtA9TqD.js";import"./SuccessModal.styles-C4-cutxL.js";const We=Ne({fullName:j().min(1,"Full name is required"),email:j().email("Enter a valid email"),schoolName:j().min(1,"School name is required"),grade:j().min(1,"Grade is required"),guardianName:j().min(1,"Guardian name is required"),guardianPhone:j().min(1,"Guardian phone is required"),targetStream:j().min(1,"Select target stream")}),Oe=s.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,E=s.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,K=s.h4`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.primary};
  margin: ${({theme:e})=>e.spacing.xs} 0 0 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,Ve=({isOpen:e,onClose:o,initialName:c="Alex Johnson",initialEmail:M="student@pwc.com",onSuccess:P})=>{var d,k,a,v,p;const u=le(),{register:g,handleSubmit:m,setValue:_,watch:w,formState:{errors:x,isSubmitting:f}}=Te({resolver:Be(We),defaultValues:{fullName:c,email:M,schoolName:"St. Xavier's Senior Secondary School",grade:"11th Grade (Science)",guardianName:"Robert Johnson",guardianPhone:"+91 98765 43210",targetStream:"Engineering & Technology"}}),T=async h=>{await new Promise(R=>setTimeout(R,500)),u.success("Student Profile Form Completed!",`Profile details for ${h.fullName} saved successfully.`),P&&P(),o()};return t.jsx(Ge,{isOpen:e,onClose:o,title:"Student Profile Form (Step 1 - Mandatory)",subtitle:"Fill out your personal information, school details, and guardian contacts.",size:"lg",children:t.jsxs(Oe,{onSubmit:m(T),noValidate:!0,children:[t.jsx(K,{children:"Personal Details"}),t.jsxs(E,{children:[t.jsx(F,{label:"Full Name",placeholder:"Enter full name",leftIcon:t.jsx(Q,{size:18}),error:(d=x.fullName)==null?void 0:d.message,...g("fullName")}),t.jsx(F,{label:"Email Address",type:"email",placeholder:"Enter email",leftIcon:t.jsx($e,{size:18}),error:(k=x.email)==null?void 0:k.message,...g("email")})]}),t.jsx(K,{children:"Academic Information"}),t.jsxs(E,{children:[t.jsx(F,{label:"School / Institution Name",placeholder:"Enter school name",leftIcon:t.jsx(ce,{size:18}),error:(a=x.schoolName)==null?void 0:a.message,...g("schoolName")}),t.jsx(ie,{label:"Current Grade / Class",value:w("grade"),onChange:h=>_("grade",h.target.value),options:[{value:"9th Grade",label:"9th Grade"},{value:"10th Grade",label:"10th Grade"},{value:"11th Grade (Science)",label:"11th Grade (Science)"},{value:"11th Grade (Commerce)",label:"11th Grade (Commerce)"},{value:"11th Grade (Arts)",label:"11th Grade (Arts)"},{value:"12th Grade (Science)",label:"12th Grade (Science)"},{value:"12th Grade (Commerce)",label:"12th Grade (Commerce)"}]})]}),t.jsx(E,{children:t.jsx(ie,{label:"Primary Career Stream Focus",value:w("targetStream"),onChange:h=>_("targetStream",h.target.value),options:[{value:"Engineering & Technology",label:"Engineering & Technology"},{value:"Medical & Healthcare",label:"Medical & Healthcare"},{value:"Finance & Commerce",label:"Finance & Commerce"},{value:"Arts & Design",label:"Arts & Design"},{value:"Law & Management",label:"Law & Management"}]})}),t.jsx(K,{children:"Parent / Guardian Contact"}),t.jsxs(E,{children:[t.jsx(F,{label:"Guardian Name",placeholder:"Enter guardian name",leftIcon:t.jsx(Q,{size:18}),error:(v=x.guardianName)==null?void 0:v.message,...g("guardianName")}),t.jsx(F,{label:"Guardian Mobile Number",placeholder:"Enter phone number",leftIcon:t.jsx(we,{size:18}),error:(p=x.guardianPhone)==null?void 0:p.message,...g("guardianPhone")})]}),t.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:12,marginTop:16},children:[t.jsx(n,{type:"button",variant:"secondary",onClick:o,children:"Cancel"}),t.jsx(n,{type:"submit",variant:"primary",leftIcon:t.jsx(C,{size:18}),isLoading:f,children:"Save & Complete Profile"})]})]})})},Je=s.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Ue=s.div`
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
`,Ye=s.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.xs};
`,He=s.h1`
  font-size: ${({theme:e})=>e.fontSize.xxxl};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  margin: 0;
  color: #ffffff;
`,qe=s.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  flex-wrap: wrap;
`,Ke=s.span`
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
`;const Xe=s.div`
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
`,Qe=s.div`
  display: flex;
  align-items: flex-start;
  gap: ${({theme:e})=>e.spacing.md};
`,Ze=s.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.xs};
`,et=s.h3`
  font-size: ${({theme:e})=>e.fontSize.lg};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,tt=s.p`
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
`;const st=ke`
  0% {
    box-shadow: 0 0 0 0 rgba(93, 35, 132, 0.4);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(93, 35, 132, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(93, 35, 132, 0);
  }
`,ot=s.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xl};
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,it=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing.md};
  padding-bottom: ${({theme:e})=>e.spacing.md};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
`,nt=s.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
`,at=s.h2`
  font-size: ${({theme:e})=>e.fontSize.xl};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,rt=s.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 2px 0 0 0;
`,lt=s.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: ${({theme:e})=>e.spacing.xs};
`,ct=s.div`
  display: flex;
  align-items: flex-start;
  gap: ${({theme:e})=>e.spacing.lg};
  position: relative;
  min-height: 54px;

  &:last-child {
    min-height: auto;
  }
`,dt=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 24px;
  flex-shrink: 0;
  align-self: stretch;
`,mt=s.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  z-index: 2;
  transition: all 0.3s ease;

  ${({$status:e})=>e==="completed"&&D`
      background-color: #16a34a;
      color: #ffffff;
      border: 2px solid #16a34a;
    `}

  ${({$status:e,theme:o})=>e==="current"&&D`
      background-color: ${o.colors.primary};
      color: #ffffff;
      border: 2px solid ${o.colors.primary};
      animation: ${st} 2s infinite;
    `}

  ${({$status:e,theme:o})=>e==="upcoming"&&D`
      background-color: ${o.colors.surface};
      color: ${o.colors.textSecondary};
      border: 2px solid ${o.colors.border};
    `}
`,pt=s.div`
  width: 2px;
  flex: 1;
  min-height: 16px;
  background-color: ${({$completed:e,theme:o})=>e?"#16A34A":o.colors.border};
  margin: 0;
  z-index: 1;
`,ut=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding-bottom: ${({theme:e})=>e.spacing.md};
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing.sm};
`,gt=s.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,xt=s.h4`
  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({$status:e,theme:o})=>e==="current"?o.fontWeight.bold:e==="completed"?o.fontWeight.semibold:o.fontWeight.medium};
  color: ${({$status:e,theme:o})=>e==="upcoming"?o.colors.textSecondary:o.colors.text};
  margin: 0;
`,ft=s.span`
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
`;const L=s.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: 8px;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${({$variant:e,theme:o})=>e==="success"?"#DCFCE7":e==="warning"?o.colors.warningLight:o.colors.primaryLight};
  color: ${({$variant:e,theme:o})=>e==="success"?"#15803D":e==="warning"?"#B45309":o.colors.primary};
  border: 1px solid
    ${({$variant:e})=>e==="success"?"#86EFAC":e==="warning"?"#FCD34D":"#DDD6FE"};
`,ht=s.div`
  background-color: ${({$status:e})=>e==="current"?"#FAF5FF":e==="completed"?"#F0FDF4":"#F9FAFB"};
  border: 1px solid
    ${({$status:e,theme:o})=>e==="current"?"#D8B4FE":e==="completed"?"#BBF7D0":o.colors.border};
  border-radius: 4px;
  padding: 6px 12px;
  margin-top: 0px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 3px;
`,St=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
`,bt=s.h3`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 5px;
`,ne=s.button`
  background-color: ${({$disabled:e})=>e?"#9CA3AF":"#16A34A"};
  color: #ffffff;
  border: 1px solid ${({$disabled:e})=>e?"#9CA3AF":"#15803D"};
  border-radius: 4px;
  padding: 3px 10px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: ${({$disabled:e})=>e?"not-allowed":"pointer"};
  display: inline-flex;
  align-items: center;
  gap: 3px;
  transition: all 0.2s ease;

  &:hover {
    ${({$disabled:e})=>!e&&D`
        background-color: #15803D;
        box-shadow: 0 2px 4px rgba(22, 163, 74, 0.3);
      `}
  }
`,yt=s.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.775rem;
  color: #4B5563;
  font-weight: 500;
`,jt=s.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.725rem;
  margin-top: 1px;
  padding-top: 3px;
  border-top: 1px dashed #E5E7EB;
  flex-wrap: wrap;
`,X=s.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 0.725rem;
  font-weight: 600;
  color: ${({$danger:e,theme:o})=>e?"#DC2626":o.colors.primary};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 3px;

  &:hover {
    text-decoration: underline;
    color: ${({$danger:e,theme:o})=>e?"#991B1B":o.colors.primaryHover||"#4C1D95"};
  }
`,ae=s.span`
  color: #9CA3AF;
  font-size: 0.725rem;
  font-weight: 400;
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
`;const re=s.div`
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
`;const Et=()=>{const e=ve(),o=le(),c=ze(i=>i.user),[M,P]=r.useState(!1),[u,g]=r.useState(!1),[m,_]=r.useState(!1),[w,x]=r.useState(!1),[f,T]=r.useState(!1),[d,k]=r.useState(!1),[a,v]=r.useState(!1),[p,h]=r.useState(!1),[R]=r.useState(!1),[B,de]=r.useState(""),[N,me]=r.useState(""),[A,pe]=r.useState(!1),[Z,ee]=r.useState(!1),[z,G]=r.useState(null);r.useEffect(()=>{const i=localStorage.getItem("pwc_student_profile_completed")==="true",b=localStorage.getItem("pwc_precounselling_submitted")==="true"||localStorage.getItem("pwc_student_precounseling_form_submitted")==="true",I=localStorage.getItem("pwc_parent_form_submitted")==="true",l=localStorage.getItem("pwc_assessment_form_submitted")==="true",V=localStorage.getItem("pwc_sessions_booked")==="true",J=localStorage.getItem("pwc_session_1_completed")==="true",U=localStorage.getItem("pwc_session_2_completed")==="true",be=localStorage.getItem("pwc_session_1_slot")||"May 12, 2026 • 05:00 PM - 06:00 PM",ye=localStorage.getItem("pwc_session_2_slot")||"May 15, 2026 • 05:00 PM - 06:00 PM",je=localStorage.getItem("pwc_student_feedback_submitted")==="true",Ce=localStorage.getItem("pwc_parent_feedback_submitted")==="true";g(i),_(b),x(I),T(l),k(V),v(J),h(U),de(be),me(ye),pe(je),ee(Ce)},[]);const W=i=>{const b=i===1?"https://meet.google.com/abc-defg-hij":"https://meet.google.com/xyz-uvwx-rst";window.open(b,"_blank"),o.info(`Launching Video Session ${i}`,"Connecting to video counseling room with Sarah Jenkins (M.Sc Psych)...")},ue=()=>{e(S.BOOK_SESSIONS)},te=()=>{localStorage.setItem("pwc_session_1_completed","true"),v(!0),o.success("Session 1 Completed!","Session 1 has been marked as completed. Session 2 card is now active on your dashboard.")},se=()=>{localStorage.setItem("pwc_session_2_completed","true"),h(!0),o.success("Session 2 Completed!","Session 2 completed. Feedback & Ikigai Report unlocked!")},ge=()=>{x(!0),localStorage.setItem("pwc_parent_form_submitted","true"),o.success("Pre-Counselling Form Parent Completed!","Parent form marked as completed (Form link sent via email to parent).")},xe=()=>{ee(!0),localStorage.setItem("pwc_parent_feedback_submitted","true"),o.success("Parent Feedback Completed!","Parent feedback form marked as completed.")},$=(()=>{const i=u?"completed":"current",b=m?"completed":u?"current":"upcoming",I=f?"completed":m?"current":"upcoming",l=d?"completed":f?"current":"upcoming",V=a?"completed":d?"current":"upcoming",J=p?"completed":a?"current":"upcoming",U=A?"completed":p?"current":"upcoming";return[{id:1,title:"Student Profile Form",subtext:u?"Completed":"Mandatory Step 1 — Personal & Parent Details",status:i,attachedStatus:null,action:u?null:t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(Q,{size:16}),onClick:()=>e(S.STUDENT_PROFILE_FORM),children:"Fill Profile Form"})},{id:2,title:"Pre-Counselling Form Student",subtext:m?"Submitted":u?"Step 2 — Ready to start 20-min interest assessment":"Locked — Complete Student Profile Form first",status:b,attachedStatus:w?t.jsxs(L,{$variant:"success",children:[t.jsx(C,{size:13}),t.jsx("span",{children:"Parent Form Completed"})]}):t.jsxs(L,{$variant:"warning",children:[t.jsx(oe,{size:13,style:{color:"#D97706"}}),t.jsx("span",{children:"waiting for parent to fill the pre counselling form"})]}),action:t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[u&&!m&&t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(Ee,{size:16}),onClick:()=>e(S.PRE_COUNSELLING_FORM),children:"Start Student Form"}),m&&!w&&t.jsx(n,{variant:"secondary",size:"sm",leftIcon:t.jsx(Le,{size:16}),onClick:ge,children:"Complete Parent Form"})]})},{id:3,title:"Assessment Form",subtext:f?"Completed":m?"Step 3 — Psychometric abilities & career interest assessment":"Locked — Complete Pre-Counselling Form first",status:I,attachedStatus:null,action:m&&!f?t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(q,{size:16}),onClick:()=>e(S.ASSESSMENT_FORM),children:"Start Assessment Form"}):null},{id:4,title:"Booking session 1 & 2",subtext:d?"Sessions Scheduled":f?"Select dates and book 1-on-1 counseling video calls":"Locked — Complete Assessment Form first",status:l,attachedStatus:null,action:f&&!d?t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(De,{size:16}),onClick:ue,children:"Book Sessions 1 & 2"}):null},{id:5,title:"Video session 1",subtext:a?`Completed (${B||"May 12, 5pm-6pm"}) • Counsellor Notes Added by Sarah Jenkins`:d?`Scheduled (${B||"May 12, 5pm-6pm"}) • Email & WA Reminders Dispatched`:"Initial Career Exploration Call",status:V,attachedStatus:null,action:d&&!a?t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(Y,{size:16}),onClick:()=>W(1),children:R?"Join Video Call (Active)":"Join Video Call"}),t.jsx(n,{variant:"secondary",size:"sm",leftIcon:t.jsx(C,{size:16}),onClick:te,children:"Mark Session 1 Completed"})]}):null},{id:6,title:"Video session 2",subtext:p?`Completed (${N||"May 15, 5pm-6pm"}) • Final Stream & Roadmap Notes Added`:a?`Active Session 2 (${N||"May 15, 5pm-6pm"}) • Email & WA Reminders Dispatched`:"Ikigai & Stream Review Call",status:J,attachedStatus:null,action:a&&!p?t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(Y,{size:16}),onClick:()=>W(2),children:R?"Join Video Call (Active)":"Join Video Call"}),t.jsx(n,{variant:"secondary",size:"sm",leftIcon:t.jsx(C,{size:16}),onClick:se,children:"Mark Session 2 Completed"})]}):null},{id:7,title:"Student Feedback Form",subtext:A?"Completed":p?"Share your feedback on the counseling experience":"Locked — Complete Session 2 first",status:U,attachedStatus:Z?t.jsxs(L,{$variant:"success",children:[t.jsx(C,{size:13}),t.jsx("span",{children:"Parent Feedback Completed"})]}):t.jsxs(L,{$variant:"warning",children:[t.jsx(oe,{size:13,style:{color:"#D97706"}}),t.jsx("span",{children:"waiting for parent feedback"})]}),action:t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[p&&!A&&t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(q,{size:16}),onClick:()=>e(S.STUDENT_FEEDBACK_FORM),children:"Complete Student Feedback"}),A&&!Z&&t.jsx(n,{variant:"secondary",size:"sm",leftIcon:t.jsx(q,{size:16}),onClick:xe,children:"Complete Parent Feedback"})]})}]})(),O=$.filter(i=>i.status==="completed").length,fe=Math.round(O/$.length*100),he=i=>{e(S.BOOK_SESSIONS),o.info(`Reschedule Video Session ${i}`,"Select a new date and time slot for your counseling video session.")},Se=()=>{z===1?(k(!1),localStorage.removeItem("pwc_sessions_booked"),o.warning("Session 1 Cancelled","Your Video Session 1 has been cancelled. You can book a new slot anytime.")):z===2&&o.warning("Session 2 Cancelled","Your Video Session 2 has been cancelled. You can reschedule a new slot anytime."),G(null)};return t.jsxs(Je,{children:[t.jsxs(Ue,{children:[t.jsxs(Ye,{children:[t.jsxs(He,{children:["Welcome back, ",(c==null?void 0:c.name)||"Alex Johnson","!"]}),t.jsxs(qe,{children:[t.jsx(Ie,{size:16})," Grade 11 - Science",t.jsxs(Ke,{children:[t.jsx(ce,{size:12,style:{display:"inline",marginRight:4}}),"St. Xavier's Senior Secondary School"]})]})]}),t.jsx(n,{variant:"secondary",size:"md",leftIcon:t.jsx(Fe,{size:18}),onClick:()=>e(S.CAREER_LIBRARY),style:{background:"rgba(255, 255, 255, 0.95)",color:"#5D2384",border:"none"},children:"Explore Careers"})]}),t.jsxs(ot,{children:[t.jsxs(it,{children:[t.jsxs(nt,{children:[t.jsx(re,{$color:"#5D2384",$bg:"#F4ECF8",children:t.jsx(Pe,{size:24})}),t.jsxs("div",{children:[t.jsx(at,{children:"Your Counseling Journey Progress"}),t.jsx(rt,{children:"Follow the 7 milestone steps to complete your counseling journey."})]})]}),t.jsxs(y,{variant:O===$.length?"success":"primary",size:"md",children:[O," of ",$.length," Steps Completed (",fe,"%)"]})]}),t.jsx(lt,{children:$.map((i,b)=>{const I=i.id===5||i.id===6,l=i.id===5?1:2;return t.jsxs(ct,{children:[t.jsxs(dt,{children:[t.jsx(mt,{$status:i.status,children:i.status==="completed"?t.jsx(C,{size:14}):i.status==="current"?t.jsx("span",{style:{width:8,height:8,borderRadius:"50%",background:"#fff"}}):t.jsx("span",{style:{fontSize:10},children:i.id})}),b<$.length-1&&t.jsx(pt,{$completed:i.status==="completed"})]}),t.jsx(ut,{children:I?t.jsxs(ht,{$status:i.status,children:[t.jsxs(St,{children:[t.jsxs(bt,{children:["Session ",l,i.status==="completed"&&t.jsx(y,{variant:"success",size:"sm",children:"Completed"}),i.status==="current"&&t.jsx(y,{variant:"primary",size:"sm",children:"In Progress"})]}),i.status==="current"?t.jsxs(ne,{type:"button",onClick:()=>W(l),children:[t.jsx(Y,{size:13}),"Join"]}):i.status==="upcoming"?t.jsx(ne,{type:"button",$disabled:!0,title:"Locked — Reach this step to join video call",children:"Join"}):null]}),t.jsxs(yt,{children:[t.jsx(_e,{size:13,style:{color:"#6B7280",flexShrink:0}}),t.jsx("span",{children:d||i.status==="completed"?(l===1?B:N)||(l===1?"May 12, 2026 • 05:00 PM - 06:00 PM":"May 15, 2026 • 05:00 PM - 06:00 PM"):l===1?"Initial Career Exploration Call":"Ikigai & Stream Review Call"})]}),i.status==="current"&&t.jsxs(jt,{children:[t.jsxs(X,{type:"button",$danger:!0,onClick:()=>G(l),children:[t.jsx(Re,{size:12}),"Cancel"]}),t.jsx(ae,{children:"|"}),t.jsxs(X,{type:"button",onClick:()=>he(l),children:[t.jsx(Ae,{size:12}),"Reschedule"]}),t.jsx(ae,{children:"|"}),t.jsxs(X,{type:"button",onClick:l===1?te:se,style:{color:"#16A34A"},children:[t.jsx(C,{size:12}),"Mark Completed"]})]})]}):t.jsxs(t.Fragment,{children:[t.jsxs(gt,{children:[t.jsxs(xt,{$status:i.status,children:[i.title,i.status==="completed"&&t.jsx("span",{style:{marginLeft:8},children:t.jsx(y,{variant:"success",size:"sm",children:"Completed"})}),i.status==="current"&&t.jsx("span",{style:{marginLeft:8},children:t.jsx(y,{variant:"primary",size:"sm",children:"In Progress"})}),i.attachedStatus]}),t.jsx(ft,{children:i.subtext})]}),i.action&&t.jsx("div",{children:i.action})]})})]},i.id)})})]}),t.jsxs(Xe,{style:{borderLeftColor:a?"#16A34A":"#9CA3AF"},children:[t.jsxs(Qe,{children:[t.jsx(re,{$color:a?"#16A34A":"#6B7280",$bg:a?"#DCFCE7":"#F3F4F6",children:t.jsx(H,{size:24})}),t.jsxs(Ze,{children:[t.jsxs(et,{children:["Ikigai Counseling Report",a?t.jsx(y,{variant:"success",size:"sm",children:"Unlocked"}):t.jsx(y,{variant:"default",size:"sm",children:"Locked"})]}),t.jsx(tt,{children:a?"Your comprehensive Ikigai career roadmap report is generated and ready to view or download.":"Complete Session 1 (Initial Career Exploration Call) to unlock your official Ikigai report."})]})]}),a?t.jsx(n,{variant:"primary",size:"md",leftIcon:t.jsx(H,{size:18}),onClick:()=>e(S.GENERATE_REPORT.replace(":sessionId","sess-counselor-1")),children:"View Ikigai Report"}):t.jsx(n,{variant:"secondary",size:"md",leftIcon:t.jsx(H,{size:18}),disabled:!0,title:"Complete Session 1 to unlock report",children:"View Ikigai Report (Locked)"})]}),t.jsx(Ve,{isOpen:M,onClose:()=>P(!1),initialName:(c==null?void 0:c.name)||"Alex Johnson",initialEmail:(c==null?void 0:c.email)||"student@pwc.com",onSuccess:()=>{g(!0),localStorage.setItem("pwc_student_profile_completed","true")}}),t.jsx(Me,{isOpen:z!==null,onClose:()=>G(null),onConfirm:Se,title:`Cancel Video Session ${z}?`,description:`Are you sure you want to cancel your Video Session ${z}? You can re-book or reschedule a new time slot anytime.`,variant:"danger",confirmText:"Cancel Session",cancelText:"Keep Session"})]})};export{Et as StudentPortalPage};
