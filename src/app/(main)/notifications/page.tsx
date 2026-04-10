import { NotificationList } from "@/features/notifications/components/NotificationList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications | Postinger",
  description: "Stay updated with your latest interactions on Postinger.",
};

export default function NotificationsPage() {
  return (
    <div className="container max-w-2xl py-8">
      <div className="bg-background/60 backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-2xl shadow-primary/5">
        <NotificationList />
      </div>
    </div>
  );
}
