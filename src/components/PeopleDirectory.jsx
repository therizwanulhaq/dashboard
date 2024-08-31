import { useState } from "react";
import PeopleTable from "./PeopleTable";


const PeopleDirectory = () => {
    const [filtering, setFiltering] = useState('');

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between border-b border-gray-200 border-b-1 p-4">
                <div className="flex gap-2 items-center">
                    <p className="font-medium text-xl">Team Members</p>
                    <div className="text-violet-800 bg-gray-100 border font-semibold text-xs border-gray-200 rounded-full px-3 py-1 w-fit">100 users</div>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="flex items-center border border-gray-200 rounded-lg px-3 py-1">
                        <input
                            type="text"
                            className="border-none focus:outline-none"
                            placeholder="Search"
                            value={filtering}
                            onChange={(e) => setFiltering(e.target.value)}
                        />
                        <span className="material-symbols-outlined text-violet-600">search</span>
                    </div>
                    <span className="material-symbols-outlined">filter_alt</span>
                    <button className="inline-flex items-center gap-1.5 text-sm font-medium tracking-wider text-white bg-violet-800 px-3 py-1 border rounded-lg">
                        <span className="material-symbols-outlined text-base font-medium ">add</span> ADD MEMBER
                    </button>
                </div>
            </div>
            <PeopleTable filtering={filtering} setFiltering={setFiltering} />
        </div>
    );
};

export default PeopleDirectory;
