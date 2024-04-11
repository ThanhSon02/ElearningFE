import { Link } from "react-router-dom";

const menuData = [
    { label: "Menu 1" },
    {
        label: "Menu 2",
        submenu: [{ label: "Sub Menu 1" }, { label: "Sub Menu 2" }],
    },
    {
        label: "Menu 3",
        submenu: [
            { label: "Sub Menu 1" },
            { label: "Sub Menu 2" },
            { label: "Sub Menu 3" },
            {
                label: "Sub Menu 4",
                submenu: [
                    {
                        label: "Sub sub menu 1",
                    },
                    { label: "Sub sub menu 2" },
                ],
            },
        ],
    },
    {
        label: "Menu 4",
        submenu: [{ label: "Sub Menu 1" }, { label: "Sub Menu 2" }],
    },
];
function Dropdown() {
    return (
        <div className="bg-white absolute top-[20px] shadow-md">
            <ul className="block">
                {menuData.map((item, index) => (
                    <Link
                        className="flex min-w-[140px] justify-start items-center hover:bg-slate-200 px-2"
                        key={index}>
                        {item.label}
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default Dropdown;
