import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignIn_SignUp = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const toggleForm = () => {
        setIsSignUp(!isSignUp);
        setError('');
        // Clear form fields when toggling
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const handleGoogleSignIn = async () => {
        setError('');
        try {
            window.location.href = ("http://localhost:3300/auth/google");
            console.log();
            const params = new URLSearchParams(window.location.search);
            const token = params.get("token");

            if (token) {
                localStorage.setItem("token", token); // Store token for future API requests
                console.log("🔥 Token received:", token);
            } else {
                console.error("❌ No token found in URL!");
            }
        } catch (err) {
            console.error('Error during Google sign in:', err.message);
            setError(err.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isSignUp) {
                // Sign Up validation
                if (!name || !email || !password || !confirmPassword) {
                    setError('All fields are required.');
                    return;
                }

                if (password !== confirmPassword) {
                    setError('Passwords do not match.');
                    return;
                }

                // Sign up request
                const response = await axios.post("http://localhost:3300/User/signup", {
                    name,
                    email,
                    password
                });

                console.log('Sign up successful:', response.data);
                // Clear form after successful signup
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                // Optionally switch to login form
                setIsSignUp(false);
            } else {
                // Sign In validation
                if (!email || !password) {
                    setError('Email and password are required.');
                    return;
                }

                // Sign in request
                const response = await axios.post("http://localhost:3300/User/login", {
                    email,
                    password
                });

                console.log('Login successful:', response.data);
                let token = response.data.token;
                console.log(token)
                localStorage.setItem("token", token);
                // Clear form after successful login
                setEmail('');
                setPassword('');
                // Optionally redirect to another page
                navigate('/main');
                // Handle successful login (e.g., store token, redirect)
            }
        } catch (err) {
            console.error('Error during authentication:', err);
            setError(err.response?.data?.message || 'Authentication failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#ffe6e6] to-[#f8f9fa] font-poppins">
            <div className="w-full max-w-sm md:max-w-md lg:max-w-lg p-6 space-y-6 bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-center mb-4">
                    <button
                        className={`mx-1 sm:mx-2 px-6 sm:px-14 py-2 sm:py-3 font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${isSignUp ? 'text-orange-500 bg-white' : 'bg-white text-orange-500 border border-orange-500'}`}
                        onClick={toggleForm}
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                </div>
                <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                    {isSignUp && (
                        <div className="relative">
                            <label className="block text-sm sm:text-base font-semibold text-gray-700" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="w-full px-3 sm:px-4 py-2 text-gray-900 bg-white border border-orange-500 rounded-lg focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                                id="name"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="relative">
                        <label className="block text-sm sm:text-base font-semibold text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-3 sm:px-4 py-2 text-gray-900 bg-white border border-orange-500 rounded-lg focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <label className="block text-sm sm:text-base font-semibold text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-3 sm:px-4 py-2 text-gray-900 bg-white border border-orange-500 rounded-lg focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {isSignUp && (
                        <div className="relative">
                            <label className="block text-sm sm:text-base font-semibold text-gray-700" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                className="w-full px-3 sm:px-4 py-2 text-gray-900 bg-white border border-orange-500 rounded-lg focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    )}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="flex items-center justify-between">
                        <button
                            className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg hover:bg-gradient-to-r hover:from-orange-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                            type="submit"
                        >
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </button>
                    </div>
                </form>
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className="mx-4 text-gray-500">{isSignUp ? 'Or Register with' : 'Or Login with'}</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                </div>
                <div className="text-center text-4xl my-2 flex items-center justify-center">
                    <button
                        className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        type="button"
                        onClick={handleGoogleSignIn}
                    >
                        <FcGoogle className="inline-block" />
                    </button>
                </div>
                {isSignUp && (
                    <div className="text-center text-sm text-gray-500">
                        By signing up, you agree to our <strong>Terms</strong>. See how we use your data in our <strong>Privacy Policy</strong>. We never post to any social media.
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignIn_SignUp;