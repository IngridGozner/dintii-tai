'use client';

import { Container } from '../molecules/Container';
import { GridContainer } from '../molecules/GridContainer';

type EditableTableProps = {
  data: { [key: string]: string }[] | null;
  excludedHeaders?: string[];
  onClickRow?: (rowData: { [key: string]: string }) => void;
  clickableCell?: {
    clickableCellHeader: string;
    clickableCellFunction: (rowData: { [key: string]: string }) => void;
  };
};

export default function EditableTable(props: EditableTableProps) {
  const { data, excludedHeaders, onClickRow, clickableCell } = props;

  if (!data) return;

  const headers = excludedHeaders
    ? Object.keys(data[0]).filter((key) => !excludedHeaders.includes(key))
    : Object.keys(data[0]);

  const cellClasses = 'p-3 text-font text-base border-b border-font/20';
  const headClasses = `bg-background text-base ${cellClasses}`;

  return (
    <Container>
      <GridContainer>
        <div className='col-span-6 overflow-x-auto md:col-span-12'>
          <table className='w-full text-left'>
            <colgroup>
              {headers.map((_header, index) => (
                <col key={index} />
              ))}
            </colgroup>
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className={headClasses}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => {
                const { clickableCellHeader, clickableCellFunction } =
                  clickableCell || {};

                return (
                  <tr
                    key={index}
                    className={`hover:bg-background/50 ${onClickRow ? 'cursor-pointer' : ''}`}
                    onClick={() => onClickRow?.(entry)}
                  >
                    {headers.map((header, index) => (
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
                        {entry[header]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GridContainer>
    </Container>
  );
}
