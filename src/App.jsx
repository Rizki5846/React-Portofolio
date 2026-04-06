import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "./context/themeContext";
import { ProjectProvider } from "./context/ProjectContext";
import { AuthProvider, useAuth } from "./context/authContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { InteractiveSection } from "./components/sections/InteractiveSection";
import { Contact } from "./components/sections/Contact";
import { AdminPanel } from "./components/admin/AdminPanel";
import { LoginModal } from "./components/admin/LoginModal";
import { BackToTop } from "./components/ui/BackToTop";
import { CustomCursor } from "./components/ui/CustomCursor";
import { NotFound } from "./components/ui/NotFound";
import { useTheme } from "./context/themeContext";
import "./styles/animations.css";

function AppContent() {
  const { colors } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("home");
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Basic route listener for popstate (in case of back/forward navigation)
    window.addEventListener("popstate", () => setCurrentPath(window.location.pathname));
    return () => window.removeEventListener("popstate", () => setCurrentPath(window.location.pathname));
  }, []);

  if (currentPath !== "/" && currentPath !== "/index.html") {
    return (
      <div style={{ background: colors.bg, minHeight: "100vh", fontFamily: colors.sans, color: colors.text, cursor: "none" }}>
        <CustomCursor />
        <NotFound />
      </div>
    );
  }

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

  // Keyboard shortcut Ctrl+Shift+A
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        if (isAuthenticated) {
          setShowAdmin(prev => !prev);
        } else {
          setShowLogin(true);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAuthenticated]);

  // Scroll observer
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

  const handleAdminButtonClick = () => {
    if (isAuthenticated) {
      setShowAdmin(true);
    } else {
      setShowLogin(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowAdmin(true);
  };

  const handleAdminClose = () => {
    setShowAdmin(false);
  };

  return (
    <div style={{ 
      background: colors.bg, 
      minHeight: "100vh", 
      fontFamily: colors.sans, 
      color: colors.text,
      overflowX: "hidden",
      cursor: "none",
    }}>
      <CustomCursor />
      <Navbar activeSection={activeSection} scrollTo={scrollTo} />
      
      {/* Admin Button */}
      <div style={{ position: 'fixed', bottom: 'clamp(16px, 4vw, 20px)', right: 'clamp(16px, 4vw, 20px)', zIndex: 99, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
        {/* Logout button — hanya muncul saat sudah login */}
        {isAuthenticated && (
          <button
            onClick={logout}
            title="Logout dari Admin"
            style={{
              padding: '6px 12px',
              borderRadius: 20,
              backgroundColor: 'rgba(239,68,68,0.15)',
              border: '1px solid rgba(239,68,68,0.4)',
              color: '#f87171',
              cursor: 'pointer',
              fontSize: 11,
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.15)';
            }}
          >
            🚪 Logout
          </button>
        )}
        <button
          onClick={handleAdminButtonClick}
          style={{
            width: 'clamp(40px, 10vw, 45px)',
            height: 'clamp(40px, 10vw, 45px)',
            borderRadius: '50%',
            backgroundColor: isAuthenticated ? colors.copper : 'rgba(100,100,100,0.6)',
            border: isAuthenticated ? 'none' : '1px solid rgba(255,255,255,0.15)',
            color: '#fff',
            cursor: 'pointer',
            opacity: 0.8,
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
            e.currentTarget.style.opacity = '0.8';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title={isAuthenticated ? "Buka Admin Panel (Ctrl+Shift+A)" : "Login sebagai Admin (Ctrl+Shift+A)"}
        >
          {isAuthenticated ? '⚙️' : '🔒'}
        </button>
      </div>
      
      <Hero scrollTo={scrollTo} />
      <About />
      <Skills />
      <Projects />
      <InteractiveSection />
      <Contact />
      <Footer />
      <BackToTop />
      
      {/* Login Modal */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      {/* Admin Panel — hanya bisa dibuka setelah login */}
      {showAdmin && isAuthenticated && (
        <AdminPanel onClose={handleAdminClose} />
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProjectProvider>
          <AppContent />
          <Analytics />
        </ProjectProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;