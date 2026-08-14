import{g as t,u as U,e as _,r as G,j as e,aO as O,c as p,R as n,aT as c,d,D as P,aB as L,a0 as R,B as D,h as Y}from"./index-B6MU9CPz.js";import{u as V,a as J,o as q,s as i}from"./types-C428mvW1.js";import{I as l}from"./Input-CwfTR_Bp.js";import{T as K}from"./Tooltip-BaOOZ4TY.js";import{S as Q}from"./SuccessModal-BMtPNeVw.js";import"./SuccessModal.styles-Yz8Lvnau.js";import"./Modal-BLiP14UD.js";const X=t.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`,Z=t.div`
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
`,ee=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding: 28px 28px 24px 28px;
  border-bottom: 1px solid ${({theme:o})=>o.colors.border};
  background: linear-gradient(180deg, ${({theme:o})=>o.colors.surface} 0%, #fafaff 100%);
`,oe=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
`,te=t.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 4px;
  border: 1px solid ${({theme:o})=>o.colors.border};
  background-color: ${({theme:o})=>o.colors.surface};
  color: ${({theme:o})=>o.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:o})=>o.colors.primary};
    color: ${({theme:o})=>o.colors.primary};
    background-color: ${({theme:o})=>o.colors.primaryLight};
  }
`,re=t.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: ${({theme:o})=>o.colors.primaryLight};
  color: ${({theme:o})=>o.colors.primary};
  padding: 4px 14px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`,ae=t.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
  letter-spacing: -0.3px;

  @media (max-width: 640px) {
    font-size: 20px;
  }
`,ie=t.h2`
  font-size: 15px;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.primary};
  margin: 0;
`;t.p`
  font-size: 13px;
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
  max-width: 720px;
  line-height: 1.5;
`;const le=t.div`
  background-color: ${({theme:o})=>o.colors.background};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: 4px;
  padding: 18px 24px;
  margin: 24px 28px 8px 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  line-height: 1.6;
  color: ${({theme:o})=>o.colors.text};

  @media (max-width: ${({theme:o})=>o.breakpoints.sm}) {
    margin: 16px 16px 4px 16px;
    padding: 14px 16px;
  }
`,se=t.p`
  font-weight: 700;
  font-size: 15px;
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
`,ne=t.p`
  margin: 0;
  color: ${({theme:o})=>o.colors.text};
`,ce=t.p`
  margin: 0;
  font-weight: 700;
  color: ${({theme:o})=>o.colors.primary};
`,pe=t.p`
  margin: 4px 0 0 0;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.text};
`,m=t.div`
  display: flex;
  flex-direction: column;
  padding: 24px 28px;
  border-bottom: 1px solid ${({theme:o})=>o.colors.border};

  &:last-of-type {
    border-bottom: none;
  }

  @media (max-width: ${({theme:o})=>o.breakpoints.sm}) {
    padding: 20px 16px;
  }
`,x=t.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: ${({theme:o})=>o.colors.primary};
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 16px;
`,u=t.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme:o})=>o.colors.primary};
`,h=t.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,s=t.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: ${({theme:o})=>o.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;t.div`
  margin: 32px 28px 24px 28px;
  padding: 20px 24px;
  background-color: ${({theme:o})=>o.colors.primaryLight};
  border: 1px dashed ${({theme:o})=>o.colors.primary};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-align: center;

  @media (max-width: ${({theme:o})=>o.breakpoints.sm}) {
    margin: 24px 16px 16px 16px;
    padding: 16px;
  }
`;t.p`
  font-style: italic;
  font-size: 14.5px;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.primary};
  margin: 0;
  line-height: 1.5;
`;const de=t.div`
  background-color: ${({theme:o})=>o.colors.background};
  border-top: 1px solid ${({theme:o})=>o.colors.border};
  padding: 20px 28px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: ${({theme:o})=>o.breakpoints.sm}) {
    flex-direction: column-reverse;
    align-items: stretch;
    padding: 16px;
  }
`,me=q({studentFullName:i().optional(),studentMobile:i().optional(),studentWhatsapp:i().optional(),studentEmail:i().optional(),alternateMobile:i().optional(),alternateEmail:i().optional(),fatherFullName:i().optional(),fatherOccupation:i().optional(),fatherEmployer:i().optional(),fatherWhatsapp:i().optional(),fatherEmail:i().optional(),motherFullName:i().optional(),motherOccupation:i().optional(),motherEmployer:i().optional()}),Se=()=>{var b,j,y,S,E,$,z,w,k,F,I,T,N,v;const o=U(),A=_(),{register:r,handleSubmit:M,formState:{errors:a,isSubmitting:B}}=V({resolver:J(me),defaultValues:{studentFullName:"",studentMobile:"",studentWhatsapp:"",studentEmail:"",alternateMobile:"",alternateEmail:"",fatherFullName:"",fatherOccupation:"",fatherEmployer:"",fatherWhatsapp:"",fatherEmail:"",motherFullName:"",motherOccupation:"",motherEmployer:""}}),[C,f]=G.useState(!1),W=async xe=>{await new Promise(H=>setTimeout(H,400)),localStorage.setItem("pwc_student_profile_completed","true"),f(!0)},g=()=>{f(!1),A.success("Profile Saved Successfully!","Your profile details have been saved. You can now proceed to the Pre-Counselling Form."),o(p.STUDENT_PORTAL)};return e.jsxs(X,{children:[e.jsx("form",{onSubmit:M(W),noValidate:!0,children:e.jsxs(Z,{children:[e.jsxs(ee,{children:[e.jsxs(oe,{children:[e.jsx(K,{content:"Back to Student Portal",position:"right",children:e.jsx(te,{type:"button",onClick:()=>o(p.STUDENT_PORTAL),"aria-label":"Back to Student Portal",children:e.jsx(O,{size:18})})}),e.jsx(re,{children:"Student Onboarding · Class 9 & 10"})]}),e.jsx(ae,{children:"Student Profile Form"}),e.jsx(ie,{children:"Please complete all section details accurately. Information collected here will be used for your personalized counseling sessions."})]}),e.jsxs(le,{children:[e.jsx(se,{children:"Dear Student,"}),e.jsx(ne,{children:"Welcome to the Phoenix Water Club Career Counselling program! To help us serve you better, please fill in your details carefully."}),e.jsx(ce,{children:e.jsx(pe,{children:"It will take only 5–7 minutes to complete this profile form."})})]}),e.jsxs(m,{children:[e.jsxs(x,{children:[e.jsx(u,{children:e.jsx(n,{size:18})}),e.jsx("span",{children:"FEW DETAILS ABOUT YOU"})]}),e.jsxs(h,{children:[e.jsxs(s,{children:[e.jsx(l,{label:"Full Name of the Student",placeholder:"e.g. Alex Johnson",leftIcon:e.jsx(n,{size:18}),error:(b=a.studentFullName)==null?void 0:b.message,...r("studentFullName")}),e.jsx(l,{label:"Student Mobile Number",type:"tel",placeholder:"10-digit mobile number",leftIcon:e.jsx(c,{size:18}),error:(j=a.studentMobile)==null?void 0:j.message,...r("studentMobile")})]}),e.jsxs(s,{children:[e.jsx(l,{label:"Student WhatsApp Number",type:"tel",placeholder:"WhatsApp mobile number",leftIcon:e.jsx(c,{size:18}),error:(y=a.studentWhatsapp)==null?void 0:y.message,...r("studentWhatsapp")}),e.jsx(l,{label:"Student Email ID",type:"email",placeholder:"For session links & updates",leftIcon:e.jsx(d,{size:18}),error:(S=a.studentEmail)==null?void 0:S.message,...r("studentEmail")})]}),e.jsxs(s,{children:[e.jsx(l,{label:"Alternate Mobile Number (Optional)",type:"tel",placeholder:"Backup contact number",leftIcon:e.jsx(c,{size:18}),error:(E=a.alternateMobile)==null?void 0:E.message,...r("alternateMobile")}),e.jsx(l,{label:"Alternate Email ID (Optional)",type:"email",placeholder:"Backup email address",leftIcon:e.jsx(d,{size:18}),error:($=a.alternateEmail)==null?void 0:$.message,...r("alternateEmail")})]})]})]}),e.jsxs(m,{children:[e.jsxs(x,{children:[e.jsx(u,{children:e.jsx(P,{size:18})}),e.jsx("span",{children:"FATHER'S DETAILS"})]}),e.jsxs(h,{children:[e.jsxs(s,{children:[e.jsx(l,{label:"Full Name",placeholder:"Name in full",leftIcon:e.jsx(n,{size:18}),error:(z=a.fatherFullName)==null?void 0:z.message,...r("fatherFullName")}),e.jsx(l,{label:"Occupation / Designation",placeholder:"Current occupation or job title",leftIcon:e.jsx(L,{size:18}),error:(w=a.fatherOccupation)==null?void 0:w.message,...r("fatherOccupation")})]}),e.jsxs(s,{children:[e.jsx(l,{label:"Organisation / Employer",placeholder:"Name of the company or organisation",leftIcon:e.jsx(R,{size:18}),error:(k=a.fatherEmployer)==null?void 0:k.message,...r("fatherEmployer")}),e.jsx(l,{label:"WhatsApp Mobile Number",type:"tel",placeholder:"For communication to be sent for Pre-counselling form & Feedback form",leftIcon:e.jsx(c,{size:18}),error:(F=a.fatherWhatsapp)==null?void 0:F.message,...r("fatherWhatsapp")})]}),e.jsx(s,{children:e.jsx(l,{label:"Email ID",type:"email",placeholder:"For sending Pre-counselling form & Feedback form",leftIcon:e.jsx(d,{size:18}),error:(I=a.fatherEmail)==null?void 0:I.message,...r("fatherEmail")})})]})]}),e.jsxs(m,{children:[e.jsxs(x,{children:[e.jsx(u,{children:e.jsx(P,{size:18})}),e.jsx("span",{children:"MOTHER'S DETAILS"})]}),e.jsxs(h,{children:[e.jsxs(s,{children:[e.jsx(l,{label:"Full Name",placeholder:"Name in full",leftIcon:e.jsx(n,{size:18}),error:(T=a.motherFullName)==null?void 0:T.message,...r("motherFullName")}),e.jsx(l,{label:"Occupation / Designation",placeholder:"Current occupation or job title",leftIcon:e.jsx(L,{size:18}),error:(N=a.motherOccupation)==null?void 0:N.message,...r("motherOccupation")})]}),e.jsx(s,{children:e.jsx(l,{label:"Organisation / Employer (if applicable)",placeholder:"Name of the company or organisation",leftIcon:e.jsx(R,{size:18}),error:(v=a.motherEmployer)==null?void 0:v.message,...r("motherEmployer")})})]})]}),e.jsxs(de,{children:[e.jsx(D,{type:"button",variant:"secondary",size:"md",leftIcon:e.jsx(O,{size:18}),onClick:()=>o(p.STUDENT_PORTAL),children:"Cancel & Return"}),e.jsx(D,{type:"submit",variant:"primary",size:"md",leftIcon:e.jsx(Y,{size:18}),isLoading:B,children:"Save & Submit Profile"})]})]})}),e.jsx(Q,{isOpen:C,onClose:g,title:"Profile Submitted Successfully",message:"Thank you for taking the time to fill this form carefully. Let’s move on to the next step.",confirmText:"Proceed to Dashboard",onConfirm:g,size:"md"})]})};export{Se as StudentProfileFormPage};
