import{g as o,u as R,d as I,j as r,aB as S,c as j,R as D,b2 as A,bg as O,bC as B,V as N,b3 as F,aj as U,bD as M,B as v,f as H}from"./index-D-K1gLqS.js";import{u as V,a as Q,C as x,o as G,s as k,n as a}from"./types-BhCtGHqx.js";import{T as Y}from"./Tooltip-CgwHlqZR.js";const J=o.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`,W=o.div`
  background: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
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
`,K=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
`,X=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
`,Z=o.button`
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
`,ee=o.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: ${({theme:e})=>e.colors.primaryLight};
  color: ${({theme:e})=>e.colors.primary};
  padding: 4px 14px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`,re=o.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
  letter-spacing: -0.3px;

  @media (max-width: 640px) {
    font-size: 20px;
  }
`,oe=o.h2`
  font-size: 15px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.primary};
  margin: 0;
`,se=o.p`
  font-size: 13px;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
  max-width: 780px;
  line-height: 1.5;
`,ne=o.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  background-color: ${({theme:e})=>e.colors.background};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 16px 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,w=o.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,$=o.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,q=o.span`
  font-size: 14px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
`;o.div`
  background: linear-gradient(135deg, ${({theme:e})=>e.colors.primaryLight} 0%, #ffffff 100%);
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;o.div`
  font-size: 13px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.primary};
  display: flex;
  align-items: center;
  gap: 6px;
`;o.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;o.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 4px 10px;
  font-size: 12px;
`;o.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.primary};
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
`;o.span`
  color: ${({theme:e})=>e.colors.text};
  font-weight: 500;
`;const p=o.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 24px;
  background-color: ${({theme:e})=>e.colors.surface};

  @media (max-width: 640px) {
    padding: 16px;
  }
`,m=o.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
`,u=o.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.primaryLight};
  color: ${({theme:e})=>e.colors.primary};
`,h=o.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`;o.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.textSecondary};
  background-color: ${({theme:e})=>e.colors.background};
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 6px;
`;const l=o.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background-color: ${({theme:e})=>e.colors.background};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
`,c=o.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.text};
  line-height: 1.4;
`,g=o.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,b=o.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 8px;
  border-radius: 4px;
  border: 1px solid
    ${({$isSelected:e,theme:i})=>e?i.colors.primary:i.colors.border};
  background-color: ${({$isSelected:e,theme:i})=>e?i.colors.primaryLight:i.colors.surface};
  color: ${({$isSelected:e,theme:i})=>e?i.colors.primary:i.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
    color: ${({theme:e})=>e.colors.primary};
  }
`,f=o.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  background-color: ${({$isSelected:e,theme:i})=>e?i.colors.primary:i.colors.border};
  color: ${({$isSelected:e,theme:i})=>e?"#ffffff":i.colors.text};
  font-size: 12px;
  font-weight: 700;
`,y=o.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
`,T=o.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.text};
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({theme:e})=>e.colors.primary};
    box-shadow: 0 0 0 2px ${({theme:e})=>e.colors.primaryLight};
  }

  &::placeholder {
    color: ${({theme:e})=>e.colors.textSecondary};
  }
`,te=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid ${({theme:e})=>e.colors.border};

  @media (max-width: 640px) {
    flex-direction: column-reverse;
    gap: 12px;

    button {
      width: 100%;
    }
  }
`,C=[{score:1,label:"Very poor, not helpful"},{score:2,label:"Below expectations"},{score:3,label:"Acceptable but not impressive"},{score:4,label:"Good & met expectations"},{score:5,label:"Excellent & beyond expectations"}],z=[{score:1,label:"Very unclear, not decided"},{score:2,label:"Somewhat unclear with doubts"},{score:3,label:"Partly clear with some understanding"},{score:4,label:"Clear & good understanding"},{score:5,label:"Very clear & confident"}],ie=[{score:1,label:"(1) Definitely will not recommend"},{score:2,label:"(2) Unlikely to recommend"},{score:3,label:"(3) May or may not recommend"},{score:4,label:"(4) Likely to recommend"},{score:5,label:"(5) Definitely will recommend"}],ae=G({se_q1:a().min(1,"Please rate question 1"),se_q2:a().min(1,"Please rate question 2"),se_q3:a().min(1,"Please rate question 3"),se_q4:a().min(1,"Please rate question 4"),cd_q1:a().min(1,"Please rate question 1"),cd_q2:a().min(1,"Please rate question 2"),cd_q3:a().min(1,"Please rate question 3"),cd_q4:a().min(1,"Please rate question 4"),oq_q1:a().min(1,"Please rate question 1"),oq_q2:a().min(1,"Please rate question 2"),oq_q3:a().min(1,"Please rate question 3"),os_q1:a().min(1,"Please rate question 1"),os_q2:a().min(1,"Please rate question 2"),helpful_part:k().optional(),improvement_part:k().optional()}),xe=()=>{const e=R(),i=I(),{control:d,handleSubmit:L,register:_,formState:{isSubmitting:P}}=V({resolver:Q(ae),defaultValues:{se_q1:5,se_q2:5,se_q3:5,se_q4:5,cd_q1:4,cd_q2:5,cd_q3:4,cd_q4:5,oq_q1:5,oq_q2:4,oq_q3:5,os_q1:5,os_q2:5,helpful_part:"",improvement_part:""}}),E=async n=>{await new Promise(s=>setTimeout(s,500)),localStorage.setItem("pwc_student_feedback_submitted","true"),i.success("Feedback Submitted Successfully!","Thank you for your valuable feedback on the counselling session."),e(j.STUDENT_PORTAL)};return r.jsx(J,{children:r.jsx("form",{onSubmit:L(E),noValidate:!0,children:r.jsxs(W,{children:[r.jsxs(K,{children:[r.jsxs(X,{children:[r.jsx(Y,{content:"Back to Student Dashboard",position:"right",children:r.jsx(Z,{type:"button",onClick:()=>e(j.STUDENT_PORTAL),"aria-label":"Back to Dashboard",children:r.jsx(S,{size:18})})}),r.jsx(ee,{children:"Post-Counselling · Class 9 & 10"})]}),r.jsx(re,{children:"STUDENT FEEDBACK QUESTIONNAIRE"}),r.jsx(oe,{children:"Design Destiny · kREATE Career Counselling Programme"}),r.jsx(se,{children:"Please share your feedback regarding your recent career guidance experience. Your responses help us enhance our programme for future students. Your honesty is genuinely valued — there are no right or wrong answers."})]}),r.jsxs(ne,{children:[r.jsxs(w,{children:[r.jsx($,{children:"Student Name / Code"}),r.jsxs(q,{style:{display:"flex",alignItems:"center",gap:6},children:[r.jsx(D,{size:16})," Alex Johnson (STU-2026-89)"]})]}),r.jsxs(w,{children:[r.jsx($,{children:"Counsellor"}),r.jsxs(q,{style:{display:"flex",alignItems:"center",gap:6},children:[r.jsx(A,{size:16})," Sarah Jenkins (M.Sc Psych)"]})]}),r.jsxs(w,{children:[r.jsx($,{children:"Date"}),r.jsxs(q,{style:{display:"flex",alignItems:"center",gap:6},children:[r.jsx(O,{size:16})," May 15, 2026"]})]})]}),r.jsxs(p,{children:[r.jsxs(m,{children:[r.jsx(u,{children:r.jsx(B,{size:20})}),r.jsx(h,{children:"Session Experience"})]}),[{name:"se_q1",title:"1. The counsellor explained my assessment results in a way I clearly understood."},{name:"se_q2",title:"2. I felt comfortable, safe, and genuinely heard throughout the sessions."},{name:"se_q3",title:"3. The counsellor asked meaningful questions to understand me as an individual, not just my marks."},{name:"se_q4",title:"4. The session felt personalised to my specific stream, strengths, and career interests, and not generic."}].map(n=>r.jsxs(l,{children:[r.jsx(c,{children:n.title}),r.jsx(x,{name:n.name,control:d,render:({field:s})=>r.jsx(g,{children:C.map(t=>r.jsxs(b,{type:"button",$isSelected:s.value===t.score,onClick:()=>s.onChange(t.score),children:[r.jsx(f,{$isSelected:s.value===t.score,children:t.score}),r.jsx(y,{children:t.label})]},t.score))})})]},n.name))]}),r.jsxs(p,{children:[r.jsxs(m,{children:[r.jsx(u,{children:r.jsx(N,{size:20})}),r.jsx(h,{children:"Clarity & Decision Confidence"})]}),[{name:"cd_q1",title:"1. I clearly understand my top 2 career options."},{name:"cd_q2",title:"2. I understand why these career options suit my personality, strengths, and aptitude."},{name:"cd_q3",title:"3. I feel confident about the career direction I am now heading in."},{name:"cd_q4",title:"4. I know the next steps (subjects, exams, colleges)."}].map(n=>r.jsxs(l,{children:[r.jsx(c,{children:n.title}),r.jsx(x,{name:n.name,control:d,render:({field:s})=>r.jsx(g,{children:z.map(t=>r.jsxs(b,{type:"button",$isSelected:s.value===t.score,onClick:()=>s.onChange(t.score),children:[r.jsx(f,{$isSelected:s.value===t.score,children:t.score}),r.jsx(y,{children:t.label})]},t.score))})})]},n.name))]}),r.jsxs(p,{children:[r.jsxs(m,{children:[r.jsx(u,{children:r.jsx(F,{size:20})}),r.jsx(h,{children:"Outcome Quality"})]}),[{name:"oq_q1",title:"1. The career options suggested felt relevant to me."},{name:"oq_q2",title:"2. The roadmap (Plan A & Plan B) is practical and achievable."},{name:"oq_q3",title:"3. My doubts were resolved during the sessions."}].map(n=>r.jsxs(l,{children:[r.jsx(c,{children:n.title}),r.jsx(x,{name:n.name,control:d,render:({field:s})=>r.jsx(g,{children:z.map(t=>r.jsxs(b,{type:"button",$isSelected:s.value===t.score,onClick:()=>s.onChange(t.score),children:[r.jsx(f,{$isSelected:s.value===t.score,children:t.score}),r.jsx(y,{children:t.label})]},t.score))})})]},n.name))]}),r.jsxs(p,{children:[r.jsxs(m,{children:[r.jsx(u,{children:r.jsx(U,{size:20})}),r.jsx(h,{children:"Overall Satisfaction"})]}),r.jsxs(l,{children:[r.jsx(c,{children:"1. This programme reduced my confusion about the future."}),r.jsx(x,{name:"os_q1",control:d,render:({field:n})=>r.jsx(g,{children:C.map(s=>r.jsxs(b,{type:"button",$isSelected:n.value===s.score,onClick:()=>n.onChange(s.score),children:[r.jsx(f,{$isSelected:n.value===s.score,children:s.score}),r.jsx(y,{children:s.label})]},s.score))})})]}),r.jsxs(l,{children:[r.jsx(c,{children:"2. I would recommend this programme to my friends."}),r.jsx(x,{name:"os_q2",control:d,render:({field:n})=>r.jsx(g,{children:ie.map(s=>r.jsxs(b,{type:"button",$isSelected:n.value===s.score,onClick:()=>n.onChange(s.score),children:[r.jsx(f,{$isSelected:n.value===s.score,children:s.score}),r.jsx(y,{children:s.label})]},s.score))})})]})]}),r.jsxs(p,{children:[r.jsxs(m,{children:[r.jsx(u,{children:r.jsx(M,{size:20})}),r.jsx(h,{children:"Open Feedback"})]}),r.jsxs(l,{children:[r.jsx(c,{children:"1. What was the most helpful part?"}),r.jsx(T,{placeholder:"Share what worked best for you during the counselling sessions...",..._("helpful_part")})]}),r.jsxs(l,{children:[r.jsx(c,{children:"2. What could be improved?"}),r.jsx(T,{placeholder:"Let us know how we can make the experience even better...",..._("improvement_part")})]})]}),r.jsxs(te,{children:[r.jsx(v,{type:"button",variant:"secondary",leftIcon:r.jsx(S,{size:16}),onClick:()=>e(j.STUDENT_PORTAL),children:"Back to Dashboard"}),r.jsx(v,{type:"submit",variant:"primary",isLoading:P,leftIcon:r.jsx(H,{size:18}),children:"Submit Feedback"})]})]})})})};export{xe as StudentFeedbackFormPage,xe as default};
