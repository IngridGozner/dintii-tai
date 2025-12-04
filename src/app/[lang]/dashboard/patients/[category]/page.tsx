import { Container } from '@/components/molecules/Container';
import {
  addPatient,
  getPatientFields,
} from '@/supabase/actions/patientActions';
import { GridContainer } from '@/components/molecules/GridContainer';
import { PatientCategory } from '@/types/GeneralTypes';
import { ROWS_TO_LOAD } from '@/types/GlobalTypes';

import EditableTablePatientAdd from '../../../../../components/components/Tables/EditableTablePatientAdd';

export default async function Patients({
  params,
}: Readonly<{
  params: Promise<{ category: PatientCategory; lang: string }>;
}>) {
  const { category } = await params;
  const patients = await getPatientFields(
    0,
    ROWS_TO_LOAD - 1,
    true,
    'first_name',
    category
  );

  return (
    <Container>
      <GridContainer>
        <EditableTablePatientAdd
          data={patients}
          formAction={addPatient}
          patientCategory={category}
          loadRows={async (params) => {
            'use server';

            return await getPatientFields(
              params.from,
              params.to,
              params.ascending,
              params.element,
              params.category
            );
          }}
        />
      </GridContainer>
    </Container>
  );
}

export const revalidate = 300;
