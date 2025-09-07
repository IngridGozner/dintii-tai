import { Link } from '@/components/atoms/Link';

type ProfileFieldProps = {
  label: string;
  value?: string | null;
  link?: string;
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
        <Link label={value} href={link} />
      ) : (
        <span>{value ? value : '-'}</span>
      )}
    </p>
  );
}
