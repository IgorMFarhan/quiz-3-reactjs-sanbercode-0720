import React, {useContext, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import LoginContext from './LoginContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [helperText, setHelperText] = useState('')
  const [error, setError] = useState(false)
  const {status, setStatus} = useContext(LoginContext)
  const history = useHistory()

  useEffect(() => {
    if (username.trim() && password.trim()) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }, [username, password])

  const handleLogin = () => {
    if (username === 'admin' && password === '123456') {
      setError(false)
      setStatus(true)
      setHelperText('Login Successfully')
      handleSuccess()

    } else {
      setError(true)
      setStatus(false)
      setHelperText('Incorrect username or password')
    }
  }

  const handleSuccess = () => {
    history.push('/movies')
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || handleLogin()
    }
  }

  return (
    <>
    <h1>Silahkan Login</h1>

<div style={{width: '40%', margin: '0 auto', display: 'block'}}>
  <div style={{border: '1px solid #aaa', padding: '20px'}}>
    <form onSubmit={handleLogin}>
      <label style={{float: 'left'}}>
        Username:
      </label>
      <input 
        style={{float: 'right'}}
        error={error}
        fullWidth
        id='username'
        type='text'
        label='Username'
        placeholder='admin'
        margin='normal'
        onChange={(e)=>setUsername(e.target.value)}
        onKeyPress={(e)=>handleKeyPress(e)}/>
      <br/>
      <br/>
      <label style={{float: 'left'}}>
        Password:
      </label>
      <input 
        style={{float: 'right',width:'70%'}} 
        error={error}
        fullWidth
        id='password'
        type='password'
        label='Password'
        placeholder='123456'
        margin='normal'
        helperText={helperText}
        onChange={(e)=>setPassword(e.target.value)}
        onKeyPress={(e)=>handleKeyPress(e)}/>
      <br/>
      <br/>
      <div style={{width: '100%', paddingBottom: '20px'}}>
        <button style={{ float: 'right'}}>Login</button>
      </div>
    </form>
  </div>
</div>
    </>
  )
}

export default Login;