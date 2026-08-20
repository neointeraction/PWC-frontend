import React, { useState } from 'react';
import {
  RiTimeLine,
  RiUserLine,
  RiMessage2Line,
} from 'react-icons/ri';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Select } from '@/components/Select';
import { Checkbox } from '@/components/Checkbox';
import { useToast } from '@/hooks';
import {
  ModalContentWrapper,
  FormSection,
  FieldGroup,
  FieldLabel,
  CheckboxGroupContainer,
  CommentsTextarea,
  SaveButtonWrapper,
  HistorySection,
  HistoryHeadingRow,
  HistoryHeading,
  HistoryCountBadge,
  HistoryList,
  HistoryCard,
  HistoryCardHeader,
  HistoryLeftMeta,
  HistoryDateText,
  StagePill,
  ByAdminTag,
  OutcomeBadge,
  SpokenToPill,
  CommentCallout,
} from './LogCallModal.styles';

export interface CallLogItem {
  id: string;
  dateTime: string;
  stage: string;
  outcome: string;
  spokenTo?: string[];
  comments?: string;
  by: string;
}

interface LogCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetName: string;
  targetCode?: string;
  stageName?: string;
}

const CALL_OUTCOME_OPTIONS = [
  { value: 'Answered ~ Booked', label: 'Answered ~ Booked' },
  { value: 'Answered ~ will complete', label: 'Answered ~ will complete' },
  { value: 'No Answer', label: 'No Answer' },
  { value: 'Wrong Number', label: 'Wrong Number' },
  { value: 'Not Connecting', label: 'Not Connecting' },
  { value: 'Refused', label: 'Refused' },
];

const INITIAL_HISTORY: CallLogItem[] = [
  {
    id: 'log-1',
    dateTime: '17 Aug, 1005 Hr',
    stage: 'Session 1',
    outcome: 'No Answer',
    spokenTo: ['Father'],
    comments: 'Called parent on mobile, phone kept ringing without answer.',
    by: 'ADMIN',
  },
  {
    id: 'log-2',
    dateTime: '15 Aug, 1620 Hr',
    stage: 'Session 1',
    outcome: 'Not Connecting',
    comments: 'Number not reachable. Scheduled retry for next day.',
    by: 'ADMIN',
  },
  {
    id: 'log-3',
    dateTime: '12 Aug, 0940 Hr',
    stage: 'Session 1',
    outcome: 'Answered ~ will complete',
    spokenTo: ['Student', 'Mother'],
    comments: 'Spoke with mother and student. Confirmed they will complete the questionnaire.',
    by: 'ADMIN',
  },
];

export const LogCallModal: React.FC<LogCallModalProps> = ({
  isOpen,
  onClose,
  targetName,
  targetCode,
  stageName = 'Session 1',
}) => {
  const toast = useToast();

  const [outcome, setOutcome] = useState('Answered ~ Booked');
  const [spokenTo, setSpokenTo] = useState<{
    student: boolean;
    father: boolean;
    mother: boolean;
    counsellor: boolean;
  }>({
    student: false,
    father: false,
    mother: false,
    counsellor: false,
  });
  const [comments, setComments] = useState('');
  const [history, setHistory] = useState<CallLogItem[]>(INITIAL_HISTORY);

  const handleToggleSpokenTo = (key: keyof typeof spokenTo) => {
    setSpokenTo(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveLog = () => {
    const spokenList: string[] = [];
    if (spokenTo.student) spokenList.push('Student');
    if (spokenTo.father) spokenList.push('Father');
    if (spokenTo.mother) spokenList.push('Mother');
    if (spokenTo.counsellor) spokenList.push('Counsellor');

    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    })}, ${now.getHours().toString().padStart(2, '0')}${now
      .getMinutes()
      .toString()
      .padStart(2, '0')} Hr`;

    const newLogItem: CallLogItem = {
      id: `log-${Date.now()}`,
      dateTime: formattedDate,
      stage: stageName,
      outcome,
      spokenTo: spokenList.length > 0 ? spokenList : undefined,
      comments: comments.trim() || undefined,
      by: 'ADMIN',
    };

    setHistory(prev => [newLogItem, ...prev]);
    toast.success('Call Logged', `Recorded follow-up log for ${targetName}.`);

    // Reset fields
    setComments('');
    setSpokenTo({ student: false, father: false, mother: false, counsellor: false });
  };

  const modalTitle = targetName
    ? targetCode
      ? `Log a Call — ${targetName} (${targetCode})`
      : `Log a Call — ${targetName}`
    : 'Log a Call';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      size="lg"
    >
      <ModalContentWrapper>
        <FormSection>
          {/* Call Outcome Select */}
          <Select
            label="Call Outcome"
            value={outcome}
            onChange={e => setOutcome(e.target.value)}
            options={CALL_OUTCOME_OPTIONS}
          />

          {/* Spoken To Checkboxes */}
          <FieldGroup>
            <FieldLabel>Spoken To</FieldLabel>
            <CheckboxGroupContainer>
              <Checkbox
                label="Student"
                checked={spokenTo.student}
                onChange={() => handleToggleSpokenTo('student')}
              />
              <Checkbox
                label="Father"
                checked={spokenTo.father}
                onChange={() => handleToggleSpokenTo('father')}
              />
              <Checkbox
                label="Mother"
                checked={spokenTo.mother}
                onChange={() => handleToggleSpokenTo('mother')}
              />
              <Checkbox
                label="Counsellor"
                checked={spokenTo.counsellor}
                onChange={() => handleToggleSpokenTo('counsellor')}
              />
            </CheckboxGroupContainer>
          </FieldGroup>

          {/* Comments */}
          <FieldGroup>
            <FieldLabel>Comments</FieldLabel>
            <CommentsTextarea
              placeholder="e.g. Spoke to student, got the time, then spoke to counsellor, then informed both again, then updated in portal."
              value={comments}
              onChange={e => setComments(e.target.value)}
            />
          </FieldGroup>

          <SaveButtonWrapper>
            <Button variant="primary" onClick={handleSaveLog}>
              Save Log
            </Button>
          </SaveButtonWrapper>
        </FormSection>

        {/* Call Log History */}
        <HistorySection>
          <HistoryHeadingRow>
            <HistoryHeading>
              Call Log History
              <HistoryCountBadge>{history.length}</HistoryCountBadge>
            </HistoryHeading>
          </HistoryHeadingRow>

          <HistoryList>
            {history.map(item => (
              <HistoryCard key={item.id}>
                <HistoryCardHeader>
                  <HistoryLeftMeta>
                    <RiTimeLine size={14} style={{ color: '#64748B' }} />
                    <HistoryDateText>{item.dateTime}</HistoryDateText>
                    <StagePill>{item.stage}</StagePill>
                    <ByAdminTag>• BY: {item.by}</ByAdminTag>
                  </HistoryLeftMeta>

                  <OutcomeBadge $outcome={item.outcome}>
                    {item.outcome}
                  </OutcomeBadge>
                </HistoryCardHeader>

                {item.spokenTo && item.spokenTo.length > 0 && (
                  <SpokenToPill>
                    <RiUserLine size={13} style={{ color: '#64748B' }} />
                    <span>
                      Spoken To: <strong>{item.spokenTo.join(', ')}</strong>
                    </span>
                  </SpokenToPill>
                )}

                {item.comments && (
                  <CommentCallout>
                    <RiMessage2Line size={14} />
                    <span>{item.comments}</span>
                  </CommentCallout>
                )}
              </HistoryCard>
            ))}
          </HistoryList>
        </HistorySection>
      </ModalContentWrapper>
    </Modal>
  );
};

export default LogCallModal;
