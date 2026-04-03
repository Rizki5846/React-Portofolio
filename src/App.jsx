import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/themeContext";
import { ProjectProvider } from "./context/projectContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { InteractiveSection } from "./components/sections/InteractiveSection";
import { Contact } from "./components/sections/Contact";
import { AdminPanel } from "./components/admin/AdminPanel";
import { useTheme } from "./context/themeContext";
import "./styles/animations.css";

function AppContent() {
  const { colors } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const [showAdmin, setShowAdmin] = useState(false);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 62;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      setActiveSection(id);
    }
  };

  // Admin shortcut (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAdmin(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "contact"];
    const observerOptions = {
      rootMargin: "-62px 0px 0px 0px",
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ 
      background: colors.bg, 
      minHeight: "100vh", 
      fontFamily: colors.sans, 
      color: colors.text 
    }}>
      <Navbar activeSection={activeSection} scrollTo={scrollTo} />
      
      {/* Admin Button */}
      <button
        onClick={() => setShowAdmin(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: colors.copper,
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          zIndex: 99,
          opacity: 0.5,
          transition: 'opacity 0.2s',
          fontSize: '20px',
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
        title="Admin Panel (Ctrl+Shift+A)"
      >
        ⚙️
      </button>
      
      <Hero scrollTo={scrollTo} />
      <About />
      <Skills />
      <Projects />
      <InteractiveSection />
      <Contact />
      <Footer />
      
      {showAdmin && (
        <AdminPanel onClose={() => setShowAdmin(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ProjectProvider>
        <AppContent />
      </ProjectProvider>
    </ThemeProvider>
  );
}

export default App;