import{e as ce,j as t,R as Q,d as ve,a0 as de,bh as ze,B as n,h as C,g as s,bi as M,bj as Fe,u as Ie,a as Pe,r,a1 as _e,c as p,a8 as Re,bk as Ae,z as Y,aM as Le,G as Ee,X as Me,bg as H,ak as Te,U as ie,D as De,bl as oe,w as q,y as Ne}from"./index-D8LPzpF0.js";import{B as y}from"./Badge-BEDhCnBZ.js";import{A as Be}from"./AlertModal-BsdwHE3_.js";import{u as Ge,a as We,o as Oe,s as j}from"./types-BMmo4VCQ.js";import{M as Ve}from"./Modal-DgZwUWAf.js";import{I}from"./Input-BHsgREms.js";import{S as ne}from"./Select-CVMngjes.js";import"./Badge.styles-DvrzXK6I.js";import"./ConfirmDialog-Cx-Ljo-7.js";import"./SuccessModal-DRZxqmq7.js";import"./SuccessModal.styles-Ska6LGj1.js";const Je=Oe({fullName:j().min(1,"Full name is required"),email:j().email("Enter a valid email"),schoolName:j().min(1,"School name is required"),grade:j().min(1,"Grade is required"),guardianName:j().min(1,"Guardian name is required"),guardianPhone:j().min(1,"Guardian phone is required"),targetStream:j().min(1,"Select target stream")}),Ue=s.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,L=s.div`
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
`,Ye=({isOpen:e,onClose:i,initialName:c="Alex Johnson",initialEmail:T="student@pwc.com",onSuccess:P})=>{var d,w,a,v,m;const u=ce(),{register:x,handleSubmit:g,setValue:_,watch:$,formState:{errors:f,isSubmitting:h}}=Ge({resolver:We(Je),defaultValues:{fullName:c,email:T,schoolName:"St. Xavier's Senior Secondary School",grade:"11th Grade (Science)",guardianName:"Robert Johnson",guardianPhone:"+91 98765 43210",targetStream:"Engineering & Technology"}}),D=async b=>{await new Promise(R=>setTimeout(R,500)),u.success("Student Profile Form Completed!",`Profile details for ${b.fullName} saved successfully.`),P&&P(),i()};return t.jsx(Ve,{isOpen:e,onClose:i,title:"Student Profile Form (Step 1 - Mandatory)",subtitle:"Fill out your personal information, school details, and guardian contacts.",size:"lg",children:t.jsxs(Ue,{onSubmit:g(D),noValidate:!0,children:[t.jsx(K,{children:"Personal Details"}),t.jsxs(L,{children:[t.jsx(I,{label:"Full Name",placeholder:"Enter full name",leftIcon:t.jsx(Q,{size:18}),error:(d=f.fullName)==null?void 0:d.message,...x("fullName")}),t.jsx(I,{label:"Email Address",type:"email",placeholder:"Enter email",leftIcon:t.jsx(ve,{size:18}),error:(w=f.email)==null?void 0:w.message,...x("email")})]}),t.jsx(K,{children:"Academic Information"}),t.jsxs(L,{children:[t.jsx(I,{label:"School / Institution Name",placeholder:"Enter school name",leftIcon:t.jsx(de,{size:18}),error:(a=f.schoolName)==null?void 0:a.message,...x("schoolName")}),t.jsx(ne,{label:"Current Grade / Class",value:$("grade"),onChange:b=>_("grade",b.target.value),options:[{value:"9th Grade",label:"9th Grade"},{value:"10th Grade",label:"10th Grade"},{value:"11th Grade (Science)",label:"11th Grade (Science)"},{value:"11th Grade (Commerce)",label:"11th Grade (Commerce)"},{value:"11th Grade (Arts)",label:"11th Grade (Arts)"},{value:"12th Grade (Science)",label:"12th Grade (Science)"},{value:"12th Grade (Commerce)",label:"12th Grade (Commerce)"}]})]}),t.jsx(L,{children:t.jsx(ne,{label:"Primary Career Stream Focus",value:$("targetStream"),onChange:b=>_("targetStream",b.target.value),options:[{value:"Engineering & Technology",label:"Engineering & Technology"},{value:"Medical & Healthcare",label:"Medical & Healthcare"},{value:"Finance & Commerce",label:"Finance & Commerce"},{value:"Arts & Design",label:"Arts & Design"},{value:"Law & Management",label:"Law & Management"}]})}),t.jsx(K,{children:"Parent / Guardian Contact"}),t.jsxs(L,{children:[t.jsx(I,{label:"Guardian Name",placeholder:"Enter guardian name",leftIcon:t.jsx(Q,{size:18}),error:(v=f.guardianName)==null?void 0:v.message,...x("guardianName")}),t.jsx(I,{label:"Guardian Mobile Number",placeholder:"Enter phone number",leftIcon:t.jsx(ze,{size:18}),error:(m=f.guardianPhone)==null?void 0:m.message,...x("guardianPhone")})]}),t.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:12,marginTop:16},children:[t.jsx(n,{type:"button",variant:"secondary",onClick:i,children:"Cancel"}),t.jsx(n,{type:"submit",variant:"primary",leftIcon:t.jsx(C,{size:18}),isLoading:h,children:"Save & Complete Profile"})]})]})})},He=s.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,qe=s.div`
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
`,Ke=s.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.xs};
`,Xe=s.h1`
  font-size: ${({theme:e})=>e.fontSize.xxxl};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  margin: 0;
  color: #ffffff;
`,Qe=s.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  flex-wrap: wrap;
`,Ze=s.span`
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
`;const et=s.div`
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
`,tt=s.div`
  display: flex;
  align-items: flex-start;
  gap: ${({theme:e})=>e.spacing.md};
`,st=s.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.xs};
`,it=s.h3`
  font-size: ${({theme:e})=>e.fontSize.lg};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,ot=s.p`
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
`;const nt=Fe`
  0% {
    box-shadow: 0 0 0 0 rgba(93, 35, 132, 0.4);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(93, 35, 132, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(93, 35, 132, 0);
  }
`,at=s.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xl};
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,rt=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing.md};
  padding-bottom: ${({theme:e})=>e.spacing.md};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
`,lt=s.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
`,ct=s.h2`
  font-size: ${({theme:e})=>e.fontSize.xl};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,dt=s.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 2px 0 0 0;
`,mt=s.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: ${({theme:e})=>e.spacing.xs};
`,pt=s.div`
  display: flex;
  align-items: flex-start;
  gap: ${({theme:e})=>e.spacing.lg};
  position: relative;
  min-height: 54px;

  &:last-child {
    min-height: auto;
  }
`,ut=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 24px;
  flex-shrink: 0;
  align-self: stretch;
`,gt=s.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  z-index: 2;
  transition: all 0.3s ease;

  ${({$status:e})=>e==="completed"&&M`
      background-color: #16a34a;
      color: #ffffff;
      border: 2px solid #16a34a;
    `}

  ${({$status:e,theme:i})=>e==="current"&&M`
      background-color: ${i.colors.primary};
      color: #ffffff;
      border: 2px solid ${i.colors.primary};
      animation: ${nt} 2s infinite;
    `}

  ${({$status:e,theme:i})=>e==="upcoming"&&M`
      background-color: ${i.colors.surface};
      color: ${i.colors.textSecondary};
      border: 2px solid ${i.colors.border};
    `}
`,xt=s.div`
  width: 2px;
  flex: 1;
  min-height: 16px;
  background-color: ${({$completed:e,theme:i})=>e?"#16A34A":i.colors.border};
  margin: 0;
  z-index: 1;
`,ft=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding-bottom: ${({theme:e})=>e.spacing.md};
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing.sm};
`,ht=s.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,bt=s.h4`
  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({$status:e,theme:i})=>e==="current"?i.fontWeight.bold:e==="completed"?i.fontWeight.semibold:i.fontWeight.medium};
  color: ${({$status:e,theme:i})=>e==="upcoming"?i.colors.textSecondary:i.colors.text};
  margin: 0;
`,St=s.span`
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
`;const E=s.div`
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
`,yt=s.div`
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
`,jt=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
`,Ct=s.h3`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 5px;
`,ae=s.button`
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
    ${({$disabled:e})=>!e&&M`
        background-color: #15803D;
        box-shadow: 0 2px 4px rgba(22, 163, 74, 0.3);
      `}
  }
`,kt=s.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.775rem;
  color: #4B5563;
  font-weight: 500;
`,$t=s.div`
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
  color: ${({$danger:e,theme:i})=>e?"#DC2626":i.colors.primary};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 3px;

  &:hover {
    text-decoration: underline;
    color: ${({$danger:e,theme:i})=>e?"#991B1B":i.colors.primaryHover||"#4C1D95"};
  }
`,re=s.span`
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
`;const le=s.div`
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
`;const Tt=()=>{const e=Ie(),i=ce(),c=Pe(o=>o.user),[T,P]=r.useState(!1),[u,x]=r.useState(!1),[g,_]=r.useState(!1),[$,f]=r.useState(!1),[h,D]=r.useState(!1),[d,w]=r.useState(!1),[a,v]=r.useState(!1),[m,b]=r.useState(!1),[R]=r.useState(!1),[N,me]=r.useState(""),[B,pe]=r.useState(""),[A,ue]=r.useState(!1),[Z,ee]=r.useState(!1),[z,G]=r.useState(null);r.useEffect(()=>{const o=localStorage.getItem("pwc_student_profile_completed")==="true",S=localStorage.getItem("pwc_precounselling_submitted")==="true"||localStorage.getItem("pwc_student_precounseling_form_submitted")==="true",F=localStorage.getItem("pwc_parent_form_submitted")==="true",l=localStorage.getItem("pwc_assessment_form_submitted")==="true",V=localStorage.getItem("pwc_sessions_booked")==="true",J=localStorage.getItem("pwc_session_1_completed")==="true",U=localStorage.getItem("pwc_session_2_completed")==="true",Ce=localStorage.getItem("pwc_session_1_slot")||"May 12, 2026 • 05:00 PM - 06:00 PM",ke=localStorage.getItem("pwc_session_2_slot")||"May 15, 2026 • 05:00 PM - 06:00 PM",$e=localStorage.getItem("pwc_student_feedback_submitted")==="true",we=localStorage.getItem("pwc_parent_feedback_submitted")==="true";x(o),_(S),f(F),D(l),w(V),v(J),b(U),me(Ce),pe(ke),ue($e),ee(we)},[]);const W=o=>{const S=o===1?"https://meet.google.com/abc-defg-hij":"https://meet.google.com/xyz-uvwx-rst";window.open(S,"_blank"),i.info(`Launching Video Session ${o}`,"Connecting to video counseling room with Sarah Jenkins (M.Sc Psych)...")},ge=()=>{e(p.BOOK_SESSIONS)},te=()=>{localStorage.setItem("pwc_session_1_completed","true"),v(!0),i.success("Session 1 Completed!","Session 1 has been marked as completed. Session 2 card is now active on your dashboard.")},se=()=>{localStorage.setItem("pwc_session_2_completed","true"),b(!0),i.success("Session 2 Completed!","Session 2 completed. Feedback & Ikigai Report unlocked!")},xe=()=>{const o=`${window.location.origin}${p.PARENT_PRE_COUNSELLING_FORM}`;navigator.clipboard.writeText(o),i.success("Parent Form Link Copied!","Pre-Counselling Form Parent link copied to clipboard.")},fe=()=>{const o=`${window.location.origin}${p.PARENT_FEEDBACK_FORM}`;navigator.clipboard.writeText(o),i.success("Parent Feedback Link Copied!","Parent Feedback Form link copied to clipboard.")},he=()=>{f(!0),localStorage.setItem("pwc_parent_form_submitted","true"),i.success("Pre-Counselling Form Parent Completed!","Parent form marked as completed (Form link sent via email to parent).")},be=()=>{ee(!0),localStorage.setItem("pwc_parent_feedback_submitted","true"),i.success("Parent Feedback Completed!","Parent feedback form marked as completed.")},k=(()=>{const o=u?"completed":"current",S=g?"completed":u?"current":"upcoming",F=h?"completed":g?"current":"upcoming",l=d?"completed":h?"current":"upcoming",V=a?"completed":d?"current":"upcoming",J=m?"completed":a?"current":"upcoming",U=A?"completed":m?"current":"upcoming";return[{id:1,title:"Student Profile Form",subtext:u?"Completed":"Mandatory Step 1 — Personal & Parent Details",status:o,attachedStatus:null,action:u?null:t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(Q,{size:16}),onClick:()=>e(p.STUDENT_PROFILE_FORM),children:"Fill Profile Form"})},{id:2,title:"Pre-Counselling Form Student",subtext:g?"Submitted":u?"Step 2 — Ready to start 20-min interest assessment":"Locked — Complete Student Profile Form first",status:S,attachedStatus:$?t.jsxs(E,{$variant:"success",children:[t.jsx(C,{size:13}),t.jsx("span",{children:"Parent Form Completed"})]}):t.jsxs(E,{$variant:"warning",children:[t.jsx(oe,{size:13,style:{color:"#D97706"}}),t.jsx("span",{children:"waiting for parent to fill the pre counselling form"})]}),action:t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[u&&!g&&t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(Te,{size:16}),onClick:()=>e(p.PRE_COUNSELLING_FORM),children:"Start Student Form"}),u&&t.jsx(n,{variant:"secondary",size:"sm",leftIcon:t.jsx(ie,{size:16}),onClick:xe,children:"Copy Pre-Counselling Form Parent Link"}),g&&!$&&t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(De,{size:16}),onClick:he,children:"Complete Parent Form"})]})},{id:3,title:"Assessment Form",subtext:h?"Completed":g?"Step 3 — Psychometric abilities & career interest assessment":"Locked — Complete Pre-Counselling Form first",status:F,attachedStatus:null,action:g&&!h?t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(q,{size:16}),onClick:()=>e(p.ASSESSMENT_FORM),children:"Start Assessment Form"}):null},{id:4,title:"Booking session 1 & 2",subtext:d?"Sessions Scheduled":h?"Select dates and book 1-on-1 counseling video calls":"Locked — Complete Assessment Form first",status:l,attachedStatus:null,action:h&&!d?t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(Ne,{size:16}),onClick:ge,children:"Book Sessions 1 & 2"}):null},{id:5,title:"Video session 1",subtext:a?`Completed (${N||"May 12, 5pm-6pm"}) • Counsellor Notes Added by Sarah Jenkins`:d?`Scheduled (${N||"May 12, 5pm-6pm"}) • Email & WA Reminders Dispatched`:"Initial Career Exploration Call",status:V,attachedStatus:null,action:d&&!a?t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(Y,{size:16}),onClick:()=>W(1),children:R?"Join Video Call (Active)":"Join Video Call"}),t.jsx(n,{variant:"secondary",size:"sm",leftIcon:t.jsx(C,{size:16}),onClick:te,children:"Mark Session 1 Completed"})]}):null},{id:6,title:"Video session 2",subtext:m?`Completed (${B||"May 15, 5pm-6pm"}) • Final Stream & Roadmap Notes Added`:a?`Active Session 2 (${B||"May 15, 5pm-6pm"}) • Email & WA Reminders Dispatched`:"Ikigai & Stream Review Call",status:J,attachedStatus:null,action:a&&!m?t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(Y,{size:16}),onClick:()=>W(2),children:R?"Join Video Call (Active)":"Join Video Call"}),t.jsx(n,{variant:"secondary",size:"sm",leftIcon:t.jsx(C,{size:16}),onClick:se,children:"Mark Session 2 Completed"})]}):null},{id:7,title:"Student Feedback Form",subtext:A?"Completed":m?"Share your feedback on the counseling experience":"Locked — Complete Session 2 first",status:U,attachedStatus:Z?t.jsxs(E,{$variant:"success",children:[t.jsx(C,{size:13}),t.jsx("span",{children:"Parent Feedback Completed"})]}):t.jsxs(E,{$variant:"warning",children:[t.jsx(oe,{size:13,style:{color:"#D97706"}}),t.jsx("span",{children:"waiting for parent feedback"})]}),action:t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[m&&!A&&t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(q,{size:16}),onClick:()=>e(p.STUDENT_FEEDBACK_FORM),children:"Complete Student Feedback"}),m&&t.jsx(n,{variant:"secondary",size:"sm",leftIcon:t.jsx(ie,{size:16}),onClick:fe,children:"Copy Parent Feedback Form Link"}),A&&!Z&&t.jsx(n,{variant:"primary",size:"sm",leftIcon:t.jsx(q,{size:16}),onClick:be,children:"Complete Parent Feedback"})]})}]})(),O=k.filter(o=>o.status==="completed").length,Se=Math.round(O/k.length*100),ye=o=>{e(p.BOOK_SESSIONS),i.info(`Reschedule Video Session ${o}`,"Select a new date and time slot for your counseling video session.")},je=()=>{z===1?(w(!1),localStorage.removeItem("pwc_sessions_booked"),i.warning("Session 1 Cancelled","Your Video Session 1 has been cancelled. You can book a new slot anytime.")):z===2&&i.warning("Session 2 Cancelled","Your Video Session 2 has been cancelled. You can reschedule a new slot anytime."),G(null)};return t.jsxs(He,{children:[t.jsxs(qe,{children:[t.jsxs(Ke,{children:[t.jsxs(Xe,{children:["Welcome back, ",(c==null?void 0:c.name)||"Alex Johnson","!"]}),t.jsxs(Qe,{children:[t.jsx(_e,{size:16})," Grade 11 - Science",t.jsxs(Ze,{children:[t.jsx(de,{size:12,style:{display:"inline",marginRight:4}}),"St. Xavier's Senior Secondary School"]})]})]}),t.jsx(n,{variant:"secondary",size:"md",leftIcon:t.jsx(Re,{size:18}),onClick:()=>e(p.CAREER_LIBRARY),style:{background:"rgba(255, 255, 255, 0.95)",color:"#5D2384",border:"none"},children:"Explore Careers"})]}),t.jsxs(at,{children:[t.jsxs(rt,{children:[t.jsxs(lt,{children:[t.jsx(le,{$color:"#5D2384",$bg:"#F4ECF8",children:t.jsx(Ae,{size:24})}),t.jsxs("div",{children:[t.jsx(ct,{children:"Your Counseling Journey Progress"}),t.jsx(dt,{children:"Follow the 7 milestone steps to complete your counseling journey."})]})]}),t.jsxs(y,{variant:O===k.length?"success":"primary",size:"md",children:[O," of ",k.length," Steps Completed (",Se,"%)"]})]}),t.jsx(mt,{children:k.map((o,S)=>{const F=o.id===5||o.id===6,l=o.id===5?1:2;return t.jsxs(pt,{children:[t.jsxs(ut,{children:[t.jsx(gt,{$status:o.status,children:o.status==="completed"?t.jsx(C,{size:14}):o.status==="current"?t.jsx("span",{style:{width:8,height:8,borderRadius:"50%",background:"#fff"}}):t.jsx("span",{style:{fontSize:10},children:o.id})}),S<k.length-1&&t.jsx(xt,{$completed:o.status==="completed"})]}),t.jsx(ft,{children:F?t.jsxs(yt,{$status:o.status,children:[t.jsxs(jt,{children:[t.jsxs(Ct,{children:["Session ",l,o.status==="completed"&&t.jsx(y,{variant:"success",size:"sm",children:"Completed"}),o.status==="current"&&t.jsx(y,{variant:"primary",size:"sm",children:"In Progress"})]}),o.status==="current"?t.jsxs(ae,{type:"button",onClick:()=>W(l),children:[t.jsx(Y,{size:13}),"Join"]}):o.status==="upcoming"?t.jsx(ae,{type:"button",$disabled:!0,title:"Locked — Reach this step to join video call",children:"Join"}):null]}),t.jsxs(kt,{children:[t.jsx(Le,{size:13,style:{color:"#6B7280",flexShrink:0}}),t.jsx("span",{children:d||o.status==="completed"?(l===1?N:B)||(l===1?"May 12, 2026 • 05:00 PM - 06:00 PM":"May 15, 2026 • 05:00 PM - 06:00 PM"):l===1?"Initial Career Exploration Call":"Ikigai & Stream Review Call"})]}),o.status==="current"&&t.jsxs($t,{children:[l!==2&&t.jsxs(t.Fragment,{children:[t.jsxs(X,{type:"button",$danger:!0,onClick:()=>G(l),children:[t.jsx(Ee,{size:12}),"Cancel"]}),t.jsx(re,{children:"|"})]}),t.jsxs(X,{type:"button",onClick:()=>ye(l),children:[t.jsx(Me,{size:12}),"Reschedule"]}),t.jsx(re,{children:"|"}),t.jsxs(X,{type:"button",onClick:l===1?te:se,style:{color:"#16A34A"},children:[t.jsx(C,{size:12}),"Mark Completed"]})]})]}):t.jsxs(t.Fragment,{children:[t.jsxs(ht,{children:[t.jsxs(bt,{$status:o.status,children:[o.title,o.status==="completed"&&t.jsx("span",{style:{marginLeft:8},children:t.jsx(y,{variant:"success",size:"sm",children:"Completed"})}),o.status==="current"&&t.jsx("span",{style:{marginLeft:8},children:t.jsx(y,{variant:"primary",size:"sm",children:"In Progress"})}),o.attachedStatus]}),t.jsx(St,{children:o.subtext})]}),o.action&&t.jsx("div",{children:o.action})]})})]},o.id)})})]}),t.jsxs(et,{style:{borderLeftColor:a?"#16A34A":"#9CA3AF"},children:[t.jsxs(tt,{children:[t.jsx(le,{$color:a?"#16A34A":"#6B7280",$bg:a?"#DCFCE7":"#F3F4F6",children:t.jsx(H,{size:24})}),t.jsxs(st,{children:[t.jsxs(it,{children:["Ikigai Counseling Report",a?t.jsx(y,{variant:"success",size:"sm",children:"Unlocked"}):t.jsx(y,{variant:"default",size:"sm",children:"Locked"})]}),t.jsx(ot,{children:a?"Your comprehensive Ikigai career roadmap report is generated and ready to view or download.":"Complete Session 1 (Initial Career Exploration Call) to unlock your official Ikigai report."})]})]}),a?t.jsx(n,{variant:"primary",size:"md",leftIcon:t.jsx(H,{size:18}),onClick:()=>e(p.GENERATE_REPORT.replace(":sessionId","sess-counselor-1")),children:"View Ikigai Report"}):t.jsx(n,{variant:"secondary",size:"md",leftIcon:t.jsx(H,{size:18}),disabled:!0,title:"Complete Session 1 to unlock report",children:"View Ikigai Report (Locked)"})]}),t.jsx(Ye,{isOpen:T,onClose:()=>P(!1),initialName:(c==null?void 0:c.name)||"Alex Johnson",initialEmail:(c==null?void 0:c.email)||"student@pwc.com",onSuccess:()=>{x(!0),localStorage.setItem("pwc_student_profile_completed","true")}}),t.jsx(Be,{isOpen:z!==null,onClose:()=>G(null),onConfirm:je,title:`Cancel Video Session ${z}?`,description:`Are you sure you want to cancel your Video Session ${z}? You can re-book or reschedule a new time slot anytime.`,variant:"danger",confirmText:"Cancel Session",cancelText:"Keep Session"})]})};export{Tt as StudentPortalPage};
