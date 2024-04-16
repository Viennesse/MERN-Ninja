import { useEffect } from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext"
/*
W frontend/package.json wpisujemy: "proxy": "http://localhost:7100" - adres servera node. This property tells our
React dev server to proxy any request that it doesnt recognize, to our api server at this address
*/

const Home = () => {

    const {workouts, dispatch} = useWorkoutContext()
    const {user} = useAuthContext()
   

    useEffect(()=> {

        const fetchWorkouts = async () => {

            const response = await fetch("/api/workouts", {
                headers: {
                    "Authorization": `Bearer ${user.token}`  // to z payloadu w  AuthContext , a payload pochodzi z backendu:  user={email, token}
                }
            }) //bez port number, bo uzylismy proxy. We want fetch only if user is logged in


            const json = await response.json()
    

            if(response.ok) {
                dispatch({type:"SET_WORKOUTS", payload: json})
            }
        }

        if(user) {
            fetchWorkouts()
        }
    }, [user,dispatch])


    return(
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}


export default Home




