import{g as o,bi as K,u as J,r as a,c as $,j as t,aN as X,bx as Z,af as ee,by as te,p as oe,bz as W,bA as ie,bG as re,bC as ne,bD as se,av as x,B as C,ai as ae,D as le,bH as de,bI as ce,G as xe,bJ as pe,aO as ue,h as he}from"./index-DxfnM77Y.js";import{P as ge}from"./PageHeader-BSLXrLt3.js";import{B as me}from"./Badge-DIO8ZxMj.js";import"./Card.styles-BHAEiLrq.js";import"./Input-6IZQNX0f.js";import"./Select-B_H_cTqF.js";import"./Checkbox-CruiFBF4.js";import"./Table.styles-DJmqs8Mu.js";import"./FileUpload.styles-CfdKEVAN.js";import"./Breadcrumb-CjfZBw3P.js";import"./Modal-C42QGbOr.js";import"./ConfirmDialog-CGkHF8o4.js";import{S as be}from"./SuccessModal-IoH6VInA.js";import"./SuccessModal.styles-DrpbjAXM.js";import"./Tooltip-Dg_AY9d2.js";import"./Badge.styles-CbkHTPcq.js";const fe=o.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`,ye=o.div`
  background: linear-gradient(180deg, ${({theme:e})=>e.colors.surface} 0%, #fafaff 100%);
  border: 1px solid ${({theme:e})=>e.colors.border};
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
`,we=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
`,je=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
`,ve=o.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`;o.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: ${({theme:e})=>e.colors.primaryLight};
  color: ${({theme:e})=>e.colors.primary};
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;const Se=o.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
  letter-spacing: -0.3px;

  @media (max-width: 640px) {
    font-size: 20px;
  }
`,Ie=o.h2`
  font-size: 15px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.primary};
  margin: 0;
`,ke=o.p`
  font-size: 13px;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
`,$e=o.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,p=o.div`
  background: ${({$gradient:e})=>e};
  border: 1px solid ${({$borderColor:e})=>e};
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
`,u=o.div`
  width: 46px;
  height: 46px;
  border-radius: 4px;
  background-color: ${({$bg:e})=>e};
  color: ${({$color:e})=>e};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,h=o.div`
  display: flex;
  flex-direction: column;
`,g=o.span`
  font-size: 24px;
  font-weight: 800;
  line-height: 1.1;
  color: ${({$color:e})=>e};
`,m=o.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin-top: 2px;
`,E=o.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,A=o.div`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.primaryLight};
  color: ${({$color:e,theme:i})=>e||i.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,Q=o.h3`
  font-size: 17px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,Ce=o.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
  }
`,T=o.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    box-shadow: 0 4px 16px rgba(93, 35, 132, 0.06);
    transform: translateY(-2px);
  }
`,N=o.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,z=o.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: ${({$bg:e})=>e};
  color: ${({$color:e})=>e};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
  flex-shrink: 0;
`,B=o.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
`,D=o.span`
  font-size: 13px;
  color: ${({theme:e})=>e.colors.textSecondary};
  line-height: 1.55;
`,Ee=o.div`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-left: 4px solid ${({theme:e})=>e.colors.primary};
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`,Ae=o.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
`,Qe=o.p`
  font-size: 14px;
  color: ${({theme:e})=>e.colors.textSecondary};
  line-height: 1.65;
  margin: 0;
`;o.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-top: 14px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;o.div`
  background-color: ${({$bg:e})=>e};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-top: 4px solid ${({$borderTopColor:e})=>e};
  border-radius: 4px;
  padding: 14px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;o.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: ${({$color:e})=>e};
`;o.span`
  font-size: 12px;
  color: ${({theme:e})=>e.colors.textSecondary};
  line-height: 1.45;
`;o.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
`;o.div`
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  background-color: #fffbeb;
  border: 1px solid #fde68a;
`;o.div`
  width: 48px;
  background-color: #d97706;
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;o.div`
  padding: 14px 18px;
  font-size: 13px;
  color: #78350f;
  line-height: 1.5;
  display: flex;
  align-items: center;
`;const Te=o.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,b=o.div`
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
`,f=o.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: #fef3c7;
  color: #d97706;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,y=o.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,w=o.span`
  font-size: 15px;
  font-weight: 700;
  color: #78350f;
`,j=o.span`
  font-size: 13px;
  color: #92400e;
  line-height: 1.5;
`,Ne=o.div`
  background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
  border: 1px solid #e9d5ff;
  border-left: 4px solid ${({theme:e})=>e.colors.primary};
  border-radius: 4px;
  padding: 24px;
  color: ${({theme:e})=>e.colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`,ze=o.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.primary};
  margin: 0;
  letter-spacing: -0.2px;
`,Be=o.p`
  font-size: 14px;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`,De=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-top: 12px;
`,Fe=o.span`
  font-size: 13px;
  color: ${({theme:e})=>e.colors.textSecondary};
  font-weight: 500;
`,Re=o.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,Le=o.div`
  background: linear-gradient(135deg, ${({theme:e})=>e.colors.primary} 0%, #2563eb 100%);
  padding: ${({theme:e})=>e.spacing.lg} ${({theme:e})=>e.spacing.xl};
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.sm};
`,Oe=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  letter-spacing: 0.5px;
  text-transform: uppercase;
`,Pe=o.div`
  width: 100%;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  overflow: hidden;
`,We=o.div`
  height: 100%;
  width: ${({$percent:e})=>e}%;
  background-color: #ffffff;
  border-radius: 4px;
  transition: width 0.3s ease;
`,Ye=o.div`
  padding: ${({theme:e})=>e.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: 28px;
`,Ge=o.div`
  background-color: ${({theme:e})=>e.colors.background};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,_e=o.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
  line-height: 1.45;
`,He=o.p`
  font-size: 13px;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
`,Me=o.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-top: 10px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`,Ue=o.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 8px;
  padding: 14px 12px;
  border-radius: 4px;
  border: 1px solid
    ${({$selected:e,theme:i})=>e?i.colors.primary:i.colors.border};
  background-color: ${({$selected:e,theme:i})=>e?i.colors.primaryLight:i.colors.surface};
  color: ${({$selected:e,theme:i})=>e?i.colors.primary:i.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,qe=o.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: ${({$selected:e,theme:i})=>e?i.colors.primary:i.colors.text};
`,Ve=o.span`
  font-size: 12px;
  color: ${({$selected:e,theme:i})=>e?i.colors.primary:i.colors.textSecondary};
  line-height: 1.45;
`,Ke=o.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Je=o.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  color: ${({theme:e})=>e.colors.text};

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }

  input[type='radio'] {
    accent-color: ${({theme:e})=>e.colors.primary};
  }

  ${({$selected:e,theme:i})=>e&&K`
      border-color: ${i.colors.primary};
      background-color: ${i.colors.primaryLight};
      font-weight: 600;
    `}
`,Xe=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:e})=>e.spacing.lg} ${({theme:e})=>e.spacing.xl};
  background-color: ${({theme:e})=>e.colors.background};
  border-top: 1px solid ${({theme:e})=>e.colors.border};
`,Ze=[{val:1,label:"Strongly Disagree",desc:"This really does not describe you. You are certain it does not apply to you at all.",icon:le},{val:2,label:"Disagree",desc:"This does not describe you. You generally do not feel this way.",icon:de},{val:3,label:"Neutral",desc:"You are genuinely unsure, you cannot say yes or no. Overuse of Neutral reduces the accuracy of your results. If you even slightly agree or slightly disagree, choose that.",icon:ce},{val:4,label:"Agree",desc:"It does describe you but not as strongly. You generally feel this way.",icon:xe},{val:5,label:"Strongly Agree",desc:"You really feel this describes you. You are sure about it.",icon:pe}],v=[{id:"Q1",text:"I enjoy building or fixing things with my hands like putting together models eg Lego, rubiks cube, etc or playing with gadgets, or figuring out how everyday objects work."},{id:"Q2",text:"I like working outdoors with plants, animals, or nature."},{id:"Q3",text:"I enjoy operating tools, machinery, or technical equipment."},{id:"Q4",text:"I like physical activities and working with tangible materials."},{id:"Q5",text:"I love asking 'why' and trying to understand the science or logic behind things I observe."},{id:"Q6",text:"I enjoy solving complex mathematical equations or scientific puzzles."},{id:"Q7",text:"I like reading research papers, scientific articles, or analyzing data."},{id:"Q8",text:"I prefer working independently to investigate and solve technical problems."},{id:"Q9",text:"I love creative writing, painting, graphic design, or performing arts."},{id:"Q10",text:"I enjoy designing original visual layouts, music, or digital artwork."},{id:"Q11",text:"I prefer unstructured environments where I can express my imagination freely."},{id:"Q12",text:"I like expressing my emotions and ideas through literature, drama, or media."},{id:"Q13",text:"I enjoy helping, teaching, or mentoring other students with their studies."},{id:"Q14",text:"I like listening to people's personal problems and offering supportive advice."},{id:"Q15",text:"I enjoy participating in community service, volunteering, or social causes."},{id:"Q16",text:"I prefer working in team settings focused on human welfare and education."},{id:"Q17",text:"I enjoy taking charge of team projects and leading group discussions."},{id:"Q18",text:"I like pitching ideas, persuading others, or debating competitive topics."},{id:"Q19",text:"I am interested in entrepreneurship, business management, and marketing strategy."},{id:"Q20",text:"I enjoy setting goals, taking calculated risks, and driving team success."},{id:"Q21",text:"I like organizing spreadsheets, keeping accurate records, and filing documents."},{id:"Q22",text:"I prefer clear step-by-step guidelines and established rules when doing tasks."},{id:"Q23",text:"I enjoy working with financial calculations, budgets, or administrative data."},{id:"Q24",text:"I take pride in attention to detail, precision, and systematic record-keeping."}],F=[{id:"Q25",text:"I enjoy exploring new ideas, topics or areas of knowledge even when they are not related to my studies."},{id:"Q26",text:"I am open to trying unfamiliar approaches and thinking outside traditional boundaries."},{id:"Q27",text:"I enjoy abstract thinking, philosophy, and discussing big-picture concepts."},{id:"Q28",text:"I am deeply curious about how different cultures, technology, and art evolve."},{id:"Q29",text:"I keep my study space neat, organized, and well-structured."},{id:"Q30",text:"I prepare thoroughly for tests and follow a strict study plan."},{id:"Q31",text:"I pay close attention to minor details and take responsibility for my work."},{id:"Q32",text:"I often leave tasks till the last minute and find it hard to stick to a schedule or plan."},{id:"Q33",text:"I feel energized when interacting in large groups, clubs, or social events."},{id:"Q34",text:"I speak up confidently in class discussions and express my thoughts easily."},{id:"Q35",text:"I initiate conversations easily when meeting new people."},{id:"Q36",text:"I prefer quiet individual work over high-energy social gatherings."},{id:"Q37",text:"I am considerate, empathetic, and polite toward classmates and teachers."},{id:"Q38",text:"I value cooperation and try to avoid unnecessary arguments with others."},{id:"Q39",text:"I willingly help peers when they are struggling without expecting anything in return."},{id:"Q40",text:"I trust that most people have good intentions."},{id:"Q41",text:"I often feel anxious or worried when facing upcoming exams or deadlines."},{id:"Q42",text:"My mood changes quickly depending on my surroundings or academic results."},{id:"Q43",text:"I find it difficult to calm down when unexpected disruptions occur."},{id:"Q44",text:"I stay calm and steady even under intense time pressure."}],Y=[{id:"Q45",text:"A shopkeeper sells a pen for ₹30, making a profit of 20%. What is the cost price of the pen?",options:[{label:"A",text:"₹22"},{label:"B",text:"₹24"},{label:"C",text:"₹25"},{label:"D",text:"₹26"},{label:"E",text:"Not Sure"}]},{id:"Q46",text:"If 3x + 7 = 22, what is the value of x?",options:[{label:"A",text:"4"},{label:"B",text:"5"},{label:"C",text:"6"},{label:"D",text:"7"},{label:"E",text:"Not Sure"}]},{id:"Q47",text:"If 5 workers complete a project in 12 days, how many days will 6 workers take to complete the same project at the same rate?",options:[{label:"A",text:"8 days"},{label:"B",text:"10 days"},{label:"C",text:"11 days"},{label:"D",text:"14 days"},{label:"E",text:"Not Sure"}]},{id:"Q48",text:"Find the median of the set of numbers: 12, 7, 19, 4, 15, 9, 21.",options:[{label:"A",text:"9"},{label:"B",text:"12"},{label:"C",text:"14"},{label:"D",text:"15"},{label:"E",text:"Not Sure"}]},{id:"Q49",text:"A train running at 72 km/h crosses a pole in 10 seconds. What is the length of the train?",options:[{label:"A",text:"150m"},{label:"B",text:"180m"},{label:"C",text:"200m"},{label:"D",text:"220m"},{label:"E",text:"Not Sure"}]},{id:"Q50",text:"What is 15% of 240?",options:[{label:"A",text:"32"},{label:"B",text:"36"},{label:"C",text:"40"},{label:"D",text:"42"},{label:"E",text:"Not Sure"}]},{id:"Q51",text:"Select the odd one out among the given options.",options:[{label:"A",text:"Circle"},{label:"B",text:"Square"},{label:"C",text:"Cube"},{label:"D",text:"Triangle"},{label:"E",text:"Not Sure"}]},{id:"Q52",text:"If ALL Pencils are Pens, and SOME Pens are Markers, which statement is DEFINITELY true?",options:[{label:"A",text:"All Pencils are Markers"},{label:"B",text:"Some Pencils may be Markers"},{label:"C",text:"No Pencils are Markers"},{label:"D",text:"All Markers are Pens"},{label:"E",text:"Not Sure"}]},{id:"Q53",text:"Complete the number series: 2, 6, 12, 20, 30, ___?",options:[{label:"A",text:"36"},{label:"B",text:"40"},{label:"C",text:"42"},{label:"D",text:"48"},{label:"E",text:"Not Sure"}]},{id:"Q54",text:"Complete the letter series: B, D, G, K, P, ___?",options:[{label:"A",text:"U"},{label:"B",text:"V"},{label:"C",text:"W"},{label:"D",text:"X"},{label:"E",text:"Not Sure"}]},{id:"Q55",text:"Pointing to a photograph, Riya said 'He is the son of the only son of my grandfather'. How is the man related to Riya?",options:[{label:"A",text:"Father"},{label:"B",text:"Brother"},{label:"C",text:"Uncle"},{label:"D",text:"Cousin"},{label:"E",text:"Not Sure"}]},{id:"Q56",text:"If North becomes South-East, what does West become?",options:[{label:"A",text:"North-East"},{label:"B",text:"North-West"},{label:"C",text:"South-East"},{label:"D",text:"South-West"},{label:"E",text:"Not Sure"}]},{id:"Q57",text:"Which fraction is the largest: 3/4, 5/6, 7/9, 11/12?",options:[{label:"A",text:"3/4"},{label:"B",text:"5/6"},{label:"C",text:"7/9"},{label:"D",text:"11/12"},{label:"E",text:"Not Sure"}]},{id:"Q58",text:"A pattern alternates between a filled shape and an empty shape of the same type, rotating 90° clockwise each step. The sequence so far is: Filled Circle -> Empty Square -> Filled Triangle -> Empty Circle. What comes next?",options:[{label:"A",text:"Filled Square"},{label:"B",text:"Empty Square"},{label:"C",text:"Filled Triangle"},{label:"D",text:"Empty Triangle"},{label:"E",text:"Not Sure"}]},{id:"Q59",text:"In a coding language: DOG = 26, CAT = 24, BAT = 23. Following the same logic, what does FISH equal?",options:[{label:"A",text:"38"},{label:"B",text:"42"},{label:"C",text:"45"},{label:"D",text:"50"},{label:"E",text:"Not Sure"}]},{id:"Q60",text:"An analog clock shows 3:15. What is the angle between the hour hand and the minute hand?",options:[{label:"A",text:"0°"},{label:"B",text:"7.5°"},{label:"C",text:"15°"},{label:"D",text:"22.5°"},{label:"E",text:"Not Sure"}]},{id:"Q61",text:"If A is taller than B, B is taller than C, and C is shorter than D, who is DEFINITELY the shortest?",options:[{label:"A",text:"A"},{label:"B",text:"B"},{label:"C",text:"C"},{label:"D",text:"D"},{label:"E",text:"Not Sure"}]},{id:"Q62",text:"A 3×3×3 cube is painted red on all 6 faces and then cut into 27 equal smaller cubes. How many of the smaller cubes have exactly 2 faces painted red?",options:[{label:"A",text:"6"},{label:"B",text:"8"},{label:"C",text:"12"},{label:"D",text:"18"},{label:"E",text:"Not Sure"}]},{id:"Q63",text:"What is the average of the first 5 prime numbers (2, 3, 5, 7, 11)?",options:[{label:"A",text:"5.2"},{label:"B",text:"5.6"},{label:"C",text:"6.0"},{label:"D",text:"6.4"},{label:"E",text:"Not Sure"}]},{id:"Q64",text:"If a circle has a radius of 7 cm, what is its approximate area? (Use π = 22/7)",options:[{label:"A",text:"144 cm²"},{label:"B",text:"154 cm²"},{label:"C",text:"164 cm²"},{label:"D",text:"176 cm²"},{label:"E",text:"Not Sure"}]}],et=[{id:"Q65",text:"When I encounter a new subject or skill, I pick it up quickly and enjoy the challenge of learning something unfamiliar."},{id:"Q66",text:"I break complex problems down into smaller manageable components before deciding on a solution."},{id:"Q67",text:"I evaluate multiple perspectives and gather evidence before drawing conclusions."},{id:"Q68",text:"I am comfortable adapting my plans when new information contradicts my initial assumptions."},{id:"Q69",text:"I make decisions based on logical reasoning rather than impulse or emotional pressure."},{id:"Q70",text:"When there is no clear plan or I cannot predict what will happen next, I feel very unsettled and find it difficult to take any action."},{id:"Q71",text:"I reflect on past mistakes to refine my strategy and decision-making approach."},{id:"Q72",text:"I enjoy brainstorming creative solutions to open-ended problems with no single right answer."},{id:"Q73",text:"I stay focused on long-term career goals even when faced with immediate minor setbacks."}],G=[...v.map((e,i)=>({id:e.id,num:i+1,text:e.text,type:"likert",sectionNum:1,sectionTitle:"RIASEC INTEREST INVENTORY",sectionInstruction:"Instructions: Rate how much you agree with each statement on a scale of 1 (Strongly Disagree) to 5 (Strongly Agree)."})),...F.map((e,i)=>({id:e.id,num:v.length+i+1,text:e.text,type:"likert",sectionNum:2,sectionTitle:"BIG FIVE PERSONALITY TRAITS",sectionInstruction:"Instructions: Rate your agreement with each personality statement from 1 (Strongly Disagree) to 5 (Strongly Agree)."})),...Y.map((e,i)=>({id:e.id,num:v.length+F.length+i+1,text:e.text,type:"aptitude",options:e.options,sectionNum:3,sectionTitle:"APTITUDE & REASONING",sectionInstruction:"Instructions: Multiple choice aptitude questions. Select the single best answer, or select 'Not Sure' if genuinely unsure."})),...et.map((e,i)=>({id:e.id,num:v.length+F.length+Y.length+i+1,text:e.text,type:"likert",sectionNum:4,sectionTitle:"COGNITIVE & DECISION STYLE",sectionInstruction:"Instructions: Reverting to 1 to 5 scale (Strongly Disagree to Strongly Agree) for cognitive & decision-making style."}))],bt=()=>{const e=J(),[i,_]=a.useState(!1),[l,R]=a.useState(0),d=G.length,n=G[l],[s,H]=a.useState({}),S=a.useRef(null),L=()=>{setTimeout(()=>{S.current&&S.current.scrollIntoView({behavior:"smooth",block:"start"});const r=document.querySelector("main");r&&r.scrollTo({top:0,behavior:"smooth"}),window.scrollTo({top:0,behavior:"smooth"})},50)},M=()=>{s[n.id]!==void 0&&(R(r=>Math.min(d-1,r+1)),L())},O=(r,k)=>{H(c=>({...c,[r]:k}))},[U,I]=a.useState(!1),q=()=>{localStorage.setItem("pwc_assessment_form_submitted","true"),I(!0)},V=a.useCallback(()=>{I(!1),e($.STUDENT_PORTAL)},[e]),P=Math.round((l+1)/d*100);return t.jsxs(fe,{ref:S,children:[i&&t.jsx(ge,{title:"CLASS 9 & 10 CAREER ASSESSMENT",subtitle:"Career Counselling Programme — Instructions for Students",breadcrumbs:[{label:"Student Portal",href:$.STUDENT_PORTAL},{label:"Career Assessment"}],actions:t.jsxs(me,{variant:"primary",size:"md",children:["Question ",l+1," of ",d]})}),i?t.jsxs(Re,{children:[t.jsxs(Le,{children:[t.jsxs(Oe,{children:[t.jsxs("span",{children:["SECTION ",n.sectionNum," OF 4: ",n.sectionTitle]}),t.jsxs("span",{children:["Question ",l+1," of ",d," (",P,"%)"]})]}),t.jsx(Pe,{children:t.jsx(We,{$percent:P})})]}),t.jsxs(Ye,{children:[t.jsx(He,{style:{fontSize:"14px",fontWeight:500,color:"#334155"},children:n.sectionInstruction}),t.jsxs(Ge,{children:[t.jsxs(_e,{children:[n.num,". ",n.text]}),n.type==="likert"&&t.jsx(Me,{children:Ze.map(r=>{const k=r.icon,c=s[n.id]===r.val;return t.jsxs(Ue,{type:"button",$selected:c,onClick:()=>O(n.id,r.val),children:[t.jsxs(qe,{$selected:c,children:[t.jsx(k,{size:16}),t.jsx("span",{children:r.label})]}),t.jsx(Ve,{$selected:c,children:r.desc})]},r.val)})}),n.type==="aptitude"&&n.options&&t.jsx(Ke,{children:n.options.map(r=>t.jsxs(Je,{$selected:s[n.id]===r.label,children:[t.jsx("input",{type:"radio",name:`q_${n.id}`,value:r.label,checked:s[n.id]===r.label,onChange:()=>O(n.id,r.label)}),t.jsx("span",{children:r.text})]},r.label))})]},n.id)]}),t.jsx(Xe,{style:{justifyContent:"flex-end"},children:l<d-1?t.jsx(C,{type:"button",variant:"primary",size:"md",rightIcon:t.jsx(ue,{size:18}),disabled:s[n.id]===void 0,onClick:M,children:"Next Question"}):t.jsx(C,{type:"button",variant:"primary",size:"md",leftIcon:t.jsx(he,{size:18}),disabled:s[n.id]===void 0,onClick:q,children:"Submit Assessment"})})]}):t.jsxs(ye,{children:[t.jsxs(we,{children:[t.jsx(je,{children:t.jsx(ve,{type:"button",onClick:()=>e($.STUDENT_PORTAL),"aria-label":"Back to Student Portal",children:t.jsx(X,{size:18})})}),t.jsx(Se,{children:"CLASS 9 & 10 CAREER ASSESSMENT"}),t.jsx(Ie,{children:"Instructions for Students"}),t.jsx(ke,{children:"Read this carefully before you begin."})]}),t.jsxs($e,{children:[t.jsxs(p,{$gradient:"linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)",$borderColor:"#DBEAFE",children:[t.jsx(u,{$bg:"#DBEAFE",$color:"#1E40AF",children:t.jsx(Z,{size:24})}),t.jsxs(h,{children:[t.jsx(g,{$color:"#1E40AF",children:"73"}),t.jsx(m,{children:"Questions"})]})]}),t.jsxs(p,{$gradient:"linear-gradient(135deg, #F8FAFC 0%, #FAF5FF 100%)",$borderColor:"#E9D5FF",children:[t.jsx(u,{$bg:"#F3E8FF",$color:"#6B21A8",children:t.jsx(ee,{size:24})}),t.jsxs(h,{children:[t.jsx(g,{$color:"#6B21A8",children:"4"}),t.jsx(m,{children:"Sections"})]})]}),t.jsxs(p,{$gradient:"linear-gradient(135deg, #F8FAFC 0%, #FEF3C7 100%)",$borderColor:"#FDE68A",children:[t.jsx(u,{$bg:"#FEF3C7",$color:"#B45309",children:t.jsx(te,{size:24})}),t.jsxs(h,{children:[t.jsx(g,{$color:"#B45309",children:"30–35"}),t.jsx(m,{children:"Minutes"})]})]}),t.jsxs(p,{$gradient:"linear-gradient(135deg, #F8FAFC 0%, #ECFDF5 100%)",$borderColor:"#A7F3D0",children:[t.jsx(u,{$bg:"#D1FAE5",$color:"#047857",children:t.jsx(oe,{size:24})}),t.jsxs(h,{children:[t.jsx(g,{$color:"#047857",children:"100%"}),t.jsx(m,{children:"Confidential"})]})]})]}),t.jsxs("div",{children:[t.jsxs(E,{children:[t.jsx(A,{$color:"#2563EB",children:t.jsx(W,{size:18})}),t.jsx(Q,{children:"Before You Begin"})]}),t.jsxs(Ce,{style:{marginTop:16},children:[t.jsxs(T,{children:[t.jsxs(N,{children:[t.jsx(z,{$bg:"#DBEAFE",$color:"#1E40AF",children:t.jsx(ie,{size:20})}),t.jsx(B,{children:"1. Find a quiet spot."})]}),t.jsx(D,{children:"Sit somewhere with no distractions — no noise, no interruptions. This is your time."})]}),t.jsxs(T,{children:[t.jsxs(N,{children:[t.jsx(z,{$bg:"#D1FAE5",$color:"#047857",children:t.jsx(re,{size:20})}),t.jsx(B,{children:"2. Check your Internet."})]}),t.jsx(D,{children:"You will need a stable connection throughout. Make sure you are connected before you start. In case your connection drops, you can resume from where you have left."})]}),t.jsxs(T,{children:[t.jsxs(N,{children:[t.jsx(z,{$bg:"#F3E8FF",$color:"#6B21A8",children:t.jsx(ne,{size:20})}),t.jsx(B,{children:"3. Keep your phone away."})]}),t.jsx(D,{children:"Avoid distractions. The assessment takes only 30–35 minutes — give it your full attention."})]})]})]}),t.jsxs("div",{children:[t.jsxs(E,{children:[t.jsx(A,{$color:"#5D2384",children:t.jsx(se,{size:18})}),t.jsx(Q,{children:"What This Assessment Is About"})]}),t.jsxs(Ee,{style:{marginTop:16},children:[t.jsxs(Ae,{children:[t.jsx(W,{size:20,style:{color:"#5D2384"}}),t.jsx("span",{children:"This is not a test. There are no right or wrong answers."})]}),t.jsx(Qe,{children:"This assessment is simply about YOU — your interests, your personality, how you think, and what you are naturally good at. What kinds of activities and environments you genuinely enjoy? How you naturally behave — your energy, discipline, empathy, and more? Your natural reasoning ability — numbers, words, logic, and visuals. How you learn, handle uncertainty, and prefer to work. The results will help you understand which careers and streams are the best fit for you. Nobody is judging your answers. Your responses are completely confidential and will only be used for your career guidance."})]})]}),t.jsxs("div",{children:[t.jsxs(E,{children:[t.jsx(A,{$color:"#D97706",children:t.jsx(x,{size:18})}),t.jsx(Q,{children:"The Golden Rules — Read These Carefully"})]}),t.jsxs(Te,{style:{marginTop:16},children:[t.jsxs(b,{children:[t.jsx(f,{children:t.jsx(x,{size:20})}),t.jsxs(y,{children:[t.jsx(w,{children:"Be honest. Be yourself."}),t.jsx(j,{children:"Answer based on how YOU actually are — not how you want to be seen, not what sounds impressive, not what you think a counsellor wants to hear. The more honest you are, the more useful your results will be."})]})]}),t.jsxs(b,{children:[t.jsx(f,{children:t.jsx(x,{size:20})}),t.jsxs(y,{children:[t.jsx(w,{children:"Go with your first instinct."}),t.jsx(j,{children:"Do not overthink. Your first reaction to a statement is usually the most accurate reflection of who you are. If you sit on a question too long, you start second-guessing yourself."})]})]}),t.jsxs(b,{children:[t.jsx(f,{children:t.jsx(x,{size:20})}),t.jsxs(y,{children:[t.jsx(w,{children:"Do not skip or rush."}),t.jsx(j,{children:"Every question contributes to your profile. At the same time, do not spend more than a few seconds on any single question — keep moving."})]})]}),t.jsxs(b,{children:[t.jsx(f,{children:t.jsx(x,{size:20})}),t.jsxs(y,{children:[t.jsx(w,{children:"Your results are private."}),t.jsx(j,{children:"Only you and your career counsellor will see them. This is a safe space — be real."})]})]})]})]}),t.jsxs(Ne,{children:[t.jsx(ze,{children:"You are ready. Take a deep breath."}),t.jsx(Be,{children:"There is nothing to prepare for. Just be yourself — and let the results do the rest."})]}),t.jsxs(De,{children:[t.jsx(C,{variant:"primary",size:"lg",rightIcon:t.jsx(ae,{size:20}),onClick:()=>{_(!0),R(0),L()},style:{minWidth:"300px"},children:"Start Career Assessment"}),t.jsx(Fe,{children:"Estimated time: 30-35 minutes • Answers saved automatically as you navigate"})]})]}),t.jsx(be,{isOpen:U,onClose:()=>I(!1),title:"Thank you for completing your Career Assessment!",message:"Your 73 answers have been saved and your Ikigai profile report is generating.",confirmText:"Go to Student Portal",onConfirm:V})]})};export{bt as AssessmentFormPage,bt as default};
