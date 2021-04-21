import React from 'react'
import GoogleLogin from 'react-google-login'

const Google = ({ setGoogleLogin }) => {

  const responseGoogle = (response) => {
    setGoogleLogin(response)
  }

  const googleKey = process.env.REACT_APP_GOOGLE_KEY

  return (
    <div>
      <GoogleLogin 
        clientId={googleKey}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}

export default Google
