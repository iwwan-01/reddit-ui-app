import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { RedditProvider } from './context/RedditContext'

function App() {
  return (
    <RedditProvider>
      {/* <h3>Hey y'all!</h3> */}
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </RedditProvider>
  )
}

export default App
