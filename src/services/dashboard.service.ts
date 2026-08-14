import { apiClient } from './api';
import { mockInstitutionProfile, mockSubscriptionInfo } from '@/mocks';

export interface DashboardSummary {
  institutionName: string;
  subscriptionPlan: string;
  activeStudentsCount: number;
  careerPathwaysCount: number;
  sessionsTodayCount: number;
  pendingRatificationsCount: number;
  recentActivities: {
    id: string;
    title: string;
    description: string;
    time: string;
    type: 'upload' | 'credential' | 'session' | 'ratification';
  }[];
  notifications: {
    id: string;
    title: string;
    message: string;
    type: 'approval' | 'reminder' | 'alert';
    time: string;
  }[];
}

export const dashboardService = {
  // No dedicated dashboard/stats endpoint exists yet — most of this is still
  // placeholder (no activity-log or notifications API). Only career pathway
  // count is wired to something real (GET /career-library's pagination.total).
  getSummary: async (): Promise<DashboardSummary> => {
    const {
      data: {
        pagination: { total: careerPathwaysCount },
      },
    } = await apiClient.get<{ pagination: { total: number } }>('/career-library', {
      params: { pageSize: 1 },
    });

    return {
      institutionName: mockInstitutionProfile.name,
      subscriptionPlan: mockSubscriptionInfo.plan.toUpperCase(),
      activeStudentsCount: 45,
      careerPathwaysCount,
      sessionsTodayCount: 8,
      pendingRatificationsCount: 3,
      recentActivities: [
        {
          id: 'act-1',
          title: 'System Settings Updated',
          description: 'Updated institution branding and security parameters.',
          time: '10 mins ago',
          type: 'upload',
        },
        {
          id: 'act-2',
          title: 'Admin User Added',
          description: 'Invited Sarah Connor as institution administrator.',
          time: '45 mins ago',
          type: 'credential',
        },
        {
          id: 'act-3',
          title: 'Security Policy Ratified',
          description: 'Enforced mandatory two-factor authentication.',
          time: '2 hours ago',
          type: 'ratification',
        },
      ],
      notifications: [
        {
          id: 'notif-1',
          title: 'System Update',
          message: 'All administrative modules are synchronized.',
          type: 'approval',
          time: '1 hour ago',
        },
        {
          id: 'notif-2',
          title: 'Subscription Status',
          message: 'Enterprise subscription active with 100 seat allocations.',
          type: 'reminder',
          time: '2 hours ago',
        },
      ],
    };
  },
};
