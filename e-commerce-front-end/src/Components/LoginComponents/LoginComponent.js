import {LoginComponentDiv, LoginForm, LoginFormButton, LoginReroutingDiv, ReRoutingButton} from '../../Styles/ContainersStyles'
import {LoginFormMainHeader, LoginFormNormalInput} from '../../Styles/HeadersStyles'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import {useState} from 'react'

function LoginComponent() {
  const [resultLogin, setResultLogin] = useState([])
  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()

  const hanldeLogin = async(e) =>{
    e.preventDefault()
    const post = {
      userName: userName,
      password: password
    }
    try{
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
      setUserName('')
      setPassword('')
    }catch(err){
      console.log(err)
      setError(err)
      setUserName('')
      setPassword('')
    }
  }
    const navigate = useNavigate();
    const navigateToRegister = () => {
        navigate(`/register`)
    }
    let displayError
        if(error){
          displayError = <h5>Wrong credentials</h5>
        }
        else{
         displayError = <h5></h5>
        }
      
    

    return (
      <div>
        <LoginComponentDiv onSubmit={hanldeLogin}>
          <LoginFormMainHeader>Login</LoginFormMainHeader>
          <LoginForm >
              <LoginFormNormalInput 
              type="text"
              placeholder="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              />
              <LoginFormNormalInput 
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />

              <LoginFormButton >Login</LoginFormButton>
          </LoginForm>
          {displayError}
          <LoginReroutingDiv>
              <h6>Don't have an account?</h6>
              <ReRoutingButton onClick={navigateToRegister}>Register</ReRoutingButton>
          </LoginReroutingDiv>
        </LoginComponentDiv>
      </div>
    );
  }
  
  export default LoginComponent;