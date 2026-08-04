import React from 'react';
import { TabsContainer, TabButton, ActiveTabIndicator, TabBadge, ComingSoonBadge } from './Tabs.styles';

export interface TabItem<T extends string = string> {
  id: T;
  label: string;
  icon?: React.ReactNode;
  count?: number;
  disabled?: boolean;
  comingSoon?: boolean;
  comingSoonText?: string;
}

export interface TabsProps<T extends string = string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (tabId: T) => void;
  layoutId?: string;
}

export function Tabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  layoutId = 'activeTabIndicator',
}: TabsProps<T>) {
  return (
    <TabsContainer>
      {tabs.map(tab => {
        const isActive = tab.id === activeTab;
        const isDisabled = Boolean(tab.disabled || tab.comingSoon);
        return (
          <TabButton
            key={tab.id}
            $active={isActive}
            $disabled={isDisabled}
            onClick={() => {
              if (!isDisabled) {
                onChange(tab.id);
              }
            }}
            type="button"
            disabled={isDisabled}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && <TabBadge $active={isActive}>{tab.count}</TabBadge>}
            {tab.comingSoon && (
              <ComingSoonBadge>{tab.comingSoonText || 'Coming Soon'}</ComingSoonBadge>
            )}
            {isActive && !isDisabled && (
              <ActiveTabIndicator
                layoutId={layoutId}
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
            )}
          </TabButton>
        );
      })}
    </TabsContainer>
  );
}

