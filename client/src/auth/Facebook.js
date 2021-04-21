import React from 'react'
import FacebookLogin from 'react-facebook-login'

const Facebook = () => {

  const responseFacebook = (response) => {
    console.log(response)
  }

  const componentClicked = () => {
    console.log('clicked')
  }

  return (
    <div>
      <FacebookLogin
        appId="281614550231171"
        autoLoad={true}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
      />
    </div>
  )
}

export default Facebook
