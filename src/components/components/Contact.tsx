import { SITEINFO_QUERYResult } from "@/sanity/types";
import { Headline } from "../atoms/Headline";
import { useTranslations } from "next-intl";
import { Container } from "../molecules/Container";
import { GridContainer } from "../molecules/GridContainer";
import { Link } from "../atoms/Link";


export default function Contact(props: NonNullable<SITEINFO_QUERYResult>) {
    const t = useTranslations('HomePage');

    if (!props) return undefined;

    const { phone, address, email } = props;

    return (
        <Container darkBackground>
            <GridContainer>
                <div className="col-span-6 md:col-span-5 lg:col-start-2">
                    <div className="w-full lg:h-full relative inset-0 h-64">
                        <iframe className="w-full h-full relative inset-0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2732.9408388993274!2d23.60152631547727!3d46.76606257913786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490c3ab1909adb%3A0xbac915a4eca4e437!2sStrada%20Constantin%20Br%C3%A2ncu%C8%99i%2030%2C%20Cluj-Napoca%20400000!5e0!3m2!1sen!2sro!4v1615128028424!5m2!1sen!2sro" loading="lazy" />
                    </div>
                </div>
                <div className="col-span-6 lg:col-start-8 lg:col-span-4 lg:pb-16 md:col-start-6">
                    <Headline headline={t('contactUs')} anchor="contact" />
                    <div className="flex flex-col gap-y-4 md:gap-y-4 text-base md:text-2xl">
                        {phone && <Link href={`tel:${phone}`} label={phone} iconName="phone" iconClassName="lg:!text-3xl" />}
                        {email && <Link href={`mailto:${email}`} label={email} iconName="email" iconClassName="lg:!text-3xl" />}
                        {address && <Link href="https://maps.app.goo.gl/EMPERD71bPH24zmu8" label={address} iconName="fmd_good" iconClassName="lg:!text-3xl" />}
                    </div>
                </div>
            </GridContainer>
        </Container >
    );
} 