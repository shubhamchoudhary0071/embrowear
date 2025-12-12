"use client";
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'gsap';

// Define types for refs
interface TshirtRef extends THREE.Group {}
interface MountRef extends HTMLDivElement {}
interface LoadingBarRef extends HTMLDivElement {}

const Customize: React.FC = () => {
  const mountRef = useRef<MountRef | null>(null);
  const loadingBarRef = useRef<LoadingBarRef | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const tshirtRef = useRef<TshirtRef | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#ffffff');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const colors = [
    { name: 'White', value: '#ffffff', bgClass: 'bg-white' },
    { name: 'Black', value: '#000000', bgClass: 'bg-black' },
    { name: 'Red', value: '#ef4444', bgClass: 'bg-red-500' },
    { name: 'Blue', value: '#3b82f6', bgClass: 'bg-blue-500' },
    { name: 'Green', value: '#22c55e', bgClass: 'bg-green-500' },
    { name: 'Yellow', value: '#eab308', bgClass: 'bg-yellow-500' },
    { name: 'Purple', value: '#a855f7', bgClass: 'bg-purple-500' },
    { name: 'Pink', value: '#ec4899', bgClass: 'bg-pink-500' },
  ];

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // Create a simple t-shirt geometry as fallback
    const createTshirt = (): THREE.Group => {
      const group = new THREE.Group();

      // Main body
      const bodyGeometry = new THREE.BoxGeometry(2, 2.5, 0.1);
      const bodyMaterial = new THREE.MeshLambertMaterial({ color: selectedColor });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.name = 'tshirt_body';
      body.castShadow = true;
      body.receiveShadow = true;
      group.add(body);

      // Sleeves
      const sleeveGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.1);
      const sleeveMaterial = new THREE.MeshLambertMaterial({ color: selectedColor });

      const leftSleeve = new THREE.Mesh(sleeveGeometry, sleeveMaterial);
      leftSleeve.position.set(-1.4, 0.8, 0);
      leftSleeve.name = 'tshirt_sleeve';
      leftSleeve.castShadow = true;
      leftSleeve.receiveShadow = true;
      group.add(leftSleeve);

      const rightSleeve = new THREE.Mesh(sleeveGeometry, sleeveMaterial);
      rightSleeve.position.set(1.4, 0.8, 0);
      rightSleeve.name = 'tshirt_sleeve';
      rightSleeve.castShadow = true;
      rightSleeve.receiveShadow = true;
      group.add(rightSleeve);

      // Collar
      const collarGeometry = new THREE.RingGeometry(0.3, 0.5, 16);
      const collarMaterial = new THREE.MeshLambertMaterial({ color: selectedColor });
      const collar = new THREE.Mesh(collarGeometry, collarMaterial);
      collar.position.set(0, 1, 0.05);
      collar.name = 'tshirt_collar';
      collar.castShadow = true;
      collar.receiveShadow = true;
      group.add(collar);

      return group;
    };

    // Loading manager for GLB model
    const loadingManager = new THREE.LoadingManager(
      () => {
        gsap.to(loadingBarRef.current, {
          duration: 1.5,
          scaleX: 0,
          ease: 'power2.inOut',
          onComplete: () => {
            if (loadingBarRef.current) {
              loadingBarRef.current.style.display = 'none';
            }
            setIsLoading(false);
          },
        });
      },
      (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded / itemsTotal;
        if (loadingBarRef.current) {
          gsap.to(loadingBarRef.current, {
            scaleX: progressRatio,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      }
    );

    // Load GLB model with DRACOLoader
    const loadTshirt = async () => {
      try {
        const loader = new GLTFLoader(loadingManager);
        const dracoLoader = new DRACOLoader();
        // Use CDN for Draco decoder
        dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.167.1/examples/jsm/libs/draco/');
        loader.setDRACOLoader(dracoLoader);

        loader.load(
          '/models/tshirt.glb', // Verify this path
          (gltf) => {
            const tshirt = gltf.scene as THREE.Group;
            tshirt.scale.set(1, 1, 1);

            tshirt.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshLambertMaterial({ color: selectedColor });
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });

            scene.add(tshirt);
            tshirtRef.current = tshirt;

            // Start GSAP rotation animation
            gsap.to(tshirt.rotation, {
              y: '+=2',
              duration: 10,
              repeat: -1,
              ease: 'none',
            });
          },
          undefined,
          (error) => {
            console.error('Error loading GLB:', error);
            setLoadError('Failed to load GLB model. Using fallback design.');

            // Fallback to 3D t-shirt
            const tshirt = createTshirt();
            scene.add(tshirt);
            tshirtRef.current = tshirt;

            // Start GSAP rotation for fallback
            gsap.to(tshirt.rotation, {
              y: '+=2',
              duration: 10,
              repeat: -1,
              ease: 'none',
            });
          }
        );
      } catch (error) {
        console.error('Error initializing GLTFLoader:', error);
        setLoadError('GLTFLoader not available. Using fallback design.');

        // Fallback to 3D t-shirt
        const tshirt = createTshirt();
        scene.add(tshirt);
        tshirtRef.current = tshirt;

        // Start GSAP rotation for fallback
        gsap.to(tshirt.rotation, {
          y: '+=2',
          duration: 10,
          repeat: -1,
          ease: 'none',
        });
      }
    };

    loadTshirt();

    // Mouse controls for rotation
    let mouseX = 0;
    let mouseY = 0;
    let isMouseDown = false;

    const handleMouseDown = (event: MouseEvent) => {
      isMouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (tshirtRef.current) {
        gsap.killTweensOf(tshirtRef.current.rotation); // Pause GSAP rotation
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isMouseDown || !tshirtRef.current) return;

      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;

      gsap.to(tshirtRef.current.rotation, {
        y: `+=${deltaX * 0.01}`,
        x: `+=${deltaY * 0.01}`,
        duration: 0.2,
        ease: 'power2.out',
      });

      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      if (tshirtRef.current) {
        // Resume GSAP rotation
        gsap.to(tshirtRef.current.rotation, {
          y: '+=2',
          duration: 10,
          repeat: -1,
          ease: 'none',
        });
      }
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (sceneRef.current && rendererRef.current) {
        rendererRef.current.render(sceneRef.current, camera);
      }
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (mountRef.current && rendererRef.current?.domElement) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      gsap.killTweensOf(tshirtRef.current?.rotation);
    };
  }, []);

  // Update t-shirt color
  useEffect(() => {
    if (!tshirtRef.current) return;

    tshirtRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.color.setHex(parseInt(selectedColor.replace('#', ''), 16));
      }
    });
  }, [selectedColor]);

  const handleColorChange = (color: { value: string }) => {
    setSelectedColor(color.value);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">3D T-Shirt Designer Studio</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium text-gray-800 mb-4">3D Design Canvas</h4>
            <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300 relative">
              <div
                ref={mountRef}
                className="w-full h-96 rounded-lg shadow-sm bg-white"
                style={{ minHeight: '400px' }}
              />
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-lg">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mx-auto mb-2"></div>
                    <div
                      ref={loadingBarRef}
                      className="w-3/4 h-2 bg-gray-200 rounded-full overflow-hidden"
                    >
                      <div className="h-full bg-gray-800 transform scale-x-0 origin-left"></div>
                    </div>
                    <p className="text-gray-600 mt-2">Loading 3D Model...</p>
                  </div>
                </div>
              )}
              {loadError && (
                <div className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg text-sm">
                  {loadError}
                </div>
              )}
              <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white px-2 py-1 rounded">
                Click and drag to rotate
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Customization Options</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Base Color</label>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => handleColorChange(color)}
                        className={`w-12 h-12 rounded-full border-2 ${
                          selectedColor === color.value
                            ? 'border-gray-800 ring-2 ring-gray-300'
                            : 'border-gray-300 hover:border-gray-400'
                        } ${color.bgClass} transition-all duration-200`}
                        title={color.name}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Selected: {colors.find((c) => c.value === selectedColor)?.name || 'Custom'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                    <option>XL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Design Elements</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="p-3 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                      Add Text
                    </button>
                    <button className="p-3 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                      Add Logo
                    </button>
                    <button className="p-3 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                      Upload Image
                    </button>
                    <button className="p-3 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                      Add Pattern
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-800">Total: $34.99</span>
              </div>
              <button className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;