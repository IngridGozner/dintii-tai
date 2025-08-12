import { Container } from '../molecules/Container';
import { GridContainer } from '../molecules/GridContainer';

type EditableTableProps = {
  data: { [key: string]: string }[] | null;
};

export default function EditableTable(props: EditableTableProps) {
  const { data } = props;

  if (!data) return;

  const headers = Object.keys(data[0]);

  const cellClasses = 'p-4 text-font text-base border-b border-font/20';
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
                const values = Object.values(entry);

                return (
                  <tr key={index} className='hover:bg-background/50'>
                    {values.map((value, index) => (
                      <td key={index} className={cellClasses}>
                        {value}
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
