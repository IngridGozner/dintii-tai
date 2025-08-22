export type TreatmentType = {
  date: string | null;
  price: number | null;
  treatment: string | null;
  gdpr: boolean;
  consent: boolean;
  patientID: number;
};
