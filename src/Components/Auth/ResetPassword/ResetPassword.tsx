import '../Auth.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import z from 'zod';
import { useNavigate } from 'react-router-dom';
import { clearresetuser } from '../../../Store/Resetslice';
import { Helmet } from "react-helmet-async";
import type { RootState, AppDispatch } from '../../../Store/Store';

type ResetPasswordForm = {
    password: string;
    re_password: string;
};

type ResetUser = {
    id: string;

};

export default function ResetPassword() {

    const user = useSelector((state: RootState) => state.resetuser) as ResetUser ;
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const schema = z
        .object({
        password: z.string().regex(/^[A-Z][a-z0-9]{3,8}$/, 'Invalid password'),
        re_password: z.string(),
        })
        .refine((obj) => obj.password === obj.re_password, {
        message: 'Passwords do not match',
        path: ['re_password'],
        });

    const form = useForm<ResetPasswordForm>({
        defaultValues: { password: '', re_password: '' },
        resolver: zodResolver(schema),
    });

    const { register, handleSubmit, formState } = form;

    const mutation = useMutation<void, Error, ResetPasswordForm>({
        mutationFn: async (data) => {
        await axios.put(
            `https://68e4e1228e116898997d6e79.mockapi.io/signup/${user.id}`,
            { password: data.password,  re_password: data.re_password, }
        );
        },
        onSuccess: () => {
        // alert('Password updated successfully');
        navigate('/login');
        dispatch(clearresetuser());
        },
    });

    const handleReset: SubmitHandler<ResetPasswordForm> = (data) => {
        console.log('hello', data);
        mutation.mutate(data);
    };

    return (
        <>
        <Helmet>
           <title>Reset Password </title>
                <meta
                    name="description"
                    content="Welcome to Burgerizza! Discover our delicious burgers, exclusive deals, and amazing stories."
                />
        </Helmet>

        <div className="min-vh-100 d-flex justify-content-center align-items-center">
            <div className="container p-0 rounded" style={{ minHeight: '400px' }}>
            <div className="row align-items-center h-100">

                {/* <div className="col-md-6 h-100">
                <img
                    src="/reset-password-concept-illustration_114360-7866.jpg"
                    className="img-fluid w-100 h-100"
                    alt="bg"
                />
                </div> */}

                
                <div className="d-flex justify-content-center align-items-center h-100">
                <div className="reset_form p-4 rounded w-50">
                    <h2 className="text-center mb-5 fw-bold">Reset Password</h2>

                    <form onSubmit={handleSubmit(handleReset)}>
                    {mutation.isError ? (
                        <p className="alert_form">
                        Something went wrong
                        </p>
                    ) : (
                        ''
                    )}

                    <div className="login_input mb-4">
                        <input
                        type="password"
                        {...register('password')}
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        />
                        {formState.errors.password && (
                        <p className="alert_error">
                            {formState.errors.password.message}
                        </p>
                        )}
                    </div>

                    <div className="login_input mb-4">
                        <input
                        type="password"
                        {...register('re_password')}
                        className="form-control"
                        id="floatingRePassword"
                        placeholder="RePassword"
                        />
                        {formState.errors.re_password && (
                        <p className="alert_error">
                            {formState.errors.re_password.message}
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
                        'Submit'
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
