import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: "Apple Vision Pro Clone",
    description: "A stunning 3D UI clone of Apple Vision Pro website with smooth animations and interactions.",
    tech: ["React", "Three.js", "GSAP", "Tailwind"],
    image: "/vision-pro.jpg",
    liveLink: "#",
    githubLink: "#",
    color: "#FF3CAC"
  },
  {
    title: "iPhone 15 3D Model",
    description: "Interactive 3D iPhone model showcase with React Three Fiber and realistic lighting.",
    tech: ["React", "Three Fiber", "Drei", "GSAP"],
    image: "/iphone-15.jpg",
    liveLink: "#",
    githubLink: "#",
    color: "#4158D0"
  },
  {
    title: "E-Commerce Store",
    description: "Full-featured clothing store with shopping cart, checkout, and payment integration.",
    tech: ["Next.js", "MongoDB", "Stripe", "Tailwind"],
    image: "/ecommerce.jpg",
    liveLink: "#",
    githubLink: "#",
    color: "#00f5a0"
  },
  {
    title: "Music Player",
    description: "Clean and minimal music player with intuitive controls and smooth animations.",
    tech: ["React", "Howler.js", "GSAP", "Tailwind"],
    image: "/music-player.jpg",
    liveLink: "#",
    githubLink: "#",
    color: "#FF5733"
  },
  {
    title: "Refokus Clone",
    description: "Pixel-perfect clone of Refokus agency website with modern animations.",
    tech: ["Next.js", "Framer Motion", "GSAP", "Tailwind"],
    image: "/refokus.jpg",
    liveLink: "#",
    githubLink: "#",
    color: "#8B5CF6"
  }
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scroll effect for background
      gsap.to('.parallax-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Fade in title with scroll
      gsap.from('.projects-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.projects-title',
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1
        }
      });

      // Reveal cards with scroll
      gsap.from('.projects-container', {
        y: 200,
        opacity: 0,
        scale: 0.8,
        scrollTrigger: {
          trigger: '.projects-container',
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const nextProject = () => {
    setDirection(1);
    const next = (activeProject + 1) % projectsData.length;

    // Exit animation for current project
    gsap.to(cardsRef.current[activeProject], {
      scale: 0.7,
      opacity: 0,
      filter: 'blur(10px)',
      rotateZ: -10,
      duration: 0.8,
      ease: 'power2.inOut'
    });

    setActiveProject(next);

    // Enter animation for next project
    gsap.fromTo(cardsRef.current[next],
      {
        scale: 1.3,
        opacity: 0,
        filter: 'blur(10px)',
        rotateZ: 10
      },
      {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        rotateZ: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      }
    );

    // Animate background elements
    gsap.fromTo('.bg-accent',
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, stagger: 0.2 }
    );
  };

  const prevProject = () => {
    setDirection(-1);
    const prev = (activeProject - 1 + projectsData.length) % projectsData.length;

    // Exit animation for current project
    gsap.to(cardsRef.current[activeProject], {
      scale: 1.3,
      opacity: 0,
      filter: 'blur(10px)',
      rotateZ: 10,
      duration: 0.8,
      ease: 'power2.inOut'
    });

    setActiveProject(prev);

    // Enter animation for previous project
    gsap.fromTo(cardsRef.current[prev],
      {
        scale: 0.7,
        opacity: 0,
        filter: 'blur(10px)',
        rotateZ: -10
      },
      {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        rotateZ: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      }
    );

    // Animate background elements
    gsap.fromTo('.bg-accent',
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, stagger: 0.2 }
    );
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#0a0a0a] py-20 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="parallax-bg absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#00f5a0]/5 via-transparent to-[#00d9f5]/5"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#00f5a0] rounded-full mix-blend-screen filter blur-[120px] animate-pulse opacity-10"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#00d9f5] rounded-full mix-blend-screen filter blur-[120px] animate-pulse opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Title with scroll reveal */}
        <div className="text-center mb-20 relative overflow-hidden">
          <h2 className="projects-title text-8xl md:text-9xl font-bold bg-clip-text text-transparent 
            bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] relative z-10 tracking-tight">
            Projects
          </h2>
        </div>

        {/* Projects Container */}
        <div 
          ref={containerRef}
          className="projects-container relative h-[700px]"
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={project.title}
              ref={el => cardsRef.current[index] = el}
              className="project-card absolute top-0 left-0 w-full h-full"
              style={{
                opacity: index === activeProject ? 1 : 0,
                pointerEvents: index === activeProject ? 'auto' : 'none'
              }}
            >
              <div className="relative w-full h-full group">
                <motion.div 
                  className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10
                    shadow-[0_0_50px_rgba(0,245,160,0.1)] overflow-hidden transform-gpu
                    transition-all duration-500 group-hover:shadow-[0_0_80px_rgba(0,245,160,0.2)]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Content with staggered reveal */}
                  <div className="h-full flex flex-col">
                    <motion.div 
                      className="mb-8"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <motion.h3 
                        className="text-5xl font-bold text-white mb-4 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-400 text-lg leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        {project.description}
                      </motion.p>
                    </motion.div>

                    {/* Preview with reveal animation */}
                    <motion.div 
                      className="flex-1 relative rounded-2xl overflow-hidden mb-8 group/preview
                        shadow-[0_10px_40px_rgba(0,0,0,0.3)] transform-gpu"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/0"></div>
                      <motion.div 
                        className="absolute inset-0"
                        style={{ 
                          background: `linear-gradient(45deg, ${project.color}, transparent)`
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="relative h-full flex items-center justify-center bg-black/20">
                        <motion.span 
                          className="text-9xl"
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            duration: 0.6,
                            delay: 0.6,
                            type: "spring",
                            stiffness: 200
                          }}
                        >
                          🖥️
                        </motion.span>
                      </div>
                    </motion.div>

                    {/* Footer with staggered animations */}
                    <div className="space-y-8">
                      <motion.div 
                        className="flex flex-wrap gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                      >
                        {project.tech.map((tech, i) => (
                          <motion.span
                            key={tech}
                            className="px-4 py-2 rounded-xl text-white text-sm
                              border border-white/10 backdrop-blur-md relative overflow-hidden group/tech"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.8 + (i * 0.1) }}
                          >
                            <span className="relative z-10">{tech}</span>
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-[#00f5a0]/20 to-[#00d9f5]/20"
                              initial={{ x: '-100%' }}
                              whileHover={{ x: '0%' }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.span>
                        ))}
                      </motion.div>

                      <motion.div 
                        className="flex gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                      >
                        <motion.a
                          href={project.liveLink}
                          className="flex-1 py-4 rounded-xl text-black font-medium text-center text-lg relative overflow-hidden group/btn"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            background: 'linear-gradient(45deg, #00f5a0, #00d9f5)'
                          }}
                        >
                          <span className="relative z-10">View Live Demo</span>
                          <motion.div 
                            className="absolute inset-0 bg-white"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '0%' }}
                            transition={{ duration: 0.3 }}
                            style={{ opacity: 0.2 }}
                          />
                        </motion.a>
                        <motion.a
                          href={project.githubLink}
                          className="flex-1 py-4 rounded-xl font-medium text-center text-lg relative overflow-hidden
                            border border-[#00f5a0] text-[#00f5a0] group/btn"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="relative z-10">Source Code</span>
                          <motion.div 
                            className="absolute inset-0 bg-[#00f5a0]"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '0%' }}
                            transition={{ duration: 0.3 }}
                            style={{ opacity: 0.1 }}
                          />
                        </motion.a>
                      </motion.div>
                    </div>
                  </div>

                  {/* Animated background accents */}
                  <motion.div 
                    className="bg-accent absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#00f5a0]/10 to-transparent rounded-full blur-3xl"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  <motion.div 
                    className="bg-accent absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#00d9f5]/10 to-transparent rounded-full blur-3xl"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Navigation */}
          <div className="absolute left-1/2 bottom-4 -translate-x-1/2 flex gap-8 z-50">
            <motion.button
              className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center
                text-white border border-white/10 hover:border-[#00f5a0]/50 transition-colors duration-300"
              onClick={prevProject}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ←
            </motion.button>
            <motion.button
              className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center
                text-white border border-white/10 hover:border-[#00f5a0]/50 transition-colors duration-300"
              onClick={nextProject}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              →
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects; 