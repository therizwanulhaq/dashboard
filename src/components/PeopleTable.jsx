import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { generateUsers } from "../utils/generateUsers";
import DefaultAvatar from "../assets/default-avatar-icon.jpg"

const PeopleTable = ({ filtering, setFiltering }) => {
    const data = useMemo(() => generateUsers(100), []);
    const [sorting, setSorting] = useState([]);



    const columns = useMemo(() => [
        {
            id: "name",
            header: 'Name',
            accessorKey: 'name',
            enableSorting: true, // Enable sorting for this column
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <img
                        src={row.original.avatar || DefaultAvatar}
                        alt={`${row.original.name}'s avatar`}
                        className="size-9 rounded-full"
                        onError={(e) => { e.target.onerror = null; e.target.src = DefaultAvatar }} // Fallback image
                    />
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-600 text-sm">{row.original.name}</span>
                        <span className="text-xs lowercase font-medium text-gray-500">@{row.original.username}</span>
                    </div>
                </div>
            ),
        },
        {
            id: "status",
            header: 'Status',
            accessorKey: 'status',
            enableSorting: true, // Enable sorting for this column
            cell: ({ row }) => (
                <div className="border rounded-lg px-2 py-1 flex gap-2 items-center">
                    {row.original.status == 'Active' ? (<div className="size-2 bg-green-500 rounded-full"></div>) : (<div className="size-2 bg-gray-500 rounded-full"></div>)
                    }
                    <span> {row.original.status}</span>
                </div>
            )
        },
        {
            id: 'role',
            header: 'Role',
            accessorKey: 'role',
            enableSorting: false, // Disable sorting for this column
        },
        {
            id: 'email',
            header: 'Email',
            accessorKey: 'email',
            enableSorting: false, // Disable sorting for this column
            cell: ({ row }) => (
                <span className="lowercase">{row.original.email}</span>
            )
        },
        {
            id: 'teams',
            header: 'Teams',
            accessorKey: 'teams',
            enableSorting: false, // Disable sorting for this column
            cell: ({ getValue }) => (
                <div className="flex gap-1 items-center">
                    {getValue().map((team, index) => {
                        let teamClass = '';

                        switch (team) {
                            case "Design":
                                teamClass = "bg-blue-100 text-blue-700 border-blue-200";
                                break;
                            case "Product":
                                teamClass = "bg-green-100 text-green-700 border-green-200";
                                break;
                            case "Marketing":
                                teamClass = "bg-yellow-100 text-yellow-700 border-yellow-200";
                                break;
                            case "Engineering":
                                teamClass = "bg-red-100 text-red-700 border-red-200";
                                break;
                            default:
                                teamClass = "bg-gray-100 text-gray-700 border-gray-200";
                                break;
                        }

                        return (
                            <button
                                key={index}
                                className={`px-3 py-1 rounded-full text-xs border ${teamClass}`}
                            >
                                {team}
                            </button>
                        );

                    })}
                </div>
            ),
        }

    ], []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    });

    const renderPageNumbers = () => {
        const totalPages = table.getPageCount();
        const currentPage = table.getState().pagination.pageIndex + 1;
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            if (i <= 3 || i >= totalPages - 2 || (i >= currentPage - 1 && i <= currentPage + 1)) {
                pageNumbers.push(i);
            } else if (i === 3 || i === totalPages - 3) {
                pageNumbers.push('...');
            }
        }

        return pageNumbers.map((number, index) => (
            <button
                key={index}
                onClick={() => table.setPageIndex(number - 1)}
                className={`px-3 py-1 rounded-lg ${number === currentPage ? 'bg-violet-800 text-white' : 'bg-gray-100 text-gray-700'} text-sm font-medium`}
            >
                {number}
            </button>
        ));
    };

    return (
        <>
            <div className="flex-grow">
                <table className="w-full text-left">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}
                                className="grid grid-cols-[2.5fr_1fr_2fr_2fr_3fr] text-left">
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} onClick={header.column.getToggleSortingHandler()}
                                        className={`cursor-pointer ${header.column.columnDef.enableSorting ? 'sortable' : ''} px-4 py-1 text-gray-600 font-semibold text-sm`}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {
                                            header.column.columnDef.enableSorting && (
                                                <span className={`text-sm material-symbols-outlined ml-1 transition-transform duration-300 ${header.column.getIsSorted() === 'asc' ? 'rotate-180' : header.column.getIsSorted() === 'desc' ? 'rotate-0' : 'rotate-90 text-gray-400'}`}>
                                                    north
                                                </span>
                                            )
                                        }
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}
                                className="odd:bg-gray-100 even:bg-white grid grid-cols-[2.5fr_1fr_2fr_2fr_3fr] text-left"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="flex items-center px-4 py-2 text-xs font-medium text-gray-600">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="border-t border-gray-200 border-t-1 p-4 flex items-center justify-between">
                <button
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}
                    className="bg-gray-100 border border-gray-200 px-3 py-1 rounded-lg disabled:text-gray-500 text-sm font-medium inline-flex items-center gap-1"
                >
                    <span className="material-symbols-outlined">arrow_left_alt</span>
                    Previous
                </button>

                <div className="flex items-center gap-2">
                    {renderPageNumbers()}
                </div>

                <button
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}
                    className="bg-gray-100 border border-gray-200 px-3 py-1 rounded-lg disabled:text-gray-500 text-sm font-medium inline-flex items-center gap-1"
                >
                    Next
                    <span className="material-symbols-outlined">arrow_right_alt</span>
                </button>
            </div>
        </>
    );
}

export default PeopleTable;
