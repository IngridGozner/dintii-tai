import { Container } from '@/components/molecules/Container';
import EditableTablePatientAdd from '../../../../components/components/Tables/EditableTablePatientAdd';
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
        <EditableTablePatientAdd data={patients} formAction={addPatient} />
      </GridContainer>
    </Container>
  );
}
