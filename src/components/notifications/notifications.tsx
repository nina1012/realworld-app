import {
  notificationsStore,
  useNotifications,
  Notification,
} from '@/stores/notifications/notifications';
import { AiOutlineCloseSquare } from 'react-icons/ai';

export const Notifications = () => {
  const { notifications, dismissNotification } =
    useNotifications();

  if (notifications.length < 1) return null;
  return (
    <section className="fixed z-1 p-4 right-0 top-4 w-1/2 max-w-[400px]">
      <div className="flex gap-4 flex-col-reverse">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-slate-400"
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
    <div className="w-full sm:w-[300px] bg-white shadow-md rounded-md">
      <div className="flex justify-between">
        <div>
          <h4>{title}</h4>
          {message && <div>{message}</div>}
        </div>
        <button onClick={() => onDismiss(id)}>
          <AiOutlineCloseSquare />
        </button>
      </div>
    </div>
  );
};
