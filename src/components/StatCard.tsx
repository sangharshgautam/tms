import React from "react";
interface StatCardProps {
    icon: any;
    title: string;
    value: number | string;
    colorClass: string;
}
const StatCard = ({ icon, title, value, colorClass }: StatCardProps) => (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md border border-gray-100">
        <div className={`p-3 rounded-full ${colorClass} bg-opacity-20 mr-4`}>
            {React.cloneElement(icon, { className: `w-6 h-6 ${colorClass}` })}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);
export default StatCard;