
import React from "react";
import { FcGoogle } from "react-icons/fc";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
// import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";

const GoogleLogin = () => {
    const navigate = useNavigate();
    function googleLogin(){
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(async (result) => {
            console.log(result);
            if(result.user){
                navigate("/main");
            }
        });
    }
    return (
        <>
            <div className="w-full h-10 flex justify-center items-center">
                <button className="h-10 w-10 border-2 rounded-full " onClick={googleLogin}><FcGoogle/></button>
            </div>
        </>
    );
}

export default GoogleLogin;
