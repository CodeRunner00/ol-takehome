import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import './styles/Form.scss';

export default function Form() {
    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({ mode: "onBlur" });
    const [response, setResponse] = useState(null);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('https://5r2cql08l4.execute-api.us-east-1.amazonaws.com/register', data);
            setResponse(response);
        } catch (err) {
            setResponse(err.response);
        }
    };

    const password = useRef({});
    password.current = watch("password", "");

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="input-wrapper">
                    <label htmlFor="email">Email</label>
                    {/* use aria-invalid to indicate field contain error */}
                    <input
                        id="email"
                        aria-invalid={errors.email ? "true" : "false"}
                        {...register('email', {
                            required: '*email is required', pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "*invalid email address"
                            }
                        })}
                    />

                    {/* use role="alert" to announce the error message */}
                    {errors.email && (
                        <span role="alert">{errors.email.message}</span>
                    )}

                </div>

                <div className="input-wrapper">
                    <label htmlFor="password">Password:</label>
                    {/* use aria-invalid to indicate field contain error */}
                    <input
                        id="password"
                        type="password"
                        aria-invalid={errors.password ? "true" : "false"}
                        {...register('password', {
                            required: '*password is required', pattern: {
                                value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
                                message: 'password must have 1 number, 1 letter, 1 special char'
                            },
                            minLength: { value: 8, message: 'Password must be at least 8 characters long' }
                        })}
                    />

                    {/* use role="alert" to announce the error message */}
                    {errors.password && (
                        <span role="alert">{errors.password.message}</span>
                    )}

                </div>
                <div className="input-wrapper">
                    <label>Confirm password:</label>
                    <input
                        name="password_confirm"
                        type="password"
                        aria-invalid={errors.password_confirm ? "true" : "false"}
                        {...register('password_confirm', {
                            required: true,
                            validate: (value) =>
                                value === password.current || "The passwords do not match"
                        })}
                    />
                    {errors.password_confirm && <span>{errors.password_confirm.message}</span>}
                </div>

                <div className="input-wrapper">
                    <label>Pet Name</label>
                    <input
                        name="pet_name"
                        aria-invalid={errors.pet_name ? "true" : "false"}
                        {...register('pet_name', {
                            required: true
                        })}
                    />
                    {errors.pet_name && <span>{errors.pet_name.message}</span>}
                </div>

                <div className="input-wrapper">
                    <label>Pet Weight</label>
                    <input
                        name="pet_weight"
                        aria-invalid={errors.pet_weight ? "true" : "false"}
                        {...register('pet_weight', {
                            required: true,
                            min: { value: 3, message: "minimum of 3 lbs" },
                            max: { value: 180, message: "maximum of 180 lbs" }
                        })}
                    />
                    {errors.pet_weight && <span>{errors.pet_weight.message}</span>}
                </div>

                <div className="input-wrapper">
                    <label>Ideal Pet Weight</label>
                    <input
                        name="pet_weight_ideal"
                        aria-invalid={errors.pet_weight ? "true" : "false"}
                        {...register('pet_weight_ideal', {
                            required: true,
                            min: { value: 3, message: "minimum of 3 lbs" },
                            max: { value: 180, message: "maximum of 180 lbs" }
                        })}
                    />
                    {errors.pet_weight_ideal && <span>{errors.pet_weight_ideal.message}</span>}
                </div>


                <div><input type="submit" className={isValid ? `valid` : 'disabled'} /></div>
            </form>
            <div>
                {response?.status === 200 && <p>Success!</p>}
                {response?.status === 400 && <p>{response?.data?.message}</p>}
                {response?.status === 500 && <p>{response?.data}</p>}
            </div>
        </>
    );
}