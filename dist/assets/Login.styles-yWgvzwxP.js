import{g as t}from"./index-8F0JLEEw.js";const r=""+new URL("design-destiny-CX89TKSa.png",import.meta.url).href,e=""+new URL("login-bg-DEM_hlSl.jpg",import.meta.url).href,n=t.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: ${({theme:o})=>o.colors.surface};

  @media (max-width: 959px) {
    flex-direction: column;
  }
`,a=t.div`
  flex: 1;
  min-height: 100vh;
  background-image: url(${e});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 24px 24px 24px;
  position: relative;

  @media (max-width: 959px) {
    min-height: 320px;
    flex: none;
    padding: 40px 20px 20px 20px;
  }
`,d=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 400px;
  margin-top: 60px;
`,p=t.span`
  font-size: 14px;
  font-weight: 400;
  color: #64748b;
  margin-bottom: 12px;
  letter-spacing: -0.01em;
`,s=t.img`
  height: 100px;
  width: auto;
  object-fit: contain;

  @media (max-width: 959px) {
    height: 48px;
  }
`,c=t.div`
  flex: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 24px 24px 24px;
  background-color: ${({theme:o})=>o.colors.surface};
  overflow-y: auto;

  @media (max-width: 959px) {
    min-height: auto;
    padding: 32px 16px 24px 16px;
  }
`,x=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 450px;
  margin: auto 0;
`,l=t.img`
  height: 56px;
  width: auto;
  object-fit: contain;
  margin-bottom: 36px;

  @media (max-width: 959px) {
    height: 46px;
    margin-bottom: 24px;
  }
`,g=t.div`
  width: 100%;
  background-color: ${({theme:o})=>o.colors.surface};
  border-radius: ${({theme:o})=>o.borderRadius.md};
  border: 1px solid ${({theme:o})=>o.colors.border};
  padding: 36px 32px 28px 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);

  @media (max-width: 480px) {
    padding: 24px 20px 20px 20px;
  }
`,m=t.div`
  margin-bottom: 24px;
`,h=t.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${({theme:o})=>o.colors.text};
  margin: 0 0 6px 0;
`,u=t.p`
  font-size: 12px;
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
`,f=t.form`
  display: flex;
  flex-direction: column;
`,b=t.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`,w=t.button`
  background: none;
  border: none;
  color: ${({theme:o})=>o.colors.primary};
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
  margin-top: 16px;
  text-align: center;
  width: 100%;
  transition: opacity ${({theme:o})=>o.transition.fast};

  &:hover {
    color: ${({theme:o})=>o.colors.primaryHover};
    text-decoration: underline;
  }
`,y=t.details`
  width: 100%;
  margin-top: 24px;
  background-color: ${({theme:o})=>o.colors.primaryLight};
  border: 1px solid ${({theme:o})=>o.colors.primaryMuted};
  border-radius: ${({theme:o})=>o.borderRadius.md};
  padding: 12px;

  summary {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${({theme:o})=>o.colors.primary};
    cursor: pointer;
    user-select: none;
    outline: none;
  }
`,$=t.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 10px;
`,v=t.div`
  background-color: ${({theme:o})=>o.colors.dangerLight};
  border: 1px solid ${({theme:o})=>o.colors.danger};
  border-radius: ${({theme:o})=>o.borderRadius.md};
  padding: 12px;
  margin-bottom: 16px;
  font-size: 13px;
  color: ${({theme:o})=>o.colors.danger};
`,L=t.footer`
  font-size: 13px;
  color: ${({theme:o})=>o.colors.textMuted};
  text-align: center;
  padding-top: 24px;
  margin-top: 16px;
`;export{d as B,x as C,s as D,v as E,b as F,l as K,n as L,c as R,a,p as b,g as c,r as d,m as e,h as f,u as g,f as h,w as i,y as j,$ as k,L as l};
