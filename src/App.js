import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Linkedin, Github, X, Mail, Phone, ExternalLink, Menu, Instagram, MessageCircle } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';

const App = () => {
  // State for mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State for the dynamically generated banner image
  const [bannerImageUrl, setBannerImageUrl] = useState('');
  const [isBannerLoading, setIsBannerLoading] = useState(true);

  // Helper component for navigation links with a consistent style and smooth scroll
  const NavLink = ({ to, children, onClick }) => {
    const handleScroll = (e) => {
      e.preventDefault();
      const targetElement = document.getElementById(to);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      if (onClick) {
        onClick();
      }
    };
    return (
      <a
        href={`#${to}`}
        onClick={handleScroll}
        className="text-lg font-bold text-gray-900 hover:text-gray-600 hover:scale-105 transition-all duration-200"
      >
        {children}
      </a>
    );
  };

  // Reusable component for section headings
  const SectionHeading = ({ children }) => (
    <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
      {children}
    </h2>
  );

  // Helper component for social media icons with dynamic colors and hover effects
  const SocialLink = ({ href, children, brand }) => {
    let color = "#1a202c"; // Default dark gray
    let hoverColor = "#4a5568";
    switch (brand) {
      case 'linkedin':
        color = "#0A66C2";
        hoverColor = "#004182";
        break;
      case 'github':
        color = "#1a202c";
        hoverColor = "#4a5568";
        break;
      case 'x':
        color = "#1a202c";
        hoverColor = "#000000";
        break;
      default:
        break;
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full hover:bg-gray-200 transition-colors duration-200 transform hover:scale-110"
      >
        {React.cloneElement(children, { size: 28, style: { color: color } })}
      </a>
    );
  };

  // Helper component for contact social media icons with a hover effect
  const SocialContactLink = ({ href, children, brand }) => {
    let colorClass;
    let hoverColorClass;

    // We use a switch to determine the Tailwind color classes to avoid dynamic string concatenation
    // This allows Tailwind to correctly generate the CSS for these classes
    switch (brand) {
        case 'mail':
            colorClass = "text-red-500";
            hoverColorClass = "hover:text-red-700";
            break;
        case 'whatsapp':
            colorClass = "text-green-500";
            hoverColorClass = "hover:text-green-700";
            break;
        case 'phone':
            colorClass = "text-blue-500";
            hoverColorClass = "hover:text-blue-700";
            break;
        case 'instagram':
            colorClass = "text-pink-600";
            hoverColorClass = "hover:text-pink-800";
            break;
        case 'x':
            colorClass = "text-gray-900";
            hoverColorClass = "hover:text-black";
            break;
        default:
            colorClass = "text-gray-900";
            hoverColorClass = "hover:text-gray-700";
            break;
    }

    return (
        <a href={href} className="group flex flex-col items-center transition-transform duration-300 transform hover:scale-110">
            {React.cloneElement(children, {
                className: `w-12 h-12 ${colorClass} ${hoverColorClass} transition-colors duration-200`,
            })}
            <span className="mt-2 text-sm font-semibold text-gray-700">{brand.charAt(0).toUpperCase() + brand.slice(1)}</span>
        </a>
    )
  }

  // Function to generate the banner image using Imagen API
  const generateBannerImage = async () => {
    setIsBannerLoading(true);
    const userPrompt = "A high-resolution, professional, minimalist white banner background with a very subtle, elegant geometric texture. The overall feel should be clean and modern.";
    const payload = {
        instances: [{ prompt: userPrompt }],
        parameters: { "sampleCount": 1 }
    };
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const result = await response.json();
        // Updated logic to safely check for the image data
        if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
            const base64Data = result.predictions[0].bytesBase64Encoded;
            setBannerImageUrl(`data:image/png;base64,${base64Data}`);
        } else {
            console.error("Image generation failed. API response was missing expected data structure:", result);
            setBannerImageUrl(process.env.PUBLIC_URL + '/images/bann.png');
        }
    } catch (e) {
        console.error("Error generating banner image:", e);
        setBannerImageUrl(process.env.PUBLIC_URL + '/images/bann.png');
    } finally {
        setIsBannerLoading(false);
    }
  };

  useEffect(() => {
    generateBannerImage();
  }, []);

  const projects = [
    {
      title: 'Project Alpha',
      description: 'A web application built to solve a common industry problem. It focuses on clean design and robust back-end logic.',
      imageUrl: 'https://placehold.co/600x400/e0f2fe/0c4a6e?text=Project+Alpha',
      link: '#'
    },
    {
      title: 'Project Beta',
      description: 'A mobile-first app designed to connect people with local events in real-time. It features a sleek, user-friendly interface.',
      imageUrl: 'https://placehold.co/600x400/e0f7fa/004d40?text=Project+Beta',
      link: '#'
    },
    {
      title: 'Project Gamma',
      description: 'A powerful data visualization tool that processes complex datasets into interactive and easy-to-understand charts.',
      imageUrl: 'https://placehold.co/600x400/fff3e0/ff6f00?text=Project+Gamma',
      link: '#'
    }
  ];

  const skills = ['React', 'Node.js', 'React Native', 'Firebase', 'TypeScript', 'Python', 'Tailwind CSS'];

  const hobbies = [
    { name: 'Watching', img: process.env.PUBLIC_URL +'/images/football.png' },
    { name: 'Hiking', img: process.env.PUBLIC_URL +'/images/hiking.png' },
    { name: 'Playing', img:process.env.PUBLIC_URL + '/images/playing.png' },
    { name: 'Bike Ride', img: process.env.PUBLIC_URL +'/images/riding.png' },
    { name: 'Photography', img:process.env.PUBLIC_URL + '/images/wterfalls.png' },
    { name: 'Reading', img: process.env.PUBLIC_URL +'/images/reading.png' },
  ];

  // Reusable component for animating sections on scroll
  const AnimatedSection = ({ id, children }) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    const springProps = useSpring({
      opacity: inView ? 1 : 0,
      y: inView ? 0 : 50,
      config: { duration: 500, tension: 200, friction: 20 },
    });

    return (
      <animated.section
        id={id}
        ref={ref}
        style={springProps}
        className="py-16"
      >
        {children}
      </animated.section>
    );
  };
  
  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      {/* Header and Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-lg">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-4xl font-bold text-gray-900">Overview</div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="home">Home</NavLink>
            <NavLink to="projects">Projects</NavLink>
            <NavLink to="thoughts">Thoughts</NavLink>
            <NavLink to="hobbies">Hobbies</NavLink>
            <NavLink to="contact">Contact</NavLink>
          </div>
          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-900 focus:outline-none transform transition-transform duration-300">
              {isMenuOpen ? <X size={28} className="rotate-180" /> : <Menu size={28} className="rotate-0" />}
            </button>
          </div>
        </nav>
        {/* Mobile Navigation Dropdown */}
        <div className={`md:hidden overflow-hidden transition-max-h duration-300 ease-in-out ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="flex flex-col space-y-4 px-6 py-4 bg-white shadow-inner">
            <NavLink to="home" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            <NavLink to="projects" onClick={() => setIsMenuOpen(false)}>Projects</NavLink>
            <NavLink to="thoughts" onClick={() => setIsMenuOpen(false)}>Thoughts</NavLink>
            <NavLink to="hobbies" onClick={() => setIsMenuOpen(false)}>Hobbies</NavLink>
            <NavLink to="contact" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
          </div>
        </div>
      </header>

      <main className="min-h-screen">
        {/* Home Section (Now includes About Me) */}
        <section id="home">
          {/* Hero Section */}
          <div className="relative flex flex-col items-center justify-end text-center h-[80vh] pb-10">
            <div className="absolute inset-0 z-0">
              {isBannerLoading ? (
                <div className="flex items-center justify-center w-full h-full bg-gray-200">
                  <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-gray-900"></div>
                </div>
              ) : (
                <img
                  src={bannerImageUrl}
                  alt="Banner Background"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black opacity-0"></div>
            </div>
            <div className="relative z-10 flex flex-col items-center">
             <img
                src={process.env.PUBLIC_URL +"/images/IMG_20250325_162438931_HDR.jpg"}
                  alt="Profile"
                    className="w-48 h-52 rounded-full border-4 border-white shadow-xl mb-0 object-cover object-top"
                     />
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-2 text-black drop-shadow-lg">
                ajumohmd
              </h1>
              <p className="text-2xl md:text-3xl text-gray-30 font-bold mb-8 drop-shadow-md">
                Front End Developer
              </p>
              <div className="flex justify-center space-x-6">
                <SocialLink href="https://linkedin.com/in/ajmal-p-v-49a9371a0" brand="linkedin">
                  <Linkedin />
                </SocialLink>
                <SocialLink href="https://github.com/ajumohmd" brand="github">
                  <Github />
                </SocialLink>
              </div>
            </div>
          </div>
          
          {/* About Me content now directly follows the hero section */}
          <div className="container mx-auto px-6 max-w-4xl pt-6 pb-16">
            <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">About Me</h2>
            <div className="text-lg text-gray-700 leading-relaxed text-center">
              <p>
                I am a dedicated web developer based in Kerala, India, passionate about creating clean, efficient, and user-friendly web applications. 
                Specializing in React, Node.js, and modern web technologies, I enjoy solving complex problems and building scalable solutions. 
                Driven by curiosity and a commitment to continuous learning, I strive to deliver high-quality code with a focus on user experience. 
                My mission is to contribute to projects that make a meaningful impact in the digital world.
              </p>
            </div>
          </div>
        </section>
        
        {/* Projects Section */}
        <AnimatedSection id="projects">
          <div className="container mx-auto px-6 max-w-7xl">
            <SectionHeading>Projects</SectionHeading>
            <div className="flex flex-wrap justify-center gap-2 mb-10 text-sm text-gray-600 font-medium tracking-wide">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-3 py-1 rounded-full text-gray-700 transition-transform duration-200 transform hover:scale-110 hover:bg-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={project.imageUrl}
                    alt={`Placeholder for ${project.title}`}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-bold mb-2 text-gray-900">{project.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center text-base font-bold text-gray-900 hover:text-indigo-600 transition-colors"
                    >
                      View Project <ExternalLink size={18} className="ml-2" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
        
        {/* Thoughts Section */}
        <AnimatedSection id="thoughts">
          <div className="container mx-auto px-6 max-w-4xl">
            <SectionHeading>Thoughts</SectionHeading>
            <div className="max-w-3xl mx-auto text-center mb-8">
                <p className="text-lg leading-relaxed text-gray-700 mb-12">
                    I believe that good behavior is the cornerstone of a civilized society and personal success. It's about showing respect, empathy, and kindness, not because it's easy, but because it's right. These values are the foundation of strong relationships and a positive impact on the world around us.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-blue-50 p-6 rounded-lg shadow-xl text-center italic transition-transform duration-300 transform hover:scale-105">
                    <p>“The best of people are those who are most beneficial to people.”</p>
                    <p className="mt-2 font-semibold">― Prophet Muhammad ﷺ</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg shadow-xl text-center italic transition-transform duration-300 transform hover:scale-105">
                    <p>"Simplicity is the ultimate sophistication."</p>
                    <p className="mt-2 font-semibold">- Leonardo da Vinci</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg shadow-xl text-center italic transition-transform duration-300 transform hover:scale-105">
                    <p>"The world is a dangerous place to live, not because of the people who are evil, but because of the people who don't do anything about it."</p>
                    <p className="mt-2 font-semibold">- Albert Einstein</p>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <img src={process.env.PUBLIC_URL +"/images/teressa.png"} alt="Image 1" className="rounded-lg w-full h-26  object-cover shadow-lg transform hover:scale-105 transition-transform duration-300"></img>
                <img src={process.env.PUBLIC_URL +"/images/gandhi.png" }alt="Image 2" className="rounded-lg w-full h-26 object-cover shadow-lg transform hover:scale-105 transition-transform duration-300"></img>
                <img src={process.env.PUBLIC_URL +"/images/abraham.png" }alt="Image 1" className="rounded-lg w-full h-26 object-cover shadow-lg transform hover:scale-105 transition-transform duration-300"></img>
                <img src={process.env.PUBLIC_URL +"/images/nelson.png" }alt="Image 1" className="rounded-lg w-full h-26 object-cover shadow-lg transform hover:scale-105 transition-transform duration-300"></img>
            </div>
          </div>
        </AnimatedSection>

        {/* Hobbies Section */}
        <AnimatedSection id="hobbies">
          <div className="container mx-auto px-6 max-w-7xl">
            <SectionHeading>My Hobbies</SectionHeading>
            <div className="text-center text-lg text-gray-700 leading-relaxed mb-12">
              <p>
                In my free time, I love to explore various hobbies that help me relax and stay creative. From outdoor adventures to quiet moments of reflection, these activities help me find balance and inspiration.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {hobbies.map((hobby, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-200"
                >
                  <img
                    src={hobby.img}
                    alt={hobby.name}
                    className="w-full h-48 object-cover opacity-90"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-center  group-hover:bg-opacity-50 transition-colors">
                    <p className="text-white text-lower font-semibold text-lg">
                      {hobby.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection id="contact">
          <div className="container mx-auto px-6 max-w-3xl">
            <SectionHeading>Get in Touch</SectionHeading>
            <div className="max-w-xl mx-auto text-center text-lg text-gray-700">
              <p className="mb-8">
                I'm always open to new opportunities and collaborations. Feel free to reach out!
              </p>
              <div className="flex flex-wrap justify-center items-center space-x-6 space-y-4 sm:space-y-0">
                <SocialContactLink href="mailto:your.ajumohmd@gmail.com" brand="mail">
                  <Mail />
                </SocialContactLink>
                <SocialContactLink href="https://wa.me/96893186068" brand="whatsapp">
                  <MessageCircle />
                </SocialContactLink>
                <SocialContactLink href="tel:+968 93186068" brand="phone">
                  <Phone />
                </SocialContactLink>
                <SocialContactLink href="https://www.instagram.com/_aju0" brand="instagram">
                  <Instagram />
                </SocialContactLink>
                <SocialContactLink href="https://x.com/ajumohmd" brand="x">
                  <X />
                </SocialContactLink>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      {/* Professional Footer */}
      <footer className="bg-gray-900 text-gray-400 p-8 text-center shadow-inner">
        <div className="container mx-auto">
          <p className="text-sm">© {new Date().getFullYear()} ajumohmd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
