import{g as r}from"./index-B52Ksvv0.js";const i=r.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`,a=r.div`
  background: linear-gradient(180deg, ${({theme:o})=>o.colors.surface} 0%, #FAFAFF 100%);
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: 4px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  @media (max-width: 768px) {
    padding: 20px;
    gap: 24px;
  }
`,n=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({theme:o})=>o.colors.border};
`,s=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
`,d=r.button`
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
`;r.div`
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
`;const l=r.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
  letter-spacing: -0.3px;

  @media (max-width: 640px) {
    font-size: 20px;
  }
`,p=r.h2`
  font-size: 15px;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.primary};
  margin: 0;
`,c=r.p`
  font-size: 13px;
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
`,x=r.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,g=r.div`
  background: ${({$gradient:o})=>o};
  border: 1px solid ${({$borderColor:o})=>o};
  border-radius: 4px;
  padding: 20px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  }
`,f=r.div`
  width: 46px;
  height: 46px;
  border-radius: 4px;
  background-color: ${({$bg:o})=>o};
  color: ${({$color:o})=>o};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,m=r.div`
  display: flex;
  flex-direction: column;
`,b=r.span`
  font-size: 24px;
  font-weight: 800;
  line-height: 1.1;
  color: ${({$color:o})=>o};
`,u=r.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.textSecondary};
  margin-top: 2px;
`,h=r.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,w=r.div`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${({theme:o})=>o.colors.primaryLight};
  color: ${({$color:o,theme:e})=>o||e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,y=r.h3`
  font-size: 17px;
  font-weight: 700;
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
`,$=r.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
  }
`,v=r.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:o})=>o.colors.primary};
    box-shadow: 0 4px 16px rgba(93, 35, 132, 0.06);
    transform: translateY(-2px);
  }
`,k=r.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,F=r.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: ${({$bg:o})=>o};
  color: ${({$color:o})=>o};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
  flex-shrink: 0;
`,z=r.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({theme:o})=>o.colors.text};
`,S=r.span`
  font-size: 13px;
  color: ${({theme:o})=>o.colors.textSecondary};
  line-height: 1.55;
`,B=r.div`
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-left: 4px solid ${({theme:o})=>o.colors.primary};
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`,C=r.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,T=r.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14.5px;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.text};
  line-height: 1.5;

  svg {
    margin-top: 2px;
    flex-shrink: 0;
    color: #5D2384;
  }
`,j=r.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,E=r.div`
  display: flex;
  gap: 14px;
  padding: 18px 20px;
  border: 1px solid #FDE68A;
  border-left: 4px solid #D97706;
  border-radius: 4px;
  background-color: #FFFBEB;
  box-shadow: 0 2px 8px rgba(217, 119, 6, 0.04);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(217, 119, 6, 0.08);
  }
`,I=r.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: #FEF3C7;
  color: #D97706;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,D=r.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,R=r.span`
  font-size: 15px;
  font-weight: 700;
  color: #78350F;
`,L=r.span`
  font-size: 13px;
  color: #92400E;
  line-height: 1.5;
`,G=r.div`
  background: linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%);
  border: 1px solid #E9D5FF;
  border-left: 4px solid ${({theme:o})=>o.colors.primary};
  border-radius: 4px;
  padding: 24px;
  color: ${({theme:o})=>o.colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`,N=r.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({theme:o})=>o.colors.primary};
  margin: 0;
  letter-spacing: -0.2px;
`,A=r.p`
  font-size: 14px;
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`,H=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-top: 12px;

  @media (max-width: 640px) {
    width: 100%;

    button {
      min-width: 0 !important;
      width: 100% !important;
    }
  }
`,O=r.span`
  font-size: 13px;
  color: ${({theme:o})=>o.colors.textSecondary};
  font-weight: 500;
  text-align: center;
`,W=r.div`
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: 4px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,P=r.div`
  background: linear-gradient(135deg, ${({theme:o})=>o.colors.primary} 0%, #2563EB 100%);
  padding: ${({theme:o})=>o.spacing.lg} ${({theme:o})=>o.spacing.xl};
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: ${({theme:o})=>o.spacing.sm};

  @media (max-width: 640px) {
    padding: 16px;
  }
`,Y=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({theme:o})=>o.fontSize.sm};
  font-weight: ${({theme:o})=>o.fontWeight.semibold};
  letter-spacing: 0.5px;
  text-transform: uppercase;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    font-size: 12px;
  }
`,M=r.div`
  width: 100%;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  overflow: hidden;
`,Q=r.div`
  height: 100%;
  width: ${({$percent:o})=>o}%;
  background-color: #ffffff;
  border-radius: 4px;
  transition: width 0.3s ease;
`,q=r.div`
  padding: ${({theme:o})=>o.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media (max-width: 640px) {
    padding: 16px;
    gap: 18px;
  }
`,J=r.div`
  background-color: ${({theme:o})=>o.colors.background};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 640px) {
    padding: 16px;
    gap: 12px;
  }
`,K=r.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
  line-height: 1.45;
`;r.p`
  font-size: 13px;
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
`;const U=r.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,V=r.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 4px;
  border: 1px solid ${({theme:o})=>o.colors.border};
  background-color: ${({theme:o})=>o.colors.surface};
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;

  @media (max-width: 640px) {
    padding: 12px;
    gap: 10px;

    &[style*="alignItems: 'center'"],
    &[style*="align-items: center"] {
      align-items: flex-start !important;
    }
  }

  &:hover {
    border-color: ${({theme:o})=>o.colors.primary};
    background-color: ${({theme:o})=>o.colors.primaryLight};
  }

  input[type='radio'],
  input[type='checkbox'] {
    accent-color: ${({theme:o})=>o.colors.primary};
    margin-top: 3px;
    flex-shrink: 0;
  }
`,X=r.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`,Z=r.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    width: 100%;

    input {
      width: 100% !important;
      min-width: 0 !important;
    }
  }
`,_=r.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({theme:o})=>o.colors.text};
  white-space: normal;
  word-break: break-word;
  flex-shrink: 0;
`,oo=r.input`
  width: 100%;
  min-width: 0;
  padding: 10px 14px;
  border-radius: 4px;
  border: 1px solid ${({theme:o})=>o.colors.border};
  background-color: ${({theme:o})=>o.colors.surface};
  font-size: 14px;
  color: ${({theme:o})=>o.colors.text};
  transition: border-color 0.2s ease;

  @media (max-width: 640px) {
    min-width: 0 !important;
    width: 100% !important;
  }

  &:focus {
    outline: none;
    border-color: ${({theme:o})=>o.colors.primary};
  }
`;r.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: 4px;
`;r.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th,
  td {
    padding: 12px 14px;
    border: 1px solid ${({theme:o})=>o.colors.border};
    text-align: left;
  }

  th {
    background-color: ${({theme:o})=>o.colors.background};
    font-weight: 600;
    color: ${({theme:o})=>o.colors.text};
  }
`;const ro=r.input`
  width: 100%;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid ${({theme:o})=>o.colors.border};
  font-size: 13px;
  color: ${({theme:o})=>o.colors.text};

  &:focus {
    outline: none;
    border-color: ${({theme:o})=>o.colors.primary};
  }
`;r.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 8px;
  border-radius: 4px;
  border: 1px solid
    ${({$active:o,theme:e})=>o?e.colors.primary:e.colors.border};
  background-color: ${({$active:o,theme:e})=>o?e.colors.primaryLight:e.colors.surface};
  color: ${({$active:o,theme:e})=>o?e.colors.primary:e.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  min-width: 80px;

  &:hover {
    border-color: ${({theme:o})=>o.colors.primary};
    background-color: ${({theme:o})=>o.colors.primaryLight};
    color: ${({theme:o})=>o.colors.primary};
  }
`;r.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: ${({$active:o,theme:e})=>o?e.colors.primary:e.colors.border};
  color: ${({$active:o,theme:e})=>o?"#ffffff":e.colors.text};
  font-size: 13px;
  font-weight: 700;
`;r.span`
  font-size: 13px;
  font-weight: 500;
  line-height: 1.2;
`;r.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: 4px;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;r.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({theme:o})=>o.colors.text};
`;r.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;const eo=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:o})=>o.spacing.lg} ${({theme:o})=>o.spacing.xl};
  background-color: ${({theme:o})=>o.colors.background};
  border-top: 1px solid ${({theme:o})=>o.colors.border};

  @media (max-width: 640px) {
    padding: 16px;
    flex-direction: column-reverse;
    gap: 12px;

    button {
      width: 100% !important;
      margin-left: 0 !important;
      justify-content: center;
    }
  }
`;r.div`
  background-color: #FBF7FF;
  border: 1px solid #7E22CE;
  border-radius: 6px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;r.h3`
  font-size: 16px;
  font-weight: 700;
  color: #581C87;
  margin: 0;
  line-height: 1.4;
`;r.p`
  font-size: 14px;
  line-height: 1.55;
  color: #6B21A8;
  margin: 0;
`;r.button`
  background-color: #581C87;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #4C1D95;
  }
`;const to=r.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-top: ${({theme:o})=>o.spacing.sm};
  border: 1px solid #CBD5E1;
  border-radius: 4px;
`,io=r.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th,
  td {
    padding: 10px 14px;
    border: 1px solid #CBD5E1;

    @media (max-width: 640px) {
      padding: 8px 10px;
      font-size: 13px;
    }
  }

  th {
    background-color: #DCE7F5;
    font-weight: 700;
    color: #1E293B;
  }

  tr:nth-child(even) {
    background-color: #F8FAFC;
  }

  tr:nth-child(odd) {
    background-color: #FFFFFF;
  }
`,ao=r.span`
  font-weight: 600;
  color: #1E293B;
  font-size: 14px;
`,no=r.input`
  padding: 5px 8px;
  border-radius: 4px;
  border: 1px solid ${({theme:o})=>o.colors.border};
  background-color: ${({theme:o})=>o.colors.surface};
  font-size: 13px;
  color: ${({theme:o})=>o.colors.text};
  width: 150px;

  @media (max-width: 640px) {
    width: 100%;
  }

  &:focus {
    outline: none;
    border-color: ${({theme:o})=>o.colors.primary};
  }
`;r.div`
  background-color: #1E3A8A;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 8px 16px;
  border-radius: 4px;
  margin-bottom: 20px;
`;const so=r.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;

    input {
      width: 100% !important;
      min-width: 0 !important;
    }
  }

  label {
    font-size: 14px;
    font-weight: 600;
    color: ${({theme:o})=>o.colors.text};
    white-space: nowrap;
  }
`,lo=r.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.text};
  margin-top: 12px;
  margin-bottom: 8px;
`,po=r.input`
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid ${({theme:o})=>o.colors.border};
  background-color: ${({theme:o})=>o.colors.surface};
  font-size: 13px;
  color: ${({theme:o})=>o.colors.text};
  width: 320px;

  @media (max-width: 640px) {
    width: 100%;
  }

  &:focus {
    outline: none;
    border-color: ${({theme:o})=>o.colors.primary};
  }
`;export{U as $,N as A,A as B,H as C,n as D,O as E,i as F,j as G,a as H,P as I,Y as J,Q as K,q as L,K as M,$ as N,to as O,M as P,J as Q,G as R,x as S,io as T,ao as U,ro as V,W,no as X,so as Y,oo as Z,lo as _,s as a,V as a0,X as a1,_ as a2,po as a3,eo as a4,Z as a5,d as b,l as c,p as d,c as e,g as f,f as g,m as h,b as i,u as j,h as k,w as l,y as m,v as n,k as o,F as p,z as q,S as r,B as s,C as t,T as u,E as v,I as w,D as x,R as y,L as z};
