import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'

function App() {
  return (
    <div className='App'>
      <Header />
      <main className='py-8 md:px-24 p-4'>
        <HomePage />
      </main>
      <Footer />
    </div>
  ) 
}

export default App
