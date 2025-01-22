import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../firebase'; // Ensure this points to your firebase.js
import { collection, addDoc } from 'firebase/firestore'; // Firestore methods
import GoogleLogin from '../components/GoogleLogin';
import { data } from 'react-router-dom';

async function addUser(name, email) {
    try {
        const docRef = await addDoc(collection(database, 'User123'), {
            name: name,
            email: email,
            createdAt: new Date().toISOString(),
        });
        console.log('User added to Firestore with ID: ', docRef.id);
    } catch (e) {
        console.error('Error adding user to Firestore: ', e);
    }
}

const SignIn_SignUp = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isSignUp) {
                if (!name || !email || !password || !confirmPassword) {
                    setError('All fields are required.');
                    return;
                }

                if (password !== confirmPassword) {
                    setError('Passwords do not match.');
                    return;
                }

                // Register user
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Add user to Firestore
                await addUser(name, email);

                alert('User signed up and added to Firestore successfully!');
            } else {
                if (!email || !password) {
                    setError('Email and password are required.');
                    return;
                }

                // Sign in user
                await signInWithEmailAndPassword(auth, email, password);
                alert('User signed in successfully!');
            }
        } catch (err) {
            console.error('Error during authentication:', err.message);
            setError(err.message);
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
                <div className="text-center text-4xl my-2">
                    <GoogleLogin />
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
