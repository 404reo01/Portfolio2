import React from 'react';

export default function Contact() {
  return (
    <div id="Contact" className="min-h-[60vh] flex flex-col items-center justify-center font-pixel px-4 py-20 relative">
      
      {/* Titre avec effet de lueur */}
      <h2 className="text-4xl text-[#f5f5dc] mb-12 uppercase tracking-[0.3em] drop-shadow-[0_0_10px_rgba(245,245,220,0.5)]">
        Mission Accomplished
      </h2>

      <div className="w-full max-w-2xl bg-black/60 border-4 border-[#f5f5dc] p-8 md:p-12 relative shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-md">
        
        {/* Coins décoratifs (Style HUD) */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-red-500 -translate-x-2 -translate-y-2"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-red-500 translate-x-2 -translate-y-2"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-red-500 -translate-x-2 translate-y-2"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-red-500 translate-x-2 translate-y-2"></div>

        <div className="text-center space-y-8">
          <p className="text-[#f5f5dc] text-sm md:text-base leading-relaxed opacity-90 italic">
            "L'aventure ne fait que commencer. Pour recruter ce développeur dans votre équipe ou discuter d'une quête future, utilisez les canaux de communication ci-dessous."
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            
            {/* Slot Email */}
            <a 
              href="mailto:rayan.el.ouazzani01@gmail.com"
              className="group relative border-2 border-[#f5f5dc]/30 p-4 hover:border-red-500 transition-colors bg-white/5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-red-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <div className="relative z-10 flex flex-col items-center gap-2">
                <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Send Transmission</span>
                <span className="text-xs md:text-sm text-[#f5f5dc] break-all">rayan.el.ouazzani01@gmail.com</span>
              </div>
            </a>

            {/* Slot LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/rayan-el-ouazzani-529a86214/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative border-2 border-[#f5f5dc]/30 p-4 hover:border-blue-500 transition-colors bg-white/5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <div className="relative z-10 flex flex-col items-center gap-2">
                <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Connect Network</span>
                <span className="text-xs md:text-sm text-[#f5f5dc]">LinkedIn Profile</span>
              </div>
            </a>

          </div>

          {/* Footer du terminal */}
          <div className="pt-8 flex flex-col items-center gap-2">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#f5f5dc]/20 to-transparent"></div>
            <span className="text-[10px] text-[#f5f5dc]/40 uppercase tracking-[0.5em]">
              Status: Available for hire
            </span>
          </div>
        </div>

        {/* Effet de scanline (balayage écran) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <div className="w-full h-1/2 bg-gradient-to-b from-transparent via-white to-transparent absolute top-0 left-0 animate-[scan_4s_linear_infinite]"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          from { transform: translateY(-100%); }
          to { transform: translateY(200%); }
        }
      `}</style>
    </div>
  );
}