import React from 'react'

import useDarkMode from 'use-dark-mode'

// import Toggle from './Toggle'
import Checkout from '../../stripe/Checkout'

const Settings = ({ userDetails }) => {
  const darkMode = useDarkMode(false)

  return (
    <div>
      <h2>Settings</h2>
      <br />
      <div className="container change-card animate__animated animate__fadeInUp">
        <br />
        <div>
          <div className="columns">
            <div className="column">
              <p>Use the buttons below to switch between dark and light mode</p>
              <br />
              <button
                className="button setting-button yieldly-plan-button"
                type="button"
                onClick={darkMode.disable}
              >
                Light Mode
              </button>
              <button
                className="button setting-button yieldly-plan-button"
                type="button"
                onClick={darkMode.enable}
              >
                Dark Mode
              </button>
            </div>
            { !userDetails.pro &&
            <div className="column"><Checkout /></div>
            }
            <br />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
