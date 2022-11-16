import { PointMaterial } from "@react-three/drei";
import React from "react";
import * as THREE from 'three'
import { LineBasicMaterial, LineLoop, LineSegments } from "three";

export default function Country(props) {

    const [hover, setHover] = React.useState(false);

    return (
        <lineLoop key={props.key}
        
            onPointerOver={() => {
                setHover(true);
            }}
            onPointerOut={() => {
                setHover(false);
            }}
        >

            <bufferGeometry>
              <bufferAttribute 
              attach="attributes-position" 
              count={props.vertices.length / 3} 
              array={props.vertices} 
              itemSize={3} 
              vertexColors = {true}
              usage ={ THREE.DynamicDrawUsage }
              />
            </bufferGeometry>

            <lineBasicMaterial
            attach="material" 
            color= {hover ? "blue" : "red"}
            size={1000}
            />
        </lineLoop>
    )
}