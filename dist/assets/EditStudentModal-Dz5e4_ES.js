import{r as c,j as l,B as p,g as n}from"./index-BZPOwNvj.js";import{M as u}from"./Modal-C-DeKsTQ.js";import{I as i}from"./Input-DriY2aBZ.js";import{S as x}from"./Select-oH8LtK7F.js";const f=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,h=n.div`
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,b=n.h4`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: 700;
  color: ${({theme:e})=>e.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`,v=n.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,$=({isOpen:e,onClose:s,student:t,onSave:m,isSaving:d})=>{const[r,o]=c.useState(null);if(c.useEffect(()=>{if(t){const a=JSON.parse(JSON.stringify(t));a.parentMobile||(a.parentMobile="+91 9820011223"),o(a)}},[t]),!r)return null;const g=()=>{m(r)};return l.jsx(u,{isOpen:e,onClose:s,title:t!=null&&t.id?"Edit Student":"Add Student",size:"md",footer:l.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",width:"100%"},children:[l.jsx(p,{variant:"secondary",onClick:s,disabled:d,children:"Cancel"}),l.jsx(p,{onClick:g,isLoading:d,children:"Save Changes"})]}),children:l.jsx(f,{children:l.jsxs(h,{children:[l.jsx(b,{children:"Student Information"}),l.jsxs(v,{children:[l.jsx(i,{label:"Student Full Name",value:r.name,onChange:a=>o({...r,name:a.target.value})}),l.jsx(i,{label:"Email Address",type:"email",value:r.email,onChange:a=>o({...r,email:a.target.value})}),l.jsx(i,{label:"Mobile Number",value:r.mobile,onChange:a=>o({...r,mobile:a.target.value})}),l.jsx(i,{label:"Parent Phone Number",placeholder:"+91 9820011223",value:r.parentMobile||"",onChange:a=>o({...r,parentMobile:a.target.value})}),l.jsx(x,{label:"Grade / Class",value:r.grade,onChange:a=>o({...r,grade:a.target.value}),options:[{value:"10th",label:"10th Grade"},{value:"11th",label:"11th Grade"},{value:"12th",label:"12th Grade"}]})]})]})})})};export{$ as E};
