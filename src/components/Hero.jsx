import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import iam from '../assets/iam.jpg';

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for better sequence control
      const tl = gsap.timeline();

      // Heading animation
      tl.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })
      
      // Subheading animation
      .from(subheadingRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.5") // Start slightly before heading animation ends
      
      // Description animation
      .from(".role-text", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.7")
      
      // Button animation
      .fromTo(".cta-button",
        {
          opacity: 0,
          scale: 0.8,
          y: 20
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.8)"
        }, "-=0.5"
      )
      
      // Avatar container animation
      .fromTo(".avatar-container",
        {
          opacity: 0,
          scale: 0.5,
          rotation: -10
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "power4.out"
        }, "-=0.8"
      );

      // Continuous animations
      gsap.to(".avatar-glow", {
        opacity: 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Scroll arrow animation
      gsap.fromTo(".scroll-arrow",
        {
          opacity: 0,
          y: -20
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          delay: 2.5,
          onComplete: () => {
            gsap.to(".scroll-arrow", {
              y: 10,
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          }
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const particlesOptions = {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 1000
        }
      },
      color: {
        value: ["#00f5a0", "#00d9f5", "#00FFAB"]
      },
      shape: {
        type: ["circle", "triangle"],
        stroke: {
          width: 0
        }
      },
      opacity: {
        value: 0.6,
        random: true,
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.5,
          sync: false
        }
      },
      links: {
        enable: true,
        distance: 150,
        color: "#00FFAB",
        opacity: 0.3,
        width: 1,
        triangles: {
          enable: true,
          opacity: 0.05
        }
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "bounce"
        },
        attract: {
          enable: true,
          rotateX: 1200,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: true,
          mode: ["grab", "bubble"]
        },
        onClick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 180,
          links: {
            opacity: 0.8,
            color: "#00f5a0"
          }
        },
        bubble: {
          distance: 200,
          size: 6,
          duration: 2,
          opacity: 0.8
        },
        push: {
          quantity: 6
        }
      }
    },
    background: {
      color: "#0f0f0f"
    },
    fullScreen: {
      enable: false,
      zIndex: -1
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white overflow-hidden relative">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0"
      />

      {/* Hero Section */}
      <section ref={heroRef} className="h-screen flex items-center justify-between px-8 md:px-16 lg:px-24 relative z-10">
        {/* Left Side - Text Content */}
        <div className="w-full md:w-1/2">
          <div ref={textRef} className="space-y-6">
            <h1 
              ref={headingRef}
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#00f5a0] via-[#00d9f5] to-[#00FFAB] bg-clip-text text-transparent"
            >
              Hi, I'm Prakash Patel <span className='text-yellow-300'>👋</span>
            </h1>
            <div 
              ref={subheadingRef}
              className="text-2xl md:text-3xl font-light"
            >
              Turning Ideas Into 
              <br />
              <span className="text-[#00FFAB] font-medium">Digital Reality ✨</span>
            </div>
            <p className="role-text text-gray-400 text-lg">
              Full Stack Developer | UI/UX Designer | Tech Enthusiast
            </p>
          </div>
          
          <motion.button
            className="cta-button mt-12 px-10 py-4 border-2 border-[#00FFAB] rounded-full text-lg font-medium text-[#00FFAB] hover:bg-[#00FFAB] hover:text-[#0f0f0f] transition-all duration-300 relative overflow-hidden group"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 255, 171, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Explore My Work</span>
            <motion.div
              className="absolute inset-0 bg-[#00FFAB] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              style={{ zIndex: 0 }}
            />
          </motion.button>
        </div>

        {/* Right Side - Avatar */}
        <div className="hidden md:block w-1/2 relative">
          <Tilt className="Tilt" options={{ max: 25, scale: 1.05, perspective: 1000 }}>
            <div className="Tilt-inner p-4 avatar-container relative">
              {/* Main Container */}
              <div className="relative w-80 h-80">
                {/* Background Circles */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-0 left-0 w-full h-full animate-spin-slow">
                    <div className="w-2 h-2 bg-[#00f5a0] rounded-full absolute top-0 left-1/2" />
                    <div className="w-2 h-2 bg-[#00d9f5] rounded-full absolute bottom-0 left-1/2" />
                    <div className="w-2 h-2 bg-[#00FFAB] rounded-full absolute left-0 top-1/2" />
                    <div className="w-2 h-2 bg-[#00f5a0] rounded-full absolute right-0 top-1/2" />
                  </div>
                </div>

                {/* Outer Ring */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72">
                  <div className="absolute inset-0 rounded-full border-2 border-[#00FFAB] opacity-20 animate-ping-slow" />
                  <div className="absolute inset-0 rounded-full border-2 border-[#00f5a0] opacity-20 animate-reverse-spin" />
                </div>

                {/* Main Avatar Container */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 ">
                  <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#00f5a0] via-[#00d9f5] to-[#00FFAB] p-1">
                    {/* Glow Effect */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-[#00f5a0] via-[#00d9f5] to-[#00FFAB] rounded-2xl opacity-30 blur-xl animate-pulse" />
                    
                    {/* Image Container */}
                    <div className="relative w-full h-full rounded-xl bg-[#0f0f0f] overflow-hidden group">
                      {/* Add your image here */}
                      <img 
                        src={iam}
                        alt="Aditya Raj"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Overlay with tech stack icons */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <div className="flex items-center justify-center space-x-4">
                            {/* Tech stack icons */}
                            <span className="text-3xl">⚛️</span>
                            <span className="text-3xl">🎨</span>
                            <span className="text-3xl">💻</span>
                            <span className="text-3xl">🚀</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <div className="absolute top-5 right-10 animate-float">
                    <div className="w-3 h-3 bg-[#00f5a0] rounded-full" />
                  </div>
                  <div className="absolute bottom-10 left-5 animate-float-delayed">
                    <div className="w-2 h-2 bg-[#00d9f5] rounded-full" />
                  </div>
                  <div className="absolute top-1/2 right-0 animate-float-slow">
                    <div className="w-4 h-4 bg-[#00FFAB] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
        </div>
      </section>

      {/* Scroll Down Arrow */}
      <div className="scroll-arrow absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <motion.div
          className="w-8 h-8 border-2 border-[#00FFAB] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#00FFAB] hover:text-[#0f0f0f] transition-all duration-300 shadow-lg shadow-[#00FFAB]/20"
        >
          ↓
        </motion.div>
      </div>
    </div>
  );
};

export default Hero; 