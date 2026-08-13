import{j as i,a4 as Hi,g as n,a3 as Se,I as Ee,a5 as Ae,P as hi,a6 as Ui,a7 as qi,a8 as Ni,a9 as Qi,aa as Oi,ab as Ji,ac as bi,ad as Ki,ae as Wi,af as Vi,ag as Yi,a1 as yi,ah as _i,ai as Xi,aj as Zi,ak as et,al as ji,am as it,an as tt,ao as nt,ap as st,aq as rt,ar as ot,as as at,at as lt,au as ct,$ as $i,v as Ke,av as wi,aw as Pe,ax as Me,r as y,ay as dt,a0 as ei,w as pt,az as ut,m as mt,aA as xt,_ as gt,aB as ft,B as H,Q as ht,aC as _,S as Ve,e as Ye,a as bt,c as We,aD as yt,aE as jt,aF as $t,aG as wt}from"./index-D8LPzpF0.js";import{u as Y}from"./useQuery-BD9xecFM.js";import{u as D}from"./useMutation-A5AECt77.js";import{P as Si}from"./PageHeader-BTXZNstJ.js";import"./Card.styles-CpQTLZiB.js";import{I as ce}from"./Input-BHsgREms.js";import{S as Te}from"./Select-CVMngjes.js";import"./Badge.styles-DvrzXK6I.js";import"./Checkbox-DR8oy3rl.js";import{A as St}from"./Table.styles-B8YNXMzj.js";import{S as vt,E as Ct}from"./FileUpload.styles-Dn8zyivb.js";import"./Breadcrumb-CKvFpy--.js";import{M as _e}from"./Modal-DgZwUWAf.js";import"./ConfirmDialog-Cx-Ljo-7.js";import{A as Rt}from"./AlertModal-BsdwHE3_.js";import{T as N}from"./Tooltip-DcSEu4UE.js";import"./SuccessModal.styles-Ska6LGj1.js";import{m as kt,a as zt,b as Ft,c as It,d as Dt,e as Lt,f as Tt,g as Et}from"./careers.mock-BKWPm7cS.js";import"./upcomingSessions.mock-BMf92Uzb.js";import{C as Xe}from"./Card-BmZj0eKj.js";import{u as At,a as Pt,o as Mt,s as je,e as Gt}from"./types-BMmo4VCQ.js";import{T as vi}from"./Table-D_uBFaJ0.js";import{B as de}from"./Badge-BEDhCnBZ.js";import"./SuccessModal-DRZxqmq7.js";let q=[...Et],O=[...Tt],V=[...Lt],G=[...zt],M=[...kt],oe=[...Dt],Bt=[...It],ae=[...Ft];const w={getClusters:async e=>{if(await new Promise(s=>setTimeout(s,150)),!e)return[...q];const t=e.toLowerCase();return q.filter(s=>s.name.toLowerCase().includes(t)||s.description&&s.description.toLowerCase().includes(t))},createCluster:async e=>{await new Promise(s=>setTimeout(s,200));const t={id:`cluster-${Date.now()}`,name:e.name,description:e.description||"",industryCount:0};return q.push(t),t},updateCluster:async(e,t)=>{await new Promise(r=>setTimeout(r,200));const s=q.findIndex(r=>r.id===e);if(s===-1)throw new Error("Cluster not found");return q[s]={...q[s],...t},q[s]},deleteCluster:async e=>{await new Promise(t=>setTimeout(t,200)),q=q.filter(t=>t.id!==e)},getIndustries:async(e,t)=>{await new Promise(r=>setTimeout(r,150));let s=[...O];if(e&&(s=s.filter(r=>r.clusterName.toLowerCase()===e.toLowerCase())),t){const r=t.toLowerCase();s=s.filter(a=>a.name.toLowerCase().includes(r)||a.description&&a.description.toLowerCase().includes(r))}return s},createIndustry:async e=>{await new Promise(r=>setTimeout(r,200));const t=q.find(r=>r.name===e.clusterName),s={id:`ind-${Date.now()}`,clusterId:(t==null?void 0:t.id)||"cluster-1",clusterName:e.clusterName,name:e.name,description:e.description||"",domainCount:0};return O.push(s),s},updateIndustry:async(e,t)=>{await new Promise(r=>setTimeout(r,200));const s=O.findIndex(r=>r.id===e);if(s===-1)throw new Error("Industry not found");return O[s]={...O[s],...t},O[s]},deleteIndustry:async e=>{await new Promise(t=>setTimeout(t,200)),O=O.filter(t=>t.id!==e)},getDomains:async(e,t)=>{await new Promise(r=>setTimeout(r,150));let s=[...V];if(e&&(s=s.filter(r=>r.industryName.toLowerCase()===e.toLowerCase())),t){const r=t.toLowerCase();s=s.filter(a=>a.name.toLowerCase().includes(r))}return s},createDomain:async e=>{await new Promise(r=>setTimeout(r,200));const t=O.find(r=>r.name===e.industryName),s={id:`dom-${Date.now()}`,industryId:(t==null?void 0:t.id)||"ind-1",industryName:e.industryName,clusterName:e.clusterName,name:e.name,description:e.description||"",roleCount:0};return V.push(s),s},updateDomain:async(e,t)=>{await new Promise(r=>setTimeout(r,200));const s=V.findIndex(r=>r.id===e);if(s===-1)throw new Error("Domain not found");return V[s]={...V[s],...t},V[s]},deleteDomain:async e=>{await new Promise(t=>setTimeout(t,200)),V=V.filter(t=>t.id!==e)},getJobRoles:async(e,t)=>{await new Promise(r=>setTimeout(r,150));let s=[...G];if(e&&(s=s.filter(r=>r.domain.toLowerCase()===e.toLowerCase())),t){const r=t.toLowerCase();s=s.filter(a=>a.jobRole.toLowerCase().includes(r)||a.oneLineDescription.toLowerCase().includes(r)||a.careerCluster.toLowerCase().includes(r)||a.domain.toLowerCase().includes(r))}return s},toggleShortlist:async e=>{await new Promise(s=>setTimeout(s,150));const t=G.findIndex(s=>s.id===e);if(t===-1)throw new Error("Career role not found");return G[t]={...G[t],isShortlisted:!G[t].isShortlisted},G[t]},getEntranceExams:async()=>(await new Promise(e=>setTimeout(e,150)),[...oe]),toggleExamShortlist:async e=>{await new Promise(s=>setTimeout(s,150));const t=oe.findIndex(s=>s.id===e);if(t===-1)throw new Error("Exam not found");return oe[t]={...oe[t],isShortlisted:!oe[t].isShortlisted},oe[t]},getCourses:async()=>(await new Promise(e=>setTimeout(e,150)),[...Bt]),getInstitutions:async()=>(await new Promise(e=>setTimeout(e,150)),[...ae]),toggleInstitutionShortlist:async e=>{await new Promise(s=>setTimeout(s,150));const t=ae.findIndex(s=>s.id===e);if(t===-1)throw new Error("Institution not found");return ae[t]={...ae[t],isShortlisted:!ae[t].isShortlisted},ae[t]},getAll:async(e={})=>{await new Promise(h=>setTimeout(h,200));let t=[...G];if(e.search){const h=e.search.toLowerCase();t=t.filter(u=>u.jobRole.toLowerCase().includes(h)||(u.title?u.title.toLowerCase().includes(h):!1)||u.careerCluster.toLowerCase().includes(h)||u.domain.toLowerCase().includes(h))}if(e.status&&(t=t.filter(h=>h.status===e.status)),e.category||e.cluster){const h=e.category||e.cluster;t=t.filter(u=>u.category===h||u.careerCluster===h)}const s=e.page??1,r=e.limit??10,a=t.length,c=Math.ceil(a/r),l=(s-1)*r;return{data:t.slice(l,l+r),total:a,page:s,limit:r,totalPages:c}},getById:async e=>{await new Promise(s=>setTimeout(s,150));const t=G.find(s=>s.id===e);if(!t)throw new Error("Career not found");return{...t}},update:async(e,t)=>{await new Promise(r=>setTimeout(r,200));const s=G.findIndex(r=>r.id===e);if(s===-1)throw new Error("Career not found");return G[s]={...G[s],...t,lastUpdated:new Date().toISOString().slice(0,10)},G[s]},create:async e=>{await new Promise(a=>setTimeout(a,200));const t=e.jobRole||e.title||"New Job Role",s=e.careerCluster||e.category||"Arts, Design & Creative",r={id:`role-${Date.now()}`,jobRole:t,title:t,careerCluster:s,category:s,industry:e.industry||"Applied Arts",domain:e.domain||"Digital Arts",aiResilienceGrading:e.aiResilienceGrading||"High",aiResilienceComment:e.aiResilienceComment||"Requires strategic human creativity.",oneLineDescription:e.oneLineDescription||e.description||"Designs user experiences.",description:e.description||e.oneLineDescription||"Designs user experiences.",topCompaniesRecruiting:e.topCompaniesRecruiting||["Tech Firms","Startups"],approxSalaryRangeIndia:e.approxSalaryRangeIndia||"₹4–15 LPA",globalSalaryRange:e.globalSalaryRange||"$70k–$120k",minQual10th12thRecommendedSubjects:e.minQual10th12thRecommendedSubjects||"12th Standard Relevant Stream",minQualGradRecommendedSubjects:e.minQualGradRecommendedSubjects||"Relevant Bachelor Degree",entranceExamsUG:e.entranceExamsUG||"NID DAT, UCEED",minQualPGRecommendedSubjects:e.minQualPGRecommendedSubjects||"Relevant Master Degree",entranceExamsPG:e.entranceExamsPG||"CEED",certificationsStudents:e.certificationsStudents||"Foundation Certifications",certificationsUG:e.certificationsUG||"Professional Domain Certifications",topCoursesToStudy:e.topCoursesToStudy||"Undergraduate & Postgraduate Degree Tracks",status:e.status||"active",lastUpdated:new Date().toISOString().slice(0,10),sourceTenant:e.sourceTenant||"Super Admin",isShortlisted:!1};return G.unshift(r),r},deleteJobRole:async e=>{await new Promise(t=>setTimeout(t,200)),G=G.filter(t=>t.id!==e)},bulkCreate:async e=>{await new Promise(s=>setTimeout(s,400));const t=await Promise.all(e.map(s=>w.create(s)));return{count:t.length,careers:t}},syncUpdates:async e=>(await new Promise(t=>setTimeout(t,200)),w.update(e,{lastUpdated:new Date().toISOString().slice(0,10)})),getPendingRatifications:async()=>(await new Promise(e=>setTimeout(e,200)),M.filter(e=>e.status==="pending")),ratify:async e=>{await new Promise(s=>setTimeout(s,200));const t=M.findIndex(s=>s.id===e);if(t===-1)throw new Error("Pending ratification not found");return M[t]={...M[t],status:"ratified"},await w.create({jobRole:M[t].careerName,title:M[t].careerName,careerCluster:M[t].suggestedCategory,category:M[t].suggestedCategory,oneLineDescription:M[t].description,description:M[t].description,status:"active",sourceTenant:M[t].sourceTenant}),M[t]},rejectRatification:async e=>{await new Promise(s=>setTimeout(s,200));const t=M.findIndex(s=>s.id===e);if(t===-1)throw new Error("Pending ratification not found");return M[t]={...M[t],status:"rejected"},M[t]}},Ht=n.div`
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
`,Ut=n.nav`
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
`,Ot=({steps:e,searchQuery:t,onSearchChange:s})=>i.jsxs(Ht,{children:[i.jsx(Ut,{children:e.map((r,a)=>{const c=a===e.length-1;return i.jsxs(Hi.Fragment,{children:[i.jsx(qt,{$active:c,onClick:r.onClick,children:r.label}),!c&&i.jsx(Nt,{children:"›"})]},a)})}),i.jsx(Qt,{children:i.jsx(vt,{value:t,onChange:s,placeholder:"Search a career, role, exam..."})})]}),Jt=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Kt=n.div`
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
`,Wt=n.div`
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
`,Vt=n.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.sm};
`,Yt=n.div`
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
`,_t=n.div`
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
`,Xt=n.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Zt=n.h3`
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.text};
  line-height: 1.35;
  margin: 0;
`,en=n.p`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({$selected:e,theme:t})=>e?"rgba(255, 255, 255, 0.85)":t.colors.textSecondary};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,tn=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({theme:e})=>e.spacing.xs};
  border-top: 1px solid
    ${({$selected:e,theme:t})=>e?"rgba(255, 255, 255, 0.15)":t.colors.border};
`,nn=n.span`
  font-size: 11px;
  font-weight: 700;
  color: ${({$selected:e,theme:t})=>e?"#E5C158":t.colors.primary};
  background-color: ${({$selected:e,theme:t})=>e?"rgba(229, 193, 88, 0.15)":t.colors.primaryLight};
  padding: 3px 8px;
  border-radius: 4px;
`,sn=n.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: 600;
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 2px;
`,rn=e=>{const t=e.toLowerCase();return t.includes("art")||t.includes("creative")||t.includes("design")?i.jsx(hi,{size:22}):t.includes("aviation")?i.jsx(Ui,{size:22}):t.includes("business")||t.includes("management")||t.includes("sales")?i.jsx(qi,{size:22}):t.includes("engineering")?i.jsx(Ni,{size:22}):t.includes("finance")?i.jsx(Qi,{size:22}):t.includes("food")||t.includes("agriculture")?i.jsx(Oi,{size:22}):t.includes("health")||t.includes("wellness")?i.jsx(Ji,{size:22}):t.includes("information")||t.includes("technology")||t.includes("digital")?i.jsx(bi,{size:22}):t.includes("law")||t.includes("governance")?i.jsx(Ki,{size:22}):t.includes("logistics")||t.includes("maritime")?i.jsx(Wi,{size:22}):t.includes("media")||t.includes("entertainment")?i.jsx(Vi,{size:22}):t.includes("stem")?i.jsx(Yi,{size:22}):t.includes("social")||t.includes("education")?i.jsx(yi,{size:22}):i.jsx(_i,{size:22})},on=({clusters:e,selectedClusterName:t,onSelectCluster:s,onEditCluster:r,onDeleteCluster:a})=>i.jsx(Jt,{children:i.jsx(Kt,{children:e.map(c=>{const l=c.name===t;return i.jsxs(Wt,{$selected:l,onClick:()=>s(c),children:[i.jsxs(Vt,{children:[i.jsx(Yt,{$selected:l,children:rn(c.name)}),(r||a)&&i.jsxs(_t,{className:"action-overlay",onClick:h=>h.stopPropagation(),children:[r&&i.jsx(N,{content:"Edit Cluster",children:i.jsx(ii,{$selected:l,onClick:()=>r(c),"aria-label":"Edit cluster",children:i.jsx(Se,{size:16})})}),a&&i.jsx(N,{content:"Delete Cluster",children:i.jsx(ii,{$selected:l,onClick:()=>a(c),"aria-label":"Delete cluster",children:i.jsx(Ee,{size:16})})})]})]}),i.jsxs(Xt,{children:[i.jsx(Zt,{$selected:l,children:c.name}),c.description&&i.jsx(en,{$selected:l,children:c.description})]}),i.jsxs(tn,{$selected:l,children:[i.jsxs(nn,{$selected:l,children:[c.industryCount||3," Industries"]}),i.jsxs(sn,{$selected:l,children:["Explore ",i.jsx(Ae,{size:16,className:"arrow-icon"})]})]})]},c.id)})})}),an=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,ln=n.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,cn=n.div`
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
`,dn=n.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.sm};
`,pn=n.div`
  width: 44px;
  height: 44px;
  border-radius: 4px;
  background-color: ${({$selected:e,theme:t})=>e?"rgba(255, 255, 255, 0.18)":t.colors.primaryLight};
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,un=n.div`
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
`,mn=n.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,xn=n.h3`
  font-size: ${({theme:e})=>e.fontSize.lg};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.text};
  line-height: 1.3;
  margin: 0;
`,gn=n.p`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({$selected:e,theme:t})=>e?"rgba(255, 255, 255, 0.85)":t.colors.textSecondary};
  margin: 0;
`,fn=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({theme:e})=>e.spacing.xs};
  border-top: 1px solid
    ${({$selected:e,theme:t})=>e?"rgba(255, 255, 255, 0.15)":t.colors.border};
`,hn=n.span`
  font-size: 11px;
  font-weight: 700;
  color: ${({$selected:e,theme:t})=>e?"#E5C158":t.colors.primary};
  background-color: ${({$selected:e,theme:t})=>e?"rgba(229, 193, 88, 0.15)":t.colors.primaryLight};
  padding: 3px 8px;
  border-radius: 4px;
`,bn=n.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: 600;
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 2px;
`,yn=e=>{const t=e.toLowerCase();return t.includes("applied")?i.jsx(Xi,{size:24}):t.includes("animation")||t.includes("design")?i.jsx(Zi,{size:24}):t.includes("performing")?i.jsx(et,{size:24}):i.jsx(ji,{size:24})},jn=({industries:e,selectedIndustryName:t,onSelectIndustry:s,onEditIndustry:r,onDeleteIndustry:a})=>i.jsx(an,{children:i.jsx(ln,{children:e.map(c=>{const l=c.name===t;return i.jsxs(cn,{$selected:l,onClick:()=>s(c),children:[i.jsxs(dn,{children:[i.jsx(pn,{$selected:l,children:yn(c.name)}),(r||a)&&i.jsxs(un,{className:"action-overlay",onClick:h=>h.stopPropagation(),children:[r&&i.jsx(N,{content:"Edit Industry",children:i.jsx(ti,{$selected:l,onClick:()=>r(c),"aria-label":"Edit industry",children:i.jsx(Se,{size:16})})}),a&&i.jsx(N,{content:"Delete Industry",children:i.jsx(ti,{$selected:l,onClick:()=>a(c),"aria-label":"Delete industry",children:i.jsx(Ee,{size:16})})})]})]}),i.jsxs(mn,{children:[i.jsx(xn,{$selected:l,children:c.name}),c.description&&i.jsx(gn,{$selected:l,children:c.description})]}),i.jsxs(fn,{$selected:l,children:[i.jsxs(hn,{$selected:l,children:[c.domainCount||11," Domains"]}),i.jsxs(bn,{$selected:l,children:["Explore ",i.jsx(Ae,{size:16,className:"arrow-icon"})]})]})]},c.id)})})}),$n=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,wn=n.div`
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
`,Cn=n.div`
  width: 38px;
  height: 38px;
  border-radius: 4px;
  background-color: ${({$selected:e,theme:t})=>e?"rgba(255, 255, 255, 0.18)":t.colors.primaryLight};
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,Rn=n.div`
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity ${({theme:e})=>e.transition.fast};
`,ni=n.button`
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
`,kn=n.h3`
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.text};
  line-height: 1.3;
  margin: 0;
`,zn=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({theme:e})=>e.spacing.xs};
  border-top: 1px solid
    ${({$selected:e,theme:t})=>e?"rgba(255, 255, 255, 0.15)":t.colors.border};
`,Fn=n.span`
  font-size: 11px;
  font-weight: 700;
  color: ${({$selected:e,theme:t})=>e?"#E5C158":t.colors.primary};
  background-color: ${({$selected:e,theme:t})=>e?"rgba(229, 193, 88, 0.15)":t.colors.primaryLight};
  padding: 3px 8px;
  border-radius: 4px;
`,In=n.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: 600;
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 2px;
`,Dn=e=>{const t=e.toLowerCase();return t.includes("animation")?i.jsx(it,{size:20}):t.includes("applied arts")?i.jsx(hi,{size:20}):t.includes("design")?i.jsx(tt,{size:20}):t.includes("craft")?i.jsx(nt,{size:20}):t.includes("curation")?i.jsx(st,{size:20}):t.includes("digital")?i.jsx(bi,{size:20}):t.includes("fashion")||t.includes("lifestyle")?i.jsx(rt,{size:20}):t.includes("future")?i.jsx(ot,{size:20}):t.includes("performing")?i.jsx(at,{size:20}):t.includes("photo")||t.includes("video")?i.jsx(lt,{size:20}):t.includes("visual")?i.jsx(ct,{size:20}):i.jsx(ji,{size:20})},Ln=({domains:e,selectedDomainName:t,onSelectDomain:s,onEditDomain:r,onDeleteDomain:a})=>i.jsx($n,{children:i.jsx(wn,{children:e.map(c=>{const l=c.name===t;return i.jsxs(Sn,{$selected:l,onClick:()=>s(c),children:[i.jsxs(vn,{children:[i.jsx(Cn,{$selected:l,children:Dn(c.name)}),(r||a)&&i.jsxs(Rn,{className:"action-overlay",onClick:h=>h.stopPropagation(),children:[r&&i.jsx(N,{content:"Edit Domain",children:i.jsx(ni,{$selected:l,onClick:()=>r(c),"aria-label":"Edit domain",children:i.jsx(Se,{size:16})})}),a&&i.jsx(N,{content:"Delete Domain",children:i.jsx(ni,{$selected:l,onClick:()=>a(c),"aria-label":"Delete domain",children:i.jsx(Ee,{size:16})})})]})]}),i.jsx(kn,{$selected:l,children:c.name}),i.jsxs(zn,{$selected:l,children:[i.jsxs(Fn,{$selected:l,children:[c.roleCount||3," Job Roles"]}),i.jsxs(In,{$selected:l,children:["Explore ",i.jsx(Ae,{size:16,className:"arrow-icon"})]})]})]},c.id)})})}),Tn=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,En=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,An=n.div`
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
`,Pn=n.div`
  display: flex;
  align-items: flex-start;
  gap: ${({theme:e})=>e.spacing.md};
`,Mn=n.div`
  width: 44px;
  height: 44px;
  border-radius: 4px;
  background-color: ${({$selected:e,theme:t})=>e?"rgba(255, 255, 255, 0.18)":t.colors.primaryLight};
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,Gn=n.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Bn=n.h2`
  font-size: 19px;
  font-weight: 700;
  color: ${({$selected:e,theme:t})=>e?"#FFFFFF":t.colors.text};
  margin: 0;
`,Hn=n.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({$selected:e,theme:t})=>e?"rgba(255, 255, 255, 0.85)":t.colors.textSecondary};
  margin: 0;
`,Un=n.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  flex-wrap: wrap;
`,si=n.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  color: ${({$selected:e,theme:t})=>e?"#E5C158":t.colors.primary};
  background-color: ${({$selected:e,theme:t})=>e?"rgba(229, 193, 88, 0.15)":t.colors.primaryLight};
  padding: 3px 10px;
  border-radius: 4px;
`,qn=n.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    width: 100%;
    justify-content: space-between;
  }
`,Nn=n.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({$selected:e})=>e?"#E5C158":"#C49419"};
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  transition: transform ${({theme:e})=>e.transition.fast};
`,Qn=n.div`
  display: flex;
  gap: 6px;
  opacity: 0;
  transition: opacity ${({theme:e})=>e.transition.fast};
`,ri=n.button`
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
`,On=({roles:e,selectedRoleId:t,onSelectRole:s,onEditRole:r,onDeleteRole:a})=>i.jsx(Tn,{children:i.jsx(En,{children:e.map(c=>{const l=c.id===t;return i.jsxs(An,{$selected:l,onClick:()=>s(c),children:[i.jsxs(Pn,{children:[i.jsx(Mn,{$selected:l,children:i.jsx($i,{size:24})}),i.jsxs(Gn,{children:[i.jsx(Bn,{$selected:l,children:c.jobRole}),i.jsx(Hn,{$selected:l,children:c.oneLineDescription}),i.jsxs(Un,{children:[i.jsxs(si,{$selected:l,children:[i.jsx(Ke,{size:13})," AI Resilience:"," ",c.aiResilienceGrading||"High"]}),i.jsxs(si,{$selected:l,children:[i.jsx(wi,{size:13})," ",c.approxSalaryRangeIndia||"₹4–15 LPA"]})]})]})]}),i.jsxs(qn,{children:[(r||a)&&i.jsxs(Qn,{className:"action-overlay",onClick:h=>h.stopPropagation(),children:[r&&i.jsx(N,{content:"Edit Job Role",children:i.jsx(ri,{$selected:l,onClick:()=>r(c),"aria-label":"Edit job role",children:i.jsx(Se,{size:16})})}),a&&i.jsx(N,{content:"Delete Job Role",children:i.jsx(ri,{$selected:l,onClick:()=>a(c),"aria-label":"Delete job role",children:i.jsx(Ee,{size:16})})})]}),i.jsxs(Nn,{$selected:l,className:"open-btn",children:["Open profile ",i.jsx(Ae,{size:18})]})]})]},c.id)})})}),Jn=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.xl};
`,Kn=n.div`
  background-color: #f7f5fc;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xxl};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.xl};
  position: relative;
`,Wn=n.div`
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
`,Vn=n.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`,qe=n.div`
  background-color: #ece8f6;
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Ne=n.span`
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #c49419;
`,Qe=n.h4`
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,Oe=n.p`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
`,Yn=n.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`,oi=n(Xe)`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,ai=n.h4`
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin-bottom: ${({theme:e})=>e.spacing.sm};
`,li=n.div`
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
`,_n=({role:e})=>i.jsxs(Jn,{children:[i.jsxs(Kn,{children:[i.jsxs(Wn,{children:[i.jsx(Ue,{}),i.jsx(Ue,{}),i.jsx(Ue,{})]}),i.jsxs(Vn,{children:[i.jsxs(qe,{children:[i.jsx(Ne,{children:"10+2"}),i.jsx(Qe,{children:"12th — Any stream"}),i.jsx(Oe,{children:e.minQual10th12thRecommendedSubjects||"12th Standard Fine Arts / Computer Application"})]}),i.jsxs(qe,{children:[i.jsx(Ne,{children:"GRADUATE"}),i.jsx(Qe,{children:"BDes / BFA / Relevant Degree"}),i.jsx(Oe,{children:"Recommended focus: UI/UX Design & Digital Arts"})]}),i.jsxs(qe,{children:[i.jsx(Ne,{children:"POST-GRADUATE"}),i.jsx(Qe,{children:"MDes, MFA, Design Management"}),i.jsx(Oe,{children:"Advanced Human-Computer Interaction"})]})]})]}),i.jsxs(Yn,{children:[i.jsxs(oi,{children:[i.jsx(ai,{children:"Certifications — Student Level"}),i.jsxs(li,{children:[i.jsx(ie,{children:"Adobe Photoshop Skills"}),i.jsx(ie,{children:"Canva Design Mastery"}),i.jsx(ie,{children:"Graphic Design Fundamentals"})]})]}),i.jsxs(oi,{children:[i.jsx(ai,{children:"Certifications — Undergraduate Level"}),i.jsxs(li,{children:[i.jsx(ie,{children:"Adobe Certified Professional"}),i.jsx(ie,{children:"UI/UX Design Specialization"}),i.jsx(ie,{children:"Motion Graphics & After Effects"}),i.jsx(ie,{children:"UX Tools"})]})]})]})]}),Xn=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,ci=n.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  font-style: italic;
  margin: 0;
`,Zn=n.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,es=n.div`
  background-color: #ffffff;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: ${({theme:e})=>e.colors.shadow};
`,is=n.div`
  background-color: #ece8f6;
  padding: ${({theme:e})=>e.spacing.md} ${({theme:e})=>e.spacing.lg};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
`,ts=n.h3`
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: 700;
  color: ${({theme:e})=>e.colors.primary};
  margin: 0;

  span {
    font-weight: 500;
    font-size: ${({theme:e})=>e.fontSize.xs};
    color: ${({theme:e})=>e.colors.textSecondary};
  }
`,ns=n.div`
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
`,ss=n.a`
  color: ${({theme:e})=>e.colors.primary};
  text-decoration: none;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
`,rs=n.div`
  padding: ${({theme:e})=>e.spacing.md} ${({theme:e})=>e.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.sm};
  border-top: 1px solid ${({theme:e})=>e.colors.border};
  background-color: #faf9fd;
`,os=n.span`
  font-size: 11px;
  color: ${({theme:e})=>e.colors.textMuted};
  font-style: italic;
`,as=n.button`
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
`,ls=({exams:e,onToggleShortlist:t})=>i.jsxs(Xn,{children:[i.jsx(ci,{children:"Graduation-level: CUET (National) / University-specific UG entrance tests (DUET, IPU CET etc.)"}),i.jsx(Zn,{children:e.map(s=>i.jsxs(es,{children:[i.jsxs("div",{children:[i.jsx(is,{children:i.jsxs(ts,{children:[s.name," ",i.jsxs("span",{children:["- ",s.fullTitle]})]})}),i.jsxs(ns,{children:[i.jsxs(le,{children:[i.jsx("strong",{children:"Conducted by:"})," ",s.conductedBy]}),i.jsxs(le,{children:[i.jsx("strong",{children:"Mode:"})," ",s.mode]}),i.jsxs(le,{children:[i.jsx("strong",{children:"Frequency:"})," ",s.frequency]}),i.jsxs(le,{children:[i.jsx("strong",{children:"Applicable For:"})," ",s.applicableFor]}),i.jsxs(le,{children:[i.jsx("strong",{children:"12th Requirement:"})," ",s.requirement12th]}),i.jsxs(le,{children:[i.jsx("strong",{children:"Website:"})," ",i.jsx(ss,{href:s.website,target:"_blank",rel:"noopener noreferrer",children:s.website})]})]})]}),i.jsxs(rs,{children:[i.jsx(os,{children:s.datesText||"Standard Exam Window"}),i.jsxs(as,{$shortlisted:s.isShortlisted,onClick:()=>t(s.id),children:[s.isShortlisted?i.jsx(Pe,{size:14}):i.jsx(Me,{size:14}),s.isShortlisted?"Shortlisted":"Save to shortlist"]})]})]},s.id))}),i.jsx(ci,{children:"PG-level: CEED, NID M.Des, UID/University PG Entrances"})]}),cs=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,ds=n.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,ps=n.div`
  background-color: #ffffff;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
  box-shadow: ${({theme:e})=>e.colors.shadow};
  min-height: 420px;
`,us=n.div`
  background-color: ${({theme:e})=>e.colors.primary};
  color: #ffffff;
  border-radius: 20px;
  padding: 6px 20px;
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: 700;
  width: fit-content;
`,ms=n.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,xs=n.hr`
  border: none;
  border-top: 1px solid ${({theme:e})=>e.colors.border};
  margin: ${({theme:e})=>e.spacing.xs} 0;
`,gs=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
  font-size: 11px;
  color: ${({theme:e})=>e.colors.text};
  line-height: 1.5;
`,$e=n.div`
  p {
    margin: 0;
  }
  strong {
    color: ${({theme:e})=>e.colors.text};
    font-weight: 700;
  }
`,fs=({courses:e})=>i.jsx(cs,{children:i.jsx(ds,{children:e.map(t=>i.jsxs(ps,{children:[i.jsx(us,{children:t.badge}),i.jsx(ms,{children:t.title}),i.jsx(xs,{}),i.jsxs(gs,{children:[i.jsx($e,{children:i.jsxs("p",{children:[i.jsx("strong",{children:"12th Stream:"})," ",t.streamRequirement]})}),i.jsx($e,{children:i.jsxs("p",{children:[i.jsx("strong",{children:"Entrance Exams:"})," ",t.entranceExams]})}),i.jsx($e,{children:i.jsxs("p",{children:[i.jsx("strong",{children:"Programs Offered:"})," ",t.programsOffered]})}),i.jsx($e,{children:i.jsxs("p",{children:[i.jsx("strong",{children:"Top Colleges:"})," ",t.topColleges]})}),i.jsx($e,{children:i.jsxs("p",{children:[i.jsx("strong",{children:"FURTHER STUDY OPTIONS:"})," ",t.furtherStudyOptions]})})]})]},t.id))})}),hs=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,bs=n.div`
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
`,ys=n.div`
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
`,js=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.sm};
`,$s=n.div`
  background-color: ${({theme:e})=>e.colors.primary};
  color: #ffffff;
  border-radius: 20px;
  padding: 4px 16px;
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: 700;
  width: fit-content;
`,ws=n.h3`
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
`,Cs=n.div`
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
`,Rs=n.a`
  color: ${({theme:e})=>e.colors.primary};
  text-decoration: none;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
`,ks=n.div`
  display: flex;
  justify-content: flex-end;
  padding-top: ${({theme:e})=>e.spacing.sm};
`,zs=n.button`
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
`,Fs=({institutions:e,onToggleShortlist:t})=>i.jsx(hs,{children:i.jsx(bs,{children:e.map(s=>i.jsxs(ys,{children:[i.jsxs(js,{children:[i.jsx($s,{children:s.badge}),i.jsx(ws,{children:s.name}),i.jsx(Ss,{children:s.cityState}),i.jsx(vs,{}),i.jsxs(Cs,{children:[i.jsxs(ke,{children:[i.jsx("strong",{children:"Entrance:"})," ",s.entranceExam]}),i.jsxs(ke,{children:[i.jsx("strong",{children:"Programs Offered:"})," ",s.programsOffered]}),i.jsxs(ke,{children:[i.jsx("strong",{children:"RANKING:"})," ",s.ranking]}),i.jsxs(ke,{children:[i.jsx("strong",{children:"WEBSITE:"})," ",i.jsx(Rs,{href:s.website,target:"_blank",rel:"noopener noreferrer",children:s.website})]})]})]}),i.jsx(ks,{children:i.jsxs(zs,{$shortlisted:s.isShortlisted,onClick:()=>t(s.id),children:[s.isShortlisted?i.jsx(Pe,{size:14}):i.jsx(Me,{size:14}),s.isShortlisted?"Shortlisted":"Save to shortlist"]})})]},s.id))})}),Is=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Ds=n.div`
  background: linear-gradient(135deg, ${({theme:e})=>e.colors.primary} 0%, ${({theme:e})=>e.colors.primaryHover} 100%);
  color: #ffffff;
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xxl};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.xl};
  position: relative;
  box-shadow: 0 12px 28px -6px rgba(93, 35, 132, 0.35);
`,Ls=n.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  flex-wrap: wrap;
`,Ts=n.div`
  display: flex;
  align-items: flex-start;
  gap: ${({theme:e})=>e.spacing.md};
`,Es=n.div`
  width: 52px;
  height: 52px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(4px);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,As=n.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Ps=n.h2`
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
`,Ms=n.p`
  font-size: ${({theme:e})=>e.fontSize.base};
  color: rgba(255, 255, 255, 0.88);
  font-style: italic;
  margin: 0;
`,Gs=n.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,Bs=n.button`
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
`,Hs=n.button`
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
`,Us=n.div`
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
`,qs=n.div`
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
`,Ns=n.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing.xl};
  align-items: flex-start;
  margin-top: ${({theme:e})=>e.spacing.xs};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
  }
`,Qs=n.div`
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
`,we=n.button`
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
    background-color: ${({theme:e,$active:t})=>t?e.colors.primaryLight:e.colors.surfaceHover};
    color: ${({theme:e})=>e.colors.primary};
  }
`,Os=n.div`
  flex: 1;
  min-width: 0;
`,Js=n.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`,di=n(Xe)`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.sm};
`,Je=n.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  line-height: 1.5;
  margin: 0;
`,Ci=({role:e,entranceExams:t,courses:s,institutions:r,onToggleShortlist:a,onToggleExamShortlist:c,onToggleInstitutionShortlist:l,onEditRole:h})=>{const[u,b]=y.useState("overview"),j=Array.isArray(e.topCompaniesRecruiting)?e.topCompaniesRecruiting.join(", "):e.topCompaniesRecruiting||"Tech Firms, Startups";return i.jsxs(Is,{children:[i.jsxs(Ds,{children:[i.jsxs(Ls,{children:[i.jsxs(Ts,{children:[i.jsx(Es,{children:i.jsx($i,{size:28})}),i.jsxs(As,{children:[i.jsx(Ps,{children:e.jobRole}),i.jsx(Ms,{children:e.oneLineDescription})]})]}),i.jsxs(Gs,{children:[i.jsxs(Bs,{$shortlisted:e.isShortlisted,onClick:a,children:[e.isShortlisted?i.jsx(Pe,{size:16}):i.jsx(Me,{size:16}),e.isShortlisted?"Shortlisted":"Save to shortlist"]}),h&&i.jsx(N,{content:"Edit Role Specification",children:i.jsxs(Hs,{onClick:()=>h(e),children:[i.jsx(Se,{size:16})," Edit Role"]})})]})]}),i.jsxs(Us,{children:[i.jsxs(ze,{$variant:"green",children:[i.jsxs(Fe,{children:[i.jsx(Ke,{size:18,color:"#1E7E48"}),i.jsx(Ie,{$variant:"green",children:"AI Resilience"})]}),i.jsx(De,{$variant:"green",children:e.aiResilienceGrading||"High"})]}),i.jsxs(ze,{$variant:"purple",children:[i.jsxs(Fe,{children:[i.jsx(wi,{size:18,color:"#5D2384"}),i.jsx(Ie,{$variant:"purple",children:"Salary (India)"})]}),i.jsx(De,{$variant:"purple",children:e.approxSalaryRangeIndia||"₹4–15 LPA"})]}),i.jsxs(ze,{$variant:"blue",children:[i.jsxs(Fe,{children:[i.jsx(dt,{size:18,color:"#1D4ED8"}),i.jsx(Ie,{$variant:"blue",children:"Salary (Global)"})]}),i.jsx(De,{$variant:"blue",children:e.globalSalaryRange||"$70k–$120k"})]}),i.jsxs(ze,{$variant:"grey",children:[i.jsxs(Fe,{children:[i.jsx(ei,{size:18,color:"#64748B"}),i.jsx(Ie,{$variant:"grey",children:"Top Recruiters"})]}),i.jsx(N,{content:j,children:i.jsx(De,{$variant:"grey",children:j})})]})]})]}),i.jsxs(qs,{children:[i.jsx(Ke,{size:18}),i.jsxs("div",{children:[i.jsxs("strong",{children:['Why "',e.aiResilienceGrading||"High",'":']})," ",e.aiResilienceComment||"Centers on unique human creativity, emotional expression, and cultural nuance."]})]}),i.jsxs(Ns,{children:[i.jsxs(Qs,{children:[i.jsxs(we,{$active:u==="overview",onClick:()=>b("overview"),children:[i.jsx(pt,{size:18})," Overview"]}),i.jsxs(we,{$active:u==="education",onClick:()=>b("education"),children:[i.jsx(yi,{size:18})," Education Path"]}),i.jsxs(we,{$active:u==="exams",onClick:()=>b("exams"),children:[i.jsx(ut,{size:18})," Entrance Exams"]}),i.jsxs(we,{$active:u==="courses",onClick:()=>b("courses"),children:[i.jsx(mt,{size:18})," Courses"]}),i.jsxs(we,{$active:u==="institutions",onClick:()=>b("institutions"),children:[i.jsx(ei,{size:18})," Institutions"]})]}),i.jsxs(Os,{children:[u==="overview"&&i.jsxs(Js,{children:[i.jsxs(di,{title:"Role Overview & Scope",children:[i.jsx(Je,{children:e.oneLineDescription}),i.jsx(Je,{children:"Applied UI Designers focus on crafting intuitive digital interfaces, maintaining visual component systems, and bridging product design with frontend engineering."})]}),i.jsx(di,{title:"Key Skill Requirements",children:i.jsxs(Je,{children:["• Figma, Visual System Architecture, Micro-Interactions",i.jsx("br",{}),"• User Research Synthesis & Prototyping",i.jsx("br",{}),"• Responsive Design & Accessibility (WCAG Compliance)"]})})]}),u==="education"&&i.jsx(_n,{role:e}),u==="exams"&&i.jsx(ls,{exams:t,onToggleShortlist:c}),u==="courses"&&i.jsx(fs,{courses:s}),u==="institutions"&&i.jsx(Fs,{institutions:r,onToggleShortlist:l})]})]})]})},Ks=n.div`
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: ${({theme:e})=>e.spacing.xl};
  align-items: flex-start;

  @media (max-width: ${({theme:e})=>e.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`,Ws=n.div`
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
`,Vs=n.h3`
  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`,Ys=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.sm};
`,_s=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.xs};
  margin-top: ${({theme:e})=>e.spacing.xs};
`,Xs=n.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,Zs=n.div`
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
`,er=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`,ir=n.span`
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
`;const tr=n.div`
  min-width: 0;
`,nr=n.div`
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
`,sr=({clusters:e,industries:t,domains:s,roles:r,entranceExams:a,courses:c,institutions:l,onToggleShortlist:h,onToggleExamShortlist:u,onToggleInstitutionShortlist:b,onEditRole:j})=>{const[E,$]=y.useState(""),[k,L]=y.useState(""),[U,te]=y.useState(""),[J,K]=y.useState(""),[W,f]=y.useState(""),A=y.useMemo(()=>e.find(p=>p.id===k)||e[0]||null,[e,k]),v=y.useMemo(()=>{if(!A)return t;const p=t.filter(z=>z.clusterId===A.id||z.clusterName.toLowerCase()===A.name.toLowerCase());return p.length>0?p:t},[t,A]),P=y.useMemo(()=>v.find(p=>p.id===U)||v[0]||null,[v,U]),x=y.useMemo(()=>{if(!P)return s;const p=s.filter(z=>z.industryId===P.id||z.industryName.toLowerCase()===P.name.toLowerCase());return p.length>0?p:s},[s,P]),S=y.useMemo(()=>x.find(p=>p.id===J)||x[0]||null,[x,J]),g=y.useMemo(()=>{if(!S)return r;const p=r.filter(z=>z.domain.toLowerCase()===S.name.toLowerCase());return p.length>0?p:r},[r,S]),R=y.useMemo(()=>g.find(p=>p.id===W)||g[0]||null,[g,W]),I=y.useMemo(()=>e.map(p=>({value:p.id,label:p.name})),[e]),T=y.useMemo(()=>v.map(p=>({value:p.id,label:p.name})),[v]),C=y.useMemo(()=>x.map(p=>({value:p.id,label:p.name})),[x]),Q=y.useMemo(()=>{if(!E.trim())return g;const p=E.toLowerCase();return g.filter(z=>z.jobRole.toLowerCase().includes(p)||z.oneLineDescription.toLowerCase().includes(p))},[g,E]),X=p=>{L(p),te(""),K(""),f("")},Z=p=>{te(p),K(""),f("")},ee=p=>{K(p),f("")};return i.jsxs(Ks,{children:[i.jsxs(Ws,{children:[i.jsxs(Vs,{children:[i.jsx(xt,{size:18})," Career Hierarchy Filters"]}),i.jsxs(Ys,{children:[i.jsx(Te,{label:"Career Cluster",options:I,value:(A==null?void 0:A.id)||"",onChange:p=>X(p.target.value),placeholder:"Select Cluster"}),i.jsx(Te,{label:"Industry",options:T,value:(P==null?void 0:P.id)||"",onChange:p=>Z(p.target.value),placeholder:"Select Industry"}),i.jsx(Te,{label:"Domain",options:C,value:(S==null?void 0:S.id)||"",onChange:p=>ee(p.target.value),placeholder:"Select Domain"})]}),i.jsx(ce,{placeholder:"Filter job roles...",value:E,onChange:p=>$(p.target.value),leftIcon:i.jsx(gt,{size:16})}),i.jsxs(_s,{children:[i.jsxs(Xs,{children:["Job Roles (",Q.length,")"]}),Q.map(p=>{const z=(R==null?void 0:R.id)===p.id;return i.jsx(Zs,{$active:z,onClick:()=>f(p.id),children:i.jsxs(er,{children:[i.jsx(ir,{$active:z,children:p.jobRole}),p.isShortlisted?i.jsx(Pe,{size:15,color:"#D99F26"}):i.jsx(Me,{size:15,color:"#94A3B8"})]})},p.id)}),Q.length===0&&i.jsx("p",{style:{fontSize:"13px",color:"#64748b",margin:"8px 0"},children:"No job roles match the current filter."})]})]}),i.jsx(tr,{children:R?i.jsx(Ci,{role:R,entranceExams:a,courses:c,institutions:l,onToggleShortlist:()=>h(R.id),onToggleExamShortlist:u,onToggleInstitutionShortlist:b,onEditRole:j}):i.jsxs(nr,{children:[i.jsx(ft,{size:48,color:"#94A3B8"}),i.jsx("h3",{children:"No Job Role Selected"}),i.jsx("p",{children:"Select a Career Cluster, Industry, Domain, and Job Role from the left panel to inspect full career pathway specs, salary metrics, entrance exams, and courses."})]})})]})},rr=n.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,or=n.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({theme:e})=>e.spacing.sm};
  margin-top: ${({theme:e})=>e.spacing.md};
`,ar=Mt({name:je().min(1,"Name is required"),description:je().optional(),aiResilience:Gt(["Low","Medium","High"]).optional(),salaryIndia:je().optional(),salaryGlobal:je().optional(),topRecruiters:je().optional()}),lr=({isOpen:e,onClose:t,title:s,initialValues:r,onSubmit:a,isJobRole:c,isLoading:l})=>{var k,L;const{register:h,handleSubmit:u,setValue:b,reset:j,formState:{errors:E}}=At({resolver:Pt(ar),defaultValues:{name:"",description:"",aiResilience:"High",salaryIndia:"",salaryGlobal:"",topRecruiters:""}});y.useEffect(()=>{j(r?{name:r.name||"",description:r.description||"",aiResilience:r.aiResilience||"High",salaryIndia:r.salaryIndia||"",salaryGlobal:r.salaryGlobal||"",topRecruiters:r.topRecruiters||""}:{name:"",description:"",aiResilience:"High",salaryIndia:"",salaryGlobal:"",topRecruiters:""})},[r,j,e]);const $=U=>{a(U),t()};return i.jsx(_e,{isOpen:e,onClose:t,title:s,size:"md",children:i.jsxs(rr,{onSubmit:u($),children:[i.jsx(ce,{label:"Title / Name",placeholder:"Enter item title...",...h("name"),error:(k=E.name)==null?void 0:k.message}),i.jsx(ce,{label:"Short Description",placeholder:"Enter short description...",...h("description"),error:(L=E.description)==null?void 0:L.message}),c&&i.jsxs(i.Fragment,{children:[i.jsx("div",{children:i.jsx(Te,{label:"AI Resilience",options:[{value:"High",label:"High"},{value:"Medium",label:"Medium"},{value:"Low",label:"Low"}],value:(r==null?void 0:r.aiResilience)||"High",onChange:U=>b("aiResilience",U.target.value)})}),i.jsx(ce,{label:"Salary (India)",placeholder:"e.g. ₹4–15 LPA",...h("salaryIndia")}),i.jsx(ce,{label:"Salary (Global)",placeholder:"e.g. $70k–$120k",...h("salaryGlobal")}),i.jsx(ce,{label:"Top Recruiters",placeholder:"e.g. Tech Firms, Startups",...h("topRecruiters")})]}),i.jsxs(or,{children:[i.jsx(H,{variant:"secondary",onClick:t,type:"button",children:"Cancel"}),i.jsx(H,{type:"submit",isLoading:l,leftIcon:i.jsx(ht,{size:18}),children:"Save Changes"})]})]})})};function pi(e){return _({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"},child:[]}]})(e)}function ui(e){return _({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"},child:[]}]})(e)}function cr(e){return _({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M5 20h14v-2H5zM19 9h-4V3H9v6H5l7 7z"},child:[]}]})(e)}function dr(e){return _({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96M14 13v4h-4v-4H7l5-5 5 5z"},child:[]}]})(e)}function pr(e){return _({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm7 7V3.5L18.5 9z"},child:[]}]})(e)}function ur(e){return _({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"},child:[]}]})(e)}function Ri(e){return _({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"},child:[]}]})(e)}function mr(e){return _({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M12 6a9.77 9.77 0 0 1 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5A9.77 9.77 0 0 1 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4m0 5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7"},child:[]}]})(e)}const xr=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,gr=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:e})=>e.spacing.md};
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  border: 1px solid ${({theme:e})=>e.colors.border};
`,fr=n.div`
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
`,hr=n.div`
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
`,mi=n.div`
  font-size: 36px;
  color: ${({theme:e,$color:t})=>t||e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`,br=n.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.text};
`,yr=n.input`
  display: none;
`,jr=n.div`
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
`,$r=n.span`
  font-weight: 600;
  color: ${({theme:e})=>e.colors.primary};
`,xi=n.span`
  margin-right: 4px;
  display: inline-flex;
  align-items: center;
`,gi=n.p`
  font-size: 12px;
  color: ${({theme:e})=>e.colors.textSecondary};
`,wr=n.div`
  font-weight: 500;
`,Sr=n.div`
  padding: 8px 12px;
  width: 100%;
  color: ${({theme:e})=>e.colors.danger};
  background-color: ${({theme:e})=>e.colors.dangerLight};
  border-radius: 4px;
  font-size: 13px;
`,vr=n.div`
  margin-top: 12px;
  max-height: 250px;
  overflow-y: auto;
`,Cr=n.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({theme:e})=>e.spacing.sm};
  width: 100%;
`,Rr=({isOpen:e,onClose:t})=>{const s=Ve(),r=Ye(),a=y.useRef(null),[c,l]=y.useState(null),[h,u]=y.useState(!1),[b,j]=y.useState([]),[E,$]=y.useState(null),k=D({mutationFn:w.bulkCreate,onSuccess:x=>{s.invalidateQueries({queryKey:["careers"]}),r.success("18-Spec Import Successful",`Successfully imported ${x.count} career profiles.`),L(),t()},onError:x=>{r.error("Bulk upload failed",x.message)}}),L=()=>{l(null),j([]),$(null),u(!1),a.current&&(a.current.value="")},U=()=>{L(),t()},te=()=>{const x=["Career Cluster","Industry","Domain","Job Role","AI Resilience Grading","AI Resilience Comment","One-line Description","Top Companies Recruiting","Approx Salary Range (India)","Global Salary Range","Minimum Qualification (10th/12th) + Recommended Subjects","Minimum Qualification (Grad) + Recommended Subjects","Entrance Exams (UG Level)","Minimum Qualification (PG) + Recommended Subjects","Entrance Exams (PG Level)","Certifications - Students","Certifications - UG","Top Courses to Study (UG + PG + Certifications)"].map(T=>`"${T}"`).join(",")+`
`,S=["STEM & Computing","Information Technology","Artificial Intelligence","AI & Machine Learning Engineer","High","Requires architectural reasoning and novel algorithm design","Design, train, and deploy intelligent neural network algorithms","Google; Microsoft; OpenAI; NVIDIA; TCS","₹12,00,000 - ₹38,00,000 / year","$115,000 - $190,000 / year","12th Science Stream with PCM + Computer Science (Min 75%)","B.Tech / B.E. in Computer Science or Data Science","JEE Main, JEE Advanced, BITSAT","M.Tech / M.S. in Machine Learning or Computational Data Science","GATE (CS/DA Track), GRE","Python for Everybody (Coursera)","AWS Certified Machine Learning Specialty","B.Tech AI & Data Science, M.Tech Data Science"].map(T=>`"${T}"`).join(",")+`
`,g=new Blob([x+S],{type:"text/csv;charset=utf-8;"}),R=URL.createObjectURL(g),I=document.createElement("a");I.href=R,I.setAttribute("download","18_spec_career_profiles_template.csv"),document.body.appendChild(I),I.click(),document.body.removeChild(I)},J=x=>{l(x.name),$(null);const S=new FileReader;S.onload=g=>{var R;try{const I=(R=g.target)==null?void 0:R.result;if(!I){$("The uploaded file is empty.");return}const T=I.split(/\r\n|\n/).filter(d=>d.trim().length>0);if(T.length<=1){$("The file contains no data rows besides the header.");return}const C=K(T[0]).map(d=>d.toLowerCase()),Q=C.findIndex(d=>d.includes("job role")||d.includes("role")||d.includes("title")),X=C.findIndex(d=>d.includes("cluster")||d.includes("category")),Z=C.findIndex(d=>d.includes("industry")),ee=C.findIndex(d=>d.includes("domain")),p=C.findIndex(d=>d.includes("resilience grading")||d.includes("grading")),z=C.findIndex(d=>d.includes("resilience comment")||d.includes("ai comment")),pe=C.findIndex(d=>d.includes("one-line")||d.includes("description")),ue=C.findIndex(d=>d.includes("companies")||d.includes("recruiting")),me=C.findIndex(d=>d.includes("india")||d.includes("salary range (india)")),xe=C.findIndex(d=>d.includes("global")||d.includes("global salary")),ge=C.findIndex(d=>d.includes("10th/12th")||d.includes("minimum qualification (10th")),fe=C.findIndex(d=>d.includes("(grad)")||d.includes("grad recommended")),ne=C.findIndex(d=>d.includes("exams (ug")||d.includes("entrance exams (ug")),se=C.findIndex(d=>d.includes("(pg)")||d.includes("pg recommended")),re=C.findIndex(d=>d.includes("exams (pg")||d.includes("entrance exams (pg")),he=C.findIndex(d=>d.includes("certifications - students")||d.includes("students")),be=C.findIndex(d=>d.includes("certifications - ug")||d.includes("certifications ug")),ye=C.findIndex(d=>d.includes("top courses")||d.includes("courses to study")),ve=[];for(let d=1;d<T.length;d++){const m=K(T[d]);if(m.length===0||m.every(Bi=>!Bi.trim()))continue;const Ce=(Q!==-1&&m[Q]?m[Q]:m[3]||m[0]||"").trim(),Ge=(X!==-1&&m[X]?m[X]:m[0]||"STEM & Computing").trim(),Be=(Z!==-1&&m[Z]?m[Z]:m[1]||"Information Technology").trim(),He=(ee!==-1&&m[ee]?m[ee]:m[2]||"Artificial Intelligence").trim(),B=p!==-1&&m[p]?m[p].trim():"High",Re=["Low","Medium","High"].includes(B)?B:"High",o=(z!==-1&&m[z]?m[z]:"Requires analytical problem solving and strategic design.").trim(),F=(pe!==-1&&m[pe]?m[pe]:"Design and deliver scalable technological systems.").trim(),ki=(ue!==-1&&m[ue]?m[ue]:"Google, Microsoft, IBM").trim(),zi=(me!==-1&&m[me]?m[me]:"₹12,00,000 - ₹35,00,000 / year").trim(),Fi=(xe!==-1&&m[xe]?m[xe]:"$110,000 - $185,000 / year").trim(),Ii=(ge!==-1&&m[ge]?m[ge]:"12th Science Stream with PCM").trim(),Di=(fe!==-1&&m[fe]?m[fe]:"B.Tech / B.E. in Computer Science").trim(),Li=(ne!==-1&&m[ne]?m[ne]:"JEE Main, BITSAT").trim(),Ti=(se!==-1&&m[se]?m[se]:"M.Tech / M.S. in Data Science").trim(),Ei=(re!==-1&&m[re]?m[re]:"GATE, GRE").trim(),Ai=(he!==-1&&m[he]?m[he]:"Python Basics").trim(),Pi=(be!==-1&&m[be]?m[be]:"AWS Certified Developer").trim(),Mi=(ye!==-1&&m[ye]?m[ye]:"B.Tech CS, M.Tech Data Science").trim(),Ze=Ce.length>=2,Gi=Ze?void 0:"Job Role must be at least 2 characters";ve.push({jobRole:Ce,careerCluster:Ge,industry:Be,domain:He,aiResilienceGrading:Re,aiResilienceComment:o,oneLineDescription:F,topCompaniesRecruiting:ki,approxSalaryRangeIndia:zi,globalSalaryRange:Fi,minQual10th12thRecommendedSubjects:Ii,minQualGradRecommendedSubjects:Di,entranceExamsUG:Li,minQualPGRecommendedSubjects:Ti,entranceExamsPG:Ei,certificationsStudents:Ai,certificationsUG:Pi,topCoursesToStudy:Mi,isValid:Ze,error:Gi})}j(ve)}catch{$("Failed to parse file. Please ensure it is a valid CSV/Excel file format.")}},S.readAsText(x)},K=x=>{const S=[];let g=!1,R="";for(let I=0;I<x.length;I++){const T=x[I];T==='"'?g=!g:T===","&&!g?(S.push(R.replace(/^"|"$/g,"").trim()),R=""):R+=T}return S.push(R.replace(/^"|"$/g,"").trim()),S},W=x=>{var g;const S=(g=x.target.files)==null?void 0:g[0];S&&J(S)},f=x=>{var g;x.preventDefault(),u(!1);const S=(g=x.dataTransfer.files)==null?void 0:g[0];S&&J(S)},A=()=>{const x=b.filter(g=>g.isValid);if(x.length===0){r.error("No valid rows to upload");return}const S=x.map(g=>({jobRole:g.jobRole,title:g.jobRole,careerCluster:g.careerCluster,category:g.careerCluster,industry:g.industry,domain:g.domain,aiResilienceGrading:g.aiResilienceGrading,aiResilienceComment:g.aiResilienceComment,oneLineDescription:g.oneLineDescription,description:g.oneLineDescription,topCompaniesRecruiting:g.topCompaniesRecruiting.split(/;|,/).map(R=>R.trim()).filter(Boolean),approxSalaryRangeIndia:g.approxSalaryRangeIndia,globalSalaryRange:g.globalSalaryRange,minQual10th12thRecommendedSubjects:g.minQual10th12thRecommendedSubjects,minQualGradRecommendedSubjects:g.minQualGradRecommendedSubjects,entranceExamsUG:g.entranceExamsUG,minQualPGRecommendedSubjects:g.minQualPGRecommendedSubjects,entranceExamsPG:g.entranceExamsPG,certificationsStudents:g.certificationsStudents,certificationsUG:g.certificationsUG,topCoursesToStudy:g.topCoursesToStudy,status:"active",sourceTenant:"Super Admin 18-Spec Import"}));k.mutate(S)},v=b.filter(x=>x.isValid).length,P=[{key:"jobRole",header:"Job Role (Primary Key)",render:x=>i.jsx($r,{children:x.jobRole||"—"})},{key:"careerCluster",header:"Career Cluster"},{key:"industry",header:"Industry"},{key:"aiResilienceGrading",header:"AI Resilience",render:x=>i.jsx(de,{variant:x.aiResilienceGrading==="High"?"success":x.aiResilienceGrading==="Medium"?"warning":"danger",children:x.aiResilienceGrading})},{key:"isValid",header:"Validation",render:x=>x.isValid?i.jsxs(de,{variant:"success",children:[i.jsx(xi,{children:i.jsx(Ri,{size:13})})," ","Valid"]}):i.jsxs(de,{variant:"danger",children:[i.jsx(xi,{children:i.jsx(ur,{size:13})})," ",x.error||"Invalid"]})}];return i.jsx(_e,{isOpen:e,onClose:U,title:"Bulk Import Career Profiles",subtitle:"Import career profiles using CSV or Excel format",size:"lg",footer:i.jsxs(Cr,{children:[i.jsx(H,{variant:"secondary",onClick:U,disabled:k.isPending,children:"Cancel"}),i.jsxs(H,{onClick:A,disabled:v===0||k.isPending,isLoading:k.isPending,children:["Import ",v," Career Profiles"]})]}),children:i.jsxs(xr,{children:[i.jsxs(gr,{children:[i.jsxs(fr,{children:[i.jsx("h4",{children:"Standard CSV Template"}),i.jsx("p",{children:"Download sample CSV template matching the Career Profile table schema."})]}),i.jsx(H,{size:"sm",variant:"secondary",leftIcon:i.jsx(cr,{size:16}),onClick:te,children:"Download 18-Spec Template"})]}),i.jsxs(hr,{$isDragging:h,$hasFile:!!c,onClick:()=>{var x;return(x=a.current)==null?void 0:x.click()},onDragOver:x=>{x.preventDefault(),u(!0)},onDragLeave:()=>u(!1),onDrop:f,children:[i.jsx(yr,{ref:a,type:"file",accept:".csv, .xlsx, .xls",onChange:W}),c?i.jsxs(i.Fragment,{children:[i.jsx(mi,{$color:"#16a34a",children:i.jsx(pr,{})}),i.jsx(br,{children:c}),i.jsx(gi,{children:"Click or drag to replace file"})]}):i.jsxs(i.Fragment,{children:[i.jsx(mi,{children:i.jsx(dr,{})}),i.jsx(wr,{children:"Click to browse or drag & drop 18-spec CSV file here"}),i.jsx(gi,{children:"Supports .xlsx, .xls, .csv files with 18 standard headers"})]})]}),E&&i.jsx(Sr,{children:E}),b.length>0&&i.jsxs("div",{children:[i.jsxs(jr,{children:[i.jsx("h4",{children:"Parsed 18-Spec Rows Preview"}),i.jsxs(de,{variant:v>0?"success":"danger",children:[v," of ",b.length," rows valid"]})]}),i.jsx(vr,{children:i.jsx(vi,{columns:P,data:b,keyExtractor:(x,S)=>`preview-${x.jobRole||S||0}`,emptyMessage:"No data rows found."})})]})]})})},kr=n.div`
  display: flex;
  flex-direction: column;
`,zr=n.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 3px;
`,fi=n.button`
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
`,Fr=n.div`
  background-color: #f7f5fc;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xl};
`,ro=()=>{const e=Ye(),t=Ve(),[s,r]=y.useState("card"),[a,c]=y.useState("clusters"),[l,h]=y.useState(null),[u,b]=y.useState(null),[j,E]=y.useState(null),[$,k]=y.useState(null),[L,U]=y.useState(""),[te,J]=y.useState(!1),[K,W]=y.useState(!1),[f,A]=y.useState(null),[v,P]=y.useState(null),{data:x=[]}=Y({queryKey:["clusters",L],queryFn:()=>w.getClusters(L)}),{data:S=[]}=Y({queryKey:["industries",l==null?void 0:l.name,L],queryFn:()=>w.getIndustries(l==null?void 0:l.name,L),enabled:!0}),{data:g=[]}=Y({queryKey:["domains",u==null?void 0:u.name,L],queryFn:()=>w.getDomains(u==null?void 0:u.name,L),enabled:!0}),{data:R=[]}=Y({queryKey:["jobRoles",j==null?void 0:j.name,L],queryFn:()=>w.getJobRoles(j==null?void 0:j.name,L),enabled:!0}),{data:I=[]}=Y({queryKey:["entranceExams"],queryFn:w.getEntranceExams}),{data:T=[]}=Y({queryKey:["courses"],queryFn:w.getCourses}),{data:C=[]}=Y({queryKey:["institutions"],queryFn:w.getInstitutions}),Q=D({mutationFn:w.createCluster,onSuccess:()=>{t.invalidateQueries({queryKey:["clusters"]}),e.success("Cluster Added","New career cluster created successfully.")}}),X=D({mutationFn:({id:o,payload:F})=>w.updateCluster(o,F),onSuccess:()=>{t.invalidateQueries({queryKey:["clusters"]}),e.success("Cluster Updated","Cluster updated successfully.")}}),Z=D({mutationFn:w.deleteCluster,onSuccess:()=>{t.invalidateQueries({queryKey:["clusters"]}),e.success("Cluster Deleted","Cluster removed successfully.")}}),ee=D({mutationFn:w.createIndustry,onSuccess:()=>{t.invalidateQueries({queryKey:["industries"]}),e.success("Industry Added","New industry created successfully.")}}),p=D({mutationFn:({id:o,payload:F})=>w.updateIndustry(o,F),onSuccess:()=>{t.invalidateQueries({queryKey:["industries"]}),e.success("Industry Updated","Industry updated successfully.")}}),z=D({mutationFn:w.deleteIndustry,onSuccess:()=>{t.invalidateQueries({queryKey:["industries"]}),e.success("Industry Deleted","Industry removed successfully.")}}),pe=D({mutationFn:w.createDomain,onSuccess:()=>{t.invalidateQueries({queryKey:["domains"]}),e.success("Domain Added","New domain created successfully.")}}),ue=D({mutationFn:({id:o,payload:F})=>w.updateDomain(o,F),onSuccess:()=>{t.invalidateQueries({queryKey:["domains"]}),e.success("Domain Updated","Domain updated successfully.")}}),me=D({mutationFn:w.deleteDomain,onSuccess:()=>{t.invalidateQueries({queryKey:["domains"]}),e.success("Domain Deleted","Domain removed successfully.")}}),xe=D({mutationFn:w.create,onSuccess:()=>{t.invalidateQueries({queryKey:["jobRoles"]}),e.success("Job Role Added","New job role created successfully.")}}),ge=D({mutationFn:({id:o,payload:F})=>w.update(o,F),onSuccess:o=>{t.invalidateQueries({queryKey:["jobRoles"]}),$&&$.id===o.id&&k(o),e.success("Job Role Updated","Job role specification updated successfully.")}}),fe=D({mutationFn:w.deleteJobRole,onSuccess:()=>{t.invalidateQueries({queryKey:["jobRoles"]}),a==="detail"&&c("roles"),e.success("Job Role Deleted","Job role removed successfully.")}}),ne=D({mutationFn:w.toggleShortlist,onSuccess:o=>{t.invalidateQueries({queryKey:["jobRoles"]}),$&&$.id===o.id&&k(o),e.info(o.isShortlisted?"Saved to Shortlist":"Removed from Shortlist",`Role "${o.jobRole}" shortlist status updated.`)}}),se=D({mutationFn:w.toggleExamShortlist,onSuccess:o=>{t.invalidateQueries({queryKey:["entranceExams"]}),e.info(o.isShortlisted?"Exam Shortlisted":"Exam Removed",`Exam "${o.name}" shortlist status updated.`)}}),re=D({mutationFn:w.toggleInstitutionShortlist,onSuccess:o=>{t.invalidateQueries({queryKey:["institutions"]}),e.info(o.isShortlisted?"Institution Shortlisted":"Institution Removed",`Institution "${o.name}" shortlist status updated.`)}}),he=()=>{const o=[{label:"Home",onClick:()=>{c("clusters"),h(null),b(null),E(null),k(null)}}];if(l||a!=="clusters"){const F=(l==null?void 0:l.name)||"Arts, Design & Creative";o.push({label:F,onClick:()=>{c("industries"),b(null),E(null),k(null)}})}if(u||a==="domains"||a==="roles"||a==="detail"){const F=(u==null?void 0:u.name)||"Applied Arts";o.push({label:F,onClick:()=>{c("domains"),E(null),k(null)}})}if(j||a==="roles"||a==="detail"){const F=(j==null?void 0:j.name)||"Digital Arts";o.push({label:F,onClick:()=>{c("roles"),k(null)}})}if($||a==="detail"){const F=($==null?void 0:$.jobRole)||"Applied UI Designer";o.push({label:F})}return o},be=()=>a==="clusters"?"Choose a Career Cluster":a==="industries"?"Choose an Industry within the Career Cluster":a==="domains"?"Choose a Domain within the Industry":a==="roles"?"Choose a Job Role within the Domain":($==null?void 0:$.jobRole)||"Applied UI Designer",ye=()=>a==="clusters"?"Select a career cluster to explore industries and specialization tracks":a==="industries"?`Industries under ${(l==null?void 0:l.name)||"Arts, Design & Creative"}`:a==="domains"?`Domains under ${(u==null?void 0:u.name)||"Applied Arts"}`:a==="roles"?`Job roles under ${(j==null?void 0:j.name)||"Digital Arts"}`:($==null?void 0:$.oneLineDescription)||"Role profile & career pathway details",ve=()=>{if(a==="clusters")return"Add Cluster";if(a==="industries")return"Add Industry";if(a==="domains")return"Add Domain";if(a==="roles")return"Add Job Role"},d=()=>{A(a==="clusters"?{type:"cluster"}:a==="industries"?{type:"industry"}:a==="domains"?{type:"domain"}:{type:"role"}),W(!0)},m=(o,F)=>{A({type:o,item:F}),W(!0)},Ce=o=>{f&&(f.type==="cluster"?f.item?X.mutate({id:f.item.id,payload:{name:o.name,description:o.description}}):Q.mutate({name:o.name,description:o.description}):f.type==="industry"?f.item?p.mutate({id:f.item.id,payload:{name:o.name,description:o.description}}):ee.mutate({clusterName:(l==null?void 0:l.name)||"Arts, Design & Creative",name:o.name,description:o.description}):f.type==="domain"?f.item?ue.mutate({id:f.item.id,payload:{name:o.name,description:o.description}}):pe.mutate({clusterName:(l==null?void 0:l.name)||"Arts, Design & Creative",industryName:(u==null?void 0:u.name)||"Applied Arts",name:o.name,description:o.description}):f.type==="role"&&(f.item?ge.mutate({id:f.item.id,payload:{jobRole:o.name,title:o.name,oneLineDescription:o.description||"Job role specification.",aiResilienceGrading:o.aiResilience||"High",approxSalaryRangeIndia:o.salaryIndia||"₹4–15 LPA",globalSalaryRange:o.salaryGlobal||"$70k–$120k",topCompaniesRecruiting:o.topRecruiters?o.topRecruiters.split(","):["Tech Firms"]}}):xe.mutate({jobRole:o.name,title:o.name,careerCluster:(l==null?void 0:l.name)||"Arts, Design & Creative",industry:(u==null?void 0:u.name)||"Applied Arts",domain:(j==null?void 0:j.name)||"Digital Arts",oneLineDescription:o.description||"Job role specification.",aiResilienceGrading:o.aiResilience||"High",approxSalaryRangeIndia:o.salaryIndia||"₹4–15 LPA",globalSalaryRange:o.salaryGlobal||"$70k–$120k",topCompaniesRecruiting:o.topRecruiters?o.topRecruiters.split(","):["Tech Firms"]})))},Ge=()=>{v&&(v.type==="cluster"?Z.mutate(v.id):v.type==="industry"?z.mutate(v.id):v.type==="domain"?me.mutate(v.id):v.type==="role"&&fe.mutate(v.id),P(null))},Be=()=>{a==="industries"?(c("clusters"),h(null)):a==="domains"?(c("industries"),b(null)):a==="roles"?(c("domains"),E(null)):a==="detail"&&(c("roles"),k(null))},{role:He}=bt(),B=He==="super_admin",Re=ve();return i.jsxs(kr,{children:[i.jsx(Si,{title:s==="simple"?"Career Library Spec Browser":be(),subtitle:s==="simple"?"Select hierarchy options on the left panel to inspect full job role specifications":ye(),breadcrumbs:[{label:"Dashboard",href:We.DASHBOARD},{label:"Career Library"}],onBack:s==="card"&&a!=="clusters"?Be:void 0,actions:i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[i.jsxs(zr,{children:[i.jsxs(fi,{$active:s==="card",onClick:()=>r("card"),children:[i.jsx(yt,{size:16})," Card View"]}),i.jsxs(fi,{$active:s==="simple",onClick:()=>{r("simple"),!l&&x.length>0&&h(x[0])},children:[i.jsx(jt,{size:16})," Simple View"]})]}),B&&s==="card"&&a!=="detail"&&i.jsxs(i.Fragment,{children:[a==="clusters"&&i.jsx(H,{variant:"secondary",leftIcon:i.jsx($t,{size:18}),onClick:()=>J(!0),children:"Bulk Upload"}),Re&&i.jsx(H,{leftIcon:i.jsx(wt,{size:18}),onClick:d,children:Re})]})]})}),s==="simple"?i.jsx(sr,{clusters:x,industries:S,domains:g,roles:R,entranceExams:I,courses:T,institutions:C,onToggleShortlist:o=>ne.mutate(o),onToggleExamShortlist:o=>se.mutate(o),onToggleInstitutionShortlist:o=>re.mutate(o),onEditRole:B?o=>m("role",o):void 0}):i.jsxs(Fr,{children:[i.jsx(Ot,{steps:he(),searchQuery:L,onSearchChange:U}),a==="clusters"&&i.jsx(on,{clusters:x,selectedClusterName:(l==null?void 0:l.name)||"Arts, Design & Creative",onSelectCluster:o=>{h(o),c("industries")},onEditCluster:B?o=>m("cluster",o):void 0,onDeleteCluster:B?o=>P({type:"cluster",id:o.id,name:o.name}):void 0}),a==="industries"&&i.jsx(jn,{industries:S,selectedIndustryName:(u==null?void 0:u.name)||"Applied Arts",onSelectIndustry:o=>{b(o),c("domains")},onEditIndustry:B?o=>m("industry",o):void 0,onDeleteIndustry:B?o=>P({type:"industry",id:o.id,name:o.name}):void 0}),a==="domains"&&i.jsx(Ln,{domains:g,selectedDomainName:(j==null?void 0:j.name)||"Digital Arts",onSelectDomain:o=>{E(o),c("roles")},onEditDomain:B?o=>m("domain",o):void 0,onDeleteDomain:B?o=>P({type:"domain",id:o.id,name:o.name}):void 0}),a==="roles"&&i.jsx(On,{roles:R,selectedRoleId:($==null?void 0:$.id)||"role-ui-1",onSelectRole:o=>{k(o),c("detail")},onEditRole:B?o=>m("role",o):void 0,onDeleteRole:B?o=>P({type:"role",id:o.id,name:o.jobRole}):void 0}),a==="detail"&&$&&i.jsx(Ci,{role:$,entranceExams:I,courses:T,institutions:C,onToggleShortlist:()=>ne.mutate($.id),onToggleExamShortlist:o=>se.mutate(o),onToggleInstitutionShortlist:o=>re.mutate(o),onEditRole:B?o=>m("role",o):void 0})]}),i.jsx(Rr,{isOpen:te,onClose:()=>J(!1)}),i.jsx(lr,{isOpen:K,onClose:()=>{W(!1),A(null)},title:f!=null&&f.item?`Edit ${f.type.toUpperCase()}: ${f.item.name||f.item.jobRole}`:`Add New ${f==null?void 0:f.type.toUpperCase()}`,isJobRole:(f==null?void 0:f.type)==="role",initialValues:f!=null&&f.item?{name:f.item.name||f.item.jobRole,description:f.item.description||f.item.oneLineDescription,aiResilience:f.item.aiResilienceGrading||"High",salaryIndia:f.item.approxSalaryRangeIndia||"₹4–15 LPA",salaryGlobal:f.item.globalSalaryRange||"$70k–$120k",topRecruiters:Array.isArray(f.item.topCompaniesRecruiting)?f.item.topCompaniesRecruiting.join(", "):f.item.topCompaniesRecruiting||"Tech Firms, Startups"}:void 0,onSubmit:Ce}),i.jsx(Rt,{isOpen:!!v,onClose:()=>P(null),onConfirm:Ge,title:`Delete ${v==null?void 0:v.type.toUpperCase()}`,description:`Are you sure you want to delete "${v==null?void 0:v.name}"? This action cannot be undone.`,variant:"danger",confirmText:"Delete Item"})]})},Ir=n.div`
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
`,Dr=n.span`
  font-weight: 700;
  font-size: 14px;
`,Lr=n.div`
  font-size: 11px;
  color: ${({theme:e})=>e.colors.textSecondary};
`,Tr=n.span`
  font-weight: 500;
  font-size: 13px;
`,Er=n.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({theme:e})=>e.spacing.xs};
  margin-top: ${({theme:e})=>e.spacing.md};
`,oo=()=>{const e=Ve(),t=Ye(),[s,r]=y.useState(null),{data:a,isLoading:c}=Y({queryKey:["pending-ratifications"],queryFn:w.getPendingRatifications}),l=D({mutationFn:w.ratify,onSuccess:()=>{e.invalidateQueries({queryKey:["pending-ratifications"]}),e.invalidateQueries({queryKey:["careers"]}),t.success("Career Ratified!","The submission has been ratified and added to the Career Library."),r(null)},onError:()=>t.error("Ratification failed")}),h=D({mutationFn:w.rejectRatification,onSuccess:()=>{e.invalidateQueries({queryKey:["pending-ratifications"]}),t.info("Career Submission Rejected","The submission has been rejected."),r(null)},onError:()=>t.error("Rejection failed")}),u=[{key:"actions",header:"Actions",render:b=>i.jsxs(St,{children:[i.jsx(H,{size:"sm",variant:"secondary",leftIcon:i.jsx(mr,{size:15}),onClick:()=>r(b),children:"Audit Details"}),b.status==="pending"&&i.jsxs(i.Fragment,{children:[i.jsx(H,{size:"sm",variant:"primary",leftIcon:i.jsx(ui,{size:15}),isLoading:l.isPending,onClick:()=>l.mutate(b.id),children:"Ratify & Publish"}),i.jsx(H,{size:"sm",variant:"secondary",leftIcon:i.jsx(pi,{size:15}),isLoading:h.isPending,onClick:()=>h.mutate(b.id),children:"Reject"})]})]})},{key:"careerName",header:"Job Role (Proposed)",render:b=>i.jsxs("div",{children:[i.jsx(Dr,{children:b.careerName}),i.jsxs(Lr,{children:["Submitted: ",b.submittedAt]})]})},{key:"suggestedCategory",header:"Career Cluster",render:b=>i.jsx(de,{variant:"primary",children:b.suggestedCategory})},{key:"sourceTenant",header:"Source Institution",render:b=>i.jsx(Tr,{children:b.sourceTenant})},{key:"status",header:"Ratification Status",render:b=>i.jsx(de,{variant:b.status==="ratified"?"success":b.status==="rejected"?"danger":"warning",dot:!0,children:b.status.charAt(0).toUpperCase()+b.status.slice(1)})}];return i.jsxs("div",{children:[i.jsx(Si,{title:"Pending Career Ratifications",subtitle:"Review, audit, and ratify institution-submitted niche career pathways",breadcrumbs:[{label:"Dashboard",href:We.DASHBOARD},{label:"Career Library",href:We.CAREER_LIBRARY},{label:"Pending Ratifications"}]}),i.jsx(Xe,{children:!a||a.length===0?i.jsx(Ct,{icon:i.jsx(Ri,{size:28}),title:"All caught up!",description:"There are no pending career ratifications at this time."}):i.jsx(vi,{columns:u,data:a,isLoading:c,keyExtractor:b=>b.id})}),s&&i.jsx(_e,{isOpen:!!s,onClose:()=>r(null),title:`Ratification Review: ${s.careerName}`,subtitle:"Audit proposed custom career details before publishing to platform library",size:"md",children:i.jsxs(Ir,{children:[i.jsxs(Le,{children:[i.jsx("span",{children:"Proposed Job Role (Primary Key)"}),i.jsx("p",{children:s.careerName})]}),i.jsxs(Le,{children:[i.jsx("span",{children:"Suggested Career Cluster"}),i.jsx("p",{children:s.suggestedCategory})]}),i.jsxs(Le,{children:[i.jsx("span",{children:"Source Institution"}),i.jsx("p",{children:s.sourceTenant})]}),i.jsxs(Le,{children:[i.jsx("span",{children:"Submitted Description"}),i.jsx("p",{children:s.description})]}),i.jsxs(Er,{children:[i.jsx(H,{variant:"secondary",onClick:()=>r(null),children:"Close"}),s.status==="pending"&&i.jsxs(i.Fragment,{children:[i.jsx(H,{variant:"secondary",leftIcon:i.jsx(pi,{size:16}),onClick:()=>h.mutate(s.id),children:"Reject Submission"}),i.jsx(H,{variant:"primary",leftIcon:i.jsx(ui,{size:16}),onClick:()=>l.mutate(s.id),children:"Ratify & Publish"})]})]})]})})]})};export{ro as CareerListPage,oo as PendingRatificationsPage};
