
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

const BasicInputComp = ({ value, onChange, onBlur, placeholder, name, touched, errors, label, type }) => {
    return <div>
        <label htmlFor="tel" className="block text-sm/6 font-medium text-gray-900">
            {label}
        </label>
        <div className="mt-2 flex">
            <input
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                aria-invalid={!!errors}
                onBlur={onBlur}
                type={type}
                placeholder={placeholder}
                className={errors && touched ?
                    '-ml-px block w-full grow rounded-r-md bg-white px-3 py-1.5 text-base text-red-500 outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6'
                    :
                    '-ml-px block w-full grow rounded-r-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                }

            />
            {errors && touched ? (
                <ExclamationCircleIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4"
                />
            ) : null}
        </div>
    </div>

}

export default BasicInputComp;
