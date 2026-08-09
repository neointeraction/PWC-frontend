import{g as s,u as be,d as ve,r as S,j as e,c as A,aB as pe,br as Se,a2 as we,bs as Ce,ag as ke,bt as w,bu as $e,bv as Te,bw as Fe,bx as Ee,aj as j,B as C,a5 as Ae,aC as Ie,f as Re}from"./index-DquQY_gK.js";import{P as qe}from"./PageHeader-CH8ZQzui.js";import{B as _e}from"./Badge-IsTjrd75.js";import"./Tooltip-n1WJqe4o.js";import"./Badge.styles-CPrEOBEn.js";const ze=s.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`,Le=s.div`
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
`,Be=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({theme:r})=>r.colors.border};
`,Pe=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
`,Ne=s.button`
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
`;const De=s.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({theme:r})=>r.colors.text};
  margin: 0;
  letter-spacing: -0.3px;

  @media (max-width: 640px) {
    font-size: 20px;
  }
`,Oe=s.h2`
  font-size: 15px;
  font-weight: 600;
  color: ${({theme:r})=>r.colors.primary};
  margin: 0;
`,Qe=s.p`
  font-size: 13px;
  color: ${({theme:r})=>r.colors.textSecondary};
  margin: 0;
`,Ge=s.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,I=s.div`
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
`,R=s.div`
  width: 46px;
  height: 46px;
  border-radius: 4px;
  background-color: ${({$bg:r})=>r};
  color: ${({$color:r})=>r};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,q=s.div`
  display: flex;
  flex-direction: column;
`,_=s.span`
  font-size: 24px;
  font-weight: 800;
  line-height: 1.1;
  color: ${({$color:r})=>r};
`,z=s.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme:r})=>r.colors.textSecondary};
  margin-top: 2px;
`,Q=s.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({theme:r})=>r.colors.border};
`,G=s.div`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${({theme:r})=>r.colors.primaryLight};
  color: ${({$color:r,theme:l})=>r||l.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,H=s.h3`
  font-size: 17px;
  font-weight: 700;
  color: ${({theme:r})=>r.colors.text};
  margin: 0;
`,He=s.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
  }
`,M=s.div`
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
`,W=s.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,U=s.div`
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
`,Y=s.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({theme:r})=>r.colors.text};
`,V=s.span`
  font-size: 13px;
  color: ${({theme:r})=>r.colors.textSecondary};
  line-height: 1.55;
`,Me=s.div`
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  border: 1px solid ${({theme:r})=>r.colors.border};
  border-left: 4px solid ${({theme:r})=>r.colors.primary};
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`,We=s.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,L=s.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14.5px;
  font-weight: 600;
  color: ${({theme:r})=>r.colors.text};
  line-height: 1.5;

  svg {
    margin-top: 2px;
    flex-shrink: 0;
    color: #5D2384;
  }
`,Ue=s.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,k=s.div`
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
`,$=s.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: #FEF3C7;
  color: #D97706;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,T=s.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,F=s.span`
  font-size: 15px;
  font-weight: 700;
  color: #78350F;
`,E=s.span`
  font-size: 13px;
  color: #92400E;
  line-height: 1.5;
`,Ye=s.div`
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
`,Ve=s.h3`
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.2px;
`,Je=s.p`
  font-size: 14px;
  color: #ffffff;
  margin: 0;
  opacity: 0.95;
  font-weight: 400;
`,Ke=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-top: 12px;
`,Xe=s.span`
  font-size: 13px;
  color: ${({theme:r})=>r.colors.textSecondary};
  font-weight: 500;
`,Ze=s.div`
  background-color: ${({theme:r})=>r.colors.surface};
  border: 1px solid ${({theme:r})=>r.colors.border};
  border-radius: 4px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,er=s.div`
  background: linear-gradient(135deg, ${({theme:r})=>r.colors.primary} 0%, #2563EB 100%);
  padding: ${({theme:r})=>r.spacing.lg} ${({theme:r})=>r.spacing.xl};
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: ${({theme:r})=>r.spacing.sm};
`,rr=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({theme:r})=>r.fontSize.sm};
  font-weight: ${({theme:r})=>r.fontWeight.semibold};
  letter-spacing: 0.5px;
  text-transform: uppercase;
`,ir=s.div`
  width: 100%;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  overflow: hidden;
`,sr=s.div`
  height: 100%;
  width: ${({$percent:r})=>r}%;
  background-color: #ffffff;
  border-radius: 4px;
  transition: width 0.3s ease;
`,or=s.div`
  padding: ${({theme:r})=>r.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: 28px;
`,d=s.div`
  background-color: ${({theme:r})=>r.colors.background};
  border: 1px solid ${({theme:r})=>r.colors.border};
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,h=s.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({theme:r})=>r.colors.text};
  margin: 0;
  line-height: 1.45;
`,J=s.p`
  font-size: 13px;
  color: ${({theme:r})=>r.colors.textSecondary};
  margin: 0;
`,y=s.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,u=s.label`
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
`,g=s.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,m=s.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({theme:r})=>r.colors.text};
`,b=s.input`
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
`,tr=s.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${({theme:r})=>r.colors.border};
  border-radius: 4px;
`,nr=s.table`
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
`,K=s.input`
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
`,X=s.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 8px;
  border-radius: 4px;
  border: 1px solid
    ${({$active:r,theme:l})=>r?l.colors.primary:l.colors.border};
  background-color: ${({$active:r,theme:l})=>r?l.colors.primaryLight:l.colors.surface};
  color: ${({$active:r,theme:l})=>r?l.colors.primary:l.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  min-width: 80px;

  &:hover {
    border-color: ${({theme:r})=>r.colors.primary};
    background-color: ${({theme:r})=>r.colors.primaryLight};
    color: ${({theme:r})=>r.colors.primary};
  }
`,Z=s.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: ${({$active:r,theme:l})=>r?l.colors.primary:l.colors.border};
  color: ${({$active:r,theme:l})=>r?"#ffffff":l.colors.text};
  font-size: 13px;
  font-weight: 700;
`,ee=s.span`
  font-size: 13px;
  font-weight: 500;
  line-height: 1.2;
`,re=s.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,ie=s.div`
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
`,se=s.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({theme:r})=>r.colors.text};
`,oe=s.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,ar=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:r})=>r.spacing.lg} ${({theme:r})=>r.spacing.xl};
  background-color: ${({theme:r})=>r.colors.background};
  border-top: 1px solid ${({theme:r})=>r.colors.border};
`,lr=s.div`
  background-color: ${({theme:r})=>r.colors.primaryLight};
  border: 1px solid ${({theme:r})=>r.colors.primary};
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${({theme:r})=>r.colors.primary};
`,cr=["Speaking or presenting in front of others","Writing clearly and creatively","Drawing, designing, or visual arts","Solving logical and mathematical puzzles","Working effectively in teams","Organizing events, schedules, or groups","Helping others solve personal or academic problems","Analyzing data, statistics, or charts","Building, repairing, or crafting physical objects","Remembering facts, dates, and information quickly","Creative thinking and generating new ideas","Time management and planning ahead","Public speaking and debating","Technical and digital skills (coding, tech tools)","Leadership and motivating others","Problem-solving under pressure","Taking initiative without being told what to do"],gr=()=>{var ce,de,he,xe;const r=be(),l=ve(),[te,ue]=S.useState(!1),[c,ne]=S.useState(1),v=6,ae=S.useRef(null),B=S.useRef(null),P=()=>{setTimeout(()=>{B.current&&B.current.scrollIntoView({behavior:"smooth",block:"start"});const i=document.querySelector("main");i&&i.scrollTo({top:0,behavior:"smooth"}),window.scrollTo({top:0,behavior:"smooth"})},50)},[n,p]=S.useState({q4_streamChoices:{},q8_workActivityRatings:{},q12_studyHabitRatings:{},q13_coCurricularEntries:[{activity:"",role:"",years:""},{activity:"",role:"",years:""}]}),ge=()=>{ne(i=>Math.min(v,i+1)),P()},me=()=>{ne(i=>Math.max(1,i-1)),P()},N=(i,o)=>{p(t=>({...t,[i]:o}))},f=(i,o)=>{p(t=>{const a=t[i]||[],x=a.includes(o)?a.filter(je=>je!==o):[...a,o];return{...t,[i]:x}})},D=(i,o,t)=>{p(a=>({...a,[i]:{...a[i]||{},[o]:t}}))},O=(i,o,t)=>{p(a=>{const x=[...a.q13_coCurricularEntries||[]];return x[i]={...x[i],[o]:t},{...a,q13_coCurricularEntries:x}})},ye=()=>{p(i=>({...i,q13_coCurricularEntries:[...i.q13_coCurricularEntries||[],{activity:"",role:"",years:""}]}))},fe=()=>{localStorage.setItem("pwc_precounselling_submitted","true"),localStorage.setItem("pwc_student_precounseling_form_submitted","true"),l.success("Pre-Counselling Form Submitted!","Thank you for completing the form. Your counsellor will review your responses before Session 1."),r(A.STUDENT_PORTAL)},le=Math.round(c/v*100);return e.jsxs(ze,{ref:B,children:[te&&e.jsx(qe,{title:"STUDENT PRE-COUNSELLING FORM",subtitle:"Career Counselling Programme — Class 9 & 10",breadcrumbs:[{label:"Student Portal",href:A.STUDENT_PORTAL},{label:"Pre-Counselling Form"}],onBack:()=>r(A.STUDENT_PORTAL),actions:e.jsxs(_e,{variant:"primary",size:"md",children:["Step ",c," of ",v]})}),te?e.jsxs(Ze,{children:[e.jsxs(er,{children:[e.jsxs(rr,{children:[e.jsxs("span",{children:[c===1&&"SECTION 1 — ACADEMIC SUBJECT PREFERENCES (Q1 to Q3)",c===2&&"SECTION 2 — STREAM & CAREER EXPLORATION (Q4 to Q7)",c===3&&"SECTION 3 — WORK ACTIVITIES & STRENGTHS (Q8 to Q10)",c===4&&"SECTION 4 — STUDY HABITS & LEARNING STYLE (Q11 & Q12)",c===5&&"SECTION 5 — CO-CURRICULAR & PERSONALITY (Q13 & Q14)",c===6&&"SECTION 6 — COUNSELLING GOALS & FINAL QUESTIONS (Q15 & Q16)"]}),e.jsxs("span",{children:["Step ",c," of ",v," (",le,"%)"]})]}),e.jsx(ir,{children:e.jsx(sr,{$percent:le})})]}),e.jsxs(or,{children:[c===1&&e.jsxs(e.Fragment,{children:[e.jsxs(d,{children:[e.jsx(h,{children:"Q1. Which statement best describes your overall academic standing?"}),e.jsxs(y,{children:[["Top performer — consistently among the highest scorers in class","Above average — perform well across most subjects with good grades","Average — maintain steady passing grades with occasional highlights","Struggling in a few key subjects — need targeted academic support"].map(i=>e.jsxs(u,{$selected:n.q1_academicStanding===i,children:[e.jsx("input",{type:"radio",name:"q1",checked:n.q1_academicStanding===i,onChange:()=>N("q1_academicStanding",i)}),e.jsx(g,{children:e.jsx(m,{children:i})})]},i)),e.jsxs(u,{$selected:n.q1_academicStanding==="other",children:[e.jsx("input",{type:"radio",name:"q1",checked:n.q1_academicStanding==="other",onChange:()=>{N("q1_academicStanding","other"),setTimeout(()=>{var i;return(i=ae.current)==null?void 0:i.focus()},50)}}),e.jsxs(g,{style:{width:"100%"},children:[e.jsx(m,{children:"Other (Specify)"}),n.q1_academicStanding==="other"&&e.jsx(b,{ref:ae,placeholder:"Please specify your academic standing...",value:n.q1_academicStandingOther||"",onChange:i=>p(o=>({...o,q1_academicStandingOther:i.target.value}))})]})]})]})]}),e.jsxs(d,{children:[e.jsx(h,{children:"Q2. Which subjects do you genuinely ENJOY studying the most? (Select up to 3)"}),e.jsxs(y,{children:[["Mathematics","Physics","Chemistry","Biology / Life Sciences","Computer Science / IT","English Literature / Languages","Social Sciences (History, Geography, Civics)","Economics / Commerce / Business Studies","Visual Arts / Design / Performing Arts"].map(i=>{var o,t;return e.jsxs(u,{$selected:(o=n.q2_favoriteSubjects)==null?void 0:o.includes(i),children:[e.jsx("input",{type:"checkbox",checked:((t=n.q2_favoriteSubjects)==null?void 0:t.includes(i))||!1,onChange:()=>f("q2_favoriteSubjects",i)}),e.jsx(g,{children:e.jsx(m,{children:i})})]},i)}),e.jsxs(u,{$selected:(ce=n.q2_favoriteSubjects)==null?void 0:ce.includes("other"),children:[e.jsx("input",{type:"checkbox",checked:((de=n.q2_favoriteSubjects)==null?void 0:de.includes("other"))||!1,onChange:()=>f("q2_favoriteSubjects","other")}),e.jsxs(g,{style:{width:"100%"},children:[e.jsx(m,{children:"Other Subject (Specify)"}),((he=n.q2_favoriteSubjects)==null?void 0:he.includes("other"))&&e.jsx(b,{placeholder:"Enter other favorite subject...",value:n.q2_favoriteSubjectsOther||"",onChange:i=>p(o=>({...o,q2_favoriteSubjectsOther:i.target.value}))})]})]})]})]}),e.jsxs(d,{children:[e.jsx(h,{children:"Q3. Which subjects do you find MOST CHALLENGING or least interesting? (Select up to 3)"}),e.jsx(y,{children:["Mathematics","Physics","Chemistry","Biology / Life Sciences","Computer Science / IT","English Literature / Languages","Social Sciences (History, Geography, Civics)","Economics / Commerce / Business Studies","Visual Arts / Design / Performing Arts"].map(i=>{var o,t;return e.jsxs(u,{$selected:(o=n.q3_leastFavoriteSubjects)==null?void 0:o.includes(i),children:[e.jsx("input",{type:"checkbox",checked:((t=n.q3_leastFavoriteSubjects)==null?void 0:t.includes(i))||!1,onChange:()=>f("q3_leastFavoriteSubjects",i)}),e.jsx(g,{children:e.jsx(m,{children:i})})]},i)})})]})]}),c===2&&e.jsxs(e.Fragment,{children:[e.jsxs(d,{children:[e.jsx(h,{children:"Q4. Rank your preference for Class 11 & 12 Academic Streams:"}),e.jsx(J,{children:"Rate your interest level for each stream option below."}),e.jsx(re,{children:[{key:"pcm",title:"Science (PCM) — Physics, Chemistry, Mathematics"},{key:"pcb",title:"Science (PCB) — Physics, Chemistry, Biology"},{key:"pcmb",title:"Science (PCMB) — Physics, Chemistry, Mathematics, Biology"},{key:"commerce_math",title:"Commerce with Mathematics"},{key:"commerce_no_math",title:"Commerce without Mathematics"},{key:"humanities",title:"Humanities / Arts"}].map(i=>e.jsxs(ie,{children:[e.jsx(se,{children:i.title}),e.jsx(oe,{children:["High Interest","Moderate","Low","Not Interested"].map((o,t)=>{var a,x;return e.jsxs(X,{type:"button",$active:((a=n.q4_streamChoices)==null?void 0:a[i.key])===o,onClick:()=>D("q4_streamChoices",i.key,o),children:[e.jsx(Z,{$active:((x=n.q4_streamChoices)==null?void 0:x[i.key])===o,children:t+1}),e.jsx(ee,{children:o})]},o)})})]},i.key))})]}),e.jsxs(d,{children:[e.jsx(h,{children:"Q5. How confident do you feel about your stream choice for Class 11?"}),e.jsx(y,{children:["Very Confident — I know exactly which stream I want and why","Somewhat Confident — I have a primary choice but want to validate it","Confused / Undecided — I am torn between two or more streams","Completely Unsure — I need complete guidance from ground up"].map(i=>e.jsxs(u,{$selected:n.q5_streamConfidence===i,children:[e.jsx("input",{type:"radio",name:"q5",checked:n.q5_streamConfidence===i,onChange:()=>N("q5_streamConfidence",i)}),e.jsx(g,{children:e.jsx(m,{children:i})})]},i))})]}),e.jsxs(d,{children:[e.jsx(h,{children:"Q6. Which Career Clusters interest you the most? (Select up to 3)"}),e.jsx(y,{children:["Engineering, Technology & AI","Medicine, Healthcare & Biotechnology","Business, Finance & Entrepreneurship","Law, Public Policy & Civil Services","Design, Architecture & Fine Arts","Media, Journalism & Communications","Aviation, Defense & Logistics","Pure Sciences, Research & Astronomy","Psychology, Humanities & Social Work"].map(i=>{var o,t;return e.jsxs(u,{$selected:(o=n.q6_careerClusterPicks)==null?void 0:o.includes(i),children:[e.jsx("input",{type:"checkbox",checked:((t=n.q6_careerClusterPicks)==null?void 0:t.includes(i))||!1,onChange:()=>f("q6_careerClusterPicks",i)}),e.jsx(g,{children:e.jsx(m,{children:i})})]},i)})})]}),e.jsxs(d,{children:[e.jsx(h,{children:"Q7. Do you have any specific dream careers or professions in mind?"}),e.jsx(J,{children:"Write any specific roles or occupations you currently aspire to pursue (e.g. Aeronautical Engineer, Neurosurgeon, Corporate Lawyer, Graphic Designer)."}),e.jsx(b,{placeholder:"Enter your dream careers or professions (or write 'Still Exploring')...",value:n.q7_dreamCareersInput||"",onChange:i=>p(o=>({...o,q7_dreamCareersInput:i.target.value}))})]})]}),c===3&&e.jsxs(e.Fragment,{children:[e.jsxs(d,{children:[e.jsx(h,{children:"Q8. Rate your enjoyment for the following work activities:"}),e.jsx(re,{children:[{key:"act1",title:"Solving complex mathematical or logical problems"},{key:"act2",title:"Designing graphics, UI, or artistic visuals"},{key:"act3",title:"Leading team discussions and pitching business ideas"},{key:"act4",title:"Conducting scientific experiments in laboratories"},{key:"act5",title:"Writing essays, reports, or creative stories"},{key:"act6",title:"Helping individuals navigate personal or social challenges"}].map(i=>e.jsxs(ie,{children:[e.jsx(se,{children:i.title}),e.jsx(oe,{children:["Love It","Like It","Neutral","Dislike"].map((o,t)=>{var a,x;return e.jsxs(X,{type:"button",$active:((a=n.q8_workActivityRatings)==null?void 0:a[i.key])===o,onClick:()=>D("q8_workActivityRatings",i.key,o),children:[e.jsx(Z,{$active:((x=n.q8_workActivityRatings)==null?void 0:x[i.key])===o,children:t+1}),e.jsx(ee,{children:o})]},o)})})]},i.key))})]}),e.jsxs(d,{children:[e.jsx(h,{children:"Q9. Select your TOP STRENGTHS & SKILLS (Select up to 5 items from the list below):"}),e.jsx(y,{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:cr.map(i=>{var o,t;return e.jsxs(u,{$selected:(o=n.q9_strengthSelections)==null?void 0:o.includes(i),children:[e.jsx("input",{type:"checkbox",checked:((t=n.q9_strengthSelections)==null?void 0:t.includes(i))||!1,onChange:()=>f("q9_strengthSelections",i)}),e.jsx(g,{children:e.jsx(m,{children:i})})]},i)})})]}),e.jsxs(d,{children:[e.jsx(h,{children:"Q10. In your own words, what are your 3 biggest personal strengths?"}),e.jsx(b,{placeholder:"Describe your top 3 personal strengths...",value:n.q10_top3StrengthsInput||"",onChange:i=>p(o=>({...o,q10_top3StrengthsInput:i.target.value}))})]})]}),c===4&&e.jsxs(e.Fragment,{children:[e.jsxs(d,{children:[e.jsx(h,{children:"Q11. What areas would you like to improve or develop further?"}),e.jsx(b,{placeholder:"Describe areas you want to improve (e.g. time management, exam anxiety, focus)...",value:n.q11_growthAreasInput||"",onChange:i=>p(o=>({...o,q11_growthAreasInput:i.target.value}))})]}),e.jsxs(d,{children:[e.jsx(h,{children:"Q12. Rate your agreement with the following study habit statements:"}),e.jsx(re,{children:[{key:"h1",title:"I follow a daily study schedule consistently"},{key:"h2",title:"I prefer understanding underlying concepts over rote memorization"},{key:"h3",title:"I tend to procrastinate on challenging assignments"},{key:"h4",title:"I revise study material regularly before exam dates"}].map(i=>e.jsxs(ie,{children:[e.jsx(se,{children:i.title}),e.jsx(oe,{children:["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"].map((o,t)=>{var a,x;return e.jsxs(X,{type:"button",$active:((a=n.q12_studyHabitRatings)==null?void 0:a[i.key])===o,onClick:()=>D("q12_studyHabitRatings",i.key,o),children:[e.jsx(Z,{$active:((x=n.q12_studyHabitRatings)==null?void 0:x[i.key])===o,children:t+1}),e.jsx(ee,{children:o})]},o)})})]},i.key))})]})]}),c===5&&e.jsxs(e.Fragment,{children:[e.jsxs(d,{children:[e.jsx(h,{children:"Q13. List your key Co-Curricular & Extracurricular Activities:"}),e.jsx(tr,{children:e.jsxs(nr,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Activity / Sport / Club"}),e.jsx("th",{children:"Role / Achievement / Level"}),e.jsx("th",{children:"Years Involved"})]})}),e.jsx("tbody",{children:(xe=n.q13_coCurricularEntries)==null?void 0:xe.map((i,o)=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(K,{placeholder:"e.g. School Basketball Team, Robotics Club",value:i.activity,onChange:t=>O(o,"activity",t.target.value)})}),e.jsx("td",{children:e.jsx(K,{placeholder:"e.g. Captain / District Level Winner",value:i.role,onChange:t=>O(o,"role",t.target.value)})}),e.jsx("td",{children:e.jsx(K,{placeholder:"e.g. 2 Years",value:i.years,onChange:t=>O(o,"years",t.target.value)})})]},o))})]})}),e.jsx(C,{type:"button",variant:"secondary",size:"sm",onClick:ye,style:{alignSelf:"flex-start"},children:"+ Add Another Activity Row"})]}),e.jsxs(d,{children:[e.jsx(h,{children:"Q14. How do you spend your free time outside academics? (Select all that apply)"}),e.jsx(y,{children:["Reading books, novels, or articles","Gaming, esports, or digital puzzle solving","Playing sports, fitness, or outdoor activities","Listening to music, playing instruments, or singing","Coding, website building, or exploring new tech tools","Volunteering, social service, or community work"].map(i=>{var o,t;return e.jsxs(u,{$selected:(o=n.q14_freetimeActivities)==null?void 0:o.includes(i),children:[e.jsx("input",{type:"checkbox",checked:((t=n.q14_freetimeActivities)==null?void 0:t.includes(i))||!1,onChange:()=>f("q14_freetimeActivities",i)}),e.jsx(g,{children:e.jsx(m,{children:i})})]},i)})})]})]}),c===6&&e.jsxs(e.Fragment,{children:[e.jsxs(d,{children:[e.jsx(h,{children:"Q15. What are your primary goals for this Career Counselling Session? (Select up to 3)"}),e.jsx(y,{children:["Clear guidance on selecting Class 11 & 12 Academic Stream","Understanding specific career options suitable for my profile","Learning about competitive entrance exams and preparation timelines","Identifying my core strengths, interests, and potential skill gaps","Creating an actionable step-by-step academic & career roadmap"].map(i=>{var o,t;return e.jsxs(u,{$selected:(o=n.q15_counsellingGoals)==null?void 0:o.includes(i),children:[e.jsx("input",{type:"checkbox",checked:((t=n.q15_counsellingGoals)==null?void 0:t.includes(i))||!1,onChange:()=>f("q15_counsellingGoals",i)}),e.jsx(g,{children:e.jsx(m,{children:i})})]},i)})})]}),e.jsxs(d,{children:[e.jsx(h,{children:"Q16. Do you have any specific questions or concerns for your senior career counsellor?"}),e.jsx(J,{children:"Write any specific questions you would like addressed during your 1-on-1 video call session."}),e.jsx(b,{placeholder:"Enter any specific questions or topics for your counsellor...",value:n.q16_specificQuestionsInput||"",onChange:i=>p(o=>({...o,q16_specificQuestionsInput:i.target.value}))})]}),e.jsxs(lr,{children:[e.jsx("strong",{children:"Thank you for completing your Student Pre-Counselling Form!"}),e.jsx("span",{children:"Your responses will be thoroughly analyzed by your senior career counsellor before your 1-on-1 video session. Click 'Submit Form' below to finish."})]})]})]}),e.jsxs(ar,{children:[e.jsx(C,{type:"button",variant:"secondary",size:"md",leftIcon:e.jsx(pe,{size:18}),disabled:c===1,onClick:me,children:"Previous Step"}),c<v?e.jsx(C,{type:"button",variant:"primary",size:"md",rightIcon:e.jsx(Ie,{size:18}),onClick:ge,children:"Next Step"}):e.jsx(C,{type:"button",variant:"primary",size:"md",leftIcon:e.jsx(Re,{size:18}),onClick:fe,children:"Submit Form"})]})]}):e.jsxs(Le,{children:[e.jsxs(Be,{children:[e.jsx(Pe,{children:e.jsx(Ne,{type:"button",onClick:()=>r(A.STUDENT_PORTAL),"aria-label":"Back to Student Portal",children:e.jsx(pe,{size:18})})}),e.jsx(De,{children:"STUDENT PRE-COUNSELLING FORM"}),e.jsx(Oe,{children:"Career Counselling Programme — Class 9 & 10"}),e.jsx(Qe,{children:"Instructions for Students • Read this carefully before you begin."})]}),e.jsxs(Ge,{children:[e.jsxs(I,{$gradient:"linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)",$borderColor:"#DBEAFE",children:[e.jsx(R,{$bg:"#DBEAFE",$color:"#1E40AF",children:e.jsx(Se,{size:24})}),e.jsxs(q,{children:[e.jsx(_,{$color:"#1E40AF",children:"19"}),e.jsx(z,{children:"Questions"})]})]}),e.jsxs(I,{$gradient:"linear-gradient(135deg, #F8FAFC 0%, #FAF5FF 100%)",$borderColor:"#E9D5FF",children:[e.jsx(R,{$bg:"#F3E8FF",$color:"#6B21A8",children:e.jsx(we,{size:24})}),e.jsxs(q,{children:[e.jsx(_,{$color:"#6B21A8",children:"6"}),e.jsx(z,{children:"Sections"})]})]}),e.jsxs(I,{$gradient:"linear-gradient(135deg, #F8FAFC 0%, #FEF3C7 100%)",$borderColor:"#FDE68A",children:[e.jsx(R,{$bg:"#FEF3C7",$color:"#B45309",children:e.jsx(Ce,{size:24})}),e.jsxs(q,{children:[e.jsx(_,{$color:"#B45309",children:"10–12"}),e.jsx(z,{children:"Minutes"})]})]}),e.jsxs(I,{$gradient:"linear-gradient(135deg, #F8FAFC 0%, #ECFDF5 100%)",$borderColor:"#A7F3D0",children:[e.jsx(R,{$bg:"#D1FAE5",$color:"#047857",children:e.jsx(ke,{size:24})}),e.jsxs(q,{children:[e.jsx(_,{$color:"#047857",children:"100%"}),e.jsx(z,{children:"Confidential"})]})]})]}),e.jsxs("div",{children:[e.jsxs(Q,{children:[e.jsx(G,{$color:"#2563EB",children:e.jsx(w,{size:18})}),e.jsx(H,{children:"Before You Fill This Form"})]}),e.jsxs(He,{style:{marginTop:16},children:[e.jsxs(M,{children:[e.jsxs(W,{children:[e.jsx(U,{$bg:"#DBEAFE",$color:"#1E40AF",children:e.jsx($e,{size:20})}),e.jsx(Y,{children:"1. Find a quiet spot."})]}),e.jsx(V,{children:"Sit somewhere with no distractions — no noise, no interruptions. These questions need your honest, unhurried attention. Treat this time as an investment in your own career clarity — not a task which you just need to finish of in any manner."})]}),e.jsxs(M,{children:[e.jsxs(W,{children:[e.jsx(U,{$bg:"#D1FAE5",$color:"#047857",children:e.jsx(Te,{size:20})}),e.jsx(Y,{children:"2. Set aside 10–12 minutes."})]}),e.jsx(V,{children:"This is not something to rush through between classes. Choose a time when you are relaxed and can reflect properly. Quality of reflection matters more than speed."})]}),e.jsxs(M,{children:[e.jsxs(W,{children:[e.jsx(U,{$bg:"#F3E8FF",$color:"#6B21A8",children:e.jsx(Fe,{size:20})}),e.jsx(Y,{children:"3. Keep your phone away."})]}),e.jsx(V,{children:"Avoid the urge to check messages while filling the form. It breaks the flow of honest self-reflection — give it your full focus."})]})]})]}),e.jsxs("div",{children:[e.jsxs(Q,{children:[e.jsx(G,{$color:"#5D2384",children:e.jsx(Ee,{size:18})}),e.jsx(H,{children:"What This Form Is About"})]}),e.jsx(Me,{style:{marginTop:16},children:e.jsxs(We,{children:[e.jsxs(L,{children:[e.jsx(w,{size:20}),e.jsx("span",{children:"This is not a quiz and it is not being graded. There are no right answers and no wrong answers."})]}),e.jsxs(L,{children:[e.jsx(w,{size:20}),e.jsx("span",{children:"This is not a psychometric test nor an aptitude exam. There are no right answers and no wrong answers — and nothing here will be graded."})]}),e.jsxs(L,{children:[e.jsx(w,{size:20}),e.jsx("span",{children:"This form helps your counsellor get to know you before your session. The more honestly you fill it, the more personalised and useful your counselling session will be."})]}),e.jsxs(L,{children:[e.jsx(w,{size:20}),e.jsx("span",{children:"Think of it as a conversation starter — not an assessment. You are not being judged. Your responses are completely confidential and will only be seen by your counsellor."})]})]})})]}),e.jsxs("div",{children:[e.jsxs(Q,{children:[e.jsx(G,{$color:"#D97706",children:e.jsx(j,{size:18})}),e.jsx(H,{children:"The Golden Rules — Read These Carefully"})]}),e.jsxs(Ue,{style:{marginTop:16},children:[e.jsxs(k,{children:[e.jsx($,{children:e.jsx(j,{size:20})}),e.jsxs(T,{children:[e.jsx(F,{children:"Be honest. Be yourself."}),e.jsx(E,{children:"Answer based on how you actually are — not how you want to appear, not what sounds impressive, not what you think a counsellor wants to hear. The more genuine your responses, the more your session will feel tailored to you."})]})]}),e.jsxs(k,{children:[e.jsx($,{children:e.jsx(j,{size:20})}),e.jsxs(T,{children:[e.jsx(F,{children:"Take your time — go with your first instinct."}),e.jsx(E,{children:"For open-ended questions, write what naturally comes to mind. For multiple-choice questions, go with your first instinct. Your gut reaction is usually the truest one. If you sit on a question too long, you start second-guessing yourself."})]})]}),e.jsxs(k,{children:[e.jsx($,{children:e.jsx(j,{size:20})}),e.jsxs(T,{children:[e.jsx(F,{children:"Do not skip questions."}),e.jsx(E,{children:"Every question gives your counsellor something useful. If something feels too personal, just write as much as you are comfortable with — but try not to leave anything blank."})]})]}),e.jsxs(k,{children:[e.jsx($,{children:e.jsx(j,{size:20})}),e.jsxs(T,{children:[e.jsx(F,{children:"Your responses are private."}),e.jsx(E,{children:"Only you and your career counsellor will see your answers. This is a safe space — there is no audience, no judgment, no grades. Be real."})]})]}),e.jsxs(k,{style:{gridColumn:"span 2"},children:[e.jsx($,{children:e.jsx(j,{size:20})}),e.jsxs(T,{children:[e.jsx(F,{children:"It is okay to say 'I don't know'."}),e.jsx(E,{children:"If you are unsure about your career direction — that is perfectly normal at your age. Write 'Still Exploring' wherever asked. Your uncertainty is valuable information too."})]})]})]})]}),e.jsxs(Ye,{children:[e.jsx(Ve,{children:"You are ready. Take a deep breath."}),e.jsx(Je,{children:"There is nothing to prepare for. Just be yourself — and let your counsellor do the rest."})]}),e.jsxs(Ke,{children:[e.jsx(C,{variant:"primary",size:"lg",rightIcon:e.jsx(Ae,{size:20}),onClick:()=>{ue(!0),P()},style:{minWidth:"320px"},children:"Start Pre-Counselling Form"}),e.jsx(Xe,{children:"Estimated time: 10–12 minutes • Answers saved automatically as you navigate"})]})]})]})};export{gr as PreCounsellingFormPage};
