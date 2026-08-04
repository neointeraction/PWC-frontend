import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

export interface NotificationState {
  notifications: Notification[];
}

export interface NotificationActions {
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export type NotificationStore = NotificationState & NotificationActions;

let notificationId = 0;

export const useNotificationStore = create<NotificationStore>()(
  subscribeWithSelector(set => ({
    notifications: [],
    addNotification: notification => {
      const id = `notif-${++notificationId}`;
      set(state => ({
        notifications: [...state.notifications, { ...notification, id }],
      }));
      const duration = notification.duration ?? 4000;
      if (duration > 0) {
        setTimeout(() => {
          set(state => ({
            notifications: state.notifications.filter(n => n.id !== id),
          }));
        }, duration);
      }
    },
    removeNotification: id =>
      set(state => ({
        notifications: state.notifications.filter(n => n.id !== id),
      })),
    clearAll: () => set({ notifications: [] }),
  }))
);
