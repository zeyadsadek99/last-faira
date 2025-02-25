import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { useRuntimeConfig } from "#imports";
import { useI18n } from "vue-i18n";
import { useNuxtApp } from "#app";

// import axios from "axios";

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    notifications: [],
    unreadNotifications: 0,
  }),

  actions: {
    async getNotifications() {
      const toast = useToast();
      const { $axios } = useNuxtApp();
      try {
        const { data } = await $axios.get("notifications", {
          headers: {
            // Authorization: `Bearer ${cookies.get("elmo3lm_elmosa3d_user_token")}`,
            // "Accept-language": cookies.get("elmo3lm_elmosa3d_app_lang"),

            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VneXB0LWFwaS5mYWllcmEuY29tL2FwaS9sb2dpbiIsImlhdCI6MTc0MDQ3NjMzOCwiZXhwIjoxNzcyMDEyMzM4LCJuYmYiOjE3NDA0NzYzMzgsImp0aSI6IjBMQTFHeVQxNmc4SE1TdlIiLCJzdWIiOiIxNjkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.N9EjlH9UAt2bMWfDJdy19G6HsKmnccA6mZIfvuImeks`,
            "Accept-language": "ar",
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
      const { $axios } = useNuxtApp();
      try {
        await $axios.delete(
          `notifications/${notificationId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "elmo3lm_elmosa3d_user_token"
              )}`,
              "Accept-language": localStorage.getItem(
                "elmo3lm_elmosa3d_app_lang"
              ),
              "cache-control": "no-cache",
              Accept: "application/json",
            },
          }
        );

        toast.success(t("MESSAGES.deleted_successfully"));
        this.getNotifications();
      } catch (error) {
        const err = error as any;
        toast.error(
          err.response?.data?.message || "Failed to delete notification."
        );
      }
    },
  },
});
