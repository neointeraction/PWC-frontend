import{j as s,L as x,g as o}from"./index-DxfnM77Y.js";import{u as p}from"./useQuery-S0QpHJqA.js";import{M as f}from"./Modal-C42QGbOr.js";const j=[{id:"student-1",name:"Emily Davis",email:"emily.davis@example.com",school:"Lincoln High School",grade:"10th",assignedCounselorId:"user-counselor-john",formStatus:"submitted"},{id:"student-2",name:"Michael Brown",email:"michael.brown@example.com",school:"Washington High",grade:"12th",assignedCounselorId:"user-counselor-john",formStatus:"submitted"},{id:"student-3",name:"Jessica Wilson",email:"jessica.w@example.com",school:"Lincoln High School",grade:"11th",assignedCounselorId:"user-counselor-john",formStatus:"pending"}],S={"student-1":{id:"form-1",studentId:"student-1",careerInterests:["Computer Science","Data Analysis"],strengths:["Problem Solving","Mathematics"],preferredSubjects:["Math","Physics"],additionalNotes:"I am very interested in AI and machine learning.",submittedAt:"2026-08-01T10:00:00Z"},"student-2":{id:"form-2",studentId:"student-2",careerInterests:["Business Administration","Marketing"],strengths:["Communication","Leadership"],preferredSubjects:["Economics","English"],additionalNotes:"Looking forward to understanding more about management roles.",submittedAt:"2026-08-02T14:30:00Z"}},y={getStudentsByCounselor:async e=>{await new Promise(n=>setTimeout(n,500));const i=j.filter(n=>n.assignedCounselorId===e);return{data:i,total:i.length}},getPreCounsellingForm:async e=>(await new Promise(i=>setTimeout(i,500)),S[e]||null)},u=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
  padding: ${({theme:e})=>e.spacing.md} 0;
`,d=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.xs};
`,a=o.h3`
  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,c=o.p`
  font-size: ${({theme:e})=>e.fontSize.md};
  color: ${({theme:e})=>e.colors.textSecondary};
  line-height: 1.5;
`,m=o.ul`
  margin: 0;
  padding-left: ${({theme:e})=>e.spacing.lg};
  color: ${({theme:e})=>e.colors.textSecondary};
`,w=o.div`
  text-align: center;
  padding: ${({theme:e})=>e.spacing.xl};
  color: ${({theme:e})=>e.colors.textSecondary};
`,A=({isOpen:e,onClose:i,studentId:n,studentName:h})=>{const{data:t,isLoading:g}=p({queryKey:["pre-counselling-form",n],queryFn:()=>n?y.getPreCounsellingForm(n):null,enabled:!!n&&e});return s.jsx(f,{isOpen:e,onClose:i,title:`Pre-Counselling Answers: ${h}`,size:"md",children:g?s.jsx(u,{children:s.jsx(x,{})}):t?s.jsxs(u,{children:[s.jsxs(d,{children:[s.jsx(a,{children:"Career Interests"}),t.careerInterests.length>0?s.jsx(m,{children:t.careerInterests.map((r,l)=>s.jsx("li",{children:r},l))}):s.jsx(c,{children:"None specified"})]}),s.jsxs(d,{children:[s.jsx(a,{children:"Strengths"}),t.strengths.length>0?s.jsx(m,{children:t.strengths.map((r,l)=>s.jsx("li",{children:r},l))}):s.jsx(c,{children:"None specified"})]}),s.jsxs(d,{children:[s.jsx(a,{children:"Preferred Subjects"}),t.preferredSubjects.length>0?s.jsx(m,{children:t.preferredSubjects.map((r,l)=>s.jsx("li",{children:r},l))}):s.jsx(c,{children:"None specified"})]}),s.jsxs(d,{children:[s.jsx(a,{children:"Additional Notes"}),s.jsx(c,{children:t.additionalNotes||"None specified"})]})]}):s.jsx(w,{children:"No pre-counselling form answers found for this student."})})};export{A as P};
