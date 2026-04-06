import Hero from "../features/hero/hero"
import Navbar from '../features/navbar/navbar'
import Projects from '../features/projects/projects'
import Experience from "../features/experience/experience"

function App() {
  return (
    <>
      <Navbar />
      
      <main>

        <Hero />

        <Experience />

        <Projects />

      </main>
    </>
  )
}

export default App