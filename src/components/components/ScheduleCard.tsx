import { SITEINFO_QUERYResult } from '@/sanity/types';
import LineCard from '../molecules/LineCard';
import { Container } from '../molecules/Container';
import { GridContainer } from '../molecules/GridContainer';
import { DICTIONARY_QUERYResult } from '@/types/GeneralTypes';

type ScheduleProps = {
  siteInfo: NonNullable<SITEINFO_QUERYResult>;
  dictionaryEntries: NonNullable<DICTIONARY_QUERYResult>;
};

export default function ScheduleCard(props: ScheduleProps) {
  const { siteInfo, dictionaryEntries } = props;
  const { timetable } = siteInfo;
  const { schedule } = dictionaryEntries;

  if (!timetable || !timetable.value) return null;

  return (
    <Container contentClass='bg-base-dark'>
      <GridContainer>
        <LineCard
          iconName='calendar_month'
          title={schedule || ''}
          text={timetable.value}
          className='col-span-6 md:col-span-12'
        />
      </GridContainer>
    </Container>
  );
}
