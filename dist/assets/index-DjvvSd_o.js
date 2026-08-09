import{g as i,aV as de,u as ce,d as xe,r as m,j as e,c as f,aB as X,br as pe,a2 as he,bs as ge,ag as ue,bt as Z,bu as be,bA as me,bw as fe,bx as ye,bB as je,bC as we,aW as Se,bo as ve,bD as ke,bE as $e,bF as q,aj as d,B as y,a5 as Ie,aC as Ae,f as Ee}from"./index-DquQY_gK.js";import{P as Ce}from"./PageHeader-CH8ZQzui.js";import{B as Fe}from"./Badge-IsTjrd75.js";import"./Tooltip-n1WJqe4o.js";import"./Badge.styles-CPrEOBEn.js";const Te=i.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`,Qe=i.div`
  background: linear-gradient(180deg, ${({theme:t})=>t.colors.surface} 0%, #FAFAFF 100%);
  border: 1px solid ${({theme:t})=>t.colors.border};
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
`,Be=i.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({theme:t})=>t.colors.border};
`,ze=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
`,De=i.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 4px;
  border: 1px solid ${({theme:t})=>t.colors.border};
  background-color: ${({theme:t})=>t.colors.surface};
  color: ${({theme:t})=>t.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:t})=>t.colors.primary};
    color: ${({theme:t})=>t.colors.primary};
    background-color: ${({theme:t})=>t.colors.primaryLight};
  }
`;i.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: ${({theme:t})=>t.colors.primaryLight};
  color: ${({theme:t})=>t.colors.primary};
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;const Ne=i.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({theme:t})=>t.colors.text};
  margin: 0;
  letter-spacing: -0.3px;

  @media (max-width: 640px) {
    font-size: 20px;
  }
`,Re=i.h2`
  font-size: 15px;
  font-weight: 600;
  color: ${({theme:t})=>t.colors.primary};
  margin: 0;
`,Le=i.p`
  font-size: 13px;
  color: ${({theme:t})=>t.colors.textSecondary};
  margin: 0;
`,Pe=i.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,j=i.div`
  background: ${({$gradient:t})=>t};
  border: 1px solid ${({$borderColor:t})=>t};
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
`,w=i.div`
  width: 46px;
  height: 46px;
  border-radius: 4px;
  background-color: ${({$bg:t})=>t};
  color: ${({$color:t})=>t};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,S=i.div`
  display: flex;
  flex-direction: column;
`,v=i.span`
  font-size: 24px;
  font-weight: 800;
  line-height: 1.1;
  color: ${({$color:t})=>t};
`,k=i.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme:t})=>t.colors.textSecondary};
  margin-top: 2px;
`,$=i.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({theme:t})=>t.colors.border};
`,I=i.div`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${({theme:t})=>t.colors.primaryLight};
  color: ${({$color:t,theme:s})=>t||s.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,A=i.h3`
  font-size: 17px;
  font-weight: 700;
  color: ${({theme:t})=>t.colors.text};
  margin: 0;
`,Oe=i.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
  }
`,L=i.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background-color: ${({theme:t})=>t.colors.surface};
  border: 1px solid ${({theme:t})=>t.colors.border};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:t})=>t.colors.primary};
    box-shadow: 0 4px 16px rgba(93, 35, 132, 0.06);
    transform: translateY(-2px);
  }
`,P=i.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,O=i.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: ${({$bg:t})=>t};
  color: ${({$color:t})=>t};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
  flex-shrink: 0;
`,W=i.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({theme:t})=>t.colors.text};
`,Y=i.span`
  font-size: 13px;
  color: ${({theme:t})=>t.colors.textSecondary};
  line-height: 1.55;
`,We=i.div`
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  border: 1px solid ${({theme:t})=>t.colors.border};
  border-left: 4px solid ${({theme:t})=>t.colors.primary};
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`,Ye=i.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: ${({theme:t})=>t.colors.text};
`,_e=i.p`
  font-size: 14px;
  color: ${({theme:t})=>t.colors.textSecondary};
  line-height: 1.65;
  margin: 0;
`,Ge=i.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin-top: 12px;
  margin-bottom: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,c=i.div`
  background-color: ${({$bg:t})=>t};
  color: ${({$color:t})=>t||"#ffffff"};
  padding: 12px 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`,x=i.span`
  font-size: 16px;
  font-weight: 800;
`,p=i.span`
  font-size: 12px;
  font-weight: 600;
`,He=i.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,h=i.div`
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  background-color: ${({$bg:t})=>t};
  border: 1px solid ${({theme:t})=>t.colors.border};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  @media (max-width: 640px) {
    flex-direction: column;
  }
`,g=i.div`
  width: 170px;
  background-color: ${({$bg:t})=>t};
  color: ${({$color:t})=>t||"#ffffff"};
  padding: 14px 16px;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 640px) {
    width: 100%;
  }
`,u=i.div`
  padding: 14px 18px;
  font-size: 13px;
  color: ${({theme:t})=>t.colors.text};
  line-height: 1.5;
  display: flex;
  align-items: center;
`,Ue=i.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
`,ee=i.div`
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  background-color: #FFFBEB;
  border: 1px solid #FDE68A;
`,te=i.div`
  width: 48px;
  background-color: #D97706;
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,ie=i.div`
  padding: 14px 18px;
  font-size: 13px;
  color: #78350F;
  line-height: 1.5;
  display: flex;
  align-items: center;
`,Me=i.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,E=i.div`
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
`,C=i.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: #FEF3C7;
  color: #D97706;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,F=i.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,T=i.span`
  font-size: 15px;
  font-weight: 700;
  color: #78350F;
`,Q=i.span`
  font-size: 13px;
  color: #92400E;
  line-height: 1.5;
`,Ve=i.div`
  background: linear-gradient(135deg, ${({theme:t})=>t.colors.primary} 0%, #1E3A8A 100%);
  border-radius: 4px;
  padding: 32px 24px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(93, 35, 132, 0.15);
`,Ke=i.h3`
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.2px;
`,Je=i.p`
  font-size: 14px;
  color: #ffffff;
  margin: 0;
  opacity: 0.95;
  font-weight: 400;
`,Xe=i.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-top: 12px;
`,Ze=i.span`
  font-size: 13px;
  color: ${({theme:t})=>t.colors.textSecondary};
  font-weight: 500;
`,qe=i.div`
  background-color: ${({theme:t})=>t.colors.surface};
  border: 1px solid ${({theme:t})=>t.colors.border};
  border-radius: 4px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,et=i.div`
  background: linear-gradient(135deg, ${({theme:t})=>t.colors.primary} 0%, #2563EB 100%);
  padding: ${({theme:t})=>t.spacing.lg} ${({theme:t})=>t.spacing.xl};
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: ${({theme:t})=>t.spacing.sm};
`,tt=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({theme:t})=>t.fontSize.sm};
  font-weight: ${({theme:t})=>t.fontWeight.semibold};
  letter-spacing: 0.5px;
  text-transform: uppercase;
`,it=i.div`
  width: 100%;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  overflow: hidden;
`,ot=i.div`
  height: 100%;
  width: ${({$percent:t})=>t}%;
  background-color: #ffffff;
  border-radius: 4px;
  transition: width 0.3s ease;
`,rt=i.div`
  padding: ${({theme:t})=>t.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: 28px;
`,B=i.div`
  background-color: ${({theme:t})=>t.colors.background};
  border: 1px solid ${({theme:t})=>t.colors.border};
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,z=i.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({theme:t})=>t.colors.text};
  margin: 0;
  line-height: 1.45;
`,D=i.p`
  font-size: 13px;
  color: ${({theme:t})=>t.colors.textSecondary};
  margin: 0;
`,_=i.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-top: 6px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,G=i.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 8px;
  border-radius: 4px;
  border: 1px solid
    ${({$selected:t,theme:s})=>t?s.colors.primary:s.colors.border};
  background-color: ${({$selected:t,theme:s})=>t?s.colors.primaryLight:s.colors.surface};
  color: ${({$selected:t,theme:s})=>t?s.colors.primary:s.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;

  &:hover {
    border-color: ${({theme:t})=>t.colors.primary};
    background-color: ${({theme:t})=>t.colors.primaryLight};
    color: ${({theme:t})=>t.colors.primary};
  }
`,H=i.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: ${({$selected:t,theme:s})=>t?s.colors.primary:s.colors.border};
  color: ${({$selected:t,theme:s})=>t?"#ffffff":s.colors.text};
  font-size: 13px;
  font-weight: 700;
`,U=i.span`
  font-size: 13px;
  font-weight: 500;
  line-height: 1.2;
`,st=i.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,nt=i.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 4px;
  border: 1px solid ${({theme:t})=>t.colors.border};
  background-color: ${({theme:t})=>t.colors.surface};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  color: ${({theme:t})=>t.colors.text};

  &:hover {
    border-color: ${({theme:t})=>t.colors.primary};
    background-color: ${({theme:t})=>t.colors.primaryLight};
  }

  input[type='radio'] {
    accent-color: ${({theme:t})=>t.colors.primary};
  }

  ${({$selected:t,theme:s})=>t&&de`
      border-color: ${s.colors.primary};
      background-color: ${s.colors.primaryLight};
      font-weight: 600;
    `}
`,lt=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:t})=>t.spacing.lg} ${({theme:t})=>t.spacing.xl};
  background-color: ${({theme:t})=>t.colors.background};
  border-top: 1px solid ${({theme:t})=>t.colors.border};
`,M=[{val:1,label:"Strongly Disagree"},{val:2,label:"Disagree"},{val:3,label:"Neutral"},{val:4,label:"Agree"},{val:5,label:"Strongly Agree"}],at=[{id:"Q1",text:"I enjoy building or fixing things with my hands like putting together models eg Lego, rubiks cube, etc or playing with gadgets, or figuring out how everyday objects work."},{id:"Q2",text:"I like working outdoors with plants, animals, or nature."},{id:"Q3",text:"I enjoy operating tools, machinery, or technical equipment."},{id:"Q4",text:"I like physical activities and working with tangible materials."},{id:"Q5",text:"I love asking 'why' and trying to understand the science or logic behind things I observe."},{id:"Q6",text:"I enjoy solving complex mathematical equations or scientific puzzles."},{id:"Q7",text:"I like reading research papers, scientific articles, or analyzing data."},{id:"Q8",text:"I prefer working independently to investigate and solve technical problems."},{id:"Q9",text:"I love creative writing, painting, graphic design, or performing arts."},{id:"Q10",text:"I enjoy designing original visual layouts, music, or digital artwork."},{id:"Q11",text:"I prefer unstructured environments where I can express my imagination freely."},{id:"Q12",text:"I like expressing my emotions and ideas through literature, drama, or media."},{id:"Q13",text:"I enjoy helping, teaching, or mentoring other students with their studies."},{id:"Q14",text:"I like listening to people's personal problems and offering supportive advice."},{id:"Q15",text:"I enjoy participating in community service, volunteering, or social causes."},{id:"Q16",text:"I prefer working in team settings focused on human welfare and education."},{id:"Q17",text:"I enjoy taking charge of team projects and leading group discussions."},{id:"Q18",text:"I like pitching ideas, persuading others, or debating competitive topics."},{id:"Q19",text:"I am interested in entrepreneurship, business management, and marketing strategy."},{id:"Q20",text:"I enjoy setting goals, taking calculated risks, and driving team success."},{id:"Q21",text:"I like organizing spreadsheets, keeping accurate records, and filing documents."},{id:"Q22",text:"I prefer clear step-by-step guidelines and established rules when doing tasks."},{id:"Q23",text:"I enjoy working with financial calculations, budgets, or administrative data."},{id:"Q24",text:"I take pride in attention to detail, precision, and systematic record-keeping."}],dt=[{id:"Q25",text:"I enjoy exploring new ideas, topics or areas of knowledge even when they are not related to my studies."},{id:"Q26",text:"I am open to trying unfamiliar approaches and thinking outside traditional boundaries."},{id:"Q27",text:"I enjoy abstract thinking, philosophy, and discussing big-picture concepts."},{id:"Q28",text:"I am deeply curious about how different cultures, technology, and art evolve."},{id:"Q29",text:"I keep my study space neat, organized, and well-structured."},{id:"Q30",text:"I prepare thoroughly for tests and follow a strict study plan."},{id:"Q31",text:"I pay close attention to minor details and take responsibility for my work."},{id:"Q32",text:"I often leave tasks till the last minute and find it hard to stick to a schedule or plan."},{id:"Q33",text:"I feel energized when interacting in large groups, clubs, or social events."},{id:"Q34",text:"I speak up confidently in class discussions and express my thoughts easily."},{id:"Q35",text:"I initiate conversations easily when meeting new people."},{id:"Q36",text:"I prefer quiet individual work over high-energy social gatherings."},{id:"Q37",text:"I am considerate, empathetic, and polite toward classmates and teachers."},{id:"Q38",text:"I value cooperation and try to avoid unnecessary arguments with others."},{id:"Q39",text:"I willingly help peers when they are struggling without expecting anything in return."},{id:"Q40",text:"I trust that most people have good intentions."},{id:"Q41",text:"I often feel anxious or worried when facing upcoming exams or deadlines."},{id:"Q42",text:"My mood changes quickly depending on my surroundings or academic results."},{id:"Q43",text:"I find it difficult to calm down when unexpected disruptions occur."},{id:"Q44",text:"I stay calm and steady even under intense time pressure."}],ct=[{id:"Q45",text:"A shopkeeper sells a pen for ₹30, making a profit of 20%. What is the cost price of the pen?",options:[{label:"A",text:"₹22"},{label:"B",text:"₹24"},{label:"C",text:"₹25"},{label:"D",text:"₹26"},{label:"E",text:"Not Sure"}]},{id:"Q46",text:"If 3x + 7 = 22, what is the value of x?",options:[{label:"A",text:"4"},{label:"B",text:"5"},{label:"C",text:"6"},{label:"D",text:"7"},{label:"E",text:"Not Sure"}]},{id:"Q47",text:"If 5 workers complete a project in 12 days, how many days will 6 workers take to complete the same project at the same rate?",options:[{label:"A",text:"8 days"},{label:"B",text:"10 days"},{label:"C",text:"11 days"},{label:"D",text:"14 days"},{label:"E",text:"Not Sure"}]},{id:"Q48",text:"Find the median of the set of numbers: 12, 7, 19, 4, 15, 9, 21.",options:[{label:"A",text:"9"},{label:"B",text:"12"},{label:"C",text:"14"},{label:"D",text:"15"},{label:"E",text:"Not Sure"}]},{id:"Q49",text:"A train running at 72 km/h crosses a pole in 10 seconds. What is the length of the train?",options:[{label:"A",text:"150m"},{label:"B",text:"180m"},{label:"C",text:"200m"},{label:"D",text:"220m"},{label:"E",text:"Not Sure"}]},{id:"Q50",text:"What is 15% of 240?",options:[{label:"A",text:"32"},{label:"B",text:"36"},{label:"C",text:"40"},{label:"D",text:"42"},{label:"E",text:"Not Sure"}]},{id:"Q51",text:"Select the odd one out among the given options.",options:[{label:"A",text:"Circle"},{label:"B",text:"Square"},{label:"C",text:"Cube"},{label:"D",text:"Triangle"},{label:"E",text:"Not Sure"}]},{id:"Q52",text:"If ALL Pencils are Pens, and SOME Pens are Markers, which statement is DEFINITELY true?",options:[{label:"A",text:"All Pencils are Markers"},{label:"B",text:"Some Pencils may be Markers"},{label:"C",text:"No Pencils are Markers"},{label:"D",text:"All Markers are Pens"},{label:"E",text:"Not Sure"}]},{id:"Q53",text:"Complete the number series: 2, 6, 12, 20, 30, ___?",options:[{label:"A",text:"36"},{label:"B",text:"40"},{label:"C",text:"42"},{label:"D",text:"48"},{label:"E",text:"Not Sure"}]},{id:"Q54",text:"Complete the letter series: B, D, G, K, P, ___?",options:[{label:"A",text:"U"},{label:"B",text:"V"},{label:"C",text:"W"},{label:"D",text:"X"},{label:"E",text:"Not Sure"}]},{id:"Q55",text:"Pointing to a photograph, Riya said 'He is the son of the only son of my grandfather'. How is the man related to Riya?",options:[{label:"A",text:"Father"},{label:"B",text:"Brother"},{label:"C",text:"Uncle"},{label:"D",text:"Cousin"},{label:"E",text:"Not Sure"}]},{id:"Q56",text:"If North becomes South-East, what does West become?",options:[{label:"A",text:"North-East"},{label:"B",text:"North-West"},{label:"C",text:"South-East"},{label:"D",text:"South-West"},{label:"E",text:"Not Sure"}]},{id:"Q57",text:"Which fraction is the largest: 3/4, 5/6, 7/9, 11/12?",options:[{label:"A",text:"3/4"},{label:"B",text:"5/6"},{label:"C",text:"7/9"},{label:"D",text:"11/12"},{label:"E",text:"Not Sure"}]},{id:"Q58",text:"A pattern alternates between a filled shape and an empty shape of the same type, rotating 90° clockwise each step. The sequence so far is: Filled Circle -> Empty Square -> Filled Triangle -> Empty Circle. What comes next?",options:[{label:"A",text:"Filled Square"},{label:"B",text:"Empty Square"},{label:"C",text:"Filled Triangle"},{label:"D",text:"Empty Triangle"},{label:"E",text:"Not Sure"}]},{id:"Q59",text:"In a coding language: DOG = 26, CAT = 24, BAT = 23. Following the same logic, what does FISH equal?",options:[{label:"A",text:"38"},{label:"B",text:"42"},{label:"C",text:"45"},{label:"D",text:"50"},{label:"E",text:"Not Sure"}]},{id:"Q60",text:"An analog clock shows 3:15. What is the angle between the hour hand and the minute hand?",options:[{label:"A",text:"0°"},{label:"B",text:"7.5°"},{label:"C",text:"15°"},{label:"D",text:"22.5°"},{label:"E",text:"Not Sure"}]},{id:"Q61",text:"If A is taller than B, B is taller than C, and C is shorter than D, who is DEFINITELY the shortest?",options:[{label:"A",text:"A"},{label:"B",text:"B"},{label:"C",text:"C"},{label:"D",text:"D"},{label:"E",text:"Not Sure"}]},{id:"Q62",text:"A 3×3×3 cube is painted red on all 6 faces and then cut into 27 equal smaller cubes. How many of the smaller cubes have exactly 2 faces painted red?",options:[{label:"A",text:"6"},{label:"B",text:"8"},{label:"C",text:"12"},{label:"D",text:"18"},{label:"E",text:"Not Sure"}]},{id:"Q63",text:"What is the average of the first 5 prime numbers (2, 3, 5, 7, 11)?",options:[{label:"A",text:"5.2"},{label:"B",text:"5.6"},{label:"C",text:"6.0"},{label:"D",text:"6.4"},{label:"E",text:"Not Sure"}]},{id:"Q64",text:"If a circle has a radius of 7 cm, what is its approximate area? (Use π = 22/7)",options:[{label:"A",text:"144 cm²"},{label:"B",text:"154 cm²"},{label:"C",text:"164 cm²"},{label:"D",text:"176 cm²"},{label:"E",text:"Not Sure"}]}],xt=[{id:"Q65",text:"When I encounter a new subject or skill, I pick it up quickly and enjoy the challenge of learning something unfamiliar."},{id:"Q66",text:"I break complex problems down into smaller manageable components before deciding on a solution."},{id:"Q67",text:"I evaluate multiple perspectives and gather evidence before drawing conclusions."},{id:"Q68",text:"I am comfortable adapting my plans when new information contradicts my initial assumptions."},{id:"Q69",text:"I make decisions based on logical reasoning rather than impulse or emotional pressure."},{id:"Q70",text:"When there is no clear plan or I cannot predict what will happen next, I feel very unsettled and find it difficult to take any action."},{id:"Q71",text:"I reflect on past mistakes to refine my strategy and decision-making approach."},{id:"Q72",text:"I enjoy brainstorming creative solutions to open-ended problems with no single right answer."},{id:"Q73",text:"I stay focused on long-term career goals even when faced with immediate minor setbacks."}],mt=()=>{const t=ce(),s=xe(),[V,oe]=m.useState(!1),[n,K]=m.useState(1),a=4,[l,re]=m.useState({}),N=m.useRef(null),R=()=>{setTimeout(()=>{N.current&&N.current.scrollIntoView({behavior:"smooth",block:"start"});const o=document.querySelector("main");o&&o.scrollTo({top:0,behavior:"smooth"}),window.scrollTo({top:0,behavior:"smooth"})},50)},se=()=>{K(o=>Math.min(a,o+1)),R()},ne=()=>{K(o=>Math.max(1,o-1)),R()},b=(o,r)=>{re(ae=>({...ae,[o]:r}))},le=()=>{localStorage.setItem("pwc_assessment_form_submitted","true"),s.success("Career Assessment Submitted!","Thank you! Your 73 answers have been saved and your Ikigai profile report is generating."),t(f.STUDENT_PORTAL)},J=Math.round(n/a*100);return e.jsxs(Te,{ref:N,children:[V&&e.jsx(Ce,{title:"CLASS 9 & 10 CAREER ASSESSMENT",subtitle:"Career Counselling Programme — Instructions for Students",breadcrumbs:[{label:"Student Portal",href:f.STUDENT_PORTAL},{label:"Career Assessment"}],onBack:()=>t(f.STUDENT_PORTAL),actions:e.jsxs(Fe,{variant:"primary",size:"md",children:["Step ",n," of ",a]})}),V?e.jsxs(qe,{children:[e.jsxs(et,{children:[e.jsxs(tt,{children:[e.jsxs("span",{children:[n===1&&"SECTION 1 — RIASEC INTEREST INVENTORY (Q1 to Q24)",n===2&&"SECTION 2 — BIG FIVE PERSONALITY TRAITS (Q25 to Q44)",n===3&&"SECTION 3 — APTITUDE & REASONING (Q45 to Q64)",n===4&&"SECTION 4 — COGNITIVE & DECISION STYLE (Q65 to Q73)"]}),e.jsxs("span",{children:["Step ",n," of ",a," (",J,"%)"]})]}),e.jsx(it,{children:e.jsx(ot,{$percent:J})})]}),e.jsxs(rt,{children:[n===1&&e.jsxs(e.Fragment,{children:[e.jsx(D,{style:{fontSize:"14px",fontWeight:500,color:"#334155"},children:"Instructions: Rate how much you agree with each statement on a scale of 1 (Strongly Disagree) to 5 (Strongly Agree)."}),at.map(o=>e.jsxs(B,{children:[e.jsxs(z,{children:[o.id,". ",o.text]}),e.jsx(_,{children:M.map(r=>e.jsxs(G,{type:"button",$ratingValue:r.val,$selected:l[o.id]===r.val,onClick:()=>b(o.id,r.val),children:[e.jsx(H,{$selected:l[o.id]===r.val,children:r.val}),e.jsx(U,{children:r.label})]},r.val))})]},o.id))]}),n===2&&e.jsxs(e.Fragment,{children:[e.jsx(D,{style:{fontSize:"14px",fontWeight:500,color:"#334155"},children:"Instructions: Rate your agreement with each personality statement from 1 (Strongly Disagree) to 5 (Strongly Agree)."}),dt.map(o=>e.jsxs(B,{children:[e.jsxs(z,{children:[o.id,". ",o.text]}),e.jsx(_,{children:M.map(r=>e.jsxs(G,{type:"button",$ratingValue:r.val,$selected:l[o.id]===r.val,onClick:()=>b(o.id,r.val),children:[e.jsx(H,{$selected:l[o.id]===r.val,children:r.val}),e.jsx(U,{children:r.label})]},r.val))})]},o.id))]}),n===3&&e.jsxs(e.Fragment,{children:[e.jsx(D,{style:{fontSize:"14px",fontWeight:500,color:"#334155"},children:"Instructions: Multiple choice aptitude questions. Select the single best answer, or select 'Not Sure' if genuinely unsure."}),ct.map(o=>e.jsxs(B,{children:[e.jsxs(z,{children:[o.id,". ",o.text]}),e.jsx(st,{children:o.options.map(r=>e.jsxs(nt,{$selected:l[o.id]===r.label,children:[e.jsx("input",{type:"radio",name:`q_${o.id}`,value:r.label,checked:l[o.id]===r.label,onChange:()=>b(o.id,r.label)}),e.jsxs("span",{children:[e.jsxs("strong",{children:[r.label,")"]})," ",r.text]})]},r.label))})]},o.id))]}),n===4&&e.jsxs(e.Fragment,{children:[e.jsx(D,{style:{fontSize:"14px",fontWeight:500,color:"#334155"},children:"Instructions: Reverting to 1 to 5 scale (Strongly Disagree to Strongly Agree) for cognitive & decision-making style."}),xt.map(o=>e.jsxs(B,{children:[e.jsxs(z,{children:[o.id,". ",o.text]}),e.jsx(_,{children:M.map(r=>e.jsxs(G,{type:"button",$ratingValue:r.val,$selected:l[o.id]===r.val,onClick:()=>b(o.id,r.val),children:[e.jsx(H,{$selected:l[o.id]===r.val,children:r.val}),e.jsx(U,{children:r.label})]},r.val))})]},o.id))]})]}),e.jsxs(lt,{children:[e.jsx(y,{type:"button",variant:"secondary",size:"md",leftIcon:e.jsx(X,{size:18}),disabled:n===1,onClick:ne,children:"Previous Step"}),n<a?e.jsx(y,{type:"button",variant:"primary",size:"md",rightIcon:e.jsx(Ae,{size:18}),onClick:se,children:"Next Step"}):e.jsx(y,{type:"button",variant:"primary",size:"md",leftIcon:e.jsx(Ee,{size:18}),onClick:le,style:{backgroundColor:"#16A34A",borderColor:"#16A34A"},children:"Submit Assessment"})]})]}):e.jsxs(Qe,{children:[e.jsxs(Be,{children:[e.jsx(ze,{children:e.jsx(De,{type:"button",onClick:()=>t(f.STUDENT_PORTAL),"aria-label":"Back to Student Portal",children:e.jsx(X,{size:18})})}),e.jsx(Ne,{children:"CLASS 9 & 10 CAREER ASSESSMENT"}),e.jsx(Re,{children:"Instructions for Students"}),e.jsx(Le,{children:"Read this carefully before you begin."})]}),e.jsxs(Pe,{children:[e.jsxs(j,{$gradient:"linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)",$borderColor:"#DBEAFE",children:[e.jsx(w,{$bg:"#DBEAFE",$color:"#1E40AF",children:e.jsx(pe,{size:24})}),e.jsxs(S,{children:[e.jsx(v,{$color:"#1E40AF",children:"73"}),e.jsx(k,{children:"Questions"})]})]}),e.jsxs(j,{$gradient:"linear-gradient(135deg, #F8FAFC 0%, #FAF5FF 100%)",$borderColor:"#E9D5FF",children:[e.jsx(w,{$bg:"#F3E8FF",$color:"#6B21A8",children:e.jsx(he,{size:24})}),e.jsxs(S,{children:[e.jsx(v,{$color:"#6B21A8",children:"4"}),e.jsx(k,{children:"Sections"})]})]}),e.jsxs(j,{$gradient:"linear-gradient(135deg, #F8FAFC 0%, #FEF3C7 100%)",$borderColor:"#FDE68A",children:[e.jsx(w,{$bg:"#FEF3C7",$color:"#B45309",children:e.jsx(ge,{size:24})}),e.jsxs(S,{children:[e.jsx(v,{$color:"#B45309",children:"30–35"}),e.jsx(k,{children:"Minutes"})]})]}),e.jsxs(j,{$gradient:"linear-gradient(135deg, #F8FAFC 0%, #ECFDF5 100%)",$borderColor:"#A7F3D0",children:[e.jsx(w,{$bg:"#D1FAE5",$color:"#047857",children:e.jsx(ue,{size:24})}),e.jsxs(S,{children:[e.jsx(v,{$color:"#047857",children:"100%"}),e.jsx(k,{children:"Confidential"})]})]})]}),e.jsxs("div",{children:[e.jsxs($,{children:[e.jsx(I,{$color:"#2563EB",children:e.jsx(Z,{size:18})}),e.jsx(A,{children:"Before You Begin"})]}),e.jsxs(Oe,{style:{marginTop:16},children:[e.jsxs(L,{children:[e.jsxs(P,{children:[e.jsx(O,{$bg:"#DBEAFE",$color:"#1E40AF",children:e.jsx(be,{size:20})}),e.jsx(W,{children:"1. Find a quiet spot."})]}),e.jsx(Y,{children:"Sit somewhere with no distractions — no noise, no interruptions. This is your time."})]}),e.jsxs(L,{children:[e.jsxs(P,{children:[e.jsx(O,{$bg:"#D1FAE5",$color:"#047857",children:e.jsx(me,{size:20})}),e.jsx(W,{children:"2. Check your Internet."})]}),e.jsx(Y,{children:"You will need a stable connection throughout. Make sure you are connected before you start. In case your connection drops, you can resume from where you have left."})]}),e.jsxs(L,{children:[e.jsxs(P,{children:[e.jsx(O,{$bg:"#F3E8FF",$color:"#6B21A8",children:e.jsx(fe,{size:20})}),e.jsx(W,{children:"3. Keep your phone away."})]}),e.jsx(Y,{children:"Avoid distractions. The assessment takes only 30–35 minutes — give it your full attention."})]})]})]}),e.jsxs("div",{children:[e.jsxs($,{children:[e.jsx(I,{$color:"#5D2384",children:e.jsx(ye,{size:18})}),e.jsx(A,{children:"What This Assessment Is About"})]}),e.jsxs(We,{style:{marginTop:16},children:[e.jsxs(Ye,{children:[e.jsx(Z,{size:20,style:{color:"#5D2384"}}),e.jsx("span",{children:"This is not a test. There are no right or wrong answers."})]}),e.jsx(_e,{children:"This assessment is simply about YOU — your interests, your personality, how you think, and what you are naturally good at. What kinds of activities and environments you genuinely enjoy? How you naturally behave — your energy, discipline, empathy, and more? Your natural reasoning ability — numbers, words, logic, and visuals. How you learn, handle uncertainty, and prefer to work. The results will help you understand which careers and streams are the best fit for you. Nobody is judging your answers. Your responses are completely confidential and will only be used for your career guidance."})]})]}),e.jsxs("div",{children:[e.jsxs($,{children:[e.jsx(I,{$color:"#0284C7",children:e.jsx(je,{size:18})}),e.jsx(A,{children:"How to Answer — Two Types of Questions"})]}),e.jsxs("div",{style:{marginTop:16,display:"flex",flexDirection:"column",gap:20},children:[e.jsxs("div",{children:[e.jsx("strong",{style:{fontSize:15,color:"#0F172A",display:"block",marginBottom:4},children:"TYPE A · Agreement Questions"}),e.jsx("p",{style:{margin:0,fontSize:14,color:"#64748B"},children:"You will see a statement and choose how much it describes you, on a scale of 1 to 5."}),e.jsxs(Ge,{children:[e.jsxs(c,{$bg:"#DC2626",children:[e.jsx(x,{children:"1"}),e.jsx(p,{children:"Strongly Disagree"})]}),e.jsxs(c,{$bg:"#EA580C",children:[e.jsx(x,{children:"2"}),e.jsx(p,{children:"Disagree"})]}),e.jsxs(c,{$bg:"#64748B",children:[e.jsx(x,{children:"3"}),e.jsx(p,{children:"Neutral"})]}),e.jsxs(c,{$bg:"#0D9488",children:[e.jsx(x,{children:"4"}),e.jsx(p,{children:"Agree"})]}),e.jsxs(c,{$bg:"#059669",children:[e.jsx(x,{children:"5"}),e.jsx(p,{children:"Strongly Agree"})]})]}),e.jsxs(He,{children:[e.jsxs(h,{$bg:"#ECFDF5",children:[e.jsxs(g,{$bg:"#059669",children:[e.jsx(we,{size:16})," Strongly Agree (5)"]}),e.jsx(u,{children:"You really feel this describes you. You are sure about it."})]}),e.jsxs(h,{$bg:"#F0FDF4",children:[e.jsxs(g,{$bg:"#0D9488",children:[e.jsx(Se,{size:16})," Agree (4)"]}),e.jsx(u,{children:"It does describe you — but not as strongly. You generally feel this way."})]}),e.jsxs(h,{$bg:"#F8FAFC",children:[e.jsxs(g,{$bg:"#64748B",children:[e.jsx(ve,{size:16})," Neutral (3)"]}),e.jsx(u,{children:"You are genuinely unsure — you cannot say yes or no. Overuse of Neutral flattens your profile and reduces the accuracy of your results. If you even slightly agree or slightly disagree, choose that."})]}),e.jsxs(h,{$bg:"#FFF7ED",children:[e.jsxs(g,{$bg:"#EA580C",children:[e.jsx(ke,{size:16})," Disagree (2)"]}),e.jsx(u,{children:"This does not describe you — but not strongly. You generally do not feel this way."})]}),e.jsxs(h,{$bg:"#FEF2F2",children:[e.jsxs(g,{$bg:"#DC2626",children:[e.jsx($e,{size:16})," Strongly Disagree (1)"]}),e.jsx(u,{children:"This really does not describe you. You are certain it does not apply."})]})]})]}),e.jsxs("div",{children:[e.jsx("strong",{style:{fontSize:15,color:"#0F172A",display:"block",marginBottom:4},children:"TYPE B · Aptitude Questions"}),e.jsx("p",{style:{margin:0,fontSize:14,color:"#64748B"},children:"These are multiple-choice questions with one correct answer."}),e.jsxs(Ue,{children:[e.jsxs(ee,{children:[e.jsx(te,{children:"A"}),e.jsxs(ie,{children:[e.jsx(q,{size:18,style:{marginRight:8,color:"#D97706",flexShrink:0}}),e.jsx("span",{children:"Choose the answer you think is correct. Trust your reasoning."})]})]}),e.jsxs(ee,{children:[e.jsx(te,{children:"B"}),e.jsxs(ie,{children:[e.jsx(q,{size:18,style:{marginRight:8,color:"#D97706",flexShrink:0}}),e.jsx("span",{children:"If you are genuinely unsure, select 'Not Sure' — this is honest and it actually helps your profile. Do not guess randomly."})]})]})]})]})]})]}),e.jsxs("div",{children:[e.jsxs($,{children:[e.jsx(I,{$color:"#D97706",children:e.jsx(d,{size:18})}),e.jsx(A,{children:"The Golden Rules — Read These Carefully"})]}),e.jsxs(Me,{style:{marginTop:16},children:[e.jsxs(E,{children:[e.jsx(C,{children:e.jsx(d,{size:20})}),e.jsxs(F,{children:[e.jsx(T,{children:"Be honest. Be yourself."}),e.jsx(Q,{children:"Answer based on how YOU actually are — not how you want to be seen, not what sounds impressive, not what you think a counsellor wants to hear. The more honest you are, the more useful your results will be."})]})]}),e.jsxs(E,{children:[e.jsx(C,{children:e.jsx(d,{size:20})}),e.jsxs(F,{children:[e.jsx(T,{children:"Go with your first instinct."}),e.jsx(Q,{children:"Do not overthink. Your first reaction to a statement is usually the most accurate reflection of who you are. If you sit on a question too long, you start second-guessing yourself."})]})]}),e.jsxs(E,{children:[e.jsx(C,{children:e.jsx(d,{size:20})}),e.jsxs(F,{children:[e.jsx(T,{children:"Do not skip or rush."}),e.jsx(Q,{children:"Every question contributes to your profile. At the same time, do not spend more than a few seconds on any single question — keep moving."})]})]}),e.jsxs(E,{children:[e.jsx(C,{children:e.jsx(d,{size:20})}),e.jsxs(F,{children:[e.jsx(T,{children:"Your results are private."}),e.jsx(Q,{children:"Only you and your career counsellor will see them. This is a safe space — be real."})]})]})]})]}),e.jsxs(Ve,{children:[e.jsx(Ke,{children:"You are ready. Take a deep breath."}),e.jsx(Je,{children:"There is nothing to prepare for. Just be yourself — and let the results do the rest."})]}),e.jsxs(Xe,{children:[e.jsx(y,{variant:"primary",size:"lg",rightIcon:e.jsx(Ie,{size:20}),onClick:()=>{oe(!0),R()},style:{minWidth:"300px"},children:"Start Career Assessment"}),e.jsx(Ze,{children:"Estimated time: 30-35 minutes • Answers saved automatically as you navigate"})]})]})]})};export{mt as AssessmentFormPage,mt as default};
