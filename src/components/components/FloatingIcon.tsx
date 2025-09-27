import Image from 'next/image';
import { Link } from '../atoms/Link';
import { getWhatsAppLink } from '@/helpers';

export default function FloatingIcon({ phone }: { phone: string }) {
  return (
    <Link href={getWhatsAppLink(phone)}>
      <div className='group fixed right-4 bottom-4 z-50 flex aspect-square w-14 items-center justify-center rounded-full bg-black/90 shadow-lg transition-all hover:w-16'>
        <Image
          src='/whatsapp.svg'
          height={32}
          width={32}
          alt='whatsapp icon'
          className='aspect-square transition-all group-hover:w-10'
        />
      </div>
    </Link>
  );
}
