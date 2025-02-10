import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { useRuntimeConfig } from "#imports";
import { useI18n } from "vue-i18n";
import axios from "axios";

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    notifications: [],
    unreadNotifications: 0,
  }),

  actions: {
    async getNotifications() {
      const toast = useToast();
      const config = useRuntimeConfig();
      try {
        const { data } = await axios.get(`${config.public.apiBase}/notifications`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("elmo3lm_elmosa3d_user_token")}`,
            "Accept-language": localStorage.getItem("elmo3lm_elmosa3d_app_lang"),
            "cache-control": "no-cache",
            Accept: "application/json",
          },
        });

        this.notifications = data.data.notifications;
        this.unreadNotifications = data.data.unreadnotifications_count;
      } catch (error) {
        toast.error("Failed to fetch notifications.");
      }
    },

    async deleteNotification(notificationId: number) {
      const toast = useToast();
      const { t } = useI18n();
      const config = useRuntimeConfig();
      try {
        await axios.delete(`${config.public.apiBase}/notifications/${notificationId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("elmo3lm_elmosa3d_user_token")}`,
            "Accept-language": localStorage.getItem("elmo3lm_elmosa3d_app_lang"),
            "cache-control": "no-cache",
            Accept: "application/json",
          },
        });

        toast.success(t("MESSAGES.deleted_successfully"));
        this.getNotifications();
      } catch (error) {
        const err = error as any;
        toast.error(err.response?.data?.message || "Failed to delete notification.");
      }
    },
  },
});
