import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const SIDEBAR_WIDTH = 240;
export const SIDEBAR_COLLAPSED_WIDTH = 64;

export const TooltipPill = styled.div`
  position: absolute;
  left: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  box-shadow: ${({ theme }) => theme.colors.shadowMd};
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease, transform 0.15s ease;
  z-index: 1000;

  &::before {
    content: '';
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    border: 5px solid transparent;
    border-right-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SidebarWrapper = styled.aside<{ $collapsed: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH)}px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.sidebar};
  border-right: 1px solid ${({ theme }) => theme.colors.sidebarBorder};
  display: flex;
  flex-direction: column;
  transition: width ${({ theme }) => theme.transition.slow};
  overflow: ${({ $collapsed }) => ($collapsed ? 'visible' : 'hidden')};
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 90;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: fixed;
    left: 0;
    top: 0;
    z-index: ${({ theme }) => theme.zIndex.sticky};
    width: ${SIDEBAR_WIDTH}px;
    transform: ${({ $collapsed }) =>
      $collapsed ? `translateX(-${SIDEBAR_WIDTH}px)` : 'translateX(0)'};
  }
`;

export const SidebarLogo = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
  padding: 12px ${({ $collapsed, theme }) => ($collapsed ? '0' : theme.spacing.md)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.sidebarBorder};
  min-height: 64px;
  overflow: hidden;
`;

export const LogoImage = styled.img<{ $collapsed?: boolean }>`
  height: ${({ $collapsed }) => ($collapsed ? '32px' : '38px')};
  max-width: ${({ $collapsed }) => ($collapsed ? '32px' : '160px')};
  object-fit: contain;
  flex-shrink: 0;
`;

export const SidebarNav = styled.nav<{ $collapsed?: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md} ${({ $collapsed, theme }) => ($collapsed ? '8px' : theme.spacing.sm)};
  overflow-y: ${({ $collapsed }) => ($collapsed ? 'visible' : 'auto')};
  overflow-x: visible;
`;

export const NavSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const NavSectionLabel = styled.span<{ $collapsed: boolean }>`
  display: ${({ $collapsed }) => ($collapsed ? 'none' : 'block')};
  font-size: 10px;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0 ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  white-space: nowrap;
  overflow: hidden;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  transition: opacity ${({ theme }) => theme.transition.base};
`;

export const NavItem = styled(Link)<{ $active: boolean; $collapsed: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ $collapsed }) => ($collapsed ? '0' : '12px')};
  padding: 10px ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.sidebarTextActive : theme.colors.sidebarText};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.sidebarBgActive : 'transparent'};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.fontWeight.semibold : theme.fontWeight.normal};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transition.fast};
  white-space: nowrap;
  margin-bottom: 2px;

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.sidebarBgActive : theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.sidebarTextActive};
    text-decoration: none;

    ${TooltipPill} {
      opacity: 1;
      visibility: visible;
      transform: translateY(-50%) translateX(2px);
    }
  }

  svg {
    flex-shrink: 0;
    font-size: 18px;
  }

  ${({ $collapsed }) =>
    $collapsed &&
    css`
      justify-content: center;
      padding: 10px 0;
    `}
`;

export const NavLabel = styled.span<{ $collapsed: boolean }>`
  overflow: hidden;
  white-space: nowrap;
  display: ${({ $collapsed }) => ($collapsed ? 'none' : 'inline')};
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  width: ${({ $collapsed }) => ($collapsed ? 0 : 'auto')};
  transition:
    opacity ${({ theme }) => theme.transition.base},
    width ${({ theme }) => theme.transition.slow};
`;

export const SidebarFooter = styled.div<{ $collapsed: boolean }>`
  padding: ${({ theme }) => theme.spacing.md} ${({ $collapsed, theme }) => ($collapsed ? '8px' : theme.spacing.sm)};
  border-top: 1px solid ${({ theme }) => theme.colors.sidebarBorder};
  position: relative;
`;

export const CollapseButton = styled.button<{ $collapsed: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
  gap: ${({ $collapsed }) => ($collapsed ? '0' : '10px')};
  width: 100%;
  padding: 9px ${({ $collapsed, theme }) => ($collapsed ? '0' : theme.spacing.sm)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.base};
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.text};

    ${TooltipPill} {
      opacity: 1;
      visibility: visible;
      transform: translateY(-50%) translateX(2px);
    }
  }

  svg {
    flex-shrink: 0;
    transition: transform ${({ theme }) => theme.transition.slow};
    transform: ${({ $collapsed }) => ($collapsed ? 'rotate(180deg)' : 'none')};
  }
`;
