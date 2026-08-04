import React from 'react';
import { RiCheckLine } from 'react-icons/ri';
import {
  StepperContainer,
  StepItem,
  StepCircle,
  StepInfo,
  StepLabel,
  StepDescription,
  Connector,
} from './Stepper.styles';

export interface StepConfig {
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface StepperProps {
  steps: StepConfig[];
  activeStep: number;
}

export const Stepper: React.FC<StepperProps> = ({ steps, activeStep }) => {
  const getStepState = (index: number): 'completed' | 'active' | 'upcoming' => {
    if (index < activeStep) return 'completed';
    if (index === activeStep) return 'active';
    return 'upcoming';
  };

  return (
    <StepperContainer>
      {steps.map((step, index) => {
        const state = getStepState(index);
        const isLast = index === steps.length - 1;

        return (
          <StepItem key={step.label}>
            <StepCircle $state={state}>
              {state === 'completed' ? <RiCheckLine size={16} /> : (step.icon || index + 1)}
            </StepCircle>
            <StepInfo>
              <StepLabel $active={state === 'active' || state === 'completed'}>
                {step.label}
              </StepLabel>
              {step.description && (
                <StepDescription>{step.description}</StepDescription>
              )}
            </StepInfo>
            {!isLast && <Connector $completed={index < activeStep} />}
          </StepItem>
        );
      })}
    </StepperContainer>
  );
};
