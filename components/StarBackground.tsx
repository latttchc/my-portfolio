"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function StarBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const particles = 4000;
        const speed = 20;
        const dim = 200;

        const renderer = new THREE.WebGLRenderer({ canvas, preserveDrawingBuffer: true, alpha: true });
        renderer.autoClearColor = false;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(90, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 0;

        const vertices: number[] = [];
        for (let i = 0; i < particles; i++) {
            const x = dim * 8 * (Math.random() - 0.5);
            const y = dim * 2 * (Math.random() - 0.5);
            const z = -dim * Math.random();
            vertices.push(x, y, z);
        }

        const starGeo = new THREE.BufferGeometry();
        starGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const starMat = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.5,
            transparent: true,
            depthTest: false,
        });

        const starPoints = new THREE.Points(starGeo, starMat);

        const fadeGeo = new THREE.PlaneGeometry(1, 1);
        const fadeMat = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.4,
        });
        const fadePlate = new THREE.Mesh(fadeGeo, fadeMat);
        fadePlate.renderOrder = -1;
        fadePlate.position.z = -0.1;

        scene.add(fadePlate);
        scene.add(starPoints);

        const draw = () => {
            if (
                canvas.height !== canvas.clientHeight ||
                canvas.width !== canvas.clientWidth
            ) {
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
            }

            starGeo.attributes.position.needsUpdate = true;
            const p = starGeo.attributes.position.array as Float32Array;
            for (let i = 0; i < p.length; i += 3) {
                const z = p[i + 2];
                if (z >= 0) {
                    p[i] = dim * 8 * (Math.random() - 0.5);
                    p[i + 1] = dim * 2 * (Math.random() - 0.5);
                    p[i + 2] = -dim;
                } else {
                    p[i + 2] += -speed / p[i + 2];
                }
            }

            renderer.render(scene, camera);
            requestAnimationFrame(draw);
        };

        draw();
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="canvas"
            className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none"
        />

    );
}
