import React from 'react'

import useDarkMode from 'use-dark-mode'

// import Toggle from './Toggle'
import Checkout from '../../stripe/Checkout'

const Settings = () => {
  const darkMode = useDarkMode(false)

  return (
    <div>
      <h3>Settings</h3>
      <br />
      <div className="container change-card animate__animated animate__fadeInUp">
        <br />
        <div>
          <div className="columns">
            <div className="column">
              <button
                className="button setting-button"
                type="button"
                onClick={darkMode.disable}
              >
                Light Mode
              </button>
    
              <button
                className="button setting-button"
                type="button"
                onClick={darkMode.enable}
              >
                Dark Mode
              </button>
            </div>
            <div className="column"><Checkout /></div>
            <br />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
