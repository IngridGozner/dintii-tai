import { signOut } from "@/app/[lang]/login/actions";
import { Button } from "../atoms/Button";

// components/Header.tsx
export default function DashboardHeader() {
    return (
        <header className="flex items-center justify-between bg-white p-4 shadow">
            <h1 className="text-xl font-bold text-gray-800">Clinic Dashboard</h1>
            <div className="flex items-center space-x-4">
                <span className="text-font">Hello, Dr. X</span>
                <Button label="Logout" onClick={signOut} />
            </div>
        </header>
    );
}
