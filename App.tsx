
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundVideo from './components/BackgroundVideo';
import VampireScene from './components/VampireScene';
import SocialButtons from './components/SocialButtons';
import Hero from './components/Hero';
import TechArsenal from './components/TechArsenal';

const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Prevent Mouse Move logic
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    // --- SECURITY PROTOCOLS ---
    // Disable Right-Click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable Inspection Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+I (Inspect) or Cmd+Opt+I
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.keyCode === 73 || e.key === 'i')) {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+J (Console) or Cmd+Opt+J
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.keyCode === 74 || e.key === 'j')) {
        e.preventDefault();
        return false;
      }
      // Ctrl+U (View Source) or Cmd+Opt+U
      if ((e.ctrlKey || e.metaKey) && (e.keyCode === 85 || e.key === 'u')) {
        e.preventDefault();
        return false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden select-none">
      <AnimatePresence>
        {!hasEntered ? (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center relative z-10"
            >
              <h1 className="text-8xl md:text-[12rem] font-brand text-white mb-16 tracking-tighter text-glow-red">
                NEGANOX
              </h1>
              <motion.button 
                onClick={() => setHasEntered(true)}
                whileHover={{ scale: 1.05, letterSpacing: "1em" }}
                className="group relative px-20 py-6 border border-red-900 bg-transparent text-red-600 font-tech text-xl tracking-[0.6em] uppercase transition-all duration-700"
              >
                <div className="absolute inset-0 w-0 bg-red-900/20 transition-all duration-500 group-hover:w-full"></div>
                <span className="relative z-10">WELCOME</span>
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full min-h-screen"
          >
            <BackgroundVideo isActive={hasEntered} />
            
            <div className="relative z-10 w-full min-h-screen flex flex-col p-8 md:p-20">
              <header className="flex justify-between items-center mb-16">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-brand text-4xl text-white tracking-widest flex items-center gap-6"
                >
                  <div className="w-12 h-[1px] bg-red-600"></div>
                  NEGANOX
                </motion.div>
              </header>

              <main className="flex-1 flex flex-col md:flex-row gap-20 items-center justify-between">
                <Hero />
                <TechArsenal />
              </main>

              <footer className="mt-20 flex flex-col md:flex-row justify-between items-end gap-12">
                <SocialButtons />
                <div className="text-right">
                  <div className="font-tech text-xs text-red-600 tracking-[0.4em] mb-2 uppercase">Core Languages</div>
                  <div className="font-mono text-[10px] text-zinc-500 space-x-4">
                    <span>C++</span>
                    <span>C#</span>
                    <span>PYTHON</span>
                    <span>TYPESCRIPT</span>
                  </div>
                </div>
              </footer>
            </div>

            {/* Subtle 3D Depth Particles */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
              <VampireScene mousePos={mousePos} />
            </div>

            {/* Cinematic Overlays */}
            <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
