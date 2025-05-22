import { useRef, useState } from "react"
import { Button } from "../componenets/Button"
import { Input } from "../componenets/Input"
import { BrainIcon } from "../componenets/Icons"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"


export const Signup = () => {
    const [loading, setLoading] = useState(false);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const request = {
            username : username,
            password : password
        }
        setLoading(true);
        await axios.post(`${BACKEND_URL}/signup`, request);
        alert("You have signed up");
        navigate("/signin");
    }

    return <div className = "h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className = "bg-white rounded-lg border min-w-48 p-14 flex flex-col gap-4">
            <div className="flex gap-4 justify-center items-center self-center text-2xl pb-4">
                <BrainIcon className="text-[#5148dd] size-6"/>
                <span className="font-bold self-center">Second Brain</span>
            </div>
            <Input ref = {usernameRef} placeHolder="User Name"/>
            <Input type = "password" ref = {passwordRef} placeHolder="Password"/>
            <Button loading = {loading} variant = "primary" text = "Sign Up" size = "md" onClick={signup}/> 
        </div>
        
    </div>
}