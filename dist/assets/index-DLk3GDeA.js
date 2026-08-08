import{g as o,u as M,d as k,j as e,aB as B,c,R as n,b9 as p,b8 as z,a$ as T,ao as v,J as $,B as w,f as C}from"./index-CormbGNw.js";import{u as U,a as H,o as W,s}from"./types-EU2TuyfP.js";import{I as a}from"./Input-DN3oI2gg.js";const _=o.div`
  display: flex;
  flex-direction: column;
  /* max-width: 960px; */
  margin: 0 auto;
  width: 100%;
`,Y=o.div`
  background-color: ${({theme:r})=>r.colors.surface};
  border: 1px solid ${({theme:r})=>r.colors.border};
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
`,V=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding: 28px 28px 24px 28px;
  border-bottom: 1px solid ${({theme:r})=>r.colors.border};
  background: linear-gradient(180deg, ${({theme:r})=>r.colors.surface} 0%, #FAFAFF 100%);
`,J=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
`,q=o.button`
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
`;o.div`
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
`;const G=o.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({theme:r})=>r.colors.text};
  margin: 0;
  letter-spacing: -0.3px;

  @media (max-width: 640px) {
    font-size: 20px;
  }
`,K=o.h2`
  font-size: 15px;
  font-weight: 600;
  color: ${({theme:r})=>r.colors.primary};
  margin: 0;
`,Q=o.p`
  font-size: 13px;
  color: ${({theme:r})=>r.colors.textSecondary};
  margin: 0;
`,d=o.div`
  display: flex;
  flex-direction: column;
  padding: 24px 28px;
  border-bottom: 1px solid ${({theme:r})=>r.colors.border};

  &:last-of-type {
    border-bottom: none;
  }
`,m=o.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: ${({theme:r})=>r.colors.primary};
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 16px;
`,x=o.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme:r})=>r.colors.primary};
`,u=o.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,l=o.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: ${({theme:r})=>r.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,X=o.div`
  background-color: ${({theme:r})=>r.colors.background};
  border-top: 1px solid ${({theme:r})=>r.colors.border};
  padding: 20px 28px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: ${({theme:r})=>r.breakpoints.sm}) {
    flex-direction: column-reverse;
    align-items: stretch;
  }
`,Z=W({studentFullName:s().optional(),studentMobile:s().optional(),studentWhatsapp:s().optional(),studentEmail:s().optional(),primaryMobile:s().optional(),primaryEmail:s().optional(),fatherFullName:s().optional(),fatherOccupation:s().optional(),fatherEmployer:s().optional(),motherFullName:s().optional(),motherOccupation:s().optional(),motherEmployer:s().optional()}),ie=()=>{var h,f,g,b,j,y,E,F,S,N,I,R;const r=M(),O=k(),{register:t,handleSubmit:L,formState:{errors:i,isSubmitting:P}}=U({resolver:H(Z),defaultValues:{studentFullName:"",studentMobile:"",studentWhatsapp:"",studentEmail:"",primaryMobile:"",primaryEmail:"",fatherFullName:"",fatherOccupation:"",fatherEmployer:"",motherFullName:"",motherOccupation:"",motherEmployer:""}}),D=async ee=>{await new Promise(A=>setTimeout(A,600)),localStorage.setItem("pwc_student_profile_completed","true"),O.success("Student Profile Form Submitted Successfully!","Your profile details have been saved. You can now proceed to the Pre-Counselling Form."),r(c.STUDENT_PORTAL)};return e.jsx(_,{children:e.jsx("form",{onSubmit:L(D),noValidate:!0,children:e.jsxs(Y,{children:[e.jsxs(V,{children:[e.jsx(J,{children:e.jsx(q,{type:"button",onClick:()=>r(c.STUDENT_PORTAL),"aria-label":"Back to Student Portal",children:e.jsx(B,{size:18})})}),e.jsx(G,{children:"STUDENT PROFILE FORM"}),e.jsx(K,{children:"Career Counselling Programme — Class 9 & 10"}),e.jsx(Q,{children:"Provide student and parent contact information to help senior counsellors customize your career guidance session."})]}),e.jsxs(d,{children:[e.jsxs(m,{children:[e.jsx(x,{children:e.jsx(n,{size:18})}),e.jsx("span",{children:"STUDENT INFORMATION"})]}),e.jsxs(u,{children:[e.jsxs(l,{children:[e.jsx(a,{label:"Full Name",placeholder:"Enter student full name",leftIcon:e.jsx(n,{size:18}),error:(h=i.studentFullName)==null?void 0:h.message,...t("studentFullName")}),e.jsx(a,{label:"Mobile Number",placeholder:"Enter mobile number",leftIcon:e.jsx(p,{size:18}),error:(f=i.studentMobile)==null?void 0:f.message,...t("studentMobile")})]}),e.jsxs(l,{children:[e.jsx(a,{label:"WhatsApp Number (if different)",placeholder:"Enter WhatsApp number",leftIcon:e.jsx(p,{size:18}),error:(g=i.studentWhatsapp)==null?void 0:g.message,...t("studentWhatsapp")}),e.jsx(a,{label:"Email ID",type:"email",placeholder:"Enter email ID",leftIcon:e.jsx(z,{size:18}),error:(b=i.studentEmail)==null?void 0:b.message,...t("studentEmail")})]}),e.jsxs(l,{children:[e.jsx(a,{label:"PRIMARY Mobile Number (WhatsApp Number)",placeholder:"Enter primary mobile number",leftIcon:e.jsx(p,{size:18}),error:(j=i.primaryMobile)==null?void 0:j.message,...t("primaryMobile")}),e.jsx(a,{label:"PRIMARY Email ID",type:"email",placeholder:"Enter primary email ID",leftIcon:e.jsx(z,{size:18}),error:(y=i.primaryEmail)==null?void 0:y.message,...t("primaryEmail")})]})]})]}),e.jsxs(d,{children:[e.jsxs(m,{children:[e.jsx(x,{children:e.jsx(T,{size:18})}),e.jsx("span",{children:"FATHER'S DETAILS"})]}),e.jsxs(u,{children:[e.jsxs(l,{children:[e.jsx(a,{label:"Full Name",placeholder:"Enter father's full name",leftIcon:e.jsx(n,{size:18}),error:(E=i.fatherFullName)==null?void 0:E.message,...t("fatherFullName")}),e.jsx(a,{label:"Occupation / Designation",placeholder:"Enter occupation or designation",leftIcon:e.jsx(v,{size:18}),error:(F=i.fatherOccupation)==null?void 0:F.message,...t("fatherOccupation")})]}),e.jsx(l,{children:e.jsx(a,{label:"Organisation / Employer (if applicable)",placeholder:"Enter organisation or employer name",leftIcon:e.jsx($,{size:18}),error:(S=i.fatherEmployer)==null?void 0:S.message,...t("fatherEmployer")})})]})]}),e.jsxs(d,{children:[e.jsxs(m,{children:[e.jsx(x,{children:e.jsx(T,{size:18})}),e.jsx("span",{children:"MOTHER'S DETAILS"})]}),e.jsxs(u,{children:[e.jsxs(l,{children:[e.jsx(a,{label:"Full Name",placeholder:"Enter mother's full name",leftIcon:e.jsx(n,{size:18}),error:(N=i.motherFullName)==null?void 0:N.message,...t("motherFullName")}),e.jsx(a,{label:"Occupation / Designation",placeholder:"Enter occupation or designation",leftIcon:e.jsx(v,{size:18}),error:(I=i.motherOccupation)==null?void 0:I.message,...t("motherOccupation")})]}),e.jsx(l,{children:e.jsx(a,{label:"Organisation / Employer (if applicable)",placeholder:"Enter organisation or employer name",leftIcon:e.jsx($,{size:18}),error:(R=i.motherEmployer)==null?void 0:R.message,...t("motherEmployer")})})]})]}),e.jsxs(X,{children:[e.jsx(w,{type:"button",variant:"secondary",size:"md",onClick:()=>r(c.STUDENT_PORTAL),children:"Cancel & Return"}),e.jsx(w,{type:"submit",variant:"primary",size:"md",leftIcon:e.jsx(C,{size:18}),isLoading:P,children:"Save & Submit Profile"})]})]})})})};export{ie as StudentProfileFormPage};
