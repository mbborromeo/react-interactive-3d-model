import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { MeshPhongMaterial, TextureLoader, RepeatWrapping } from 'three'

import { colors } from './data/colors' // Note: some colors have a texture instead of color code

const BACKGROUND_COLOR = '#f1f1f1';

const INITIAL_MTL = new MeshPhongMaterial({
  color: BACKGROUND_COLOR,
  shininess: 10 // To Fix: value doesn't seem to make a difference
});

const MAP_PARTS_TO_COLOURS = [
  {childID: "legs", mtl: INITIAL_MTL},
  {childID: "cushions", mtl: INITIAL_MTL},
  {childID: "base", mtl: INITIAL_MTL},
  {childID: "supports", mtl: INITIAL_MTL},
  {childID: "back", mtl: INITIAL_MTL}
];

const Model = (props) => {
  // Enable shadow casting on the actual GLTF meshes.
  // gltf.scene is a group, so the real mesh children need castShadow = true.
  // Reference: https://medium.com/@pavlomiko/pavlo-s-keynotes-color-customizer-app-for-a-3d-model-with-react-three-fiber-570621e982ed

  useEffect(() => {
    const initColor = (part, material) => {
      props.model.traverse(object => {
        if (object.isMesh && object.name.includes(part)) {
          object.castShadow = true;
          object.receiveShadow = true;
          object.material = material;
          object.nameID = part;
        }
      });
    }
    
    if (props.model) {
      for (let i of MAP_PARTS_TO_COLOURS) {
          initColor(i.childID, i.mtl);
      }
    }
  }, [props.model])

  return (
    <primitive 
      {...props} 
      object={props.model} 
      receiveShadow
      castShadow
    />
  )
}

const Floor = () => {
  return (
    <mesh
        position={[0,-1,0]}
        receiveShadow
        rotation={[-0.5 * Math.PI, 0, 0]}
    >
        <planeGeometry args={[5000,5000,1,1]} />
        <meshPhongMaterial
            color='#eeeeee'
            shininess={0}
        />
    </mesh>
  )
}

const ColourButtons = ({model, part}) => {
  const setMaterial = (material) => {
    model.traverse((obj) => {
      if (obj.isMesh && obj.nameID != null) {
        if (obj.nameID == part) {
            obj.material = material;
        }
      }
    });
  }

  const handleClick = (i) => {
    const colorObj = colors[parseInt(i)];

    let newMaterial;

    if(colorObj.texture){
      const textureSettings = new TextureLoader().load(colorObj.texture);
      textureSettings.repeat.set( colorObj.size[0], colorObj.size[1], colorObj.size[2]);
      textureSettings.wrapS = RepeatWrapping;
      textureSettings.wrapT = RepeatWrapping;
      
      newMaterial = new MeshPhongMaterial( {
        map: textureSettings,
        shininess: colorObj.shininess ? colorObj.shininess : 10
      });    
    } 
    else {
      newMaterial = new MeshPhongMaterial({
        color: `#${colorObj.color}`,
        shininess: colorObj.shininess ? colorObj.shininess : 10
      });
    }
    
    setMaterial(newMaterial);
  }

  return colors.map((item, i) => (
    <div 
      className="tray__swatch" 
      style={ item.texture ? {backgroundImage: `url(${item.texture})`} : {background: `#${item.color}`} } 
      key={`color-${i}`}
      onClick={() => handleClick(i)}
    ></div>
  ))
}

const OptionButtons = ({ activeOption, onSelect }) => {
  return (
    <div className="options">
      {MAP_PARTS_TO_COLOURS.map((obj) => (
        <div
          key={obj.childID}
          id={obj.childID}
          className={`option ${activeOption === obj.childID ? '--is-active' : ''}`}
          onClick={() => onSelect(obj.childID)}
        >
          <img src={`/images/buttons/${obj.childID}.svg`} alt={obj.childID} />
        </div>
      ))}
    </div>
  )
}

export default function App() {
  // Reference JS tutorial: https://tympanus.net/codrops/2019/09/17/how-to-build-a-color-customizer-app-for-a-3d-model-with-three-js/
  const gltf = useGLTF('/model/chair.glb')
  const theModel = gltf.scene

  const [activeOption, setActiveOption] = useState('legs');

  return (
    <>
      <div id="canvas-wrap">
        <Canvas 
          shadows
          // gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}
          camera={{ fov: 50, near: 0.1, far: 1000, position: [0, 0, 5] }}
        >
          <OrbitControls 
            //  args={[camera, domElement]}
            enablePan={false}
          />

          <hemisphereLight 
            color="white" 
            groundColor="white"
            intensity={0.61}
            position={[0, 50, 0]}
            // castShadow
          />
          <directionalLight 
            color="white" 
            position={[-8, 12, 8]} 
            intensity={0.54}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          
          <color 
            attach="background" 
            args={[BACKGROUND_COLOR]} 
          />

          <fog attach="fog" args={[BACKGROUND_COLOR, 20, 100]} />

          <Floor />
          
          <Suspense>
            <Model 
              scale={[2, 2, 2]} 
              position-y={-1}
              rotation-y={Math.PI}
              model={theModel}
            />
          </Suspense>
        </Canvas>
      </div>
    
      <div className="controls">
        <div className="info">
          <div className="info__message">
            <p>
              <strong>&nbsp;Grab</strong> to rotate chair. 
              <strong>&nbsp;Scroll</strong> to zoom. 
              {/* <strong>&nbsp;Drag&nbsp;</strong> swatches to view more. */}
              <strong>&nbsp;Select</strong> part then colour buttons to customise.
            </p>
          </div>
        </div>

        <div id="js-tray" className="tray">
            <div id="js-tray-slide" className="tray__slide">
              <ColourButtons model={theModel} part={activeOption} />
            </div>
        </div>
      </div>

      <div className="options">
          <OptionButtons activeOption={activeOption} onSelect={setActiveOption} />
      </div>
    </>
  )
}
