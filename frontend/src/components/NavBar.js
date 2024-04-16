import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";


const NavBar = () => {

    const {logout} = useLogout()
    const handleClick = ()=> {
        logout()
    }

    const {user} = useAuthContext()


    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Workout Buddy</h1>
                </Link>
                <nav>
                    {user && (
                    <div>
                    <span style={{marginLeft: "15px", marginRight:"15px"}}>{user.email}</span>
                        <button onClick={handleClick}>Logout</button>
                    </div>
                    )}
                    {!user && (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default NavBar



let zmienna = 0
const wyraz = "Iteracja"

for(let poj of wyraz) {
    if(poj === "a") zmienna ++
    console.log(zmienna)
}


let nowaZmienna = wyraz.charAt(0) + "maginacja"
console.log(nowaZmienna)