import React from 'react'
import FacebookLogin from 'react-facebook-login'

const Facebook = () => {

  const responseFacebook = (response) => {
    console.log(response)
  }

  const componentClicked = () => {
    console.log('clicked')
  }


  const facebookKey = process.env.REACT_APP_FACEBOOK_KEY

  return (
    <div>
      <FacebookLogin
        appId={facebookKey}
        autoLoad={true}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
      />
    </div>
  )
}

export default Facebook
