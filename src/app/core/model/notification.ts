export interface NotificationType {
  id?: string;
  name: string;
}


export interface Notification {
  id?: string;
  notificationUserExternalId: string;
  message: string;
  seen?: boolean;
}
