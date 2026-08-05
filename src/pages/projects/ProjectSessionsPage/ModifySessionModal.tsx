import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { RiCheckLine, RiUserAddLine, RiCloseLine, RiSearchLine } from 'react-icons/ri';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Table, Column } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { CounselorSession, ProjectStudent } from '@/types/project.types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SectionLabel = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const SlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const SlotOptionCard = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid
    ${({ theme, $isSelected }) =>
      $isSelected ? theme.colors.primary : theme.colors.border};
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.primaryLight : theme.colors.surface};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SlotTimeText = styled.span<{ $isSelected: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme, $isSelected }) =>
    $isSelected ? theme.fontWeight.bold : theme.fontWeight.medium};
  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.primary : theme.colors.text};
`;

const TickBadge = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StudentsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const AddStudentFormBox = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceHover};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const AddStudentRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const TableScrollWrapper = styled.div`
  max-height: 280px;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
`;

const ActionBtn = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.danger};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.danger};
    background-color: ${({ theme }) => theme.colors.dangerLight};
  }
`;

interface ModifySessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: CounselorSession | null;
  onSave: (sessionId: string, selectedSlotId: string, assignedStudents: ProjectStudent[]) => void;
  isSaving?: boolean;
}

export const ModifySessionModal: React.FC<ModifySessionModalProps> = ({
  isOpen,
  onClose,
  session,
  onSave,
  isSaving,
}) => {
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');
  const [students, setStudents] = useState<ProjectStudent[]>([]);
  const [studentSearch, setStudentSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  // New student inline form
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newGrade] = useState('12th');

  useEffect(() => {
    if (session) {
      const activeSlot = session.timeSlots.find(ts => ts.isSelected) || session.timeSlots[0];
      setSelectedSlotId(activeSlot?.id || '');
      setStudents([...session.assignedStudents]);
      setStudentSearch('');
      setPage(1);
    }
  }, [session]);

  const handleAddStudent = () => {
    if (!newName.trim() || !newEmail.trim()) return;
    setStudents(prev => [
      {
        name: newName.trim(),
        email: newEmail.trim(),
        mobile: newMobile.trim() || '+91 98000 00000',
        grade: newGrade,
      },
      ...prev,
    ]);
    setNewName('');
    setNewEmail('');
    setNewMobile('');
  };

  const handleRemoveStudent = (email: string) => {
    setStudents(prev => prev.filter(s => s.email !== email));
  };

  const filteredStudents = useMemo(() => {
    if (!studentSearch) return students;
    const q = studentSearch.toLowerCase();
    return students.filter(
      s =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.mobile.toLowerCase().includes(q)
    );
  }, [students, studentSearch]);

  const handleSave = () => {
    if (!session) return;
    onSave(session.id, selectedSlotId, students);
  };

  const studentColumns: Column<ProjectStudent>[] = [
    { key: 'name', header: 'Student Name' },
    { key: 'email', header: 'Email' },
    { key: 'mobile', header: 'Mobile' },
    {
      key: 'grade',
      header: 'Grade',
      render: row => <Badge variant="default">{row.grade}</Badge>,
    },
    {
      key: 'email',
      header: 'Action',
      render: row => (
        <ActionBtn onClick={() => handleRemoveStudent(row.email)} title="Remove Student">
          <RiCloseLine size={16} />
        </ActionBtn>
      ),
    },
  ];

  if (!session) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Modify Session - ${session.counselorName}`}
      subtitle={`Select preferred time slot and manage ${students.length} assigned students for ${session.counselorName}`}
      size="xl"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', width: '100%' }}>
          <Button variant="secondary" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} isLoading={isSaving}>
            Save Changes ({students.length} Students)
          </Button>
        </div>
      }
    >
      <Container>
        <div>
          <SectionLabel>Available Time Slots (Select One)</SectionLabel>
          <SlotsGrid>
            {session.timeSlots.map(slot => {
              const isSelected = slot.id === selectedSlotId;
              return (
                <SlotOptionCard
                  key={slot.id}
                  $isSelected={isSelected}
                  onClick={() => setSelectedSlotId(slot.id)}
                >
                  <SlotTimeText $isSelected={isSelected}>{slot.time}</SlotTimeText>
                  {isSelected && (
                    <TickBadge>
                      <RiCheckLine size={14} />
                    </TickBadge>
                  )}
                </SlotOptionCard>
              );
            })}
          </SlotsGrid>
        </div>

        <div>
          <StudentsHeader>
            <SectionLabel style={{ margin: 0 }}>
              Assigned Students ({students.length})
            </SectionLabel>
            <div style={{ width: '260px' }}>
              <Input
                placeholder="Search assigned students..."
                leftIcon={<RiSearchLine size={15} />}
                value={studentSearch}
                onChange={e => {
                  setStudentSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </StudentsHeader>

          <AddStudentFormBox>
            <SectionLabel style={{ fontSize: '12px', marginBottom: '8px' }}>
              Quick Add Student to Session
            </SectionLabel>
            <AddStudentRow>
              <Input
                placeholder="Student Name"
                value={newName}
                onChange={e => setNewName(e.target.value)}
              />
              <Input
                placeholder="Email Address"
                type="email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
              />
              <Input
                placeholder="Mobile Number"
                value={newMobile}
                onChange={e => setNewMobile(e.target.value)}
              />
              <Button
                size="sm"
                variant="secondary"
                leftIcon={<RiUserAddLine size={16} />}
                onClick={handleAddStudent}
              >
                Add Student
              </Button>
            </AddStudentRow>
          </AddStudentFormBox>

          <TableScrollWrapper>
            <Table
              columns={studentColumns}
              data={filteredStudents}
              keyExtractor={row => row.email}
              emptyMessage="No students found."
              pagination={{
                page,
                limit,
                total: filteredStudents.length,
                totalPages: Math.ceil(filteredStudents.length / limit) || 1,
                onPageChange: setPage,
              }}
            />
          </TableScrollWrapper>
        </div>
      </Container>
    </Modal>
  );
};
