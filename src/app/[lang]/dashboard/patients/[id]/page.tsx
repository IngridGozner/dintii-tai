// app/dashboard/pacients/[id]/page.tsx
import { notFound } from 'next/navigation';

const mockPacients: { [key: string]: { name: string; age: number; condition: string } } = {
    '1': { name: 'Alice Popescu', age: 34, condition: 'Diabetes' },
    '2': { name: 'Bogdan Ionescu', age: 45, condition: 'Hypertension' },
};

export default function PacientDetail({ params }: { params: { id: string } }) {
    const pacient = mockPacients[params.id];

    if (!pacient) return notFound();

    return (
        <div>
            <h1 className="text-2xl font-semibold">{pacient.name}</h1>
            <ul className="mt-4 space-y-2 text-gray-700">
                <li><strong>Age:</strong> {pacient.age}</li>
                <li><strong>Condition:</strong> {pacient.condition}</li>
            </ul>
        </div>
    );
}
