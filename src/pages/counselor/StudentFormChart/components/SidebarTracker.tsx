import React from 'react';
import { RiCheckLine } from 'react-icons/ri';
import {
  SidebarWrapper,
  OverallProgressContainer,
  ProgressHeader,
  ProgressTitle,
  ProgressValue,
  ProgressBarBg,
  ProgressBarFill,
  StepNavList,
  StepNavItem,
  StatusIconWrapper,
  StepLabelText,
} from '../StudentFormChartPage.styles';

export interface StepDefinition {
  index: number;
  label: string;
  shortLabel: string;
  completed: boolean;
  inProgress: boolean;
}

interface SidebarTrackerProps {
  steps: StepDefinition[];
  activeStep: number;
  onSelectStep: (stepIndex: number) => void;
}

export const SidebarTracker: React.FC<SidebarTrackerProps> = ({
  steps,
  activeStep,
  onSelectStep,
}) => {
  const completedCount = steps.filter(s => s.completed).length;
  const totalSteps = steps.length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  return (
    <SidebarWrapper>
      <OverallProgressContainer>
        <ProgressHeader>
          <ProgressTitle>Overall Progress</ProgressTitle>
          <ProgressValue>
            {completedCount} of {totalSteps} complete
          </ProgressValue>
        </ProgressHeader>
        <ProgressBarBg>
          <ProgressBarFill $percent={progressPercent} />
        </ProgressBarBg>
      </OverallProgressContainer>

      <StepNavList>
        {steps.map(step => {
          const isActive = step.index === activeStep;
          return (
            <StepNavItem
              key={step.index}
              $active={isActive}
              $completed={step.completed}
              onClick={() => onSelectStep(step.index)}
              type="button"
            >
              <StatusIconWrapper $completed={step.completed} $active={isActive}>
                {step.completed ? (
                  <RiCheckLine size={14} style={{ strokeWidth: 1 }} />
                ) : (
                  <span>{step.index + 1}</span>
                )}
              </StatusIconWrapper>
              <StepLabelText>{step.label}</StepLabelText>
            </StepNavItem>
          );
        })}
      </StepNavList>
    </SidebarWrapper>
  );
};
