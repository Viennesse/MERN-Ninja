import { createContext, useEffect, useReducer } from "react"


export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                user: action.payload
            }
        case 'LOGOUT':
            return {
                user: null
            }
        default:
            return state
        
    }
}

export const AuthContextProvider = ({children}) => {     
    
    const [authState, authDispatch] = useReducer(authReducer, { user: null })

    useEffect(()=> {    //po zalogowaniu mamy w localstorage usera, ale po refresh the page znika nam ze strony w prawym rogu email usera
        const user = JSON.parse(localStorage.getItem("user")) // i nie jest napis LOGOUT jakby usera nie bylo, a on jest, ale w loca storage
        if(user) {                                              // dlatego musimy dodac do kontekstu useEffect z payloadem : user
            authDispatch({type:"LOGIN", payload: user})
        }
    }, [])
    
console.log("AuthState: ", authState)

    return (<AuthContext.Provider value = {{...authState, authDispatch}}>
    {children}
    </AuthContext.Provider>)
}