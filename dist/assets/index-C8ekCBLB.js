import{g as s,u as fe,d as ye,r as S,j as e,c as E,aB as ce,br as je,a2 as be,bs as ve,ag as Se,bt as de,bu as we,bv as Ce,bw as ke,bx as $e,aj as y,B as w,a5 as Te,aC as Fe,f as Ee}from"./index-CormbGNw.js";import{P as Ae}from"./PageHeader-CfBHQzCR.js";import{B as Ie}from"./Badge-BxL85X3Q.js";import"./Tooltip-C9hj27Ur.js";import"./Badge.styles-Bj8fo-OT.js";const Re=s.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`,qe=s.div`
  background: linear-gradient(180deg, ${({theme:r})=>r.colors.surface} 0%, #FAFAFF 100%);
  border: 1px solid ${({theme:r})=>r.colors.border};
  border-radius: 4px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  @media (max-width: 768px) {
    padding: 20px;
    gap: 24px;
  }
`,_e=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({theme:r})=>r.colors.border};
`,ze=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
`,Le=s.button`
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
`;s.div`
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
`;const Be=s.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({theme:r})=>r.colors.text};
  margin: 0;
  letter-spacing: -0.3px;

  @media (max-width: 640px) {
    font-size: 20px;
  }
`,Pe=s.h2`
  font-size: 15px;
  font-weight: 600;
  color: ${({theme:r})=>r.colors.primary};
  margin: 0;
`,Ne=s.p`
  font-size: 13px;
  color: ${({theme:r})=>r.colors.textSecondary};
  margin: 0;
`,De=s.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,A=s.div`
  background: ${({$gradient:r})=>r};
  border: 1px solid ${({$borderColor:r})=>r};
  border-radius: 4px;
  padding: 20px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  }
`,I=s.div`
  width: 46px;
  height: 46px;
  border-radius: 4px;
  background-color: ${({$bg:r})=>r};
  color: ${({$color:r})=>r};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,R=s.div`
  display: flex;
  flex-direction: column;
`,q=s.span`
  font-size: 24px;
  font-weight: 800;
  line-height: 1.1;
  color: ${({$color:r})=>r};
`,_=s.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme:r})=>r.colors.textSecondary};
  margin-top: 2px;
`,D=s.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({theme:r})=>r.colors.border};
`,O=s.div`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${({theme:r})=>r.colors.primaryLight};
  color: ${({$color:r,theme:g})=>r||g.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,Q=s.h3`
  font-size: 17px;
  font-weight: 700;
  color: ${({theme:r})=>r.colors.text};
  margin: 0;
`,Oe=s.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
  }
`,G=s.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background-color: ${({theme:r})=>r.colors.surface};
  border: 1px solid ${({theme:r})=>r.colors.border};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:r})=>r.colors.primary};
    box-shadow: 0 4px 16px rgba(93, 35, 132, 0.06);
    transform: translateY(-2px);
  }
`,H=s.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,M=s.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: ${({$bg:r})=>r};
  color: ${({$color:r})=>r};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
  flex-shrink: 0;
`,W=s.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({theme:r})=>r.colors.text};
`,U=s.span`
  font-size: 13px;
  color: ${({theme:r})=>r.colors.textSecondary};
  line-height: 1.55;
`,Qe=s.div`
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  border: 1px solid ${({theme:r})=>r.colors.border};
  border-left: 4px solid ${({theme:r})=>r.colors.primary};
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`,Ge=s.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: ${({theme:r})=>r.colors.text};
`,He=s.p`
  font-size: 14px;
  color: ${({theme:r})=>r.colors.textSecondary};
  line-height: 1.65;
  margin: 0;
`,Me=s.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,C=s.div`
  display: flex;
  gap: 14px;
  padding: 18px 20px;
  border: 1px solid #FDE68A;
  border-left: 4px solid #D97706;
  border-radius: 4px;
  background-color: #FFFBEB;
  box-shadow: 0 2px 8px rgba(217, 119, 6, 0.04);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(217, 119, 6, 0.08);
  }
`,k=s.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: #FEF3C7;
  color: #D97706;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,$=s.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,T=s.span`
  font-size: 15px;
  font-weight: 700;
  color: #78350F;
`,F=s.span`
  font-size: 13px;
  color: #92400E;
  line-height: 1.5;
`,We=s.div`
  background: linear-gradient(135deg, ${({theme:r})=>r.colors.primary} 0%, #1E3A8A 100%);
  border-radius: 4px;
  padding: 32px 24px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(93, 35, 132, 0.15);
`,Ue=s.h3`
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.2px;
`,Ye=s.p`
  font-size: 14px;
  color: #ffffff;
  margin: 0;
  opacity: 0.95;
  font-weight: 400;
`,Ve=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-top: 12px;
`,Je=s.span`
  font-size: 13px;
  color: ${({theme:r})=>r.colors.textSecondary};
  font-weight: 500;
`,Ke=s.div`
  background-color: ${({theme:r})=>r.colors.surface};
  border: 1px solid ${({theme:r})=>r.colors.border};
  border-radius: 4px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,Xe=s.div`
  background: linear-gradient(135deg, ${({theme:r})=>r.colors.primary} 0%, #2563EB 100%);
  padding: ${({theme:r})=>r.spacing.lg} ${({theme:r})=>r.spacing.xl};
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: ${({theme:r})=>r.spacing.sm};
`,Ze=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({theme:r})=>r.fontSize.sm};
  font-weight: ${({theme:r})=>r.fontWeight.semibold};
  letter-spacing: 0.5px;
  text-transform: uppercase;
`,er=s.div`
  width: 100%;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  overflow: hidden;
`,rr=s.div`
  height: 100%;
  width: ${({$percent:r})=>r}%;
  background-color: #ffffff;
  border-radius: 4px;
  transition: width 0.3s ease;
`,ir=s.div`
  padding: ${({theme:r})=>r.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: 28px;
`,l=s.div`
  background-color: ${({theme:r})=>r.colors.background};
  border: 1px solid ${({theme:r})=>r.colors.border};
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,c=s.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({theme:r})=>r.colors.text};
  margin: 0;
  line-height: 1.45;
`,Y=s.p`
  font-size: 13px;
  color: ${({theme:r})=>r.colors.textSecondary};
  margin: 0;
`,m=s.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,h=s.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 4px;
  border: 1px solid ${({theme:r})=>r.colors.border};
  background-color: ${({theme:r})=>r.colors.surface};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:r})=>r.colors.primary};
    background-color: ${({theme:r})=>r.colors.primaryLight};
  }

  input[type='radio'],
  input[type='checkbox'] {
    accent-color: ${({theme:r})=>r.colors.primary};
    margin-top: 3px;
  }
`,x=s.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,p=s.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({theme:r})=>r.colors.text};
`,j=s.input`
  width: 100%;
  padding: 10px 14px;
  border-radius: 4px;
  border: 1px solid ${({theme:r})=>r.colors.border};
  background-color: ${({theme:r})=>r.colors.surface};
  font-size: 14px;
  color: ${({theme:r})=>r.colors.text};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({theme:r})=>r.colors.primary};
  }
`,sr=s.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${({theme:r})=>r.colors.border};
  border-radius: 4px;
`,or=s.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th,
  td {
    padding: 12px 14px;
    border: 1px solid ${({theme:r})=>r.colors.border};
    text-align: left;
  }

  th {
    background-color: ${({theme:r})=>r.colors.background};
    font-weight: 600;
    color: ${({theme:r})=>r.colors.text};
  }
`,V=s.input`
  width: 100%;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid ${({theme:r})=>r.colors.border};
  font-size: 13px;
  color: ${({theme:r})=>r.colors.text};

  &:focus {
    outline: none;
    border-color: ${({theme:r})=>r.colors.primary};
  }
`,J=s.button`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid ${({theme:r})=>r.colors.border};
  background-color: ${({$active:r,theme:g})=>r?g.colors.primary:g.colors.surface};
  color: ${({$active:r,theme:g})=>r?"#ffffff":g.colors.text};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:r})=>r.colors.primary};
  }
`,K=s.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,X=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: ${({theme:r})=>r.colors.surface};
  border: 1px solid ${({theme:r})=>r.colors.border};
  border-radius: 4px;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`,Z=s.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({theme:r})=>r.colors.text};
`,ee=s.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,tr=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:r})=>r.spacing.lg} ${({theme:r})=>r.spacing.xl};
  background-color: ${({theme:r})=>r.colors.background};
  border-top: 1px solid ${({theme:r})=>r.colors.border};
`,nr=s.div`
  background-color: ${({theme:r})=>r.colors.primaryLight};
  border: 1px solid ${({theme:r})=>r.colors.primary};
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${({theme:r})=>r.colors.primary};
`,ar=["Speaking or presenting in front of others","Writing clearly and creatively","Drawing, designing, or visual arts","Solving logical and mathematical puzzles","Working effectively in teams","Organizing events, schedules, or groups","Helping others solve personal or academic problems","Analyzing data, statistics, or charts","Building, repairing, or crafting physical objects","Remembering facts, dates, and information quickly","Creative thinking and generating new ideas","Time management and planning ahead","Public speaking and debating","Technical and digital skills (coding, tech tools)","Leadership and motivating others","Problem-solving under pressure","Taking initiative without being told what to do"],pr=()=>{var te,ne,ae,le;const r=fe(),g=ye(),[re,he]=S.useState(!1),[a,ie]=S.useState(1),b=6,se=S.useRef(null),z=S.useRef(null),L=()=>{setTimeout(()=>{z.current&&z.current.scrollIntoView({behavior:"smooth",block:"start"});const i=document.querySelector("main");i&&i.scrollTo({top:0,behavior:"smooth"}),window.scrollTo({top:0,behavior:"smooth"})},50)},[n,d]=S.useState({q4_streamChoices:{},q8_workActivityRatings:{},q12_studyHabitRatings:{},q13_coCurricularEntries:[{activity:"",role:"",years:""},{activity:"",role:"",years:""}]}),xe=()=>{ie(i=>Math.min(b,i+1)),L()},pe=()=>{ie(i=>Math.max(1,i-1)),L()},B=(i,o)=>{d(t=>({...t,[i]:o}))},f=(i,o)=>{d(t=>{const u=t[i]||[],v=u.includes(o)?u.filter(me=>me!==o):[...u,o];return{...t,[i]:v}})},P=(i,o,t)=>{d(u=>({...u,[i]:{...u[i]||{},[o]:t}}))},N=(i,o,t)=>{d(u=>{const v=[...u.q13_coCurricularEntries||[]];return v[i]={...v[i],[o]:t},{...u,q13_coCurricularEntries:v}})},ue=()=>{d(i=>({...i,q13_coCurricularEntries:[...i.q13_coCurricularEntries||[],{activity:"",role:"",years:""}]}))},ge=()=>{localStorage.setItem("pwc_precounselling_submitted","true"),localStorage.setItem("pwc_student_precounseling_form_submitted","true"),g.success("Pre-Counselling Form Submitted!","Thank you for completing the form. Your counsellor will review your responses before Session 1."),r(E.STUDENT_PORTAL)},oe=Math.round(a/b*100);return e.jsxs(Re,{ref:z,children:[re&&e.jsx(Ae,{title:"STUDENT PRE-COUNSELLING FORM",subtitle:"Career Counselling Programme — Class 9 & 10",breadcrumbs:[{label:"Student Portal",href:E.STUDENT_PORTAL},{label:"Pre-Counselling Form"}],onBack:()=>r(E.STUDENT_PORTAL),actions:e.jsxs(Ie,{variant:"primary",size:"md",children:["Step ",a," of ",b]})}),re?e.jsxs(Ke,{children:[e.jsxs(Xe,{children:[e.jsxs(Ze,{children:[e.jsxs("span",{children:[a===1&&"SECTION 1 — ACADEMIC SUBJECT PREFERENCES (Q1 to Q3)",a===2&&"SECTION 2 — STREAM & CAREER EXPLORATION (Q4 to Q7)",a===3&&"SECTION 3 — WORK ACTIVITIES & STRENGTHS (Q8 to Q10)",a===4&&"SECTION 4 — STUDY HABITS & LEARNING STYLE (Q11 & Q12)",a===5&&"SECTION 5 — CO-CURRICULAR & PERSONALITY (Q13 & Q14)",a===6&&"SECTION 6 — COUNSELLING GOALS & FINAL QUESTIONS (Q15 & Q16)"]}),e.jsxs("span",{children:["Step ",a," of ",b," (",oe,"%)"]})]}),e.jsx(er,{children:e.jsx(rr,{$percent:oe})})]}),e.jsxs(ir,{children:[a===1&&e.jsxs(e.Fragment,{children:[e.jsxs(l,{children:[e.jsx(c,{children:"Q1. Which statement best describes your overall academic standing?"}),e.jsxs(m,{children:[["Top performer — consistently among the highest scorers in class","Above average — perform well across most subjects with good grades","Average — maintain steady passing grades with occasional highlights","Struggling in a few key subjects — need targeted academic support"].map(i=>e.jsxs(h,{$selected:n.q1_academicStanding===i,children:[e.jsx("input",{type:"radio",name:"q1",checked:n.q1_academicStanding===i,onChange:()=>B("q1_academicStanding",i)}),e.jsx(x,{children:e.jsx(p,{children:i})})]},i)),e.jsxs(h,{$selected:n.q1_academicStanding==="other",children:[e.jsx("input",{type:"radio",name:"q1",checked:n.q1_academicStanding==="other",onChange:()=>{B("q1_academicStanding","other"),setTimeout(()=>{var i;return(i=se.current)==null?void 0:i.focus()},50)}}),e.jsxs(x,{style:{width:"100%"},children:[e.jsx(p,{children:"Other (Specify)"}),n.q1_academicStanding==="other"&&e.jsx(j,{ref:se,placeholder:"Please specify your academic standing...",value:n.q1_academicStandingOther||"",onChange:i=>d(o=>({...o,q1_academicStandingOther:i.target.value}))})]})]})]})]}),e.jsxs(l,{children:[e.jsx(c,{children:"Q2. Which subjects do you genuinely ENJOY studying the most? (Select up to 3)"}),e.jsxs(m,{children:[["Mathematics","Physics","Chemistry","Biology / Life Sciences","Computer Science / IT","English Literature / Languages","Social Sciences (History, Geography, Civics)","Economics / Commerce / Business Studies","Visual Arts / Design / Performing Arts"].map(i=>{var o,t;return e.jsxs(h,{$selected:(o=n.q2_favoriteSubjects)==null?void 0:o.includes(i),children:[e.jsx("input",{type:"checkbox",checked:((t=n.q2_favoriteSubjects)==null?void 0:t.includes(i))||!1,onChange:()=>f("q2_favoriteSubjects",i)}),e.jsx(x,{children:e.jsx(p,{children:i})})]},i)}),e.jsxs(h,{$selected:(te=n.q2_favoriteSubjects)==null?void 0:te.includes("other"),children:[e.jsx("input",{type:"checkbox",checked:((ne=n.q2_favoriteSubjects)==null?void 0:ne.includes("other"))||!1,onChange:()=>f("q2_favoriteSubjects","other")}),e.jsxs(x,{style:{width:"100%"},children:[e.jsx(p,{children:"Other Subject (Specify)"}),((ae=n.q2_favoriteSubjects)==null?void 0:ae.includes("other"))&&e.jsx(j,{placeholder:"Enter other favorite subject...",value:n.q2_favoriteSubjectsOther||"",onChange:i=>d(o=>({...o,q2_favoriteSubjectsOther:i.target.value}))})]})]})]})]}),e.jsxs(l,{children:[e.jsx(c,{children:"Q3. Which subjects do you find MOST CHALLENGING or least interesting? (Select up to 3)"}),e.jsx(m,{children:["Mathematics","Physics","Chemistry","Biology / Life Sciences","Computer Science / IT","English Literature / Languages","Social Sciences (History, Geography, Civics)","Economics / Commerce / Business Studies","Visual Arts / Design / Performing Arts"].map(i=>{var o,t;return e.jsxs(h,{$selected:(o=n.q3_leastFavoriteSubjects)==null?void 0:o.includes(i),children:[e.jsx("input",{type:"checkbox",checked:((t=n.q3_leastFavoriteSubjects)==null?void 0:t.includes(i))||!1,onChange:()=>f("q3_leastFavoriteSubjects",i)}),e.jsx(x,{children:e.jsx(p,{children:i})})]},i)})})]})]}),a===2&&e.jsxs(e.Fragment,{children:[e.jsxs(l,{children:[e.jsx(c,{children:"Q4. Rank your preference for Class 11 & 12 Academic Streams:"}),e.jsx(Y,{children:"Rate your interest level for each stream option below."}),e.jsx(K,{children:[{key:"pcm",title:"Science (PCM) — Physics, Chemistry, Mathematics"},{key:"pcb",title:"Science (PCB) — Physics, Chemistry, Biology"},{key:"pcmb",title:"Science (PCMB) — Physics, Chemistry, Mathematics, Biology"},{key:"commerce_math",title:"Commerce with Mathematics"},{key:"commerce_no_math",title:"Commerce without Mathematics"},{key:"humanities",title:"Humanities / Arts"}].map(i=>e.jsxs(X,{children:[e.jsx(Z,{children:i.title}),e.jsx(ee,{children:["High Interest","Moderate","Low","Not Interested"].map(o=>{var t;return e.jsx(J,{type:"button",$active:((t=n.q4_streamChoices)==null?void 0:t[i.key])===o,onClick:()=>P("q4_streamChoices",i.key,o),children:o},o)})})]},i.key))})]}),e.jsxs(l,{children:[e.jsx(c,{children:"Q5. How confident do you feel about your stream choice for Class 11?"}),e.jsx(m,{children:["Very Confident — I know exactly which stream I want and why","Somewhat Confident — I have a primary choice but want to validate it","Confused / Undecided — I am torn between two or more streams","Completely Unsure — I need complete guidance from ground up"].map(i=>e.jsxs(h,{$selected:n.q5_streamConfidence===i,children:[e.jsx("input",{type:"radio",name:"q5",checked:n.q5_streamConfidence===i,onChange:()=>B("q5_streamConfidence",i)}),e.jsx(x,{children:e.jsx(p,{children:i})})]},i))})]}),e.jsxs(l,{children:[e.jsx(c,{children:"Q6. Which Career Clusters interest you the most? (Select up to 3)"}),e.jsx(m,{children:["Engineering, Technology & AI","Medicine, Healthcare & Biotechnology","Business, Finance & Entrepreneurship","Law, Public Policy & Civil Services","Design, Architecture & Fine Arts","Media, Journalism & Communications","Aviation, Defense & Logistics","Pure Sciences, Research & Astronomy","Psychology, Humanities & Social Work"].map(i=>{var o,t;return e.jsxs(h,{$selected:(o=n.q6_careerClusterPicks)==null?void 0:o.includes(i),children:[e.jsx("input",{type:"checkbox",checked:((t=n.q6_careerClusterPicks)==null?void 0:t.includes(i))||!1,onChange:()=>f("q6_careerClusterPicks",i)}),e.jsx(x,{children:e.jsx(p,{children:i})})]},i)})})]}),e.jsxs(l,{children:[e.jsx(c,{children:"Q7. Do you have any specific dream careers or professions in mind?"}),e.jsx(Y,{children:"Write any specific roles or occupations you currently aspire to pursue (e.g. Aeronautical Engineer, Neurosurgeon, Corporate Lawyer, Graphic Designer)."}),e.jsx(j,{placeholder:"Enter your dream careers or professions (or write 'Still Exploring')...",value:n.q7_dreamCareersInput||"",onChange:i=>d(o=>({...o,q7_dreamCareersInput:i.target.value}))})]})]}),a===3&&e.jsxs(e.Fragment,{children:[e.jsxs(l,{children:[e.jsx(c,{children:"Q8. Rate your enjoyment for the following work activities:"}),e.jsx(K,{children:[{key:"act1",title:"Solving complex mathematical or logical problems"},{key:"act2",title:"Designing graphics, UI, or artistic visuals"},{key:"act3",title:"Leading team discussions and pitching business ideas"},{key:"act4",title:"Conducting scientific experiments in laboratories"},{key:"act5",title:"Writing essays, reports, or creative stories"},{key:"act6",title:"Helping individuals navigate personal or social challenges"}].map(i=>e.jsxs(X,{children:[e.jsx(Z,{children:i.title}),e.jsx(ee,{children:["Love It","Like It","Neutral","Dislike"].map(o=>{var t;return e.jsx(J,{type:"button",$active:((t=n.q8_workActivityRatings)==null?void 0:t[i.key])===o,onClick:()=>P("q8_workActivityRatings",i.key,o),children:o},o)})})]},i.key))})]}),e.jsxs(l,{children:[e.jsx(c,{children:"Q9. Select your TOP STRENGTHS & SKILLS (Select up to 5 items from the list below):"}),e.jsx(m,{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:ar.map(i=>{var o,t;return e.jsxs(h,{$selected:(o=n.q9_strengthSelections)==null?void 0:o.includes(i),children:[e.jsx("input",{type:"checkbox",checked:((t=n.q9_strengthSelections)==null?void 0:t.includes(i))||!1,onChange:()=>f("q9_strengthSelections",i)}),e.jsx(x,{children:e.jsx(p,{children:i})})]},i)})})]}),e.jsxs(l,{children:[e.jsx(c,{children:"Q10. In your own words, what are your 3 biggest personal strengths?"}),e.jsx(j,{placeholder:"Describe your top 3 personal strengths...",value:n.q10_top3StrengthsInput||"",onChange:i=>d(o=>({...o,q10_top3StrengthsInput:i.target.value}))})]})]}),a===4&&e.jsxs(e.Fragment,{children:[e.jsxs(l,{children:[e.jsx(c,{children:"Q11. What areas would you like to improve or develop further?"}),e.jsx(j,{placeholder:"Describe areas you want to improve (e.g. time management, exam anxiety, focus)...",value:n.q11_growthAreasInput||"",onChange:i=>d(o=>({...o,q11_growthAreasInput:i.target.value}))})]}),e.jsxs(l,{children:[e.jsx(c,{children:"Q12. Rate your agreement with the following study habit statements:"}),e.jsx(K,{children:[{key:"h1",title:"I follow a daily study schedule consistently"},{key:"h2",title:"I prefer understanding underlying concepts over rote memorization"},{key:"h3",title:"I tend to procrastinate on challenging assignments"},{key:"h4",title:"I revise study material regularly before exam dates"}].map(i=>e.jsxs(X,{children:[e.jsx(Z,{children:i.title}),e.jsx(ee,{children:["Strongly Agree","Agree","Neutral","Disagree"].map(o=>{var t;return e.jsx(J,{type:"button",$active:((t=n.q12_studyHabitRatings)==null?void 0:t[i.key])===o,onClick:()=>P("q12_studyHabitRatings",i.key,o),children:o},o)})})]},i.key))})]})]}),a===5&&e.jsxs(e.Fragment,{children:[e.jsxs(l,{children:[e.jsx(c,{children:"Q13. List your key Co-Curricular & Extracurricular Activities:"}),e.jsx(sr,{children:e.jsxs(or,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Activity / Sport / Club"}),e.jsx("th",{children:"Role / Achievement / Level"}),e.jsx("th",{children:"Years Involved"})]})}),e.jsx("tbody",{children:(le=n.q13_coCurricularEntries)==null?void 0:le.map((i,o)=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(V,{placeholder:"e.g. School Basketball Team, Robotics Club",value:i.activity,onChange:t=>N(o,"activity",t.target.value)})}),e.jsx("td",{children:e.jsx(V,{placeholder:"e.g. Captain / District Level Winner",value:i.role,onChange:t=>N(o,"role",t.target.value)})}),e.jsx("td",{children:e.jsx(V,{placeholder:"e.g. 2 Years",value:i.years,onChange:t=>N(o,"years",t.target.value)})})]},o))})]})}),e.jsx(w,{type:"button",variant:"secondary",size:"sm",onClick:ue,style:{alignSelf:"flex-start"},children:"+ Add Another Activity Row"})]}),e.jsxs(l,{children:[e.jsx(c,{children:"Q14. How do you spend your free time outside academics? (Select all that apply)"}),e.jsx(m,{children:["Reading books, novels, or articles","Gaming, esports, or digital puzzle solving","Playing sports, fitness, or outdoor activities","Listening to music, playing instruments, or singing","Coding, website building, or exploring new tech tools","Volunteering, social service, or community work"].map(i=>{var o,t;return e.jsxs(h,{$selected:(o=n.q14_freetimeActivities)==null?void 0:o.includes(i),children:[e.jsx("input",{type:"checkbox",checked:((t=n.q14_freetimeActivities)==null?void 0:t.includes(i))||!1,onChange:()=>f("q14_freetimeActivities",i)}),e.jsx(x,{children:e.jsx(p,{children:i})})]},i)})})]})]}),a===6&&e.jsxs(e.Fragment,{children:[e.jsxs(l,{children:[e.jsx(c,{children:"Q15. What are your primary goals for this Career Counselling Session? (Select up to 3)"}),e.jsx(m,{children:["Clear guidance on selecting Class 11 & 12 Academic Stream","Understanding specific career options suitable for my profile","Learning about competitive entrance exams and preparation timelines","Identifying my core strengths, interests, and potential skill gaps","Creating an actionable step-by-step academic & career roadmap"].map(i=>{var o,t;return e.jsxs(h,{$selected:(o=n.q15_counsellingGoals)==null?void 0:o.includes(i),children:[e.jsx("input",{type:"checkbox",checked:((t=n.q15_counsellingGoals)==null?void 0:t.includes(i))||!1,onChange:()=>f("q15_counsellingGoals",i)}),e.jsx(x,{children:e.jsx(p,{children:i})})]},i)})})]}),e.jsxs(l,{children:[e.jsx(c,{children:"Q16. Do you have any specific questions or concerns for your senior career counsellor?"}),e.jsx(Y,{children:"Write any specific questions you would like addressed during your 1-on-1 video call session."}),e.jsx(j,{placeholder:"Enter any specific questions or topics for your counsellor...",value:n.q16_specificQuestionsInput||"",onChange:i=>d(o=>({...o,q16_specificQuestionsInput:i.target.value}))})]}),e.jsxs(nr,{children:[e.jsx("strong",{children:"Thank you for completing your Student Pre-Counselling Form!"}),e.jsx("span",{children:"Your responses will be thoroughly analyzed by your senior career counsellor before your 1-on-1 video session. Click 'Submit Form' below to finish."})]})]})]}),e.jsxs(tr,{children:[e.jsx(w,{type:"button",variant:"secondary",size:"md",leftIcon:e.jsx(ce,{size:18}),disabled:a===1,onClick:pe,children:"Previous Step"}),a<b?e.jsx(w,{type:"button",variant:"primary",size:"md",rightIcon:e.jsx(Fe,{size:18}),onClick:xe,children:"Next Step"}):e.jsx(w,{type:"button",variant:"primary",size:"md",leftIcon:e.jsx(Ee,{size:18}),onClick:ge,children:"Submit Form"})]})]}):e.jsxs(qe,{children:[e.jsxs(_e,{children:[e.jsx(ze,{children:e.jsx(Le,{type:"button",onClick:()=>r(E.STUDENT_PORTAL),"aria-label":"Back to Student Portal",children:e.jsx(ce,{size:18})})}),e.jsx(Be,{children:"STUDENT PRE-COUNSELLING FORM"}),e.jsx(Pe,{children:"Career Counselling Programme — Class 9 & 10"}),e.jsx(Ne,{children:"Instructions for Students • Read this carefully before you begin."})]}),e.jsxs(De,{children:[e.jsxs(A,{$gradient:"linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)",$borderColor:"#DBEAFE",children:[e.jsx(I,{$bg:"#DBEAFE",$color:"#1E40AF",children:e.jsx(je,{size:24})}),e.jsxs(R,{children:[e.jsx(q,{$color:"#1E40AF",children:"19"}),e.jsx(_,{children:"Questions"})]})]}),e.jsxs(A,{$gradient:"linear-gradient(135deg, #F8FAFC 0%, #FAF5FF 100%)",$borderColor:"#E9D5FF",children:[e.jsx(I,{$bg:"#F3E8FF",$color:"#6B21A8",children:e.jsx(be,{size:24})}),e.jsxs(R,{children:[e.jsx(q,{$color:"#6B21A8",children:"6"}),e.jsx(_,{children:"Sections"})]})]}),e.jsxs(A,{$gradient:"linear-gradient(135deg, #F8FAFC 0%, #FEF3C7 100%)",$borderColor:"#FDE68A",children:[e.jsx(I,{$bg:"#FEF3C7",$color:"#B45309",children:e.jsx(ve,{size:24})}),e.jsxs(R,{children:[e.jsx(q,{$color:"#B45309",children:"10–12"}),e.jsx(_,{children:"Minutes"})]})]}),e.jsxs(A,{$gradient:"linear-gradient(135deg, #F8FAFC 0%, #ECFDF5 100%)",$borderColor:"#A7F3D0",children:[e.jsx(I,{$bg:"#D1FAE5",$color:"#047857",children:e.jsx(Se,{size:24})}),e.jsxs(R,{children:[e.jsx(q,{$color:"#047857",children:"100%"}),e.jsx(_,{children:"Confidential"})]})]})]}),e.jsxs("div",{children:[e.jsxs(D,{children:[e.jsx(O,{$color:"#2563EB",children:e.jsx(de,{size:18})}),e.jsx(Q,{children:"Before You Fill This Form"})]}),e.jsxs(Oe,{style:{marginTop:16},children:[e.jsxs(G,{children:[e.jsxs(H,{children:[e.jsx(M,{$bg:"#DBEAFE",$color:"#1E40AF",children:e.jsx(we,{size:20})}),e.jsx(W,{children:"1. Find a quiet spot."})]}),e.jsx(U,{children:"Sit somewhere with no distractions — no noise, no interruptions. These questions need your honest, unhurried attention. Treat this time as an investment in your own career clarity — not a task which you just need to finish of in any manner."})]}),e.jsxs(G,{children:[e.jsxs(H,{children:[e.jsx(M,{$bg:"#D1FAE5",$color:"#047857",children:e.jsx(Ce,{size:20})}),e.jsx(W,{children:"2. Set aside 10–12 minutes."})]}),e.jsx(U,{children:"This is not something to rush through between classes. Choose a time when you are relaxed and can reflect properly. Quality of reflection matters more than speed."})]}),e.jsxs(G,{children:[e.jsxs(H,{children:[e.jsx(M,{$bg:"#F3E8FF",$color:"#6B21A8",children:e.jsx(ke,{size:20})}),e.jsx(W,{children:"3. Keep your phone away."})]}),e.jsx(U,{children:"Avoid the urge to check messages while filling the form. It breaks the flow of honest self-reflection — give it your full focus."})]})]})]}),e.jsxs("div",{children:[e.jsxs(D,{children:[e.jsx(O,{$color:"#5D2384",children:e.jsx($e,{size:18})}),e.jsx(Q,{children:"What This Form Is About"})]}),e.jsxs(Qe,{style:{marginTop:16},children:[e.jsxs(Ge,{children:[e.jsx(de,{size:20,style:{color:"#5D2384"}}),e.jsx("span",{children:"This is not a quiz and it is not being graded. There are no right answers and no wrong answers."})]}),e.jsxs(He,{children:["This is not a psychometric test nor an aptitude exam. There are no right answers and no wrong answers — and nothing here will be graded.",e.jsx("br",{}),e.jsx("br",{}),"This form helps your counsellor get to know you before your session. The more honestly you fill it, the more personalised and useful your counselling session will be.",e.jsx("br",{}),e.jsx("br",{}),"Think of it as a conversation starter — not an assessment. You are not being judged. Your responses are completely confidential and will only be seen by your counsellor."]})]})]}),e.jsxs("div",{children:[e.jsxs(D,{children:[e.jsx(O,{$color:"#D97706",children:e.jsx(y,{size:18})}),e.jsx(Q,{children:"The Golden Rules — Read These Carefully"})]}),e.jsxs(Me,{style:{marginTop:16},children:[e.jsxs(C,{children:[e.jsx(k,{children:e.jsx(y,{size:20})}),e.jsxs($,{children:[e.jsx(T,{children:"Be honest. Be yourself."}),e.jsx(F,{children:"Answer based on how you actually are — not how you want to appear, not what sounds impressive, not what you think a counsellor wants to hear. The more genuine your responses, the more your session will feel tailored to you."})]})]}),e.jsxs(C,{children:[e.jsx(k,{children:e.jsx(y,{size:20})}),e.jsxs($,{children:[e.jsx(T,{children:"Take your time — go with your first instinct."}),e.jsx(F,{children:"For open-ended questions, write what naturally comes to mind. For multiple-choice questions, go with your first instinct. Your gut reaction is usually the truest one. If you sit on a question too long, you start second-guessing yourself."})]})]}),e.jsxs(C,{children:[e.jsx(k,{children:e.jsx(y,{size:20})}),e.jsxs($,{children:[e.jsx(T,{children:"Do not skip questions."}),e.jsx(F,{children:"Every question gives your counsellor something useful. If something feels too personal, just write as much as you are comfortable with — but try not to leave anything blank."})]})]}),e.jsxs(C,{children:[e.jsx(k,{children:e.jsx(y,{size:20})}),e.jsxs($,{children:[e.jsx(T,{children:"Your responses are private."}),e.jsx(F,{children:"Only you and your career counsellor will see your answers. This is a safe space — there is no audience, no judgment, no grades. Be real."})]})]}),e.jsxs(C,{style:{gridColumn:"span 2"},children:[e.jsx(k,{children:e.jsx(y,{size:20})}),e.jsxs($,{children:[e.jsx(T,{children:"It is okay to say 'I don't know'."}),e.jsx(F,{children:"If you are unsure about your career direction — that is perfectly normal at your age. Write 'Still Exploring' wherever asked. Your uncertainty is valuable information too."})]})]})]})]}),e.jsxs(We,{children:[e.jsx(Ue,{children:"You are ready. Take a deep breath."}),e.jsx(Ye,{children:"There is nothing to prepare for. Just be yourself — and let your counsellor do the rest."})]}),e.jsxs(Ve,{children:[e.jsx(w,{variant:"primary",size:"lg",rightIcon:e.jsx(Te,{size:20}),onClick:()=>{he(!0),L()},style:{minWidth:"320px"},children:"Start Pre-Counselling Form"}),e.jsx(Je,{children:"Estimated time: 10–12 minutes • Answers saved automatically as you navigate"})]})]})]})};export{pr as PreCounsellingFormPage};
