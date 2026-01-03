'use client';

import { PATIENTS_PATH } from '@/types/GlobalTypes';
import { Link } from '../../atoms/Link';
import { Container } from '../../molecules/Container';
import { GridContainer } from '../../molecules/GridContainer';
import { Headline } from '../../atoms/Headline';
import ProfileOverview, {
  ProfileOverviewProps,
} from '../ProfileOverview/ProfileOverview';
import Tabs from '../Tabs/Tabs';
import Tab from '../Tabs/Tab';
import { useDictionary } from '../../providers/DictionaryProvider';
import TreatmentsOverview, {
  TreatmentsOverviewProps,
} from '../Wrappers/TreatmentsOverview';
import { PatientCategory } from '@/types/GeneralTypes';

type PatientClientWrapperProps = TreatmentsOverviewProps &
  ProfileOverviewProps & { patientCategory: PatientCategory };

export default function PatientClientWrapper({
  patientID,
  data: treatments,
  patient,
  addAction: addTreatment,
  editAction: editPatient,
  deleteAction: deletePatient,
  loadRows,
  patientCategory,
}: PatientClientWrapperProps) {
  const { backToPatients, profile, treatment } = useDictionary();
  const { first_name, last_name } = patient;

  return (
    <>
      <Container>
        <GridContainer>
          <div className='col-span-6 md:col-span-12'>
            <Link
              href={`${PATIENTS_PATH}/${patientCategory}`}
              label={backToPatients}
              className='mt-3 mb-3 md:mt-0'
              iconName='arrow_back'
            />
            <Headline headline={`${first_name} ${last_name}`} />
          </div>
        </GridContainer>
      </Container>
      <Tabs>
        <Tab title={profile ?? ''}>
          <ProfileOverview
            patient={patient}
            deleteAction={deletePatient}
            editAction={editPatient}
          />
        </Tab>
        <Tab title={treatment ?? ''}>
          <TreatmentsOverview
            data={treatments}
            addAction={addTreatment}
            loadRows={loadRows}
            patientID={patientID}
          />
        </Tab>
      </Tabs>
    </>
  );
}
