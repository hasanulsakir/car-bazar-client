import { useState,useEffect } from "react"
import initializeAuth from "../firebase.init";
import { GoogleAuthProvider,getAuth,signInWithPopup,signOut,onAuthStateChanged,GithubAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile   } from "firebase/auth";
import axios from 'axios';
// import { useHistory } from "react-router";
initializeAuth();
const UseFirebase = () => {
    const [user, SetUser] = useState({});
    const [error, SetError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider =new GithubAuthProvider();
    const auth = getAuth();

//createUserWithEmailAndPassword
    const RegisterUser = (email,password,name,location,history) => {
        setIsLoading(true)
         createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                SetError('');
                const newUser = { email, displayName: name };
                SetUser(newUser);

                // save user to DB 
                saveUser(email, name);



                updateProfile(auth.currentUser, {
                    displayName: name
                }).then((result) => {
                    alert('Success Register');
                    if (result == !error) {
                    // const destination = ;
                   history.push(location?.state?.from || '/')
               }
                }).catch((error) => {
                      SetError(error.message);
                });
    // Signed in 
    // const user = userCredential.user;
                // ... 
                // history.replace('/')
                alert('success Register');
               console.log(Credential)

                // if (userCredential == !error) {
                //     const destination = location?.state?.from || '/';
                //    history.push(destination)
            //    }
                
  })
            .catch(error => {
                // console.log(error.message);
                SetError(error.message);
            })
            .finally(() => {
                setIsLoading(false)
            });
          
    }

// save user to DB
    
    const saveUser = (email, displayName) => {
        const user = { email, displayName };
        axios.post('https://artisticglow.herokuapp.com/users', user)
        .then()
    }
    
 


//signInWithEmailAndPassword
    const LoginUser = (email,password) => {
        setIsLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
           
            .catch(error => {
                // console.log(error.message);
                SetError(error.message);
            })
            .finally(() => {
                setIsLoading(false)
            });
          
    }
    const signInUsingGoogle = (location,history) => {
        setIsLoading(true)
        signInWithPopup(auth, googleProvider)
               .then(result => {
                   const user = result.user;
                
                   setLoginUser(user.email, user.displayName)
                   const destination = location?.state?.from || '/';
                   history.push(destination)
            })
             
            .catch(error => {
                console.log(error.message);
                SetError(error.message);
            })
            .finally(() => {
                setIsLoading(false)
            });
          
    }
    const signInUsingGithub = (location,history) => {
        setIsLoading(true)
         signInWithPopup(auth, githubProvider)
            .then(result => {
                 const user = result.user;
                   setLoginUser(user.email, user.displayName)
                   const destination = location?.state?.from || '/';
                   history.push(destination)
            })
            .catch(error => {
                console.log(error.message);
                SetError(error.message);
        })
           .finally(() => {
            setIsLoading(false)
        })
    }


    const setLoginUser = (email, displayName) => {
        const user = { email, displayName };
       axios.put('https://artisticglow.herokuapp.com/users', user)
        .then()
    }
  

    // observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                SetUser(user);
                SetError("");
            } else {
                SetUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribe;
},[auth])

useEffect(() => {
    fetch(`https://artisticglow.herokuapp.com/users/${user.email}`)
        .then(res => res.json())
        .then(data => {
        setAdmin(data?.admin)
    })
    
}, [user?.email]);

    
    // const history = useHistory();
    const logOut = () => {
        setIsLoading(true);
           signOut(auth)
               .then(() => {
                   SetUser({});

                    // history.push('/login')
               }).finally(() => {
                   setIsLoading(false)
               });
    }

    return {
        user,
        error,
        logOut,
        admin,
        isLoading,
        LoginUser,
        RegisterUser,
        signInUsingGithub,
        signInUsingGoogle
    }
}
export default UseFirebase;

