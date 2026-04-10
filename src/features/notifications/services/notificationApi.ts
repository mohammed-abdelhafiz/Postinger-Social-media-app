import api from "@/shared/lib/api";

export const getNotifications = async () => {
  const response = await api.get("/notifications");
  return response.data.data;
};

export const getUnreadCount = async () => {
  const response = await api.get("/notifications/unread-count");
  return response.data.data.count;
};

export const markAllAsRead = async () => {
  const response = await api.patch("/notifications/mark-all-read");
  return response.data;
};

export const markAsRead = async (id: string) => {
  const response = await api.patch(`/notifications/${id}/read`);
  return response.data.data;
};

export const deleteNotification = async (id: string) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};
