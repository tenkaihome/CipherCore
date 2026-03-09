"use client";

import React, { useState } from "react";
import { Copy, X, ShieldAlert } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const donateUrl = "https://buymeacoffee.com/0xejebduoo"; 

  return (
    <>
      <header className="h-20 bg-[#050508]/90 border-b border-fuchsia-900/30 flex items-center justify-between px-6 md:px-12 sticky top-0 z-50 w-full backdrop-blur-2xl">
        <div className="flex items-center gap-3.5 group cursor-pointer select-none relative">
          <div className="absolute inset-0 bg-fuchsia-600/20 blur-xl rounded-full scale-150 group-hover:bg-fuchsia-500/30 transition-all opacity-0 group-hover:opacity-100"></div>
          <div className="bg-gradient-to-br from-fuchsia-600 to-purple-800 p-2 rounded-lg border border-fuchsia-400/50 shadow-[0_0_15px_rgba(192,38,211,0.5)] z-10">
            <ShieldAlert className="w-7 h-7 text-white" />
          </div>
          <div className="flex flex-col z-10">
            <span className="text-2xl font-black text-white tracking-tight flex items-center gap-1">
              Cipher<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">Core</span>
            </span>
            <span className="text-[9px] text-fuchsia-300 font-bold uppercase tracking-[0.4em] opacity-80 mt-0.5">
              Cryptography
            </span>
          </div>
        </div>
        
        <div className="flex items-center z-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-transparent hover:bg-fuchsia-500/10 border border-fuchsia-500/50 text-fuchsia-300 font-bold py-2 px-5 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(192,38,211,0.1)] hover:shadow-[0_0_20px_rgba(192,38,211,0.3)] hover:text-white"
          >
            <span className="hidden sm:inline">Fund Project</span>
            <span className="inline sm:hidden">Fund</span>
          </button>
        </div>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#000000]/90 flex items-center justify-center z-[100] backdrop-blur-xl p-4">
          <div className="bg-[#0a0a0f] border border-fuchsia-500/30 rounded-2xl shadow-[0_0_50px_rgba(192,38,211,0.15)] w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-purple-900/30">
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-purple-400">
                Support The Tool
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-purple-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-purple-900/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 flex flex-col items-center space-y-6">
              <p className="text-fuchsia-200 text-center text-sm font-medium">
                Your support keeps CipherCore running securely with zero ads!
              </p>
              
              <div className="bg-white p-4 rounded-xl shadow-[0_0_20px_rgba(192,38,211,0.2)] border-2 border-fuchsia-500/50">
                <QRCodeSVG value={donateUrl} size={160} fgColor="#a21caf" />
              </div>
              
              <div className="w-full pt-4">
                <a
                  href={donateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-[0_4px_15px_rgba(192,38,211,0.4)] hover:shadow-[0_6px_25px_rgba(192,38,211,0.6)]"
                >
                  Donate
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
