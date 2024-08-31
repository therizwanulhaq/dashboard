

const SidePane = ({ person }) => {
    if (!person) return null;

    return (
        <div className="p-4 border-l">
            <h2 className="text-xl font-bold">{person.name}</h2>
            <p>Role: {person.role}</p>
            <p>Team: {person.team}</p>
        </div>
    );
};

export default SidePane;
