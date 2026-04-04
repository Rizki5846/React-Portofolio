import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/themeContext";
import { ProjectProvider } from "./context/ProjectContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { InteractiveSection } from "./components/sections/InteractiveSection";
import { Contact } from "./components/sections/Contact";
import { AdminPanel } from "./components/admin/AdminPanel";
import { BackToTop } from "./components/ui/BackToTop";
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
      color: colors.text,
      overflowX: "hidden",
    }}>
      <Navbar activeSection={activeSection} scrollTo={scrollTo} />
      
      {/* Admin Button - Responsive */}
      <button
        onClick={() => setShowAdmin(true)}
        style={{
          position: 'fixed',
          bottom: 'clamp(16px, 4vw, 20px)',
          right: 'clamp(16px, 4vw, 20px)',
          width: 'clamp(40px, 10vw, 45px)',
          height: 'clamp(40px, 10vw, 45px)',
          borderRadius: '50%',
          backgroundColor: colors.copper,
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          zIndex: 99,
          opacity: 0.7,
          transition: 'all 0.3s ease',
          fontSize: 'clamp(18px, 5vw, 20px)',
          boxShadow: colors.shadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0.7';
          e.currentTarget.style.transform = 'scale(1)';
        }}
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
      <BackToTop />
      
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