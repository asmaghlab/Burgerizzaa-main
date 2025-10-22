import React from 'react';
import '../Auth.css';
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { setuser } from "../../../Store/Userslice";

// SweetAlert
import { loginSuccessAlert } from '../../Sweet/SweetAlert';

type ILoginForm = {
    email: string;
    password: string;
};

type IUser = {
    id: string;
    username: string;
    email: string;
    password?: string;
    role: string;
};

const Login: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const schema = z.object({
        email: z.string().email("Invalid email"),
        password: z.string().regex(/^[A-Z][a-z0-9]{3,8}$/, "Invalid password"),
    });

    const { register, handleSubmit, formState } = useForm<ILoginForm>({
        defaultValues: { email: "", password: "" },
        resolver: zodResolver(schema),
    });

    const mutation = useMutation<IUser, Error, ILoginForm>({
        mutationFn: async ({ email, password }) => {
            const res = await axios.get<IUser[]>(
                "https://68e4e1228e116898997d6e79.mockapi.io/signup"
            );
            const users = res.data;

            const foundUser = users.find(
                (u: IUser) => u.email === email && u.password === password
            );

            if (!foundUser) {
                throw new Error("Incorrect email or password");
            }

            return {
                id: foundUser.id,
                username: foundUser.username,
                email: foundUser.email,
                role: foundUser.role
            };
        },

        onSuccess: (user) => {
            // تخزين بيانات المستخدم في Redux
            dispatch(setuser(user));
            localStorage.setItem("user", JSON.stringify(user));

            // SweetAlert عند نجاح تسجيل الدخول
            loginSuccessAlert(user.username, user.role as "admin" | "user", navigate);
        },
    });

    const handleLogin: SubmitHandler<ILoginForm> = (values) => {
        mutation.mutate(values);
    };

    return (
        <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Login</title>
        </Helmet>

        <div id="login_page">
            <div className="container_box login_page">

                {/* صورة */}
                <div className="login_img">
                    <img src="/src/assets/Images/login_img.png" alt="Login" />
                </div>

                {/* Form */}
                <div id="login_form">
                    <div className="login_form">
                        <h2>Welcome back!!</h2>

                        <form onSubmit={handleSubmit(handleLogin)}>
                            {mutation.isError && (
                                <p className="alert_form">
                                    {(mutation.error as Error).message}
                                </p>
                            )}

                            <div className="login_input mb-4">
                                <input
                                    type="email"
                                    {...register("email")}
                                    className="form-control"
                                    placeholder="Email you email address"
                                />
                                {formState.errors.email && (
                                    <p className="alert_error">
                                        {formState.errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div className="login_input mb-3">
                                <input
                                    type="password"
                                    {...register("password")}
                                    className="form-control"
                                    placeholder="Password"
                                />
                                {formState.errors.password && (
                                    <p className="alert_error">
                                        {formState.errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div className="text-end mb-5">
                                <Link to="/forget">Forget Password?</Link>
                            </div>

                            <button
                                type="submit"
                                disabled={mutation.isLoading}
                                className="login_btn btn w-100 d-flex justify-content-center align-items-center rounded-4"
                            >
                                {mutation.isLoading ? (
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    "Sign in"
                                )}
                            </button>

                            <p className="text-center mt-5">
                                Don’t have an account? <Link to="/register">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}

export default Login;
