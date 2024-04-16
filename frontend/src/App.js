// cd..  cofanie sie do poprzedniego folderu (czyli do MERNSTACK TUT)
// npx create-react-app frontend
// cd frontend a nastepnie npm install react-router-dom

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home.js"
import NavBar from "./components/NavBar.js";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";
import { useAuthContext } from "./hooks/useAuthContext.js";


function App() {

  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user? <Home /> : <Navigate to = "/login" />} />
            <Route path="/login" element={!user? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user? <SignUp/> : <Navigate  to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;



const obj = {imie:"Marlena", age:37}

const obj2 = {...obj}
console.log(obj2)

const tablica= [{id: 1, name:"First"}, {id: 2, name:"Second"}, {id: 3, name:"Third"} ]

const fn = tablica.map(({id,name}, i) => {
  return [id, name]
})


console.log(fn)

