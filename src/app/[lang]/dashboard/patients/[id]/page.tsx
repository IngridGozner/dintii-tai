import { notFound } from 'next/navigation';
import { createClient } from '@/supabase/server';

export default async function PacientDetail({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const { data: patient, error } = await supabase
    .from('patient')
    .select()
    .eq('id', params.id)
    .maybeSingle();

  if (!patient || error) return notFound();

  return (
    <div>
      <h1 className='text-2xl font-semibold'>{patient.first_name}</h1>
    </div>
  );
}
