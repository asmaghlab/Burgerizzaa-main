import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import z from 'zod';
import { setresetuser } from '../../../Store/Resetslice';
import { Helmet } from "react-helmet-async";


type ForgetPasswordForm = {
    email: string;
};


type User = {
    id: string;
    email?: string;
};

export default function ForgetPassword() {


    const schema = z.object({
        email: z.email('Invalid email'),
    });

    const form = useForm<ForgetPasswordForm>({
    defaultValues: { email: '' },
    resolver: zodResolver(schema),
    });

    const { register, handleSubmit, formState } = form;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const mutation = useMutation<User, Error, ForgetPasswordForm>({
        mutationFn: async (values) => {
        const res = await axios.get<User[]>(
            'https://68e4e1228e116898997d6e79.mockapi.io/signup'
        );
        const users = res.data;
        const foundUser = users.find((u) => u.email === values.email);
        if (!foundUser) throw new Error('Email not found');
        return { id: foundUser.id };
        },
        onSuccess: (data) => {
        dispatch(setresetuser(data));
        navigate('/reset');
        },
    });

    const handleForget: SubmitHandler<ForgetPasswordForm> = (values) => {
        mutation.mutate(values);
    };

    return (
        <>
        <Helmet>
            <title>ForgetPassword</title>
                <meta
                    name="description"
                    content="Explore our delicious burger menu at Burgerizza. Burgers, sides, drinks, and more!"
                />
        </Helmet>

        <div className=" min-vh-100 d-flex justify-content-center align-items-center">

        <div className="container p-0 rounded" style={{ minHeight: '400px' }}>

                <div className="row align-items-center h-100">

                <div className="d-flex justify-content-center align-items-center h-100">
                <div className="reset_form p-4 rounded w-50">

                        <h2 className="text-center mb-5 text-danger fw-bold">
                        Forget Password
                        </h2>

                        <form onSubmit={handleSubmit(handleForget)}>
                            {mutation.isError ? (
                                <p className="alert alert-danger p-1 mt-1 text-center">
                                {(mutation.error as Error).message}
                                </p>
                            ) : (
                                ''
                            )}

                            <div className="login_input mb-4">
                                <input
                                type="email"
                                {...register('email')}
                                className="form-control"
                                id="floatingEmailInput"
                                placeholder="name@example.com"
                                />
                                {/* <label htmlFor="floatingEmailInput">Email address</label> */}
                                {formState.errors.email && (
                                <p className="alert_error">
                                    {formState.errors.email.message}
                                </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={mutation.isPending}
                                className="btn login_btn w-100 d-flex justify-content-center align-items-center rounded-4"
                            >
                                {mutation.isPending ? (
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                ) : (
                                'Reset Password'
                                )}
                            </button>

                        </form>
                    </div>
                    </div>
                

                </div> 
            </div>
        </div>

        </>
    );
}
