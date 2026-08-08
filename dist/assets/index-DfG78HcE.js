import{g as s,u as F,d as U,j as e,aB as T,c as S,R as M,a$ as H,bc as V,bt as C,by as G,V as Q,b0 as Y,aj as J,bz as W,B as z,f as K}from"./index-CormbGNw.js";import{u as X,a as Z,C as x,o as ee,s as L,n as l}from"./types-EU2TuyfP.js";import{T as re}from"./Tooltip-C9hj27Ur.js";const se=s.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
`,oe=s.div`
  background: ${({theme:r})=>r.colors.surface};
  border: 1px solid ${({theme:r})=>r.colors.border};
  border-radius: 4px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  @media (max-width: 768px) {
    padding: 20px;
    gap: 20px;
  }
`,ne=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({theme:r})=>r.colors.border};
`,ie=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
`,te=s.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 4px;
  border: 1px solid ${({theme:r})=>r.colors.border};
  background-color: ${({theme:r})=>r.colors.surface};
  color: ${({theme:r})=>r.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:r})=>r.colors.primary};
    color: ${({theme:r})=>r.colors.primary};
    background-color: ${({theme:r})=>r.colors.primaryLight};
  }
`,le=s.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: ${({theme:r})=>r.colors.primaryLight};
  color: ${({theme:r})=>r.colors.primary};
  padding: 4px 14px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`,ae=s.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({theme:r})=>r.colors.text};
  margin: 0;
  letter-spacing: -0.3px;

  @media (max-width: 640px) {
    font-size: 20px;
  }
`,ce=s.h2`
  font-size: 15px;
  font-weight: 600;
  color: ${({theme:r})=>r.colors.primary};
  margin: 0;
`,de=s.p`
  font-size: 13px;
  color: ${({theme:r})=>r.colors.textSecondary};
  margin: 0;
  max-width: 780px;
  line-height: 1.5;
`,xe=s.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  background-color: ${({theme:r})=>r.colors.background};
  border: 1px solid ${({theme:r})=>r.colors.border};
  border-radius: 4px;
  padding: 16px 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,w=s.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,$=s.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({theme:r})=>r.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,q=s.span`
  font-size: 14px;
  font-weight: 700;
  color: ${({theme:r})=>r.colors.text};
`,pe=s.div`
  background: linear-gradient(135deg, ${({theme:r})=>r.colors.primaryLight} 0%, #ffffff 100%);
  border: 1px solid ${({theme:r})=>r.colors.border};
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,P=s.div`
  font-size: 13px;
  font-weight: 700;
  color: ${({theme:r})=>r.colors.primary};
  display: flex;
  align-items: center;
  gap: 6px;
`,E=s.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,R=s.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${({theme:r})=>r.colors.surface};
  border: 1px solid ${({theme:r})=>r.colors.border};
  border-radius: 4px;
  padding: 4px 10px;
  font-size: 12px;
`,I=s.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background-color: ${({theme:r})=>r.colors.primary};
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
`,D=s.span`
  color: ${({theme:r})=>r.colors.text};
  font-weight: 500;
`,p=s.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid ${({theme:r})=>r.colors.border};
  border-radius: 4px;
  padding: 24px;
  background-color: ${({theme:r})=>r.colors.surface};

  @media (max-width: 640px) {
    padding: 16px;
  }
`,h=s.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({theme:r})=>r.colors.border};
`,u=s.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${({theme:r})=>r.colors.primaryLight};
  color: ${({theme:r})=>r.colors.primary};
`,m=s.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({theme:r})=>r.colors.text};
  margin: 0;
`,g=s.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({theme:r})=>r.colors.textSecondary};
  background-color: ${({theme:r})=>r.colors.background};
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 6px;
`,a=s.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background-color: ${({theme:r})=>r.colors.background};
  border: 1px solid ${({theme:r})=>r.colors.border};
  border-radius: 4px;
`,c=s.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({theme:r})=>r.colors.text};
  line-height: 1.4;
`,b=s.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,f=s.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 8px;
  border-radius: 4px;
  border: 1px solid
    ${({$isSelected:r,theme:t})=>r?t.colors.primary:t.colors.border};
  background-color: ${({$isSelected:r,theme:t})=>r?t.colors.primaryLight:t.colors.surface};
  color: ${({$isSelected:r,theme:t})=>r?t.colors.primary:t.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;

  &:hover {
    border-color: ${({theme:r})=>r.colors.primary};
    background-color: ${({theme:r})=>r.colors.primaryLight};
    color: ${({theme:r})=>r.colors.primary};
  }
`,j=s.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  background-color: ${({$isSelected:r,theme:t})=>r?t.colors.primary:t.colors.border};
  color: ${({$isSelected:r,theme:t})=>r?"#ffffff":t.colors.text};
  font-size: 12px;
  font-weight: 700;
`,y=s.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
`,O=s.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid ${({theme:r})=>r.colors.border};
  background-color: ${({theme:r})=>r.colors.surface};
  color: ${({theme:r})=>r.colors.text};
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({theme:r})=>r.colors.primary};
    box-shadow: 0 0 0 2px ${({theme:r})=>r.colors.primaryLight};
  }

  &::placeholder {
    color: ${({theme:r})=>r.colors.textSecondary};
  }
`,he=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid ${({theme:r})=>r.colors.border};

  @media (max-width: 640px) {
    flex-direction: column-reverse;
    gap: 12px;

    button {
      width: 100%;
    }
  }
`,_=[{score:1,label:"Very poor, not helpful"},{score:2,label:"Below expectations"},{score:3,label:"Acceptable but not impressive"},{score:4,label:"Good & met expectations"},{score:5,label:"Excellent & beyond expectations"}],v=[{score:1,label:"Very unclear, not decided"},{score:2,label:"Somewhat unclear with doubts"},{score:3,label:"Partly clear with some understanding"},{score:4,label:"Clear & good understanding"},{score:5,label:"Very clear & confident"}],ue=[{score:1,label:"(1) Definitely will not recommend"},{score:2,label:"(2) Unlikely to recommend"},{score:3,label:"(3) May or may not recommend"},{score:4,label:"(4) Likely to recommend"},{score:5,label:"(5) Definitely will recommend"}],me=ee({se_q1:l().min(1,"Please rate question 1"),se_q2:l().min(1,"Please rate question 2"),se_q3:l().min(1,"Please rate question 3"),se_q4:l().min(1,"Please rate question 4"),cd_q1:l().min(1,"Please rate question 1"),cd_q2:l().min(1,"Please rate question 2"),cd_q3:l().min(1,"Please rate question 3"),cd_q4:l().min(1,"Please rate question 4"),oq_q1:l().min(1,"Please rate question 1"),oq_q2:l().min(1,"Please rate question 2"),oq_q3:l().min(1,"Please rate question 3"),os_q1:l().min(1,"Please rate question 1"),os_q2:l().min(1,"Please rate question 2"),helpful_part:L().optional(),improvement_part:L().optional()}),je=()=>{const r=F(),t=U(),{control:d,handleSubmit:A,register:k,formState:{isSubmitting:B}}=X({resolver:Z(me),defaultValues:{se_q1:5,se_q2:5,se_q3:5,se_q4:5,cd_q1:4,cd_q2:5,cd_q3:4,cd_q4:5,oq_q1:5,oq_q2:4,oq_q3:5,os_q1:5,os_q2:5,helpful_part:"",improvement_part:""}}),N=async o=>{await new Promise(n=>setTimeout(n,500)),localStorage.setItem("pwc_student_feedback_submitted","true"),t.success("Feedback Submitted Successfully!","Thank you for your valuable feedback on the counselling session."),r(S.STUDENT_PORTAL)};return e.jsx(se,{children:e.jsx("form",{onSubmit:A(N),noValidate:!0,children:e.jsxs(oe,{children:[e.jsxs(ne,{children:[e.jsxs(ie,{children:[e.jsx(re,{content:"Back to Student Dashboard",position:"right",children:e.jsx(te,{type:"button",onClick:()=>r(S.STUDENT_PORTAL),"aria-label":"Back to Dashboard",children:e.jsx(T,{size:18})})}),e.jsx(le,{children:"Post-Counselling · Class 9 & 10"})]}),e.jsx(ae,{children:"STUDENT FEEDBACK QUESTIONNAIRE"}),e.jsx(ce,{children:"Design Destiny · kREATE Career Counselling Programme"}),e.jsx(de,{children:"Please share your feedback regarding your recent career guidance experience. Your responses help us enhance our programme for future students. Your honesty is genuinely valued — there are no right or wrong answers."})]}),e.jsxs(xe,{children:[e.jsxs(w,{children:[e.jsx($,{children:"Student Name / Code"}),e.jsxs(q,{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx(M,{size:16})," Alex Johnson (STU-2026-89)"]})]}),e.jsxs(w,{children:[e.jsx($,{children:"Counsellor"}),e.jsxs(q,{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx(H,{size:16})," Sarah Jenkins (M.Sc Psych)"]})]}),e.jsxs(w,{children:[e.jsx($,{children:"Date"}),e.jsxs(q,{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx(V,{size:16})," May 15, 2026"]})]})]}),e.jsxs(pe,{children:[e.jsxs(P,{children:[e.jsx(C,{size:16})," Scale 1: Effectiveness Scale (Sections 1 & 4)"]}),e.jsx(E,{children:_.map(o=>e.jsxs(R,{children:[e.jsx(I,{children:o.score}),e.jsx(D,{children:o.label})]},o.score))}),e.jsxs(P,{style:{marginTop:8},children:[e.jsx(C,{size:16})," Scale 2: Clarity & Decision Confidence Scale (Sections 2 & 3)"]}),e.jsx(E,{children:v.map(o=>e.jsxs(R,{children:[e.jsx(I,{children:o.score}),e.jsx(D,{children:o.label})]},o.score))})]}),e.jsxs(p,{children:[e.jsxs(h,{children:[e.jsx(u,{children:e.jsx(G,{size:20})}),e.jsxs(m,{children:["Section 1: Session Experience ",e.jsx(g,{children:"[S-SE]"})]})]}),[{name:"se_q1",title:"1. The counsellor explained my assessment results in a way I clearly understood."},{name:"se_q2",title:"2. I felt comfortable, safe, and genuinely heard throughout the sessions."},{name:"se_q3",title:"3. The counsellor asked meaningful questions to understand me as an individual, not just my marks."},{name:"se_q4",title:"4. The session felt personalised to my specific stream, strengths, and career interests, and not generic."}].map(o=>e.jsxs(a,{children:[e.jsx(c,{children:o.title}),e.jsx(x,{name:o.name,control:d,render:({field:n})=>e.jsx(b,{children:_.map(i=>e.jsxs(f,{type:"button",$isSelected:n.value===i.score,onClick:()=>n.onChange(i.score),children:[e.jsx(j,{$isSelected:n.value===i.score,children:i.score}),e.jsx(y,{children:i.label})]},i.score))})})]},o.name))]}),e.jsxs(p,{children:[e.jsxs(h,{children:[e.jsx(u,{children:e.jsx(Q,{size:20})}),e.jsxs(m,{children:["Section 2: Clarity & Decision Confidence ",e.jsx(g,{children:"[S-CD]"})]})]}),[{name:"cd_q1",title:"1. I clearly understand my top 2 career options."},{name:"cd_q2",title:"2. I understand why these career options suit my personality, strengths, and aptitude."},{name:"cd_q3",title:"3. I feel confident about the career direction I am now heading in."},{name:"cd_q4",title:"4. I know the next steps (subjects, exams, colleges)."}].map(o=>e.jsxs(a,{children:[e.jsx(c,{children:o.title}),e.jsx(x,{name:o.name,control:d,render:({field:n})=>e.jsx(b,{children:v.map(i=>e.jsxs(f,{type:"button",$isSelected:n.value===i.score,onClick:()=>n.onChange(i.score),children:[e.jsx(j,{$isSelected:n.value===i.score,children:i.score}),e.jsx(y,{children:i.label})]},i.score))})})]},o.name))]}),e.jsxs(p,{children:[e.jsxs(h,{children:[e.jsx(u,{children:e.jsx(Y,{size:20})}),e.jsxs(m,{children:["Section 3: Outcome Quality ",e.jsx(g,{children:"[S-OQ]"})]})]}),[{name:"oq_q1",title:"1. The career options suggested felt relevant to me."},{name:"oq_q2",title:"2. The roadmap (Plan A & Plan B) is practical and achievable."},{name:"oq_q3",title:"3. My doubts were resolved during the sessions."}].map(o=>e.jsxs(a,{children:[e.jsx(c,{children:o.title}),e.jsx(x,{name:o.name,control:d,render:({field:n})=>e.jsx(b,{children:v.map(i=>e.jsxs(f,{type:"button",$isSelected:n.value===i.score,onClick:()=>n.onChange(i.score),children:[e.jsx(j,{$isSelected:n.value===i.score,children:i.score}),e.jsx(y,{children:i.label})]},i.score))})})]},o.name))]}),e.jsxs(p,{children:[e.jsxs(h,{children:[e.jsx(u,{children:e.jsx(J,{size:20})}),e.jsxs(m,{children:["Section 4: Overall Satisfaction ",e.jsx(g,{children:"[S-OS]"})]})]}),e.jsxs(a,{children:[e.jsx(c,{children:"1. This programme reduced my confusion about the future."}),e.jsx(x,{name:"os_q1",control:d,render:({field:o})=>e.jsx(b,{children:_.map(n=>e.jsxs(f,{type:"button",$isSelected:o.value===n.score,onClick:()=>o.onChange(n.score),children:[e.jsx(j,{$isSelected:o.value===n.score,children:n.score}),e.jsx(y,{children:n.label})]},n.score))})})]}),e.jsxs(a,{children:[e.jsx(c,{children:"2. I would recommend this programme to my friends."}),e.jsx(x,{name:"os_q2",control:d,render:({field:o})=>e.jsx(b,{children:ue.map(n=>e.jsxs(f,{type:"button",$isSelected:o.value===n.score,onClick:()=>o.onChange(n.score),children:[e.jsx(j,{$isSelected:o.value===n.score,children:n.score}),e.jsx(y,{children:n.label})]},n.score))})})]})]}),e.jsxs(p,{children:[e.jsxs(h,{children:[e.jsx(u,{children:e.jsx(W,{size:20})}),e.jsxs(m,{children:["Section 5: Open Feedback ",e.jsx(g,{children:"[Not scored]"})]})]}),e.jsxs(a,{children:[e.jsx(c,{children:"1. What was the most helpful part?"}),e.jsx(O,{placeholder:"Share what worked best for you during the counselling sessions...",...k("helpful_part")})]}),e.jsxs(a,{children:[e.jsx(c,{children:"2. What could be improved?"}),e.jsx(O,{placeholder:"Let us know how we can make the experience even better...",...k("improvement_part")})]})]}),e.jsxs(he,{children:[e.jsx(z,{type:"button",variant:"secondary",leftIcon:e.jsx(T,{size:16}),onClick:()=>r(S.STUDENT_PORTAL),children:"Back to Dashboard"}),e.jsx(z,{type:"submit",variant:"primary",isLoading:B,leftIcon:e.jsx(K,{size:18}),children:"Submit Feedback"})]})]})})})};export{je as StudentFeedbackFormPage,je as default};
