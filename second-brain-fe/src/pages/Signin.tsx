import { useRef, useState } from "react"
import { Button } from "../componenets/Button"
import { Input } from "../componenets/Input"
import { BrainIcon } from "../componenets/Icons"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"


export const Signin = () => {
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
        const response = await axios.post(`${BACKEND_URL}/signin`, request);
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/dashboard");
    }

    return <div className = "h-screen w-screen top-0 left-0 bg-gray-200 flex justify-center items-center">
        <div className = "bg-white rounded-lg border min-w-48 p-14 flex flex-col gap-4">
            <div className="flex gap-4 justify-center items-center self-center text-2xl pb-4">
                <BrainIcon className="text-[#5148dd] size-6"/>
                <span className="font-bold self-center">Second Brain</span>
            </div>
            <Input ref = {usernameRef} placeHolder="User Name"/>
            <Input type = "password" ref = {passwordRef} placeHolder="Password"/>
            <Button loading = {loading} variant = "primary" text = "Sign In" size = "md" onClick={signup}/> 
        </div>
        
    </div>
}