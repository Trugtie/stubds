import './Login.css'
import loginBG from './LoginBG.png'
import LoginForm from '../../Components/LoginForm/LoginForm'

const styleBG={
    background: `url(${loginBG})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
}

function Login(){
    return(
        <div className='login-bg' style={styleBG}>
           <div className='login-overlay'>
               <div className='login-container'>
                   <LoginForm/>
               </div>
           </div>
        </div>
    )
}

export default Login;