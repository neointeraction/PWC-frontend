import{e as me,j as t,R as X,d as Fe,_ as pe,aU as Ie,B as n,h as C,g as s,bi as T,bj as Pe,u as Ee,a as _e,r as a,$ as Re,c,a6 as se,bk as Ae,v as Y,aL as Le,D as Te,V as De,U as oe,bh as ie,ai as Me,S as ne,z as Ne,bl as ae,q as H,t as Be}from"./index-DxfnM77Y.js";import{B as y}from"./Badge-DIO8ZxMj.js";import{A as Ge}from"./AlertModal-BzpICTZu.js";import{T as We}from"./Tooltip-Dg_AY9d2.js";import{u as Oe,a as Ve,o as Je,s as j}from"./types-DJ0oG2tQ.js";import{M as Ue}from"./Modal-C42QGbOr.js";import{I as P}from"./Input-6IZQNX0f.js";import{S as re}from"./Select-B_H_cTqF.js";import"./Badge.styles-CbkHTPcq.js";import"./ConfirmDialog-CGkHF8o4.js";import"./SuccessModal-IoH6VInA.js";import"./SuccessModal.styles-DrpbjAXM.js";const Ye=Je({fullName:j().min(1,"Full name is required"),email:j().email("Enter a valid email"),schoolName:j().min(1,"School name is required"),grade:j().min(1,"Grade is required"),guardianName:j().min(1,"Guardian name is required"),guardianPhone:j().min(1,"Guardian phone is required"),targetStream:j().min(1,"Select target stream")}),He=s.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,A=s.div`
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
`,qe=({isOpen:e,onClose:i,initialName:l="Alex Johnson",initialEmail:D="student@pwc.com",onSuccess:E})=>{var d,$,m,v,p;const g=me(),{register:h,handleSubmit:x,setValue:_,watch:w,formState:{errors:b,isSubmitting:f}}=Oe({resolver:Ve(Ye),defaultValues:{fullName:l,email:D,schoolName:"St. Xavier's Senior Secondary School",grade:"11th Grade (Science)",guardianName:"Robert Johnson",guardianPhone:"+91 98765 43210",targetStream:"Engineering & Technology"}}),M=async S=>{await new Promise(R=>setTimeout(R,500)),g.success("Student Profile Form Completed!",`Profile details for ${S.fullName} saved successfully.`),E&&E(),i()};return t.jsx(Ue,{isOpen:e,onClose:i,title:"Student Profile Form (Step 1 - Mandatory)",subtitle:"Fill out your personal information, school details, and guardian contacts.",size:"lg",children:t.jsxs(He,{onSubmit:x(M),noValidate:!0,children:[t.jsx(q,{children:"Personal Details"}),t.jsxs(A,{children:[t.jsx(P,{label:"Full Name",placeholder:"Enter full name",leftIcon:t.jsx(X,{size:18}),error:(d=b.fullName)==null?void 0:d.message,...h("fullName")}),t.jsx(P,{label:"Email Address",type:"email",placeholder:"Enter email",leftIcon:t.jsx(Fe,{size:18}),error:($=b.email)==null?void 0:$.message,...h("email")})]}),t.jsx(q,{children:"Academic Information"}),t.jsxs(A,{children:[t.jsx(P,{label:"School / Institution Name",placeholder:"Enter school name",leftIcon:t.jsx(pe,{size:18}),error:(m=b.schoolName)==null?void 0:m.message,...h("schoolName")}),t.jsx(re,{label:"Current Grade / Class",value:w("grade"),onChange:S=>_("grade",S.target.value),options:[{value:"9th Grade",label:"9th Grade"},{value:"10th Grade",label:"10th Grade"},{value:"11th Grade (Science)",label:"11th Grade (Science)"},{value:"11th Grade (Commerce)",label:"11th Grade (Commerce)"},{value:"11th Grade (Arts)",label:"11th Grade (Arts)"},{value:"12th Grade (Science)",label:"12th Grade (Science)"},{value:"12th Grade (Commerce)",label:"12th Grade (Commerce)"}]})]}),t.jsx(A,{children:t.jsx(re,{label:"Primary Career Stream Focus",value:w("targetStream"),onChange:S=>_("targetStream",S.target.value),options:[{value:"Engineering & Technology",label:"Engineering & Technology"},{value:"Medical & Healthcare",label:"Medical & Healthcare"},{value:"Finance & Commerce",label:"Finance & Commerce"},{value:"Arts & Design",label:"Arts & Design"},{value:"Law & Management",label:"Law & Management"}]})}),t.jsx(q,{children:"Parent / Guardian Contact"}),t.jsxs(A,{children:[t.jsx(P,{label:"Guardian Name",placeholder:"Enter guardian name",leftIcon:t.jsx(X,{size:18}),error:(v=b.guardianName)==null?void 0:v.message,...h("guardianName")}),t.jsx(P,{label:"Guardian Mobile Number",placeholder:"Enter phone number",leftIcon:t.jsx(Ie,{size:18}),error:(p=b.guardianPhone)==null?void 0:p.message,...h("guardianPhone")})]}),t.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:12,marginTop:16},children:[t.jsx(n,{type:"button",variant:"secondary",onClick:i,children:"Cancel"}),t.jsx(n,{type:"submit",variant:"primary",leftIcon:t.jsx(C,{size:18}),isLoading:f,children:"Save & Complete Profile"})]})]})})},Ke=s.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Xe=s.div`
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
`,Qe=s.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.xs};
`,Ze=s.h1`
  font-size: ${({theme:e})=>e.fontSize.xxxl};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  margin: 0;
  color: #ffffff;
`,et=s.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  flex-wrap: wrap;
`,tt=s.span`
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
`;const st=s.div`
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
`,ot=s.div`
  display: flex;
  align-items: flex-start;
  gap: ${({theme:e})=>e.spacing.md};
`,it=s.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.xs};
`,nt=s.h3`
  font-size: ${({theme:e})=>e.fontSize.lg};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,at=s.p`
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
`;const rt=Pe`
  0% {
    box-shadow: 0 0 0 0 rgba(93, 35, 132, 0.4);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(93, 35, 132, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(93, 35, 132, 0);
  }
`,lt=s.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xl};
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,ct=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing.md};
  padding-bottom: ${({theme:e})=>e.spacing.md};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
`,dt=s.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
`,mt=s.h2`
  font-size: ${({theme:e})=>e.fontSize.xl};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,pt=s.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 2px 0 0 0;
`,ut=s.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: ${({theme:e})=>e.spacing.xs};
`,gt=s.div`
  display: flex;
  align-items: flex-start;
  gap: ${({theme:e})=>e.spacing.lg};
  position: relative;
  min-height: 54px;

  &:last-child {
    min-height: auto;
  }
`,xt=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 24px;
  flex-shrink: 0;
  align-self: stretch;
`,ft=s.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  z-index: 2;
  transition: all 0.3s ease;

  ${({$status:e})=>e==="completed"&&T`
      background-color: #16a34a;
      color: #ffffff;
      border: 2px solid #16a34a;
    `}

  ${({$status:e,theme:i})=>e==="current"&&T`
      background-color: ${i.colors.primary};
      color: #ffffff;
      border: 2px solid ${i.colors.primary};
      animation: ${rt} 2s infinite;
    `}

  ${({$status:e,theme:i})=>e==="upcoming"&&T`
      background-color: ${i.colors.surface};
      color: ${i.colors.textSecondary};
      border: 2px solid ${i.colors.border};
    `}
`,ht=s.div`
  width: 2px;
  flex: 1;
  min-height: 16px;
  background-color: ${({$completed:e,theme:i})=>e?"#16A34A":i.colors.border};
  margin: 0;
  z-index: 1;
`,bt=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding-bottom: ${({theme:e})=>e.spacing.md};
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing.sm};
`,St=s.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,yt=s.h4`
  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({$status:e,theme:i})=>e==="current"?i.fontWeight.bold:e==="completed"?i.fontWeight.semibold:i.fontWeight.medium};
  color: ${({$status:e,theme:i})=>e==="upcoming"?i.colors.textSecondary:i.colors.text};
  margin: 0;
`,jt=s.span`
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
  background-color: ${({$variant:e,theme:i})=>e==="success"?"#DCFCE7":e==="warning"?i.colors.warningLight:i.colors.primaryLight};
  color: ${({$variant:e,theme:i})=>e==="success"?"#15803D":e==="warning"?"#B45309":i.colors.primary};
  border: 1px solid
    ${({$variant:e})=>e==="success"?"#86EFAC":e==="warning"?"#FCD34D":"#DDD6FE"};
`,Ct=s.div`
  background-color: ${({$status:e})=>e==="current"?"#FAF5FF":e==="completed"?"#F0FDF4":"#F9FAFB"};
  border: 1px solid
    ${({$status:e,theme:i})=>e==="current"?"#D8B4FE":e==="completed"?"#BBF7D0":i.colors.border};
  border-radius: 4px;
  padding: 6px 12px;
  margin-top: 0px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 3px;
`,kt=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
`,wt=s.h3`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 5px;
`,le=s.button`
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
    ${({$disabled:e})=>!e&&T`
        background-color: #15803D;
        box-shadow: 0 2px 4px rgba(22, 163, 74, 0.3);
      `}
  }
`,$t=s.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.775rem;
  color: #4B5563;
  font-weight: 500;
`,vt=s.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.725rem;
  margin-top: 1px;
  padding-top: 3px;
  border-top: 1px dashed #E5E7EB;
  flex-wrap: wrap;
`,K=s.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 0.725rem;
  font-weight: 600;
  color: ${({$danger:e,theme:i})=>e?"#DC2626":i.colors.primary};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 3px;

  &:hover {
    text-decoration: underline;
    color: ${({$danger:e,theme:i})=>e?"#991B1B":i.colors.primaryHover||"#4C1D95"};
  }
`,ce=s.span`
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
`;const de=s.div`
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
`;const Bt=()=>{const e=Ee(),i=me(),l=_e(o=>o.user),[D,E]=a.useState(!1),[g,h]=a.useState(!1),[x,_]=a.useState(!1),[w,b]=a.useState(!1),[f,M]=a.useState(!1),[d,$]=a.useState(!1),[m,v]=a.useState(!1),[p,S]=a.useState(!1),[R]=a.useState(!1),[N,ue]=a.useState(""),[B,ge]=a.useState(""),[z,xe]=a.useState(!1),[Q,Z]=a.useState(!1),[F,G]=a.useState(null);a.useEffect(()=>{const o=localStorage.getItem("pwc_student_profile_completed")==="true",u=localStorage.getItem("pwc_precounselling_submitted")==="true"||localStorage.getItem("pwc_student_precounseling_form_submitted")==="true",I=localStorage.getItem("pwc_parent_form_submitted")==="true",r=localStorage.getItem("pwc_assessment_form_submitted")==="true",V=localStorage.getItem("pwc_sessions_booked")==="true",J=localStorage.getItem("pwc_session_1_completed")==="true",U=localStorage.getItem("pwc_session_2_completed")==="true",we=localStorage.getItem("pwc_session_1_slot")||"May 12, 2026 • 05:00 PM - 06:00 PM",$e=localStorage.getItem("pwc_session_2_slot")||"May 15, 2026 • 05:00 PM - 06:00 PM",ve=localStorage.getItem("pwc_student_feedback_submitted")==="true",ze=localStorage.getItem("pwc_parent_feedback_submitted")==="true";h(o),_(u),b(I),M(r),$(V),v(J),S(U),ue(we),ge($e),xe(ve),Z(ze)},[]);const W=o=>{const u=o===1?"https://meet.google.com/abc-defg-hij":"https://meet.google.com/xyz-uvwx-rst";window.open(u,"_blank"),i.info(`Launching Video Session ${o}`,"Connecting to video counseling room with Sarah Jenkins (M.Sc Psych)...")},fe=()=>{e(c.BOOK_SESSIONS)},ee=()=>{localStorage.setItem("pwc_session_1_completed","true"),v(!0),i.success("Session 1 Completed!","Session 1 has been marked as completed. Session 2 card is now active on your dashboard.")},te=()=>{localStorage.setItem("pwc_session_2_completed","true"),S(!0),i.success("Session 2 Completed!","Session 2 completed. Feedback & Ikigai Report unlocked!")},he=()=>{const o=`${window.location.origin}${c.PARENT_PRE_COUNSELLING_FORM}`;navigator.clipboard.writeText(o),i.success("Parent Form Link Copied!","Pre-Counselling Form Parent link copied to clipboard.")},be=()=>{const o=`${window.location.origin}${c.PARENT_FEEDBACK_FORM}`;navigator.clipboard.writeText(o),i.success("Parent Feedback Link Copied!","Parent Feedback Form link copied to clipboard.")},Se=()=>{b(!0),localStorage.setItem("pwc_parent_form_submitted","true"),i.success("Pre-Counselling Form Parent Completed!","Parent form marked as completed (Form link sent via email to parent).")},ye=()=>{Z(!0),localStorage.setItem("pwc_parent_feedback_submitted","true"),i.success("Parent Feedback Completed!","Parent feedback form marked as completed.")},k=(()=>{const o=g?"completed":"current",u=x?"completed":g?"current":"upcoming",I=f?"completed":x?"current":"upcoming",r=d?"completed":f?"current":"upcoming",V=m?"completed":d?"current":"upcoming",J=p?"completed":m?"current":"upcoming",U=z?"completed":p?"current":"upcoming";return[{id:1,title:"Student Profile Form",subtext:g?"Completed":"Mandatory Step 1 — Personal & Parent Details",status:o,attachedStatus:null,action:g?null:t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(X,{size:16}),onClick:()=>e(c.STUDENT_PROFILE_FORM),children:"Fill Profile Form"})},{id:2,title:"Pre-Counselling Form Student",subtext:x?"Submitted":g?"Step 2 — Ready to start 20-min interest assessment":"Locked — Complete Student Profile Form first",status:u,attachedStatus:w?t.jsxs(L,{$variant:"success",children:[t.jsx(C,{size:13}),t.jsx("span",{children:"Parent Form Completed"})]}):t.jsxs(L,{$variant:"warning",children:[t.jsx(ae,{size:13,style:{color:"#D97706"}}),t.jsx("span",{children:"waiting for parent to fill the pre counselling form"})]}),action:t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[g&&!x&&t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(Me,{size:16}),onClick:()=>e(c.PRE_COUNSELLING_FORM),children:"Start Student Form"}),g&&t.jsx(n,{variant:"secondary",size:"sm",leftIcon:t.jsx(ne,{size:16}),onClick:he,children:"Copy Pre-Counselling Form Parent Link"}),x&&!w&&t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(Ne,{size:16}),onClick:Se,children:"Complete Parent Form"})]})},{id:3,title:"Assessment Form",subtext:f?"Completed":x?"Step 3 — Psychometric abilities & career interest assessment":"Locked — Complete Pre-Counselling Form first",status:I,attachedStatus:null,action:x&&!f?t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(H,{size:16}),onClick:()=>e(c.ASSESSMENT_FORM),children:"Start Assessment Form"}):null},{id:4,title:"Booking session 1 & 2",subtext:d?"Sessions Scheduled":f?"Select dates and book 1-on-1 counseling video calls":"Locked — Complete Assessment Form first",status:r,attachedStatus:null,action:f&&!d?t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(Be,{size:16}),onClick:fe,children:"Book Sessions 1 & 2"}):null},{id:5,title:"Video session 1",subtext:m?`Completed (${N||"May 12, 5pm-6pm"}) • Counsellor Notes Added by Sarah Jenkins`:d?`Scheduled (${N||"May 12, 5pm-6pm"}) • Email & WA Reminders Dispatched`:"Initial Career Exploration Call",status:V,attachedStatus:null,action:d&&!m?t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(Y,{size:16}),onClick:()=>W(1),children:R?"Join Video Call (Active)":"Join Video Call"}),t.jsx(n,{variant:"secondary",size:"sm",leftIcon:t.jsx(C,{size:16}),onClick:ee,children:"Mark Session 1 Completed"})]}):null},{id:6,title:"Video session 2",subtext:p?`Completed (${B||"May 15, 5pm-6pm"}) • Final Stream & Roadmap Notes Added`:m?`Active Session 2 (${B||"May 15, 5pm-6pm"}) • Email & WA Reminders Dispatched`:"Ikigai & Stream Review Call",status:J,attachedStatus:null,action:m&&!p?t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(Y,{size:16}),onClick:()=>W(2),children:R?"Join Video Call (Active)":"Join Video Call"}),t.jsx(n,{variant:"secondary",size:"sm",leftIcon:t.jsx(C,{size:16}),onClick:te,children:"Mark Session 2 Completed"})]}):null},{id:7,title:"Student Feedback Form",subtext:z?"Completed":p?"Share your feedback on the counseling experience":"Locked — Complete Session 2 first",status:U,attachedStatus:Q?t.jsxs(L,{$variant:"success",children:[t.jsx(C,{size:13}),t.jsx("span",{children:"Parent Feedback Completed"})]}):t.jsxs(L,{$variant:"warning",children:[t.jsx(ae,{size:13,style:{color:"#D97706"}}),t.jsx("span",{children:"waiting for parent feedback"})]}),action:t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[p&&!z&&t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(H,{size:16}),onClick:()=>e(c.STUDENT_FEEDBACK_FORM),children:"Complete Student Feedback"}),p&&t.jsx(n,{variant:"secondary",size:"sm",leftIcon:t.jsx(ne,{size:16}),onClick:be,children:"Copy Parent Feedback Form Link"}),z&&!Q&&t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(H,{size:16}),onClick:ye,children:"Complete Parent Feedback"})]})}]})(),O=k.filter(o=>o.status==="completed").length,je=Math.round(O/k.length*100),Ce=o=>{e(c.BOOK_SESSIONS),i.info(`Reschedule Video Session ${o}`,"Select a new date and time slot for your counseling video session.")},ke=()=>{F===1?($(!1),localStorage.removeItem("pwc_sessions_booked"),i.warning("Session 1 Cancelled","Your Video Session 1 has been cancelled. You can book a new slot anytime.")):F===2&&i.warning("Session 2 Cancelled","Your Video Session 2 has been cancelled. You can reschedule a new slot anytime."),G(null)};return t.jsxs(Ke,{children:[t.jsxs(Xe,{children:[t.jsxs(Qe,{children:[t.jsxs(Ze,{children:["Welcome back, ",(l==null?void 0:l.name)||"Alex Johnson","!"]}),t.jsxs(et,{children:[t.jsx(Re,{size:16})," Grade 11 - Science",t.jsxs(tt,{children:[t.jsx(pe,{size:12,style:{display:"inline",marginRight:4}}),"St. Xavier's Senior Secondary School"]})]})]}),t.jsx(n,{variant:"secondary",size:"md",leftIcon:t.jsx(se,{size:18}),onClick:()=>e(c.CAREER_LIBRARY),style:{background:"rgba(255, 255, 255, 0.95)",color:"#5D2384",border:"none"},children:"Explore Careers"})]}),t.jsxs(lt,{children:[t.jsxs(ct,{children:[t.jsxs(dt,{children:[t.jsx(de,{$color:"#5D2384",$bg:"#F4ECF8",children:t.jsx(Ae,{size:24})}),t.jsxs("div",{children:[t.jsx(mt,{children:"Your Counseling Journey Progress"}),t.jsx(pt,{children:"Follow the 7 milestone steps to complete your counseling journey."})]})]}),t.jsxs(y,{variant:O===k.length?"success":"primary",size:"md",children:[O," of ",k.length," Steps Completed (",je,"%)"]})]}),t.jsx(ut,{children:k.map((o,u)=>{const I=o.id===5||o.id===6,r=o.id===5?1:2;return t.jsxs(gt,{children:[t.jsxs(xt,{children:[t.jsx(ft,{$status:o.status,children:o.status==="completed"?t.jsx(C,{size:14}):o.status==="current"?t.jsx("span",{style:{width:8,height:8,borderRadius:"50%",background:"#fff"}}):t.jsx("span",{style:{fontSize:10},children:o.id})}),u<k.length-1&&t.jsx(ht,{$completed:o.status==="completed"})]}),t.jsx(bt,{children:I?t.jsxs(Ct,{$status:o.status,children:[t.jsxs(kt,{children:[t.jsxs(wt,{children:["Session ",r,o.status==="completed"&&t.jsx(y,{variant:"success",size:"sm",children:"Completed"}),o.status==="current"&&t.jsx(y,{variant:"primary",size:"sm",children:"In Progress"})]}),o.status==="current"?t.jsxs(le,{type:"button",onClick:()=>W(r),children:[t.jsx(Y,{size:13}),"Join"]}):o.status==="upcoming"?t.jsx(le,{type:"button",$disabled:!0,title:"Locked — Reach this step to join video call",children:"Join"}):null]}),t.jsxs($t,{children:[t.jsx(Le,{size:13,style:{color:"#6B7280",flexShrink:0}}),t.jsx("span",{children:d||o.status==="completed"?(r===1?N:B)||(r===1?"May 12, 2026 • 05:00 PM - 06:00 PM":"May 15, 2026 • 05:00 PM - 06:00 PM"):r===1?"Initial Career Exploration Call":"Ikigai & Stream Review Call"})]}),o.status==="current"&&t.jsxs(vt,{children:[r!==2&&t.jsxs(t.Fragment,{children:[t.jsxs(K,{type:"button",$danger:!0,onClick:()=>G(r),children:[t.jsx(Te,{size:12}),"Cancel"]}),t.jsx(ce,{children:"|"})]}),t.jsxs(K,{type:"button",onClick:()=>Ce(r),children:[t.jsx(De,{size:12}),"Reschedule"]}),t.jsx(ce,{children:"|"}),t.jsxs(K,{type:"button",onClick:r===1?ee:te,style:{color:"#16A34A"},children:[t.jsx(C,{size:12}),"Mark Completed"]})]})]}):t.jsxs(t.Fragment,{children:[t.jsxs(St,{children:[t.jsxs(yt,{$status:o.status,children:[o.title,o.status==="completed"&&t.jsx("span",{style:{marginLeft:8},children:t.jsx(y,{variant:"success",size:"sm",children:"Completed"})}),o.status==="current"&&t.jsx("span",{style:{marginLeft:8},children:t.jsx(y,{variant:"primary",size:"sm",children:"In Progress"})}),o.attachedStatus]}),t.jsx(jt,{children:o.subtext})]}),o.action&&t.jsx("div",{children:o.action})]})})]},o.id)})})]}),(()=>{const o=f||m,u=z;return t.jsxs(st,{style:{borderLeftColor:o?"#16A34A":"#9CA3AF"},children:[t.jsxs(ot,{children:[t.jsx(de,{$color:o?"#16A34A":"#6B7280",$bg:o?"#DCFCE7":"#F3F4F6",children:t.jsx(se,{size:24})}),t.jsxs(it,{children:[t.jsxs(nt,{children:["kREATE Compass",o?t.jsx(y,{variant:"success",size:"sm",children:"Unlocked"}):t.jsx(y,{variant:"default",size:"sm",children:"Locked"})]}),t.jsx(at,{children:o?u?"Your comprehensive kREATE Compass report is complete and ready to view or download.":"Your kREATE Compass report is viewable online. Download will be unlocked after completing the Feedback step.":"Complete the Assessment Form to unlock your kREATE Compass report."})]})]}),o?t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:[t.jsx(n,{variant:"primary",size:"md",leftIcon:t.jsx(oe,{size:18}),onClick:()=>e(c.GENERATE_REPORT.replace(":sessionId","sess-counselor-1")),children:"View kREATE Compass"}),u?t.jsx(n,{variant:"secondary",size:"md",leftIcon:t.jsx(ie,{size:18}),onClick:()=>{e(c.GENERATE_REPORT.replace(":sessionId","sess-counselor-1")),setTimeout(()=>window.print(),600)},children:"Download PDF"}):t.jsx(We,{content:"Download is unlocked after completing the Feedback step",children:t.jsx("div",{children:t.jsx(n,{variant:"secondary",size:"md",leftIcon:t.jsx(ie,{size:18}),disabled:!0,title:"Download is unlocked after completing the Feedback step",children:"Download (Locked)"})})})]}):t.jsx(n,{variant:"secondary",size:"md",leftIcon:t.jsx(oe,{size:18}),disabled:!0,title:"Complete Assessment Form to unlock report",children:"View kREATE Compass (Locked)"})]})})(),t.jsx(qe,{isOpen:D,onClose:()=>E(!1),initialName:(l==null?void 0:l.name)||"Alex Johnson",initialEmail:(l==null?void 0:l.email)||"student@pwc.com",onSuccess:()=>{h(!0),localStorage.setItem("pwc_student_profile_completed","true")}}),t.jsx(Ge,{isOpen:F!==null,onClose:()=>G(null),onConfirm:ke,title:`Cancel Video Session ${F}?`,description:`Are you sure you want to cancel your Video Session ${F}? You can re-book or reschedule a new time slot anytime.`,variant:"danger",confirmText:"Cancel Session",cancelText:"Keep Session"})]})};export{Bt as StudentPortalPage};
