import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title: "Frontend Development",
    description: "Building responsive and performant web applications using modern frameworks and best practices.",
    icon: (
      <svg className="w-12 h-12 transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.22 6.03L17.75 4.09L14.56 4L13.5 1L12.44 4L9.25 4.09L11.78 6.03L10.87 9.09L13.5 7.28L16.13 9.09L15.22 6.03Z" fill="currentColor"/>
        <path d="M19.61 12.25L21.25 11L19.19 10.95L18.5 9L17.81 10.95L15.75 11L17.39 12.25L16.8 14.23L18.5 13.06L20.2 14.23L19.61 12.25Z" fill="currentColor"/>
        <path d="M2 21.5L9 13.5L13 17.5L22 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    gradient: "from-purple-600/20 to-blue-600/20",
    borderGradient: "from-purple-600 to-blue-600"
  },
  {
    title: "Creative UI/UX",
    description: "Crafting intuitive and visually appealing user interfaces with attention to detail and user experience.",
    icon: (
      <svg className="w-12 h-12 transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M17 9.5L17 14.5M7 9.5L7 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 14.5L12 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    gradient: "from-cyan-600/20 to-lime-600/20",
    borderGradient: "from-cyan-600 to-lime-600"
  },
  {
    title: "Responsive Websites",
    description: "Developing mobile-first websites that look and work perfectly across all devices and screen sizes.",
    icon: (
      <svg className="w-12 h-12 transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 8.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 12H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 15.5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    gradient: "from-pink-600/20 to-purple-600/20",
    borderGradient: "from-pink-600 to-purple-600"
  },
  {
    title: "Animation Integration",
    description: "Implementing smooth and engaging animations to enhance user interaction and website aesthetics.",
    icon: (
      <svg className="w-12 h-12 transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.4 12.9L16.9 15.2L18.2 17.9C18.3 18 18.3 18.2 18.2 18.3L16.8 19.7C16.7 19.8 16.5 19.8 16.4 19.7L13.7 18.4L11.4 22.9C11.3 23 11.2 23.1 11 23.1H9C8.8 23.1 8.7 23 8.6 22.9L6.3 18.4L3.6 19.7C3.5 19.8 3.3 19.8 3.2 19.7L1.8 18.3C1.7 18.2 1.7 18 1.8 17.9L3.1 15.2L0.6 12.9C0.5 12.8 0.5 12.6 0.6 12.5L3.1 10.2L1.8 7.5C1.7 7.4 1.7 7.2 1.8 7.1L3.2 5.7C3.3 5.6 3.5 5.6 3.6 5.7L6.3 7L8.6 2.5C8.7 2.4 8.8 2.3 9 2.3H11C11.2 2.3 11.3 2.4 11.4 2.5L13.7 7L16.4 5.7C16.5 5.6 16.7 5.6 16.8 5.7L18.2 7.1C18.3 7.2 18.3 7.4 18.2 7.5L16.9 10.2L21.4 12.5C21.5 12.6 21.5 12.8 21.4 12.9ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    gradient: "from-blue-600/20 to-cyan-600/20",
    borderGradient: "from-blue-600 to-cyan-600"
  }
];

const Services = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax effect for background
      gsap.to('.services-parallax-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Set initial states
      gsap.set(headingRef.current, { opacity: 0, y: 50 });
      gsap.set(cardsRef.current.children, { 
        opacity: 0,
        x: (index) => index % 2 === 0 ? -50 : 50
      });

      // Heading animation
      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none none"
        }
      });

      // Cards animation
      gsap.to(cardsRef.current.children, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden" ref={sectionRef}>
      {/* Parallax Background */}
      <div className="services-parallax-bg absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#00f5a0]/5 via-transparent to-[#00d9f5]/5"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#00f5a0] rounded-full mix-blend-screen filter blur-[120px] animate-pulse opacity-10"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#00d9f5] rounded-full mix-blend-screen filter blur-[120px] animate-pulse opacity-10"></div>
      </div>

      <section className="py-20 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] bg-clip-text text-transparent">
            What I Do
          </h2>
          <p className="text-gray-400 text-lg">Specialized in bringing ideas to life</p>
        </div>

        {/* Services Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={service.title}
              className={`group relative p-8 rounded-2xl bg-gradient-to-br ${service.gradient} backdrop-blur-xl border border-transparent hover:border-white/10 transition-all duration-300`}
              whileHover={{ y: -10 }}
            >
              {/* Service Icon */}
              <div className="text-white mb-6">
                {service.icon}
              </div>

              {/* Service Info */}
              <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 text-sm">{service.description}</p>

              {/* Gradient Border on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

              {/* Corner Accent */}
              <div className={`absolute -top-px -right-px w-16 h-16 bg-gradient-to-bl ${service.borderGradient} opacity-20 rounded-br-2xl rounded-tl-2xl transition-opacity duration-300 group-hover:opacity-40`} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services; 