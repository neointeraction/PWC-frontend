export interface AcademicRecord {
  id: string;
  subject: string;
  class7: string;
  class8: string;
  class9: string;
  isOther?: boolean;
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
  percentage?: string;
  grade: string;
  gradeMeaning: string;
}

export interface StreamFitItem {
  id: string;
  mainStream: string;
  subStream: string;
  coreSubjects: string;
  electives: string;
  explanation?: string;
  streamRequirement?: string;
  gradingLevel?: string;
  meaning?: string;
}

export interface GraduationItem {
  id: string;
  cluster: string;
  mainStream: string;
  subStream: string;
  specialization: string;
  reasoning: string;
  keyExams: string;
}

export interface EntranceExamItem {
  id: string;
  fullName: string;
  conductingBody: string;
  level: string;
  applicableFor: string;
  subjectRequirements: string;
  examMonth: string;
  urlLink: string;
}

export interface CollegesAfterItem {
  id: string;
  collegeName: string;
  location: string;
  type: string;
  course: string;
  entranceExam: string;
  ranking: string;
  website: string;
}

export interface CareerCompassClusterItem {
  id: string;
  cluster: string;
  industry: string;
  domain: string;
  streamRequirement: string;
  gradingLevel: string;
  meaning: string;
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
  approvalStatus?: 'Approved' | 'Pending Admin Approval';
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
    instituteName: string;
    fatherName: string;
    fatherOccupation: string;
    motherName: string;
    motherOccupation: string;
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
    redFlags: Record<string, string>;
    careerDnaNarrative: {
      dnaDefinition: string;
      careerStyleReveals: string;
      personalityStyleReveals: string;
      thinkingModeReveals: string;
      aptitudeProfileReveals: string;
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
    entranceExamsTable: EntranceExamItem[];
    collegesTable: CollegesAfterItem[];
    careerCompassClusterTable: CareerCompassClusterItem[];
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
    academicCareerAlignment:
      'Strongly Aligned' | 'Partially Aligned' | 'Misaligned' | 'Not Yet Assessed';
    synthesisNotes: Record<string, string>; // H1..H5
  };
  // Step 6: Section F
  sectionF: {
    comparisonGroups: ComparisonSubGroup[];
    synthesisNotes: Record<string, string>; // I1..I5
  };
}

export const getMockStudentFormChartData = (
  sessionId: string = 'sess-counselor-1'
): CounsellorFormChartData => {
  return {
    sessionId,
    studentId: 'stud-101',
    studentInfo: {
      studentName: 'Aarav Sharma',
      className: 'Class 10 - Section A',
      instituteName: 'Delhi Public School, R.K. Puram',
      fatherName: 'Rajesh Sharma',
      fatherOccupation: 'Senior Software Engineer, TechCorp',
      motherName: 'Sunita Sharma',
      motherOccupation: 'High School Educator, Kendriya Vidyalaya',
      academicRecords: [
        { id: 'rec-1', subject: 'English', class7: '90%', class8: '92%', class9: '91%' },
        { id: 'rec-2', subject: 'Second Language', class7: '85%', class8: '88%', class9: '87%' },
        { id: 'rec-3', subject: 'Science', class7: '95%', class8: '96%', class9: '98%' },
        { id: 'rec-4', subject: 'Mathematics', class7: '98%', class8: '99%', class9: '100%' },
        { id: 'rec-5', subject: 'Social Science', class7: '92%', class8: '90%', class9: '93%' },
        { id: 'rec-6', subject: 'Computer Science', class7: '96%', class8: '97%', class9: '99%' },
        { id: 'rec-7', subject: '', class7: '', class8: '', class9: '', isOther: true },
      ],
      academicTrend: 'Improving',
      academicTrendNotes:
        'Consistently exceptional performance in quantitative and technical subjects across Class 7 to 9.',
    },
    sectionA: {
      comparisonGroups: [
        {
          id: 'sub-a1',
          title: 'Subject Preferences & Academic Performance',
          items: [
            {
              id: 'a1-1',
              code: '1.1',
              parameter: 'Favourite Subject',
              studentResponse: 'Mathematics & Computer Science',
              parentResponse: 'Mathematics',
            },
            {
              id: 'a1-2',
              code: '1.2',
              parameter: 'Least Liked Subject',
              studentResponse: 'History & Social Studies',
              parentResponse: 'Chemistry',
            },
          ],
        },
        {
          id: 'sub-a2',
          title: 'Non-Academic Activities, Hobbies & Learning Mode',
          items: [
            {
              id: 'a2-1',
              code: '2.1',
              parameter: 'Non-academic / free-time activity',
              studentResponse: 'Robotics tinkering & software coding',
              parentResponse: 'Computer games & robotics hobbies',
            },
            {
              id: 'a2-2',
              code: '2.2',
              parameter: 'First Hobby — Name & weekly hours spent',
              studentResponse: 'Building Arduino circuits (5 hrs/week)',
              parentResponse: 'NA',
            },
            {
              id: 'a2-3',
              code: '2.3',
              parameter: 'Second Hobby — Name & weekly hours spent',
              studentResponse: 'Tech blogging & competitive chess (3 hrs/week)',
              parentResponse: 'NA',
            },
            {
              id: 'a2-4',
              code: '2.4',
              parameter: 'Most enjoyed school activity',
              studentResponse: 'Science Exhibition & Coding Club competitions',
              parentResponse: 'NA',
            },
            {
              id: 'a2-5',
              code: '2.5',
              parameter: 'Preferred mode of learning at school',
              studentResponse: 'Interactive lab experiments, hands-on projects & visual demonstrations',
              parentResponse: 'NA',
            },
          ],
        },
      ],
      synthesisNotes: {
        A1: 'High alignment on Mathematics; student also shows self-driven interest in Computer Science.',
        A2: 'Robotics and electronics tinkering indicate strong Investigative and Realistic RIASEC traits.',
        A3: 'Hands-on experiential learning preference matches engineering and technical study paths.',
        A4: 'Active involvement in Science Club and Coding competitions shows focused engagement.',
        A5: 'Academic trend remains consistently strong in STEM subjects across Class 7, 8, and 9.',
      },
    },
    sectionB: {
      comparisonGroups: [
        {
          id: 'sub-b1',
          title: 'Personal Strengths & Enjoyment',
          items: [
            {
              id: 'b1-1',
              code: '1.1',
              parameter: 'Top personal qualities / strengths — Definitely me or Clearly see this',
              studentResponse: 'Analytical Thinking, Problem Solving & Logical Reasoning',
              parentResponse: 'High focus, dedication to projects & strong mathematical aptitude',
            },
            {
              id: 'b1-2',
              code: '1.2',
              parameter: 'Top personal qualities / strengths — Somewhat me or Sometimes',
              studentResponse: 'Public Speaking, Group Leadership & Creative Writing',
              parentResponse: 'Expressing ideas in team settings & organizing small events',
            },
            {
              id: 'b1-3',
              code: '1.3',
              parameter: 'Special skill or talent mentioned by parent — any unique ability noticed',
              studentResponse: 'NA',
              parentResponse: 'Quickly grasping complex algorithms, troubleshooting electronics & video editing',
            },
            {
              id: 'b1-4',
              code: '1.4',
              parameter:
                "Consistency of interests over time — are the student's interests stable or frequently changing?",
              studentResponse: 'Consistently passionate about computer tech and robotics for over 3 years',
              parentResponse: 'Very stable focus on technology and science subjects since Class 7',
            },
          ],
        },
        {
          id: 'sub-b2',
          title: 'Personality Type & Decision-Making',
          items: [
            {
              id: 'b2-1',
              code: '2.1',
              parameter: 'Perceived personality type',
              studentResponse: 'Introverted-Analytical (Thoughtful, reflective & detail-oriented)',
              parentResponse: 'NA',
            },
            {
              id: 'b2-2',
              code: '2.2',
              parameter: 'Primary character description by parent',
              studentResponse: 'NA',
              parentResponse: 'Calm, patient, observant, and highly disciplined with daily routines',
            },
            {
              id: 'b2-3',
              code: '2.3',
              parameter: 'How student interacts with peers & teachers',
              studentResponse: 'NA',
              parentResponse: 'Respectful with teachers; prefers small, close-knit friend groups for deep discussions',
            },
            {
              id: 'b2-4',
              code: '2.4',
              parameter: 'General approach to making important decisions',
              studentResponse: 'Evaluates facts, weighs pros/cons methodically, and seeks guidance before concluding',
              parentResponse: 'Consultative and rational — discusses options with family and teachers before deciding',
            },
          ],
        },
        {
          id: 'sub-b3',
          title: 'Obstacles & Response to Failure',
          items: [
            {
              id: 'b3-1',
              code: '3.1',
              parameter: 'Main obstacles during study',
              studentResponse: 'Occasional screen time distraction (tech forums) & exam time pressure',
              parentResponse: 'Overthinking during complex exam problems & occasional exam anxiety',
            },
            {
              id: 'b3-2',
              code: '3.2',
              parameter: 'Response to failure or negative feedback',
              studentResponse: 'Reflects quietly, analyzes mistakes logically, and attempts the problem again with improved approach',
              parentResponse: 'Takes constructive feedback seriously and puts in dedicated effort to rectify gaps',
            },
          ],
        },
      ],
      synthesisNotesPre: {
        B1: 'Strong agreement between student self-rating and parent observations regarding high analytical capability.',
        B2: 'Both student self-image and parent description confirm an introverted, methodical, and observant personality profile.',
        B3: 'Decision-making approach is consultative and evidence-based, allowing for constructive counselling discussions.',
        B4: 'High resilience with a reflective, problem-solving mindset when facing academic setbacks.',
        B5: 'No major divergence flags detected between student self-perception and parent feedback.',
      },
      traitsTable: [
        // 1. RIASEC (6 traits)
        {
          id: 't-1',
          no: 1,
          layerTrait: 'RIASEC - Conventional',
          traitName: 'Systematic & Disciplined',
          whatItMeasures:
            'Preference for structured work, planning, accuracy, routines, and systematic procedures',
          grade: 'Highly Preferred',
          gradeMeaning: 'A strong trait with natural interest, you can expertise',
        },
        {
          id: 't-2',
          no: 2,
          layerTrait: 'RIASEC - Enterprising',
          traitName: 'Ambitious Initiator',
          whatItMeasures:
            'Preference for leadership, persuasion, initiative-taking, business activities, and influencing others.',
          grade: 'Fairly Good',
          gradeMeaning: 'Meaningful interest, above the crowd, can be developed further',
        },
        {
          id: 't-3',
          no: 3,
          layerTrait: 'RIASEC - Social',
          traitName: 'Interpersonal Mindset',
          whatItMeasures:
            'Interest in helping, teaching, guiding, supporting, and positively interacting with people.',
          grade: 'Not Decisive',
          gradeMeaning: "Not a prominent interest but it's there",
        },
        {
          id: 't-4',
          no: 4,
          layerTrait: 'RIASEC - Artistic',
          traitName: 'Creative Thinker',
          whatItMeasures:
            'Preference for creativity, imagination, self-expression, design, music, storytelling, or innovative thinking.',
          grade: 'Best Avoided',
          gradeMeaning: 'Activities associated with this trait may be less naturally appealing',
        },
        {
          id: 't-5',
          no: 5,
          layerTrait: 'RIASEC - Investigative',
          traitName: 'Analytical Explorer',
          whatItMeasures:
            'Interest in analytical thinking, research, problem solving, scientific exploration, and understanding how things work.',
          grade: 'Highly Preferred',
          gradeMeaning: 'A strong trait with natural interest, you can expertise',
        },
        {
          id: 't-6',
          no: 6,
          layerTrait: 'RIASEC - Realistic',
          traitName: 'Applied Thinker',
          whatItMeasures:
            'Preference for practical, hands-on activities involving tools, machines, building, fixing, or physical problem solving.',
          grade: 'Highly Preferred',
          gradeMeaning: 'A strong trait with natural interest, you can expertise',
        },

        // 2. BIG Five (5 traits)
        {
          id: 't-7',
          no: 7,
          layerTrait: 'BIG Five - Openness',
          traitName: 'Intellectual Curiosity',
          whatItMeasures:
            'Willingness to explore new ideas, experiences, perspectives, and creativity',
          percentage: '72.64',
          grade: 'Evident',
          gradeMeaning: 'This tendency is generally present and influences behaviour across situations',
        },
        {
          id: 't-8',
          no: 8,
          layerTrait: 'BIG Five - Conscientiousness',
          traitName: 'Methodical & Goal-Oriented',
          whatItMeasures:
            'Self-discipline, organization, persistence, and reliability in achieving goals',
          percentage: '80.12',
          grade: 'Evident',
          gradeMeaning: 'Consistent high standard of organization, diligence, and dependability',
        },
        {
          id: 't-9',
          no: 9,
          layerTrait: 'BIG Five - Extraversion',
          traitName: 'Social Energy & Expressiveness',
          whatItMeasures:
            'Enthusiasm, assertiveness, sociability, and drawing energy from group interactions',
          percentage: '55.30',
          grade: 'Moderate',
          gradeMeaning: 'Comfortable in social settings while also valuing independent focus',
        },
        {
          id: 't-10',
          no: 10,
          layerTrait: 'BIG Five - Agreeableness',
          traitName: 'Empathy & Cooperation',
          whatItMeasures:
            'Trust, compassion, kindness, and cooperative attitude toward peers and mentors',
          percentage: '76.45',
          grade: 'Evident',
          gradeMeaning: 'Demonstrates warmth, active listening, and strong relational trust',
        },
        {
          id: 't-11',
          no: 11,
          layerTrait: 'BIG Five - Emotional Stability',
          traitName: 'Composure & Resilience',
          whatItMeasures:
            'Ability to manage stress, remain calm under pressure, and navigate challenges',
          percentage: '68.90',
          grade: 'Moderate',
          gradeMeaning: 'Generally steady coping mechanisms with occasional sensitivity to pressure',
        },

        // 3. Cognitive & Decision (3 traits)
        {
          id: 't-12',
          no: 12,
          layerTrait: 'Cognitive & Decision - Learning Ability',
          traitName: 'Knowledge Agility',
          whatItMeasures:
            'Ability and willingness to learn new skills, adapt quickly, and absorb new concepts',
          percentage: '52.82',
          grade: 'Emerging',
          gradeMeaning: 'This behaviour appears occasionally but is not yet consistently demonstrated',
        },
        {
          id: 't-13',
          no: 13,
          layerTrait: 'Cognitive & Decision - Critical Thinking',
          traitName: 'Analytical Reasoning',
          whatItMeasures:
            'Evaluating arguments, identifying logical fallacies, and making data-backed conclusions',
          percentage: '71.50',
          grade: 'Strong',
          gradeMeaning: 'Demonstrates sound logical evaluation and structured problem breakdown',
        },
        {
          id: 't-14',
          no: 14,
          layerTrait: 'Cognitive & Decision - Decision Making',
          traitName: 'Strategic Decision-Making',
          whatItMeasures:
            'Balancing intuitive vs analytical choices, risk weighing, and decisive resolution',
          percentage: '66.20',
          grade: 'Competent',
          gradeMeaning: 'Takes balanced decisions with consultative and analytical inputs',
        },

        // 4. Aptitude (4 traits)
        {
          id: 't-15',
          no: 15,
          layerTrait: 'Aptitude - Verbal Reasoning',
          traitName: 'Textual Intelligence',
          whatItMeasures:
            'Language comprehension, reading interpretation, analogy, and verbal logic',
          percentage: '47.33',
          grade: 'Developing Capability',
          gradeMeaning: 'Demonstrates moderate potential but may require additional exposure',
        },
        {
          id: 't-16',
          no: 16,
          layerTrait: 'Aptitude - Numerical Reasoning',
          traitName: 'Quantitative Aptitude',
          whatItMeasures:
            'Mathematical calculations, data interpretation, arithmetic speed, and numerical logic',
          percentage: '79.40',
          grade: 'Strong Capability',
          gradeMeaning: 'High computational accuracy and swift numerical pattern recognition',
        },
        {
          id: 't-17',
          no: 17,
          layerTrait: 'Aptitude - Spatial Reasoning',
          traitName: 'Spatial Visualization',
          whatItMeasures:
            'Mental manipulation of 2D/3D shapes, pattern recognition, and geometric intuition',
          percentage: '64.80',
          grade: 'Moderate Capability',
          gradeMeaning: 'Solid geometric understanding with room for advanced visualization',
        },
        {
          id: 't-18',
          no: 18,
          layerTrait: 'Aptitude - Abstract Reasoning',
          traitName: 'Inductive Logic',
          whatItMeasures:
            'Recognizing underlying rules, sequence progression, and abstract diagrammatic problem solving',
          percentage: '73.10',
          grade: 'Strong Capability',
          gradeMeaning: 'High ability to deduce principles and solve non-verbal abstract puzzles',
        },
      ],
      summaryStrip: {
        careerStyle: 'RIASEC 120',
        personalSignature: 'BIG FIVE 20',
        thinkingMode: 'COG&DEC',
      },
      redFlags: {
        riasec:
          'RED FLAG if any — explained in Tie-break & Edge case Rules under RIASEC of Assessment Construct file',
        bigFive:
          'RED FLAG if any — explained in Tie-break & Edge case Rules under BIG Five of Assessment Construct file',
        cogDec:
          'RED FLAG if any — explained in Tie-break & Edge case Rules under Cognitive & Decision of Assessment Construct file',
        aptitude:
          'RED FLAG if any — explained in Tie-break & Edge case Rules under Aptitude of Assessment Construct file',
      },
      careerDnaNarrative: {
        dnaDefinition: '',
        careerStyleReveals: '',
        personalityStyleReveals: '',
        thinkingModeReveals: '',
        aptitudeProfileReveals: '',
      },
    },
    sectionC: {
      comparisonGroups: [
        {
          id: 'sub-c1',
          title: 'Career Preferences & Motivations',
          items: [
            {
              id: 'c1-1',
              code: '1.1',
              parameter: 'Specific career goal or field',
              studentResponse: 'Artificial Intelligence & Data Science Engineering',
              parentResponse: 'Computer Science Engineering or Information Technology',
            },
            {
              id: 'c1-2',
              code: '1.2',
              parameter: 'Core reason for career interest',
              studentResponse: 'Fascinated by building smart software systems & machine learning tools',
              parentResponse: 'High demand in IT industry, strong growth & excellent placement packages',
            },
          ],
        },
        {
          id: 'sub-c2',
          title: 'Influencers & Alternative Careers',
          items: [
            {
              id: 'c2-1',
              code: '2.1',
              parameter: "Biggest influencer on student's career choice",
              studentResponse: 'Self-driven interest through online programming projects & tech tech talks',
              parentResponse: 'NA',
            },
            {
              id: 'c2-2',
              code: '2.2',
              parameter: "How well parent understands the student's interests",
              studentResponse: 'Very well — parents actively support buying books & enrolling in online coding courses',
              parentResponse: 'NA',
            },
          ],
        },
        {
          id: 'sub-c3',
          title: 'Parental Stance, Constraints & Decision Dynamics',
          items: [
            {
              id: 'c3-1',
              code: '3.1',
              parameter:
                'Is parent open to exploring alternative or unconventional careers based on assessment?',
              studentResponse: 'NA',
              parentResponse: 'Yes, fully open as long as it offers structured growth and good future prospects',
            },
            {
              id: 'c3-2',
              code: '3.2',
              parameter: 'Financial constraints to be considered for future education',
              studentResponse: 'NA',
              parentResponse: 'Moderate — open to top private engineering universities and merit education loans',
            },
            {
              id: 'c3-3',
              code: '3.3',
              parameter: 'Openness to studying outside the city — domestic relocation',
              studentResponse: 'NA',
              parentResponse: 'Yes, fully open to top tier national institutes anywhere in India (IITs, NITs, BITS)',
            },
            {
              id: 'c3-4',
              code: '3.4',
              parameter: 'Openness to studying abroad — international',
              studentResponse: 'NA',
              parentResponse: 'Open for Postgraduate/Master\'s abroad; prefer completing Bachelor\'s degree in India',
            },
            {
              id: 'c3-5',
              code: '3.5',
              parameter: "Who makes the final major decisions about the child's education?",
              studentResponse: 'NA',
              parentResponse: 'Joint decision between child and parents with counsellor guidance',
            },
            {
              id: 'c3-6',
              code: '3.6',
              parameter: 'Is the child actively involved in major education decisions?',
              studentResponse: 'NA',
              parentResponse: 'Yes, child actively participates and voices preferences',
            },
            {
              id: 'c3-7',
              code: '3.7',
              parameter: "Parent's biggest concern about the child's academic & career future",
              studentResponse: 'NA',
              parentResponse: 'Managing time and stress effectively during competitive entrance preparation (JEE)',
            },
            {
              id: 'c3-8',
              code: '3.8',
              parameter:
                'Any specific behavioural or academic issue the parent wants the counsellor to prioritise',
              studentResponse: 'NA',
              parentResponse: 'Wants guidance on balancing board exam preparation with entrance exam practice tests',
            },
          ],
        },
      ],
      synthesisNotesPre: {
        D1: 'Student and parent goals are strongly aligned on Computer Science & AI Tech domains.',
        D2: 'Student is intrinsically motivated by coding & product creation; parent values career stability and tech growth.',
        D3: 'Strong self-driven interest with encouraging family support; no external pressure detected.',
        D4: 'Parents demonstrate high openness to assessment-guided recommendations in tech & interdisciplinary fields.',
        D5: 'No domestic location barriers for premier institutes; international master\'s planned post-graduation.',
      },
      streamFitTable: [
        {
          id: 'sf-1',
          mainStream: 'Science',
          subStream: 'PCM (Physics, Chemistry, Maths)',
          coreSubjects: 'Physics, Chemistry, Mathematics, English',
          electives:
            'Computer Science, Informatics Practices, Physical Education, Economics, Engineering Graphics',
          explanation:
            'PCM (Physics, Chemistry, Maths) is best suited to students who bring curiosity and analytical thinking, clear, logical thinking, strong number sense, discipline and reliability, and the ability to adapt and learn quickly. This blend of strengths supports you in subjects like Physics, Chemistry, Mathematics, English, where your curiosity and evidence-based thinking really makes the difference.',
        },
        {
          id: 'sf-2',
          mainStream: 'Science',
          subStream: 'PCB (Physics, Chemistry, Biology)',
          coreSubjects: 'Physics, Chemistry, Biology, English',
          electives: 'Psychology, Physical Education, Biotechnology, Mathematics',
          explanation:
            'PCB (Physics, Chemistry, Biology) is best suited to students who bring curiosity and analytical thinking, clear, logical thinking, the ability to adapt and learn quickly, discipline and reliability, and curiosity and openness to new ideas. This blend of strengths supports you in subjects like Physics, Chemistry, Biology, English, where your curiosity and evidence-based thinking really makes the difference.',
        },
      ],
      whyThisStream1:
        'Above is just an indicative example of filling the boxes, picked from Traits & Weightages file.',
      synthesisNotesE: {
        E1: '',
        E2: '',
        E3: '',
        E4: '',
        E5: '',
        E6: '',
      },
      graduationTable: [
        {
          id: 'gr-1',
          cluster: 'Humanities',
          mainStream: 'Humanities & Social Sciences',
          subStream: 'BA Public Policy',
          specialization: 'Governance',
          reasoning:
            'BA Public Policy is best suited to students who bring strong verbal and language skills, empathy and people skills, curiosity and openness to new ideas, warmth and cooperation, and the ability to work independently. This blend of strengths supports you in areas like Governance, where your strong verbal and language skills really makes the difference.',
          keyExams: 'CUET UG, Ashoka Aptitude Test, APU NET',
        },
        {
          id: 'gr-2',
          cluster: 'Humanities',
          mainStream: 'Humanities & Social Sciences',
          subStream: 'BA International Relations',
          specialization: 'Diplomacy',
          reasoning:
            'BA International Relations is best suited to students who bring strong verbal and language skills, empathy and people skills, curiosity and openness to new ideas, warmth and cooperation, and the ability to work independently. This blend of strengths supports you in areas like Diplomacy, where your strong verbal and language skills really makes the difference.',
          keyExams: 'CUET UG, Ashoka Aptitude Test, Christ University Entrance Test',
        },
        {
          id: 'gr-3',
          cluster: 'Humanities',
          mainStream: 'Education & Teaching',
          subStream: 'Integrated B.Ed',
          specialization: 'BA/B.Sc B.Ed',
          reasoning:
            'Integrated B.Ed is best suited to students who bring empathy and people skills, strong verbal and language skills, warmth and cooperation, discipline and reliability, and calmness and emotional balance. This blend of strengths supports you in areas like BA/B.Sc B.Ed, where your empathy and ability to connect with people really makes the difference.',
          keyExams: 'CUET UG',
        },
      ],
      whyThisStream2: 'Data to be pulled from the Traits & Weightages file',
      synthesisNotesF: {
        F1: '',
        F2: '',
        F3: '',
        F4: '',
        F5: '',
        F6: '',
      },
      entranceExamsTable: [
        {
          id: 'ee-1',
          fullName: '[Full name of the exam]',
          conductingBody: '[Conducting organisation]',
          level: '[National / State / Institute]',
          applicableFor: '[Degree / Programme]',
          subjectRequirements: '[12th]',
          examMonth: '[Approx]',
          urlLink: '[Paste the URL link]',
        },
      ],
      collegesTable: [
        {
          id: 'col-1',
          collegeName: '[College Name]',
          location: '[Location]',
          type: '[Board]',
          course: '[]',
          entranceExam: '[]',
          ranking: '[]',
          website: '[]',
        },
      ],
      careerCompassClusterTable: [
        {
          id: 'ccc-1',
          cluster: 'Pick from table',
          industry: 'Pick from table',
          domain: 'Pick from table',
          streamRequirement: 'Pick from table',
          gradingLevel: 'Pick from table',
          meaning: 'Pick from table',
        },
      ],
      careerCompassTable: [
        {
          id: 'cc-1',
          domain: 'Library & Information Science',
          role: 'Librarian / Information Specialist',
          whyItFits: 'Pick from traits & weightages table',
          topEmployers:
            'School & University Libraries, Public Libraries (RRRLF), National Library of India, Digital Archives, NCERT, British Council',
          aiResilience:
            'High. While digital cataloguing evolves, the role of curating knowledge, guiding readers, and managing community learning spaces requires deep human judgment and interpersonal skill.',
          salaryIndia: 'Rs. 3–10 LPA',
          salaryAbroad: '$45k–$75k',
          approvalStatus: 'Approved',
        },
      ],
    },
    sectionD: {
      indicators: [
        {
          code: 'EIM',
          name: 'Engagement Integrity Measure',
          guidingQuestion: 'How consistent were your personality answers?',
          valueStatus: '76% High reliability',
          explanationText:
            'Results are trustworthy and can be highly recommended for career recommendations',
        },
        {
          code: 'ACI',
          name: 'Aptitude Test Coherence Index',
          guidingQuestion: 'How logically did aptitude answers progress?',
          valueStatus: '82% High coherence',
          explanationText:
            'Responses show consistent logical progression across sections with steady accuracy and minimal random guesses.',
        },
        {
          code: 'AAI',
          name: 'Aptitude Accuracy Indicator',
          guidingQuestion: "How many questions were marked 'Not Sure'?",
          valueStatus: '90% High confidence',
          explanationText:
            "Minimal 'Not Sure' selections, reflecting clear decisiveness and genuine understanding of assessed concepts.",
        },
        {
          code: 'HRS',
          name: 'Holistic Reliability Score',
          guidingQuestion: 'Was the completion pace psychologically normal?',
          valueStatus: '88% Optimal completion pace',
          explanationText:
            'Pace was psychologically normal throughout all sections with adequate reflection time per question.',
        },
      ],
      synthesisNotes: {
        G1: '',
        G2: '',
        G3: '',
      },
    },
    sectionE: {
      roadmapGrid: {
        nowSkills:
          'Communication, reading comprehension, basic digital literacy, and daily mental maths practice (15 min/day to address Numerical gap), do python coding class (one technology recommendation)',
        nowActivities:
          'Student council, school committees, peer tutoring, cultural events, community service.',
        nowHabits:
          'Daily reading (one editorial or chapter), weekly self-reflection journaling, planner use for study scheduling',
        c11Stream: 'Humanities with Psychology',
        c11Exams: 'CUET, IIMC Entrance, Symbiosis SNAP, CLAT (if Law interest develops), TISS NET',
        c11Electives:
          'Psychology or Sociology as elective within chosen stream; consider basic Economics for broader options',
        afterDegrees: 'BA Psychology, BJMC, BA Sociology / Social Work',
        afterCertifications:
          'Coursera / NPTL courses in Communication, Social Psychology, or Public Speaking; MS Excel basics for career versatility',
        afterAbroad:
          'IELTS prep can begin in Class 12; UK, Australia, and Canada offer strong Psychology and Social Work programs',
      },
      scriItems: [
        {
          code: 'S1',
          name: 'Confidence',
          description: 'Comfort discussing career topics',
          rating: 4,
        },
        {
          code: 'S2',
          name: 'Reasoned Thinking',
          description: 'Personal vs. borrowed reasoning',
          rating: 4,
        },
        { code: 'S3', name: 'Reduced Anxiety', description: 'Comfort with uncertainty', rating: 4 },
        {
          code: 'S4',
          name: 'Self-Awareness',
          description: "Own interests vs. others' expectations",
          rating: 3,
        },
        {
          code: 'S5',
          name: 'Career Curiosity',
          description: 'Active exploration between sessions',
          rating: 3,
        },
        {
          code: 'S6',
          name: 'Decision Ownership',
          description: 'Who is driving the decision',
          rating: 4,
        },
      ],
      academicCareerAlignment: 'Strongly Aligned',
      synthesisNotes: {
        G1: '',
        G2: '',
        G3: '',
        G4: '',
      },
    },
    sectionF: {
      comparisonGroups: [
        {
          id: 'sub-f1',
          title: 'Stated Counselling Objectives',
          items: [
            {
              id: 'f1-1',
              code: '1.1',
              parameter: 'Primary counselling objective',
              studentResponse: 'Guidance on choosing Class 11 stream & target engineering entrance exams',
              parentResponse: 'Stream selection clarity & roadmap for competitive exams (JEE/BITS)',
            },
            {
              id: 'f1-2',
              code: '1.2',
              parameter: 'Anything specific counsellor to know before session',
              studentResponse: 'Wants to clarify career scope of AI & Data Science vs Core CS degrees',
              parentResponse: 'Wants guidance on balancing board exam preparation with entrance test practice',
            },
          ],
        },
      ],
      synthesisNotes: {
        H1: 'Clear alignment on seeking stream & entrance test roadmap.',
        H2: 'Addressing AI vs Core CS degree scope during the session.',
        H3: 'Provide structured time-management advice for JEE & Boards balance.',
        H4: 'Finalize actionable Class 11 subject combination.',
      },
    },
  };
};
