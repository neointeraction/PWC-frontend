import{g as t,u as Y,e as G,r as V,j as e,i as L,c as d,R as n,bh as c,d as m,b7 as P,an as R,H as A,B as M,h as q}from"./index-a7zXg0JL.js";import{u as J,a as K,o as Q,s as i}from"./types-EVWly3UQ.js";import{I as s}from"./Input-CcYvfC84.js";import{T as X}from"./Tooltip-D_2DC_R7.js";import{S as Z}from"./SuccessModal-DJckJoM1.js";import"./SuccessModal.styles-CmlOLHfD.js";import"./Modal-HiRbBry-.js";const ee=t.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`,oe=t.div`
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
`,te=t.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 22px 24px;
  border-bottom: 1px solid ${({theme:o})=>o.colors.border};
  background: linear-gradient(180deg, ${({theme:o})=>o.colors.surface} 0%, #fafaff 100%);
`,re=t.button`
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
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
`;t.div`
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
`;const ae=t.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
  letter-spacing: -0.3px;

  @media (max-width: 640px) {
    font-size: 20px;
  }
`;t.h2`
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
`;const ie=t.div`
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
`,D=t.p`
  font-weight: 700;
  font-size: 15px;
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
`,p=t.p`
  margin: 0;
  color: ${({theme:o})=>o.colors.text};
`;t.p`
  margin: 0;
  font-weight: 700;
  color: ${({theme:o})=>o.colors.primary};
`;t.p`
  margin: 4px 0 0 0;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.text};
`;const x=t.div`
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
`,h=t.div`
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
`,f=t.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,l=t.div`
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
`;const se=t.div`
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
`,le=Q({studentFullName:i().optional(),studentMobile:i().optional(),studentWhatsapp:i().optional(),studentEmail:i().optional(),alternateMobile:i().optional(),alternateEmail:i().optional(),fatherFullName:i().optional(),fatherOccupation:i().optional(),fatherEmployer:i().optional(),fatherWhatsapp:i().optional(),fatherEmail:i().optional(),motherFullName:i().optional(),motherOccupation:i().optional(),motherEmployer:i().optional()}),fe=()=>{var j,y,E,S,$,w,k,z,F,I,v,N,T,O;const o=Y(),W=G(),{register:r,handleSubmit:B,formState:{errors:a,isSubmitting:C}}=J({resolver:K(le),defaultValues:{studentFullName:"",studentMobile:"",studentWhatsapp:"",studentEmail:"",alternateMobile:"",alternateEmail:"",fatherFullName:"",fatherOccupation:"",fatherEmployer:"",fatherWhatsapp:"",fatherEmail:"",motherFullName:"",motherOccupation:"",motherEmployer:""}}),[H,g]=V.useState(!1),U=async ne=>{await new Promise(_=>setTimeout(_,400)),localStorage.setItem("pwc_student_profile_completed","true"),g(!0)},b=()=>{g(!1),W.success("Profile Saved Successfully!","Your profile details have been saved. You can now proceed to the Pre-Counselling Form."),o(d.STUDENT_PORTAL)};return e.jsxs(ee,{children:[e.jsx("form",{onSubmit:B(U),noValidate:!0,children:e.jsxs(oe,{children:[e.jsxs(te,{children:[e.jsx(X,{content:"Back to Student Portal",position:"right",children:e.jsx(re,{type:"button",onClick:()=>o(d.STUDENT_PORTAL),"aria-label":"Back to Student Portal",children:e.jsx(L,{size:18})})}),e.jsx(ae,{children:"Champion's Profile"})]}),e.jsxs(ie,{children:[e.jsx(D,{children:"Hello Champion,"}),e.jsx(p,{children:"Before you get started, a quick note on why this page matters."}),e.jsx(p,{children:"Everything from here on reminders, links, forms and updates, will be sent to you only through WhatsApp and Email, based on the details you enter below."}),e.jsx(D,{children:"We won't be calling you at any point in the programme."}),e.jsx(p,{children:"So please take a moment to enter accurate details. It's the only way we'll be able to reach you at the right time, with the right information."}),e.jsx(p,{style:{fontWeight:600},children:"Let's get started!"})]}),e.jsxs(x,{children:[e.jsxs(h,{children:[e.jsx(u,{children:e.jsx(n,{size:18})}),e.jsx("span",{children:"FEW DETAILS ABOUT YOU"})]}),e.jsxs(f,{children:[e.jsxs(l,{children:[e.jsx(s,{label:"Full Name",placeholder:"e.g. Aarav Sharma",leftIcon:e.jsx(n,{size:18}),error:(j=a.studentFullName)==null?void 0:j.message,...r("studentFullName")}),e.jsx(s,{label:"Mobile Number",type:"tel",placeholder:"10-digit mobile number",leftIcon:e.jsx(c,{size:18}),error:(y=a.studentMobile)==null?void 0:y.message,...r("studentMobile")})]}),e.jsxs(l,{children:[e.jsx(s,{label:"WhatsApp Number",type:"tel",placeholder:"WhatsApp mobile number",leftIcon:e.jsx(c,{size:18}),error:(E=a.studentWhatsapp)==null?void 0:E.message,...r("studentWhatsapp")}),e.jsx(s,{label:"Email ID",type:"email",placeholder:"For session links & updates",leftIcon:e.jsx(m,{size:18}),error:(S=a.studentEmail)==null?void 0:S.message,...r("studentEmail")})]}),e.jsxs(l,{children:[e.jsx(s,{label:"Alternate Mobile Number (Optional)",type:"tel",placeholder:"Backup contact number",leftIcon:e.jsx(c,{size:18}),error:($=a.alternateMobile)==null?void 0:$.message,...r("alternateMobile")}),e.jsx(s,{label:"Alternate Email ID (Optional)",type:"email",placeholder:"Backup email address",leftIcon:e.jsx(m,{size:18}),error:(w=a.alternateEmail)==null?void 0:w.message,...r("alternateEmail")})]})]})]}),e.jsxs(x,{children:[e.jsxs(h,{children:[e.jsx(u,{children:e.jsx(P,{size:18})}),e.jsx("span",{children:"FATHER'S DETAILS"})]}),e.jsxs(f,{children:[e.jsxs(l,{children:[e.jsx(s,{label:"Full Name",placeholder:"Name in full",leftIcon:e.jsx(n,{size:18}),error:(k=a.fatherFullName)==null?void 0:k.message,...r("fatherFullName")}),e.jsx(s,{label:"Occupation / Designation",placeholder:"Current occupation or job title",leftIcon:e.jsx(R,{size:18}),error:(z=a.fatherOccupation)==null?void 0:z.message,...r("fatherOccupation")})]}),e.jsxs(l,{children:[e.jsx(s,{label:"Organisation / Employer",placeholder:"Name of the company or organisation",leftIcon:e.jsx(A,{size:18}),error:(F=a.fatherEmployer)==null?void 0:F.message,...r("fatherEmployer")}),e.jsx(s,{label:"WhatsApp Mobile Number",type:"tel",placeholder:"For communication to be sent for Pre-counselling form & Feedback form",leftIcon:e.jsx(c,{size:18}),error:(I=a.fatherWhatsapp)==null?void 0:I.message,...r("fatherWhatsapp")})]}),e.jsx(l,{children:e.jsx(s,{label:"Email ID",type:"email",placeholder:"For sending Pre-counselling form & Feedback form",leftIcon:e.jsx(m,{size:18}),error:(v=a.fatherEmail)==null?void 0:v.message,...r("fatherEmail")})})]})]}),e.jsxs(x,{children:[e.jsxs(h,{children:[e.jsx(u,{children:e.jsx(P,{size:18})}),e.jsx("span",{children:"MOTHER'S DETAILS"})]}),e.jsxs(f,{children:[e.jsxs(l,{children:[e.jsx(s,{label:"Full Name",placeholder:"Name in full",leftIcon:e.jsx(n,{size:18}),error:(N=a.motherFullName)==null?void 0:N.message,...r("motherFullName")}),e.jsx(s,{label:"Occupation / Designation",placeholder:"Current occupation or job title",leftIcon:e.jsx(R,{size:18}),error:(T=a.motherOccupation)==null?void 0:T.message,...r("motherOccupation")})]}),e.jsx(l,{children:e.jsx(s,{label:"Organisation / Employer (if applicable)",placeholder:"Name of the company or organisation",leftIcon:e.jsx(A,{size:18}),error:(O=a.motherEmployer)==null?void 0:O.message,...r("motherEmployer")})})]})]}),e.jsxs(se,{children:[e.jsx(M,{type:"button",variant:"secondary",size:"md",leftIcon:e.jsx(L,{size:18}),onClick:()=>o(d.STUDENT_PORTAL),children:"Cancel & Return"}),e.jsx(M,{type:"submit",variant:"primary",size:"md",leftIcon:e.jsx(q,{size:18}),isLoading:C,children:"Save & Submit Profile"})]})]})}),e.jsx(Z,{isOpen:H,onClose:b,title:"Profile Submitted Successfully",message:"Thank you for taking the time to fill this form carefully. Let’s move on to the next step.",confirmText:"Proceed to Dashboard",onConfirm:b,size:"md"})]})};export{fe as StudentProfileFormPage};
