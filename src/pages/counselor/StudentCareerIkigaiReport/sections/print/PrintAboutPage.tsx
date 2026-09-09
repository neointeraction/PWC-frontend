import React from 'react';
import {
  PrintSectionTitle,
  PrintSectionSubtitle,
  PrintSectionRule,
  PrintBody,
  PrintTable,
} from '../../StudentCareerIkigaiReportPage.print.styles';
import { PrintPageChrome } from './PrintPageChrome';

const HOW_WE_LOOK_ROWS = [
  {
    area: 'Career Interest',
    measures: 'The types of activities, subjects, careers and work environments the student is naturally drawn towards.',
    notMeasures: 'Intelligence, academic performance, character, or future success.',
  },
  {
    area: 'Personality Style',
    measures: 'Typical behavioural tendencies, interaction styles and ways of approaching work and learning situations.',
    notMeasures: 'Good vs bad personality, values, morality, or personal worth.',
  },
  {
    area: 'Ability Potential',
    measures: 'Areas where the student is likely to learn faster, solve problems more effectively, and perform well with training and practice.',
    notMeasures: 'Effort, discipline, motivation, interest, or academic marks.',
  },
  {
    area: 'Thinking Capability',
    measures: 'How the student prefers to process information, learn, evaluate options and make decisions.',
    notMeasures: 'Intelligence level, right vs wrong thinking, or maturity.',
  },
];

interface PrintAboutPageProps {
  gradeClass: string;
}

export const PrintAboutPage: React.FC<PrintAboutPageProps> = ({ gradeClass }) => (
  <PrintPageChrome gradeClass={gradeClass}>
    <PrintSectionTitle>What is Career kREATE Report</PrintSectionTitle>
    <PrintSectionSubtitle>Discover · Decide · Design</PrintSectionSubtitle>
    <PrintSectionRule />

    <PrintBody>
      Career kREATE is a report that helps you make intentional decisions about your future -
      helping you find a career you love, that you&apos;re good at, and that the world is
      willing to pay for. It offers insights into the streams and career paths where you&apos;re
      likely to find greater engagement, satisfaction, and opportunities for success, based on
      how you tend to respond to different learning, work, and career-related situations.
    </PrintBody>
    <PrintBody>
      The report is NOT judging your character or personality, labelling you as good or bad,
      predicting success or failure or restricting future possibilities.
    </PrintBody>

    <PrintTable>
      <thead>
        <tr>
          <th>Assessment Area</th>
          <th>What It Measures</th>
          <th>What It Does NOT Measure</th>
        </tr>
      </thead>
      <tbody>
        {HOW_WE_LOOK_ROWS.map(row => (
          <tr key={row.area}>
            <td>{row.area}</td>
            <td>{row.measures}</td>
            <td>{row.notMeasures}</td>
          </tr>
        ))}
      </tbody>
    </PrintTable>

    <PrintSectionTitle as="h3" style={{ fontSize: '14px', marginTop: '18px' }}>
      TO THE PARENT
    </PrintSectionTitle>
    <PrintBody>
      This report is not an evaluation of your child&apos;s character, personality, or personal
      worth. It is a career-development report designed to understand how your child naturally
      approaches learning, work, decision-making, and career-related situations. Based on these
      insights, the report provides recommendations regarding educational streams, career
      pathways, and developmental priorities. We believe that most skills can be developed
      through learning, practice, and experience — the objective is not to predict success or
      failure, but to provide a career compass that helps students make more informed decisions
      about their future.
    </PrintBody>

    <PrintSectionTitle as="h3" style={{ fontSize: '14px', marginTop: '18px' }}>
      TO THE STUDENT
    </PrintSectionTitle>
    <PrintBody>
      This report is designed to help you understand yourself better from a career perspective.
      Think of it as a compass rather than a map — it points you in a direction that is likely
      to suit you, but the journey and the destination will ultimately be shaped by your
      choices, effort, learning, and experiences. We wish you the very best as you take the next
      steps in your unique career journey.
    </PrintBody>
  </PrintPageChrome>
);
