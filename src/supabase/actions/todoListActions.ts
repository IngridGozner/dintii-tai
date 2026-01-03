'use server';

import { TODO_LIST_DATABASE } from '@/types/GlobalTypes';
import { createClient } from '@/supabase/server';

export async function getTODOList() {
  const supabase = await createClient();

  const { data, error } = await supabase.from(TODO_LIST_DATABASE).select();

  if (error) {
    console.error('Error fetching TODO list:', error);
    return [];
  }

  return data;
}

export async function addTODOItem(formData: FormData) {
  const supabase = await createClient();

  const data = {
    todo: formData.get('todo') as string,
    done: formData.get('done') === 'true',
    comment: formData.get('comment') as string,
  };

  const { data: insertedData, error } = await supabase
    .from(TODO_LIST_DATABASE)
    .insert(data);

  if (error) {
    console.error('Error adding TODO item:', error);
    throw error;
  }

  return insertedData;
}

export async function editTODOItem(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get('id') as string;

  const data = {
    todo: formData.get('todo') as string,
    done: formData.get('done') === 'true',
    comment: formData.get('comment') as string,
  };

  const { data: updatedData, error } = await supabase
    .from(TODO_LIST_DATABASE)
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error editing TODO item:', error);
    throw error;
  }

  return updatedData;
}

export async function deleteTODOItem(id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(TODO_LIST_DATABASE)
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error deleting TODO item:', error);
    throw error;
  }

  return data;
}
