import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tilt } from 'react-tilt';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    id: 1,
    name: "Frontend Development",
    icon: "💻",
    description: "Building beautiful user interfaces",
    skills: ["React", "JavaScript",'Tailwind CSS', "HTML", "CSS"],
    color: "from-[#FF3CAC] to-[#784BA0]"
  },
  {
    id: 2,
    name: "Backend Development", 
    icon: "⚡",
    description: "Creating robust server solutions",
    skills: ["Node.js", "MongoDB", "ExpressJs"],
    color: "from-[#4158D0] to-[#C850C0]"
  },
  {
    id: 3,
    name: "UI/UX Design",
    icon: "🎨",
    description: "Designing modern interfaces",
    skills: ["Figma", "Tailwind", "GSAP", "Framer"],
    color: "from-[#0093E9] to-[#80D0C7]"
  },
  {
    id: 4,
    name: "Development Tools",
    icon: "🛠",
    description: "Using modern dev tools",
    skills: ["Git", "VS Code", "Postman"],
    color: "from-[#00f5a0] to-[#00d9f5]"
  }
];

const About = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for background
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

      // Heading animation
      gsap.from('.about-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.about-title',
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1
        }
      });

      // Content animation
      gsap.from('.about-content', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 70%',
          end: 'top 50%',
          scrub: 1
        }
      });

      // Skills cards animation
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen bg-[#0a0a0a] py-20 overflow-hidden">
      {/* Parallax Background */}
      <div className="parallax-bg absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#00f5a0]/5 via-transparent to-[#00d9f5]/5"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#00f5a0] rounded-full mix-blend-screen filter blur-[120px] animate-pulse opacity-10"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#00d9f5] rounded-full mix-blend-screen filter blur-[120px] animate-pulse opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="about-title text-8xl md:text-9xl font-bold bg-clip-text text-transparent 
            bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] tracking-tight">
            About Me
          </h2>
        </div>

        {/* Content */}
        <div className="about-content mb-20">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-2xl text-gray-200 leading-relaxed">
              I'm a passionate Full Stack Developer who loves creating beautiful and functional web experiences.
            </p>
            <p className="text-xl text-gray-400 leading-relaxed">
              With expertise in modern web technologies and a keen eye for design, I transform ideas into elegant digital solutions.
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <Tilt key={skill.id} options={{ max: 25, scale: 1.05 }}>
              <motion.div
                ref={el => cardsRef.current[index] = el}
                className="skill-card group relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10
                  hover:border-white/20 transition-all duration-500"
                whileHover={{ y: -10 }}
              >
                {/* Card Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl">{skill.icon}</span>
                    <h3 className="text-2xl font-bold text-white">{skill.name}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 mb-8">{skill.description}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-3">
                    {skill.skills.map((item, i) => (
                      <motion.span
                        key={i}
                        className={`px-4 py-2 rounded-xl text-white text-sm
                          bg-gradient-to-r ${skill.color} bg-opacity-10 backdrop-blur-md
                          border border-white/10 hover:border-white/20 transition-all duration-300`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 
                  group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
              </motion.div>
            </Tilt>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "6+", label: "Months Experience" },
            { value: "15+", label: "Projects Completed" },
            { value: "10+", label: "Technologies" },
            { value: "5+", label: "Happy Clients" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00f5a0]/20 to-[#00d9f5]/20 rounded-xl 
                blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 
                hover:border-white/20 transition-all duration-500">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#00f5a0] to-[#00d9f5] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About; 