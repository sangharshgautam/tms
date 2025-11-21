import React, { useState, useMemo } from 'react';
import { RefreshCw, CheckCircle, XCircle, AlertTriangle, Clock, List } from 'lucide-react';
import {Project} from "./Project";
import {SortConfig} from "./SortConfig";
import StatCard from "./StatCard";
import ProjectStatusCard from "./ProjectStatusCard";

// --- Static Data for Demonstration ---
const initialProjectData: Project[] = [
    {
        id: 1,
        name: 'UserAuth Service',
        suite: 'Unit Tests',
        environment: 'Node 20.x',
        datetime: '2025-11-20 09:30 AM',
        durationSeconds: 125.5,
        total: 350,
        passed: 345,
        failed: 3,
        broken: 2,
        skipped: 0,
    },
    {
        id: 2,
        name: 'E-commerce API Gateway',
        suite: 'Unit Tests',
        environment: 'Python 3.11',
        datetime: '2025-11-20 09:45 AM',
        durationSeconds: 312.8,
        total: 800,
        passed: 650,
        failed: 120,
        broken: 15,
        skipped: 15,
    },
    {
        id: 3,
        name: 'Frontend Components',
        suite: 'Jest',
        environment: 'React/Vite',
        datetime: '2025-11-20 10:00 AM',
        durationSeconds: 88.2,
        total: 450,
        passed: 448,
        failed: 0,
        broken: 1,
        skipped: 1,
    },
    {
        id: 4,
        name: 'Data Processing Engine',
        suite: 'PyTest',
        environment: 'Cloud Run',
        datetime: '2025-11-20 10:15 AM',
        durationSeconds: 670.0,
        total: 1200,
        passed: 1150,
        failed: 40,
        broken: 5,
        skipped: 5,
    },
    {
        id: 5,
        name: 'Mobile Push Notifications',
        suite: 'XCTest',
        environment: 'Swift 5.x',
        datetime: '2025-11-20 10:30 AM',
        durationSeconds: 45.0,
        total: 200,
        passed: 200,
        failed: 0,
        broken: 0,
        skipped: 0,
    },
    {
        id: 6,
        name: 'Legacy Accounting Module',
        suite: 'JUnit',
        environment: 'Java 8',
        datetime: '2025-11-20 10:45 AM',
        durationSeconds: 150.0,
        total: 90,
        passed: 80,
        failed: 10,
        broken: 0,
        skipped: 0,
    },
];

// --- Utility Functions ---

// Converts seconds to human-readable string (e.g., 5m 12s)
const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}m ${secs}s`;
};

// Calculates Pass Rate for a project
const calculateProjectPassRate = (project: Project) => {
    return project.total > 0 ? ((project.passed / project.total) * 100) : 0;
};

// --- Custom Components ---
const UnitTestSummary = () => {
    const [data, setData] = useState<Project[]>(initialProjectData);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'datetime', direction: 'descending' });
    // 1. Calculate Aggregated Metrics
    const summaryMetrics = useMemo(() => {
        return data.reduce((acc, project) => {
            acc.total += project.total;
            acc.passed += project.passed;
            acc.failed += project.failed;
            acc.broken += project.broken;
            acc.skipped += project.skipped;
            acc.durationSeconds += project.durationSeconds;
            return acc;
        }, { total: 0, passed: 0, failed: 0, broken: 0, skipped: 0, durationSeconds: 0 });
    }, [data]);

    const totalPassRate = summaryMetrics.total > 0
        ? (summaryMetrics.passed / summaryMetrics.total) * 100
        : 0;

    // 2. Sorting Logic
    const sortedData = useMemo(() => {
        const sortableItems = [...data];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                // @ts-ignore
                let aValue = a[sortConfig.key];
                // @ts-ignore
                let bValue = b[sortConfig.key];

                // Custom logic to sort by calculated pass rate
                if (sortConfig.key === 'passRate') {
                    aValue = calculateProjectPassRate(a);
                    bValue = calculateProjectPassRate(b);
                }

                // Handle string comparison for names
                if (typeof aValue === 'string') {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [data, sortConfig]);

    const requestSort = (key: string) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIndicator = (key: string) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
    };


    // 3. Render
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Custom Allure Dashboard (Multi-Project)</h1>
                <p className="text-gray-500 mb-8">Visualizing the health of unit test suites across all integrated projects.</p>

                {/* ---------------------------------------------------- */}
                {/* Custom Visual Component: Project Status Heatmap (Cards)*/}
                {/* ---------------------------------------------------- */}
                <div className="mb-10 p-6 bg-white rounded-xl shadow-xl border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                        <RefreshCw className="w-5 h-5 mr-2 text-blue-500" />
                        Latest Project Health Overview
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {data.map(project => (
                            <ProjectStatusCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>

                {/* Aggregate Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <StatCard
                        icon={<List />}
                        title="Total Projects"
                        value={data.length}
                        colorClass="text-indigo-600"
                    />
                    <StatCard
                        icon={<CheckCircle />}
                        title="Total Passed"
                        value={summaryMetrics.passed.toLocaleString()}
                        colorClass="text-emerald-600"
                    />
                    <StatCard
                        icon={<XCircle />}
                        title="Total Failed"
                        value={summaryMetrics.failed.toLocaleString()}
                        colorClass="text-red-600"
                    />
                    <StatCard
                        icon={<AlertTriangle />}
                        title="Broken/Skipped"
                        value={(summaryMetrics.broken + summaryMetrics.skipped).toLocaleString()}
                        colorClass="text-amber-600"
                    />
                    <StatCard
                        icon={<Clock />}
                        title="Total Duration"
                        value={formatDuration(summaryMetrics.durationSeconds)}
                        colorClass="text-blue-600"
                    />
                </div>

                {/* Main Projects Table (for detailed metrics) */}
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    <div className="p-6 bg-gray-50 border-b flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-700">Detailed Project Metrics ({data.length})</h2>
                        <div className={`text-xl font-bold ${totalPassRate >= 90 ? 'text-emerald-600' : totalPassRate >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                            Overall Pass Rate: {totalPassRate.toFixed(2)}%
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                {/* Table Headers */}
                                {[
                                    { key: 'name', label: 'Project Name' },
                                    { key: 'total', label: 'Total' },
                                    { key: 'passed', label: 'Passed' },
                                    { key: 'failed', label: 'Failed' },
                                    { key: 'broken', label: 'Broken' },
                                    { key: 'passRate', label: 'Pass Rate' },
                                    { key: 'durationSeconds', label: 'Duration' },
                                    { key: 'datetime', label: 'Last Run' },
                                ].map(({ key, label }) => (
                                    <th
                                        key={key}
                                        onClick={() => requestSort(key)}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition duration-150"
                                    >
                                        {label}{getSortIndicator(key)}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {sortedData.map((project) => (
                                <tr key={project.id} className="hover:bg-blue-50/50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {project.name}
                                        <span className="block text-xs text-gray-500">{project.environment}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.total}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-600">{project.passed}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">{project.failed}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-600">{project.broken}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                                        <div className="flex items-center">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            calculateProjectPassRate(project) >= 90 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {calculateProjectPassRate(project).toFixed(2)}%
                        </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDuration(project.durationSeconds)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.datetime}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UnitTestSummary;