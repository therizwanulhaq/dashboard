import { Route, Routes } from "react-router-dom";
import Overview from "./Overview";
import PeopleDirectory from "./PeopleDirectory";

const Dashboard = () => {
    return (
        <section className="- border-gray-200 rounded-lg border flex-1">
            <div className="h-full">
                <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route path="/people-directory" element={<PeopleDirectory />} />
                </Routes>
            </div>
        </section>
    );
}

export default Dashboard;
