import { useAuthContext } from "./useAuthContext"
import  {useWorkoutContext} from "./useWorkoutContext"


export const useLogout = () => {

    const {authDispatch} = useAuthContext()
    const {dispatch} = useWorkoutContext()
 
    const logout = ()=> {
        localStorage.removeItem("user")
        authDispatch({type: "LOGOUT"})
        dispatch({type: "SET_WORKOUTS", payload: null})
        // gdy uzytkownik sie wyloguje ustawiamy na frontendzie state dla workouts : null, aby nowy user nie widzial czyichs woekouts
        // przez krotka chwile po zalogowaniu sie
    }

    return {logout}
}