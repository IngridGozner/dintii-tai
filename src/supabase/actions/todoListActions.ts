'use server';

import {
  ROWS_TO_LOAD,
  TODO_LIST_DATABASE,
  TODOS_PATH,
} from '@/types/GlobalTypes';
import { createClient } from '@/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getTODOList(
  from = 0,
  to = ROWS_TO_LOAD - 1,
  ascending = false,
  element = 'done'
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(TODO_LIST_DATABASE)
    .select('done, todo, comment, id')
    .order(element, { ascending: ascending })
    .range(from, to);

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
    done: false,
    comment: formData.get('comment') as string,
  };

  const { data: insertedData, error } = await supabase
    .from(TODO_LIST_DATABASE)
    .insert(data)
    .select()
    .single();

  if (error) {
    console.error('Error adding TODO item:', error);
    throw error;
  }

  revalidatePath(TODOS_PATH);

  return insertedData;
}

export async function editTODOItem(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get('id') as string;

  const data = {
    todo: formData.get('todo') as string,
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

  revalidatePath(TODOS_PATH);

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

  revalidatePath(TODOS_PATH);

  return data;
}

export async function toggleTODOItemDone(id: number, done: boolean) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TODO_LIST_DATABASE)
    .update({ done: !done })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error toggling TODO item done status:', error);
    throw error;
  }

  revalidatePath(TODOS_PATH);

  return data;
}
