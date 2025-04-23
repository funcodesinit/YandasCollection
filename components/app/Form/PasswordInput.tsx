"use client"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function StandardSecureInput({
    label,
    name,
    placeholder = 'Type here...',
    errors,
    onChange,
    onBlur,
    value,
    touched,
}) {
    const [secure, setSecure] = useState(true);

    const inputClass = `block w-full rounded-md bg-white px-3 py-1.5 outline-1 -outline-offset-1  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${errors && touched ? "text-red-900 outline-red-300 focus:outline-red-600  placeholder:text-red-400" : " text-base  text-gray-900 outline-gray-300  placeholder:text-gray-400"
        }`;

    return (
        <div>
            <label htmlFor="tel" className="block text-sm/6 font-medium text-gray-900">
                {label}
            </label>
            <div className="relative mt-2">
                <input
                    id={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    aria-invalid={!!errors}
                    onChange={onChange}
                    onBlur={onBlur}
                    type={secure ? "password" : "text"}
                    className={inputClass}
                />
                <button
                    type="button"
                    onClick={() => setSecure(!secure)}
                    className="absolute inset-y-0 right-2 flex items-center"
                >
                    {!secure ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                    }
                </button>
            </div>
            {errors && touched && (
                <span className="text-xs text-red-500">{errors}</span>
            )}
        </div>
    );
}
