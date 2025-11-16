'use client';

import { Headline } from '@/components/atoms/Headline';
import { Container } from '@/components/molecules/Container';
import { GridContainer } from '@/components/molecules/GridContainer';
import LoginForm from '@/components/molecules/LoginForm';
import { useDictionary } from '@/components/providers/DictionaryProvider';

export default function NewUser() {
  const { addNewUser } = useDictionary();

  return (
    <Container>
      <GridContainer>
        <div className='col-span-6'>
          <Headline
            headline={addNewUser ?? 'Add new user'}
            className='mb-9 border-b-2'
          />
          <LoginForm register={true} />
        </div>
      </GridContainer>
    </Container>
  );
}
