import { FOOTER_SITEINFO_QUERYResult } from "@/sanity/types";
import LineCard from "../molecules/LineCard";
import { Container } from "../molecules/Container";
import { GridContainer } from "../molecules/GridContainer";
import { useTranslations } from "next-intl";

export default function ScheduleCard(props: NonNullable<FOOTER_SITEINFO_QUERYResult>) {
    const { timetable } = props;
    const t = useTranslations('HomePage');

    if (!timetable || !timetable.value) return null;

    return (
        <Container contentClass="bg-base-dark">
            <GridContainer>
                <LineCard iconName="calendar_month" title={t('schedule')} text={timetable.value} className="col-span-6 md:col-span-12" />
            </GridContainer>
        </Container>
    );
}