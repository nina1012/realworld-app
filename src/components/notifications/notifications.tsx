import {
  notificationsStore,
  useNotifications,
  Notification,
} from '@/stores/notifications/notifications';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { Button } from '../button';

export const Notifications = () => {
  const { notifications, dismissNotification } =
    useNotifications();

  if (notifications.length < 1) return null;
  return (
    <section className="fixed bottom-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] overflow-x-scroll">
      <div className="group visible pointer-events-auto relative flex w-full items-center justify-between md:flex-row space-x-2 overflow-auto rounded-md p-4 pr-6 shadow-lg transition-all gap-8 border bg-white text-black">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="grid gap-1"
          >
            <NotificationToast
              notification={notification}
              onDismiss={dismissNotification}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export type NotificationToastProps = {
  notification: Omit<Notification, 'duration'>;
  onDismiss: (id: string) => void;
};

export const NotificationToast = ({
  notification,
  onDismiss,
}: NotificationToastProps) => {
  const { id, type, title, message } = notification;
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h4 className="text-sm font-semibold [&amp;+div]:text-xs">
          {title}
        </h4>
        {message && (
          <div className="opacity-90 text-sm">
            {message}
          </div>
        )}
      </div>
      <Button
        className="inline-flex h-8"
        onClick={() => onDismiss(id)}
      >
        {/* <AiOutlineCloseSquare /> */}
        Close
      </Button>
    </div>
  );
};
