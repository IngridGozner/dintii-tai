import { GridContainer } from '../molecules/GridContainer';
import { FOOTER_SITEINFO_QUERYResult } from '@/sanity/types';
import { ComponentContainer } from '../molecules/ComponentContainer';
import { Link } from '../atoms/Link';
import { PortableText } from 'next-sanity';
import { components } from '@/sanity/portableTextComponents';

export function Footer(props: NonNullable<FOOTER_SITEINFO_QUERYResult>) {
    if (!props) return undefined;

    const { phone, address, email, timetable } = props;

    return (
        <footer className="bg-base-dark p-6">
            <ComponentContainer>
                <GridContainer>
                    <div className="col-span-6 flex flex-col gap-y-4 md:gap-y-4 text-base md:text-xl">
                        {phone &&
                            <Link href={`tel:${phone}`} label={phone} iconName="phone" darkBackground />
                        }
                        {address &&
                            <Link href="https://maps.app.goo.gl/EMPERD71bPH24zmu8" label={address} iconName="fmd_good" darkBackground />
                        }
                        {email &&
                            <Link href={`mailto:${email}`} label={email} iconName="email" darkBackground />
                        }
                    </div>
                    {timetable && <div className="col-span-6">
                        <PortableText value={timetable} components={components} />
                    </div>}
                </GridContainer>
            </ComponentContainer>
        </footer >
    )
}