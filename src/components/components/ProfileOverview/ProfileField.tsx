import { Button } from '@/components/atoms/Button';

type ProfileFieldProps = {
  label: string;
  value?: string | null;
  link?: () => void;
};

export default function ProfileField({
  label,
  value,
  link,
}: ProfileFieldProps) {
  return (
    <p className='flex gap-x-2'>
      <span>{label}:</span>
      {link ? (
        <Button asLink label={value ? value : '-'} onClick={link} />
      ) : (
        <span>{value ? value : '-'}</span>
      )}
    </p>
  );
}
