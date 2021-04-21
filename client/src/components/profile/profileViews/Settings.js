import React from 'react'

import useDarkMode from 'use-dark-mode'

// import Toggle from './Toggle'

const Settings = () => {
  const darkMode = useDarkMode(false)

  return (
    <div>
      <div className="container change-card animate__animated animate__fadeInUp">
        <div>
          <button type="button" onClick={darkMode.disable}>
            ☀
          </button>
          <button checked={darkMode.value} onChange={darkMode.toggle} />
          <button type="button" onClick={darkMode.enable}>
            ☾
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
