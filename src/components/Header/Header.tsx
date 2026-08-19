import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  RiMenuLine,
  RiNotification3Line,
  RiSunLine,
  RiMoonLine,
  RiArrowDownSLine,
  RiLogoutBoxRLine,
} from 'react-icons/ri';
import { useAuthStore, useThemeStore, useSidebarStore } from '@/store';
import { Avatar } from '@/components/Avatar';
import { ROUTES } from '@/constants';
import { useToast } from '@/hooks';
import {
  HeaderWrapper,
  HeaderLeft,
  MobileMenuButton,
  HeaderRight,
  IconButton,
  NotificationBadge,
  UserSectionContainer,
  UserSection,
  UserInfo,
  UserName,
  UserRole,
  UserDropdown,
  DropdownHeader,
  DropdownUserName,
  DropdownUserEmail,
  DropdownItem,
} from './Header.styles';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { toggleMobile } = useSidebarStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    toast.info('Logged out', 'You have been successfully logged out.');
    navigate(ROUTES.LOGIN);
  };

  return (
    <HeaderWrapper>
      <HeaderLeft>
        <MobileMenuButton onClick={toggleMobile} aria-label="Toggle navigation menu">
          <RiMenuLine size={22} />
        </MobileMenuButton>
      </HeaderLeft>

      <HeaderRight>
        <IconButton
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <RiMoonLine size={20} /> : <RiSunLine size={20} />}
        </IconButton>

        <IconButton aria-label="Notifications">
          <RiNotification3Line size={20} />
          <NotificationBadge aria-hidden="true" />
        </IconButton>

        {user && (
          <UserSectionContainer ref={dropdownRef}>
            <UserSection
              aria-label="User profile menu"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              onClick={() => setIsDropdownOpen(prev => !prev)}
            >
              <Avatar name={user.name} src={user.avatar} size={32} />
              <UserInfo>
                <UserName>{user.name}</UserName>
                <UserRole>{user.role.replace('_', ' ')}</UserRole>
              </UserInfo>
              <RiArrowDownSLine
                size={18}
                style={{
                  transition: 'transform 0.2s ease',
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  color: '#94a3b8',
                }}
              />
            </UserSection>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  style={{ position: 'absolute', right: 0, top: '100%', zIndex: 100 }}
                >
                  <UserDropdown>
                    <DropdownHeader>
                      <DropdownUserName>{user.name}</DropdownUserName>
                      <DropdownUserEmail>{user.email}</DropdownUserEmail>
                    </DropdownHeader>

                    <DropdownItem $danger onClick={handleLogout}>
                      <RiLogoutBoxRLine size={18} />
                      Log out
                    </DropdownItem>
                  </UserDropdown>
                </motion.div>
              )}
            </AnimatePresence>
          </UserSectionContainer>
        )}
      </HeaderRight>
    </HeaderWrapper>
  );
};
