import{g as o,bj as e}from"./index-BVWJ6WpZ.js";const s=e`
  0% {
    transform: scale(0.4);
    opacity: 0;
  }
  65% {
    transform: scale(1.15);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`,i=e`
  0% {
    box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.4);
  }
  70% {
    box-shadow: 0 0 0 16px rgba(22, 163, 74, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(22, 163, 74, 0);
  }
`,a=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({theme:t})=>t.spacing.sm} 0;
`,c=o.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%);
  color: #15803D;
  border: 3px solid #86EFAC;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({theme:t})=>t.spacing.md} auto;
  animation: ${s} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards,
             ${i} 2s infinite 0.5s;
  box-shadow: 0 4px 14px rgba(22, 163, 74, 0.18);
  flex-shrink: 0;
`,r=o.h2`
  font-size: ${({theme:t})=>t.fontSize.xl};
  font-weight: ${({theme:t})=>t.fontWeight.bold};
  color: ${({theme:t})=>t.colors.text};
  margin: 0 0 ${({theme:t})=>t.spacing.sm} 0;
`,d=o.p`
  font-size: ${({theme:t})=>t.fontSize.md};
  color: ${({theme:t})=>t.colors.textSecondary};
  text-align: center;
  margin: 0 0 ${({theme:t})=>t.spacing.md} 0;
  line-height: 1.5;
  max-width: 440px;
`,l=o.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: ${({theme:t})=>t.spacing.md};
`;export{a as S,c as a,r as b,d as c,l as d};
