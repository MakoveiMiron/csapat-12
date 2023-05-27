import { LoggedInUserContext } from "../../contexts/LoggedInUserContext"
import { useContext } from "react"

export default function UserProfile(){
    const [user,setUser] = useContext(LoggedInUserContext)
    
    if(!user)return<h1>Ehhez bekell jelentkezned előbb!</h1>
    
    return(
        <>
        <div className="user-profile">
            <h2>Név: {user.name}</h2>
            <p>Email-cím: {user.email}</p>
        </div>
        </>
    )
}