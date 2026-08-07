import{g as i,u as C,a as w,r as v,j as s,K as R,J as A,B as a,c as l,V as $,al as k,aY as I,aC as B,be as L,R as E,bf as T}from"./index-DnMR83cZ.js";import{C as c}from"./Card-DnSjf-TA.js";import{B as d}from"./Badge-0GO_cFVK.js";import{P as W}from"./PreCounsellingAnswersModal-ByEWpdVn.js";import"./Badge.styles-B1OxzMmq.js";import"./Modal-BSgaqv1a.js";const P=i.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,D=i.div`
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
`,M=i.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.xs};
`,F=i.h1`
  font-size: ${({theme:e})=>e.fontSize.xxxl};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  margin: 0;
  color: #ffffff;
`,Y=i.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  flex-wrap: wrap;
`,G=i.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 10px;
  border-radius: 4px;
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  backdrop-filter: blur(4px);
`,J=i.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.xl}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`,x=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({theme:e})=>e.spacing.md};
`,g=i.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,p=i.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: ${({$bg:e,theme:n})=>e||n.colors.primaryLight};
  color: ${({$color:e,theme:n})=>e||n.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,h=i.h3`
  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,m=i.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0 0 ${({theme:e})=>e.spacing.md} 0;
  line-height: 1.5;
`,y=i.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.sm};
  margin-bottom: ${({theme:e})=>e.spacing.lg};
`,r=i.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({theme:e})=>e.fontSize.sm};
  padding: ${({theme:e})=>e.spacing.xs} 0;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};

  &:last-child {
    border-bottom: none;
  }
`,o=i.span`
  color: ${({theme:e})=>e.colors.textSecondary};
`,t=i.span`
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
`,N=i.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.sm};
`,f=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:e})=>e.spacing.sm} ${({theme:e})=>e.spacing.md};
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
`,j=i.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
`,u=i.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.success};
  background-color: rgba(22, 163, 74, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
`,K=()=>{const e=C(),n=w(z=>z.user),[S,b]=v.useState(!1);return s.jsxs(P,{children:[s.jsxs(D,{children:[s.jsxs(M,{children:[s.jsxs(F,{children:["Welcome back, ",(n==null?void 0:n.name)||"Alex Johnson","!"]}),s.jsxs(Y,{children:[s.jsx(R,{size:16})," Grade 11 - Science",s.jsxs(G,{children:[s.jsx(A,{size:12,style:{display:"inline",marginRight:4}}),"St. Xavier's Senior Secondary School"]})]})]}),s.jsx(a,{variant:"secondary",size:"md",leftIcon:s.jsx($,{size:18}),onClick:()=>e(l.CAREER_LIBRARY),style:{background:"rgba(255, 255, 255, 0.95)",color:"#5D2384",border:"none"},children:"Explore Careers"})]}),s.jsxs(J,{children:[s.jsxs(c,{children:[s.jsxs(x,{children:[s.jsxs(g,{children:[s.jsx(p,{$color:"#0284C7",$bg:"rgba(2, 132, 199, 0.1)",children:s.jsx(k,{size:20})}),s.jsx(h,{children:"Pre-Counselling Assessment"})]}),s.jsxs(d,{variant:"success",size:"sm",children:[s.jsx(I,{size:12,style:{marginRight:4}})," Submitted"]})]}),s.jsx(m,{children:"Your pre-counselling assessment questionnaire has been analyzed and paired with your student profile."}),s.jsxs(y,{children:[s.jsxs(r,{children:[s.jsx(o,{children:"Status"}),s.jsx(t,{children:"Completed & Reviewed"})]}),s.jsxs(r,{children:[s.jsx(o,{children:"Submitted Date"}),s.jsx(t,{children:"Aug 01, 2026"})]}),s.jsxs(r,{children:[s.jsx(o,{children:"Primary Interest"}),s.jsx(t,{children:"Computer Science & AI"})]})]}),s.jsx(a,{variant:"secondary",fullWidth:!0,size:"md",rightIcon:s.jsx(B,{size:16}),onClick:()=>b(!0),children:"View Submitted Answers"})]}),s.jsxs(c,{children:[s.jsxs(x,{children:[s.jsxs(g,{children:[s.jsx(p,{$color:"#7C3AED",$bg:"rgba(124, 58, 237, 0.1)",children:s.jsx(L,{size:20})}),s.jsx(h,{children:"Upcoming 1-on-1 Session"})]}),s.jsx(d,{variant:"primary",size:"sm",children:"Scheduled"})]}),s.jsx(m,{children:"Your next 1-on-1 career counselling session with your assigned senior career advisor."}),s.jsxs(y,{children:[s.jsxs(r,{children:[s.jsx(o,{children:"Counselor"}),s.jsx(t,{children:"Sarah Jenkins (M.Sc Psych)"})]}),s.jsxs(r,{children:[s.jsx(o,{children:"Date & Time"}),s.jsx(t,{children:"Aug 12, 2026 @ 10:00 AM"})]}),s.jsxs(r,{children:[s.jsx(o,{children:"Session Focus"}),s.jsx(t,{children:"Engineering Stream & Univ Fit"})]})]}),s.jsx(a,{variant:"primary",fullWidth:!0,size:"md",leftIcon:s.jsx(E,{size:16}),onClick:()=>e(l.SETTINGS),children:"Manage Appointment"})]}),s.jsxs(c,{children:[s.jsxs(x,{children:[s.jsxs(g,{children:[s.jsx(p,{$color:"#059669",$bg:"rgba(5, 150, 105, 0.1)",children:s.jsx($,{size:20})}),s.jsx(h,{children:"Ikigai Career Profile"})]}),s.jsx(d,{variant:"info",size:"sm",children:"94% Match"})]}),s.jsx(m,{children:"Your Ikigai matrix aligns strongly with STEM and Innovation fields based on your trait assessments."}),s.jsxs(N,{children:[s.jsxs(f,{children:[s.jsx(j,{children:"Artificial Intelligence Specialist"}),s.jsx(u,{children:"96% Fit"})]}),s.jsxs(f,{children:[s.jsx(j,{children:"Software Systems Architect"}),s.jsx(u,{children:"93% Fit"})]}),s.jsxs(f,{children:[s.jsx(j,{children:"Data Science & Analytics"}),s.jsx(u,{children:"90% Fit"})]})]}),s.jsx("div",{style:{marginTop:"16px"},children:s.jsx(a,{variant:"secondary",fullWidth:!0,size:"md",leftIcon:s.jsx(T,{size:16}),onClick:()=>e(l.CAREER_LIBRARY),children:"Browse Career Details"})})]})]}),s.jsx(W,{isOpen:S,onClose:()=>b(!1),studentId:(n==null?void 0:n.id)||"user-student-alex",studentName:(n==null?void 0:n.name)||"Alex Johnson"})]})};export{K as StudentPortalPage};
