import { defineStore } from "pinia";
import { useToast } from "vue-toastification";


export const useNotificationsStore = defineStore("notifications", () => {
  // ✅ Reactive state
  const notifications = ref([]);
  const unreadNotifications = ref(0);

  // ✅ Nuxt app & utilities
  const axios = useNuxtApp().$axios;
  const toast = useToast();
  const { t } = useI18n();

  // ✅ Fetch Notifications
  async function getNotifications() {
    try {
      const { data } = await axios.get("notifications");

      notifications.value = data.data.notifications;
      unreadNotifications.value = data.data.unreadnotifications_count;
    } catch (error) {
      toast.error(t("MESSAGES.fetch_error") || "Failed to fetch notifications.");
    }
  }

  // ✅ Delete Notification
  async function deleteNotification(notificationId: string) {
    try {
      await axios.delete(`notifications/${notificationId}`);

      toast.success(t("MESSAGES.deleted_successfully"));
      await getNotifications(); // Refresh list after deletion
    } catch (error) {
      const errorMessage = (error as any).response?.data?.message || t("MESSAGES.delete_error") || "Failed to delete notification.";
      toast.error(errorMessage);
    }
  }

  return {
    notifications,
    unreadNotifications,
    getNotifications,
    deleteNotification,
  };
});
