'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { convertSnakeToCamelCase } from '@/helpers';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { GoogleIcon } from '@/components/atoms/GoogleIcon';
import { EditTreatmentForm } from '@/components/molecules/EditForm';
import { Input, InputProps } from '@/components/atoms/Input';
import { DeleteTreatmentButton } from '@/components/molecules/DeleteButton';
import { Button } from '@/components/atoms/Button';
import { useElementInViewport } from '@/app/hooks/useElementInViewport';
import { LoadRowsFunction, SupabaseArray } from '@/types/GeneralTypes';
import { ROWS_TO_LOAD } from '@/types/GlobalTypes';

type EditableTableProps = {
  data: SupabaseArray;
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
  initialSortOrder?: SortOrder;
  loadRows?: LoadRowsFunction;
};

type SpecificTableProps = EditableTableProps & {
  deleteMessage?: string;
  editMessage?: string;
  emptyTableMessage: string;
};

type SortOrder = 'asc' | 'desc';

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
    initialSortOrder = 'asc',
    loadRows,
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

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder);
  const [sortedHeader, setSortedHeader] = useState<string | null>(null);
  const [tableData, setTableData] = useState(data ?? []);

  const [containerRef, isVisible] = useElementInViewport();

  const [rangeStart, setRangeStart] = useState(ROWS_TO_LOAD);

  useMemo(() => {
    setTableData(data ?? []);
    setRangeStart(ROWS_TO_LOAD);
  }, [data]);

  useEffect(() => {
    async function fetchData() {
      const rangeTo = rangeStart + 15;
      setRangeStart(rangeTo);

      const newData = await loadRows?.(rangeStart, rangeTo);

      if (newData?.length) {
        setTableData([...(data ?? []), ...(newData ?? [])]);
      }
    }

    if (isVisible) {
      fetchData();
    }
  }, [isVisible]);

  const filteredData = useMemo(() => {
    if (!searchTerm) return tableData;

    return tableData?.filter((entry) =>
      Object.values(entry).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, tableData]);

  useEffect(() => {
    if (headers && headers.length > 0 && !sortedHeader) {
      const initialHeader = headers[0];
      setSortedHeader(initialHeader);
    }
  }, []);

  function sortDataByHeader(header: string, order: SortOrder) {
    if (!tableData) return;

    const newSortedData = [...tableData].sort((a, b) => {
      const rawA = a[header];
      const rawB = b[header];

      const valueA = rawA ?? '';
      const valueB = rawB ?? '';

      const numA = parseFloat(valueA);
      const numB = parseFloat(valueB);

      const isNumeric = !isNaN(numA) && !isNaN(numB);

      if (valueA === '' && valueB === '') return 0;
      if (valueA === '') return 1;
      if (valueB === '') return -1;

      if (isNumeric) {
        return order === 'asc' ? numA - numB : numB - numA;
      }

      return order === 'asc'
        ? valueA.toString().localeCompare(valueB.toString())
        : valueB.toString().localeCompare(valueA.toString());
    });

    setSortedHeader(header);
    setTableData(newSortedData);
  }

  return (
    <>
      {tableHeader}

      {tableData?.length ? (
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
                containerClassName='mb-3 mt-4 lg:w-1/2'
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
                    <th
                      key={index}
                      className={`bg-background text-base ${cellClasses}`}
                    >
                      {header !== editMessage && header !== deleteMessage ? (
                        <Button
                          iconName={
                            sortOrder === 'asc'
                              ? 'arrow_upward'
                              : 'arrow_downward'
                          }
                          asLink
                          className='group'
                          iconPlacement='right'
                          iconClassName={`${sortedHeader === header ? 'opacity-100' : 'opacity-0'} transition-opacity group-hover:opacity-100`}
                          onClick={() => {
                            const newSortOrder: SortOrder =
                              sortedHeader != header
                                ? 'asc'
                                : sortOrder === 'asc'
                                  ? 'desc'
                                  : 'asc';

                            setSortOrder(newSortOrder);
                            sortDataByHeader(header, newSortOrder);
                          }}
                          label={
                            t?.[
                              convertSnakeToCamelCase(header) as keyof typeof t
                            ] ?? header
                          }
                        />
                      ) : (
                        (t?.[
                          convertSnakeToCamelCase(header) as keyof typeof t
                        ] ?? header)
                      )}
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
                                ariaLabel={
                                  entry[header]
                                    ? 'terms accepted'
                                    : 'terms not accepted'
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
          <div ref={containerRef} />
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
      initialSortOrder='desc'
      {...props}
    />
  );
}
