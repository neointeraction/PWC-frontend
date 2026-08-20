import{j as i,O as Bi,g as n,K as Se,M as Ee,P as Ae,t as fi,Q as Ui,S as Hi,T as qi,U as Ni,V as Qi,W as Oi,X as hi,Y as Ji,Z as Ki,_ as Wi,$ as Vi,I as bi,a0 as Yi,a1 as _i,a2 as Xi,a3 as Zi,a4 as yi,a5 as et,a6 as it,a7 as tt,a8 as nt,a9 as st,aa as rt,ab as ot,ac as at,ad as lt,G as ct,ae as Je,af as ji,ag as Pe,ah as Me,r as y,ai as dt,H as Ze,aj as pt,ak as ut,al as mt,am as xt,E as gt,an as ft,B as U,v as ht,ao as _,w as We,e as Ve,a as bt,c as Ke,ap as yt,aq as jt,ar as $t,l as wt}from"./index-a7zXg0JL.js";import{u as Y}from"./useQuery-o51MCdGR.js";import{u as D}from"./useMutation-DwnP0O57.js";import{P as $i}from"./PageHeader-DdaifotM.js";import"./Card.styles-MXf9i3yh.js";import{I as ce}from"./Input-CcYvfC84.js";import{S as Te}from"./Select-BAabmZ1Y.js";import"./Badge.styles-rNLOM2_m.js";import"./Checkbox-CyX2E4EW.js";import{A as Ct}from"./Table.styles-Cb89hldY.js";import{S as St,E as vt}from"./FileUpload.styles-BKXqSS7S.js";import"./Breadcrumb-CswGd06t.js";import{M as Ye}from"./Modal-HiRbBry-.js";import"./ConfirmDialog-C7PpcmZe.js";import{A as Rt}from"./AlertModal-nNCtekSL.js";import{T as N}from"./Tooltip-D_2DC_R7.js";import"./SuccessModal.styles-CmlOLHfD.js";import{m as kt,a as zt,b as Ft,c as It,d as Dt,e as Lt,f as Tt,g as Et}from"./careers.mock-BKWPm7cS.js";import"./upcomingSessions.mock-B_MecF99.js";import{C as _e}from"./Card-DKKLy9Mw.js";import{u as At,a as Pt,o as Mt,s as $e,e as Gt}from"./types-EVWly3UQ.js";import{T as wi}from"./Table-BsJCxA-K.js";import{B as de}from"./Badge-D3OjBY32.js";import"./SuccessModal-DJckJoM1.js";let q=[...Et],O=[...Tt],V=[...Lt],G=[...zt],M=[...kt],oe=[...Dt],Bt=[...It],ae=[...Ft];const j={getClusters:async e=>{if(await new Promise(s=>setTimeout(s,150)),!e)return[...q];const t=e.toLowerCase();return q.filter(s=>s.name.toLowerCase().includes(t)||s.description&&s.description.toLowerCase().includes(t))},createCluster:async e=>{await new Promise(s=>setTimeout(s,200));const t={id:`cluster-${Date.now()}`,name:e.name,description:e.description||"",industryCount:0};return q.push(t),t},updateCluster:async(e,t)=>{await new Promise(r=>setTimeout(r,200));const s=q.findIndex(r=>r.id===e);if(s===-1)throw new Error("Cluster not found");return q[s]={...q[s],...t},q[s]},deleteCluster:async e=>{await new Promise(t=>setTimeout(t,200)),q=q.filter(t=>t.id!==e)},getIndustries:async(e,t)=>{await new Promise(r=>setTimeout(r,150));let s=[...O];if(e&&(s=s.filter(r=>r.clusterName.toLowerCase()===e.toLowerCase())),t){const r=t.toLowerCase();s=s.filter(a=>a.name.toLowerCase().includes(r)||a.description&&a.description.toLowerCase().includes(r))}return s},createIndustry:async e=>{await new Promise(r=>setTimeout(r,200));const t=q.find(r=>r.name===e.clusterName),s={id:`ind-${Date.now()}`,clusterId:(t==null?void 0:t.id)||"cluster-1",clusterName:e.clusterName,name:e.name,description:e.description||"",domainCount:0};return O.push(s),s},updateIndustry:async(e,t)=>{await new Promise(r=>setTimeout(r,200));const s=O.findIndex(r=>r.id===e);if(s===-1)throw new Error("Industry not found");return O[s]={...O[s],...t},O[s]},deleteIndustry:async e=>{await new Promise(t=>setTimeout(t,200)),O=O.filter(t=>t.id!==e)},getDomains:async(e,t)=>{await new Promise(r=>setTimeout(r,150));let s=[...V];if(e&&(s=s.filter(r=>r.industryName.toLowerCase()===e.toLowerCase())),t){const r=t.toLowerCase();s=s.filter(a=>a.name.toLowerCase().includes(r))}return s},createDomain:async e=>{await new Promise(r=>setTimeout(r,200));const t=O.find(r=>r.name===e.industryName),s={id:`dom-${Date.now()}`,industryId:(t==null?void 0:t.id)||"ind-1",industryName:e.industryName,clusterName:e.clusterName,name:e.name,description:e.description||"",roleCount:0};return V.push(s),s},updateDomain:async(e,t)=>{await new Promise(r=>setTimeout(r,200));const s=V.findIndex(r=>r.id===e);if(s===-1)throw new Error("Domain not found");return V[s]={...V[s],...t},V[s]},deleteDomain:async e=>{await new Promise(t=>setTimeout(t,200)),V=V.filter(t=>t.id!==e)},getJobRoles:async(e,t)=>{await new Promise(r=>setTimeout(r,150));let s=[...G];if(e&&(s=s.filter(r=>r.domain.toLowerCase()===e.toLowerCase())),t){const r=t.toLowerCase();s=s.filter(a=>a.jobRole.toLowerCase().includes(r)||a.oneLineDescription.toLowerCase().includes(r)||a.careerCluster.toLowerCase().includes(r)||a.domain.toLowerCase().includes(r))}return s},toggleShortlist:async e=>{await new Promise(s=>setTimeout(s,150));const t=G.findIndex(s=>s.id===e);if(t===-1)throw new Error("Career role not found");return G[t]={...G[t],isShortlisted:!G[t].isShortlisted},G[t]},getEntranceExams:async()=>(await new Promise(e=>setTimeout(e,150)),[...oe]),toggleExamShortlist:async e=>{await new Promise(s=>setTimeout(s,150));const t=oe.findIndex(s=>s.id===e);if(t===-1)throw new Error("Exam not found");return oe[t]={...oe[t],isShortlisted:!oe[t].isShortlisted},oe[t]},getCourses:async()=>(await new Promise(e=>setTimeout(e,150)),[...Bt]),getInstitutions:async()=>(await new Promise(e=>setTimeout(e,150)),[...ae]),toggleInstitutionShortlist:async e=>{await new Promise(s=>setTimeout(s,150));const t=ae.findIndex(s=>s.id===e);if(t===-1)throw new Error("Institution not found");return ae[t]={...ae[t],isShortlisted:!ae[t].isShortlisted},ae[t]},getAll:async(e={})=>{await new Promise(h=>setTimeout(h,200));let t=[...G];if(e.search){const h=e.search.toLowerCase();t=t.filter(u=>u.jobRole.toLowerCase().includes(h)||(u.title?u.title.toLowerCase().includes(h):!1)||u.careerCluster.toLowerCase().includes(h)||u.domain.toLowerCase().includes(h))}if(e.status&&(t=t.filter(h=>h.status===e.status)),e.category||e.cluster){const h=e.category||e.cluster;t=t.filter(u=>u.category===h||u.careerCluster===h)}const s=e.page??1,r=e.limit??10,a=t.length,c=Math.ceil(a/r),l=(s-1)*r;return{data:t.slice(l,l+r),total:a,page:s,limit:r,totalPages:c}},getById:async e=>{await new Promise(s=>setTimeout(s,150));const t=G.find(s=>s.id===e);if(!t)throw new Error("Career not found");return{...t}},update:async(e,t)=>{await new Promise(r=>setTimeout(r,200));const s=G.findIndex(r=>r.id===e);if(s===-1)throw new Error("Career not found");return G[s]={...G[s],...t,lastUpdated:new Date().toISOString().slice(0,10)},G[s]},create:async e=>{await new Promise(a=>setTimeout(a,200));const t=e.jobRole||e.title||"New Job Role",s=e.careerCluster||e.category||"Arts, Design & Creative",r={id:`role-${Date.now()}`,jobRole:t,title:t,careerCluster:s,category:s,industry:e.industry||"Applied Arts",domain:e.domain||"Digital Arts",aiResilienceGrading:e.aiResilienceGrading||"High",aiResilienceComment:e.aiResilienceComment||"Requires strategic human creativity.",oneLineDescription:e.oneLineDescription||e.description||"Designs user experiences.",description:e.description||e.oneLineDescription||"Designs user experiences.",topCompaniesRecruiting:e.topCompaniesRecruiting||["Tech Firms","Startups"],approxSalaryRangeIndia:e.approxSalaryRangeIndia||"₹4–15 LPA",globalSalaryRange:e.globalSalaryRange||"$70k–$120k",minQual10th12thRecommendedSubjects:e.minQual10th12thRecommendedSubjects||"12th Standard Relevant Stream",minQualGradRecommendedSubjects:e.minQualGradRecommendedSubjects||"Relevant Bachelor Degree",entranceExamsUG:e.entranceExamsUG||"NID DAT, UCEED",minQualPGRecommendedSubjects:e.minQualPGRecommendedSubjects||"Relevant Master Degree",entranceExamsPG:e.entranceExamsPG||"CEED",certificationsStudents:e.certificationsStudents||"Foundation Certifications",certificationsUG:e.certificationsUG||"Professional Domain Certifications",topCoursesToStudy:e.topCoursesToStudy||"Undergraduate & Postgraduate Degree Tracks",status:e.status||"active",lastUpdated:new Date().toISOString().slice(0,10),sourceTenant:e.sourceTenant||"Super Admin",isShortlisted:!1};return G.unshift(r),r},deleteJobRole:async e=>{await new Promise(t=>setTimeout(t,200)),G=G.filter(t=>t.id!==e)},bulkCreate:async e=>{await new Promise(s=>setTimeout(s,400));const t=await Promise.all(e.map(s=>j.create(s)));return{count:t.length,careers:t}},syncUpdates:async e=>(await new Promise(t=>setTimeout(t,200)),j.update(e,{lastUpdated:new Date().toISOString().slice(0,10)})),getPendingRatifications:async()=>(await new Promise(e=>setTimeout(e,200)),M.filter(e=>e.status==="pending")),ratify:async e=>{await new Promise(s=>setTimeout(s,200));const t=M.findIndex(s=>s.id===e);if(t===-1)throw new Error("Pending ratification not found");return M[t]={...M[t],status:"ratified"},await j.create({jobRole:M[t].careerName,title:M[t].careerName,careerCluster:M[t].suggestedCategory,category:M[t].suggestedCategory,oneLineDescription:M[t].description,description:M[t].description,status:"active",sourceTenant:M[t].sourceTenant}),M[t]},rejectRatification:async e=>{await new Promise(s=>setTimeout(s,200));const t=M.findIndex(s=>s.id===e);if(t===-1)throw new Error("Pending ratification not found");return M[t]={...M[t],status:"rejected"},M[t]}},Ut=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:e})=>e.spacing.md} ${({theme:e})=>e.spacing.lg};
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  margin-bottom: ${({theme:e})=>e.spacing.lg};
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing.md};
`,Ht=n.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({theme:e})=>e.fontSize.sm};
  flex-wrap: wrap;
`,qt=n.button`
  background: none;
  border: none;
  padding: 0;
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({$active:e,theme:t})=>e?t.fontWeight.bold:t.fontWeight.medium};
  color: ${({$active:e,theme:t})=>e?t.colors.primary:t.colors.textSecondary};
  cursor: ${({$active:e})=>e?"default":"pointer"};

  &:hover {
    color: ${({theme:e,$active:t})=>t?e.colors.primary:e.colors.text};
  }
`,Nt=n.span`
  color: ${({theme:e})=>e.colors.textMuted};
  font-size: 12px;
`,Qt=n.div`
  width: 280px;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    width: 100%;
  }
`,Ot=n.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    width: 100%;
    flex-wrap: wrap;
  }
`,Jt=({steps:e,searchQuery:t,onSearchChange:s,actions:r})=>i.jsxs(Ut,{children:[i.jsx(Ht,{children:e.map((a,c)=>{const l=c===e.length-1;return i.jsxs(Bi.Fragment,{children:[i.jsx(qt,{$active:l,onClick:a.onClick,children:a.label}),!l&&i.jsx(Nt,{children:"›"})]},c)})}),i.jsxs(Ot,{children:[i.jsx(Qt,{children:i.jsx(St,{value:t,onChange:s,placeholder:"Search a career, role, exam..."})}),r]})]}),Kt=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Wt=n.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.xl}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${({theme:e})=>e.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,Vt=n.div`
  position: relative;
  background: ${({$selected:e,theme:t})=>e?`linear-gradient(135deg, ${t.colors.primary} 0%, ${t.colors.primaryHover} 100%)`:t.colors.surface};
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.text};
  border: 1px solid
    ${({$selected:e,theme:t})=>e?t.colors.primary:t.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xl};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  min-height: 140px;
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};
  box-shadow: ${({$selected:e,theme:t})=>e?"0 8px 20px -4px rgba(93, 35, 132, 0.3)":t.colors.shadow};

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    transform: translateY(-3px);
    box-shadow: 0 10px 24px -4px rgba(93, 35, 132, 0.18);

    .action-overlay {
      opacity: 1;
    }

    .arrow-icon {
      transform: translateX(4px);
    }
  }
`,Yt=n.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.sm};
`,_t=n.div`
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background-color: ${({$selected:e,theme:t})=>e?"rgba(255, 255, 255, 0.18)":t.colors.primaryLight};
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all ${({theme:e})=>e.transition.fast};
`,Xt=n.div`
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity ${({theme:e})=>e.transition.fast};
`,ei=n.button`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid
    ${({$selected:e,theme:t})=>e?"rgba(255,255,255,0.3)":t.colors.border};
  background-color: ${({$selected:e,theme:t})=>e?"rgba(255,255,255,0.15)":t.colors.surface};
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,Zt=n.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,en=n.h3`
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.text};
  line-height: 1.35;
  margin: 0;
`,tn=n.p`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({$selected:e,theme:t})=>e?"rgba(255, 255, 255, 0.85)":t.colors.textSecondary};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,nn=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({theme:e})=>e.spacing.xs};
  border-top: 1px solid
    ${({$selected:e,theme:t})=>e?"rgba(255, 255, 255, 0.15)":t.colors.border};
`,sn=n.span`
  font-size: 11px;
  font-weight: 700;
  color: ${({$selected:e,theme:t})=>e?"#E5C158":t.colors.primary};
  background-color: ${({$selected:e,theme:t})=>e?"rgba(229, 193, 88, 0.15)":t.colors.primaryLight};
  padding: 3px 8px;
  border-radius: 4px;
`,rn=n.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: 600;
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 2px;
`,on=e=>{const t=e.toLowerCase();return t.includes("art")||t.includes("creative")||t.includes("design")?i.jsx(fi,{size:22}):t.includes("aviation")?i.jsx(Ui,{size:22}):t.includes("business")||t.includes("management")||t.includes("sales")?i.jsx(Hi,{size:22}):t.includes("engineering")?i.jsx(qi,{size:22}):t.includes("finance")?i.jsx(Ni,{size:22}):t.includes("food")||t.includes("agriculture")?i.jsx(Qi,{size:22}):t.includes("health")||t.includes("wellness")?i.jsx(Oi,{size:22}):t.includes("information")||t.includes("technology")||t.includes("digital")?i.jsx(hi,{size:22}):t.includes("law")||t.includes("governance")?i.jsx(Ji,{size:22}):t.includes("logistics")||t.includes("maritime")?i.jsx(Ki,{size:22}):t.includes("media")||t.includes("entertainment")?i.jsx(Wi,{size:22}):t.includes("stem")?i.jsx(Vi,{size:22}):t.includes("social")||t.includes("education")?i.jsx(bi,{size:22}):i.jsx(Yi,{size:22})},an=({clusters:e,selectedClusterName:t,onSelectCluster:s,onEditCluster:r,onDeleteCluster:a})=>i.jsx(Kt,{children:i.jsx(Wt,{children:e.map(c=>{const l=c.name===t;return i.jsxs(Vt,{$selected:l,onClick:()=>s(c),children:[i.jsxs(Yt,{children:[i.jsx(_t,{$selected:l,children:on(c.name)}),(r||a)&&i.jsxs(Xt,{className:"action-overlay",onClick:h=>h.stopPropagation(),children:[r&&i.jsx(N,{content:"Edit Cluster",children:i.jsx(ei,{$selected:l,onClick:()=>r(c),"aria-label":"Edit cluster",children:i.jsx(Se,{size:16})})}),a&&i.jsx(N,{content:"Delete Cluster",children:i.jsx(ei,{$selected:l,onClick:()=>a(c),"aria-label":"Delete cluster",children:i.jsx(Ee,{size:16})})})]})]}),i.jsxs(Zt,{children:[i.jsx(en,{$selected:l,children:c.name}),c.description&&i.jsx(tn,{$selected:l,children:c.description})]}),i.jsxs(nn,{$selected:l,children:[i.jsxs(sn,{$selected:l,children:[c.industryCount||3," Industries"]}),i.jsxs(rn,{$selected:l,children:["Explore ",i.jsx(Ae,{size:16,className:"arrow-icon"})]})]})]},c.id)})})}),ln=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,cn=n.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,dn=n.div`
  position: relative;
  background: ${({$selected:e,theme:t})=>e?`linear-gradient(135deg, ${t.colors.primary} 0%, ${t.colors.primaryHover} 100%)`:t.colors.surface};
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.text};
  border: 1px solid
    ${({$selected:e,theme:t})=>e?t.colors.primary:t.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xl};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  min-height: 150px;
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};
  box-shadow: ${({$selected:e,theme:t})=>e?"0 8px 20px -4px rgba(93, 35, 132, 0.3)":t.colors.shadow};

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    transform: translateY(-3px);
    box-shadow: 0 10px 24px -4px rgba(93, 35, 132, 0.18);

    .action-overlay {
      opacity: 1;
    }

    .arrow-icon {
      transform: translateX(4px);
    }
  }
`,pn=n.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.sm};
`,un=n.div`
  width: 44px;
  height: 44px;
  border-radius: 4px;
  background-color: ${({$selected:e,theme:t})=>e?"rgba(255, 255, 255, 0.18)":t.colors.primaryLight};
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,mn=n.div`
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity ${({theme:e})=>e.transition.fast};
`,ii=n.button`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid
    ${({$selected:e,theme:t})=>e?"rgba(255,255,255,0.3)":t.colors.border};
  background-color: ${({$selected:e,theme:t})=>e?"rgba(255,255,255,0.15)":t.colors.surface};
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,xn=n.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,gn=n.h3`
  font-size: ${({theme:e})=>e.fontSize.lg};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.text};
  line-height: 1.3;
  margin: 0;
`,fn=n.p`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({$selected:e,theme:t})=>e?"rgba(255, 255, 255, 0.85)":t.colors.textSecondary};
  margin: 0;
`,hn=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({theme:e})=>e.spacing.xs};
  border-top: 1px solid
    ${({$selected:e,theme:t})=>e?"rgba(255, 255, 255, 0.15)":t.colors.border};
`,bn=n.span`
  font-size: 11px;
  font-weight: 700;
  color: ${({$selected:e,theme:t})=>e?"#E5C158":t.colors.primary};
  background-color: ${({$selected:e,theme:t})=>e?"rgba(229, 193, 88, 0.15)":t.colors.primaryLight};
  padding: 3px 8px;
  border-radius: 4px;
`,yn=n.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: 600;
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 2px;
`,jn=e=>{const t=e.toLowerCase();return t.includes("applied")?i.jsx(_i,{size:24}):t.includes("animation")||t.includes("design")?i.jsx(Xi,{size:24}):t.includes("performing")?i.jsx(Zi,{size:24}):i.jsx(yi,{size:24})},$n=({industries:e,selectedIndustryName:t,onSelectIndustry:s,onEditIndustry:r,onDeleteIndustry:a})=>i.jsx(ln,{children:i.jsx(cn,{children:e.map(c=>{const l=c.name===t;return i.jsxs(dn,{$selected:l,onClick:()=>s(c),children:[i.jsxs(pn,{children:[i.jsx(un,{$selected:l,children:jn(c.name)}),(r||a)&&i.jsxs(mn,{className:"action-overlay",onClick:h=>h.stopPropagation(),children:[r&&i.jsx(N,{content:"Edit Industry",children:i.jsx(ii,{$selected:l,onClick:()=>r(c),"aria-label":"Edit industry",children:i.jsx(Se,{size:16})})}),a&&i.jsx(N,{content:"Delete Industry",children:i.jsx(ii,{$selected:l,onClick:()=>a(c),"aria-label":"Delete industry",children:i.jsx(Ee,{size:16})})})]})]}),i.jsxs(xn,{children:[i.jsx(gn,{$selected:l,children:c.name}),c.description&&i.jsx(fn,{$selected:l,children:c.description})]}),i.jsxs(hn,{$selected:l,children:[i.jsxs(bn,{$selected:l,children:[c.domainCount||11," Domains"]}),i.jsxs(yn,{$selected:l,children:["Explore ",i.jsx(Ae,{size:16,className:"arrow-icon"})]})]})]},c.id)})})}),wn=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Cn=n.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,Sn=n.div`
  position: relative;
  background: ${({$selected:e,theme:t})=>e?`linear-gradient(135deg, ${t.colors.primary} 0%, ${t.colors.primaryHover} 100%)`:t.colors.surface};
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.text};
  border: 1px solid
    ${({$selected:e,theme:t})=>e?t.colors.primary:t.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.lg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  min-height: 120px;
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};
  box-shadow: ${({$selected:e,theme:t})=>e?"0 8px 20px -4px rgba(93, 35, 132, 0.3)":t.colors.shadow};

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    transform: translateY(-3px);
    box-shadow: 0 10px 24px -4px rgba(93, 35, 132, 0.18);

    .action-overlay {
      opacity: 1;
    }

    .arrow-icon {
      transform: translateX(4px);
    }
  }
`,vn=n.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.sm};
`,Rn=n.div`
  width: 38px;
  height: 38px;
  border-radius: 4px;
  background-color: ${({$selected:e,theme:t})=>e?"rgba(255, 255, 255, 0.18)":t.colors.primaryLight};
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,kn=n.div`
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity ${({theme:e})=>e.transition.fast};
`,ti=n.button`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid
    ${({$selected:e,theme:t})=>e?"rgba(255,255,255,0.3)":t.colors.border};
  background-color: ${({$selected:e,theme:t})=>e?"rgba(255,255,255,0.15)":t.colors.surface};
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,zn=n.h3`
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.text};
  line-height: 1.3;
  margin: 0;
`,Fn=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({theme:e})=>e.spacing.xs};
  border-top: 1px solid
    ${({$selected:e,theme:t})=>e?"rgba(255, 255, 255, 0.15)":t.colors.border};
`,In=n.span`
  font-size: 11px;
  font-weight: 700;
  color: ${({$selected:e,theme:t})=>e?"#E5C158":t.colors.primary};
  background-color: ${({$selected:e,theme:t})=>e?"rgba(229, 193, 88, 0.15)":t.colors.primaryLight};
  padding: 3px 8px;
  border-radius: 4px;
`,Dn=n.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: 600;
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 2px;
`,Ln=e=>{const t=e.toLowerCase();return t.includes("animation")?i.jsx(et,{size:20}):t.includes("applied arts")?i.jsx(fi,{size:20}):t.includes("design")?i.jsx(it,{size:20}):t.includes("craft")?i.jsx(tt,{size:20}):t.includes("curation")?i.jsx(nt,{size:20}):t.includes("digital")?i.jsx(hi,{size:20}):t.includes("fashion")||t.includes("lifestyle")?i.jsx(st,{size:20}):t.includes("future")?i.jsx(rt,{size:20}):t.includes("performing")?i.jsx(ot,{size:20}):t.includes("photo")||t.includes("video")?i.jsx(at,{size:20}):t.includes("visual")?i.jsx(lt,{size:20}):i.jsx(yi,{size:20})},Tn=({domains:e,selectedDomainName:t,onSelectDomain:s,onEditDomain:r,onDeleteDomain:a})=>i.jsx(wn,{children:i.jsx(Cn,{children:e.map(c=>{const l=c.name===t;return i.jsxs(Sn,{$selected:l,onClick:()=>s(c),children:[i.jsxs(vn,{children:[i.jsx(Rn,{$selected:l,children:Ln(c.name)}),(r||a)&&i.jsxs(kn,{className:"action-overlay",onClick:h=>h.stopPropagation(),children:[r&&i.jsx(N,{content:"Edit Domain",children:i.jsx(ti,{$selected:l,onClick:()=>r(c),"aria-label":"Edit domain",children:i.jsx(Se,{size:16})})}),a&&i.jsx(N,{content:"Delete Domain",children:i.jsx(ti,{$selected:l,onClick:()=>a(c),"aria-label":"Delete domain",children:i.jsx(Ee,{size:16})})})]})]}),i.jsx(zn,{$selected:l,children:c.name}),i.jsxs(Fn,{$selected:l,children:[i.jsxs(In,{$selected:l,children:[c.roleCount||3," Job Roles"]}),i.jsxs(Dn,{$selected:l,children:["Explore ",i.jsx(Ae,{size:16,className:"arrow-icon"})]})]})]},c.id)})})}),En=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,An=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,Pn=n.div`
  position: relative;
  background: ${({$selected:e,theme:t})=>e?`linear-gradient(135deg, ${t.colors.primary} 0%, ${t.colors.primaryHover} 100%)`:t.colors.surface};
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.text};
  border: 1px solid
    ${({$selected:e,theme:t})=>e?t.colors.primary:t.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.lg};
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};
  box-shadow: ${({$selected:e,theme:t})=>e?"0 8px 20px -4px rgba(93, 35, 132, 0.3)":t.colors.shadow};

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    transform: translateY(-3px);
    box-shadow: 0 10px 24px -4px rgba(93, 35, 132, 0.18);

    .action-overlay {
      opacity: 1;
    }

    .open-btn {
      transform: translateX(4px);
    }
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`,Mn=n.div`
  display: flex;
  align-items: flex-start;
  gap: ${({theme:e})=>e.spacing.md};
`,Gn=n.div`
  width: 44px;
  height: 44px;
  border-radius: 4px;
  background-color: ${({$selected:e,theme:t})=>e?"rgba(255, 255, 255, 0.18)":t.colors.primaryLight};
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,Bn=n.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Un=n.h2`
  font-size: 19px;
  font-weight: 700;
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.text};
  margin: 0;
`,Hn=n.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({$selected:e,theme:t})=>e?"rgba(255, 255, 255, 0.85)":t.colors.textSecondary};
  margin: 0;
`,qn=n.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  flex-wrap: wrap;
`,ni=n.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  color: ${({$selected:e,theme:t})=>e?"#E5C158":t.colors.primary};
  background-color: ${({$selected:e,theme:t})=>e?"rgba(229, 193, 88, 0.15)":t.colors.primaryLight};
  padding: 3px 10px;
  border-radius: 4px;
`,Nn=n.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    width: 100%;
    justify-content: space-between;
  }
`,Qn=n.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({$selected:e})=>e?"#E5C158":"#C49419"};
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  transition: transform ${({theme:e})=>e.transition.fast};
`,On=n.div`
  display: flex;
  gap: 6px;
  opacity: 0;
  transition: opacity ${({theme:e})=>e.transition.fast};
`,si=n.button`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid
    ${({$selected:e,theme:t})=>e?"rgba(255,255,255,0.3)":t.colors.border};
  background-color: ${({$selected:e,theme:t})=>e?"rgba(255,255,255,0.15)":t.colors.surface};
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,Jn=({roles:e,selectedRoleId:t,onSelectRole:s,onEditRole:r,onDeleteRole:a})=>i.jsx(En,{children:i.jsx(An,{children:e.map(c=>{const l=c.id===t;return i.jsxs(Pn,{$selected:l,onClick:()=>s(c),children:[i.jsxs(Mn,{children:[i.jsx(Gn,{$selected:l,children:i.jsx(ct,{size:24})}),i.jsxs(Bn,{children:[i.jsx(Un,{$selected:l,children:c.jobRole}),i.jsx(Hn,{$selected:l,children:c.oneLineDescription}),i.jsxs(qn,{children:[i.jsxs(ni,{$selected:l,children:[i.jsx(Je,{size:13})," AI Resilience:"," ",c.aiResilienceGrading||"High"]}),i.jsxs(ni,{$selected:l,children:[i.jsx(ji,{size:13})," ",c.approxSalaryRangeIndia||"₹4–15 LPA"]})]})]})]}),i.jsxs(Nn,{children:[(r||a)&&i.jsxs(On,{className:"action-overlay",onClick:h=>h.stopPropagation(),children:[r&&i.jsx(N,{content:"Edit Job Role",children:i.jsx(si,{$selected:l,onClick:()=>r(c),"aria-label":"Edit job role",children:i.jsx(Se,{size:16})})}),a&&i.jsx(N,{content:"Delete Job Role",children:i.jsx(si,{$selected:l,onClick:()=>a(c),"aria-label":"Delete job role",children:i.jsx(Ee,{size:16})})})]}),i.jsxs(Qn,{$selected:l,className:"open-btn",children:["Open profile ",i.jsx(Ae,{size:18})]})]})]},c.id)})})}),Kn=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.xl};
`,Wn=n.div`
  background-color: #f7f5fc;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xxl};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.xl};
  position: relative;
`,Vn=n.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 ${({theme:e})=>e.spacing.xl};

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 3px;
    background-color: ${({theme:e})=>e.colors.primary};
    transform: translateY(-50%);
    z-index: 1;
  }
`,Ue=n.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({theme:e})=>e.colors.primary};
  border: 4px solid #f7f5fc;
  z-index: 2;
  position: relative;
`,Yn=n.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`,He=n.div`
  background-color: #ece8f6;
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: 8px;
`,qe=n.span`
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #c49419;
`,Ne=n.h4`
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,Qe=n.p`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
`,_n=n.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`,ri=n(_e)`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,oi=n.h4`
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin-bottom: ${({theme:e})=>e.spacing.sm};
`,ai=n.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`,ie=n.span`
  background-color: #ece8f6;
  color: ${({theme:e})=>e.colors.text};
  border-radius: 20px;
  padding: 8px 18px;
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: 600;
`,Xn=({role:e})=>i.jsxs(Kn,{children:[i.jsxs(Wn,{children:[i.jsxs(Vn,{children:[i.jsx(Ue,{}),i.jsx(Ue,{}),i.jsx(Ue,{})]}),i.jsxs(Yn,{children:[i.jsxs(He,{children:[i.jsx(qe,{children:"10+2"}),i.jsx(Ne,{children:"12th — Any stream"}),i.jsx(Qe,{children:e.minQual10th12thRecommendedSubjects||"12th Standard Fine Arts / Computer Application"})]}),i.jsxs(He,{children:[i.jsx(qe,{children:"GRADUATE"}),i.jsx(Ne,{children:"BDes / BFA / Relevant Degree"}),i.jsx(Qe,{children:"Recommended focus: UI/UX Design & Digital Arts"})]}),i.jsxs(He,{children:[i.jsx(qe,{children:"POST-GRADUATE"}),i.jsx(Ne,{children:"MDes, MFA, Design Management"}),i.jsx(Qe,{children:"Advanced Human-Computer Interaction"})]})]})]}),i.jsxs(_n,{children:[i.jsxs(ri,{children:[i.jsx(oi,{children:"Certifications — Student Level"}),i.jsxs(ai,{children:[i.jsx(ie,{children:"Adobe Photoshop Skills"}),i.jsx(ie,{children:"Canva Design Mastery"}),i.jsx(ie,{children:"Graphic Design Fundamentals"})]})]}),i.jsxs(ri,{children:[i.jsx(oi,{children:"Certifications — Undergraduate Level"}),i.jsxs(ai,{children:[i.jsx(ie,{children:"Adobe Certified Professional"}),i.jsx(ie,{children:"UI/UX Design Specialization"}),i.jsx(ie,{children:"Motion Graphics & After Effects"}),i.jsx(ie,{children:"UX Tools"})]})]})]})]}),Zn=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,li=n.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  font-style: italic;
  margin: 0;
`,es=n.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,is=n.div`
  background-color: #ffffff;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: ${({theme:e})=>e.colors.shadow};
`,ts=n.div`
  background-color: #ece8f6;
  padding: ${({theme:e})=>e.spacing.md} ${({theme:e})=>e.spacing.lg};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
`,ns=n.h3`
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: 700;
  color: ${({theme:e})=>e.colors.primary};
  margin: 0;

  span {
    font-weight: 500;
    font-size: ${({theme:e})=>e.fontSize.xs};
    color: ${({theme:e})=>e.colors.textSecondary};
  }
`,ss=n.div`
  padding: ${({theme:e})=>e.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.text};
`,le=n.div`
  line-height: 1.4;

  strong {
    color: ${({theme:e})=>e.colors.text};
    font-weight: 700;
  }
`,rs=n.a`
  color: ${({theme:e})=>e.colors.primary};
  text-decoration: none;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
`,os=n.div`
  padding: ${({theme:e})=>e.spacing.md} ${({theme:e})=>e.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.sm};
  border-top: 1px solid ${({theme:e})=>e.colors.border};
  background-color: #faf9fd;
`,as=n.span`
  font-size: 11px;
  color: ${({theme:e})=>e.colors.textMuted};
  font-style: italic;
`,ls=n.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  border: none;
  background-color: ${({$shortlisted:e})=>e?"#C49419":"#D99F26"};
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all ${({theme:e})=>e.transition.fast};

  &:hover {
    background-color: #b38510;
  }
`,cs=({exams:e,onToggleShortlist:t})=>i.jsxs(Zn,{children:[i.jsx(li,{children:"Graduation-level: CUET (National) / University-specific UG entrance tests (DUET, IPU CET etc.)"}),i.jsx(es,{children:e.map(s=>i.jsxs(is,{children:[i.jsxs("div",{children:[i.jsx(ts,{children:i.jsxs(ns,{children:[s.name," ",i.jsxs("span",{children:["- ",s.fullTitle]})]})}),i.jsxs(ss,{children:[i.jsxs(le,{children:[i.jsx("strong",{children:"Conducted by:"})," ",s.conductedBy]}),i.jsxs(le,{children:[i.jsx("strong",{children:"Mode:"})," ",s.mode]}),i.jsxs(le,{children:[i.jsx("strong",{children:"Frequency:"})," ",s.frequency]}),i.jsxs(le,{children:[i.jsx("strong",{children:"Applicable For:"})," ",s.applicableFor]}),i.jsxs(le,{children:[i.jsx("strong",{children:"12th Requirement:"})," ",s.requirement12th]}),i.jsxs(le,{children:[i.jsx("strong",{children:"Website:"})," ",i.jsx(rs,{href:s.website,target:"_blank",rel:"noopener noreferrer",children:s.website})]})]})]}),i.jsxs(os,{children:[i.jsx(as,{children:s.datesText||"Standard Exam Window"}),i.jsxs(ls,{$shortlisted:s.isShortlisted,onClick:()=>t(s.id),children:[s.isShortlisted?i.jsx(Pe,{size:14}):i.jsx(Me,{size:14}),s.isShortlisted?"Shortlisted":"Save to shortlist"]})]})]},s.id))}),i.jsx(li,{children:"PG-level: CEED, NID M.Des, UID/University PG Entrances"})]}),ds=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,ps=n.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,us=n.div`
  background-color: #ffffff;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
  box-shadow: ${({theme:e})=>e.colors.shadow};
  min-height: 420px;
`,ms=n.div`
  background-color: ${({theme:e})=>e.colors.primary};
  color: #ffffff;
  border-radius: 20px;
  padding: 6px 20px;
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: 700;
  width: fit-content;
`,xs=n.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,gs=n.hr`
  border: none;
  border-top: 1px solid ${({theme:e})=>e.colors.border};
  margin: ${({theme:e})=>e.spacing.xs} 0;
`,fs=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
  font-size: 11px;
  color: ${({theme:e})=>e.colors.text};
  line-height: 1.5;
`,we=n.div`
  p {
    margin: 0;
  }
  strong {
    color: ${({theme:e})=>e.colors.text};
    font-weight: 700;
  }
`,hs=({courses:e})=>i.jsx(ds,{children:i.jsx(ps,{children:e.map(t=>i.jsxs(us,{children:[i.jsx(ms,{children:t.badge}),i.jsx(xs,{children:t.title}),i.jsx(gs,{}),i.jsxs(fs,{children:[i.jsx(we,{children:i.jsxs("p",{children:[i.jsx("strong",{children:"12th Stream:"})," ",t.streamRequirement]})}),i.jsx(we,{children:i.jsxs("p",{children:[i.jsx("strong",{children:"Entrance Exams:"})," ",t.entranceExams]})}),i.jsx(we,{children:i.jsxs("p",{children:[i.jsx("strong",{children:"Programs Offered:"})," ",t.programsOffered]})}),i.jsx(we,{children:i.jsxs("p",{children:[i.jsx("strong",{children:"Top Colleges:"})," ",t.topColleges]})}),i.jsx(we,{children:i.jsxs("p",{children:[i.jsx("strong",{children:"FURTHER STUDY OPTIONS:"})," ",t.furtherStudyOptions]})})]})]},t.id))})}),bs=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,ys=n.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.xl}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${({theme:e})=>e.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,js=n.div`
  background-color: #ffffff;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.lg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  box-shadow: ${({theme:e})=>e.colors.shadow};
  min-height: 440px;
`,$s=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.sm};
`,ws=n.div`
  background-color: ${({theme:e})=>e.colors.primary};
  color: #ffffff;
  border-radius: 20px;
  padding: 4px 16px;
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: 700;
  width: fit-content;
`,Cs=n.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,Ss=n.span`
  font-size: 11px;
  color: ${({theme:e})=>e.colors.textSecondary};
`,vs=n.hr`
  border: none;
  border-top: 1px solid ${({theme:e})=>e.colors.border};
  margin: 4px 0;
`,Rs=n.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 11px;
  color: ${({theme:e})=>e.colors.text};
  line-height: 1.4;
`,ke=n.div`
  strong {
    color: ${({theme:e})=>e.colors.text};
    font-weight: 700;
  }
`,ks=n.a`
  color: ${({theme:e})=>e.colors.primary};
  text-decoration: none;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
`,zs=n.div`
  display: flex;
  justify-content: flex-end;
  padding-top: ${({theme:e})=>e.spacing.sm};
`,Fs=n.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  border: none;
  background-color: ${({$shortlisted:e})=>e?"#C49419":"#D99F26"};
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all ${({theme:e})=>e.transition.fast};

  &:hover {
    background-color: #b38510;
  }
`,Is=({institutions:e,onToggleShortlist:t})=>i.jsx(bs,{children:i.jsx(ys,{children:e.map(s=>i.jsxs(js,{children:[i.jsxs($s,{children:[i.jsx(ws,{children:s.badge}),i.jsx(Cs,{children:s.name}),i.jsx(Ss,{children:s.cityState}),i.jsx(vs,{}),i.jsxs(Rs,{children:[i.jsxs(ke,{children:[i.jsx("strong",{children:"Entrance:"})," ",s.entranceExam]}),i.jsxs(ke,{children:[i.jsx("strong",{children:"Programs Offered:"})," ",s.programsOffered]}),i.jsxs(ke,{children:[i.jsx("strong",{children:"RANKING:"})," ",s.ranking]}),i.jsxs(ke,{children:[i.jsx("strong",{children:"WEBSITE:"})," ",i.jsx(ks,{href:s.website,target:"_blank",rel:"noopener noreferrer",children:s.website})]})]})]}),i.jsx(zs,{children:i.jsxs(Fs,{$shortlisted:s.isShortlisted,onClick:()=>t(s.id),children:[s.isShortlisted?i.jsx(Pe,{size:14}):i.jsx(Me,{size:14}),s.isShortlisted?"Shortlisted":"Save to shortlist"]})})]},s.id))})}),Ds=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Ls=n.div`
  background: linear-gradient(135deg, ${({theme:e})=>e.colors.primary} 0%, ${({theme:e})=>e.colors.primaryHover} 100%);
  color: #ffffff;
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
  position: relative;
  box-shadow: 0 12px 28px -6px rgba(93, 35, 132, 0.35);
`,Ts=n.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({theme:e})=>e.spacing.md};
  flex-wrap: wrap;
`,Es=n.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,As=n.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  border-radius: 4px;
  border: none;
  background-color: ${({$shortlisted:e})=>e?"#C49419":"#D99F26"};
  color: #ffffff;
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(217, 159, 38, 0.35);
  transition: all ${({theme:e})=>e.transition.fast};

  &:hover {
    background-color: #b38510;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(217, 159, 38, 0.45);
  }
`,Ps=n.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  color: #ffffff;
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};

  &:hover {
    background-color: rgba(255, 255, 255, 0.28);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-1px);
  }
`,Ms=n.div`
  display: grid;
  grid-template-columns: 0.8fr 1fr 1fr 1.4fr;
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,ze=n.div`
  background-color: ${({$variant:e})=>e==="green"?"#E8F8EE":"#FFFFFF"};
  border: 1px solid
    ${({$variant:e})=>e==="green"?"#C2EBD0":e==="purple"?"#E2D1EE":e==="blue"?"#DBEAFE":"#E2E8F0"};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.md} ${({theme:e})=>e.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  transition: all ${({theme:e})=>e.transition.fast};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
`,Fe=n.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,Ie=n.span`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({$variant:e,theme:t})=>e==="green"?"#1E7E48":e==="purple"?t.colors.primary:e==="blue"?"#1D4ED8":t.colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,De=n.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({$variant:e,theme:t})=>e==="green"?"#135930":t.colors.text};
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Gs=n.div`
  background-color: #e8f8ee;
  border: 1px solid #c2ebd0;
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.md} ${({theme:e})=>e.spacing.lg};
  color: #135930;
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`,Bs=n.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing.xl};
  align-items: flex-start;
  margin-top: ${({theme:e})=>e.spacing.xs};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
  }
`,Us=n.div`
  position: sticky;
  top: ${({theme:e})=>e.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.xs};
  width: 240px;
  flex-shrink: 0;
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.sm};
  box-shadow: ${({theme:e})=>e.colors.shadow};
  z-index: 5;

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    position: static;
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
  }
`,Ce=n.button`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  padding: ${({theme:e})=>e.spacing.md} ${({theme:e})=>e.spacing.lg};
  border-radius: 4px;
  border: none;
  border-left: 3px solid
    ${({theme:e,$active:t})=>t?e.colors.primary:"transparent"};
  background-color: ${({theme:e,$active:t})=>t?e.colors.primaryLight:"transparent"};
  color: ${({theme:e,$active:t})=>t?e.colors.primary:e.colors.textSecondary};
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: ${({theme:e,$active:t})=>t?e.fontWeight.semibold:e.fontWeight.medium};
  cursor: pointer;
  white-space: nowrap;
  transition: all ${({theme:e})=>e.transition.fast};
  text-align: left;
  width: 100%;

  &:hover {
    background-color: ${({theme:e})=>e.colors.primaryLight};
    color: ${({theme:e})=>e.colors.primary};
  }
`,Hs=n.div`
  flex: 1;
  min-width: 0;
`,qs=n.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`,ci=n(_e)`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.sm};
`,Oe=n.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  line-height: 1.5;
  margin: 0;
`,Ci=({role:e,entranceExams:t,courses:s,institutions:r,onToggleShortlist:a,onToggleExamShortlist:c,onToggleInstitutionShortlist:l,onEditRole:h})=>{const[u,b]=y.useState("overview"),$=Array.isArray(e.topCompaniesRecruiting)?e.topCompaniesRecruiting.join(", "):e.topCompaniesRecruiting||"Tech Firms, Startups";return i.jsxs(Ds,{children:[i.jsxs(Ls,{children:[i.jsx(Ts,{children:i.jsxs(Es,{children:[i.jsxs(As,{$shortlisted:e.isShortlisted,onClick:a,children:[e.isShortlisted?i.jsx(Pe,{size:16}):i.jsx(Me,{size:16}),e.isShortlisted?"Shortlisted":"Save to shortlist"]}),h&&i.jsx(N,{content:"Edit Role Specification",children:i.jsxs(Ps,{onClick:()=>h(e),children:[i.jsx(Se,{size:16})," Edit Role"]})})]})}),i.jsxs(Ms,{children:[i.jsxs(ze,{$variant:"green",children:[i.jsxs(Fe,{children:[i.jsx(Je,{size:18,color:"#1E7E48"}),i.jsx(Ie,{$variant:"green",children:"AI Resilience"})]}),i.jsx(De,{$variant:"green",children:e.aiResilienceGrading||"High"})]}),i.jsxs(ze,{$variant:"purple",children:[i.jsxs(Fe,{children:[i.jsx(ji,{size:18,color:"#5D2384"}),i.jsx(Ie,{$variant:"purple",children:"Salary (India)"})]}),i.jsx(De,{$variant:"purple",children:e.approxSalaryRangeIndia||"₹4–15 LPA"})]}),i.jsxs(ze,{$variant:"blue",children:[i.jsxs(Fe,{children:[i.jsx(dt,{size:18,color:"#1D4ED8"}),i.jsx(Ie,{$variant:"blue",children:"Salary (Global)"})]}),i.jsx(De,{$variant:"blue",children:e.globalSalaryRange||"$70k–$120k"})]}),i.jsxs(ze,{$variant:"grey",children:[i.jsxs(Fe,{children:[i.jsx(Ze,{size:18,color:"#64748B"}),i.jsx(Ie,{$variant:"grey",children:"Top Recruiters"})]}),i.jsx(N,{content:$,children:i.jsx(De,{$variant:"grey",children:$})})]})]}),i.jsxs(Gs,{children:[i.jsx(Je,{size:18}),i.jsxs("div",{children:[i.jsxs("strong",{children:['Why "',e.aiResilienceGrading||"High",'":']})," ",e.aiResilienceComment||"Centers on unique human creativity, emotional expression, and cultural nuance."]})]})]}),i.jsxs(Bs,{children:[i.jsxs(Us,{children:[i.jsxs(Ce,{$active:u==="overview",onClick:()=>b("overview"),children:[i.jsx(pt,{size:18})," Overview"]}),i.jsxs(Ce,{$active:u==="education",onClick:()=>b("education"),children:[i.jsx(bi,{size:18})," Education Path"]}),i.jsxs(Ce,{$active:u==="exams",onClick:()=>b("exams"),children:[i.jsx(ut,{size:18})," Entrance Exams"]}),i.jsxs(Ce,{$active:u==="courses",onClick:()=>b("courses"),children:[i.jsx(mt,{size:18})," Courses"]}),i.jsxs(Ce,{$active:u==="institutions",onClick:()=>b("institutions"),children:[i.jsx(Ze,{size:18})," Institutions"]})]}),i.jsxs(Hs,{children:[u==="overview"&&i.jsxs(qs,{children:[i.jsxs(ci,{title:"Role Overview & Scope",children:[i.jsx(Oe,{children:e.oneLineDescription}),i.jsx(Oe,{children:"Applied UI Designers focus on crafting intuitive digital interfaces, maintaining visual component systems, and bridging product design with frontend engineering."})]}),i.jsx(ci,{title:"Key Skill Requirements",children:i.jsxs(Oe,{children:["• Figma, Visual System Architecture, Micro-Interactions",i.jsx("br",{}),"• User Research Synthesis & Prototyping",i.jsx("br",{}),"• Responsive Design & Accessibility (WCAG Compliance)"]})})]}),u==="education"&&i.jsx(Xn,{role:e}),u==="exams"&&i.jsx(cs,{exams:t,onToggleShortlist:c}),u==="courses"&&i.jsx(hs,{courses:s}),u==="institutions"&&i.jsx(Is,{institutions:r,onToggleShortlist:l})]})]})]})},Ns=n.div`
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: ${({theme:e})=>e.spacing.xl};
  align-items: flex-start;

  @media (max-width: ${({theme:e})=>e.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`,Qs=n.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
  box-shadow: ${({theme:e})=>e.colors.shadow};
  position: sticky;
  top: 80px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
`,Os=n.h3`
  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`,Js=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.sm};
`,Ks=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.xs};
  margin-top: ${({theme:e})=>e.spacing.xs};
`,Ws=n.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,Vs=n.div`
  padding: ${({theme:e})=>e.spacing.sm} ${({theme:e})=>e.spacing.md};
  border-radius: 4px;
  border: 1px solid
    ${({$active:e,theme:t})=>e?t.colors.primary:t.colors.border};
  background-color: ${({$active:e,theme:t})=>e?t.colors.primaryLight:t.colors.surface};
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};
  display: flex;
  flex-direction: column;
  gap: 4px;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    background-color: ${({$active:e,theme:t})=>e?t.colors.primaryLight:t.colors.surfaceHover};
  }
`,Ys=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`,_s=n.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({$active:e,theme:t})=>e?t.fontWeight.bold:t.fontWeight.semibold};
  color: ${({$active:e,theme:t})=>e?t.colors.primary:t.colors.text};
`;n.p`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;const Xs=n.div`
  min-width: 0;
`,Zs=n.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xxl};
  text-align: center;
  color: ${({theme:e})=>e.colors.textSecondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({theme:e})=>e.spacing.md};
  min-height: 400px;

  h3 {
    font-size: ${({theme:e})=>e.fontSize.lg};
    font-weight: ${({theme:e})=>e.fontWeight.semibold};
    color: ${({theme:e})=>e.colors.text};
    margin: 0;
  }

  p {
    font-size: ${({theme:e})=>e.fontSize.sm};
    margin: 0;
    max-width: 400px;
  }
`,er=({clusters:e,industries:t,domains:s,roles:r,entranceExams:a,courses:c,institutions:l,onToggleShortlist:h,onToggleExamShortlist:u,onToggleInstitutionShortlist:b,onEditRole:$})=>{const[E,C]=y.useState(""),[k,L]=y.useState(""),[H,te]=y.useState(""),[J,K]=y.useState(""),[W,g]=y.useState(""),A=y.useMemo(()=>e.find(p=>p.id===k)||e[0]||null,[e,k]),S=y.useMemo(()=>{if(!A)return t;const p=t.filter(z=>z.clusterId===A.id||z.clusterName.toLowerCase()===A.name.toLowerCase());return p.length>0?p:t},[t,A]),P=y.useMemo(()=>S.find(p=>p.id===H)||S[0]||null,[S,H]),m=y.useMemo(()=>{if(!P)return s;const p=s.filter(z=>z.industryId===P.id||z.industryName.toLowerCase()===P.name.toLowerCase());return p.length>0?p:s},[s,P]),w=y.useMemo(()=>m.find(p=>p.id===J)||m[0]||null,[m,J]),x=y.useMemo(()=>{if(!w)return r;const p=r.filter(z=>z.domain.toLowerCase()===w.name.toLowerCase());return p.length>0?p:r},[r,w]),R=y.useMemo(()=>x.find(p=>p.id===W)||x[0]||null,[x,W]),I=y.useMemo(()=>e.map(p=>({value:p.id,label:p.name})),[e]),T=y.useMemo(()=>S.map(p=>({value:p.id,label:p.name})),[S]),v=y.useMemo(()=>m.map(p=>({value:p.id,label:p.name})),[m]),Q=y.useMemo(()=>{if(!E.trim())return x;const p=E.toLowerCase();return x.filter(z=>z.jobRole.toLowerCase().includes(p)||z.oneLineDescription.toLowerCase().includes(p))},[x,E]),X=p=>{L(p),te(""),K(""),g("")},Z=p=>{te(p),K(""),g("")},ee=p=>{K(p),g("")};return i.jsxs(Ns,{children:[i.jsxs(Qs,{children:[i.jsxs(Os,{children:[i.jsx(xt,{size:18})," Career Hierarchy Filters"]}),i.jsxs(Js,{children:[i.jsx(Te,{label:"Career Cluster",options:I,value:(A==null?void 0:A.id)||"",onChange:p=>X(p.target.value),placeholder:"Select Cluster"}),i.jsx(Te,{label:"Industry",options:T,value:(P==null?void 0:P.id)||"",onChange:p=>Z(p.target.value),placeholder:"Select Industry"}),i.jsx(Te,{label:"Domain",options:v,value:(w==null?void 0:w.id)||"",onChange:p=>ee(p.target.value),placeholder:"Select Domain"})]}),i.jsx(ce,{placeholder:"Filter job roles...",value:E,onChange:p=>C(p.target.value),leftIcon:i.jsx(gt,{size:16})}),i.jsxs(Ks,{children:[i.jsxs(Ws,{children:["Job Roles (",Q.length,")"]}),Q.map(p=>{const z=(R==null?void 0:R.id)===p.id;return i.jsx(Vs,{$active:z,onClick:()=>g(p.id),children:i.jsxs(Ys,{children:[i.jsx(_s,{$active:z,children:p.jobRole}),p.isShortlisted?i.jsx(Pe,{size:15,color:"#D99F26"}):i.jsx(Me,{size:15,color:"#94A3B8"})]})},p.id)}),Q.length===0&&i.jsx("p",{style:{fontSize:"13px",color:"#64748b",margin:"8px 0"},children:"No job roles match the current filter."})]})]}),i.jsx(Xs,{children:R?i.jsx(Ci,{role:R,entranceExams:a,courses:c,institutions:l,onToggleShortlist:()=>h(R.id),onToggleExamShortlist:u,onToggleInstitutionShortlist:b,onEditRole:$}):i.jsxs(Zs,{children:[i.jsx(ft,{size:48,color:"#94A3B8"}),i.jsx("h3",{children:"No Job Role Selected"}),i.jsx("p",{children:"Select a Career Cluster, Industry, Domain, and Job Role from the left panel to inspect full career pathway specs, salary metrics, entrance exams, and courses."})]})})]})},ir=n.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,tr=n.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({theme:e})=>e.spacing.sm};
  margin-top: ${({theme:e})=>e.spacing.md};
`,nr=Mt({name:$e().min(1,"Name is required"),description:$e().optional(),aiResilience:Gt(["Low","Medium","High"]).optional(),salaryIndia:$e().optional(),salaryGlobal:$e().optional(),topRecruiters:$e().optional()}),sr=({isOpen:e,onClose:t,title:s,initialValues:r,onSubmit:a,isJobRole:c,isLoading:l})=>{var k,L;const{register:h,handleSubmit:u,setValue:b,reset:$,formState:{errors:E}}=At({resolver:Pt(nr),defaultValues:{name:"",description:"",aiResilience:"High",salaryIndia:"",salaryGlobal:"",topRecruiters:""}});y.useEffect(()=>{$(r?{name:r.name||"",description:r.description||"",aiResilience:r.aiResilience||"High",salaryIndia:r.salaryIndia||"",salaryGlobal:r.salaryGlobal||"",topRecruiters:r.topRecruiters||""}:{name:"",description:"",aiResilience:"High",salaryIndia:"",salaryGlobal:"",topRecruiters:""})},[r,$,e]);const C=H=>{a(H),t()};return i.jsx(Ye,{isOpen:e,onClose:t,title:s,size:"md",children:i.jsxs(ir,{onSubmit:u(C),children:[i.jsx(ce,{label:"Title / Name",placeholder:"Enter item title...",...h("name"),error:(k=E.name)==null?void 0:k.message}),i.jsx(ce,{label:"Short Description",placeholder:"Enter short description...",...h("description"),error:(L=E.description)==null?void 0:L.message}),c&&i.jsxs(i.Fragment,{children:[i.jsx("div",{children:i.jsx(Te,{label:"AI Resilience",options:[{value:"High",label:"High"},{value:"Medium",label:"Medium"},{value:"Low",label:"Low"}],value:(r==null?void 0:r.aiResilience)||"High",onChange:H=>b("aiResilience",H.target.value)})}),i.jsx(ce,{label:"Salary (India)",placeholder:"e.g. ₹4–15 LPA",...h("salaryIndia")}),i.jsx(ce,{label:"Salary (Global)",placeholder:"e.g. $70k–$120k",...h("salaryGlobal")}),i.jsx(ce,{label:"Top Recruiters",placeholder:"e.g. Tech Firms, Startups",...h("topRecruiters")})]}),i.jsxs(tr,{children:[i.jsx(U,{variant:"secondary",onClick:t,type:"button",children:"Cancel"}),i.jsx(U,{type:"submit",isLoading:l,leftIcon:i.jsx(ht,{size:18}),children:"Save Changes"})]})]})})};function di(e){return _({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"},child:[]}]})(e)}function pi(e){return _({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"},child:[]}]})(e)}function rr(e){return _({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M5 20h14v-2H5zM19 9h-4V3H9v6H5l7 7z"},child:[]}]})(e)}function or(e){return _({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96M14 13v4h-4v-4H7l5-5 5 5z"},child:[]}]})(e)}function ar(e){return _({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm7 7V3.5L18.5 9z"},child:[]}]})(e)}function lr(e){return _({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"},child:[]}]})(e)}function Si(e){return _({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"},child:[]}]})(e)}function cr(e){return _({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M12 6a9.77 9.77 0 0 1 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5A9.77 9.77 0 0 1 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4m0 5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7"},child:[]}]})(e)}const dr=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,pr=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:e})=>e.spacing.md};
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  border: 1px solid ${({theme:e})=>e.colors.border};
`,ur=n.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  h4 {
    font-size: ${({theme:e})=>e.fontSize.sm};
    font-weight: ${({theme:e})=>e.fontWeight.semibold};
    color: ${({theme:e})=>e.colors.text};
  }

  p {
    font-size: ${({theme:e})=>e.fontSize.xs};
    color: ${({theme:e})=>e.colors.textSecondary};
  }
`,mr=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({theme:e})=>e.spacing.sm};
  padding: ${({theme:e})=>e.spacing.xl};
  border: 2px dashed
    ${({theme:e,$isDragging:t,$hasFile:s})=>t?e.colors.primary:s?e.colors.success:e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.lg};
  background-color: ${({theme:e,$isDragging:t})=>t?e.colors.primaryLight:e.colors.surface};
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};
  text-align: center;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,ui=n.div`
  font-size: 36px;
  color: ${({theme:e,$color:t})=>t||e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`,xr=n.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.text};
`,gr=n.input`
  display: none;
`,fr=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({theme:e})=>e.spacing.sm};
  margin-bottom: ${({theme:e})=>e.spacing.xs};

  h4 {
    font-size: ${({theme:e})=>e.fontSize.sm};
    font-weight: ${({theme:e})=>e.fontWeight.semibold};
    color: ${({theme:e})=>e.colors.text};
  }
`,hr=n.span`
  font-weight: 600;
  color: ${({theme:e})=>e.colors.primary};
`,mi=n.span`
  margin-right: 4px;
  display: inline-flex;
  align-items: center;
`,xi=n.p`
  font-size: 12px;
  color: ${({theme:e})=>e.colors.textSecondary};
`,br=n.div`
  font-weight: 500;
`,yr=n.div`
  padding: 8px 12px;
  width: 100%;
  color: ${({theme:e})=>e.colors.danger};
  background-color: ${({theme:e})=>e.colors.dangerLight};
  border-radius: 4px;
  font-size: 13px;
`,jr=n.div`
  margin-top: 12px;
  max-height: 250px;
  overflow-y: auto;
`,$r=n.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({theme:e})=>e.spacing.sm};
  width: 100%;
`,wr=({isOpen:e,onClose:t})=>{const s=We(),r=Ve(),a=y.useRef(null),[c,l]=y.useState(null),[h,u]=y.useState(!1),[b,$]=y.useState([]),[E,C]=y.useState(null),k=D({mutationFn:j.bulkCreate,onSuccess:m=>{s.invalidateQueries({queryKey:["careers"]}),r.success("18-Spec Import Successful",`Successfully imported ${m.count} career profiles.`),L(),t()},onError:m=>{r.error("Bulk upload failed",m.message)}}),L=()=>{l(null),$([]),C(null),u(!1),a.current&&(a.current.value="")},H=()=>{L(),t()},te=()=>{const m=["Career Cluster","Industry","Domain","Job Role","AI Resilience Grading","AI Resilience Comment","One-line Description","Top Companies Recruiting","Approx Salary Range (India)","Global Salary Range","Minimum Qualification (10th/12th) + Recommended Subjects","Minimum Qualification (Grad) + Recommended Subjects","Entrance Exams (UG Level)","Minimum Qualification (PG) + Recommended Subjects","Entrance Exams (PG Level)","Certifications - Students","Certifications - UG","Top Courses to Study (UG + PG + Certifications)"].map(T=>`"${T}"`).join(",")+`
`,w=["STEM & Computing","Information Technology","Artificial Intelligence","AI & Machine Learning Engineer","High","Requires architectural reasoning and novel algorithm design","Design, train, and deploy intelligent neural network algorithms","Google; Microsoft; OpenAI; NVIDIA; TCS","₹12,00,000 - ₹38,00,000 / year","$115,000 - $190,000 / year","12th Science Stream with PCM + Computer Science (Min 75%)","B.Tech / B.E. in Computer Science or Data Science","JEE Main, JEE Advanced, BITSAT","M.Tech / M.S. in Machine Learning or Computational Data Science","GATE (CS/DA Track), GRE","Python for Everybody (Coursera)","AWS Certified Machine Learning Specialty","B.Tech AI & Data Science, M.Tech Data Science"].map(T=>`"${T}"`).join(",")+`
`,x=new Blob([m+w],{type:"text/csv;charset=utf-8;"}),R=URL.createObjectURL(x),I=document.createElement("a");I.href=R,I.setAttribute("download","18_spec_career_profiles_template.csv"),document.body.appendChild(I),I.click(),document.body.removeChild(I)},J=m=>{l(m.name),C(null);const w=new FileReader;w.onload=x=>{var R;try{const I=(R=x.target)==null?void 0:R.result;if(!I){C("The uploaded file is empty.");return}const T=I.split(/\r\n|\n/).filter(d=>d.trim().length>0);if(T.length<=1){C("The file contains no data rows besides the header.");return}const v=K(T[0]).map(d=>d.toLowerCase()),Q=v.findIndex(d=>d.includes("job role")||d.includes("role")||d.includes("title")),X=v.findIndex(d=>d.includes("cluster")||d.includes("category")),Z=v.findIndex(d=>d.includes("industry")),ee=v.findIndex(d=>d.includes("domain")),p=v.findIndex(d=>d.includes("resilience grading")||d.includes("grading")),z=v.findIndex(d=>d.includes("resilience comment")||d.includes("ai comment")),pe=v.findIndex(d=>d.includes("one-line")||d.includes("description")),ue=v.findIndex(d=>d.includes("companies")||d.includes("recruiting")),me=v.findIndex(d=>d.includes("india")||d.includes("salary range (india)")),xe=v.findIndex(d=>d.includes("global")||d.includes("global salary")),ge=v.findIndex(d=>d.includes("10th/12th")||d.includes("minimum qualification (10th")),fe=v.findIndex(d=>d.includes("(grad)")||d.includes("grad recommended")),ne=v.findIndex(d=>d.includes("exams (ug")||d.includes("entrance exams (ug")),se=v.findIndex(d=>d.includes("(pg)")||d.includes("pg recommended")),re=v.findIndex(d=>d.includes("exams (pg")||d.includes("entrance exams (pg")),he=v.findIndex(d=>d.includes("certifications - students")||d.includes("students")),be=v.findIndex(d=>d.includes("certifications - ug")||d.includes("certifications ug")),ye=v.findIndex(d=>d.includes("top courses")||d.includes("courses to study")),ve=[];for(let d=1;d<T.length;d++){const f=K(T[d]);if(f.length===0||f.every(Gi=>!Gi.trim()))continue;const Re=(Q!==-1&&f[Q]?f[Q]:f[3]||f[0]||"").trim(),Ge=(X!==-1&&f[X]?f[X]:f[0]||"STEM & Computing").trim(),Be=(Z!==-1&&f[Z]?f[Z]:f[1]||"Information Technology").trim(),B=(ee!==-1&&f[ee]?f[ee]:f[2]||"Artificial Intelligence").trim(),je=p!==-1&&f[p]?f[p].trim():"High",o=["Low","Medium","High"].includes(je)?je:"High",F=(z!==-1&&f[z]?f[z]:"Requires analytical problem solving and strategic design.").trim(),vi=(pe!==-1&&f[pe]?f[pe]:"Design and deliver scalable technological systems.").trim(),Ri=(ue!==-1&&f[ue]?f[ue]:"Google, Microsoft, IBM").trim(),ki=(me!==-1&&f[me]?f[me]:"₹12,00,000 - ₹35,00,000 / year").trim(),zi=(xe!==-1&&f[xe]?f[xe]:"$110,000 - $185,000 / year").trim(),Fi=(ge!==-1&&f[ge]?f[ge]:"12th Science Stream with PCM").trim(),Ii=(fe!==-1&&f[fe]?f[fe]:"B.Tech / B.E. in Computer Science").trim(),Di=(ne!==-1&&f[ne]?f[ne]:"JEE Main, BITSAT").trim(),Li=(se!==-1&&f[se]?f[se]:"M.Tech / M.S. in Data Science").trim(),Ti=(re!==-1&&f[re]?f[re]:"GATE, GRE").trim(),Ei=(he!==-1&&f[he]?f[he]:"Python Basics").trim(),Ai=(be!==-1&&f[be]?f[be]:"AWS Certified Developer").trim(),Pi=(ye!==-1&&f[ye]?f[ye]:"B.Tech CS, M.Tech Data Science").trim(),Xe=Re.length>=2,Mi=Xe?void 0:"Job Role must be at least 2 characters";ve.push({jobRole:Re,careerCluster:Ge,industry:Be,domain:B,aiResilienceGrading:o,aiResilienceComment:F,oneLineDescription:vi,topCompaniesRecruiting:Ri,approxSalaryRangeIndia:ki,globalSalaryRange:zi,minQual10th12thRecommendedSubjects:Fi,minQualGradRecommendedSubjects:Ii,entranceExamsUG:Di,minQualPGRecommendedSubjects:Li,entranceExamsPG:Ti,certificationsStudents:Ei,certificationsUG:Ai,topCoursesToStudy:Pi,isValid:Xe,error:Mi})}$(ve)}catch{C("Failed to parse file. Please ensure it is a valid CSV/Excel file format.")}},w.readAsText(m)},K=m=>{const w=[];let x=!1,R="";for(let I=0;I<m.length;I++){const T=m[I];T==='"'?x=!x:T===","&&!x?(w.push(R.replace(/^"|"$/g,"").trim()),R=""):R+=T}return w.push(R.replace(/^"|"$/g,"").trim()),w},W=m=>{var x;const w=(x=m.target.files)==null?void 0:x[0];w&&J(w)},g=m=>{var x;m.preventDefault(),u(!1);const w=(x=m.dataTransfer.files)==null?void 0:x[0];w&&J(w)},A=()=>{const m=b.filter(x=>x.isValid);if(m.length===0){r.error("No valid rows to upload");return}const w=m.map(x=>({jobRole:x.jobRole,title:x.jobRole,careerCluster:x.careerCluster,category:x.careerCluster,industry:x.industry,domain:x.domain,aiResilienceGrading:x.aiResilienceGrading,aiResilienceComment:x.aiResilienceComment,oneLineDescription:x.oneLineDescription,description:x.oneLineDescription,topCompaniesRecruiting:x.topCompaniesRecruiting.split(/;|,/).map(R=>R.trim()).filter(Boolean),approxSalaryRangeIndia:x.approxSalaryRangeIndia,globalSalaryRange:x.globalSalaryRange,minQual10th12thRecommendedSubjects:x.minQual10th12thRecommendedSubjects,minQualGradRecommendedSubjects:x.minQualGradRecommendedSubjects,entranceExamsUG:x.entranceExamsUG,minQualPGRecommendedSubjects:x.minQualPGRecommendedSubjects,entranceExamsPG:x.entranceExamsPG,certificationsStudents:x.certificationsStudents,certificationsUG:x.certificationsUG,topCoursesToStudy:x.topCoursesToStudy,status:"active",sourceTenant:"Super Admin 18-Spec Import"}));k.mutate(w)},S=b.filter(m=>m.isValid).length,P=[{key:"jobRole",header:"Job Role (Primary Key)",render:m=>i.jsx(hr,{children:m.jobRole||"—"})},{key:"careerCluster",header:"Career Cluster"},{key:"industry",header:"Industry"},{key:"aiResilienceGrading",header:"AI Resilience",render:m=>i.jsx(de,{variant:m.aiResilienceGrading==="High"?"success":m.aiResilienceGrading==="Medium"?"warning":"danger",children:m.aiResilienceGrading})},{key:"isValid",header:"Validation",render:m=>m.isValid?i.jsxs(de,{variant:"success",children:[i.jsx(mi,{children:i.jsx(Si,{size:13})})," ","Valid"]}):i.jsxs(de,{variant:"danger",children:[i.jsx(mi,{children:i.jsx(lr,{size:13})})," ",m.error||"Invalid"]})}];return i.jsx(Ye,{isOpen:e,onClose:H,title:"Bulk Import Career Profiles",subtitle:"Import career profiles using CSV or Excel format",size:"lg",footer:i.jsxs($r,{children:[i.jsx(U,{variant:"secondary",onClick:H,disabled:k.isPending,children:"Cancel"}),i.jsxs(U,{onClick:A,disabled:S===0||k.isPending,isLoading:k.isPending,children:["Import ",S," Career Profiles"]})]}),children:i.jsxs(dr,{children:[i.jsxs(pr,{children:[i.jsxs(ur,{children:[i.jsx("h4",{children:"Standard CSV Template"}),i.jsx("p",{children:"Download sample CSV template matching the Career Profile table schema."})]}),i.jsx(U,{size:"sm",variant:"secondary",leftIcon:i.jsx(rr,{size:16}),onClick:te,children:"Download 18-Spec Template"})]}),i.jsxs(mr,{$isDragging:h,$hasFile:!!c,onClick:()=>{var m;return(m=a.current)==null?void 0:m.click()},onDragOver:m=>{m.preventDefault(),u(!0)},onDragLeave:()=>u(!1),onDrop:g,children:[i.jsx(gr,{ref:a,type:"file",accept:".csv, .xlsx, .xls",onChange:W}),c?i.jsxs(i.Fragment,{children:[i.jsx(ui,{$color:"#16a34a",children:i.jsx(ar,{})}),i.jsx(xr,{children:c}),i.jsx(xi,{children:"Click or drag to replace file"})]}):i.jsxs(i.Fragment,{children:[i.jsx(ui,{children:i.jsx(or,{})}),i.jsx(br,{children:"Click to browse or drag & drop 18-spec CSV file here"}),i.jsx(xi,{children:"Supports .xlsx, .xls, .csv files with 18 standard headers"})]})]}),E&&i.jsx(yr,{children:E}),b.length>0&&i.jsxs("div",{children:[i.jsxs(fr,{children:[i.jsx("h4",{children:"Parsed 18-Spec Rows Preview"}),i.jsxs(de,{variant:S>0?"success":"danger",children:[S," of ",b.length," rows valid"]})]}),i.jsx(jr,{children:i.jsx(wi,{columns:P,data:b,keyExtractor:(m,w)=>`preview-${m.jobRole||w||0}`,emptyMessage:"No data rows found."})})]})]})})},Cr=n.div`
  display: flex;
  flex-direction: column;
`,Sr=n.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 3px;
`,gi=n.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  background-color: ${({$active:e,theme:t})=>e?t.colors.primary:"transparent"};
  color: ${({$active:e,theme:t})=>e?"#ffffff":t.colors.textSecondary};
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};

  &:hover {
    color: ${({$active:e})=>e?"#ffffff":"#5D2384"};
  }
`,vr=n.div`
  background-color: #f7f5fc;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xl};
`,io=()=>{const e=Ve(),t=We(),[s,r]=y.useState("card"),[a,c]=y.useState("clusters"),[l,h]=y.useState(null),[u,b]=y.useState(null),[$,E]=y.useState(null),[C,k]=y.useState(null),[L,H]=y.useState(""),[te,J]=y.useState(!1),[K,W]=y.useState(!1),[g,A]=y.useState(null),[S,P]=y.useState(null),{data:m=[]}=Y({queryKey:["clusters",L],queryFn:()=>j.getClusters(L)}),{data:w=[]}=Y({queryKey:["industries",l==null?void 0:l.name,L],queryFn:()=>j.getIndustries(l==null?void 0:l.name,L),enabled:!0}),{data:x=[]}=Y({queryKey:["domains",u==null?void 0:u.name,L],queryFn:()=>j.getDomains(u==null?void 0:u.name,L),enabled:!0}),{data:R=[]}=Y({queryKey:["jobRoles",$==null?void 0:$.name,L],queryFn:()=>j.getJobRoles($==null?void 0:$.name,L),enabled:!0}),{data:I=[]}=Y({queryKey:["entranceExams"],queryFn:j.getEntranceExams}),{data:T=[]}=Y({queryKey:["courses"],queryFn:j.getCourses}),{data:v=[]}=Y({queryKey:["institutions"],queryFn:j.getInstitutions}),Q=D({mutationFn:j.createCluster,onSuccess:()=>{t.invalidateQueries({queryKey:["clusters"]}),e.success("Cluster Added","New career cluster created successfully.")}}),X=D({mutationFn:({id:o,payload:F})=>j.updateCluster(o,F),onSuccess:()=>{t.invalidateQueries({queryKey:["clusters"]}),e.success("Cluster Updated","Cluster updated successfully.")}}),Z=D({mutationFn:j.deleteCluster,onSuccess:()=>{t.invalidateQueries({queryKey:["clusters"]}),e.success("Cluster Deleted","Cluster removed successfully.")}}),ee=D({mutationFn:j.createIndustry,onSuccess:()=>{t.invalidateQueries({queryKey:["industries"]}),e.success("Industry Added","New industry created successfully.")}}),p=D({mutationFn:({id:o,payload:F})=>j.updateIndustry(o,F),onSuccess:()=>{t.invalidateQueries({queryKey:["industries"]}),e.success("Industry Updated","Industry updated successfully.")}}),z=D({mutationFn:j.deleteIndustry,onSuccess:()=>{t.invalidateQueries({queryKey:["industries"]}),e.success("Industry Deleted","Industry removed successfully.")}}),pe=D({mutationFn:j.createDomain,onSuccess:()=>{t.invalidateQueries({queryKey:["domains"]}),e.success("Domain Added","New domain created successfully.")}}),ue=D({mutationFn:({id:o,payload:F})=>j.updateDomain(o,F),onSuccess:()=>{t.invalidateQueries({queryKey:["domains"]}),e.success("Domain Updated","Domain updated successfully.")}}),me=D({mutationFn:j.deleteDomain,onSuccess:()=>{t.invalidateQueries({queryKey:["domains"]}),e.success("Domain Deleted","Domain removed successfully.")}}),xe=D({mutationFn:j.create,onSuccess:()=>{t.invalidateQueries({queryKey:["jobRoles"]}),e.success("Job Role Added","New job role created successfully.")}}),ge=D({mutationFn:({id:o,payload:F})=>j.update(o,F),onSuccess:o=>{t.invalidateQueries({queryKey:["jobRoles"]}),C&&C.id===o.id&&k(o),e.success("Job Role Updated","Job role specification updated successfully.")}}),fe=D({mutationFn:j.deleteJobRole,onSuccess:()=>{t.invalidateQueries({queryKey:["jobRoles"]}),a==="detail"&&c("roles"),e.success("Job Role Deleted","Job role removed successfully.")}}),ne=D({mutationFn:j.toggleShortlist,onSuccess:o=>{t.invalidateQueries({queryKey:["jobRoles"]}),C&&C.id===o.id&&k(o),e.info(o.isShortlisted?"Saved to Shortlist":"Removed from Shortlist",`Role "${o.jobRole}" shortlist status updated.`)}}),se=D({mutationFn:j.toggleExamShortlist,onSuccess:o=>{t.invalidateQueries({queryKey:["entranceExams"]}),e.info(o.isShortlisted?"Exam Shortlisted":"Exam Removed",`Exam "${o.name}" shortlist status updated.`)}}),re=D({mutationFn:j.toggleInstitutionShortlist,onSuccess:o=>{t.invalidateQueries({queryKey:["institutions"]}),e.info(o.isShortlisted?"Institution Shortlisted":"Institution Removed",`Institution "${o.name}" shortlist status updated.`)}}),he=()=>{const o=[{label:"Home",onClick:()=>{c("clusters"),h(null),b(null),E(null),k(null)}}];if(l||a!=="clusters"){const F=(l==null?void 0:l.name)||"Arts, Design & Creative";o.push({label:F,onClick:()=>{c("industries"),b(null),E(null),k(null)}})}if(u||a==="domains"||a==="roles"||a==="detail"){const F=(u==null?void 0:u.name)||"Applied Arts";o.push({label:F,onClick:()=>{c("domains"),E(null),k(null)}})}if($||a==="roles"||a==="detail"){const F=($==null?void 0:$.name)||"Digital Arts";o.push({label:F,onClick:()=>{c("roles"),k(null)}})}if(C||a==="detail"){const F=(C==null?void 0:C.jobRole)||"Applied UI Designer";o.push({label:F})}return o},be=()=>a==="clusters"?"Choose a Career Cluster":a==="industries"?"Choose an Industry within the Career Cluster":a==="domains"?"Choose a Domain within the Industry":a==="roles"?"Choose a Job Role within the Domain":(C==null?void 0:C.jobRole)||"Applied UI Designer",ye=()=>{if(a==="clusters")return"Add Cluster";if(a==="industries")return"Add Industry";if(a==="domains")return"Add Domain";if(a==="roles")return"Add Job Role"},ve=()=>{A(a==="clusters"?{type:"cluster"}:a==="industries"?{type:"industry"}:a==="domains"?{type:"domain"}:{type:"role"}),W(!0)},d=(o,F)=>{A({type:o,item:F}),W(!0)},f=o=>{g&&(g.type==="cluster"?g.item?X.mutate({id:g.item.id,payload:{name:o.name,description:o.description}}):Q.mutate({name:o.name,description:o.description}):g.type==="industry"?g.item?p.mutate({id:g.item.id,payload:{name:o.name,description:o.description}}):ee.mutate({clusterName:(l==null?void 0:l.name)||"Arts, Design & Creative",name:o.name,description:o.description}):g.type==="domain"?g.item?ue.mutate({id:g.item.id,payload:{name:o.name,description:o.description}}):pe.mutate({clusterName:(l==null?void 0:l.name)||"Arts, Design & Creative",industryName:(u==null?void 0:u.name)||"Applied Arts",name:o.name,description:o.description}):g.type==="role"&&(g.item?ge.mutate({id:g.item.id,payload:{jobRole:o.name,title:o.name,oneLineDescription:o.description||"Job role specification.",aiResilienceGrading:o.aiResilience||"High",approxSalaryRangeIndia:o.salaryIndia||"₹4–15 LPA",globalSalaryRange:o.salaryGlobal||"$70k–$120k",topCompaniesRecruiting:o.topRecruiters?o.topRecruiters.split(","):["Tech Firms"]}}):xe.mutate({jobRole:o.name,title:o.name,careerCluster:(l==null?void 0:l.name)||"Arts, Design & Creative",industry:(u==null?void 0:u.name)||"Applied Arts",domain:($==null?void 0:$.name)||"Digital Arts",oneLineDescription:o.description||"Job role specification.",aiResilienceGrading:o.aiResilience||"High",approxSalaryRangeIndia:o.salaryIndia||"₹4–15 LPA",globalSalaryRange:o.salaryGlobal||"$70k–$120k",topCompaniesRecruiting:o.topRecruiters?o.topRecruiters.split(","):["Tech Firms"]})))},Re=()=>{S&&(S.type==="cluster"?Z.mutate(S.id):S.type==="industry"?z.mutate(S.id):S.type==="domain"?me.mutate(S.id):S.type==="role"&&fe.mutate(S.id),P(null))},Ge=()=>{a==="industries"?(c("clusters"),h(null)):a==="domains"?(c("industries"),b(null)):a==="roles"?(c("domains"),E(null)):a==="detail"&&(c("roles"),k(null))},{role:Be}=bt(),B=Be==="super_admin",je=ye();return i.jsxs(Cr,{children:[i.jsx($i,{title:s==="simple"?"Career Library Spec Browser":be(),breadcrumbs:[{label:"Dashboard",href:Ke.DASHBOARD},{label:"Career Library"}],onBack:s==="card"&&a!=="clusters"?Ge:void 0,actions:i.jsxs(Sr,{children:[i.jsxs(gi,{$active:s==="card",onClick:()=>r("card"),children:[i.jsx(yt,{size:16})," Card View"]}),i.jsxs(gi,{$active:s==="simple",onClick:()=>{r("simple"),!l&&m.length>0&&h(m[0])},children:[i.jsx(jt,{size:16})," Simple View"]})]})}),s==="simple"?i.jsx(er,{clusters:m,industries:w,domains:x,roles:R,entranceExams:I,courses:T,institutions:v,onToggleShortlist:o=>ne.mutate(o),onToggleExamShortlist:o=>se.mutate(o),onToggleInstitutionShortlist:o=>re.mutate(o),onEditRole:B?o=>d("role",o):void 0}):i.jsxs(vr,{children:[i.jsx(Jt,{steps:he(),searchQuery:L,onSearchChange:H,actions:i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[B&&s==="card"&&a==="clusters"&&i.jsx(U,{variant:"secondary",leftIcon:i.jsx($t,{size:18}),onClick:()=>J(!0),children:"Bulk Upload"}),B&&a!=="detail"&&je&&i.jsx(U,{leftIcon:i.jsx(wt,{size:18}),onClick:ve,children:je})]})}),a==="clusters"&&i.jsx(an,{clusters:m,selectedClusterName:(l==null?void 0:l.name)||"Arts, Design & Creative",onSelectCluster:o=>{h(o),c("industries")},onEditCluster:B?o=>d("cluster",o):void 0,onDeleteCluster:B?o=>P({type:"cluster",id:o.id,name:o.name}):void 0}),a==="industries"&&i.jsx($n,{industries:w,selectedIndustryName:(u==null?void 0:u.name)||"Applied Arts",onSelectIndustry:o=>{b(o),c("domains")},onEditIndustry:B?o=>d("industry",o):void 0,onDeleteIndustry:B?o=>P({type:"industry",id:o.id,name:o.name}):void 0}),a==="domains"&&i.jsx(Tn,{domains:x,selectedDomainName:($==null?void 0:$.name)||"Digital Arts",onSelectDomain:o=>{E(o),c("roles")},onEditDomain:B?o=>d("domain",o):void 0,onDeleteDomain:B?o=>P({type:"domain",id:o.id,name:o.name}):void 0}),a==="roles"&&i.jsx(Jn,{roles:R,selectedRoleId:(C==null?void 0:C.id)||"role-ui-1",onSelectRole:o=>{k(o),c("detail")},onEditRole:B?o=>d("role",o):void 0,onDeleteRole:B?o=>P({type:"role",id:o.id,name:o.jobRole}):void 0}),a==="detail"&&C&&i.jsx(Ci,{role:C,entranceExams:I,courses:T,institutions:v,onToggleShortlist:()=>ne.mutate(C.id),onToggleExamShortlist:o=>se.mutate(o),onToggleInstitutionShortlist:o=>re.mutate(o),onEditRole:B?o=>d("role",o):void 0})]}),i.jsx(wr,{isOpen:te,onClose:()=>J(!1)}),i.jsx(sr,{isOpen:K,onClose:()=>{W(!1),A(null)},title:g!=null&&g.item?`Edit ${g.type.toUpperCase()}: ${g.item.name||g.item.jobRole}`:`Add New ${g==null?void 0:g.type.toUpperCase()}`,isJobRole:(g==null?void 0:g.type)==="role",initialValues:g!=null&&g.item?{name:g.item.name||g.item.jobRole,description:g.item.description||g.item.oneLineDescription,aiResilience:g.item.aiResilienceGrading||"High",salaryIndia:g.item.approxSalaryRangeIndia||"₹4–15 LPA",salaryGlobal:g.item.globalSalaryRange||"$70k–$120k",topRecruiters:Array.isArray(g.item.topCompaniesRecruiting)?g.item.topCompaniesRecruiting.join(", "):g.item.topCompaniesRecruiting||"Tech Firms, Startups"}:void 0,onSubmit:f}),i.jsx(Rt,{isOpen:!!S,onClose:()=>P(null),onConfirm:Re,title:`Delete ${S==null?void 0:S.type.toUpperCase()}`,description:`Are you sure you want to delete "${S==null?void 0:S.name}"? This action cannot be undone.`,variant:"danger",confirmText:"Delete Item"})]})},Rr=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,Le=n.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span:first-child {
    font-size: ${({theme:e})=>e.fontSize.xs};
    font-weight: ${({theme:e})=>e.fontWeight.semibold};
    color: ${({theme:e})=>e.colors.textSecondary};
    text-transform: uppercase;
  }

  p {
    font-size: ${({theme:e})=>e.fontSize.base};
    color: ${({theme:e})=>e.colors.text};
  }
`,kr=n.span`
  font-weight: 700;
  font-size: 14px;
`,zr=n.div`
  font-size: 11px;
  color: ${({theme:e})=>e.colors.textSecondary};
`,Fr=n.span`
  font-weight: 500;
  font-size: 13px;
`,Ir=n.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({theme:e})=>e.spacing.xs};
  margin-top: ${({theme:e})=>e.spacing.md};
`,to=()=>{const e=We(),t=Ve(),[s,r]=y.useState(null),{data:a,isLoading:c}=Y({queryKey:["pending-ratifications"],queryFn:j.getPendingRatifications}),l=D({mutationFn:j.ratify,onSuccess:()=>{e.invalidateQueries({queryKey:["pending-ratifications"]}),e.invalidateQueries({queryKey:["careers"]}),t.success("Career Ratified!","The submission has been ratified and added to the Career Library."),r(null)},onError:()=>t.error("Ratification failed")}),h=D({mutationFn:j.rejectRatification,onSuccess:()=>{e.invalidateQueries({queryKey:["pending-ratifications"]}),t.info("Career Submission Rejected","The submission has been rejected."),r(null)},onError:()=>t.error("Rejection failed")}),u=[{key:"careerName",header:"Job Role (Proposed)",render:b=>i.jsxs("div",{children:[i.jsx(kr,{children:b.careerName}),i.jsxs(zr,{children:["Submitted: ",b.submittedAt]})]})},{key:"suggestedCategory",header:"Career Cluster",render:b=>i.jsx(de,{variant:"primary",children:b.suggestedCategory})},{key:"sourceTenant",header:"Source Institution",render:b=>i.jsx(Fr,{children:b.sourceTenant})},{key:"status",header:"Ratification Status",render:b=>i.jsx(de,{variant:b.status==="ratified"?"success":b.status==="rejected"?"danger":"warning",dot:!0,children:b.status.charAt(0).toUpperCase()+b.status.slice(1)})},{key:"actions",header:"Actions",render:b=>i.jsxs(Ct,{children:[i.jsx(U,{size:"sm",variant:"secondary",leftIcon:i.jsx(cr,{size:15}),onClick:()=>r(b),children:"Audit Details"}),b.status==="pending"&&i.jsxs(i.Fragment,{children:[i.jsx(U,{size:"sm",variant:"primary",leftIcon:i.jsx(pi,{size:15}),isLoading:l.isPending,onClick:()=>l.mutate(b.id),children:"Ratify & Publish"}),i.jsx(U,{size:"sm",variant:"secondary",leftIcon:i.jsx(di,{size:15}),isLoading:h.isPending,onClick:()=>h.mutate(b.id),children:"Reject"})]})]})}];return i.jsxs("div",{children:[i.jsx($i,{title:"Pending Career Ratifications",subtitle:"Review, audit, and ratify institution-submitted niche career pathways",breadcrumbs:[{label:"Dashboard",href:Ke.DASHBOARD},{label:"Career Library",href:Ke.CAREER_LIBRARY},{label:"Pending Ratifications"}]}),i.jsx(_e,{children:!a||a.length===0?i.jsx(vt,{icon:i.jsx(Si,{size:28}),title:"All caught up!",description:"There are no pending career ratifications at this time."}):i.jsx(wi,{columns:u,data:a,isLoading:c,keyExtractor:b=>b.id})}),s&&i.jsx(Ye,{isOpen:!!s,onClose:()=>r(null),title:`Ratification Review: ${s.careerName}`,subtitle:"Audit proposed custom career details before publishing to platform library",size:"md",children:i.jsxs(Rr,{children:[i.jsxs(Le,{children:[i.jsx("span",{children:"Proposed Job Role (Primary Key)"}),i.jsx("p",{children:s.careerName})]}),i.jsxs(Le,{children:[i.jsx("span",{children:"Suggested Career Cluster"}),i.jsx("p",{children:s.suggestedCategory})]}),i.jsxs(Le,{children:[i.jsx("span",{children:"Source Institution"}),i.jsx("p",{children:s.sourceTenant})]}),i.jsxs(Le,{children:[i.jsx("span",{children:"Submitted Description"}),i.jsx("p",{children:s.description})]}),i.jsxs(Ir,{children:[i.jsx(U,{variant:"secondary",onClick:()=>r(null),children:"Close"}),s.status==="pending"&&i.jsxs(i.Fragment,{children:[i.jsx(U,{variant:"secondary",leftIcon:i.jsx(di,{size:16}),onClick:()=>h.mutate(s.id),children:"Reject Submission"}),i.jsx(U,{variant:"primary",leftIcon:i.jsx(pi,{size:16}),onClick:()=>l.mutate(s.id),children:"Ratify & Publish"})]})]})]})})]})};export{io as CareerListPage,to as PendingRatificationsPage};
