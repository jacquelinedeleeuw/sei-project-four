import React from 'react'
import GoogleLogin from 'react-google-login'

const Google = ({ setGoogleLogin }) => {

  const responseGoogle = (response) => {
    setGoogleLogin(response)
  }

  return (
    <div>
      <GoogleLogin 
        clientId="510466495847-39cmqq3p24hhp5378qongbpo3ep09ps9.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}

export default Google
