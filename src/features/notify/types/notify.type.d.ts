interface NotificationItem {
  id: number;
  userId: number;
  type: NotificationType;
  message: string;
  isChecked: boolean;
  createDate: string;
  resourceType: string;
  resourceId: number;
  metadata: Record<string, unknown> | null;
}

interface NotificationsResponse {
  notifications: NotificationItem[];
  totalCount: number;
  unreadCount: number;
}
