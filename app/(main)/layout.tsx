import Nav from 'components/common/Nav'
import Footer from 'components/common/Footer'

const Layout = ({ children }: Children) => {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  )
}

export default Layout
