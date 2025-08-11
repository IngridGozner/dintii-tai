// components/Sidebar.tsx
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-base-dark text-white p-4 space-y-4">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        <Link href="/dashboard" className="hover:underline">Home</Link>
        <Link href="/dashboard/patients" className="hover:underline">Patients</Link>
        <Link href="/dashboard/appointments" className="hover:underline">Appointments</Link>
      </nav>
    </aside>
  );
}
