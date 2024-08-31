
import { useForm } from 'react-hook-form';
import { z, ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    role: z.string().min(1, 'Role is required'),
    team: z.string().min(1, 'Team is required'),
});

const AddMemberForm = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label>Name</label>
                <input {...register('name')} className="border" />
                {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
                <label>Role</label>
                <input {...register('role')} className="border" />
                {errors.role && <p>{errors.role.message}</p>}
            </div>
            <div>
                <label>Team</label>
                <input {...register('team')} className="border" />
                {errors.team && <p>{errors.team.message}</p>}
            </div>
            <button type="submit">Add</button>
        </form>
    );
};

export default AddMemberForm;
