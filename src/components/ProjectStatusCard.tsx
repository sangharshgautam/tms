// Calculates Pass Rate for a project
import {Project} from "./Project";

const calculateProjectPassRate = (project: Project) => {
    return project.total > 0 ? ((project.passed / project.total) * 100) : 0;
};
interface ProjectStatusCardProps{
    project: Project
}
const ProjectStatusCard = ({ project }: ProjectStatusCardProps) => {
    const passRate = calculateProjectPassRate(project);
    let bgColor = 'bg-gray-100'; // Default
    let statusEmoji = '⚙️';
    let statusText = 'RUNNING';

    if (project.failed > 0 || project.broken > 0) {
        bgColor = 'bg-red-500 hover:bg-red-600';
        statusEmoji = '❌';
        statusText = 'FAILED';
    } else if (passRate === 100) {
        bgColor = 'bg-emerald-500 hover:bg-emerald-600';
        statusEmoji = '✅';
        statusText = 'PASSED';
    } else if (project.skipped > 0) {
        bgColor = 'bg-yellow-500 hover:bg-yellow-600';
        statusEmoji = '⚠️';
        statusText = 'WARNING';
    }

    return (
        <div
            className={`p-4 rounded-xl shadow-md text-white transition duration-300 transform hover:scale-[1.03] cursor-pointer ${bgColor}`}
            title={`Project: ${project.name}\nPass Rate: ${passRate.toFixed(2)}%\nTotal: ${project.total}`}
        >
            <div className="flex justify-between items-start">
                <span className="text-3xl">{statusEmoji}</span>
                <span className="text-xs font-semibold uppercase opacity-80">{project.suite}</span>
            </div>
            <h3 className="mt-2 text-lg font-bold truncate">{project.name}</h3>
            <p className="text-sm font-medium opacity-90">{statusText}</p>
            <p className="text-xs opacity-70 mt-1">Pass: {passRate.toFixed(1)}%</p>
        </div>
    );
};
export default ProjectStatusCard;