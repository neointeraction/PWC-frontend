import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  RiDashboardLine,
  RiTeamLine,
  RiBookOpenLine,
  RiSettings4Line,
  RiFolderLine,
  RiUserHeartLine,
  RiArrowLeftSLine,
  RiFileChartLine,
  RiCalendarEventLine,
} from 'react-icons/ri';
import { useSidebarStore, useAuthStore } from '@/store';
import { ROUTES } from '@/constants';
import logoImg from '@/assets/logo.png';
import {
  SidebarWrapper,
  SidebarLogo,
  LogoImage,
  SidebarNav,
  NavSection,
  NavSectionLabel,
  NavItem,
  NavLabel,
  SidebarFooter,
  CollapseButton,
  TooltipPill,
} from './Sidebar.styles';

export const Sidebar: React.FC = () => {
  const { isCollapsed, toggleCollapse } = useSidebarStore();
  const { role } = useAuthStore();
  const { pathname } = useLocation();

  const isSuperAdmin = role === 'super_admin';
  const isCounselor = role === 'counselor';

  const superAdminNavItems = [
    {
      label: 'Dashboard',
      href: ROUTES.DASHBOARD,
      icon: <RiDashboardLine size={18} />,
    },
    {
      label: 'Tenant Management',
      href: ROUTES.TENANT_MANAGEMENT,
      icon: <RiTeamLine size={18} />,
    },
    {
      label: 'Career Library',
      href: ROUTES.CAREER_LIBRARY,
      icon: <RiBookOpenLine size={18} />,
    },
    {
      label: 'Settings',
      href: ROUTES.SETTINGS,
      icon: <RiSettings4Line size={18} />,
    },
  ];

  const adminNavItems = [
    {
      label: 'Dashboard',
      href: ROUTES.DASHBOARD,
      icon: <RiDashboardLine size={18} />,
    },
    {
      label: 'Counselors List',
      href: ROUTES.COUNSELORS,
      icon: <RiUserHeartLine size={18} />,
    },
    {
      label: 'Projects',
      href: ROUTES.PROJECTS,
      icon: <RiFolderLine size={18} />,
    },
    {
      label: 'Career Library',
      href: ROUTES.CAREER_LIBRARY,
      icon: <RiBookOpenLine size={18} />,
    },
    {
      label: 'Report',
      href: ROUTES.REPORTS,
      icon: <RiFileChartLine size={18} />,
    },
    {
      label: 'Settings',
      href: ROUTES.SETTINGS,
      icon: <RiSettings4Line size={18} />,
    },
  ];

  const counselorNavItems = [
    {
      label: 'Upcoming Sessions',
      href: ROUTES.UPCOMING_SESSIONS,
      icon: <RiCalendarEventLine size={18} />,
    },
    {
      label: 'Career Library',
      href: ROUTES.CAREER_LIBRARY,
      icon: <RiBookOpenLine size={18} />,
    },
    {
      label: 'Settings',
      href: ROUTES.SETTINGS,
      icon: <RiSettings4Line size={18} />,
    },
  ];

  const navItems = isSuperAdmin ? superAdminNavItems : isCounselor ? counselorNavItems : adminNavItems;

  const isActive = (href: string) => {
    if (href === ROUTES.DASHBOARD) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <SidebarWrapper $collapsed={isCollapsed} aria-label="Navigation sidebar">
      <SidebarLogo $collapsed={isCollapsed}>
        <LogoImage src={logoImg} alt="Logo" $collapsed={isCollapsed} />
      </SidebarLogo>

      <SidebarNav $collapsed={isCollapsed}>
        <NavSection>
          <NavSectionLabel $collapsed={isCollapsed}>
            {isSuperAdmin ? 'Super Admin Menu' : isCounselor ? 'Counselor Menu' : 'Admin Menu'}
          </NavSectionLabel>
          {navItems.map(item => (
            <NavItem
              key={item.href}
              to={item.href}
              $active={isActive(item.href)}
              $collapsed={isCollapsed}
            >
              {item.icon}
              <NavLabel $collapsed={isCollapsed}>{item.label}</NavLabel>
              {isCollapsed && <TooltipPill>{item.label}</TooltipPill>}
            </NavItem>
          ))}
        </NavSection>
      </SidebarNav>

      <SidebarFooter $collapsed={isCollapsed}>
        <CollapseButton
          $collapsed={isCollapsed}
          onClick={toggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <RiArrowLeftSLine size={18} />
          <NavLabel $collapsed={isCollapsed}>Collapse</NavLabel>
          {isCollapsed && <TooltipPill>Expand Sidebar</TooltipPill>}
        </CollapseButton>
      </SidebarFooter>
    </SidebarWrapper>
  );
};
