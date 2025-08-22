import { Container } from '@/components/molecules/Container';
import EditableTablePatient from './EditableTablePatients';
import {
  addPatient,
  getPatientFields,
} from '@/supabase/actions/patientActions';
import { GridContainer } from '@/components/molecules/GridContainer';

export default async function Patients() {
  const patients = await getPatientFields();

  return (
    <Container>
      <GridContainer>
        <EditableTablePatient data={patients} formAction={addPatient} />
      </GridContainer>
    </Container>
  );
}
