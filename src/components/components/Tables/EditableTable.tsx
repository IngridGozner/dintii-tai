'use client';

import { ReactNode, useMemo, useState } from 'react';
import { convertSnakeToCamelCase } from '@/helpers';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { GoogleIcon } from '@/components/atoms/GoogleIcon';
import { EditTreatmentForm } from '@/components/molecules/EditForm';
import { Input, InputProps } from '@/components/atoms/Input';
import { DeleteTreatmentButton } from '@/components/molecules/DeleteButton';

type EditableTableProps = {
  data: { [key: string]: string }[] | [] | null;
  excludedHeaders?: string[];
  onClickRow?: (rowData: { [key: string]: string }) => void;
  clickableCell?: {
    clickableCellHeader: string;
    clickableCellFunction: (rowData: { [key: string]: string }) => void;
  };
  tableHeader?: ReactNode;
  tableClassName?: string;
  editAction?: (formData: FormData) => Promise<void>;
  deleteAction?: (id: number) => Promise<void>;
  formFields?: InputProps[];
  formType?: 'patient' | 'treatment';
  addSearchBar?: boolean;
};

type SpecificTableProps = EditableTableProps & {
  deleteMessage?: string;
  editMessage?: string;
  emptyTableMessage: string;
};

export default function EditableTable(props: SpecificTableProps) {
  const {
    data,
    excludedHeaders,
    onClickRow,
    clickableCell,
    tableHeader,
    tableClassName,
    editAction,
    deleteAction,
    formFields,
    editMessage,
    deleteMessage,
    emptyTableMessage,
    addSearchBar = false,
  } = props;

  const t = useDictionary();
  let filledFormFields = formFields;

  const headers = data?.length
    ? excludedHeaders
      ? Object.keys(data[0]).filter((key) => !excludedHeaders.includes(key))
      : Object.keys(data[0])
    : null;

  if (editAction && formFields) {
    headers?.push(editMessage ?? 'Edit');
  }

  if (deleteAction) {
    headers?.push(deleteMessage ?? 'Delete');
  }

  const cellClasses = 'p-3 text-font text-base border-b border-font/20';
  const headClasses = `bg-background text-base ${cellClasses}`;

  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data?.filter((entry) =>
      Object.values(entry).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data]);

  return (
    <>
      {tableHeader}

      {data?.length ? (
        <div
          className={`overflow-x-auto ${tableClassName ? tableClassName : 'col-span-6 md:col-span-12'}`}
        >
          {addSearchBar && (
            <div className='relative flex items-center md:justify-end'>
              <Input
                label={t.search}
                element='searchTerm'
                value={searchTerm}
                labelClassName='!ml-9 !text-font'
                className='border-base-dark !border-2 !pl-9'
                containerClassName='mb-3 mt-4 lg:w-1/3'
                onChange={(e) => setSearchTerm(e.target.value)}
                type='search'
              >
                <GoogleIcon
                  iconName='search'
                  iconClassName='text-2xl absolute text-base-dark mr-2 left-2 top-3'
                />
              </Input>
            </div>
          )}

          {filteredData?.length === 0 ? (
            <div>{emptyTableMessage}</div>
          ) : (
            <table className='w-full text-left'>
              <colgroup>
                {headers?.map((_header, index) => (
                  <col key={index} />
                ))}
              </colgroup>
              <thead>
                <tr>
                  {headers?.map((header, index) => (
                    <th key={index} className={headClasses}>
                      {t?.[convertSnakeToCamelCase(header) as keyof typeof t]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData?.map((entry, index) => {
                  const { clickableCellHeader, clickableCellFunction } =
                    clickableCell || {};

                  return (
                    <tr
                      key={index}
                      className={`hover:bg-background/50 ${onClickRow ? 'cursor-pointer' : ''}`}
                      onClick={() => onClickRow?.(entry)}
                    >
                      {headers?.map((header, index) => {
                        filledFormFields = formFields?.map((field) =>
                          !field.value
                            ? { ...field, value: entry[field.element] }
                            : field
                        );

                        filledFormFields?.push({
                          element: 'id',
                          label: 'id',
                          value: entry['id'],
                          containerClassName: '-mt-7',
                          type: 'hidden',
                        });

                        return (
                          <td
                            key={index}
                            className={`${cellClasses} ${clickableCellHeader === header ? 'text-link hover:text-link-hover font-semibold' : ''}`}
                            onClick={(e) => {
                              if (
                                clickableCell &&
                                clickableCellHeader === header &&
                                entry[header] !== ''
                              ) {
                                e.stopPropagation();
                                clickableCellFunction?.(entry);
                              }
                            }}
                          >
                            {typeof entry[header] === 'boolean' ? (
                              <GoogleIcon
                                iconName={
                                  entry[header]
                                    ? 'check_box'
                                    : 'check_box_outline_blank'
                                }
                                iconClassName={
                                  entry[header]
                                    ? '!text-green-700'
                                    : '!text-red-700'
                                }
                              />
                            ) : (
                              entry[header]
                            )}

                            {header === editMessage &&
                            editAction &&
                            filledFormFields ? (
                              <EditTreatmentForm
                                formFunctionality='edit'
                                formAction={editAction}
                                formFields={filledFormFields}
                                asLink
                                label=''
                              />
                            ) : undefined}

                            {header === deleteMessage && deleteAction ? (
                              <DeleteTreatmentButton
                                deleteAction={() =>
                                  deleteAction(Number(entry['id']))
                                }
                                textForEntryToDelete={entry['treatment']}
                              />
                            ) : undefined}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div>{emptyTableMessage}</div>
      )}
    </>
  );
}

export function EditablePatientTable(props: EditableTableProps) {
  const { emptyPatientData } = useDictionary();

  return (
    <EditableTable
      deleteMessage='deletePatient'
      editMessage='editPatient'
      emptyTableMessage={emptyPatientData ?? ''}
      addSearchBar={true}
      {...props}
    />
  );
}

export function EditableTreatmentTable(props: EditableTableProps) {
  const { emptyTreatmentData } = useDictionary();

  return (
    <EditableTable
      deleteMessage='deleteTreatment'
      editMessage='editTreatment'
      emptyTableMessage={emptyTreatmentData ?? ''}
      {...props}
    />
  );
}
