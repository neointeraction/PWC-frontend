import{j as s,aE as de,B,g as o,r as u,e as he,l as Be,F as fe,M as ge,ay as Ee,u as Re,c as X,E as Te,aB as ze,L as Pe,aF as Le,aG as De,av as Ie,h as _e,aH as Ge}from"./index-Bw790BVp.js";import{u as ce}from"./useQuery-DHiuBO_3.js";import{P as Oe}from"./PageHeader-CtkDWmsE.js";import{C as Ve}from"./Card-B7O1DSEf.js";import{I as G}from"./Input-BPi4Svcd.js";import{T as ye}from"./Table--rB9Za6j.js";import{S as ae}from"./Select-DGOp38p5.js";import"./Badge.styles-BImuS65e.js";import"./Table.styles-CMb45pz0.js";import{E as We}from"./FileUpload.styles-CwDfPGaU.js";import"./Breadcrumb-D5qQxgOH.js";import{M as W}from"./Modal-BrT8bxZc.js";import"./ConfirmDialog-BkM9sPJY.js";import"./Checkbox-DarQh2Zg.js";import{A as He}from"./AlertModal-DCt7rpbd.js";import{T as R}from"./Tooltip-DVjunIWN.js";import"./SuccessModal.styles-BgGVH7XN.js";import{D as qe}from"./DatePicker-BtgIvKfs.js";import{p as V}from"./project.service-RU6EL_sY.js";import"./Card.styles-BQGvdCGA.js";import{f as Ue}from"./index-BW8bBlXO.js";import{B as Ke}from"./Badge-XwSei9t-.js";import{p as Ye,F as Qe}from"./FileUpload-hTfxPfiK.js";import"./SuccessModal-DOdI_xPc.js";import"./counselors.mock-CbyQmpLX.js";const Je=o.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 22px;
  column-gap: 32px;
  padding: 8px 0;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
    row-gap: 18px;
  }
`,A=o.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,F=o.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.textMuted||"#94A3B8"};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,N=o.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({theme:e})=>e.colors.text};
  line-height: 1.4;
`,pe=o.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 4px 10px;
  background-color: ${({theme:e})=>e.colors.primaryLight||"#F3E8FF"};
  color: ${({theme:e})=>e.colors.primary||"#5D2384"};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`,Xe=o.span`
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
`,ue=o.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({theme:e})=>e.colors.text};
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
`,Ze=({isOpen:e,onClose:l,student:i,instituteName:a="St. Xavier's College, Mumbai",counselorPhone:v="+91 98190 93786"})=>{var c;if(!i)return null;const j="stage"in i&&i.stage||"sessionType"in i&&i.sessionType||"Session 1 (S1)",S="session1"in i&&((c=i.session1)!=null&&c.date)?`${Ue(i.session1.date)} • ${i.session1.timeSlot||"09:30 - 10:30"}`:`${"sessionDate"in i&&i.sessionDate||"18-02-2026"} • ${"timeSlot"in i&&i.timeSlot||"09:30 - 10:30"}`,E="studentId"in i&&i.studentId||("id"in i&&i.id&&i.id.startsWith("ST")?i.id:"ST101"),y=i.mobile||"+91 9810012345",h=y.replace(/\D/g,""),g=v.replace(/\D/g,"");return s.jsx(W,{isOpen:e,onClose:l,title:"Student Details",subtitle:`Detailed metadata for ${i.name}`,size:"md",footer:s.jsx(B,{variant:"secondary",onClick:l,children:"Close"}),children:s.jsxs(Je,{children:[s.jsxs(A,{children:[s.jsx(F,{children:"Student ID"}),s.jsx(N,{children:s.jsx("strong",{children:E})})]}),s.jsxs(A,{children:[s.jsx(F,{children:"Full Name"}),s.jsx(N,{children:i.name})]}),s.jsxs(A,{children:[s.jsx(F,{children:"Grade / Class"}),s.jsx(N,{children:s.jsx(pe,{children:i.grade||"11th"})})]}),s.jsxs(A,{children:[s.jsx(F,{children:"Session Stage"}),s.jsx(N,{children:s.jsx(pe,{children:j})})]}),s.jsxs(A,{children:[s.jsx(F,{children:"Email Address"}),s.jsx(N,{children:i.email||"—"})]}),s.jsxs(A,{children:[s.jsx(F,{children:"Student Phone Number"}),s.jsx(N,{children:s.jsx(R,{content:"Chat with student on WhatsApp",children:s.jsxs(ue,{href:`https://wa.me/${h}`,target:"_blank",rel:"noopener noreferrer",children:[s.jsx(de,{size:16}),s.jsx("span",{children:y})]})})})]}),s.jsxs(A,{children:[s.jsx(F,{children:"Counselor Phone Number"}),s.jsx(N,{children:s.jsx(R,{content:"Chat with counselor on WhatsApp",children:s.jsxs(ue,{href:`https://wa.me/${g}`,target:"_blank",rel:"noopener noreferrer",children:[s.jsx(de,{size:16}),s.jsx("span",{children:v})]})})})]}),s.jsxs(A,{children:[s.jsx(F,{children:"Institute"}),s.jsx(N,{children:a})]}),s.jsxs(A,{children:[s.jsx(F,{children:"Status"}),s.jsx(N,{children:s.jsx(Xe,{children:"ACTIVE"})})]}),s.jsxs(A,{children:[s.jsx(F,{children:"Session Slot"}),s.jsx(N,{children:S})]})]})})},es=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,Z=o.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: ${({theme:e})=>e.fontSize.xs};
    font-weight: ${({theme:e})=>e.fontWeight.semibold};
    color: ${({theme:e})=>e.colors.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`,ss=o.div`
  background-color: ${({theme:e})=>e.colors.primaryLight};
  border: 1px solid ${({theme:e})=>e.colors.primaryMuted};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.md};
  display: flex;
  flex-direction: column;
  gap: 4px;

  span:first-child {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: ${({theme:e})=>e.colors.primary};
  }

  span:last-child {
    font-size: 14px;
    font-weight: 600;
    color: ${({theme:e})=>e.colors.text};
  }
`,os=o.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({theme:e})=>e.spacing.sm};
  margin-top: ${({theme:e})=>e.spacing.md};
`,ns=[{value:"Ananya Roy",label:"Ananya Roy (Grade 11 • +91 9810012345)"},{value:"Rohan Menon",label:"Rohan Menon (Grade 12 • +91 9810024690)"},{value:"Priya Rao",label:"Priya Rao (Grade 10 • +91 9810037035)"},{value:"Siddharth Pillai",label:"Siddharth Pillai (Grade 11 • +91 9810049380)"},{value:"Diya Nair",label:"Diya Nair (Grade 11 • +91 9810055441)"},{value:"Aarav Sharma",label:"Aarav Sharma (Grade 12 • +91 9810066772)"},{value:"Vihaan Iyer",label:"Vihaan Iyer (Grade 12 • +91 9810077883)"},{value:"Kavya Patel",label:"Kavya Patel (Grade 10 • +91 9810088994)"}],ts=({isOpen:e,onClose:l,session:i,slot:a,onSave:v})=>{const[j,S]=u.useState(""),[E,y]=u.useState("S1"),[h,g]=u.useState("");u.useEffect(()=>{a&&a.isBooked?(S(a.studentName||"Ananya Roy"),y(a.sessionType||"S1"),g(a.mobile||"+91 9810012345")):(S("Ananya Roy"),y("S1"),g("+91 9810012345"))},[a]);const c=m=>{const w=m.target.value;S(w),g(w==="Ananya Roy"?"+91 9810012345":w==="Rohan Menon"?"+91 9810024690":w==="Priya Rao"?"+91 9810037035":w==="Siddharth Pillai"?"+91 9810049380":"+91 9810055441")},k=()=>{a&&(v(a.id,{studentName:j,sessionType:E,mobile:h,isBooked:!0}),l())};return!i||!a?null:s.jsx(W,{isOpen:e,onClose:l,title:"Assign Student to Counselor Schedule",size:"md",children:s.jsxs(es,{children:[s.jsxs(ss,{children:[s.jsx("span",{children:"Counselor & Available Session Slot"}),s.jsxs("span",{children:[i.counselorName," • ",a.date," @ ",a.time]})]}),s.jsxs(Z,{children:[s.jsx("label",{children:"Select Student"}),s.jsx(ae,{options:ns,value:j,onChange:c})]}),s.jsxs(Z,{children:[s.jsx("label",{children:"Session Type"}),s.jsx(ae,{options:[{value:"S1",label:"Session 1 (S1) - Initial Counseling"},{value:"S2",label:"Session 2 (S2) - Roadmap Review"}],value:E,onChange:m=>y(m.target.value)})]}),s.jsxs(Z,{children:[s.jsx("label",{children:"Student Contact Phone"}),s.jsx(G,{value:h,onChange:m=>g(m.target.value),placeholder:"+91 Mobile number"})]}),s.jsxs(os,{children:[s.jsx(B,{variant:"secondary",onClick:l,children:"Cancel"}),s.jsx(B,{variant:"primary",onClick:k,children:"Save Schedule"})]})]})})},is=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,rs=o.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0 0 ${({theme:e})=>e.spacing.xs} 0;
`,ls=o.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
`,ee=o.span`
  font-weight: 700;
  color: ${({theme:e})=>e.colors.primary};
`,as=o.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 12px;
  align-items: end;
  padding: 16px;
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
`,ds=o.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.danger};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.danger};
    background-color: ${({theme:e})=>e.colors.surfaceHover};
  }
`,cs=({isOpen:e,onClose:l,onCounselorsAssigned:i})=>{const[a,v]=u.useState([]),[j,S]=u.useState(null),[E,y]=u.useState(!1),[h,g]=u.useState(!1),[c,k]=u.useState({name:"",email:"",mobile:""}),m=he(),w=u.useCallback(async d=>{S(d),y(!0);try{const C=await Ye(d);if(C.length===0){m.error("Empty File","The uploaded file contains no data rows."),y(!1);return}const T=C.map(p=>({name:p.Name||p.name||"",email:p.Email||p.email||"",mobile:p.Mobile||p.mobile||p.Phone||p.phone||""})).filter(p=>p.name&&p.email);if(T.length===0){m.error("Invalid Format","No valid counselor records found. Ensure columns: Name, Email, Mobile."),y(!1);return}const P=await V.validateCounselors(T);v(p=>[...p,...P]),m.success("Counselors Loaded",`${P.length} counselor(s) added successfully.`)}catch{m.error("Parse Error","Failed to parse the uploaded file.")}finally{y(!1)}},[m]),f=u.useCallback(()=>{S(null)},[]),z=d=>{v(C=>C.filter(O=>O.email!==d.email)),m.info("Counselor Removed","Removed from assignment list.")},D=async()=>{if(!c.name.trim()||!c.email.trim()){m.error("Validation Error","Counselor Name and Email are required.");return}const d=await V.validateCounselors([c]);v(C=>[...C,...d]),k({name:"",email:"",mobile:""}),g(!1),m.success("Counselor Added",`${c.name} added to assignment list.`)},H=()=>{if(a.length===0){m.error("No Counselors","Please upload or add at least one counselor.");return}i(a),m.success("Counselors Assigned",`Successfully assigned ${a.length} counselor(s) to this project.`),v([]),S(null),l()},I=a.filter(d=>d.matchStatus==="matched").length,q=a.filter(d=>d.matchStatus==="new").length,U=[{key:"name",header:"Name"},{key:"email",header:"Email"},{key:"mobile",header:"Mobile"},{key:"matchStatus",header:"Status",render:d=>s.jsx(Ke,{variant:d.matchStatus==="matched"?"success":"warning",children:d.matchStatus==="matched"?"Matched":"New"})},{key:"actions",header:"Action",width:"60px",render:d=>s.jsx(R,{content:"Remove Counselor",children:s.jsx(ds,{type:"button","aria-label":"Remove Counselor",onClick:()=>z(d),children:s.jsx(ge,{size:16})})})}];return s.jsx(W,{isOpen:e,onClose:l,title:"Add Counselors to Project",subtitle:"Upload or manually assign counselors for project session scheduling",size:"lg",footer:s.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",width:"100%"},children:[s.jsx(B,{variant:"secondary",onClick:l,children:"Cancel"}),s.jsxs(B,{onClick:H,disabled:a.length===0,leftIcon:s.jsx(fe,{size:16}),children:["Assign ",a.length>0?`(${a.length})`:""," Counselors"]})]}),children:s.jsxs(is,{children:[s.jsx(rs,{children:"Upload a CSV/Excel file or add counselors individually to assign them to this project."}),s.jsx(Qe,{label:"Counselor List",hint:"CSV with columns: Name, Email, Mobile",onFileSelect:w,onFileRemove:f,selectedFile:j}),s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"8px"},children:[s.jsxs(ls,{children:[s.jsxs(_,{children:[s.jsx(ee,{children:I})," matched"]}),s.jsx(_,{children:"•"}),s.jsxs(_,{children:[s.jsx(ee,{children:q})," new counselors"]}),s.jsx(_,{children:"•"}),s.jsxs(_,{children:[s.jsx(ee,{children:a.length})," total"]})]}),s.jsx(B,{type:"button",size:"sm",variant:"secondary",leftIcon:s.jsx(Be,{size:16}),onClick:()=>g(d=>!d),children:h?"Cancel Manual Add":"Add Counselor Manually"})]}),h&&s.jsxs(as,{children:[s.jsx(G,{label:"Name",placeholder:"e.g. Priya Sundaram",value:c.name,onChange:d=>k({...c,name:d.target.value})}),s.jsx(G,{label:"Email",placeholder:"priya.sundaram@pwc.org",value:c.email,onChange:d=>k({...c,email:d.target.value})}),s.jsx(G,{label:"Mobile",placeholder:"+91 98111 22334",value:c.mobile,onChange:d=>k({...c,mobile:d.target.value})}),s.jsx(B,{type:"button",size:"sm",onClick:D,children:"Add"})]}),a.length>0&&s.jsx("div",{style:{marginTop:"12px"},children:s.jsx(ye,{columns:U,data:a,isLoading:E,keyExtractor:d=>d.email||d.name,emptyMessage:"No counselors added yet."})})]})})},_=o.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
`,ps=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,us=o.div`
  display: grid;
  grid-template-columns: repeat(3, 240px);
  gap: 16px;
  width: 100%;

  @media (max-width: 840px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`,se=o.button`
  background-color: ${({theme:e,$isActive:l})=>l?e.colors.primaryLight:e.colors.surface};
  border: 1px solid
    ${({theme:e,$isActive:l})=>l?e.colors.primary:e.colors.border};
  border-radius: 4px;
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.06);
  }
`,oe=o.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.textSecondary};
`,ne=o.span`
  font-size: 24px;
  font-weight: 800;
  color: ${({$color:e,theme:l})=>e||l.colors.text};
`,xs=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`,ms=o.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
  flex: 1;
`,hs=o.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,fs=o.button`
  width: 38px;
  height: 38px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({$variant:e,theme:l})=>e==="excel"?"#16A34A":l.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({$variant:e,theme:l})=>e==="excel"?"#16A34A":l.colors.primary};
    background-color: ${({$variant:e,theme:l})=>e==="excel"?"#F0FDF4":l.colors.primaryLight};
    color: ${({$variant:e,theme:l})=>e==="excel"?"#16A34A":l.colors.primary};
  }
`,xe=o.button`
  width: 34px;
  height: 34px;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
    color: ${({theme:e})=>e.colors.primary};
  }
`,gs=o.div`
  max-width: 380px;
  width: 100%;
`,ys=o.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,bs=o.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`,js=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  padding-bottom: 14px;
  flex-wrap: wrap;
`,Ss=o.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`,Cs=o.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #F3E8FF;
  color: ${({theme:e})=>e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 15px;
  flex-shrink: 0;
`,vs=o.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,$s=o.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,ks=o.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,ws=o.span`
  font-size: 12px;
  color: ${({theme:e})=>e.colors.textSecondary};
`,Ms=o.span`
  font-size: 15px;
  font-weight: 800;
  color: ${({theme:e})=>e.colors.text};
  letter-spacing: 0.5px;
  margin-left: 8px;
`;o.button`
  background: none;
  border: none;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({theme:e})=>e.colors.textSecondary};
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`;const As=o.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`,Fs=o.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,te=o.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background-color: ${({theme:e})=>e.colors.background};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  font-size: 12px;
`,ie=o.span`
  color: ${({theme:e})=>e.colors.textSecondary};
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,re=o.span`
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  font-size: 13px;
`,Ns=o.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  background-color: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 4px;
  font-size: 12px;
  color: #DC2626;
  font-weight: 700;

  svg {
    color: #DC2626;
    flex-shrink: 0;
  }
`,Bs=o.div`
  display: flex;
  flex-direction: column;
`,Es=o.div`
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.surface};
  overflow: hidden;
`,Rs=o.button`
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.primary};
  cursor: pointer;
  text-align: left;
  transition: color 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: ${({theme:e})=>e.colors.primaryHover};
  }
`,Ts=o.span`
  color: ${({theme:e})=>e.colors.textMuted};
  font-size: 13px;
  font-style: italic;
`,me=o.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`,le=o.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  background-color: ${({$type:e,$isMissed:l})=>l?"#FEE2E2":e==="S1"?"#EDE9FE":e==="S2"?"#E0F2FE":"#F1F5F9"};
  color: ${({$type:e,$isMissed:l})=>l?"#DC2626":e==="S1"?"#6B21A8":e==="S2"?"#0369A1":"#64748B"};
`,zs=o.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Ps=o.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 12px;
  background-color: ${({theme:e})=>e.colors.primary};
  color: #ffffff;
  border: 1px solid ${({theme:e})=>e.colors.primary};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({theme:e})=>e.colors.primaryHover};
    border-color: ${({theme:e})=>e.colors.primaryHover};
  }
`;o.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;const Ls=o.button`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,co=()=>{const{projectId:e}=Ee(),l=Re(),i=he(),[a,v]=u.useState(""),[j,S]=u.useState(null),[E,y]=u.useState(!1),[h,g]=u.useState(null),[c,k]=u.useState(null),[m,w]=u.useState(null),[f,z]=u.useState(null),[D,H]=u.useState(new Date("2026-02-28")),[I,q]=u.useState("11:00 - 12:00"),[U,d]=u.useState(null),[C,O]=u.useState({"cs-101":"CN003","cs-102":"CN004","cs-103":"CN005","cs-104":"CN006"}),[T,P]=u.useState({"cs-101":[{id:"anil-slot-1",date:"18 Feb 2026",time:"09:30 - 10:30",studentName:"Ananya Roy",sessionType:"S1",mobile:"+91 9810012345",isBooked:!0,isMissed:!1,notes:"Session completed successfully. Recommended focus on science stream."},{id:"anil-slot-2",date:"22 Feb 2026",time:"09:30 - 10:30",studentName:"Ananya Roy",sessionType:"S2",mobile:"+91 9810012345",isBooked:!0,isMissed:!0,notes:"Student missed session due to illness. Parent requested reschedule."},{id:"anil-slot-3",date:"18 Feb 2026",time:"11:00 - 12:00",isBooked:!1},{id:"anil-slot-4",date:"25 Feb 2026",time:"14:00 - 15:00",isBooked:!1}],"cs-102":[{id:"mahesh-slot-1",date:"18 Feb 2026",time:"09:30 - 10:30",studentName:"Aarav Sharma",sessionType:"S1",mobile:"+91 9810054321",isBooked:!0,isMissed:!1,notes:"Session completed."},{id:"mahesh-slot-2",date:"22 Feb 2026",time:"09:30 - 10:30",studentName:"Rohan Menon",sessionType:"S2",mobile:"+91 9810067890",isBooked:!0,isMissed:!0,notes:"Follow-up required with student."},{id:"mahesh-slot-3",date:"18 Feb 2026",time:"11:00 - 12:00",isBooked:!1},{id:"mahesh-slot-4",date:"25 Feb 2026",time:"14:00 - 15:00",isBooked:!1}],"cs-103":[{id:"hema-slot-1",date:"19 Feb 2026",time:"14:00 - 15:00",studentName:"Devika Nair",sessionType:"S2",mobile:"+91 9810037035",isBooked:!0,isMissed:!1},{id:"hema-slot-2",date:"23 Feb 2026",time:"11:00 - 12:00",isBooked:!1},{id:"hema-slot-3",date:"26 Feb 2026",time:"16:00 - 17:00",isBooked:!1}],"cs-104":[{id:"girish-slot-1",date:"19 Feb 2026",time:"16:00 - 17:00",studentName:"Siddharth Pillai",sessionType:"S1",mobile:"+91 9810049380",isBooked:!0,isMissed:!1},{id:"girish-slot-2",date:"24 Feb 2026",time:"09:30 - 10:30",isBooked:!1},{id:"girish-slot-3",date:"27 Feb 2026",time:"14:00 - 15:00",isBooked:!1}]}),{data:p}=ce({queryKey:["project",e],queryFn:()=>V.getById(e||"proj-001")}),{data:be=[],isLoading:je}=ce({queryKey:["projectSessions",e],queryFn:()=>V.getProjectSessions(e||"proj-001")}),K=U??be,Se=t=>{const n=[...K],x={...T},r={...C};t.forEach((b,L)=>{const $=`cs-${Date.now()}-${L}`,M=Object.keys(r).length+3,Q=`CN${String(M).padStart(3,"0")}`;r[$]=Q;const J={id:$,counselorId:`COU-${10+L}`,counselorName:b.name,counselorEmail:b.email,counselorPhone:b.mobile||"+91 98100 00000",timeSlots:[],assignedStudents:[]};x[$]=[{id:`${$}-slot-1`,date:"02 Mar 2026",time:"09:30 - 10:30",isBooked:!1},{id:`${$}-slot-2`,date:"02 Mar 2026",time:"11:00 - 12:00",isBooked:!1},{id:`${$}-slot-3`,date:"05 Mar 2026",time:"14:00 - 15:00",isBooked:!1}],n.push(J)}),O(r),P(x),d(n),y(!1)},Ce=()=>{if(!h)return;const t=K.filter(n=>n.id!==h.id);d(t),i.success("Counselor Removed",`Removed ${h.counselorName} from project counselor assignments.`),g(null)},ve=t=>{const n=`https://meet.google.com/pwc-${t.counselorId.toLowerCase()}`;navigator.clipboard.writeText(n),i.success("Link Copied",`Google Meet link for ${t.counselorName} copied to clipboard.`)},$e=()=>{const t=[];t.push("Counselor Code,Counselor Name,Counselor Email,Counselor Phone,Date,Time,Student Name,Session,Student Phone,Status"),Y.forEach(b=>{const L=C[b.id]||"CN001";(T[b.id]||[]).forEach(M=>{const Q=M.studentName||"Not Booked",J=M.sessionType||(M.isBooked?"S1":"NB"),Fe=M.mobile||"—",Ne=M.isMissed?"Missed":M.isBooked?"Completed":"Available";t.push(`"${L}","${b.counselorName}","${b.counselorEmail}","${b.counselorPhone}","${M.date}","${M.time}","${Q}","${J}","${Fe}","${Ne}"`)})});const n=new Blob([t.join(`
`)],{type:"text/csv;charset=utf-8;"}),x=URL.createObjectURL(n),r=document.createElement("a");r.setAttribute("href",x),r.setAttribute("download",`${((p==null?void 0:p.name)||"Project_Sessions").replace(/\s+/g,"_")}_List.csv`),document.body.appendChild(r),r.click(),document.body.removeChild(r),i.success("Excel Export Started","Downloaded project sessions list (.csv).")},ke=(t,n)=>{k({session:t,slot:n})},we=(t,n)=>{if(!c)return;const x=c.session.id;P(r=>{const L=(r[x]||[]).map($=>$.id===t?{...$,...n,isMissed:!1}:$);return{...r,[x]:L}}),i.success("Schedule Saved",`Assigned ${n.studentName} to ${c.session.counselorName}'s session on ${c.slot.date}.`),k(null)},Me=()=>{if(!f)return;const t=D?D.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}):"28 Feb 2026";P(n=>{const x={...n};return Object.keys(x).forEach(r=>{x[r]=x[r].map(b=>b.id===f.slot.id?{...b,date:t,time:I,isMissed:!1}:b)}),x}),i.success("Session Rescheduled",`Rescheduled session for ${f.slot.studentName} to ${t} at ${I}.`),z(null)},Y=K.filter(t=>{const n=T[t.id]||[];if(j==="follow_up_today")return n.some(r=>r.isBooked);if(j==="missed_session_1")return n.some(r=>r.isBooked&&r.sessionType==="S1"&&r.isMissed);if(j==="missed_session_2")return n.some(r=>r.isBooked&&r.sessionType==="S2"&&r.isMissed);if(!a)return!0;const x=a.toLowerCase();return t.counselorName.toLowerCase().includes(x)||C[t.id]&&C[t.id].toLowerCase().includes(x)||n.some(r=>r.studentName&&r.studentName.toLowerCase().includes(x))}),Ae=t=>[{key:"date",header:"Date",render:n=>s.jsx("span",{style:{color:n.isBooked?void 0:"#94A3B8",fontWeight:500},children:n.date})},{key:"time",header:"Time",render:n=>s.jsx("strong",{style:{color:n.isBooked?void 0:"#94A3B8"},children:n.time})},{key:"studentName",header:"Student",render:n=>n.isBooked?s.jsx(Rs,{type:"button",onClick:()=>{var x;return w({studentId:"ST101",name:n.studentName||"",email:`${(x=n.studentName)==null?void 0:x.toLowerCase().replace(/\s+/g,".")}@student.edu`,mobile:n.mobile||"+91 9810012345",grade:"11th",sessionType:n.sessionType==="S2"?"S2":"S1"})},children:n.studentName}):s.jsx(Ts,{children:"NB (not booked)"})},{key:"sessionType",header:"Session",render:n=>n.isBooked?n.isMissed?s.jsxs(me,{children:[s.jsx(le,{$type:n.sessionType==="S2"?"S2":"S1",$isMissed:!0,children:n.sessionType||"S2"}),s.jsx(R,{content:"Missed Session — Reschedule Required",children:s.jsx(Ie,{size:14,style:{color:"#EF4444"}})})]}):s.jsxs(me,{children:[s.jsx(le,{$type:n.sessionType==="S2"?"S2":"S1",children:n.sessionType||"S1"}),s.jsx(_e,{size:16,style:{color:"#16A34A"}})]}):s.jsx(le,{$type:"NB",children:"NB"})},{key:"mobile",header:"Phone",render:n=>n.isBooked?n.mobile||"+91 9810012345":s.jsx("span",{style:{color:"#CBD5E1"},children:"—"})},{key:"action",header:"Action",render:n=>s.jsx(zs,{children:n.isBooked&&n.isMissed?s.jsx(Ps,{type:"button",onClick:()=>{z({counselorName:t.counselorName,slot:n})},children:"Reschedule"}):n.isBooked?null:s.jsx(R,{content:"Assign Student to Slot",children:s.jsx(Ls,{type:"button",onClick:()=>ke(t,n),children:s.jsx(Ge,{size:15})})})})}];return s.jsxs(ps,{children:[s.jsx(Oe,{title:`Project Sessions - ${(p==null?void 0:p.name)||"Career Guidance 2026 Batch A"}`,subtitle:`School: ${(p==null?void 0:p.instituteName)||"St. Xavier's College, Mumbai"} • View counselor time slots and assigned student details.`,breadcrumbs:[{label:"Dashboard",href:X.DASHBOARD},{label:"Projects",href:X.PROJECTS},{label:"Project Sessions"}],onBack:()=>l(X.PROJECTS)}),s.jsxs(us,{children:[s.jsxs(se,{type:"button",$isActive:j==="follow_up_today",onClick:()=>S(t=>t==="follow_up_today"?null:"follow_up_today"),children:[s.jsx(oe,{children:"Follow-up today"}),s.jsx(ne,{$color:"#5D2384",children:"17"})]}),s.jsxs(se,{type:"button",$isActive:j==="missed_session_1",onClick:()=>S(t=>t==="missed_session_1"?null:"missed_session_1"),children:[s.jsx(oe,{children:"Missed Session - 1"}),s.jsx(ne,{$color:"#EA580C",children:"3"})]}),s.jsxs(se,{type:"button",$isActive:j==="missed_session_2",onClick:()=>S(t=>t==="missed_session_2"?null:"missed_session_2"),children:[s.jsx(oe,{children:"Missed Session - 2"}),s.jsx(ne,{$color:"#EA580C",children:"9"})]})]}),s.jsxs(Ve,{padding:"lg",children:[s.jsxs(xs,{style:{marginBottom:"20px"},children:[s.jsx(ms,{children:s.jsx(gs,{children:s.jsx(G,{placeholder:"Search counselor or student name...",leftIcon:s.jsx(Te,{size:16}),value:a,onChange:t=>v(t.target.value)})})}),s.jsxs(hs,{children:[s.jsx(R,{content:"Export Sessions to Excel",children:s.jsx(fs,{type:"button",$variant:"excel",onClick:$e,"aria-label":"Export Sessions to Excel",children:s.jsx(ze,{size:18})})}),s.jsx(B,{leftIcon:s.jsx(fe,{size:16}),onClick:()=>y(!0),children:"Add Counselor"})]})]}),je?s.jsx(Pe,{}):Y.length===0?s.jsx(We,{title:"No counselor sessions found",description:"Try adjusting your search criteria or filter."}):s.jsx(ys,{children:Y.map(t=>{const n=C[t.id]||"CN001",x=T[t.id]||[];return s.jsxs(bs,{children:[s.jsxs(js,{children:[s.jsxs(Ss,{children:[s.jsx(Cs,{children:t.counselorName.split(" ").map(r=>r[0]).join("")}),s.jsxs(vs,{children:[s.jsxs($s,{children:[s.jsx(ks,{children:t.counselorName}),s.jsx(Ms,{children:n})]}),s.jsxs(ws,{children:[t.counselorEmail," • ",t.counselorPhone]})]})]}),s.jsxs(As,{children:[s.jsxs(Fs,{children:[s.jsxs(te,{children:[s.jsx(ie,{children:"Booked"}),s.jsx(re,{children:"60/80 hrs"})]}),s.jsxs(te,{children:[s.jsx(ie,{children:"Session 1"}),s.jsx(re,{children:"32"})]}),s.jsxs(te,{children:[s.jsx(ie,{children:"Session 2"}),s.jsx(re,{children:"32"})]}),s.jsxs(Ns,{children:[s.jsx(Le,{size:15}),s.jsx("span",{children:"4 Missed"})]})]}),s.jsx(R,{content:"Copy Google Meet link for this counselor",children:s.jsx(xe,{type:"button",onClick:()=>ve(t),"aria-label":"Copy Google Meet Link",children:s.jsx(De,{size:18})})}),s.jsx(R,{content:"Remove Counselor from Project",children:s.jsx(xe,{type:"button",onClick:()=>g(t),"aria-label":"Remove Counselor",style:{color:"#DC2626"},children:s.jsx(ge,{size:18})})})]})]}),s.jsx(Bs,{children:s.jsx(Es,{children:s.jsx(ye,{columns:Ae(t),data:x,keyExtractor:r=>r.id,emptyMessage:"No available or booked session slots."})})})]},t.id)})})]}),s.jsx(ts,{isOpen:!!c,onClose:()=>k(null),session:(c==null?void 0:c.session)||null,slot:(c==null?void 0:c.slot)||null,onSave:we}),s.jsx(Ze,{isOpen:!!m,onClose:()=>w(null),student:m,instituteName:p==null?void 0:p.instituteName}),s.jsx(W,{isOpen:!!f,onClose:()=>z(null),title:`Reschedule Session — ${f==null?void 0:f.slot.studentName}`,size:"md",children:s.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[s.jsxs("div",{children:[s.jsx("span",{style:{fontSize:"12px",color:"#64748B",fontWeight:600},children:"SESSION DETAILS"}),s.jsxs("p",{style:{margin:"4px 0 0 0",fontWeight:700,fontSize:"14px"},children:[f==null?void 0:f.slot.studentName," • ",(f==null?void 0:f.slot.sessionType)||"Session"," • Counselor: ",f==null?void 0:f.counselorName]})]}),s.jsx(qe,{label:"New Session Date",selected:D,onChange:t=>H(t),placeholderText:"Select new date"}),s.jsx(ae,{label:"Available Time Slot",value:I,onChange:t=>q(t.target.value),options:[{value:"09:30 - 10:30",label:"09:30 AM - 10:30 AM"},{value:"11:00 - 12:00",label:"11:00 AM - 12:00 PM"},{value:"14:00 - 15:00",label:"02:00 PM - 03:00 PM"},{value:"16:00 - 17:00",label:"04:00 PM - 05:00 PM"}]}),s.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"10px",marginTop:"8px"},children:[s.jsx(B,{variant:"secondary",size:"sm",onClick:()=>z(null),children:"Cancel"}),s.jsx(B,{variant:"primary",size:"sm",onClick:Me,children:"Confirm Reschedule"})]})]})}),s.jsx(cs,{isOpen:E,onClose:()=>y(!1),onCounselorsAssigned:Se}),s.jsx(He,{isOpen:!!h,onClose:()=>g(null),onConfirm:Ce,title:"Remove Counselor from Project?",description:`Are you sure you want to remove ${h==null?void 0:h.counselorName} (${C[(h==null?void 0:h.id)||""]||"CN001"}) from this project? If this counselor has active or booked sessions, any uncompleted sessions will need to be rescheduled or reassigned.`,variant:"danger",confirmText:"Remove Counselor",cancelText:"Cancel"})]})};export{co as ProjectSessionsPage};
