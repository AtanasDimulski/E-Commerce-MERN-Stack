import {LoginComponentDiv, LoginForm, LoginFormButton, LoginReroutingDiv, ReRoutingButton} from '../../Styles/ContainersStyles'
import {LoginFormMainHeader, LoginFormNormalInput} from '../../Styles/HeadersStyles'
import {useNavigate} from 'react-router-dom';
import {useState} from 'react'
import axios from 'axios'

function RegisterComponent() {
  const [resultLogin, setResultLogin] = useState([])
  const [userName, setUserName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()

    const navigate = useNavigate();
    const navigateToRegister = (productId, variantId) => {
        navigate(`/login`)
    }

    const hanldeLogin = async(e) =>{
        e.preventDefault()
        const post = {
          userName: userName,
          email:email,
          password: password
        }
        try{
          const register = await axios.post("//localhost:8000/api/v1/auth/register", post)
          const result = await axios.post("//localhost:8000/api/v1/auth/login", post)
          console.log(result.data)
          setResultLogin(result.data)
          localStorage.setItem('userName', result.data.userName);
          localStorage.setItem('accessToken', result.data.accessToken);
          localStorage.setItem('userId', result.data._id)
          if(result.data.isAdmin === true){
            localStorage.setItem('isAdmin', result.data.isAdmin)
            navigate(`/admin`)
          }else{
            navigate(`/dashboard`)
          }
        }catch(err){
          console.log(err)
          setError(err)
          setUserName('')
          setPassword('')
        }
      }

    return (
        <LoginComponentDiv>
        <LoginFormMainHeader>Register</LoginFormMainHeader>
        <LoginForm onSubmit={hanldeLogin}>
            <LoginFormNormalInput 
                type="text"
                placeholder="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />

            <LoginFormNormalInput 
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <LoginFormNormalInput 
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <LoginFormNormalInput 
                type="password"
                placeholder="confirm password"
            />
             <LoginFormButton type="submit">Register</LoginFormButton>
        </LoginForm>
        <LoginReroutingDiv>
            <h6>Already have an account?</h6>
            <ReRoutingButton onClick={navigateToRegister}>Login</ReRoutingButton>
        </LoginReroutingDiv>
      </LoginComponentDiv>
    )
}
export default RegisterComponent