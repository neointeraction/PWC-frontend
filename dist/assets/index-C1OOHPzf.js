import{g as i,bi as ae,u as de,r as a,c as u,j as e,aO as V,bx as ce,ah as xe,by as pe,v as he,bz as K,bA as ge,bG as ue,bC as me,bD as be,bH as fe,G as ye,bI as je,bJ as we,J as Se,bK as ve,bL as J,ax as c,B as m,ak as ke,aP as $e,h as Ie}from"./index-D8LPzpF0.js";import{P as Ce}from"./PageHeader-BTXZNstJ.js";import{B as Fe}from"./Badge-BEDhCnBZ.js";import"./Card.styles-CpQTLZiB.js";import"./Input-BHsgREms.js";import"./Select-CVMngjes.js";import"./Checkbox-DR8oy3rl.js";import"./Table.styles-B8YNXMzj.js";import"./FileUpload.styles-Dn8zyivb.js";import"./Breadcrumb-CKvFpy--.js";import"./Modal-DgZwUWAf.js";import"./ConfirmDialog-Cx-Ljo-7.js";import{S as Ae}from"./SuccessModal-DRZxqmq7.js";import"./SuccessModal.styles-Ska6LGj1.js";import"./Tooltip-DcSEu4UE.js";import"./Badge.styles-DvrzXK6I.js";const Ee=i.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`,Te=i.div`
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
`,Qe=i.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({theme:t})=>t.colors.border};
`,Be=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
`,ze=i.button`
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
`;const De=i.h1`
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
`,Ne=i.p`
  font-size: 13px;
  color: ${({theme:t})=>t.colors.textSecondary};
  margin: 0;
`,Le=i.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,b=i.div`
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
`,f=i.div`
  width: 46px;
  height: 46px;
  border-radius: 4px;
  background-color: ${({$bg:t})=>t};
  color: ${({$color:t})=>t};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,y=i.div`
  display: flex;
  flex-direction: column;
`,j=i.span`
  font-size: 24px;
  font-weight: 800;
  line-height: 1.1;
  color: ${({$color:t})=>t};
`,w=i.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme:t})=>t.colors.textSecondary};
  margin-top: 2px;
`,S=i.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,v=i.div`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${({theme:t})=>t.colors.primaryLight};
  color: ${({$color:t,theme:s})=>t||s.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,k=i.h3`
  font-size: 17px;
  font-weight: 700;
  color: ${({theme:t})=>t.colors.text};
  margin: 0;
`,Pe=i.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
  }
`,R=i.div`
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
`,N=i.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,L=i.div`
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
`,P=i.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({theme:t})=>t.colors.text};
`,O=i.span`
  font-size: 13px;
  color: ${({theme:t})=>t.colors.textSecondary};
  line-height: 1.55;
`,Oe=i.div`
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  border: 1px solid ${({theme:t})=>t.colors.border};
  border-left: 4px solid ${({theme:t})=>t.colors.primary};
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`,We=i.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: ${({theme:t})=>t.colors.text};
`,Ge=i.p`
  font-size: 14px;
  color: ${({theme:t})=>t.colors.textSecondary};
  line-height: 1.65;
  margin: 0;
`,Ye=i.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-top: 14px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`,x=i.div`
  background-color: ${({$bg:t})=>t};
  border: 1px solid ${({theme:t})=>t.colors.border};
  border-top: 4px solid ${({$borderTopColor:t})=>t};
  border-radius: 4px;
  padding: 14px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,p=i.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: ${({$color:t})=>t};
`,h=i.span`
  font-size: 12px;
  color: ${({theme:t})=>t.colors.textSecondary};
  line-height: 1.45;
`,_e=i.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
`,X=i.div`
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  background-color: #FFFBEB;
  border: 1px solid #FDE68A;
`,Z=i.div`
  width: 48px;
  background-color: #D97706;
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,q=i.div`
  padding: 14px 18px;
  font-size: 13px;
  color: #78350F;
  line-height: 1.5;
  display: flex;
  align-items: center;
`,He=i.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,$=i.div`
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
`,I=i.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: #FEF3C7;
  color: #D97706;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,C=i.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,F=i.span`
  font-size: 15px;
  font-weight: 700;
  color: #78350F;
`,A=i.span`
  font-size: 13px;
  color: #92400E;
  line-height: 1.5;
`,Me=i.div`
  background: linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%);
  border: 1px solid #E9D5FF;
  border-left: 4px solid ${({theme:t})=>t.colors.primary};
  border-radius: 4px;
  padding: 24px;
  color: ${({theme:t})=>t.colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`,Ue=i.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({theme:t})=>t.colors.primary};
  margin: 0;
  letter-spacing: -0.2px;
`,Ve=i.p`
  font-size: 14px;
  color: ${({theme:t})=>t.colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`,Ke=i.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-top: 12px;
`,Je=i.span`
  font-size: 13px;
  color: ${({theme:t})=>t.colors.textSecondary};
  font-weight: 500;
`,Xe=i.div`
  background-color: ${({theme:t})=>t.colors.surface};
  border: 1px solid ${({theme:t})=>t.colors.border};
  border-radius: 4px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,Ze=i.div`
  background: linear-gradient(135deg, ${({theme:t})=>t.colors.primary} 0%, #2563EB 100%);
  padding: ${({theme:t})=>t.spacing.lg} ${({theme:t})=>t.spacing.xl};
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: ${({theme:t})=>t.spacing.sm};
`,qe=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({theme:t})=>t.fontSize.sm};
  font-weight: ${({theme:t})=>t.fontWeight.semibold};
  letter-spacing: 0.5px;
  text-transform: uppercase;
`,et=i.div`
  width: 100%;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  overflow: hidden;
`,tt=i.div`
  height: 100%;
  width: ${({$percent:t})=>t}%;
  background-color: #ffffff;
  border-radius: 4px;
  transition: width 0.3s ease;
`,it=i.div`
  padding: ${({theme:t})=>t.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: 28px;
`,E=i.div`
  background-color: ${({theme:t})=>t.colors.background};
  border: 1px solid ${({theme:t})=>t.colors.border};
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,T=i.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({theme:t})=>t.colors.text};
  margin: 0;
  line-height: 1.45;
`,Q=i.p`
  font-size: 13px;
  color: ${({theme:t})=>t.colors.textSecondary};
  margin: 0;
`,W=i.div`
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
`,Y=i.span`
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
`,_=i.span`
  font-size: 13px;
  font-weight: 500;
  line-height: 1.2;
`,ot=i.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,rt=i.label`
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

  ${({$selected:t,theme:s})=>t&&ae`
      border-color: ${s.colors.primary};
      background-color: ${s.colors.primaryLight};
      font-weight: 600;
    `}
`,st=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:t})=>t.spacing.lg} ${({theme:t})=>t.spacing.xl};
  background-color: ${({theme:t})=>t.colors.background};
  border-top: 1px solid ${({theme:t})=>t.colors.border};
`,H=[{val:1,label:"Strongly Disagree"},{val:2,label:"Disagree"},{val:3,label:"Neutral"},{val:4,label:"Agree"},{val:5,label:"Strongly Agree"}],nt=[{id:"Q1",text:"I enjoy building or fixing things with my hands like putting together models eg Lego, rubiks cube, etc or playing with gadgets, or figuring out how everyday objects work."},{id:"Q2",text:"I like working outdoors with plants, animals, or nature."},{id:"Q3",text:"I enjoy operating tools, machinery, or technical equipment."},{id:"Q4",text:"I like physical activities and working with tangible materials."},{id:"Q5",text:"I love asking 'why' and trying to understand the science or logic behind things I observe."},{id:"Q6",text:"I enjoy solving complex mathematical equations or scientific puzzles."},{id:"Q7",text:"I like reading research papers, scientific articles, or analyzing data."},{id:"Q8",text:"I prefer working independently to investigate and solve technical problems."},{id:"Q9",text:"I love creative writing, painting, graphic design, or performing arts."},{id:"Q10",text:"I enjoy designing original visual layouts, music, or digital artwork."},{id:"Q11",text:"I prefer unstructured environments where I can express my imagination freely."},{id:"Q12",text:"I like expressing my emotions and ideas through literature, drama, or media."},{id:"Q13",text:"I enjoy helping, teaching, or mentoring other students with their studies."},{id:"Q14",text:"I like listening to people's personal problems and offering supportive advice."},{id:"Q15",text:"I enjoy participating in community service, volunteering, or social causes."},{id:"Q16",text:"I prefer working in team settings focused on human welfare and education."},{id:"Q17",text:"I enjoy taking charge of team projects and leading group discussions."},{id:"Q18",text:"I like pitching ideas, persuading others, or debating competitive topics."},{id:"Q19",text:"I am interested in entrepreneurship, business management, and marketing strategy."},{id:"Q20",text:"I enjoy setting goals, taking calculated risks, and driving team success."},{id:"Q21",text:"I like organizing spreadsheets, keeping accurate records, and filing documents."},{id:"Q22",text:"I prefer clear step-by-step guidelines and established rules when doing tasks."},{id:"Q23",text:"I enjoy working with financial calculations, budgets, or administrative data."},{id:"Q24",text:"I take pride in attention to detail, precision, and systematic record-keeping."}],lt=[{id:"Q25",text:"I enjoy exploring new ideas, topics or areas of knowledge even when they are not related to my studies."},{id:"Q26",text:"I am open to trying unfamiliar approaches and thinking outside traditional boundaries."},{id:"Q27",text:"I enjoy abstract thinking, philosophy, and discussing big-picture concepts."},{id:"Q28",text:"I am deeply curious about how different cultures, technology, and art evolve."},{id:"Q29",text:"I keep my study space neat, organized, and well-structured."},{id:"Q30",text:"I prepare thoroughly for tests and follow a strict study plan."},{id:"Q31",text:"I pay close attention to minor details and take responsibility for my work."},{id:"Q32",text:"I often leave tasks till the last minute and find it hard to stick to a schedule or plan."},{id:"Q33",text:"I feel energized when interacting in large groups, clubs, or social events."},{id:"Q34",text:"I speak up confidently in class discussions and express my thoughts easily."},{id:"Q35",text:"I initiate conversations easily when meeting new people."},{id:"Q36",text:"I prefer quiet individual work over high-energy social gatherings."},{id:"Q37",text:"I am considerate, empathetic, and polite toward classmates and teachers."},{id:"Q38",text:"I value cooperation and try to avoid unnecessary arguments with others."},{id:"Q39",text:"I willingly help peers when they are struggling without expecting anything in return."},{id:"Q40",text:"I trust that most people have good intentions."},{id:"Q41",text:"I often feel anxious or worried when facing upcoming exams or deadlines."},{id:"Q42",text:"My mood changes quickly depending on my surroundings or academic results."},{id:"Q43",text:"I find it difficult to calm down when unexpected disruptions occur."},{id:"Q44",text:"I stay calm and steady even under intense time pressure."}],at=[{id:"Q45",text:"A shopkeeper sells a pen for ₹30, making a profit of 20%. What is the cost price of the pen?",options:[{label:"A",text:"₹22"},{label:"B",text:"₹24"},{label:"C",text:"₹25"},{label:"D",text:"₹26"},{label:"E",text:"Not Sure"}]},{id:"Q46",text:"If 3x + 7 = 22, what is the value of x?",options:[{label:"A",text:"4"},{label:"B",text:"5"},{label:"C",text:"6"},{label:"D",text:"7"},{label:"E",text:"Not Sure"}]},{id:"Q47",text:"If 5 workers complete a project in 12 days, how many days will 6 workers take to complete the same project at the same rate?",options:[{label:"A",text:"8 days"},{label:"B",text:"10 days"},{label:"C",text:"11 days"},{label:"D",text:"14 days"},{label:"E",text:"Not Sure"}]},{id:"Q48",text:"Find the median of the set of numbers: 12, 7, 19, 4, 15, 9, 21.",options:[{label:"A",text:"9"},{label:"B",text:"12"},{label:"C",text:"14"},{label:"D",text:"15"},{label:"E",text:"Not Sure"}]},{id:"Q49",text:"A train running at 72 km/h crosses a pole in 10 seconds. What is the length of the train?",options:[{label:"A",text:"150m"},{label:"B",text:"180m"},{label:"C",text:"200m"},{label:"D",text:"220m"},{label:"E",text:"Not Sure"}]},{id:"Q50",text:"What is 15% of 240?",options:[{label:"A",text:"32"},{label:"B",text:"36"},{label:"C",text:"40"},{label:"D",text:"42"},{label:"E",text:"Not Sure"}]},{id:"Q51",text:"Select the odd one out among the given options.",options:[{label:"A",text:"Circle"},{label:"B",text:"Square"},{label:"C",text:"Cube"},{label:"D",text:"Triangle"},{label:"E",text:"Not Sure"}]},{id:"Q52",text:"If ALL Pencils are Pens, and SOME Pens are Markers, which statement is DEFINITELY true?",options:[{label:"A",text:"All Pencils are Markers"},{label:"B",text:"Some Pencils may be Markers"},{label:"C",text:"No Pencils are Markers"},{label:"D",text:"All Markers are Pens"},{label:"E",text:"Not Sure"}]},{id:"Q53",text:"Complete the number series: 2, 6, 12, 20, 30, ___?",options:[{label:"A",text:"36"},{label:"B",text:"40"},{label:"C",text:"42"},{label:"D",text:"48"},{label:"E",text:"Not Sure"}]},{id:"Q54",text:"Complete the letter series: B, D, G, K, P, ___?",options:[{label:"A",text:"U"},{label:"B",text:"V"},{label:"C",text:"W"},{label:"D",text:"X"},{label:"E",text:"Not Sure"}]},{id:"Q55",text:"Pointing to a photograph, Riya said 'He is the son of the only son of my grandfather'. How is the man related to Riya?",options:[{label:"A",text:"Father"},{label:"B",text:"Brother"},{label:"C",text:"Uncle"},{label:"D",text:"Cousin"},{label:"E",text:"Not Sure"}]},{id:"Q56",text:"If North becomes South-East, what does West become?",options:[{label:"A",text:"North-East"},{label:"B",text:"North-West"},{label:"C",text:"South-East"},{label:"D",text:"South-West"},{label:"E",text:"Not Sure"}]},{id:"Q57",text:"Which fraction is the largest: 3/4, 5/6, 7/9, 11/12?",options:[{label:"A",text:"3/4"},{label:"B",text:"5/6"},{label:"C",text:"7/9"},{label:"D",text:"11/12"},{label:"E",text:"Not Sure"}]},{id:"Q58",text:"A pattern alternates between a filled shape and an empty shape of the same type, rotating 90° clockwise each step. The sequence so far is: Filled Circle -> Empty Square -> Filled Triangle -> Empty Circle. What comes next?",options:[{label:"A",text:"Filled Square"},{label:"B",text:"Empty Square"},{label:"C",text:"Filled Triangle"},{label:"D",text:"Empty Triangle"},{label:"E",text:"Not Sure"}]},{id:"Q59",text:"In a coding language: DOG = 26, CAT = 24, BAT = 23. Following the same logic, what does FISH equal?",options:[{label:"A",text:"38"},{label:"B",text:"42"},{label:"C",text:"45"},{label:"D",text:"50"},{label:"E",text:"Not Sure"}]},{id:"Q60",text:"An analog clock shows 3:15. What is the angle between the hour hand and the minute hand?",options:[{label:"A",text:"0°"},{label:"B",text:"7.5°"},{label:"C",text:"15°"},{label:"D",text:"22.5°"},{label:"E",text:"Not Sure"}]},{id:"Q61",text:"If A is taller than B, B is taller than C, and C is shorter than D, who is DEFINITELY the shortest?",options:[{label:"A",text:"A"},{label:"B",text:"B"},{label:"C",text:"C"},{label:"D",text:"D"},{label:"E",text:"Not Sure"}]},{id:"Q62",text:"A 3×3×3 cube is painted red on all 6 faces and then cut into 27 equal smaller cubes. How many of the smaller cubes have exactly 2 faces painted red?",options:[{label:"A",text:"6"},{label:"B",text:"8"},{label:"C",text:"12"},{label:"D",text:"18"},{label:"E",text:"Not Sure"}]},{id:"Q63",text:"What is the average of the first 5 prime numbers (2, 3, 5, 7, 11)?",options:[{label:"A",text:"5.2"},{label:"B",text:"5.6"},{label:"C",text:"6.0"},{label:"D",text:"6.4"},{label:"E",text:"Not Sure"}]},{id:"Q64",text:"If a circle has a radius of 7 cm, what is its approximate area? (Use π = 22/7)",options:[{label:"A",text:"144 cm²"},{label:"B",text:"154 cm²"},{label:"C",text:"164 cm²"},{label:"D",text:"176 cm²"},{label:"E",text:"Not Sure"}]}],dt=[{id:"Q65",text:"When I encounter a new subject or skill, I pick it up quickly and enjoy the challenge of learning something unfamiliar."},{id:"Q66",text:"I break complex problems down into smaller manageable components before deciding on a solution."},{id:"Q67",text:"I evaluate multiple perspectives and gather evidence before drawing conclusions."},{id:"Q68",text:"I am comfortable adapting my plans when new information contradicts my initial assumptions."},{id:"Q69",text:"I make decisions based on logical reasoning rather than impulse or emotional pressure."},{id:"Q70",text:"When there is no clear plan or I cannot predict what will happen next, I feel very unsettled and find it difficult to take any action."},{id:"Q71",text:"I reflect on past mistakes to refine my strategy and decision-making approach."},{id:"Q72",text:"I enjoy brainstorming creative solutions to open-ended problems with no single right answer."},{id:"Q73",text:"I stay focused on long-term career goals even when faced with immediate minor setbacks."}],It=()=>{const t=de(),[s,ee]=a.useState(!1),[n,M]=a.useState(1),d=4,[l,te]=a.useState({}),B=a.useRef(null),z=()=>{setTimeout(()=>{B.current&&B.current.scrollIntoView({behavior:"smooth",block:"start"});const o=document.querySelector("main");o&&o.scrollTo({top:0,behavior:"smooth"}),window.scrollTo({top:0,behavior:"smooth"})},50)},ie=()=>{M(o=>Math.min(d,o+1)),z()},oe=()=>{M(o=>Math.max(1,o-1)),z()},g=(o,r)=>{te(le=>({...le,[o]:r}))},[re,D]=a.useState(!1),se=()=>{localStorage.setItem("pwc_assessment_form_submitted","true"),D(!0)},ne=a.useCallback(()=>{D(!1),t(u.STUDENT_PORTAL)},[t]),U=Math.round(n/d*100);return e.jsxs(Ee,{ref:B,children:[s&&e.jsx(Ce,{title:"CLASS 9 & 10 CAREER ASSESSMENT",subtitle:"Career Counselling Programme — Instructions for Students",breadcrumbs:[{label:"Student Portal",href:u.STUDENT_PORTAL},{label:"Career Assessment"}],onBack:()=>t(u.STUDENT_PORTAL),actions:e.jsxs(Fe,{variant:"primary",size:"md",children:["Step ",n," of ",d]})}),s?e.jsxs(Xe,{children:[e.jsxs(Ze,{children:[e.jsxs(qe,{children:[e.jsxs("span",{children:[n===1&&"RIASEC INTEREST INVENTORY (Q1 to Q24)",n===2&&"BIG FIVE PERSONALITY TRAITS (Q25 to Q44)",n===3&&"APTITUDE & REASONING (Q45 to Q64)",n===4&&"COGNITIVE & DECISION STYLE (Q65 to Q73)"]}),e.jsxs("span",{children:["Step ",n," of ",d," (",U,"%)"]})]}),e.jsx(et,{children:e.jsx(tt,{$percent:U})})]}),e.jsxs(it,{children:[n===1&&e.jsxs(e.Fragment,{children:[e.jsx(Q,{style:{fontSize:"14px",fontWeight:500,color:"#334155"},children:"Instructions: Rate how much you agree with each statement on a scale of 1 (Strongly Disagree) to 5 (Strongly Agree)."}),nt.map(o=>e.jsxs(E,{children:[e.jsxs(T,{children:[o.id.replace("Q",""),". ",o.text]}),e.jsx(W,{children:H.map(r=>e.jsxs(G,{type:"button",$ratingValue:r.val,$selected:l[o.id]===r.val,onClick:()=>g(o.id,r.val),children:[e.jsx(Y,{$selected:l[o.id]===r.val,children:r.val}),e.jsx(_,{children:r.label})]},r.val))})]},o.id))]}),n===2&&e.jsxs(e.Fragment,{children:[e.jsx(Q,{style:{fontSize:"14px",fontWeight:500,color:"#334155"},children:"Instructions: Rate your agreement with each personality statement from 1 (Strongly Disagree) to 5 (Strongly Agree)."}),lt.map(o=>e.jsxs(E,{children:[e.jsxs(T,{children:[o.id.replace("Q",""),". ",o.text]}),e.jsx(W,{children:H.map(r=>e.jsxs(G,{type:"button",$ratingValue:r.val,$selected:l[o.id]===r.val,onClick:()=>g(o.id,r.val),children:[e.jsx(Y,{$selected:l[o.id]===r.val,children:r.val}),e.jsx(_,{children:r.label})]},r.val))})]},o.id))]}),n===3&&e.jsxs(e.Fragment,{children:[e.jsx(Q,{style:{fontSize:"14px",fontWeight:500,color:"#334155"},children:"Instructions: Multiple choice aptitude questions. Select the single best answer, or select 'Not Sure' if genuinely unsure."}),at.map(o=>e.jsxs(E,{children:[e.jsxs(T,{children:[o.id.replace("Q",""),". ",o.text]}),e.jsx(ot,{children:o.options.map(r=>e.jsxs(rt,{$selected:l[o.id]===r.label,children:[e.jsx("input",{type:"radio",name:`q_${o.id}`,value:r.label,checked:l[o.id]===r.label,onChange:()=>g(o.id,r.label)}),e.jsx("span",{children:r.text})]},r.label))})]},o.id))]}),n===4&&e.jsxs(e.Fragment,{children:[e.jsx(Q,{style:{fontSize:"14px",fontWeight:500,color:"#334155"},children:"Instructions: Reverting to 1 to 5 scale (Strongly Disagree to Strongly Agree) for cognitive & decision-making style."}),dt.map(o=>e.jsxs(E,{children:[e.jsxs(T,{children:[o.id.replace("Q",""),". ",o.text]}),e.jsx(W,{children:H.map(r=>e.jsxs(G,{type:"button",$ratingValue:r.val,$selected:l[o.id]===r.val,onClick:()=>g(o.id,r.val),children:[e.jsx(Y,{$selected:l[o.id]===r.val,children:r.val}),e.jsx(_,{children:r.label})]},r.val))})]},o.id))]})]}),e.jsxs(st,{children:[e.jsx(m,{type:"button",variant:"secondary",size:"md",leftIcon:e.jsx(V,{size:18}),disabled:n===1,onClick:oe,children:"Previous Step"}),n<d?e.jsx(m,{type:"button",variant:"primary",size:"md",rightIcon:e.jsx($e,{size:18}),onClick:ie,children:"Next Step"}):e.jsx(m,{type:"button",variant:"primary",size:"md",leftIcon:e.jsx(Ie,{size:18}),onClick:se,children:"Submit Assessment"})]})]}):e.jsxs(Te,{children:[e.jsxs(Qe,{children:[e.jsx(Be,{children:e.jsx(ze,{type:"button",onClick:()=>t(u.STUDENT_PORTAL),"aria-label":"Back to Student Portal",children:e.jsx(V,{size:18})})}),e.jsx(De,{children:"CLASS 9 & 10 CAREER ASSESSMENT"}),e.jsx(Re,{children:"Instructions for Students"}),e.jsx(Ne,{children:"Read this carefully before you begin."})]}),e.jsxs(Le,{children:[e.jsxs(b,{$gradient:"linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)",$borderColor:"#DBEAFE",children:[e.jsx(f,{$bg:"#DBEAFE",$color:"#1E40AF",children:e.jsx(ce,{size:24})}),e.jsxs(y,{children:[e.jsx(j,{$color:"#1E40AF",children:"73"}),e.jsx(w,{children:"Questions"})]})]}),e.jsxs(b,{$gradient:"linear-gradient(135deg, #F8FAFC 0%, #FAF5FF 100%)",$borderColor:"#E9D5FF",children:[e.jsx(f,{$bg:"#F3E8FF",$color:"#6B21A8",children:e.jsx(xe,{size:24})}),e.jsxs(y,{children:[e.jsx(j,{$color:"#6B21A8",children:"4"}),e.jsx(w,{children:"Sections"})]})]}),e.jsxs(b,{$gradient:"linear-gradient(135deg, #F8FAFC 0%, #FEF3C7 100%)",$borderColor:"#FDE68A",children:[e.jsx(f,{$bg:"#FEF3C7",$color:"#B45309",children:e.jsx(pe,{size:24})}),e.jsxs(y,{children:[e.jsx(j,{$color:"#B45309",children:"30–35"}),e.jsx(w,{children:"Minutes"})]})]}),e.jsxs(b,{$gradient:"linear-gradient(135deg, #F8FAFC 0%, #ECFDF5 100%)",$borderColor:"#A7F3D0",children:[e.jsx(f,{$bg:"#D1FAE5",$color:"#047857",children:e.jsx(he,{size:24})}),e.jsxs(y,{children:[e.jsx(j,{$color:"#047857",children:"100%"}),e.jsx(w,{children:"Confidential"})]})]})]}),e.jsxs("div",{children:[e.jsxs(S,{children:[e.jsx(v,{$color:"#2563EB",children:e.jsx(K,{size:18})}),e.jsx(k,{children:"Before You Begin"})]}),e.jsxs(Pe,{style:{marginTop:16},children:[e.jsxs(R,{children:[e.jsxs(N,{children:[e.jsx(L,{$bg:"#DBEAFE",$color:"#1E40AF",children:e.jsx(ge,{size:20})}),e.jsx(P,{children:"1. Find a quiet spot."})]}),e.jsx(O,{children:"Sit somewhere with no distractions — no noise, no interruptions. This is your time."})]}),e.jsxs(R,{children:[e.jsxs(N,{children:[e.jsx(L,{$bg:"#D1FAE5",$color:"#047857",children:e.jsx(ue,{size:20})}),e.jsx(P,{children:"2. Check your Internet."})]}),e.jsx(O,{children:"You will need a stable connection throughout. Make sure you are connected before you start. In case your connection drops, you can resume from where you have left."})]}),e.jsxs(R,{children:[e.jsxs(N,{children:[e.jsx(L,{$bg:"#F3E8FF",$color:"#6B21A8",children:e.jsx(me,{size:20})}),e.jsx(P,{children:"3. Keep your phone away."})]}),e.jsx(O,{children:"Avoid distractions. The assessment takes only 30–35 minutes — give it your full attention."})]})]})]}),e.jsxs("div",{children:[e.jsxs(S,{children:[e.jsx(v,{$color:"#5D2384",children:e.jsx(be,{size:18})}),e.jsx(k,{children:"What This Assessment Is About"})]}),e.jsxs(Oe,{style:{marginTop:16},children:[e.jsxs(We,{children:[e.jsx(K,{size:20,style:{color:"#5D2384"}}),e.jsx("span",{children:"This is not a test. There are no right or wrong answers."})]}),e.jsx(Ge,{children:"This assessment is simply about YOU — your interests, your personality, how you think, and what you are naturally good at. What kinds of activities and environments you genuinely enjoy? How you naturally behave — your energy, discipline, empathy, and more? Your natural reasoning ability — numbers, words, logic, and visuals. How you learn, handle uncertainty, and prefer to work. The results will help you understand which careers and streams are the best fit for you. Nobody is judging your answers. Your responses are completely confidential and will only be used for your career guidance."})]})]}),e.jsxs("div",{children:[e.jsxs(S,{children:[e.jsx(v,{$color:"#0284C7",children:e.jsx(fe,{size:18})}),e.jsx(k,{children:"How to Answer — Two Types of Questions"})]}),e.jsxs("div",{style:{marginTop:16,display:"flex",flexDirection:"column",gap:20},children:[e.jsxs("div",{children:[e.jsx("strong",{style:{fontSize:15,color:"#0F172A",display:"block",marginBottom:4},children:"TYPE A · Agreement Questions"}),e.jsx("p",{style:{margin:0,fontSize:14,color:"#64748B"},children:"You will see a statement and choose how much it describes you, on a scale of 1 to 5."}),e.jsxs(Ye,{children:[e.jsxs(x,{$borderTopColor:"#DC2626",$bg:"#FEF2F2",children:[e.jsxs(p,{$color:"#DC2626",children:[e.jsx(ye,{size:16})," 1 - Strongly Disagree"]}),e.jsx(h,{children:"You are certain this statement does not apply to you."})]}),e.jsxs(x,{$borderTopColor:"#EA580C",$bg:"#FFF7ED",children:[e.jsxs(p,{$color:"#EA580C",children:[e.jsx(je,{size:16})," 2 - Disagree"]}),e.jsx(h,{children:"This does not describe you, though not with extreme certainty."})]}),e.jsxs(x,{$borderTopColor:"#64748B",$bg:"#F8FAFC",children:[e.jsxs(p,{$color:"#64748B",children:[e.jsx(we,{size:16})," 3 - Neutral"]}),e.jsx(h,{children:"Genuinely unsure. If you even slightly agree or disagree, choose that option."})]}),e.jsxs(x,{$borderTopColor:"#0D9488",$bg:"#F0FDF4",children:[e.jsxs(p,{$color:"#0D9488",children:[e.jsx(Se,{size:16})," 4 - Agree"]}),e.jsx(h,{children:"It describes you — you generally feel this way."})]}),e.jsxs(x,{$borderTopColor:"#059669",$bg:"#ECFDF5",children:[e.jsxs(p,{$color:"#059669",children:[e.jsx(ve,{size:16})," 5 - Strongly Agree"]}),e.jsx(h,{children:"You are confident and completely sure this describes you."})]})]})]}),e.jsxs("div",{children:[e.jsx("strong",{style:{fontSize:15,color:"#0F172A",display:"block",marginBottom:4},children:"TYPE B · Aptitude Questions"}),e.jsx("p",{style:{margin:0,fontSize:14,color:"#64748B"},children:"These are multiple-choice questions with one correct answer."}),e.jsxs(_e,{children:[e.jsxs(X,{children:[e.jsx(Z,{children:"A"}),e.jsxs(q,{children:[e.jsx(J,{size:18,style:{marginRight:8,color:"#D97706",flexShrink:0}}),e.jsx("span",{children:"Choose the answer you think is correct. Trust your reasoning."})]})]}),e.jsxs(X,{children:[e.jsx(Z,{children:"B"}),e.jsxs(q,{children:[e.jsx(J,{size:18,style:{marginRight:8,color:"#D97706",flexShrink:0}}),e.jsx("span",{children:"If you are genuinely unsure, select 'Not Sure' — this is honest and it actually helps your profile. Do not guess randomly."})]})]})]})]})]})]}),e.jsxs("div",{children:[e.jsxs(S,{children:[e.jsx(v,{$color:"#D97706",children:e.jsx(c,{size:18})}),e.jsx(k,{children:"The Golden Rules — Read These Carefully"})]}),e.jsxs(He,{style:{marginTop:16},children:[e.jsxs($,{children:[e.jsx(I,{children:e.jsx(c,{size:20})}),e.jsxs(C,{children:[e.jsx(F,{children:"Be honest. Be yourself."}),e.jsx(A,{children:"Answer based on how YOU actually are — not how you want to be seen, not what sounds impressive, not what you think a counsellor wants to hear. The more honest you are, the more useful your results will be."})]})]}),e.jsxs($,{children:[e.jsx(I,{children:e.jsx(c,{size:20})}),e.jsxs(C,{children:[e.jsx(F,{children:"Go with your first instinct."}),e.jsx(A,{children:"Do not overthink. Your first reaction to a statement is usually the most accurate reflection of who you are. If you sit on a question too long, you start second-guessing yourself."})]})]}),e.jsxs($,{children:[e.jsx(I,{children:e.jsx(c,{size:20})}),e.jsxs(C,{children:[e.jsx(F,{children:"Do not skip or rush."}),e.jsx(A,{children:"Every question contributes to your profile. At the same time, do not spend more than a few seconds on any single question — keep moving."})]})]}),e.jsxs($,{children:[e.jsx(I,{children:e.jsx(c,{size:20})}),e.jsxs(C,{children:[e.jsx(F,{children:"Your results are private."}),e.jsx(A,{children:"Only you and your career counsellor will see them. This is a safe space — be real."})]})]})]})]}),e.jsxs(Me,{children:[e.jsx(Ue,{children:"You are ready. Take a deep breath."}),e.jsx(Ve,{children:"There is nothing to prepare for. Just be yourself — and let the results do the rest."})]}),e.jsxs(Ke,{children:[e.jsx(m,{variant:"primary",size:"lg",rightIcon:e.jsx(ke,{size:20}),onClick:()=>{ee(!0),z()},style:{minWidth:"300px"},children:"Start Career Assessment"}),e.jsx(Je,{children:"Estimated time: 30-35 minutes • Answers saved automatically as you navigate"})]})]}),e.jsx(Ae,{isOpen:re,onClose:()=>D(!1),title:"Thank you for completing your Career Assessment!",message:"Your 73 answers have been saved and your Ikigai profile report is generating.",confirmText:"Go to Student Portal",onConfirm:ne})]})};export{It as AssessmentFormPage,It as default};
