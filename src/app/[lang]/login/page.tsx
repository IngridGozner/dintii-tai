import Dialog from '@/components/components/Dialog'
import { login } from './actions'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { sanityFetch } from '@/sanity/lib/live';
import { STAGE_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image';

export default async function LoginPage() {
    const { data: loginData } = await sanityFetch({ query: STAGE_QUERY, params: { language: 'en' } });
    const backgroundImage = loginData?.stageImage?.image;

    return (
        <>
            <Dialog
                headline='Login'
            >
                <form className='flex flex-col gap-y-7'>
                    <Input label={'Email'} element={'email'} type={'email'} />
                    <Input label={'Password'} element={'password'} type={'password'} />
                    <Button formAction={login} label='Login' className='rounded-full text-center justify-center' />
                </form>
            </Dialog >

            {backgroundImage &&
                <Image
                    src={urlFor(backgroundImage).width(3000).height(1000).url()}
                    alt={backgroundImage?.alt || ''}
                    fill
                    className="object-cover w-full h-full relative"
                />
            }
        </>
    )
}