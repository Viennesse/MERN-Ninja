import { useEffect, useState } from "react";
import {useAuthContext} from "./useAuthContext"

export const useLogin = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {authDispatch} = useAuthContext()

    const login = async (email,password) => {
        setIsLoading(true)   
        setError(null)      


        const response = await fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"},
            body: JSON.stringify({email,password})
        })



        const json = await response.json()  
        
        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok) {
            localStorage.setItem("user", JSON.stringify(json))
            authDispatch({type:"LOGIN", payload: json})  // stad mamy user.token bo nasz json z userController to {email, token}
            setIsLoading(false)

        }

    }

    return {login, error, isLoading}

}





