import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MagicDef from 'magicdef'

const md = new MagicDef()

md.connect('sala-de-prueba')




function App() {
  function test() {
    return 'hola soy una funcion que es esta ejecutando desde render'
  }

  md.export(test)

  
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Hello World</h1>
      </div>
    </>
  )
}

export default App
