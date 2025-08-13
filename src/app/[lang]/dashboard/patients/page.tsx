import { Headline } from '@/components/atoms/Headline';
import { Container } from '@/components/molecules/Container';
import { GridContainer } from '@/components/molecules/GridContainer';
import { createClient } from '@/supabase/server';
import EditableTablePatient from './EditableTablePatients';

export default async function Patients() {
  const supabase = await createClient();

  const { data: patients } = await supabase
    .from('patient')
    .select('id, first_name, last_name, phone_number');

  return (
    <>
      <Container>
        <GridContainer>
          <div className='col-span-6 md:col-span-12'>
            <Headline headline='Patients' />
            <p className='text-font/70 text-sm'>
              Manage your patients and their information.
            </p>
          </div>
        </GridContainer>
      </Container>
      <EditableTablePatient data={patients} />
    </>
  );
}
