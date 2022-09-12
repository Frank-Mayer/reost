import * as THREE from "https://unpkg.com/three@0.143.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.143.0/examples/jsm/loaders/GLTFLoader.js";

const isWebGLAvailable = () => {
  const canvas = document.createElement("canvas");
  try {
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  } finally {
    canvas.remove();
  }
};

const noWebGL = () => {
  console.error("WebGL not available");
  Array.from(document.getElementsByTagName("canvas")).forEach((x) =>
    x.remove()
  );

  document.body.classList.add("no-webgl");
};

try {
  if (isWebGLAvailable()) {
    const manager = new THREE.LoadingManager();
    manager.onStart = function (url, itemsLoaded, itemsTotal) {
      console.log(
        "Started loading file: " +
          url +
          ".\nLoaded " +
          itemsLoaded +
          " of " +
          itemsTotal +
          " files."
      );
    };

    manager.onLoad = function () {
      console.log("Loading complete!");
    };

    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
      console.log(
        "Loading file: " +
          url +
          ".\nLoaded " +
          itemsLoaded +
          " of " +
          itemsTotal +
          " files."
      );
    };

    manager.onError = function (url) {
      console.log("There was an error loading " + url);
      noWebGL();
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    camera.position.x = -7000;
    camera.position.y = 2000;
    // camera.position.z = -1000;

    const targetCameraPosition = camera.position.clone();
    const targetCameraRotation = camera.rotation.clone();

    const basePosition = camera.position.clone();

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.45);
    dirLight.position.set(-1, 2, 4).normalize();
    scene.add(dirLight);

    const light = new THREE.AmbientLight(0x404040, 0.25);
    scene.add(light);

    scene.fog = new THREE.FogExp2(0x100f15, 0.0002);

    const loader = new GLTFLoader(manager);

    loader.load(
      "https://cdn.reost.de/minecraft-village/scene.gltf",
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
    renderer.outputEncoding = THREE.sRGBEncoding;

    function animate() {
      camera.rotation.x += (targetCameraRotation.x - camera.rotation.x) * 0.005;
      camera.rotation.y += (targetCameraRotation.y - camera.rotation.y) * 0.005;
      camera.rotation.z += (targetCameraRotation.z - camera.rotation.z) * 0.005;
      camera.position.x += (targetCameraPosition.x - camera.position.x) * 0.005;
      camera.position.y += (targetCameraPosition.y - camera.position.y) * 0.005;
      camera.position.z += (targetCameraPosition.z - camera.position.z) * 0.005;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();

    /** @param {{clientX:Number, clientY:number}} ev */
    const updateCamera = (ev) => {
      const mouseX = 1 - (ev.clientX / window.innerWidth) * 2;
      const mouseY = 1 - (ev.clientY / window.innerHeight) * 2;
      targetCameraRotation.x = (mouseY / 10) * Math.PI;
      targetCameraRotation.y = (mouseX / 10) * Math.PI;
      targetCameraPosition.z = basePosition.z - mouseY * 500;
      targetCameraPosition.x = basePosition.x - mouseX * 1000;
    };

    // #region Mouse camera rotation
    window.addEventListener("mousemove", updateCamera);
    // #endregion

    //#region Touch camera rotation
    /** @param {TouchEvent} ev */
    const onTouch = (ev) => {
      const touch = Array.from(ev.touches).reduce((b, a) => {
        a.clientX = (b.clientX + a.clientX) / 2;
        a.clientY = (b.clientY + a.clientY) / 2;
      });

      updateCamera(touch);
    };

    document.addEventListener("touchstart", onTouch);
    document.addEventListener("touchmove", onTouch);
    //#endregion

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
  } else {
    noWebGL();
  }
} catch (err) {
  console.error(err);
  noWebGL();
}
