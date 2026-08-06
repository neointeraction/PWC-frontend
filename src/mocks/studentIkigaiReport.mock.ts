export interface TraitMapItem {
  no: number;
  layerTrait: string;
  traitName: string;
  whatItMeasures: string;
  grade: string;
  gradeMeaning: string;
}

export interface ReliabilityMetric {
  code: string;
  name: string;
  score: string;
  status: string;
  guidance: string;
}

export interface StreamFitItem {
  id: string;
  mainStream: string;
  subStream: string;
  coreSubjects: string;
  electives: string;
}

export interface GraduationPathwayItem {
  id: string;
  cluster: string;
  degree: string;
  specialisations: string;
  additionalPath: string;
}

export interface EntranceExamItem {
  id: string;
  examName: string;
  targetStream: string;
  tentativeDate: string;
  level: string;
  syllabusFocus: string;
}

export interface CollegeShortlistItem {
  id: string;
  collegeName: string;
  location: string;
  targetDegree: string;
  cutoffBenchmark: string;
}

export interface CareerRecommendationCard {
  id: string;
  role: string;
  cluster: string;
  industry: string;
  domain: string;
  whyItFits: string;
  topEmployers: string;
  aiResilience: string;
  salaryIndia: string;
  salaryAbroad: string;
}

export interface RoadmapPhase {
  title: string;
  subtitle: string;
  skillsToBuild: string[];
  activitiesToJoin: string[];
  habitsToDevelop: string[];
  keyMilestones: string[];
}

export interface StudentCareerIkigaiReportData {
  sessionId: string;
  studentInfo: {
    studentName: string;
    studentId: string;
    gradeClass: string;
    schoolName: string;
    counselorName: string;
    reportDate: string;
  };
  introduction: {
    whatIsIkigai: string;
    howEachComponentRelates: string;
    toParent: string;
    toStudent: string;
  };
  studentProfile: {
    archetype: string;
    snapshotSummary: string;
    academicObservations: string;
    nonAcademicObservations: string;
    coreStrengths: string[];
    personalityTraits: string[];
    growthAreas: string[];
  };
  traitMap: TraitMapItem[];
  reliability: ReliabilityMetric[];
  streamFit: {
    table: StreamFitItem[];
    whyTheseStreams: string;
  };
  graduation: {
    pathways: GraduationPathwayItem[];
    entranceExams: EntranceExamItem[];
    shortlistedColleges: CollegeShortlistItem[];
  };
  careerCompass: CareerRecommendationCard[];
  roadmap: {
    nowPhase: RoadmapPhase;
    c11Phase: RoadmapPhase;
    afterC12Phase: RoadmapPhase;
    readinessSnapshot: {
      scriScore: string;
      scriBand: string;
      readinessLabel: string;
      academicCareerAlignment: string;
    };
  };
}

export const getMockStudentIkigaiReportData = (sessionId: string = 'sess-counselor-1'): StudentCareerIkigaiReportData => {
  return {
    sessionId,
    studentInfo: {
      studentName: 'Aarav Sharma',
      studentId: 'stud-101',
      gradeClass: 'Class 10 - Section A',
      schoolName: 'Phoenix Water Club High School',
      counselorName: 'Dr. Meera Vasudevan',
      reportDate: 'August 07, 2026',
    },
    introduction: {
      whatIsIkigai:
        'The Career IKIGAI framework synthesizes four fundamental pillars: What the student loves (Passion), What the student is exceptional at (Skill & Aptitude), What the global economy demands (Market Need), and What sustains long-term professional growth (Vocation). This report locates the precise intersection of these four dimensions to map out optimal educational and career trajectories.',
      howEachComponentRelates:
        'Aptitude measures inherent cognitive velocity and numerical/spatial reasoning. Personality reveals interpersonal dynamics and stress resilience. Interest identifies intrinsic passion drivers. Academic trend highlights historical diligence. Together, these components eliminate guesswork and provide data-backed clarity.',
      toParent:
        'Dear Parent, Your encouragement and objective support are the single most critical catalysts for your child’s educational journey. Use this report as a collaborative discovery guide rather than a rigid prescription. Support their quantitative passion while enabling holistic personal development.',
      toStudent:
        'Dear Aarav, This report celebrates your unique cognitive strengths and creative potential. Your high mathematical logic and spatial intuition position you as a future technology leader. Embrace your passions, build consistent study habits, and stay curious as you sculpt your future.',
    },
    studentProfile: {
      archetype: 'Analytical Systems Innovator (INTJ)',
      snapshotSummary:
        'Aarav demonstrates top-tier quantitative aptitude combined with exceptional spatial visualization and autonomous problem-solving discipline. He thrives when analyzing complex technical systems and constructing logical algorithms.',
      academicObservations:
        'Consistently superior performance in Mathematics (98%) and Physics (92%) across Class 7 to 9. Thrives in problem sets requiring deductive proofs and computational logic.',
      nonAcademicObservations:
        'Active Captain of the School Robotics Club and Lead Chess Team player. Spends self-directed time building Arduino hardware prototypes and coding Python algorithms.',
      coreStrengths: [
        'Mathematical Reasoning & Deductive Proofs',
        '3D Spatial Rotation & Structural Intuition',
        'Methodical Concentration & Focus',
        'Autonomous Task Execution',
      ],
      personalityTraits: [
        'Analytical & Objectively Rigorous',
        'Calm under academic pressure',
        'Strategic Long-Term Thinker',
        'Selective, high-depth communicator',
      ],
      growthAreas: [
        'Public speaking & subjective essay articulation',
        'Group debate participation under open-ended topics',
        'Time management balancing board exams with entrance prep',
      ],
    },
    traitMap: [
      { no: 1, layerTrait: 'Layer 1 — Core Aptitude', traitName: 'Numerical Reasoning', whatItMeasures: 'Speed & accuracy in complex quantitative operations', grade: 'A+', gradeMeaning: '99th Percentile — Superior Mastery' },
      { no: 2, layerTrait: 'Layer 1 — Core Aptitude', traitName: 'Spatial Aptitude', whatItMeasures: '3D spatial rotation & visual assembly', grade: 'A+', gradeMeaning: '98th Percentile — High Structural Insight' },
      { no: 3, layerTrait: 'Layer 1 — Core Aptitude', traitName: 'Abstract Logic', whatItMeasures: 'Pattern recognition & algorithmic deduction', grade: 'A+', gradeMeaning: '97th Percentile — Exceptional Reasoning' },
      { no: 4, layerTrait: 'Layer 2 — Personality', traitName: 'Analytical Rigor', whatItMeasures: 'Tendency to evaluate facts objectively', grade: 'A', gradeMeaning: 'High Consistency & Logic Focus' },
      { no: 5, layerTrait: 'Layer 2 — Personality', traitName: 'Emotional Stability', whatItMeasures: 'Resilience under exam stress & pressure', grade: 'A', gradeMeaning: 'Calm & Steady Demeanor' },
      { no: 6, layerTrait: 'Layer 3 — Interest', traitName: 'Computational & Tech', whatItMeasures: 'Enthusiasm for software & systems design', grade: 'A+', gradeMeaning: 'Primary Passion Driver' },
    ],
    reliability: [
      {
        code: 'EIM',
        name: 'Engagement Integrity Measure',
        score: '98%',
        status: 'High Focus',
        guidance: 'Pacing and focus during psychometric testing were optimal without rapid guessing.',
      },
      {
        code: 'ACI',
        name: 'Aptitude Test Coherence Index',
        score: '95%',
        status: 'Highly Consistent',
        guidance: 'Strong internal consistency across repeated logic and quantitative verification questions.',
      },
      {
        code: 'AAI',
        name: 'Aptitude Accuracy Indicator',
        score: '92%',
        status: 'Accurate Awareness',
        guidance: 'Self-reported confidence aligns precisely with objective test score outputs.',
      },
      {
        code: 'HRS',
        name: 'Holistic Reliability Score',
        score: 'High Integrity',
        status: 'Dependable Data',
        guidance: 'Honesty scales confirm zero social desirability bias; results carry high diagnostic validity.',
      },
    ],
    streamFit: {
      table: [
        {
          id: 'sf-1',
          mainStream: 'Science',
          subStream: 'PCM with Computer Science',
          coreSubjects: 'Physics, Chemistry, Mathematics',
          electives: 'Computer Science (Python & SQL)',
        },
      ],
      whyTheseStreams:
        'The Science (PCM + CS) stream is unequivocally recommended. Aarav’s quantitative reasoning (99th percentile) and computational interest demand rigorous mathematical training. This combination establishes the foundation for premier engineering entrance examinations (JEE Advanced, BITSAT) and future AI hardware/software research.',
    },
    graduation: {
      pathways: [
        {
          id: 'gp-1',
          cluster: 'Engineering & Technology',
          degree: 'B.Tech / B.E.',
          specialisations: 'Computer Science & Engineering (AI/ML)',
          additionalPath: 'Integrated M.Tech / Dual Degree in Data Science',
        },
        {
          id: 'gp-2',
          cluster: 'Applied Mathematics & Robotics',
          degree: 'B.Des / B.Tech',
          specialisations: 'Robotics & Automation Systems',
          additionalPath: 'Minor in Computational Economics',
        },
      ],
      entranceExams: [
        {
          id: 'ee-1',
          examName: 'JEE Main & JEE Advanced',
          targetStream: 'Engineering (IITs & NITs)',
          tentativeDate: 'April / May 2028',
          level: 'National Level (Tier 1)',
          syllabusFocus: 'Class 11 & 12 Physics, Chemistry & Mathematics',
        },
        {
          id: 'ee-2',
          examName: 'BITSAT',
          targetStream: 'B.Tech CS at BITS Pilani',
          tentativeDate: 'May / June 2028',
          level: 'University Level (Tier 1)',
          syllabusFocus: 'PCM + English Proficiency & Logical Reasoning',
        },
      ],
      shortlistedColleges: [
        {
          id: 'col-1',
          collegeName: 'Indian Institute of Technology (IIT Bombay / Delhi / Madras)',
          location: 'Mumbai / New Delhi / Chennai',
          targetDegree: 'B.Tech Computer Science & AI',
          cutoffBenchmark: 'JEE Advanced Rank < 500',
        },
        {
          id: 'col-2',
          collegeName: 'BITS Pilani (Main Campus)',
          location: 'Pilani, Rajasthan',
          targetDegree: 'B.Tech CS / MSc Mathematics Dual',
          cutoffBenchmark: 'BITSAT Score > 340 / 390',
        },
      ],
    },
    careerCompass: [
      {
        id: 'cc-1',
        role: 'AI & Machine Learning Engineer',
        cluster: 'Computer Science & Data Intelligence',
        industry: 'Information Technology & AI Labs',
        domain: 'Artificial Intelligence / Deep Learning',
        whyItFits: 'Perfect synergy with top quantitative score (99th percentile) and Python passion.',
        topEmployers: 'Google Research, OpenAI, NVIDIA, Microsoft AI, DeepMind',
        aiResilience: 'Very High (Core Creator)',
        salaryIndia: '₹18 - ₹35 LPA (Fresh Graduate)',
        salaryAbroad: '$120,000 - $160,000 / yr',
      },
      {
        id: 'cc-2',
        role: 'Robotic Systems Architect',
        cluster: 'Robotics & Mechatronics',
        industry: 'Industrial Automation & Aerospace',
        domain: 'Autonomous Systems & Hardware Integration',
        whyItFits: 'Combines exceptional 3D spatial rotation skills with hands-on Arduino interest.',
        topEmployers: 'Tesla, Boston Dynamics, ISRO, ABB Robotics, Intuitive Surgical',
        aiResilience: 'Very High (Physical AI)',
        salaryIndia: '₹14 - ₹28 LPA',
        salaryAbroad: '$110,000 - $150,000 / yr',
      },
      {
        id: 'cc-3',
        role: 'Quantitative Financial Analyst',
        cluster: 'Quantitative Finance & FinTech',
        industry: 'Capital Markets & Hedge Funds',
        domain: 'Algorithmic Trading & Financial Modeling',
        whyItFits: 'Applies rigorous mathematical proofs and high-velocity numerical calculations.',
        topEmployers: 'Goldman Sachs, Jane Street, Two Sigma, D.E. Shaw',
        aiResilience: 'High (Quantitative Core)',
        salaryIndia: '₹22 - ₹45 LPA',
        salaryAbroad: '$140,000 - $200,000 / yr',
      },
      {
        id: 'cc-4',
        role: 'Cybersecurity Systems Architect',
        cluster: 'Information Security',
        industry: 'Enterprise Security & Defense',
        domain: 'Cryptography & Network Security',
        whyItFits: 'Leverages structured deductive logic to identify system vulnerabilities.',
        topEmployers: 'Palo Alto Networks, CrowdStrike, Cloudflare, Defense Agencies',
        aiResilience: 'High (Security Infrastructure)',
        salaryIndia: '₹15 - ₹30 LPA',
        salaryAbroad: '$115,000 - $155,000 / yr',
      },
      {
        id: 'cc-5',
        role: 'Data Scientist & Computational Researcher',
        cluster: 'Big Data & Analytics',
        industry: 'Healthcare Tech & E-Commerce',
        domain: 'Predictive Analytics & Big Data',
        whyItFits: 'Combines abstract pattern recognition with statistical algorithms.',
        topEmployers: 'Amazon Web Services, Meta, Apple, IBM Research',
        aiResilience: 'High (Core Data Modeling)',
        salaryIndia: '₹16 - ₹32 LPA',
        salaryAbroad: '$118,000 - $158,000 / yr',
      },
      {
        id: 'cc-6',
        role: 'Embedded Software Engineer',
        cluster: 'Electronics & Computing',
        industry: 'Semiconductors & Automotive Tech',
        domain: 'Microcontroller Systems & IoT',
        whyItFits: 'Ideal fit for circuit design understanding and low-level code compilation.',
        topEmployers: 'Qualcomm, Intel, ARM, Texas Instruments, Bosch',
        aiResilience: 'High (Hardware-Software Interface)',
        salaryIndia: '₹12 - ₹24 LPA',
        salaryAbroad: '$105,000 - $145,000 / yr',
      },
    ],
    roadmap: {
      nowPhase: {
        title: 'NOW (Class 9–10)',
        subtitle: 'Foundational Skill Building & Academic Rigor',
        skillsToBuild: ['Advanced Python Programming', 'Calculus & Algebra Foundations', 'Speed Mathematics & Logic'],
        activitiesToJoin: ['State Robotics Championship Captain', 'National Science Olympiad (NSEP/NSEC)', 'School Chess Team'],
        habitsToDevelop: ['Daily 45-min logic problem sets', 'Structured 3-hour evening study block', 'Quarterly self-evaluation'],
        keyMilestones: ['Complete Class 10 Board Exams (>95%)', 'Finalize Class 11 Stream (PCM+CS)', 'Enroll in JEE Foundation Module'],
      },
      c11Phase: {
        title: 'CLASS 11–12',
        subtitle: 'Competitive Entrance Prep & Core Stream Mastery',
        skillsToBuild: ['JEE Advanced Physics & Math', 'Data Structures & SQL', 'Exam Pacing & Endurance'],
        activitiesToJoin: ['High School CS Innovation Lab', 'IIT Tech Fest Competitions', 'Mentorship Circles'],
        habitsToDevelop: ['Weekly JEE mock test analysis', 'Time-bound speed solving', 'Stress management & fitness'],
        keyMilestones: ['Class 11 Academic Top Rank', 'JEE Main Mock Score > 240/300', 'Class 12 Board Exams (>95%)'],
      },
      afterC12Phase: {
        title: 'AFTER CLASS 12',
        subtitle: 'Undergraduate Excellence & Global Mobility',
        skillsToBuild: ['Machine Learning Frameworks (PyTorch)', 'Open Source GitHub Contributions', 'Research Paper Writing'],
        activitiesToJoin: ['University AI Research Club', 'Global Hackathons', 'Industry Internships'],
        habitsToDevelop: ['Continuous technical reading', 'Global networking with researchers', 'Portfolio updating'],
        keyMilestones: ['Admission to B.Tech CS at Top IIT / BITS', 'AWS / TensorFlow Certification', 'Target MS in US/Europe'],
      },
      readinessSnapshot: {
        scriScore: '22 / 24',
        scriBand: 'Band 1',
        readinessLabel: 'High Readiness',
        academicCareerAlignment: 'Strongly Aligned',
      },
    },
  };
};
