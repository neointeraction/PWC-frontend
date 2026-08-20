import{j as e,aI as p,B as y,g as t}from"./index-a7zXg0JL.js";import{M as D}from"./Modal-HiRbBry-.js";import"./Card.styles-MXf9i3yh.js";import"./Input-CcYvfC84.js";import"./Select-BAabmZ1Y.js";import"./Badge.styles-rNLOM2_m.js";import"./Checkbox-CyX2E4EW.js";import"./Table.styles-Cb89hldY.js";import"./FileUpload.styles-BKXqSS7S.js";import"./Breadcrumb-CswGd06t.js";import"./ConfirmDialog-C7PpcmZe.js";import"./SuccessModal.styles-CmlOLHfD.js";import{T as x}from"./Tooltip-D_2DC_R7.js";const S=s=>{if(!s)return"";const i=(s.includes("T")?s.split("T")[0]:s).split("-");return i.length===3&&i[0].length===4?`${i[2]}-${i[1]}-${i[0]}`:s},$=t.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 22px;
  column-gap: 32px;
  padding: 8px 0;

  @media (max-width: ${({theme:s})=>s.breakpoints.sm}) {
    grid-template-columns: 1fr;
    row-gap: 18px;
  }
`,n=t.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,r=t.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({theme:s})=>s.colors.textMuted||"#94A3B8"};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,o=t.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({theme:s})=>s.colors.text};
  line-height: 1.4;
`,h=t.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 4px 10px;
  background-color: ${({theme:s})=>s.colors.primaryLight||"#F3E8FF"};
  color: ${({theme:s})=>s.colors.primary||"#5D2384"};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`,A=t.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  padding: 4px 10px;
  background-color: #DCFCE7;
  color: #16A34A;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #16A34A;
  }
`,m=t.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({theme:s})=>s.colors.text};
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    color: #16A34A;
    transition: transform 0.2s ease;
  }

  &:hover {
    color: #16A34A;
    text-decoration: underline;

    svg {
      transform: scale(1.15);
    }
  }
`,V=({isOpen:s,onClose:l,student:i,instituteName:j="St. Xavier's College, Mumbai",counselorPhone:a="+91 98190 93786"})=>{var d;if(!i)return null;const g="stage"in i&&i.stage||"sessionType"in i&&i.sessionType||"Session 1 (S1)",f="session1"in i&&((d=i.session1)!=null&&d.date)?`${S(i.session1.date)} • ${i.session1.timeSlot||"09:30 - 10:30"}`:`${"sessionDate"in i&&i.sessionDate||"18-02-2026"} • ${"timeSlot"in i&&i.timeSlot||"09:30 - 10:30"}`,u="studentId"in i&&i.studentId||("id"in i&&i.id&&i.id.startsWith("ST")?i.id:"ST101"),c=i.mobile||"+91 9810012345",b=c.replace(/\D/g,""),w=a.replace(/\D/g,"");return e.jsx(D,{isOpen:s,onClose:l,title:"Student Details",subtitle:`Detailed metadata for ${i.name}`,size:"md",footer:e.jsx(y,{variant:"secondary",onClick:l,children:"Close"}),children:e.jsxs($,{children:[e.jsxs(n,{children:[e.jsx(r,{children:"Student ID"}),e.jsx(o,{children:e.jsx("strong",{children:u})})]}),e.jsxs(n,{children:[e.jsx(r,{children:"Full Name"}),e.jsx(o,{children:i.name})]}),e.jsxs(n,{children:[e.jsx(r,{children:"Grade / Class"}),e.jsx(o,{children:e.jsx(h,{children:i.grade||"11th"})})]}),e.jsxs(n,{children:[e.jsx(r,{children:"Session Stage"}),e.jsx(o,{children:e.jsx(h,{children:g})})]}),e.jsxs(n,{children:[e.jsx(r,{children:"Email Address"}),e.jsx(o,{children:i.email||"—"})]}),e.jsxs(n,{children:[e.jsx(r,{children:"Student Phone Number"}),e.jsx(o,{children:e.jsx(x,{content:"Chat with student on WhatsApp",children:e.jsxs(m,{href:`https://wa.me/${b}`,target:"_blank",rel:"noopener noreferrer",children:[e.jsx(p,{size:16}),e.jsx("span",{children:c})]})})})]}),e.jsxs(n,{children:[e.jsx(r,{children:"Counselor Phone Number"}),e.jsx(o,{children:e.jsx(x,{content:"Chat with counselor on WhatsApp",children:e.jsxs(m,{href:`https://wa.me/${w}`,target:"_blank",rel:"noopener noreferrer",children:[e.jsx(p,{size:16}),e.jsx("span",{children:a})]})})})]}),e.jsxs(n,{children:[e.jsx(r,{children:"Institute"}),e.jsx(o,{children:j})]}),e.jsxs(n,{children:[e.jsx(r,{children:"Status"}),e.jsx(o,{children:e.jsx(A,{children:"ACTIVE"})})]}),e.jsxs(n,{children:[e.jsx(r,{children:"Session Slot"}),e.jsx(o,{children:f})]})]})})};export{V,S as f};
