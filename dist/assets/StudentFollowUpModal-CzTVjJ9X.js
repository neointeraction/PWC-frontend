import{r as u,j as o,B as x,g as t,e as K,h as S,y as P,aF as m,d as T,aJ as X,aA as Z,aB as ee}from"./index-CQIsxyVc.js";import{M as B}from"./Modal-Co5MyHOO.js";import{I as h}from"./Input-BTc8i6Fv.js";import{S as oe}from"./Select-DE5um1RR.js";import"./Card.styles-riY3W49l.js";import"./Badge.styles-MB7Dm0Fa.js";import"./Checkbox-BLQlg_i7.js";import"./Table.styles-BoafHu4m.js";import"./FileUpload.styles-Y1Fz2BvR.js";import"./Breadcrumb-CQhppWVK.js";import"./ConfirmDialog-Crq_Y4vl.js";import"./SuccessModal.styles-BtFfVjkK.js";import{T as F}from"./Tooltip-5yEO6vap.js";import{f as re}from"./index-BW8bBlXO.js";const te=t.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,ne=t.div`
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,se=t.h4`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: 700;
  color: ${({theme:e})=>e.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`,ae=t.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,Ue=({isOpen:e,onClose:i,student:r,onSave:g,isSaving:d})=>{const[n,l]=u.useState(null);if(u.useEffect(()=>{if(r){const a=JSON.parse(JSON.stringify(r));a.parentMobile||(a.parentMobile="+91 9820011223"),l(a)}},[r]),!n)return null;const p=()=>{g(n)};return o.jsx(B,{isOpen:e,onClose:i,title:r!=null&&r.id?"Edit Student":"Add Student",size:"md",footer:o.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",width:"100%"},children:[o.jsx(x,{variant:"secondary",onClick:i,disabled:d,children:"Cancel"}),o.jsx(x,{onClick:p,isLoading:d,children:"Save Changes"})]}),children:o.jsx(te,{children:o.jsxs(ne,{children:[o.jsx(se,{children:"Student Information"}),o.jsxs(ae,{children:[o.jsx(h,{label:"Student Full Name",value:n.name,onChange:a=>l({...n,name:a.target.value})}),o.jsx(h,{label:"Email Address",type:"email",value:n.email,onChange:a=>l({...n,email:a.target.value})}),o.jsx(h,{label:"Mobile Number",value:n.mobile,onChange:a=>l({...n,mobile:a.target.value})}),o.jsx(h,{label:"Parent Phone Number",placeholder:"+91 9820011223",value:n.parentMobile||"",onChange:a=>l({...n,parentMobile:a.target.value})}),o.jsx(oe,{label:"Grade / Class",value:n.grade,onChange:a=>l({...n,grade:a.target.value}),options:[{value:"10th",label:"10th Grade"},{value:"11th",label:"11th Grade"},{value:"12th",label:"12th Grade"}]})]})]})})})},ie=t.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`,le=t.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,N=t.div`
  background-color: ${({theme:e})=>e.colors.surfaceHover||"#F9FAFB"};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,R=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`,z=t.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${({$role:e,theme:i})=>e==="student"?i.colors.primary:"#D97706"};
  background-color: ${({$role:e,theme:i})=>e==="student"?i.colors.primaryLight:"#FEF3C7"};
  padding: 2px 8px;
  border-radius: 4px;
`,H=t.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.text};
`,f=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 13px;
  color: ${({theme:e})=>e.colors.textSecondary};
`,y=t.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({theme:e})=>e.colors.text};
  word-break: break-all;
`,U=t.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  flex-wrap: wrap;
`,b=t.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background-color: #DCFCE7;
  border: 1px solid #86EFAC;
  color: #15803D;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #BBF7D0;
    border-color: #4ADE80;
    color: #166534;
  }
`,I=t.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  color: ${({theme:e})=>e.colors.text};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,_=t.button`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,ce=t.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 14px 16px;
`,pe=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`,de=t.span`
  font-size: 13px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  display: flex;
  align-items: center;
  gap: 6px;
`,ue=t.textarea`
  width: 100%;
  min-height: 80px;
  padding: 10px 12px;
  font-family: inherit;
  font-size: 13px;
  color: ${({theme:e})=>e.colors.text};
  background-color: ${({theme:e})=>e.colors.surfaceHover||"#F9FAFB"};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  resize: vertical;
  line-height: 1.5;

  &:focus {
    outline: none;
    border-color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.surface};
  }
`,xe=t.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 4px;
  flex-wrap: wrap;
`,ge=t.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px dashed ${({theme:e})=>e.colors.border};
  padding-top: 14px;
`,me=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,he=t.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 110px;
  overflow-y: auto;
`,fe=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 10px;
  background-color: ${({theme:e})=>e.colors.surfaceHover||"#F9FAFB"};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  font-size: 12px;
  color: ${({theme:e})=>e.colors.text};
`,ye=t.span`
  color: ${({theme:e})=>e.colors.textSecondary};
  font-size: 11px;
`,be=t.span`
  font-size: 12px;
  color: ${({theme:e})=>e.colors.textMuted||"#9CA3AF"};
  font-style: italic;
  padding: 4px 0;
`,je=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
  flex-wrap: wrap;
`,Ce=t.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Se={"Login Activated":{subject:"Action Required: Complete your PWC Career Counseling Profile Setup",message:"Hello {STUDENT_NAME}, your login for the Career Counselling platform has been activated. Please log in and complete your initial student profile to proceed."},"Profile Completed":{subject:"Next Step: Complete Pre-Counselling Questionnaire",message:"Hello {STUDENT_NAME}, great job on completing your profile! Please fill out the Pre-Counselling questionnaire to help your counsellor understand your career interests."},"Pre-Counselling — Student":{subject:"Parent Input Required: Pre-Counselling Form",message:"Dear {PARENT_NAME}, kindly provide your valuable inputs in the Parent Pre-Counselling questionnaire to help guide {STUDENT_NAME} on their career pathway."},"Pre-Counselling — Parent":{subject:"Next Step: Start Career Assessment Test",message:"Hello {STUDENT_NAME}, both student and parent pre-counselling inputs are received. You are now ready to take your Career Assessment test."},"Assessment Completed":{subject:"Action Required: Book your Counselling Session S1",message:"Hello {STUDENT_NAME}, congratulations on completing your Career Assessment! Please log in and select a convenient time slot with your counsellor for Session 1."},"Session Booked":{subject:"Reminder: Upcoming Counselling Session",message:"Hello {STUDENT_NAME}, this is a gentle reminder for your scheduled career counselling session. Please ensure you join on time."},"Session 1 Completed":{subject:"Next Step: Book Session 2 / Action Plan Review",message:"Hello {STUDENT_NAME}, following your Session 1 discussion, please book Session 2 with your counsellor to finalize your career plan and stream options."},"Session 2 Completed":{subject:"Feedback Request: How was your Counselling experience?",message:"Hello {STUDENT_NAME}, thank you for attending your counselling sessions. Please submit your brief feedback questionnaire to unlock your final report."},"Feedback — Student":{subject:"Parent Feedback Request: Career Guidance Program",message:"Dear {PARENT_NAME}, we request your feedback on {STUDENT_NAME}'s career counselling journey. Your review helps us refine our guidance services."},"Feedback — Parent":{subject:"Your Comprehensive Career Report is Ready!",message:"Hello {STUDENT_NAME}, all steps are complete! Your official Career Compass Report is now available for download in your Student Portal."},"Report Downloaded":{subject:"Follow-up on your Career Roadmap",message:"Hello {STUDENT_NAME}, following up to check if you have reviewed your career roadmap report and have any questions for your counsellor."}},Ie=({isOpen:e,onClose:i,student:r,onSave:g})=>{const d=K(),n=(r==null?void 0:r.stage)||"Login Activated",l=Se[n]||{subject:`Follow-up on Career Counseling: ${n}`,message:`Hello ${(r==null?void 0:r.name)||"Student"}, this is a follow-up reminder from PWC Career Counselling regarding your pending stage: ${n}. Please log in to complete your next step.`},[p,a]=u.useState(""),[w,L]=u.useState(""),[v,$]=u.useState(null);if(u.useEffect(()=>{var s;if(r){const c=l.message.replace("{STUDENT_NAME}",r.name).replace("{PARENT_NAME}",((s=r.parentName)==null?void 0:s.split(" ")[0])||"Parent");a(c),L(l.subject)}},[r,n]),!r)return null;const j=r.mobile||"+91 9810012345",W=j.replace(/\D/g,""),C=r.parentMobile||"+91 9820987654",q=C.replace(/\D/g,""),E=r.email||`${r.name.toLowerCase().replace(/\s+/g,".")}@student.edu`,A=r.parentEmail||`parent.${r.name.toLowerCase().replace(/\s+/g,".")}@gmail.com`,k=`https://wa.me/${W}?text=${encodeURIComponent(p)}`,M=`https://wa.me/${q}?text=${encodeURIComponent(p)}`,G=`mailto:${E}?subject=${encodeURIComponent(w)}&body=${encodeURIComponent(p)}`,Y=`mailto:${A}?subject=${encodeURIComponent(w)}&body=${encodeURIComponent(p)}`,D=(s,c)=>{navigator.clipboard.writeText(s),$(c),d.success("Copied to Clipboard",s),setTimeout(()=>$(null),2e3)},O=()=>{const s=new Date().toISOString().slice(0,10),c=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),Q=[{id:`fu-${Date.now()}`,stage:n,date:s,timestamp:`${re(s)}, ${c}`,type:"whatsapp",recipient:"both",notes:p},...r.followUpHistory||[]],V={...r,isFlagged:!1,daysInStage:0,lastFollowUpDate:s,followUpHistory:Q};g(V),d.success("Follow-up Completed",`Follow-up for ${r.name} logged and unflagged.`),i()},J=()=>{const s=new Date().toISOString().slice(0,10),c={...r,stage:"Discontinued",isFlagged:!1,isDiscontinued:!0,stageCompletedDate:s,daysInStage:0};g(c),d.warning("Student Discontinued",`${r.name} marked as Discontinued and removed from active follow-up.`),i()};return o.jsx(B,{isOpen:e,onClose:i,title:"Student Follow-up",subtitle:`Direct contact & WhatsApp reminder for ${r.name}`,size:"lg",footer:o.jsxs(je,{children:[o.jsx(x,{type:"button",variant:"secondary",size:"sm",onClick:J,leftIcon:o.jsx(ee,{size:16}),style:{color:"#DC2626",borderColor:"#FCA5A5"},children:"Discontinue Student"}),o.jsxs(Ce,{children:[o.jsx(x,{type:"button",variant:"secondary",size:"sm",onClick:i,children:"Close"}),o.jsx(x,{type:"button",variant:"primary",size:"sm",onClick:O,leftIcon:o.jsx(S,{size:16}),children:"Completed"})]})]}),children:o.jsxs(ie,{children:[o.jsxs(le,{children:[o.jsxs(N,{children:[o.jsxs(R,{children:[o.jsx(z,{$role:"student",children:"Student Contact"}),o.jsx(H,{children:r.name})]}),o.jsxs(f,{children:[o.jsx("span",{children:"Mobile"}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[o.jsx(y,{children:j}),o.jsx(F,{content:"Copy phone number",children:o.jsx(_,{type:"button",onClick:()=>D(j,"studentPhone"),"aria-label":"Copy phone",children:v==="studentPhone"?o.jsx(S,{size:14,color:"#16A34A"}):o.jsx(P,{size:14})})})]})]}),o.jsxs(f,{children:[o.jsx("span",{children:"Email"}),o.jsx(y,{children:E})]}),o.jsxs(U,{children:[o.jsxs(b,{href:k,target:"_blank",rel:"noopener noreferrer",children:[o.jsx(m,{size:16})," WhatsApp Student"]}),o.jsxs(I,{href:G,children:[o.jsx(T,{size:15})," Email"]})]})]}),o.jsxs(N,{children:[o.jsxs(R,{children:[o.jsx(z,{$role:"parent",children:"Parent Contact"}),o.jsx(H,{children:r.parentName||"Parent / Guardian"})]}),o.jsxs(f,{children:[o.jsx("span",{children:"Mobile"}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[o.jsx(y,{children:C}),o.jsx(F,{content:"Copy parent phone",children:o.jsx(_,{type:"button",onClick:()=>D(C,"parentPhone"),"aria-label":"Copy parent phone",children:v==="parentPhone"?o.jsx(S,{size:14,color:"#16A34A"}):o.jsx(P,{size:14})})})]})]}),o.jsxs(f,{children:[o.jsx("span",{children:"Email"}),o.jsx(y,{children:A})]}),o.jsxs(U,{children:[o.jsxs(b,{href:M,target:"_blank",rel:"noopener noreferrer",children:[o.jsx(m,{size:16})," WhatsApp Parent"]}),o.jsxs(I,{href:Y,children:[o.jsx(T,{size:15})," Email"]})]})]})]}),o.jsxs(ce,{children:[o.jsx(pe,{children:o.jsxs(de,{children:[o.jsx(X,{size:16,style:{color:"#5D2384"}}),"Pre-defined Stage Reminder Message"]})}),o.jsx(ue,{value:p,onChange:s=>a(s.target.value),placeholder:"Type or tweak message to send..."}),o.jsxs(xe,{children:[o.jsxs(b,{href:k,target:"_blank",rel:"noopener noreferrer",children:[o.jsx(m,{size:15})," Send to Student WhatsApp"]}),o.jsxs(b,{href:M,target:"_blank",rel:"noopener noreferrer",children:[o.jsx(m,{size:15})," Send to Parent WhatsApp"]})]})]}),o.jsxs(ge,{children:[o.jsxs(me,{children:[o.jsx("span",{children:"Follow-up Log History"}),o.jsxs("span",{style:{fontSize:"11px",fontWeight:500,color:"#9CA3AF"},children:[o.jsx(Z,{size:13,style:{verticalAlign:"-2px",marginRight:3}}),"Auto-logged upon completion"]})]}),r.followUpHistory&&r.followUpHistory.length>0?o.jsx(he,{children:r.followUpHistory.map((s,c)=>o.jsxs(fe,{children:[o.jsxs("span",{children:[o.jsx("strong",{children:"Stage:"})," ",s.stage]}),o.jsx(ye,{children:s.timestamp||s.date})]},s.id||c))}):o.jsx(be,{children:"No previous follow-ups recorded yet for this student."})]})]})})};export{Ue as E,Ie as S};
