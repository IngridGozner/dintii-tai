import { GoogleIcon } from '../atoms/GoogleIcon';

export default function NotificationMessageLine({
  iconName,
  message,
  notificationIconColor,
  textColor = 'text-white',
}: {
  iconName: string;
  message: string;
  notificationIconColor?: string;
  textColor?: string;
}) {
  return (
    <div className={notificationIconColor}>
      <p className='flex items-center justify-center gap-x-2'>
        <GoogleIcon iconName={iconName} />
        <span className={textColor}>{message}</span>
      </p>
    </div>
  );
}
