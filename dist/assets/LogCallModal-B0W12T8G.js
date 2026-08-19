import{g as s,e as A,r as c,j as e,B as L,aA as H,ax as F,aE as D}from"./index-MAFUjG_U.js";import{M as B}from"./Modal-BNANDCMU.js";import{S as E}from"./Select-D9CY3fX3.js";import{C as d}from"./Checkbox-Alt7KLrZ.js";const M=s.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,z=s.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: 4px;
  padding: 14px 16px;
`,m=s.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,b=s.label`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.text};
`,N=s.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 8px 12px;
  background-color: ${({theme:o})=>o.colors.background};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: 4px;
  flex-wrap: wrap;
`,I=s.textarea`
  width: 100%;
  min-height: 70px;
  padding: 8px 12px;
  font-family: inherit;
  font-size: 13px;
  color: ${({theme:o})=>o.colors.text};
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: 4px;
  resize: vertical;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${({theme:o})=>o.colors.textMuted};
  }

  &:focus {
    border-color: ${({theme:o})=>o.colors.primary};
    box-shadow: 0 0 0 2px ${({theme:o})=>o.colors.primaryLight};
  }
`,R=s.div`
  display: flex;
  justify-content: flex-end;
`,O=s.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,W=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,G=s.h4`
  font-size: 14px;
  font-weight: 700;
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`,P=s.span`
  background-color: ${({theme:o})=>o.colors.primaryLight};
  color: ${({theme:o})=>o.colors.primary};
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
`,_=s.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 260px;
  overflow-y: auto;
  padding-right: 4px;
`,U=s.div`
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: 4px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({theme:o})=>o.colors.primary};
    background-color: ${({theme:o})=>o.colors.surfaceHover};
  }
`,Y=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`,q=s.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,J=s.span`
  font-size: 13px;
  font-weight: 700;
  color: ${({theme:o})=>o.colors.text};
`,K=s.span`
  font-size: 11px;
  font-weight: 600;
  background-color: ${({theme:o})=>o.colors.background};
  border: 1px solid ${({theme:o})=>o.colors.border};
  color: ${({theme:o})=>o.colors.textSecondary};
  padding: 2px 7px;
  border-radius: 4px;
`,Q=s.span`
  font-size: 11px;
  font-weight: 700;
  color: ${({theme:o})=>o.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,V=s.span`
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;

  ${({$outcome:o})=>{const n=o.toLowerCase();return n.includes("booked")?`
        background-color: #DCFCE7;
        color: #15803D;
        border: 1px solid #BBF7D0;
      `:n.includes("complete")?`
        background-color: #EDE9FE;
        color: #6B21A8;
        border: 1px solid #DDD6FE;
      `:n.includes("no answer")?`
        background-color: #FEF3C7;
        color: #B45309;
        border: 1px solid #FDE68A;
      `:n.includes("not connecting")||n.includes("refused")?`
        background-color: #FEE2E2;
        color: #DC2626;
        border: 1px solid #FECACA;
      `:`
      background-color: #F1F5F9;
      color: #475569;
      border: 1px solid #E2E8F0;
    `}}
`,X=s.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: ${({theme:o})=>o.colors.textSecondary};

  strong {
    color: ${({theme:o})=>o.colors.text};
    font-weight: 600;
  }
`,Z=s.div`
  background-color: ${({theme:o})=>o.colors.background};
  border-left: 3px solid ${({theme:o})=>o.colors.primary};
  padding: 6px 10px;
  border-radius: 0 4px 4px 0;
  font-size: 12px;
  color: ${({theme:o})=>o.colors.text};
  line-height: 1.4;
  display: flex;
  align-items: flex-start;
  gap: 6px;

  svg {
    color: ${({theme:o})=>o.colors.primary};
    flex-shrink: 0;
    margin-top: 2px;
  }
`,oo=[{value:"Answered ~ Booked",label:"Answered ~ Booked"},{value:"Answered ~ will complete",label:"Answered ~ will complete"},{value:"No Answer",label:"No Answer"},{value:"Wrong Number",label:"Wrong Number"},{value:"Not Connecting",label:"Not Connecting"},{value:"Refused",label:"Refused"}],eo=[{id:"log-1",dateTime:"17 Aug, 1005 Hr",stage:"Session 1",outcome:"No Answer",spokenTo:["Father"],comments:"Called parent on mobile, phone kept ringing without answer.",by:"ADMIN"},{id:"log-2",dateTime:"15 Aug, 1620 Hr",stage:"Session 1",outcome:"Not Connecting",comments:"Number not reachable. Scheduled retry for next day.",by:"ADMIN"},{id:"log-3",dateTime:"12 Aug, 0940 Hr",stage:"Session 1",outcome:"Answered ~ will complete",spokenTo:["Student","Mother"],comments:"Spoke with mother and student. Confirmed they will complete the questionnaire.",by:"ADMIN"}],lo=({isOpen:o,onClose:n,targetName:a,targetCode:p,stageName:y="Session 1"})=>{const w=A(),[x,k]=c.useState("Answered ~ Booked"),[t,g]=c.useState({student:!1,father:!1,mother:!1,counsellor:!1}),[u,h]=c.useState(""),[f,j]=c.useState(eo),i=r=>{g(l=>({...l,[r]:!l[r]}))},C=()=>{const r=[];t.student&&r.push("Student"),t.father&&r.push("Father"),t.mother&&r.push("Mother"),t.counsellor&&r.push("Counsellor");const l=new Date,S=`${l.toLocaleDateString("en-GB",{day:"2-digit",month:"short"})}, ${l.getHours().toString().padStart(2,"0")}${l.getMinutes().toString().padStart(2,"0")} Hr`,v={id:`log-${Date.now()}`,dateTime:S,stage:y,outcome:x,spokenTo:r.length>0?r:void 0,comments:u.trim()||void 0,by:"ADMIN"};j(T=>[v,...T]),w.success("Call Logged",`Recorded follow-up log for ${a}.`),h(""),g({student:!1,father:!1,mother:!1,counsellor:!1})},$=a?p?`Log a Call — ${a} (${p})`:`Log a Call — ${a}`:"Log a Call";return e.jsx(B,{isOpen:o,onClose:n,title:$,size:"lg",children:e.jsxs(M,{children:[e.jsxs(z,{children:[e.jsx(E,{label:"Call Outcome",value:x,onChange:r=>k(r.target.value),options:oo}),e.jsxs(m,{children:[e.jsx(b,{children:"Spoken To"}),e.jsxs(N,{children:[e.jsx(d,{label:"Student",checked:t.student,onChange:()=>i("student")}),e.jsx(d,{label:"Father",checked:t.father,onChange:()=>i("father")}),e.jsx(d,{label:"Mother",checked:t.mother,onChange:()=>i("mother")}),e.jsx(d,{label:"Counsellor",checked:t.counsellor,onChange:()=>i("counsellor")})]})]}),e.jsxs(m,{children:[e.jsx(b,{children:"Comments"}),e.jsx(I,{placeholder:"e.g. Spoke to student, got the time, then spoke to counsellor, then informed both again, then updated in portal.",value:u,onChange:r=>h(r.target.value)})]}),e.jsx(R,{children:e.jsx(L,{variant:"primary",onClick:C,children:"Save Log"})})]}),e.jsxs(O,{children:[e.jsx(W,{children:e.jsxs(G,{children:["Call Log History",e.jsx(P,{children:f.length})]})}),e.jsx(_,{children:f.map(r=>e.jsxs(U,{children:[e.jsxs(Y,{children:[e.jsxs(q,{children:[e.jsx(H,{size:14,style:{color:"#64748B"}}),e.jsx(J,{children:r.dateTime}),e.jsx(K,{children:r.stage}),e.jsxs(Q,{children:["• BY: ",r.by]})]}),e.jsx(V,{$outcome:r.outcome,children:r.outcome})]}),r.spokenTo&&r.spokenTo.length>0&&e.jsxs(X,{children:[e.jsx(F,{size:13,style:{color:"#64748B"}}),e.jsxs("span",{children:["Spoken To: ",e.jsx("strong",{children:r.spokenTo.join(", ")})]})]}),r.comments&&e.jsxs(Z,{children:[e.jsx(D,{size:14}),e.jsx("span",{children:r.comments})]})]},r.id))})]})]})})};export{lo as L};
