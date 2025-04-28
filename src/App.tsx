import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Shop from './components/Shop'
import Cart from './components/Cart'
import Login from './components/Login'
import Signup from './components/Signup'
import Order from './components/Order'

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        
        <main className="flex-grow flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/order' element={<Order/>}/>
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App