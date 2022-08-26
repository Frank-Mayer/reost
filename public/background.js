import * as THREE from "https://unpkg.com/three@0.143.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.143.0/examples/jsm/loaders/GLTFLoader.js";

const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
};

const noWebGL = () => {
  Array.from(document.getElementsByTagName("canvas")).forEach((x) =>
    x.remove()
  );

  document.body.classList.remove("webgl");
};

try {
  if (isWebGLAvailable()) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      100000
    );
    camera.position.x = -7000;
    camera.position.y = 2000;
    // camera.position.z = -1000;

    const basePosition = camera.position.clone();

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.75);
    dirLight.position.set(-1, 2, 4).normalize();
    scene.add(dirLight);

    const light = new THREE.AmbientLight(0x404040, 0.45);
    scene.add(light);

    scene.fog = new THREE.FogExp2(0x100f15, 0.0001);

    const loader = new GLTFLoader();

    loader.load(
      "https://9d2b5e49e3a1a66b6693d10905d3e691.r2.cloudflarestorage.com/reost-de/scene.gltf",
      function (gltf) {
        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    const renderer = new THREE.WebGLRenderer({
      precision: "lowp",
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    // #region Mouse camera rotation
    window.addEventListener("mousemove", (ev) => {
      const mouseX = 1 - (ev.clientX / window.innerWidth) * 2;
      const mouseY = 1 - (ev.clientY / window.innerHeight) * 2;
      camera.rotation.x = (mouseY / 10) * Math.PI;
      camera.rotation.y = (mouseX / 10) * Math.PI;
      camera.position.z = basePosition.z - mouseY * 500;
      camera.position.x = basePosition.x - mouseX * 1000;
    });
    // #endregion

    //#region Auto Resize
    let resizeTimeout = undefined;
    window.addEventListener("resize", () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
        resizeTimeout = undefined;
      }

      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

        resizeTimeout = undefined;
      }, 250);
    });
    //#endregion

    document.body.classList.add("webgl");
  } else {
    noWebGL();
  }
} catch {
  noWebGL();
}
