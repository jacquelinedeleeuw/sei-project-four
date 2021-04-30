import React from 'react'
import GoogleLogin from 'react-google-login'

const Google = ({ setGoogleLogin }) => {
  const responseGoogle = (response) => {
    setGoogleLogin(response)
  }

  const googleKey = process.env.REACT_APP_GOOGLE_KEY

  return (
    <div className="google">
      <br />
      <GoogleLogin
        clientId={googleKey}
        buttonText="Use Google Authentication"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}

export default Google
