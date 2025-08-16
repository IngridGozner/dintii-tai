import { notFound } from 'next/navigation';
import { createClient } from '@/supabase/server';
import { Container } from '@/components/molecules/Container';
import { GridContainer } from '@/components/molecules/GridContainer';
import { Link } from '@/components/atoms/Link';
import { Headline } from '@/components/atoms/Headline';
import Tab from '@/components/components/Tabs/Tab';
import Tabs from '@/components/components/Tabs/Tabs';
import { getDictionaryEntries } from '@/app/[lang]/layout';
import ProfileOverview from '@/components/components/ProfileOverview/ProfileOverview';
import { deletePatient } from '@/supabase/actions/patientActions';

export default async function PacientDetail({
  params,
}: Readonly<{
  params: Promise<{ id: string; lang: string }>;
}>) {
  const supabase = await createClient();
  const { id, lang } = await params;

  const { data: patient, error } = await supabase
    .from('patient')
    .select()
    .eq('id', id)
    .maybeSingle();

  if (!patient || error) return notFound();

  const dictionary = await getDictionaryEntries(lang);

  const { first_name, last_name } = patient;

  return (
    <>
      <Container>
        <GridContainer>
          <div className='col-span-6 md:col-span-12'>
            <Link
              href='/dashboard/patients'
              label={dictionary?.backToPatients}
              className='mt-3 mb-3 md:mt-0'
              iconName='arrow_back'
            />
            <Headline headline={`${first_name} ${last_name}`} />
          </div>
        </GridContainer>
      </Container>
      <Tabs>
        <Tab title={dictionary?.profile ?? ''}>
          <ProfileOverview patient={patient} deleteAction={deletePatient} />
        </Tab>
        <Tab title={dictionary?.treatmentTableTitle ?? ''}>
          <div className='h-9 bg-green-500'>Treatments</div>
        </Tab>
      </Tabs>
    </>
  );
}
