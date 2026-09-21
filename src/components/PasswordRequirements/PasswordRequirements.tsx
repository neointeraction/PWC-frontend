import React from 'react';
import styled from 'styled-components';
import { RiCheckboxCircleFill, RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { PASSWORD_RULES } from '@/utils/password';

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 12px;
  font-size: ${({ theme }) => theme.fontSize.sm};

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Item = styled.li<{ $met: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme, $met }) => ($met ? theme.colors.success : theme.colors.textSecondary)};
`;

interface PasswordRequirementsProps {
  password: string;
}

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ password }) => (
  <List aria-label="Password requirements">
    {PASSWORD_RULES.map(rule => {
      const met = password.length > 0 && rule.test(password);
      return (
        <Item key={rule.id} $met={met}>
          {met ? <RiCheckboxCircleFill size={14} /> : <RiCheckboxBlankCircleLine size={14} />}
          {rule.label}
        </Item>
      );
    })}
  </List>
);
