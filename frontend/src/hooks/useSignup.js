import { useState } from "react";
import {useAuthContext} from "./useAuthContext"

export const useSignup = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {authDispatch} = useAuthContext()

    const signup = async (email,password) => {
        setIsLoading(true)   
        setError(null)      // resetujemy ewentualne istniejace bledy do null kiedy robimy request


        const response = await fetch("/api/user/signup", {
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
            authDispatch({type:"LOGIN", payload: json})
            setIsLoading(false)

        }

    }

    return {signup, error, isLoading}

}





