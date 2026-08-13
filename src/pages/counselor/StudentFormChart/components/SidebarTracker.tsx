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
  SublinkContainer,
  SublinkItem,
} from '../StudentFormChartPage.styles';

export interface StepSublink {
  id: string;
  label: string;
}

export interface StepDefinition {
  index: number;
  label: string;
  shortLabel: string;
  completed: boolean;
  inProgress: boolean;
  sublinks?: StepSublink[];
}

interface SidebarTrackerProps {
  steps: StepDefinition[];
  activeStep: number;
  onSelectStep: (stepIndex: number, sublinkId?: string) => void;
  activeSublinkId?: string;
}

export const SidebarTracker: React.FC<SidebarTrackerProps> = ({
  steps,
  activeStep,
  onSelectStep,
  activeSublinkId,
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
          const hasSublinks = step.sublinks && step.sublinks.length > 0;
          return (
            <React.Fragment key={step.index}>
              <StepNavItem
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

              {isActive && hasSublinks && (
                <SublinkContainer>
                  {step.sublinks!.map(sub => {
                    const isSubActive = activeSublinkId === sub.id;
                    return (
                      <SublinkItem
                        key={sub.id}
                        $active={isSubActive}
                        type="button"
                        onClick={() => onSelectStep(step.index, sub.id)}
                      >
                        <span>{sub.label}</span>
                      </SublinkItem>
                    );
                  })}
                </SublinkContainer>
              )}
            </React.Fragment>
          );
        })}
      </StepNavList>
    </SidebarWrapper>
  );
};
