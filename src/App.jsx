import React from 'react'
import{ Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

import countryDataArray from '../jsonTransf/index.js' // the array tht contains all the countries as objects(sovereign, admin, geometry array)

import Country from './components/Country.jsx' //Country component that needs the vertices to display the borders

export default function App() {

//let's create an array with Country components, one for every object in countryDataArray


let rgC = countryDataArray.map(country => <Country  key ={country.key} vertices = {new Float32Array(country.geometry)}/>)


// pushing all the vertices into one array
let cartesianArray = [];

countryDataArray.forEach((country) => {
  cartesianArray = cartesianArray.concat(country.geometry)
})
  
const vertices = new Float32Array(cartesianArray)
//

  return (
    <div className="App">
        <Canvas
        camera={
          {position: [0, -10000, 8000], near: 3, far: 10000}
        }
        >
          <ambientLight intensity={0.2} />
          
          {rgC}
          
          <OrbitControls />
        </Canvas>
    </div>
  )
}


