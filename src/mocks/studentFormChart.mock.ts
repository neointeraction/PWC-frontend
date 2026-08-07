export interface AcademicRecord {
  id: string;
  classLevel: string;
  subject: string;
  grade: string;
}

export interface ComparisonItem {
  id: string;
  code: string;
  parameter: string;
  studentResponse: string;
  parentResponse: string;
}

export interface ComparisonSubGroup {
  id: string;
  title: string;
  items: ComparisonItem[];
}

export interface TraitAssessmentItem {
  id: string;
  no: number;
  layerTrait: string;
  traitName: string;
  whatItMeasures: string;
  grade: string;
  gradeMeaning: string;
}

export interface StreamFitItem {
  id: string;
  mainStream: string;
  subStream: string;
  coreSubjects: string;
  electives: string;
  gradingLevel: string;
  meaning: string;
}

export interface GraduationItem {
  id: string;
  cluster: string;
  degree: string;
  specialisations: string;
  additionalPath: string;
  keyExams: string;
}

export interface CareerCompassItem {
  id: string;
  domain: string;
  role: string;
  whyItFits: string;
  topEmployers: string;
  aiResilience: string;
  salaryIndia: string;
  salaryAbroad: string;
}

export interface ReliabilityCardData {
  code: string;
  name: string;
  guidingQuestion: string;
  valueStatus: string;
  explanationText: string;
}

export interface SCRIItemData {
  code: string;
  name: string;
  description: string;
  rating: number; // 1 to 4
}

export interface RoadmapGridData {
  nowSkills: string;
  nowActivities: string;
  nowHabits: string;
  c11Stream: string;
  c11Exams: string;
  c11Electives: string;
  afterDegrees: string;
  afterCertifications: string;
  afterAbroad: string;
}

export interface CounsellorFormChartData {
  sessionId: string;
  studentId: string;
  // Step 0: Student Info
  studentInfo: {
    studentName: string;
    className: string;
    parentName: string;
    occupation: string;
    academicRecords: AcademicRecord[];
    academicTrend: 'Improving' | 'Stable' | 'Declining' | 'Not Assessed';
    academicTrendNotes: string;
  };
  // Step 1: Section A
  sectionA: {
    comparisonGroups: ComparisonSubGroup[];
    synthesisNotes: Record<string, string>; // A1..A5
  };
  // Step 2: Section B
  sectionB: {
    comparisonGroups: ComparisonSubGroup[];
    synthesisNotesPre: Record<string, string>; // B1..B5
    traitsTable: TraitAssessmentItem[];
    summaryStrip: {
      careerStyle: string;
      personalSignature: string;
      thinkingMode: string;
    };
    careerDnaNarrative: {
      dnaDefinition: string;
      careerStyleReveals: string;
      personalityStyleReveals: string;
      thinkingModeReveals: string;
      aptitudeProfileReveals: string;
      reinforcementAct1: string;
      reinforcementAct2: string;
      reinforcementAct3: string;
    };
  };
  // Step 3: Section C
  sectionC: {
    comparisonGroups: ComparisonSubGroup[];
    synthesisNotesPre: Record<string, string>; // D1..D5
    streamFitTable: StreamFitItem[];
    whyThisStream1: string;
    synthesisNotesE: Record<string, string>; // E1..E5
    graduationTable: GraduationItem[];
    whyThisStream2: string;
    synthesisNotesF: Record<string, string>; // F1..F5
    careerCompassTable: CareerCompassItem[];
  };
  // Step 4: Section D
  sectionD: {
    indicators: ReliabilityCardData[];
    synthesisNotes: Record<string, string>; // G1..G5
  };
  // Step 5: Section E
  sectionE: {
    roadmapGrid: RoadmapGridData;
    scriItems: SCRIItemData[];
    academicCareerAlignment: 'Strongly Aligned' | 'Partially Aligned' | 'Misaligned' | 'Not Yet Assessed';
    synthesisNotes: Record<string, string>; // H1..H5
  };
  // Step 6: Section F
  sectionF: {
    comparisonGroups: ComparisonSubGroup[];
    synthesisNotes: Record<string, string>; // I1..I5
  };
}

export const getMockStudentFormChartData = (sessionId: string = 'sess-counselor-1'): CounsellorFormChartData => {
  return {
    sessionId,
    studentId: 'stud-101',
    studentInfo: {
      studentName: 'Aarav Sharma',
      className: 'Class 10 - Section A',
      parentName: 'Rajesh Sharma & Sunita Sharma',
      occupation: 'Senior Software Engineer & High School Educator',
      academicRecords: [
        { id: 'rec-1', classLevel: 'Class 7', subject: 'Mathematics & Science', grade: '96%' },
        { id: 'rec-2', classLevel: 'Class 8', subject: 'Mathematics & Science', grade: '97%' },
        { id: 'rec-3', classLevel: 'Class 9', subject: 'Mathematics, Physics & Computer Applications', grade: '98%' },
      ],
      academicTrend: 'Improving',
      academicTrendNotes: 'Consistently exceptional performance in quantitative and technical subjects across Class 7 to 9.',
    },
    sectionA: {
      comparisonGroups: [
        {
          id: 'sub-a1',
          title: 'A1 · Subject Preferences & Academic Performance',
          items: [
            {
              id: 'a1-1',
              code: 'A1.1',
              parameter: 'Favourite Subject',
              studentResponse: 'Mathematics, Physics & Computer Science',
              parentResponse: 'Mathematics & Science',
            },
            {
              id: 'a1-2',
              code: 'A1.2',
              parameter: 'Least Favourite Subject',
              studentResponse: 'History & Languages',
              parentResponse: 'History & Social Studies',
            },
            {
              id: 'a1-3',
              code: 'A1.3',
              parameter: 'Subject Strengths',
              studentResponse: 'Problem solving, Logical proofs, Coding in Python',
              parentResponse: 'Analytical thinking, Numerical speed',
            },
            {
              id: 'a1-4',
              code: 'A1.4',
              parameter: 'Academic Score Range',
              studentResponse: '95% - 98%',
              parentResponse: 'Above 95% consistently',
            },
          ],
        },
        {
          id: 'sub-a2',
          title: 'A2 · Non-Academic Activities, Hobbies & Learning Mode',
          items: [
            {
              id: 'a2-1',
              code: 'A2.1',
              parameter: 'Extracurricular Activities',
              studentResponse: 'Robotics Club Captain, School Chess Team Lead',
              parentResponse: 'Robotics competitions, Inter-school Chess',
            },
            {
              id: 'a2-2',
              code: 'A2.2',
              parameter: 'Favorite Hobbies',
              studentResponse: 'Building Arduino projects, 3D printing, Speedcubing',
              parentResponse: 'Puzzles, Coding exercises at home',
            },
            {
              id: 'a2-3',
              code: 'A2.3',
              parameter: 'Preferred Learning Style',
              studentResponse: 'Kinesthetic & Hands-on Visual (building prototypes)',
              parentResponse: 'Practical application & self-paced online videos',
            },
            {
              id: 'a2-4',
              code: 'A2.4',
              parameter: 'Time Spent on Self-Study',
              studentResponse: '2.5 - 3 hours daily',
              parentResponse: '3 hours structured evening study',
            },
          ],
        },
      ],
      synthesisNotes: {
        A1: 'High alignment between student and parent regarding quantitative interest. Student excels in technical subjects.',
        A2: 'Demonstrates strong kinesthetic learning through practical engineering and coding hobbies.',
        A3: 'Extracurricular involvement directly reinforces academic problem-solving capabilities.',
        A4: 'Self-study discipline is high; candidate thrives with autonomous problem sets.',
        A5: 'Overall academic profile indicates readiness for rigorous STEM entrance pathways.',
      },
    },
    sectionB: {
      comparisonGroups: [
        {
          id: 'sub-b1',
          title: 'B1 · Key Strengths Identified',
          items: [
            {
              id: 'b1-1',
              code: 'B1.1',
              parameter: 'Primary Core Strength',
              studentResponse: 'Mathematical logic & Systems breakdown',
              parentResponse: 'High concentration & perseverance on complex problems',
            },
            {
              id: 'b1-2',
              code: 'B1.2',
              parameter: 'Secondary Strength',
              studentResponse: 'Spatial visualization & structural design',
              parentResponse: 'Methodical organization of daily routine',
            },
          ],
        },
        {
          id: 'sub-b2',
          title: 'B2 · Key Personality Traits Identified',
          items: [
            {
              id: 'b2-1',
              code: 'B2.1',
              parameter: 'Work & Thinking Style',
              studentResponse: 'Introverted, analytical, detail-driven',
              parentResponse: 'Calm under pressure, highly reflective',
            },
            {
              id: 'b2-2',
              code: 'B2.2',
              parameter: 'Social Interaction Style',
              studentResponse: 'Prefers small technical team collaboration',
              parentResponse: 'Selective communicator, active listener',
            },
          ],
        },
        {
          id: 'sub-b3',
          title: 'B3 · Areas for Development / Growth',
          items: [
            {
              id: 'b3-1',
              code: 'B3.1',
              parameter: 'Communication & Expression',
              studentResponse: 'Public speaking & non-technical essay writing',
              parentResponse: 'Expressing subjective emotions in group settings',
            },
          ],
        },
      ],
      synthesisNotesPre: {
        B1: 'Strong synergy in strength identification; both recognize deep logical concentration.',
        B2: 'Personality traits align with INTJ engineering profile.',
        B3: 'Public speaking and verbal articulation identified as focus area for leadership development.',
        B4: 'High emotional stability supports high-stakes exam preparation.',
        B5: 'Recommended targeted debate or MUN workshops to build public confidence.',
      },
      traitsTable: [
        { id: 't-1', no: 1, layerTrait: 'Layer 1 — Core Aptitude', traitName: 'Numerical Reasoning', whatItMeasures: 'Speed & accuracy in quantitative operations', grade: 'A+', gradeMeaning: '99th Percentile — Superior Mastery' },
        { id: 't-2', no: 2, layerTrait: 'Layer 1 — Core Aptitude', traitName: 'Spatial Aptitude', whatItMeasures: '3D spatial rotation & visual assembly', grade: 'A+', gradeMeaning: '98th Percentile — High Structural Insight' },
        { id: 't-3', no: 3, layerTrait: 'Layer 2 — Personality', traitName: 'Analytical Rigor', whatItMeasures: 'Tendency to evaluate facts objectively', grade: 'A', gradeMeaning: 'High Consistency & Logic Focus' },
        { id: 't-4', no: 4, layerTrait: 'Layer 3 — Interest', traitName: 'Computational & Tech', whatItMeasures: 'Enthusiasm for algorithmic design', grade: 'A+', gradeMeaning: 'Primary Passion Driver' },
      ],
      summaryStrip: {
        careerStyle: 'Analytical Technologist',
        personalSignature: 'INTJ — Strategic System Architect',
        thinkingMode: 'Abstract & Deductive Logic',
      },
      careerDnaNarrative: {
        dnaDefinition: 'High-Velocity Technical Innovator with exceptional quantitative intuition and spatial modeling capabilities.',
        careerStyleReveals: 'Thrives in structured engineering environments requiring deep problem decomposition and code optimization.',
        personalityStyleReveals: 'Prefers clear objective metrics over ambiguous qualitative feedback. Displays high autonomous task execution.',
        thinkingModeReveals: 'Applies rigorous deductive logic to break multi-variable problems into solvable modular units.',
        aptitudeProfileReveals: 'Numerical reasoning and spatial visualization scores fall in the top 2% of national benchmark norms.',
        reinforcementAct1: 'Participate in Olympiad Mathematical Problem Solving circles.',
        reinforcementAct2: 'Lead the high school Robotics sensor integration sub-team.',
        reinforcementAct3: 'Complete Python & Data Structures certification on kREATE portal.',
      },
    },
    sectionC: {
      comparisonGroups: [
        {
          id: 'sub-c1',
          title: 'C1 · Awareness of Career Options',
          items: [
            {
              id: 'c1-1',
              code: 'C1.1',
              parameter: 'Domain Familiarity',
              studentResponse: 'Computer Science, Artificial Intelligence, Robotics',
              parentResponse: 'Software Engineering, Data Science',
            },
            {
              id: 'c1-2',
              code: 'C1.2',
              parameter: 'Source of Awareness',
              studentResponse: 'Tech blogs, GitHub projects, YouTube lecture series',
              parentResponse: 'Industry colleagues, media & educational news',
            },
          ],
        },
        {
          id: 'sub-c2',
          title: 'C2 · Primary Career Aspirations',
          items: [
            {
              id: 'c2-1',
              code: 'C2.1',
              parameter: 'Dream Role / Target Field',
              studentResponse: 'AI Research Engineer / Robotics Systems Lead',
              parentResponse: 'Computer Science Engineer at top tier institute',
            },
          ],
        },
        {
          id: 'sub-c3',
          title: 'C3 · Factors Influencing Career Choice',
          items: [
            {
              id: 'c3-1',
              code: 'C3.1',
              parameter: 'Primary Motivator',
              studentResponse: 'Building high-impact technology & solving hard math problems',
              parentResponse: 'High growth industry, global mobility & stability',
            },
          ],
        },
      ],
      synthesisNotesPre: {
        D1: 'Student displays remarkably mature understanding of specialized CS fields (AI/Robotics).',
        D2: 'Parents are supportive of CS direction and value long-term stability.',
        D3: 'Intrinsic motivation (problem solving) dominates extrinsic factors.',
        D4: 'Needs early exposure to core electrical/hardware aspects vs pure software.',
        D5: 'High alignment between student dream role and aptitude test benchmarks.',
      },
      streamFitTable: [
        { id: 'sf-1', mainStream: 'Science', subStream: 'PCM with Computer Science', coreSubjects: 'Physics, Chemistry, Mathematics', electives: 'Computer Science / Python', gradingLevel: 'Tier 1 Prime Fit', meaning: 'Ideal match for student cognitive strengths' },
      ],
      whyThisStream1: 'Science (PCM + CS) provides the foundational mathematical and physical principles essential for top engineering entrance exams (JEE Advanced, BITSAT) and future AI hardware/software design.',
      synthesisNotesE: {
        E1: 'PCM + CS is unequivocally recommended as the primary Class 11 stream.',
        E2: 'Mathematics rigor must be prioritized from Class 10 transition.',
        E3: 'Physics conceptual clarity will support robotics sub-domain aspirations.',
        E4: 'Computer Science elective gives immediate advantage in programming foundations.',
        E5: 'No alternative stream required given clear quantitative dominance.',
      },
      graduationTable: [
        { id: 'gr-1', cluster: 'Engineering & Technology', degree: 'B.Tech / B.E.', specialisations: 'Computer Science & Engineering (AI/ML)', additionalPath: 'Integrated M.Tech / Dual Degree', keyExams: 'JEE Main, JEE Advanced, BITSAT' },
      ],
      whyThisStream2: 'B.Tech in Computer Science with AI/ML specialization offers direct alignment with student interest in algorithms, robotics systems, and quantitative modeling.',
      synthesisNotesF: {
        F1: 'Target degree: 4-year B.Tech CS / AI in premier engineering institutes.',
        F2: 'Focus on top 15 IITs, NITs, and BITS Pilani.',
        F3: 'Plan JEE Main & Advanced prep starting Class 11.',
        F4: 'Explore foreign undergraduate options (US/UK) if SAT/AP exams are added.',
        F5: 'Keep dual degree (CS + Economics/Math) as secondary high-value option.',
      },
      careerCompassTable: [
        { id: 'cc-1', domain: 'Artificial Intelligence', role: 'AI / Machine Learning Engineer', whyItFits: 'Matches top quantitative score & Python passion', topEmployers: 'Google Research, OpenAI, NVIDIA, Microsoft', aiResilience: 'Very High (Core Creator)', salaryIndia: '₹18 - ₹35 LPA (Fresh Graduate)', salaryAbroad: '$120,000 - $160,000/yr' },
        { id: 'cc-2', domain: 'Robotics Engineering', role: 'Robotic Systems Engineer', whyItFits: 'Combines spatial rotation & hardware integration', topEmployers: 'Tesla, Boston Dynamics, ISRO, ABB', aiResilience: 'Very High (Physical AI)', salaryIndia: '₹14 - ₹28 LPA', salaryAbroad: '$110,000 - $150,000/yr' },
      ],
    },
    sectionD: {
      indicators: [
        {
          code: 'EIM',
          name: 'Engagement Integrity Measure',
          guidingQuestion: 'Did the student take adequate time and show active focus during psychometric testing?',
          valueStatus: '98% — High Focus',
          explanationText: 'Test completion pattern reveals steady pace without rapid clicking or automated guessing.',
        },
        {
          code: 'ACI',
          name: 'Assessment Consistency Index',
          guidingQuestion: 'Do responses across cross-validating questions match logically?',
          valueStatus: '95% — Highly Consistent',
          explanationText: 'Strong correlation across repeated logic questions and interest validation checks.',
        },
        {
          code: 'AAI',
          name: 'Aptitude Alignment Indicator',
          guidingQuestion: 'Does self-reported skill level align with objective test results?',
          valueStatus: '92% — Accurate Self-Awareness',
          explanationText: 'Student self-ratings in quantitative ability accurately reflect high test output.',
        },
        {
          code: 'HRS',
          name: 'Response Honesty & Reliability Score',
          guidingQuestion: 'Are there signs of social desirability bias or fake response patterns?',
          valueStatus: 'High Integrity',
          explanationText: 'Honesty scale shows minimal defensive responding; data is highly dependable for session planning.',
        },
      ],
      synthesisNotes: {
        G1: 'Assessment results carry high diagnostic validity (>95% reliability across all 4 metrics).',
        G2: 'No re-testing required for core quantitative or personality modules.',
        G3: 'High alignment between subjective preference and objective psychometric indicators.',
        G4: 'Data can be shared with parents with total confidence during PTM.',
        G5: 'Validates proceeding directly to Class 11 subject selection and test roadmap.',
      },
    },
    sectionE: {
      roadmapGrid: {
        nowSkills: 'Advanced Python, Calculus foundations, Speed Mathematics',
        nowActivities: 'State Robotics Championship, Science Exhibition Lead',
        nowHabits: 'Daily 45-min logic puzzle practice, Structured time blocking',
        c11Stream: 'Science (PCM + CS)',
        c11Exams: 'JEE Main Mock Series, Olympiad (KVPY/NSEP/NSEC)',
        c11Electives: 'Computer Science (Python & SQL focus)',
        afterDegrees: 'B.Tech CS / AI (IITs, NITs, BITS)',
        afterCertifications: 'AWS Certified Machine Learning, TensorFlow Developer',
        afterAbroad: 'GRE / TOEFL for US MS program (Carnegie Mellon, MIT)',
      },
      scriItems: [
        { code: 'S1', name: 'Academic Benchmark Alignment', description: 'Class 9/10 marks consistency with target stream requirements', rating: 4 },
        { code: 'S2', name: 'Career Domain Awareness', description: 'Depth of understanding of target roles, skills, and industry', rating: 4 },
        { code: 'S3', name: 'Aptitude-Choice Synergy', description: 'Psychometric test scores matching chosen career stream', rating: 4 },
        { code: 'S4', name: 'Parental Support & Financial Readiness', description: 'Family consensus and alignment on education investment', rating: 3 },
        { code: 'S5', name: 'Action Plan Clarity', description: 'Clarity on entrance exams, milestones, and backup options', rating: 3 },
        { code: 'S6', name: 'Self-Efficacy & Motivation', description: 'Student ownership of learning goals and exam preparation drive', rating: 4 },
      ],
      academicCareerAlignment: 'Strongly Aligned',
      synthesisNotes: {
        H1: 'Total Readiness Index score of 22/24 places student in the Top Ready Band.',
        H2: 'Prioritize building exam endurance and time management in Class 11.',
        H3: 'Recommend parent discussion on coaching institute selection for JEE prep.',
        H4: 'Ensure student maintains non-academic hobbies (chess/robotics) as stress busters.',
        H5: 'Schedule quarterly progress check-in to monitor Class 11 transition.',
      },
    },
    sectionF: {
      comparisonGroups: [
        {
          id: 'sub-f1',
          title: 'F1 · Counselling Goals & Programme Expectations',
          items: [
            {
              id: 'f1-1',
              code: 'F1.1',
              parameter: 'Primary counselling objective',
              studentResponse: 'Clear roadmap for JEE prep alongside Class 11 school exams',
              parentResponse: 'Guidance on top engineering colleges, entrance exams & coaching options',
            },
            {
              id: 'f1-2',
              code: 'F1.2',
              parameter: 'Anything specific counsellor to know before session',
              studentResponse: 'Wants to explore integrated B.Tech + M.Tech options in AI',
              parentResponse: 'Wants guidance on balancing board exam focus with entrance prep',
            },
          ],
        },
      ],
      synthesisNotes: {
        I1: 'Primary goal achieved: Delivered unified Class 11 stream & competitive exam strategy.',
        I2: 'Addressed parent query regarding school board vs JEE prep balance.',
        I3: 'Established clear timeline for Class 10 board completion and Class 11 transition.',
        I4: 'Scheduled follow-up parent-teacher-counsellor meeting (PTM) after Class 10 pre-boards.',
        I5: 'Finalized candidate enrollment in PWC Tier-1 Engineering Mentorship Programme.',
      },
    },
  };
};
