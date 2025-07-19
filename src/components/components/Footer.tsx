import { GridContainer } from '../molecules/GridContainer';
import { SITEINFO_QUERYResult } from '@/sanity/types';
import { Container } from '../molecules/Container';
import { Link } from '../atoms/Link';
import { PortableText } from 'next-sanity';
import { components } from '@/sanity/portableTextComponents';

export function Footer(props: NonNullable<SITEINFO_QUERYResult>) {
    if (!props) return undefined;

    const { phone, address, email, timetable } = props;

    return (
        <footer>
            <Container contentClass='bg-base-dark p-10'>
                <GridContainer>
                    <div className="col-span-6 flex flex-col gap-y-4 md:gap-y-4 text-base md:text-xl">
                        {phone && <Link href={`tel:${phone}`} label={phone} iconName="phone" darkBackground />}
                        {email && <Link href={`mailto:${email}`} label={email} iconName="email" darkBackground />}
                        {address && <Link href="https://maps.app.goo.gl/EMPERD71bPH24zmu8" label={address} iconName="fmd_good" darkBackground />}
                    </div>
                    {timetable && timetable.value && <div className="col-span-6 text-white text-base md:text-xl lg:leading-8 flex lg:items-center lg:justify-center">
                        <PortableText value={timetable.value} components={components} />
                    </div>}
                </GridContainer>
            </Container>
        </footer >
    )
}