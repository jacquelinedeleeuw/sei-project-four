// import React, { useEffect } from 'react'
import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import House from './assets/house.png'
import Zoopla from './assets/zoopla.png'
import RightMove from './assets/rightmove.png'
import PrimeLocation from './assets/prime-location.png'
import 'animate.css'

import Footer from './Footer'

const Home = () => {
  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await fetch('api/savedproperties/')
  //     console.log(await res.json())
  //   }
  //   getData()
  // }, [])

  return (
    <>
      <Navbar />

      <div className="home-container">
        <section className="home-content-container">
          <div className="columns">
            <div className="column ">
              <div className="home-cta-box">
                <h1 className="animate__animated animate__fadeInLeft">
                  Search property <br />
                  yields like <br />
                  never before
                </h1>
                <br />
                <p>
                  Find and finance high yielding Properties within your budget
                  in the UK
                </p>
                <br />
                <Link to="/getstarted" className="button get-started-button">
                  <strong>Get Started</strong>
                </Link>
              </div>
            </div>
            <div className="column">
              <img src={House}></img>
            </div>
          </div>
        </section>
      </div>
      <section className="logos-box-banner">
        <p>Utilising some of the UKs most trusted property data sources</p>
        <div className="logos-box">
          <img src={Zoopla}></img>
          <img src={RightMove}></img>
          <img src={PrimeLocation}></img>
        </div>
      </section>

      <svg>
        <clipPath id="wave" clipPathUnits="objectBoundingBox">
          <path
            className="st0"
            d="M1,0c0,0-0.3,0.1-0.5,0.1S0.3,0,0,0.1V1h1L1,0z"
          />
        </clipPath>
      </svg>

      <Footer />
    </>
  )
}

export default Home
