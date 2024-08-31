import UserIcon from "../assets/placegoldr-male.jpg"

const Navbar = () => {
  return <nav className="flex justify-between p-6 border-gray-200 border-b">
    <h1 className="text-3xl text-violet-800 font-bold">PEOPLE.CO</h1>
    <div className="flex items-center gap-2">
      <span className="material-symbols-outlined pr-2">notifications</span>
      <div className="size-8 object-cover rounded-full overflow-hidden">
        <img src={UserIcon} />
      </div>
      <p className="text-sm font-semibold">Jane Doe</p>
    </div>
  </nav>;
};

export default Navbar;
