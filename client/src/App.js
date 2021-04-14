import React, { useEffect } from 'react'

const App = () => {
  useEffect(() => {
    const getData = async () => {
      const res = await fetch('api/savedproperties/')
      console.log(await res.json())
    }
    getData()
  }, [])

  return <h1>Hello World</h1>
}

export default App
