import{g as r}from"./index-BVWJ6WpZ.js";const i=r.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`,a=r.div`
  background: linear-gradient(180deg, ${({theme:o})=>o.colors.surface} 0%, #fafaff 100%);
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({theme:o})=>o.colors.border};
`,s=r.button`
  position: absolute;
  left: 0;
  top: calc((100% - 24px) / 2);
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
`;const d=r.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
  line-height: 36px;
  text-align: center;
  letter-spacing: -0.3px;

  @media (max-width: 640px) {
    font-size: 20px;
    line-height: 36px;
  }
`;r.h2`
  font-size: 15px;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.primary};
  margin: 0;
`;r.p`
  font-size: 13px;
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
`;const p=r.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,l=r.div`
  background: ${({$gradient:o})=>o};
  border: 1px solid ${({$borderColor:o})=>o};
  border-radius: 4px;
  padding: 20px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  }
`,c=r.div`
  width: 46px;
  height: 46px;
  border-radius: 4px;
  background-color: ${({$bg:o})=>o};
  color: ${({$color:o})=>o};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,x=r.div`
  display: flex;
  flex-direction: column;
`,f=r.span`
  font-size: 24px;
  font-weight: 800;
  line-height: 1.1;
  color: ${({$color:o})=>o};
`,g=r.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.textSecondary};
  margin-top: 2px;
`,m=r.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,b=r.div`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${({theme:o})=>o.colors.primaryLight};
  color: ${({$color:o,theme:e})=>o||e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,u=r.h3`
  font-size: 17px;
  font-weight: 700;
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
`,h=r.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
  }
`,w=r.div`
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
`,y=r.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,$=r.div`
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
`,v=r.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({theme:o})=>o.colors.text};
`,k=r.span`
  font-size: 13px;
  color: ${({theme:o})=>o.colors.textSecondary};
  line-height: 1.55;
`,z=r.div`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-left: 4px solid ${({theme:o})=>o.colors.primary};
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`,S=r.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,B=r.div`
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
    color: #5d2384;
  }
`,T=r.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,j=r.div`
  display: flex;
  gap: 14px;
  padding: 18px 20px;
  border: 1px solid #fde68a;
  border-left: 4px solid #d97706;
  border-radius: 4px;
  background-color: #fffbeb;
  box-shadow: 0 2px 8px rgba(217, 119, 6, 0.04);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(217, 119, 6, 0.08);
  }
`,C=r.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: #fef3c7;
  color: #d97706;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,I=r.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,R=r.span`
  font-size: 15px;
  font-weight: 700;
  color: #78350f;
`,H=r.span`
  font-size: 13px;
  color: #92400e;
  line-height: 1.5;
`,L=r.div`
  background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
  border: 1px solid #e9d5ff;
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
`,G=r.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({theme:o})=>o.colors.primary};
  margin: 0;
  letter-spacing: -0.2px;
`,P=r.p`
  font-size: 14px;
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`,N=r.div`
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
`,D=r.div`
  background: linear-gradient(135deg, ${({theme:o})=>o.colors.primary} 0%, #2563EB 100%);
  padding: 10px 16px;
  border-radius: 4px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 320px;
  box-shadow: 0 2px 8px rgba(93, 35, 132, 0.15);

  @media (max-width: 768px) {
    min-width: 100%;
  }
`,Y=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`,E=r.span`
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #ffffff;
  white-space: nowrap;
`,F=r.span`
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  white-space: nowrap;
`,M=r.div`
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 2px;
  overflow: hidden;
`,Q=r.div`
  height: 100%;
  width: ${({$percent:o})=>o}%;
  background-color: #ffffff;
  border-radius: 2px;
  transition: width 0.3s ease;
`;r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: ${({theme:o})=>o.colors.surface};
  border-bottom: 1px solid ${({theme:o})=>o.colors.border};
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 14px 16px;
  }
`;r.h2`
  font-size: 15px;
  font-weight: 800;
  color: ${({theme:o})=>o.colors.primary};
  letter-spacing: 0.5px;
  margin: 0;
  text-transform: uppercase;
`;const q=r.div`
  background: linear-gradient(135deg, ${({theme:o})=>o.colors.primary} 0%, #2563EB 100%);
  padding: 12px 20px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 640px) {
    padding: 8px 14px;
  }
`,A=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;

  @media (max-width: 640px) {
    font-size: 11px;
  }
`,J=r.div`
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 2px;
  overflow: hidden;
`,K=r.div`
  height: 100%;
  width: ${({$percent:o})=>o}%;
  background-color: #ffffff;
  border-radius: 2px;
  transition: width 0.3s ease;
`,U=r.div`
  padding: ${({theme:o})=>o.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media (max-width: 640px) {
    padding: 16px;
    gap: 18px;
  }
`,V=r.div`
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
`,X=r.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
  line-height: 1.45;
`;r.p`
  font-size: 13px;
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
`;const Z=r.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,_=r.label`
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
    &[style*='align-items: center'] {
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
`,oo=r.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`,ro=r.div`
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
`,eo=r.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({theme:o})=>o.colors.text};
  white-space: normal;
  word-break: break-word;
  flex-shrink: 0;
`,to=r.input`
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
`;const io=r.input`
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
`;const ao=r.div`
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
  background-color: #fbf7ff;
  border: 1px solid #7e22ce;
  border-radius: 6px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;r.h3`
  font-size: 16px;
  font-weight: 700;
  color: #581c87;
  margin: 0;
  line-height: 1.4;
`;r.p`
  font-size: 14px;
  line-height: 1.55;
  color: #6b21a8;
  margin: 0;
`;r.button`
  background-color: #581c87;
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
    background-color: #4c1d95;
  }
`;const no=r.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-top: ${({theme:o})=>o.spacing.sm};
  border: 1px solid #cbd5e1;
  border-radius: 4px;
`,so=r.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th,
  td {
    padding: 10px 14px;
    border: 1px solid #cbd5e1;

    @media (max-width: 640px) {
      padding: 8px 10px;
      font-size: 13px;
    }
  }

  th {
    background-color: #dce7f5;
    font-weight: 700;
    color: #1e293b;
  }

  tr:nth-child(even) {
    background-color: #f8fafc;
  }

  tr:nth-child(odd) {
    background-color: #ffffff;
  }
`,po=r.span`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
`,lo=r.input`
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
  background-color: #1e3a8a;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 8px 16px;
  border-radius: 4px;
  margin-bottom: 20px;
`;const co=r.div`
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
`,xo=r.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.text};
  margin-top: 12px;
  margin-bottom: 8px;
`,fo=r.input`
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
`;export{oo as $,I as A,R as B,H as C,n as D,G as E,i as F,T as G,D as H,P as I,N as J,U as K,X as L,no as M,h as N,so as O,po as P,V as Q,L as R,p as S,io as T,lo as U,co as V,W,to as X,xo as Y,Z,_,Y as a,eo as a0,fo as a1,ao as a2,O as a3,q as a4,A as a5,J as a6,K as a7,ro as a8,E as b,F as c,M as d,Q as e,a as f,s as g,d as h,l as i,c as j,x as k,f as l,g as m,m as n,b as o,u as p,w as q,y as r,$ as s,v as t,k as u,z as v,S as w,B as x,j as y,C as z};
