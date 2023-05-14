import {useState} from 'react';
import { registrationUser } from '../Services/authentication.js';
import { API_URL } from '../Constans/firebaseConstans.js';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../Constans/firebaseConfig.js';
import { toast } from "react-toastify";
import { NavLink, useNavigate } from 'react-router-dom';



const Signup = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password, name)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            fetch(`${API_URL}vasarlok/${userCredential._tokenResponse.localId}.json`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({uid: userCredential._tokenResponse.localId, name})
            })
            .then(data => data.json())
            .then(resp => {
			            toast.success("Sikeres regisztráció!", {
				            position: toast.POSITION.TOP_RIGHT,
			            });
		    });
            navigate("/belepes")
        })
        .catch((error) => {
            toast.error("A regisztráció sikertelen volt!", {
                position: toast.POSITION.TOP_RIGHT,
            });
        });
        
   
    }
    return (
        <main >        
            <section>
                <div>
                    <div>                  
                        <h1> FocusApp </h1>                                                                            
                        <form>    
                        <div>
                                <label htmlFor="name">
                                    Full name : 
                                </label>
                                <input
                                    type="text"
                                    label="Full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} 
                                    required                                 
                                    placeholder="Full name"              
                                />
                            </div>  

                            <div>
                                <label htmlFor="email-address">
                                    Email address : 
                                </label>
                                <input
                                    type="email"
                                    label="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}  
                                    required                                    
                                    placeholder="Email address"                                
                                />
                            </div>
    
                            <div>
                                <label htmlFor="password">
                                    Password : 
                                </label>
                                <input
                                    type="password"
                                    label="Create password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required                                 
                                    placeholder="Password"              
                                />
                            </div>    
                                            
                            
                            <button
                                type="submit" 
                                onClick={onSubmit}                        
                            >  
                                Sign up                                
                            </button>
                                                                         
                        </form>
                       
                        <p>
                            Already have an account?{' '}
                            <NavLink to="/belepes" >
                                Sign in
                            </NavLink>
                        </p>                   
                    </div>
                </div>
            </section>
        </main>
      )
    }
    
    export default Signup

