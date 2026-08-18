import{g as r}from"./index-8F0JLEEw.js";const i=r.div`
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
`,p=r.h2`
  font-size: 15px;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.primary};
  margin: 0;
`,l=r.p`
  font-size: 13px;
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
`,c=r.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,x=r.div`
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
`,g=r.div`
  display: flex;
  flex-direction: column;
`,m=r.span`
  font-size: 24px;
  font-weight: 800;
  line-height: 1.1;
  color: ${({$color:o})=>o};
`,b=r.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.textSecondary};
  margin-top: 2px;
`,u=r.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,h=r.div`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${({theme:o})=>o.colors.primaryLight};
  color: ${({$color:o,theme:e})=>o||e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,w=r.h3`
  font-size: 17px;
  font-weight: 700;
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
`,y=r.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
  }
`,$=r.div`
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
`,v=r.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,k=r.div`
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
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-left: 4px solid ${({theme:o})=>o.colors.primary};
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`,T=r.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,j=r.div`
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
`,C=r.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,I=r.div`
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
`,R=r.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: #fef3c7;
  color: #d97706;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,H=r.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,L=r.span`
  font-size: 15px;
  font-weight: 700;
  color: #78350f;
`,G=r.span`
  font-size: 13px;
  color: #92400e;
  line-height: 1.5;
`,N=r.div`
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
`,P=r.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({theme:o})=>o.colors.primary};
  margin: 0;
  letter-spacing: -0.2px;
`,D=r.p`
  font-size: 14px;
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`,O=r.div`
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
`,W=r.span`
  font-size: 13px;
  color: ${({theme:o})=>o.colors.textSecondary};
  font-weight: 500;
  text-align: center;
`,Y=r.div`
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: 4px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,E=r.div`
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
`,F=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`,M=r.span`
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #ffffff;
  white-space: nowrap;
`,Q=r.span`
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  white-space: nowrap;
`,q=r.div`
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 2px;
  overflow: hidden;
`,A=r.div`
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
`;const J=r.div`
  background: linear-gradient(135deg, ${({theme:o})=>o.colors.primary} 0%, #2563EB 100%);
  padding: 12px 20px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 640px) {
    padding: 8px 14px;
  }
`,K=r.div`
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
`,U=r.div`
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 2px;
  overflow: hidden;
`,V=r.div`
  height: 100%;
  width: ${({$percent:o})=>o}%;
  background-color: #ffffff;
  border-radius: 2px;
  transition: width 0.3s ease;
`,X=r.div`
  padding: ${({theme:o})=>o.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media (max-width: 640px) {
    padding: 16px;
    gap: 18px;
  }
`,Z=r.div`
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
`,_=r.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
  line-height: 1.45;
`;r.p`
  font-size: 13px;
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
`;const oo=r.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,ro=r.label`
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
`,eo=r.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`,to=r.div`
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
`,io=r.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({theme:o})=>o.colors.text};
  white-space: normal;
  word-break: break-word;
  flex-shrink: 0;
`,ao=r.input`
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
`;const no=r.input`
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
`;const so=r.div`
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
`;const po=r.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-top: ${({theme:o})=>o.spacing.sm};
  border: 1px solid #cbd5e1;
  border-radius: 4px;
`,lo=r.table`
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
`,co=r.span`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
`,xo=r.input`
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
`;const fo=r.div`
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
`,go=r.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.text};
  margin-top: 12px;
  margin-bottom: 8px;
`,mo=r.input`
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
`;export{eo as $,H as A,L as B,G as C,n as D,P as E,i as F,C as G,E as H,D as I,O as J,X as K,_ as L,po as M,y as N,lo as O,co as P,Z as Q,N as R,c as S,no as T,xo as U,fo as V,Y as W,ao as X,go as Y,oo as Z,ro as _,F as a,io as a0,mo as a1,so as a2,p as a3,l as a4,W as a5,J as a6,K as a7,U as a8,V as a9,to as aa,M as b,Q as c,q as d,A as e,a as f,s as g,d as h,x as i,f as j,g as k,m as l,b as m,u as n,h as o,w as p,$ as q,v as r,k as s,z as t,S as u,B as v,T as w,j as x,I as y,R as z};
