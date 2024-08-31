import { NavLink } from "react-router-dom";


const Sidebar = () => {

    const sidebarMenu = [
        {
            icon: 'overview',
            title: "Overview",
            path: "/"
        },
        {
            icon: 'people',
            title: 'People Directory',
            path: '/people-directory'
        },

    ];
    return (
        <aside className="w-1/5 pt-4">
            <ul>
                {sidebarMenu.map((menu, index) =>
                    <NavLink to={menu.path} className="hover:text-violet-800" key={index}>
                        <li className=" flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined">
                                {menu.icon}
                            </span>
                            <p className="text-sm font-semibold">{menu.title}</p>
                        </li>
                    </NavLink>
                )}

            </ul>
        </aside>
    )
}

export default Sidebar