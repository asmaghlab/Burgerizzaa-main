import React from 'react'
import '../Auth.css';
import loginImg from "../../../assets/Images/login_img.png";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

type RegisterFormData = {
    username: string;
    email: string;
    password: string;
    re_password: string;
};
const Register: React.FC = () => {


    const navigate = useNavigate();
    const schema = z
        .object({
            username: z
                .string()
                .min(2, "name is required")
                .max(10, "max length is 15"),
            email: z.email("invalid email"),
            password: z.string().regex(/^[A-Z][a-z0-9]{3,8}$/, "Invalid password"),
            re_password: z.string(),
        })
        .refine((obj) => obj.password === obj.re_password, {
            message: "Passwords do not match",
            path: ["re_password"],
        });

    const form = useForm<RegisterFormData>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            re_password: "",
        },
        resolver: zodResolver(schema),
    });

    const { register, handleSubmit, formState } = form;
    const mutation = useMutation({
        mutationFn: async (newUser: RegisterFormData) => {
            const res = await axios.get(
                "https://68e4e1228e116898997d6e79.mockapi.io/signup"
            );
            const users: RegisterFormData[] = res.data;

            const emailExists = users.some((u) => u.email === newUser.email);
            if (emailExists) {
                throw new Error("This email is already registered");
            }
            const userrole = { ...newUser, role: "user" };

            const postRes = await axios.post(
                "https://68e4e1228e116898997d6e79.mockapi.io/signup",
                userrole
            );
            return postRes.data;
        },
        onSuccess: () => {
            navigate("/login");
        },
    });

    const handleRegister: SubmitHandler<RegisterFormData> = (value) => {
        mutation.mutate(value);
        console.log(mutation);
    };

    return (
        <>
            <Helmet>
                <title>Register</title>
                <meta
                    name="description"
                    content="Welcome to Burgerizza! Discover our delicious burgers, exclusive deals, and amazing stories."
                />
            </Helmet>

            <div id="login_page">
                <div className="container_box login_page">

                    <div id="login_form">

                        <div className='login_form'>
                            <h2 className="text-center mb-4 fw-bold">
                                Create Account
                            </h2>

                            <form onSubmit={handleSubmit(handleRegister)}>
                                {mutation.isError ? (
                                    <p className="alert_form">
                                        {(mutation.error as Error).message}
                                    </p>
                                ) : (
                                    ""
                                )}

                                <div className="register_input mb-4">
                                    <input
                                        type="text"
                                        {...register("username")}
                                        className="form-control"
                                        id="floatingNameInput"
                                        placeholder="Enter your user name"
                                    />
                                    {/* <label htmlFor="floatingNameInput">Username</label> */}
                                    {formState.errors.username && (
                                        <p className="alert_error">
                                            {formState.errors.username.message}
                                        </p>
                                    )}
                                </div>

                                <div className="register_input mb-4">
                                    <input
                                        type="email"
                                        {...register("email")}
                                        className="form-control"
                                        id="floatingEmailInput"
                                        placeholder="name@example.com"
                                    />
                                    {/* <label htmlFor="floatingEmailInput">
                        Email address
                        </label> */}
                                    {formState.errors.email && (
                                        <p className="alert_error">
                                            {formState.errors.email.message}
                                        </p>
                                    )}
                                </div>

                                <div className="register_input  mb-4">
                                    <input
                                        type="password"
                                        {...register("password")}
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="Password"
                                    />
                                    {/* <label htmlFor="floatingPassword">Password</label> */}
                                    {formState.errors.password && (
                                        <p className="alert_error">
                                            {formState.errors.password.message}
                                        </p>
                                    )}
                                </div>

                                <div className="register_input  mb-4">
                                    <input
                                        type="password"
                                        {...register("re_password")}
                                        className="form-control"
                                        id="floatingRePassword"
                                        placeholder="RePassword"
                                    />
                                    {/* <label htmlFor="floatingRePassword">Re-Password</label> */}
                                    {formState.errors.re_password && (
                                        <p className="alert_error">
                                            {formState.errors.re_password.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={mutation.isPending}
                                    className="login_btn btn w-100 d-flex justify-content-center align-items-center rounded-4 "
                                >
                                    {mutation.isPending ? (
                                        <div
                                            className="spinner-border text-light"
                                            role="status"
                                        >
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    ) : (
                                        "Register"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>


                    <div className="login_img">
                        <img src={loginImg} alt="" />
                    </div>
                </div>
            </div>



        </>
    )
}

export default Register