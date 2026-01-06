interface NotificationItem<T extends NotificationType = NotificationType> {
  id: number;
  userId: number;
  type: T;
  message: string;
  isChecked: boolean;
  createDate: string;
  resourceType: string;
  resourceId: number;
  metadata: NotificationMetadata<T> | null;
}

interface NotificationsResponse {
  notifications: NotificationItem[];
  totalCount: number;
  unreadCount: number;
}

type NotificationRouteHandler = (notification: NotificationItem) => string | null;
