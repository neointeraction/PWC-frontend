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
  streamRequirement: string;
  gradingLevel: string;
  meaning: string;
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
              studentResponse: '1 & 2',
              parentResponse: '1',
            },
            {
              id: 'a1-2',
              code: 'A1.2',
              parameter: 'Least Liked Subject',
              studentResponse: '1 & 3',
              parentResponse: '2',
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
              parameter: 'Non-academic / free-time activity',
              studentResponse: '4',
              parentResponse: '4',
            },
            {
              id: 'a2-2',
              code: 'A2.2',
              parameter: 'First Hobby — Name & weekly hours spent',
              studentResponse: '5',
              parentResponse: 'NA',
            },
            {
              id: 'a2-3',
              code: 'A2.3',
              parameter: 'Second Hobby — Name & weekly hours spent',
              studentResponse: '5',
              parentResponse: 'NA',
            },
            {
              id: 'a2-4',
              code: 'A2.4',
              parameter: 'Most enjoyed school activity',
              studentResponse: '7',
              parentResponse: 'NA',
            },
            {
              id: 'a2-5',
              code: 'A2.5',
              parameter: 'Preferred mode of learning at school',
              studentResponse: '8',
              parentResponse: 'NA',
            },
          ],
        },
      ],
      synthesisNotes: {
        A1: '',
        A2: '',
        A3: '',
        A4: '',
        A5: '',
      },
    },
    sectionB: {
      comparisonGroups: [
        {
          id: 'sub-b1',
          title: 'B1 · Personal Strengths & Enjoyment',
          items: [
            {
              id: 'b1-1',
              code: 'B1.1',
              parameter: 'Top personal qualities / strengths — Definitely me or Clearly see this',
              studentResponse: '9',
              parentResponse: '3',
            },
            {
              id: 'b1-2',
              code: 'B1.2',
              parameter: 'Top personal qualities / strengths — Somewhat me or Sometimes',
              studentResponse: '9',
              parentResponse: '3',
            },
            {
              id: 'b1-3',
              code: 'B1.3',
              parameter: 'Special skill or talent mentioned by parent — any unique ability noticed',
              studentResponse: 'NA',
              parentResponse: '5',
            },
            {
              id: 'b1-4',
              code: 'B1.4',
              parameter: 'Consistency of interests over time — are the student\'s interests stable or frequently changing?',
              studentResponse: '6',
              parentResponse: '6',
            },
          ],
        },
        {
          id: 'sub-b2',
          title: 'B2 · Personality Type & Decision-Making',
          items: [
            {
              id: 'b2-1',
              code: 'B2.1',
              parameter: 'Perceived personality type',
              studentResponse: '11',
              parentResponse: 'NA',
            },
            {
              id: 'b2-2',
              code: 'B2.2',
              parameter: 'Primary character description by parent',
              studentResponse: 'NA',
              parentResponse: '7',
            },
            {
              id: 'b2-3',
              code: 'B2.3',
              parameter: 'How student interacts with peers & teachers',
              studentResponse: 'NA',
              parentResponse: '8',
            },
            {
              id: 'b2-4',
              code: 'B2.4',
              parameter: 'General approach to making important decisions',
              studentResponse: '12',
              parentResponse: '9',
            },
          ],
        },
        {
          id: 'sub-b3',
          title: 'B3 · Obstacles & Response to Failure',
          items: [
            {
              id: 'b3-1',
              code: 'B3.1',
              parameter: 'Main obstacles during study',
              studentResponse: '10',
              parentResponse: '11',
            },
            {
              id: 'b3-2',
              code: 'B3.2',
              parameter: 'Response to failure or negative feedback',
              studentResponse: '13',
              parentResponse: '10',
            },
          ],
        },
      ],
      synthesisNotesPre: {
        B1: '',
        B2: '',
        B3: '',
        B4: '',
        B5: '',
      },
      traitsTable: [
        { id: 't-1', no: 1, layerTrait: 'RIASEC - Conventional', traitName: 'Systematic & Disciplined', whatItMeasures: 'Preference for structured work, planning, accuracy, routines, and systematic procedures', percentage: '83.36', grade: 'Highly Preferred', gradeMeaning: 'A strong trait with natural interest, you can expertise' },
        { id: 't-2', no: 2, layerTrait: 'BIG Five - Openness', traitName: 'Intellectual Curiosity', whatItMeasures: 'Willingness to explore new ideas, experiences, perspectives, creativity, and intellectual curiosity.', percentage: '72.64', grade: 'Evident', gradeMeaning: 'This tendency is generally present and influences your behaviour in many situations' },
        { id: 't-3', no: 3, layerTrait: 'Cognitive & Decision - Learning Ability', traitName: 'Knowledge Agility', whatItMeasures: 'Ability and willingness to learn new skills, adapt quickly, and absorb new concepts efficiently', percentage: '52.82', grade: 'Emerging', gradeMeaning: 'This behaviour appears occasionally but is not yet consistently demonstrated' },
        { id: 't-4', no: 4, layerTrait: 'Aptitude - Verbal Reasoning', traitName: 'Textual Intelligence', whatItMeasures: 'Language comprehension, reading interpretation, analogy, argument analysis, and verbal logic', percentage: '47.33', grade: 'Developing Capability', gradeMeaning: 'Demonstrates moderate potential but may require additional training and exposure' },
      ],
      summaryStrip: {
        careerStyle: 'RIASEC 120',
        personalSignature: 'BIG FIVE 20',
        thinkingMode: 'COG&DEC',
      },
      redFlags: {
        riasec: 'RED FLAG if any — explained in Tie-break & Edge case Rules under RIASEC of Assessment Construct file',
        bigFive: 'RED FLAG if any — explained in Tie-break & Edge case Rules under BIG Five of Assessment Construct file',
        cogDec: 'RED FLAG if any — explained in Tie-break & Edge case Rules under Cognitive & Decision of Assessment Construct file',
        aptitude: 'RED FLAG if any — explained in Tie-break & Edge case Rules under Aptitude of Assessment Construct file',
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
          title: 'C1 · Career Preferences & Motivations',
          items: [
            {
              id: 'c1-1',
              code: 'C1.1',
              parameter: 'Specific career goal or field',
              studentResponse: '14',
              parentResponse: '12',
            },
            {
              id: 'c1-2',
              code: 'C1.2',
              parameter: 'Core reason for career interest',
              studentResponse: '15',
              parentResponse: '13',
            },
          ],
        },
        {
          id: 'sub-c2',
          title: 'C2 · Influencers & Alternative Careers',
          items: [
            {
              id: 'c2-1',
              code: 'C2.1',
              parameter: 'Biggest influencer on student\'s career choice',
              studentResponse: '16',
              parentResponse: 'NA',
            },
            {
              id: 'c2-2',
              code: 'C2.2',
              parameter: 'How well parent understands the student\'s interests',
              studentResponse: '17',
              parentResponse: 'NA',
            },
          ],
        },
        {
          id: 'sub-c3',
          title: 'C3 · Parental Stance, Constraints & Decision Dynamics',
          items: [
            {
              id: 'c3-1',
              code: 'C3.1',
              parameter: 'Is parent open to exploring alternative or unconventional careers based on assessment?',
              studentResponse: 'NA',
              parentResponse: '14',
            },
            {
              id: 'c3-2',
              code: 'C3.2',
              parameter: 'Financial constraints to be considered for future education',
              studentResponse: 'NA',
              parentResponse: '15',
            },
            {
              id: 'c3-3',
              code: 'C3.3',
              parameter: 'Openness to studying outside the city — domestic relocation',
              studentResponse: 'NA',
              parentResponse: '16',
            },
            {
              id: 'c3-4',
              code: 'C3.4',
              parameter: 'Openness to studying abroad — international',
              studentResponse: 'NA',
              parentResponse: '16',
            },
            {
              id: 'c3-5',
              code: 'C3.5',
              parameter: 'Who makes the final major decisions about the child\'s education?',
              studentResponse: 'NA',
              parentResponse: '17',
            },
            {
              id: 'c3-6',
              code: 'C3.6',
              parameter: 'Is the child actively involved in major education decisions?',
              studentResponse: 'NA',
              parentResponse: '18',
            },
            {
              id: 'c3-7',
              code: 'C3.7',
              parameter: 'Parent\'s biggest concern about the child\'s academic & career future',
              studentResponse: 'NA',
              parentResponse: '19',
            },
            {
              id: 'c3-8',
              code: 'C3.8',
              parameter: 'Any specific behavioural or academic issue the parent wants the counsellor to prioritise',
              studentResponse: 'NA',
              parentResponse: '20',
            },
          ],
        },
      ],
      synthesisNotesPre: {
        D1: '',
        D2: '',
        D3: '',
        D4: '',
        D5: '',
      },
      streamFitTable: [
        { id: 'sf-1', mainStream: 'Humanities / Arts', subStream: 'Humanities with Psychology', coreSubjects: 'Psychology, Sociology, Political Science, English', electives: 'History, Physical Education', streamRequirement: 'Pick from traits & wtgs table', gradingLevel: 'Pick from table', meaning: 'Pick from table' },
        { id: 'sf-2', mainStream: 'Humanities / Arts', subStream: 'Humanities with Fine Arts', coreSubjects: 'Fine Arts, History, English', electives: 'Sociology, Psychology', streamRequirement: 'Pick from traits & wtgs table', gradingLevel: 'Pick from table', meaning: 'Pick from table' },
        { id: 'sf-3', mainStream: 'Humanities / Arts', subStream: 'Humanities with Mass Media', coreSubjects: 'Political Science, Sociology, English', electives: 'Psychology, Multimedia', streamRequirement: 'Pick from traits & wtgs table', gradingLevel: 'Pick from table', meaning: 'Pick from table' },
      ],
      whyThisStream1: 'Above is just an indicative example of filling the boxes, picked from Traits & Weightages file.',
      synthesisNotesE: {
        E1: '',
        E2: '',
        E3: '',
        E4: '',
        E5: '',
        E6: '',
      },
      graduationTable: [
        { id: 'gr-1', cluster: 'Humanities', mainStream: 'Humanities & Social Sciences', subStream: 'BA Public Policy', specialization: 'Governance', reasoning: 'BA Public Policy is best suited to students who bring strong verbal and language skills, empathy and people skills, curiosity and openness to new ideas, warmth and cooperation, and the ability to work independently. This blend of strengths supports you in areas like Governance, where your strong verbal and language skills really makes the difference.', keyExams: 'CUET UG, Ashoka Aptitude Test, APU NET' },
        { id: 'gr-2', cluster: 'Humanities', mainStream: 'Humanities & Social Sciences', subStream: 'BA International Relations', specialization: 'Diplomacy', reasoning: 'BA International Relations is best suited to students who bring strong verbal and language skills, empathy and people skills, curiosity and openness to new ideas, warmth and cooperation, and the ability to work independently. This blend of strengths supports you in areas like Diplomacy, where your strong verbal and language skills really makes the difference.', keyExams: 'CUET UG, Ashoka Aptitude Test, Christ University Entrance Test' },
        { id: 'gr-3', cluster: 'Humanities', mainStream: 'Education & Teaching', subStream: 'Integrated B.Ed', specialization: 'BA/B.Sc B.Ed', reasoning: 'Integrated B.Ed is best suited to students who bring empathy and people skills, strong verbal and language skills, warmth and cooperation, discipline and reliability, and calmness and emotional balance. This blend of strengths supports you in areas like BA/B.Sc B.Ed, where your empathy and ability to connect with people really makes the difference.', keyExams: 'CUET UG' },
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
        { id: 'ee-1', fullName: '[Full name of the exam]', conductingBody: '[Conducting organisation]', level: '[National / State / Institute]', applicableFor: '[Degree / Programme]', subjectRequirements: '[12th]', examMonth: '[Approx]', urlLink: '[Paste the URL link]' }
      ],
      collegesTable: [
        { id: 'col-1', collegeName: '[College Name]', location: '[Location]', type: '[Board]', course: '[]', entranceExam: '[]', ranking: '[]', website: '[]' }
      ],
      careerCompassClusterTable: [
        { id: 'ccc-1', cluster: 'Pick from table', industry: 'Pick from table', domain: 'Pick from table', streamRequirement: 'Pick from table', gradingLevel: 'Pick from table', meaning: 'Pick from table' }
      ],
      careerCompassTable: [
        { id: 'cc-1', domain: 'Library & Information Science', role: 'Librarian / Information Specialist', whyItFits: 'Pick from traits & weightages table', topEmployers: 'School & University Libraries, Public Libraries (RRRLF), National Library of India, Digital Archives, NCERT, British Council', aiResilience: 'High. While digital cataloguing evolves, the role of curating knowledge, guiding readers, and managing community learning spaces requires deep human judgment and interpersonal skill.', salaryIndia: 'Rs. 3–10 LPA', salaryAbroad: '$45k–$75k' },
      ],
    },
    sectionD: {
      indicators: [
        {
          code: 'EIM',
          name: 'Engagement Integrity Measure',
          guidingQuestion: 'How consistent were your personality answers?',
          valueStatus: '% Grading',
          explanationText: 'Grading meaning.',
        },
        {
          code: 'ACI',
          name: 'Aptitude Test Coherence Index',
          guidingQuestion: 'How logically did aptitude answers progress?',
          valueStatus: '% Grading',
          explanationText: 'Grading meaning..',
        },
        {
          code: 'AAI',
          name: 'Aptitude Accuracy Indicator',
          guidingQuestion: "How many questions were marked 'Not Sure'?",
          valueStatus: '% Grading',
          explanationText: 'Grading meaning..',
        },
        {
          code: 'HRS',
          name: 'Holistic Reliability Score',
          guidingQuestion: 'Was the completion pace psychologically normal?',
          valueStatus: '% Grading',
          explanationText: 'Grading meaning.',
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
        nowSkills: 'Communication, reading comprehension, basic digital literacy, and daily mental maths practice (15 min/day to address Numerical gap), do python coding class (one technology recommendation)',
        nowActivities: 'Student council, school committees, peer tutoring, cultural events, community service.',
        nowHabits: 'Daily reading (one editorial or chapter), weekly self-reflection journaling, planner use for study scheduling',
        c11Stream: 'Humanities with Psychology',
        c11Exams: 'CUET, IIMC Entrance, Symbiosis SNAP, CLAT (if Law interest develops), TISS NET',
        c11Electives: 'Psychology or Sociology as elective within chosen stream; consider basic Economics for broader options',
        afterDegrees: 'BA Psychology, BJMC, BA Sociology / Social Work',
        afterCertifications: 'Coursera / NPTL courses in Communication, Social Psychology, or Public Speaking; MS Excel basics for career versatility',
        afterAbroad: 'IELTS prep can begin in Class 12; UK, Australia, and Canada offer strong Psychology and Social Work programs',
      },
      scriItems: [
        { code: 'S1', name: 'Confidence', description: 'Comfort discussing career topics', rating: 4 },
        { code: 'S2', name: 'Reasoned Thinking', description: 'Personal vs. borrowed reasoning', rating: 4 },
        { code: 'S3', name: 'Reduced Anxiety', description: 'Comfort with uncertainty', rating: 4 },
        { code: 'S4', name: 'Self-Awareness', description: "Own interests vs. others' expectations", rating: 3 },
        { code: 'S5', name: 'Career Curiosity', description: 'Active exploration between sessions', rating: 3 },
        { code: 'S6', name: 'Decision Ownership', description: 'Who is driving the decision', rating: 4 },
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
          title: 'D1 · Stated Counselling Objectives',
          items: [
            {
              id: 'f1-1',
              code: 'D1.1',
              parameter: 'Primary counselling objective',
              studentResponse: '18',
              parentResponse: '21',
            },
            {
              id: 'f1-2',
              code: 'D1.2',
              parameter: 'Anything specific counsellor to know before session',
              studentResponse: '19',
              parentResponse: '22',
            },
          ],
        },
      ],
      synthesisNotes: {
        H1: '',
        H2: '',
        H3: '',
        H4: '',
      },
    },
  };
};
