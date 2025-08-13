import { notFound } from 'next/navigation';
import { createClient } from '@/supabase/server';
import { Container } from '@/components/molecules/Container';
import { GridContainer } from '@/components/molecules/GridContainer';
import { Link } from '@/components/atoms/Link';
import { Headline } from '@/components/atoms/Headline';

export default async function PacientDetail({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: patient, error } = await supabase
    .from('patient')
    .select()
    .eq('id', id)
    .maybeSingle();

  if (!patient || error) return notFound();

  return (
    <Container>
      <GridContainer>
        <div className='col-span-6 md:col-span-12'>
          <Link
            href='/dashboard/patients'
            label='Back to patients overview'
            className='mb-3'
          />
          <Headline headline={patient.first_name} />
        </div>
      </GridContainer>
    </Container>
  );
}
