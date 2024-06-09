import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from '../components'

const HomeLayout = () => {
  return (
    <div style={{display: "flex", flexDirection: "column", height: "100vh"}}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default HomeLayout