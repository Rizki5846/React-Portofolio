import React from 'react';
import { useTheme } from "../../context/themeContext";
import { C, borderRadius } from "../../constants/theme";

export const NotFound = () => {
  const { colors } = useTheme();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: colors.bg,
      color: colors.text,
      fontFamily: colors.mono,
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{
        fontSize: 'clamp(80px, 15vw, 150px)',
        margin: 0,
        color: colors.copper,
        lineHeight: 1,
        textShadow: `0 0 20px ${colors.copper}44`
      }}>
        404
      </h1>
      
      <div style={{
        background: "#0d0d0d", 
        border: `1px solid ${colors.border}`,
        borderRadius: borderRadius.lg, 
        padding: "16px 24px", 
        margin: "30px 0",
        fontFamily: colors.mono, 
        color: colors.copper,
        boxShadow: "inset 0 2px 8px #00000088",
        letterSpacing: 1,
        maxWidth: '100%',
        overflowX: 'hidden'
      }}>
        <span style={{ color: colors.muted, marginRight: 10 }}>&gt;</span>
        <span style={{ color: "#888" }}>Error:</span> Route not found.
        <span style={{ animation: "blink 1s infinite", marginLeft: 8, color: colors.copper }}>▌</span>
      </div>

      <p style={{
        fontSize: '14px',
        color: colors.muted,
        maxWidth: '400px',
        marginBottom: '40px',
        lineHeight: 1.6
      }}>
        Sepertinya Anda tersesat di dimensi yang salah. Jalur yang Anda cari tidak ada di universe ini.
      </p>

      <button
        onClick={() => window.location.href = '/'}
        style={{
          background: `linear-gradient(135deg, ${colors.copper}, ${colors.copperLight})`,
          color: '#1a1a1a',
          border: 'none',
          padding: '12px 28px',
          borderRadius: borderRadius.md,
          fontFamily: colors.mono,
          fontWeight: 'bold',
          fontSize: '14px',
          cursor: 'pointer',
          boxShadow: `0 4px 0 ${colors.copperDim}, 0 6px 20px ${colors.copper}33`,
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(2px)';
          e.currentTarget.style.boxShadow = `0 2px 0 ${colors.copperDim}, 0 4px 10px ${colors.copper}33`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = `0 4px 0 ${colors.copperDim}, 0 6px 20px ${colors.copper}33`;
        }}
      >
        <span>←</span> KEMBALI KE BUMI
      </button>

      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};
