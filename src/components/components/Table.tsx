import { TREATMENT_QUERYResult } from '@/sanity/types';
import { Container } from '../molecules/Container';
import { GridContainer } from '../molecules/GridContainer';
import { Headline } from '../atoms/Headline';
import { Fragment } from 'react';
import { DICTIONARY_QUERYResult } from '@/types/GeneralTypes';

type TableProps = {
  treatments: NonNullable<TREATMENT_QUERYResult>;
  dictionaryEntries: NonNullable<DICTIONARY_QUERYResult>;
};

export default function Table(props: TableProps) {
  const { treatments, dictionaryEntries } = props;

  const treatmentGroups = Object.values(treatments);
  const { treatmentTableTitle, pricesTableTitle, prices } = dictionaryEntries;

  if (!treatmentGroups || !treatmentGroups.length) return null;

  const cellClasses = 'p-4 text-font text-lg border-b border-font/20';
  const headClasses = `bg-background !text-xl ${cellClasses}`;

  return (
    <Container>
      <GridContainer>
        <div className='col-span-6 md:col-span-12'>
          <Headline headline={prices || ''} anchor='rates' />

          <table className='w-full text-left'>
            <colgroup>
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th className={headClasses}>{treatmentTableTitle}</th>
                <th className={headClasses}>{pricesTableTitle}</th>
              </tr>
            </thead>
            <tbody>
              {treatmentGroups.map((group, index) => {
                const { name, slug, treatments } = group;

                return (
                  <Fragment key={slug ? slug.current : name?.value || index}>
                    {name?.value && (
                      <tr>
                        <th className={headClasses} colSpan={2}>
                          {name?.value}
                        </th>
                      </tr>
                    )}
                    {treatments.map((treatmentGroups, index) => {
                      const { name, price, slug } = treatmentGroups;

                      return (
                        <tr
                          key={slug ? slug.current : index}
                          className='hover:bg-background/50'
                        >
                          <td className={cellClasses}>{name?.value}</td>
                          <td className={cellClasses}>{price}</td>
                        </tr>
                      );
                    })}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </GridContainer>
    </Container>
  );
}
