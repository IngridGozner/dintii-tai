import { Container } from '@/components/molecules/Container';
import {
  addPatient,
  getPatientFields,
} from '@/supabase/actions/patientActions';
import { GridContainer } from '@/components/molecules/GridContainer';
import { lazy } from 'react';

const EditableTablePatientAdd = lazy(
  () =>
    import('../../../../components/components/Tables/EditableTablePatientAdd')
);

export default async function Patients() {
  const patients = await getPatientFields();

  return (
    <Container>
      <GridContainer>
        <EditableTablePatientAdd
          data={patients}
          formAction={addPatient}
          loadRows={getPatientFields}
        />
      </GridContainer>
    </Container>
  );
}

export const revalidate = 300;
