import React, { useState, useRef } from "react";
import Button from "./button.jsx";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const clipPolygon = "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const totalVideos = 4;

  const nextVideoRef = useRef(null);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  useGSAP(() => {
    if (hasClicked) {
      gsap.set("#next-video", { visibility: "visible" });
      gsap.to("#next-video", {
        scale: 1,
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
        onStart: () => nextVideoRef.current.play(),
      });
      gsap.from("#current-video", {
        transformOrigin: "center center",
        scale: 0.1,
        duration: 1,
        ease: "power1.inOut",
      });
      gsap.from("#next-video", {
        transformOrigin: "center center",
        scale: 0.5,
        duration: 1,
        ease: "power1.inOut",
      });
    }
  }, { dependencies: [currentIndex], revertOnUpdate: true });

  // useGSAP(() => {
  //   gsap.set("#video-frame", {
  //     clipPath: clipPolygon,
  //     WebkitClipPath: clipPolygon,
  //   });
  // });

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-screen w-screen overflow-hidden m-0 p-0">
      {/* Black Gaming text - positioned behind the clipPath, visible everywhere */}
      <h1
        className="gmg-txt special-font hero-heading absolute bottom-[5%] right-[5%] z-5 text-black font-[Zentry] select-none pointer-events-none"
        style={{
          textShadow: "0 0 0 #fff0", // Remove antialiasing blur
          fontSize: "10rem", // Larger size
          fontWeight: "bold", // Bolder text
        }}
      >
        G<b>a</b>ming
      </h1>
      
      <div
        id="video-frame"
        className="relative h-screen w-screen overflow-hidden m-0 p-0"
        style={{
          // Sync the mask polygon for video frame and white text
          clipPath: clipPolygon,
          WebkitClipPath: clipPolygon,
          zIndex: 10,
        }}
      >
      {/* Main background video */}
      <video
        src={getVideoSrc(currentIndex)}
        id="current-video"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 h-full w-full object-cover"
      />

      {/* Mini video with hover effect */}
      <div className="absolute inset-0 z-50 flex items-center justify-center group">
        <div
          onClick={handleMiniVdClick}
          id="mini-video-container"
          className="pointer-events-auto opacity-0 scale-11 "
        >
          <video
            ref={nextVideoRef}
            src={getVideoSrc((currentIndex % totalVideos) + 1)}
            id="next-video"
            loop
            muted
            playsInline
            className="w-64 h-64 object-cover object-center rounded-xl"
          />
        </div>
      </div>

      {/* Top Left Text */}
      <div className="txt-cnt absolute left-0 top-0 z-30 w-full h-full text-[#DFDFF2] pointer-events-none">
        <div className="px-5 sm:px-10">
          <h1 id="redine-txt" className="sr-font special-font hero-heading font-[Zentry]">redifi<b>n</b>e</h1>
          <p className="max-w-64 font-robert-regular text-blue-100">
            Enter the Metagame <br /> Unleash the Play Economy
          </p>
          <Button
            id="watch-trailer"
            title="Watch Trailer"
            leftIcon={<TiLocationArrow />}
            containerClass="!bg-yellow-300 sr-btn flex-center gap-1"
          />
        </div>
      </div>

      </div>
      
      {/* White Gaming text - visible ONLY INSIDE the clipPath */}
      <div
        className="pointer-events-none select-none absolute top-0 left-0 w-full h-full z-50"
        style={{
          clipPath: clipPolygon,
          WebkitClipPath: clipPolygon,
        }}
      >
        <h1
          className="gmg-txt special-font hero-heading absolute bottom-[5%] right-[5%] text-white font-[Zentry]"
          style={{
            textShadow: "3px 3px 6px rgba(0,0,0,0.8)",
            fontSize: "10rem",
            fontWeight: "bold",
          }}
        >
          G<b>a</b>ming
        </h1>
      </div>
    </div>
  );
};

export default Hero;
