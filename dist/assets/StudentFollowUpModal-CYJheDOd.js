import{e as q,r as p,j as o,o as X,B as b,g as t,h as k,y as F,aE as w,d as R,aJ as Z,az as ee,aA as oe}from"./index-Bw790BVp.js";import{M as Y}from"./Modal-BrT8bxZc.js";import{I as m}from"./Input-BPi4Svcd.js";import{C as re}from"./Checkbox-DarQh2Zg.js";import"./Card.styles-BQGvdCGA.js";import"./Select-DGOp38p5.js";import"./Badge.styles-BImuS65e.js";import"./Table.styles-CMb45pz0.js";import"./FileUpload.styles-CwDfPGaU.js";import"./Breadcrumb-D5qQxgOH.js";import"./ConfirmDialog-BkM9sPJY.js";import"./SuccessModal.styles-BgGVH7XN.js";import{T as z}from"./Tooltip-DVjunIWN.js";import{f as te}from"./index-BW8bBlXO.js";const se=t.div`
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
`,ie=t.h4`
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
`,le=t.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  background-color: ${({theme:e})=>e.colors.primaryLight};
  border: 1px solid ${({theme:e})=>e.colors.primary}33;
  border-radius: 4px;
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.primary};
  line-height: 1.4;
`,_e=({isOpen:e,onClose:c,student:r,onSave:j,isSaving:x})=>{const u=q(),[s,a]=p.useState(null),[h,C]=p.useState(""),[S,f]=p.useState(!0);if(p.useEffect(()=>{var n;if(r){const l=JSON.parse(JSON.stringify(r));if(l.parentMobile||(l.parentMobile="+91 9820011223"),!l.className){const A=((n=l.grade)==null?void 0:n.replace(/\D/g,""))||"9";l.className=A}l.division||(l.division=`${l.className||"9"}A`),a(l),C(l.email||""),f(!0)}},[r]),!s)return null;const g=h.trim()!==""&&s.email.trim()!==h.trim(),y=()=>{const n={...s,grade:s.className?`Grade ${s.className} (${s.division||"A"})`:s.grade};g&&S&&u.info("Welcome Email Sent",`A new welcome email with login credentials has been sent to ${s.email}.`),j(n)};return o.jsx(Y,{isOpen:e,onClose:c,title:r!=null&&r.id?"Edit Student":"Add Student",size:"md",footer:o.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",width:"100%"},children:[o.jsx(b,{variant:"secondary",onClick:c,disabled:x,children:"Cancel"}),o.jsx(b,{onClick:y,isLoading:x,children:"Save Changes"})]}),children:o.jsx(se,{children:o.jsxs(ne,{children:[o.jsx(ie,{children:"Student Information"}),o.jsxs(ae,{children:[o.jsx(m,{label:"Student Full Name",value:s.name,onChange:n=>a({...s,name:n.target.value})}),o.jsxs("div",{children:[o.jsx(m,{label:"Email Address",type:"email",value:s.email,onChange:n=>a({...s,email:n.target.value})}),g&&o.jsx("div",{style:{marginTop:"6px"},children:o.jsx(re,{id:"send-welcome-email-checkbox",checked:S,onChange:n=>f(n.target.checked),label:"Send new welcome email to updated address"})})]}),o.jsx(m,{label:"Mobile Number",value:s.mobile,onChange:n=>a({...s,mobile:n.target.value})}),o.jsx(m,{label:"Parent Phone Number",placeholder:"+91 9820011223",value:s.parentMobile||"",onChange:n=>a({...s,parentMobile:n.target.value})}),o.jsx(m,{label:"Class",placeholder:"e.g. 11",value:s.className||"",onChange:n=>a({...s,className:n.target.value})}),o.jsx(m,{label:"Division",placeholder:"e.g. 11A",value:s.division||"",onChange:n=>a({...s,division:n.target.value})})]}),g&&o.jsxs(le,{children:[o.jsx(X,{size:18,style:{flexShrink:0,marginTop:1}}),o.jsxs("div",{children:[o.jsx("strong",{children:"Email Address Modified:"})," If the email is changed, a new welcome email with updated login instructions will automatically be dispatched to"," ",o.jsx("em",{children:s.email}),"."]})]})]})})})},ce=t.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`,de=t.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,H=t.div`
  background-color: ${({theme:e})=>e.colors.surfaceHover||"#F9FAFB"};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,U=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`,I=t.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${({$role:e,theme:c})=>e==="student"?c.colors.primary:"#D97706"};
  background-color: ${({$role:e,theme:c})=>e==="student"?c.colors.primaryLight:"#FEF3C7"};
  padding: 2px 8px;
  border-radius: 4px;
`,_=t.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.text};
`,v=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 13px;
  color: ${({theme:e})=>e.colors.textSecondary};
`,$=t.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({theme:e})=>e.colors.text};
  word-break: break-all;
`,L=t.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  flex-wrap: wrap;
`,E=t.a`
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
`,B=t.a`
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
`,W=t.button`
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
`,pe=t.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 14px 16px;
`,ue=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`,xe=t.span`
  font-size: 13px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  display: flex;
  align-items: center;
  gap: 6px;
`,ge=t.textarea`
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
`,me=t.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 4px;
  flex-wrap: wrap;
`,he=t.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px dashed ${({theme:e})=>e.colors.border};
  padding-top: 14px;
`,fe=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,ye=t.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 110px;
  overflow-y: auto;
`,be=t.div`
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
`,je=t.span`
  color: ${({theme:e})=>e.colors.textSecondary};
  font-size: 11px;
`,Ce=t.span`
  font-size: 12px;
  color: ${({theme:e})=>e.colors.textMuted||"#9CA3AF"};
  font-style: italic;
  padding: 4px 0;
`,Se=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
  flex-wrap: wrap;
`,we=t.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,ve={"Login Activated":{subject:"Action Required: Complete your PWC Career Counseling Profile Setup",message:"Hello {STUDENT_NAME}, your login for the Career Counselling platform has been activated. Please log in and complete your initial student profile to proceed."},"Profile Completed":{subject:"Next Step: Complete Pre-Counselling Questionnaire",message:"Hello {STUDENT_NAME}, great job on completing your profile! Please fill out the Pre-Counselling questionnaire to help your counsellor understand your career interests."},"Pre-Counselling — Student":{subject:"Parent Input Required: Pre-Counselling Form",message:"Dear {PARENT_NAME}, kindly provide your valuable inputs in the Parent Pre-Counselling questionnaire to help guide {STUDENT_NAME} on their career pathway."},"Pre-Counselling — Parent":{subject:"Next Step: Start Career Assessment Test",message:"Hello {STUDENT_NAME}, both student and parent pre-counselling inputs are received. You are now ready to take your Career Assessment test."},"Assessment Completed":{subject:"Action Required: Book your Counselling Session S1",message:"Hello {STUDENT_NAME}, congratulations on completing your Career Assessment! Please log in and select a convenient time slot with your counsellor for Session 1."},"Session Booked":{subject:"Reminder: Upcoming Counselling Session",message:"Hello {STUDENT_NAME}, this is a gentle reminder for your scheduled career counselling session. Please ensure you join on time."},"Session 1 Completed":{subject:"Next Step: Book Session 2 / Action Plan Review",message:"Hello {STUDENT_NAME}, following your Session 1 discussion, please book Session 2 with your counsellor to finalize your career plan and stream options."},"Session 2 Completed":{subject:"Feedback Request: How was your Counselling experience?",message:"Hello {STUDENT_NAME}, thank you for attending your counselling sessions. Please submit your brief feedback questionnaire to unlock your final report."},"Feedback — Student":{subject:"Parent Feedback Request: Career Guidance Program",message:"Dear {PARENT_NAME}, we request your feedback on {STUDENT_NAME}'s career counselling journey. Your review helps us refine our guidance services."},"Feedback — Parent":{subject:"Your Comprehensive Career Report is Ready!",message:"Hello {STUDENT_NAME}, all steps are complete! Your official Career Compass Report is now available for download in your Student Portal."},"Report Downloaded":{subject:"Follow-up on your Career Roadmap",message:"Hello {STUDENT_NAME}, following up to check if you have reviewed your career roadmap report and have any questions for your counsellor."}},Le=({isOpen:e,onClose:c,student:r,onSave:j})=>{const x=q(),u=(r==null?void 0:r.stage)||"Login Activated",s=ve[u]||{subject:`Follow-up on Career Counseling: ${u}`,message:`Hello ${(r==null?void 0:r.name)||"Student"}, this is a follow-up reminder from PWC Career Counselling regarding your pending stage: ${u}. Please log in to complete your next step.`},[a,h]=p.useState(""),[C,S]=p.useState(""),[f,g]=p.useState(null);if(p.useEffect(()=>{var i;if(r){const d=s.message.replace("{STUDENT_NAME}",r.name).replace("{PARENT_NAME}",((i=r.parentName)==null?void 0:i.split(" ")[0])||"Parent");h(d),S(s.subject)}},[r,u]),!r)return null;const y=r.mobile||"+91 9810012345",n=y.replace(/\D/g,""),l=r.parentMobile||"+91 9820987654",A=l.replace(/\D/g,""),N=r.email||`${r.name.toLowerCase().replace(/\s+/g,".")}@student.edu`,D=r.parentEmail||`parent.${r.name.toLowerCase().replace(/\s+/g,".")}@gmail.com`,M=`https://wa.me/${n}?text=${encodeURIComponent(a)}`,T=`https://wa.me/${A}?text=${encodeURIComponent(a)}`,G=`mailto:${N}?subject=${encodeURIComponent(C)}&body=${encodeURIComponent(a)}`,O=`mailto:${D}?subject=${encodeURIComponent(C)}&body=${encodeURIComponent(a)}`,P=(i,d)=>{navigator.clipboard.writeText(i),g(d),x.success("Copied to Clipboard",i),setTimeout(()=>g(null),2e3)},J=()=>{const i=new Date().toISOString().slice(0,10),d=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),V=[{id:`fu-${Date.now()}`,stage:u,date:i,timestamp:`${te(i)}, ${d}`,type:"whatsapp",recipient:"both",notes:a},...r.followUpHistory||[]],K={...r,isFlagged:!1,daysInStage:0,lastFollowUpDate:i,followUpHistory:V};j(K),x.success("Follow-up Completed",`Follow-up for ${r.name} logged and unflagged.`),c()},Q=()=>{const i=new Date().toISOString().slice(0,10),d={...r,stage:"Discontinued",isFlagged:!1,isDiscontinued:!0,stageCompletedDate:i,daysInStage:0};j(d),x.warning("Student Discontinued",`${r.name} marked as Discontinued and removed from active follow-up.`),c()};return o.jsx(Y,{isOpen:e,onClose:c,title:"Student Follow-up",subtitle:`Direct contact & WhatsApp reminder for ${r.name}`,size:"lg",footer:o.jsxs(Se,{children:[o.jsx(b,{type:"button",variant:"secondary",size:"sm",onClick:Q,leftIcon:o.jsx(oe,{size:16}),style:{color:"#DC2626",borderColor:"#FCA5A5"},children:"Discontinue Student"}),o.jsxs(we,{children:[o.jsx(b,{type:"button",variant:"secondary",size:"sm",onClick:c,children:"Close"}),o.jsx(b,{type:"button",variant:"primary",size:"sm",onClick:J,leftIcon:o.jsx(k,{size:16}),children:"Completed"})]})]}),children:o.jsxs(ce,{children:[o.jsxs(de,{children:[o.jsxs(H,{children:[o.jsxs(U,{children:[o.jsx(I,{$role:"student",children:"Student Contact"}),o.jsx(_,{children:r.name})]}),o.jsxs(v,{children:[o.jsx("span",{children:"Mobile"}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[o.jsx($,{children:y}),o.jsx(z,{content:"Copy phone number",children:o.jsx(W,{type:"button",onClick:()=>P(y,"studentPhone"),"aria-label":"Copy phone",children:f==="studentPhone"?o.jsx(k,{size:14,color:"#16A34A"}):o.jsx(F,{size:14})})})]})]}),o.jsxs(v,{children:[o.jsx("span",{children:"Email"}),o.jsx($,{children:N})]}),o.jsxs(L,{children:[o.jsxs(E,{href:M,target:"_blank",rel:"noopener noreferrer",children:[o.jsx(w,{size:16})," WhatsApp Student"]}),o.jsxs(B,{href:G,children:[o.jsx(R,{size:15})," Email"]})]})]}),o.jsxs(H,{children:[o.jsxs(U,{children:[o.jsx(I,{$role:"parent",children:"Parent Contact"}),o.jsx(_,{children:r.parentName||"Parent / Guardian"})]}),o.jsxs(v,{children:[o.jsx("span",{children:"Mobile"}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[o.jsx($,{children:l}),o.jsx(z,{content:"Copy parent phone",children:o.jsx(W,{type:"button",onClick:()=>P(l,"parentPhone"),"aria-label":"Copy parent phone",children:f==="parentPhone"?o.jsx(k,{size:14,color:"#16A34A"}):o.jsx(F,{size:14})})})]})]}),o.jsxs(v,{children:[o.jsx("span",{children:"Email"}),o.jsx($,{children:D})]}),o.jsxs(L,{children:[o.jsxs(E,{href:T,target:"_blank",rel:"noopener noreferrer",children:[o.jsx(w,{size:16})," WhatsApp Parent"]}),o.jsxs(B,{href:O,children:[o.jsx(R,{size:15})," Email"]})]})]})]}),o.jsxs(pe,{children:[o.jsx(ue,{children:o.jsxs(xe,{children:[o.jsx(Z,{size:16,style:{color:"#5D2384"}}),"Pre-defined Stage Reminder Message"]})}),o.jsx(ge,{value:a,onChange:i=>h(i.target.value),placeholder:"Type or tweak message to send..."}),o.jsxs(me,{children:[o.jsxs(E,{href:M,target:"_blank",rel:"noopener noreferrer",children:[o.jsx(w,{size:15})," Send to Student WhatsApp"]}),o.jsxs(E,{href:T,target:"_blank",rel:"noopener noreferrer",children:[o.jsx(w,{size:15})," Send to Parent WhatsApp"]})]})]}),o.jsxs(he,{children:[o.jsxs(fe,{children:[o.jsx("span",{children:"Follow-up Log History"}),o.jsxs("span",{style:{fontSize:"11px",fontWeight:500,color:"#9CA3AF"},children:[o.jsx(ee,{size:13,style:{verticalAlign:"-2px",marginRight:3}}),"Auto-logged upon completion"]})]}),r.followUpHistory&&r.followUpHistory.length>0?o.jsx(ye,{children:r.followUpHistory.map((i,d)=>o.jsxs(be,{children:[o.jsxs("span",{children:[o.jsx("strong",{children:"Stage:"})," ",i.stage]}),o.jsx(je,{children:i.timestamp||i.date})]},i.id||d))}):o.jsx(Ce,{children:"No previous follow-ups recorded yet for this student."})]})]})})};export{_e as E,Le as S};
