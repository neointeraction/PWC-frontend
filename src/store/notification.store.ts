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
      // Longer messages (e.g. detailed backend error text) need more time to read
      // than the 4s default gives, so scale with length instead of clipping it.
      const textLength = notification.title.length + (notification.message?.length ?? 0);
      const duration = notification.duration ?? Math.min(10000, Math.max(4000, textLength * 60));
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
