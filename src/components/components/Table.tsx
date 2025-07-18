import { TREATMENT_QUERYResult } from "@/sanity/types";
import { Container } from "../molecules/Container";
import { GridContainer } from "../molecules/GridContainer";
import { Headline } from "../atoms/Headline";
import { Fragment } from "react";
import { useTranslations } from "next-intl";

export default function Table(props: NonNullable<TREATMENT_QUERYResult>) {
    const treatmentGroups = Object.values(props);
    const t = useTranslations('HomePage');

    if (!treatmentGroups || !treatmentGroups.length) return null;

    const cellClasses = "p-4 text-font text-lg border-b border-font/20";
    const headClasses = `bg-background !text-xl ${cellClasses}`;

    return (
        <Container>
            <GridContainer>
                <div className="col-span-6 md:col-span-12">
                    <Headline headline={t('ratesTitle')} anchor="rates" />

                    <table className="w-full text-left">
                        <colgroup><col /><col /></colgroup>
                        <thead>
                            <tr>
                                <th className={headClasses}>{t('treatmentTitle')}</th>
                                <th className={headClasses}>{t('ratesTitle')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {treatmentGroups.map((group, index) => {
                                const { name, slug, treatments } = group;

                                return (
                                    <Fragment key={slug ? slug.current : name?.value || index}>
                                        {name?.value && <tr>
                                            <th className={headClasses} colSpan={2}>{name?.value}</th>
                                        </tr>}
                                        {treatments.map((treatmentGroups, index) => {
                                            const { name, price, slug } = treatmentGroups;

                                            return <tr key={slug ? slug.current : index} className="hover:bg-background/50">
                                                <td className={cellClasses}>{name?.value}</td>
                                                <td className={cellClasses}>{price}</td>
                                            </tr>
                                        })
                                        }
                                    </Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </GridContainer>
        </Container>
    )
}