import React from 'react'

import useDarkMode from 'use-dark-mode'

// import Toggle from './Toggle'

const Settings = () => {
  const darkMode = useDarkMode(false)

  return (
    <div>
      <h3>Settings</h3>
      <br />
      <div className="container change-card animate__animated animate__fadeInUp">
        <br />
        <div>
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
      </div>
    </div>
  )
}

export default Settings
