import React, { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { Modal } from '@/components/Modal';
import { Project } from '@/types/project.types';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import {
  CalendarLayout,
  Sidebar,
  SidebarSection,
  SidebarTitle,
  CounselorFilterList,
  CounselorFilterItem,
  CounselorColorBadge,
  CalendarMain,
  CalendarHeaderRow,
  DayName,
  MonthGrid,
  DayCell,
  DateNumber,
  SlotPillLabel,
  SlotRadioInput,
  SlotPill,
  SlotPillTime,
  CalendarControls,
  MonthTitle,
  ControlGroup,
  IconButton,
} from './ProjectSchedulesModal.styles';

interface ProjectSchedulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

// Fixed colors for counselors
const COUNSELOR_COLORS = [
  '#8B5CF6', // Violet
  '#0891B2', // Cyan
  '#16A34A', // Green
  '#D97706', // Amber
  '#DC2626', // Red
  '#2563EB', // Blue
  '#DB2777', // Pink
  '#EA580C', // Orange
  '#4F46E5', // Indigo
  '#0D9488', // Teal
];

// Base month for mock data (August 2026)
const MOCK_BASE_DATE = dayjs('2026-08-01');

const mockCounselors = [
  {
    id: 'C001',
    name: 'Emily Davis',
    slots: [
      { id: 's1', date: '2026-08-03', time: '10:00 AM' },
      { id: 's2', date: '2026-08-05', time: '2:30 PM' },
      { id: 's3', date: '2026-08-11', time: '9:00 AM' },
      { id: 's4', date: '2026-08-14', time: '11:00 AM' },
      { id: 's5', date: '2026-08-20', time: '3:00 PM' },
    ],
  },
  {
    id: 'C002',
    name: 'Michael Chen',
    slots: [
      { id: 's6', date: '2026-08-04', time: '9:30 AM' },
      { id: 's7', date: '2026-08-04', time: '1:00 PM' },
      { id: 's8', date: '2026-08-12', time: '10:00 AM' },
      { id: 's9', date: '2026-08-18', time: '4:00 PM' },
    ],
  },
  {
    id: 'C003',
    name: 'Sarah Johnson',
    slots: [
      { id: 's10', date: '2026-08-06', time: '8:00 AM' },
      { id: 's11', date: '2026-08-06', time: '11:30 AM' },
      { id: 's12', date: '2026-08-13', time: '1:00 PM' },
      { id: 's13', date: '2026-08-21', time: '9:00 AM' },
      { id: 's14', date: '2026-08-25', time: '2:00 PM' },
    ],
  },
  {
    id: 'C004',
    name: 'David Rodriguez',
    slots: [
      { id: 's15', date: '2026-08-07', time: '10:00 AM' },
      { id: 's16', date: '2026-08-10', time: '3:30 PM' },
      { id: 's17', date: '2026-08-17', time: '9:00 AM' },
      { id: 's18', date: '2026-08-24', time: '1:00 PM' },
    ],
  },
  {
    id: 'C005',
    name: 'Emma Wilson',
    slots: [
      { id: 's19', date: '2026-08-05', time: '9:00 AM' },
      { id: 's20', date: '2026-08-12', time: '2:00 PM' },
      { id: 's21', date: '2026-08-19', time: '10:30 AM' },
      { id: 's22', date: '2026-08-26', time: '3:00 PM' },
      { id: 's23', date: '2026-08-31', time: '11:00 AM' },
    ],
  },
  {
    id: 'C006',
    name: 'James Taylor',
    slots: [
      { id: 's24', date: '2026-08-06', time: '1:00 PM' },
      { id: 's25', date: '2026-08-14', time: '9:30 AM' },
      { id: 's26', date: '2026-08-20', time: '4:00 PM' },
      { id: 's27', date: '2026-08-27', time: '10:00 AM' },
    ],
  },
  {
    id: 'C007',
    name: 'Sophia Martinez',
    slots: [
      { id: 's28', date: '2026-08-03', time: '2:00 PM' },
      { id: 's29', date: '2026-08-11', time: '11:00 AM' },
      { id: 's30', date: '2026-08-18', time: '9:00 AM' },
      { id: 's31', date: '2026-08-25', time: '3:30 PM' },
      { id: 's32', date: '2026-08-28', time: '1:00 PM' },
    ],
  },
];

export const ProjectSchedulesModal: React.FC<ProjectSchedulesModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const [currentDate, setCurrentDate] = useState(MOCK_BASE_DATE);
  const [activeCounselors, setActiveCounselors] = useState<Set<string>>(
    new Set(mockCounselors.map(c => c.id))
  );
  
  // Store selected slot ID per counselor ID
  const [selectedSlots, setSelectedSlots] = useState<Record<string, string>>({});

  const toggleCounselor = (id: string) => {
    const newActive = new Set(activeCounselors);
    if (newActive.has(id)) {
      newActive.delete(id);
    } else {
      newActive.add(id);
    }
    setActiveCounselors(newActive);
  };

  const handleSlotSelect = (counselorId: string, slotId: string) => {
    setSelectedSlots(prev => ({
      ...prev,
      [counselorId]: slotId
    }));
  };

  const prevMonth = () => setCurrentDate(prev => prev.subtract(1, 'month'));
  const nextMonth = () => setCurrentDate(prev => prev.add(1, 'month'));
  const today = () => setCurrentDate(MOCK_BASE_DATE); // Use mock base as "today" for demo

  // Calendar logic
  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.startOf('month').day(); // 0 = Sunday
  
  const days = useMemo(() => {
    const calendarDays = [];
    
    // Previous month padding
    const prevMonthDays = currentDate.subtract(1, 'month').daysInMonth();
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      calendarDays.push({
        date: currentDate.subtract(1, 'month').date(prevMonthDays - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        date: currentDate.date(i),
        isCurrentMonth: true,
      });
    }

    // Next month padding (to fill the grid, e.g. 35 or 42 cells)
    const totalCells = calendarDays.length > 35 ? 42 : 35;
    let nextMonthDay = 1;
    while (calendarDays.length < totalCells) {
      calendarDays.push({
        date: currentDate.add(1, 'month').date(nextMonthDay),
        isCurrentMonth: false,
      });
      nextMonthDay++;
    }

    return calendarDays;
  }, [currentDate, daysInMonth, firstDayOfMonth]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Schedules - ${project?.name || ''}`}
      size="3xl"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>
            Schedule
          </Button>
        </>
      }
    >
      <CalendarLayout>
        <Sidebar>
          <SidebarSection>
            <SidebarTitle>Counselors</SidebarTitle>
            <CounselorFilterList>
              {mockCounselors.map((counselor, idx) => {
                const color = COUNSELOR_COLORS[idx % COUNSELOR_COLORS.length];
                return (
                  <CounselorFilterItem key={counselor.id}>
                    <Checkbox
                      checked={activeCounselors.has(counselor.id)}
                      onChange={() => toggleCounselor(counselor.id)}
                    />
                    <CounselorColorBadge $color={color} />
                    {counselor.name}
                  </CounselorFilterItem>
                );
              })}
            </CounselorFilterList>
          </SidebarSection>
        </Sidebar>

        <CalendarMain>
          <CalendarControls>
            <ControlGroup>
              <Button variant="secondary" onClick={today}>Today</Button>
              <IconButton onClick={prevMonth} aria-label="Previous Month">
                <RiArrowLeftSLine size={20} />
              </IconButton>
              <IconButton onClick={nextMonth} aria-label="Next Month">
                <RiArrowRightSLine size={20} />
              </IconButton>
            </ControlGroup>
            <MonthTitle>{currentDate.format('MMMM YYYY')}</MonthTitle>
            <ControlGroup /> {/* Placeholder for right-side balance */}
          </CalendarControls>

          <CalendarHeaderRow>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <DayName key={day}>{day}</DayName>
            ))}
          </CalendarHeaderRow>

          <MonthGrid>
            {days.map((dayObj, idx) => {
              const isToday = dayObj.date.isSame(MOCK_BASE_DATE, 'day');
              const dateString = dayObj.date.format('YYYY-MM-DD');

              return (
                <DayCell key={idx} $isCurrentMonth={dayObj.isCurrentMonth} $isToday={isToday}>
                  <DateNumber $isToday={isToday}>{dayObj.date.date()}</DateNumber>
                  
                  {/* Render slots for this date */}
                  {mockCounselors.map((counselor, cIdx) => {
                    if (!activeCounselors.has(counselor.id)) return null;
                    
                    const counselorSlotsForDay = counselor.slots.filter(s => s.date === dateString);
                    const color = COUNSELOR_COLORS[cIdx % COUNSELOR_COLORS.length];

                    return counselorSlotsForDay.map(slot => {
                      const isSelected = selectedSlots[counselor.id] === slot.id;

                      return (
                        <SlotPillLabel key={slot.id}>
                          <SlotRadioInput
                            name={counselor.id}
                            checked={isSelected}
                            onChange={() => handleSlotSelect(counselor.id, slot.id)}
                          />
                          <SlotPill $color={color} $isSelected={isSelected}>
                            <SlotPillTime>{slot.time}</SlotPillTime>
                            {counselor.name}
                          </SlotPill>
                        </SlotPillLabel>
                      );
                    });
                  })}
                </DayCell>
              );
            })}
          </MonthGrid>
        </CalendarMain>
      </CalendarLayout>
    </Modal>
  );
};
