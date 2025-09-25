import { Container } from '@/components/molecules/Container';
import { GridContainer } from '@/components/molecules/GridContainer';
import { Link } from '@/components/atoms/Link';
import { Headline } from '@/components/atoms/Headline';
import Tab from '@/components/components/Tabs/Tab';
import Tabs from '@/components/components/Tabs/Tabs';
import { getDictionaryEntries } from '@/app/[lang]/layout';
import ProfileOverview from '@/components/components/ProfileOverview/ProfileOverview';
import {
  deletePatient,
  editPatient,
  getPatientWithID,
} from '@/supabase/actions/patientActions';
import { PATIENTS_PATH } from '@/types/GlobalTypes';
import { getPatientFileName } from '@/supabase/actions/bucketActions';
import TreatmentsOverview from '@/components/components/TreatmentsOveriew/TreatmentsOverview';
import {
  addTreatment,
  getPatientTreatments,
} from '@/supabase/actions/treatmentActions';

export default async function PatientDetail({
  params,
}: Readonly<{
  params: Promise<{ id: string; lang: string }>;
}>) {
  const { id, lang } = await params;

  const [patient, patientFileName, dictionary, treatments] = await Promise.all([
    getPatientWithID(Number(id)),
    getPatientFileName(id || ''),
    getDictionaryEntries(lang),
    getPatientTreatments(Number(id)),
  ]);

  patient.patient_file_name = patientFileName;
  const { first_name, last_name } = patient;

  return (
    <>
      <Container>
        <GridContainer>
          <div className='col-span-6 md:col-span-12'>
            <Link
              href={PATIENTS_PATH}
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
          <ProfileOverview
            patient={patient}
            deleteAction={deletePatient}
            editAction={editPatient}
          />
        </Tab>
        <Tab title={dictionary?.treatment ?? ''}>
          <TreatmentsOverview
            data={treatments}
            addAction={addTreatment}
            patientID={Number(id)}
          />
        </Tab>
      </Tabs>
    </>
  );
}
