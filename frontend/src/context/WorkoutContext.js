/* Po dodaniu nowego Workout za pomoca formularza w komponencie WorkoutForm.js nie widzimy na stronie
/api/workouts nowego dodanego Workout, dopiero po odswiezeniu strony go widzimy, bo our local react state for workouts
isn't being kept in sync with the database collection when we add a new document, so we see new workout when we refresh the page and 
refetch the data again. We could force refetch of the data whenever we add a new document to update the state but that would be 
a bit excessive for fetching one extra documents or we can update the state locally, so we will be using react context
*/

import { createContext, useReducer } from "react"

export const WorkoutContext = createContext()

export const WorkoutReducer = (state, action) => {
    switch(action.type) {
        case "SET_WORKOUTS":
            return {
                workouts: action.payload
            }
        case "CREATE_WORKOUT":
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case "DELETE_WORKOUT":
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const WorkoutContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(WorkoutReducer, {
        workouts: null
    })

    return(
        <WorkoutContext.Provider value={{...state, dispatch}}>  
            {children}                 
        </WorkoutContext.Provider>
    )
}


