# React Three Fiber: Customizable 3D product model 

This project uses [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction), [Three.js](https://threejs.org) and [React](https://react.dev) to create a 3D customizable product viewer.  It allows the user to orbit/view the product from different angles, zoom in/out, and to customize parts of the product with a different colour or texture. It imports a 3D model made in Blender onto the website which the user can interact with.

This repository is a personal implementation of the author's work from two tutorials I found in vanilla Javascript and React:
- [How to Build a Color Customizer App for a 3D Model with Three.js by Kyle Wetton](https://tympanus.net/codrops/2019/09/17/how-to-build-a-color-customizer-app-for-a-3d-model-with-three-js)
- [Customizing a 3D Model with React-Three-Fiber by Pavlo M](https://medium.com/@pavlomiko/pavlo-s-keynotes-color-customizer-app-for-a-3d-model-with-react-three-fiber-570621e982ed)

It is for the purpose of personal practice. I've ammended the code so it is written in React/React-Three-Fiber logic and reusable components.

The project was set up using Vite.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## To install
`npm install`

## To run
`npm run dev`

This will run on your localhost, [http://localhost:5173/](http://localhost:5173/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## To Do
- Set up ESlint
- use React hooks for performance optimization
- publish website on GitHub Pages
- Add a loading graphic loop
- On load, animate the model rotating 360 degrees one time, to hint to the user the model can be interactive with
- Try importing a more complex 3D model such as an electric guitar with colour/texture options
