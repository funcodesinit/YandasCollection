"use client";
import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import BasicInputComp from "@/components/app/Form/BasicInput";
import StandardSecureInput from "@/components/app/Form/PasswordInput";
import app from "@/config/firebase";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";

// const auth = getAuth(app); // Initialize Firebase Auth
// const db = getFirestore(app);

const CreateUserSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required."),
    password: Yup.string().min(4, "Password must be at least 6 characters").required("Password is required."),
    cPassword: Yup.string()
        .required("Confirm your password.")
        .oneOf([Yup.ref("password"), null], "Passwords must match."),
});

export default function SignInComp() {
    const [serverError, setServerError] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const handleSubmit = async (values, { setSubmitting }) => {
        setLoading(true);
        setServerError("");
    
        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;
    
            // Check if an Admin already exists in Firestore
            // const adminQuery = query(collection(db, "users"), where("role", "==", "admin"));
            // const adminSnapshot = await getDocs(adminQuery);
    
            // // Assign role based on admin existence
            // const assignedRole = adminSnapshot.empty ? "STAFF" : "CUSTOMER";
    
            // // Save the user role in Firestore
            // await setDoc(doc(db, "users", user.uid), {
            //     uid: user.uid,
            //     email: values.email,
            //     role: assignedRole,
            //     createdAt: new Date(),
            // });
    
            console.log("User created and assigned role:");
            router.push("/signin"); // Redirect after successful sign-up
        } catch (err) {
            console.error("Error during sign-up:", err);
            if (err.code === "auth/email-already-in-use") {
                setServerError("Email is already in use.");
            } else {
                setServerError("An error occurred, please try again later.");
            }
        } finally {
            setSubmitting(false);
            setLoading(false);
        }
    };

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
                cPassword: "",
            }}
            validationSchema={CreateUserSchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <form className="mt-8" onSubmit={handleSubmit} method="post">
                    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                            <img alt="Your Company" src="logo.png" className="mx-auto h-10 w-auto" />
                            <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
                                Create your account today
                            </h2>
                        </div> 
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                            <div className="bg-white space-y-6 px-6 py-12 shadow-sm sm:rounded-lg gap-10 sm:px-12">
                                {serverError && (
                                    <p className="text-sm text-red-500 dark:text-red-500">{serverError}</p>
                                )} 
                                <BasicInputComp
                                    label="Email"
                                    name="email"
                                    value={values.email}
                                    touched={touched.email}
                                    errors={errors.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="email"
                                    placeholder="example@domain.com"
                                /> 
                                <StandardSecureInput
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    label="Password"
                                    onBlur={handleBlur}
                                    touched={touched.password}
                                    errors={errors.password}
                                />

                                <StandardSecureInput
                                    name="cPassword"
                                    value={values.cPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                    label="Confirm Password"
                                    onBlur={handleBlur}
                                    touched={touched.cPassword}
                                    errors={errors.cPassword}
                                /> 
                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex w-full justify-center align-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-pink-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        <span>Create Account</span>
                                        {loading ? (
                                            <svg
                                                aria-hidden="true"
                                                role="status"
                                                className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-white"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552"
                                                    fill="#1C64F2"
                                                />
                                            </svg>
                                        ) : null}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
}
