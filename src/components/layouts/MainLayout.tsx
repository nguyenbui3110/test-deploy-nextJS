import { Footer } from '@/src/components/Footer'
import { Header } from '@/src/components/Header'
import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import { THEME_DEFAULT } from '@/src/constant'
import SocketContainer from '@/src/components/layouts/SocketContainer'

const MainLayout = ({ children }) => {
  const theme = createTheme(THEME_DEFAULT)
  return (
    <SocketContainer>
      <ThemeProvider theme={theme}>
        <Header />
        <div className="mx-auto w-full min-h-screen max-w-7xl mt-[80px] py-10 overflow-hidden">
          {children}
        </div>
        <Footer />
      </ThemeProvider>
    </SocketContainer>
  )
}

export default MainLayout
