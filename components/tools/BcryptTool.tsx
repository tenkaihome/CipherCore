import React, { useState } from "react";
import { Lock, RefreshCw, Copy, CheckCircle2 } from "lucide-react";
import bcrypt from "bcryptjs"; // Will need to install this in dev3

export default function BcryptTool() {
  const [input, setInput] = useState<string>("");
  const [rounds, setRounds] = useState<number>(10);
  const [hash, setHash] = useState<string>("");
  const [verifyInput, setVerifyInput] = useState<string>("");
  const [verifyHash, setVerifyHash] = useState<string>("");
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  const generateHash = () => {
    if (!input) return;
    try {
      const salt = bcrypt.genSaltSync(rounds);
      const output = bcrypt.hashSync(input, salt);
      setHash(output);
      setVerifyInput(input);
      setVerifyHash(output);
      setIsMatch(null);
    } catch (err) {
      console.error(err);
    }
  };

  const verify = () => {
    if (!verifyInput || !verifyHash) return;
    try {
      const match = bcrypt.compareSync(verifyInput, verifyHash);
      setIsMatch(match);
    } catch (err) {
      setIsMatch(false);
    }
  };

  const copyHash = () => {
    if (!hash) return;
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0f] text-gray-200 p-8 rounded-2xl border border-purple-900/50 relative overflow-y-auto">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.1),transparent_50%)] pointer-events-none"></div>
      
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-purple-900/30">
        <div className="p-3 bg-fuchsia-600/20 rounded-xl border border-fuchsia-500/30">
          <Lock className="text-fuchsia-400 w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-purple-400">
            Bcrypt Generator & Verifier
          </h2>
          <p className="text-sm text-purple-300/60 mt-1 font-medium">Securely hash and verify passwords using bcrypt</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 z-10 relative">
        {/* Generator */}
        <div className="bg-[#111118] p-6 rounded-2xl border border-purple-800/20 shadow-[0_0_30px_rgba(168,85,247,0.05)]">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-fuchsia-500"></span> Generate Hash
          </h3>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-purple-300 mb-2">Plain Text</label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-[#1a1a24] border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-purple-300 mb-2">Cost Factor (Rounds: {rounds})</label>
              <input
                type="range"
                min="4"
                max="12"
                value={rounds}
                onChange={(e) => setRounds(parseInt(e.target.value))}
                className="w-full accent-fuchsia-500"
              />
            </div>
            <button
              onClick={generateHash}
              className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(192,38,211,0.3)] hover:shadow-[0_0_30px_rgba(192,38,211,0.5)] flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" /> Generate Hash
            </button>
            
            {hash && (
              <div className="mt-6 pt-6 border-t border-purple-900/30">
                <label className="block text-sm font-semibold text-purple-300 mb-2">Result Hash</label>
                <div className="relative group">
                  <div className="w-full bg-[#1a1a24] border border-fuchsia-500/30 rounded-xl px-4 py-4 text-fuchsia-100 font-mono break-all pr-12 text-sm leading-relaxed">
                    {hash}
                  </div>
                  <button
                    onClick={copyHash}
                    className="absolute top-1/2 -translate-y-1/2 right-3 text-purple-400 hover:text-white p-2 rounded-lg hover:bg-purple-500/20 transition-colors"
                  >
                    {copied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Verifier */}
        <div className="bg-[#111118] p-6 rounded-2xl border border-purple-800/20 shadow-[0_0_30px_rgba(168,85,247,0.05)]">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Verify Hash
          </h3>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-purple-300 mb-2">Hash to verify</label>
              <input
                type="text"
                value={verifyHash}
                onChange={(e) => setVerifyHash(e.target.value)}
                placeholder="$2a$10$..."
                className="w-full bg-[#1a1a24] border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-purple-300 mb-2">Plain Text</label>
              <input
                type="text"
                value={verifyInput}
                onChange={(e) => setVerifyInput(e.target.value)}
                placeholder="Password to check against hash"
                className="w-full bg-[#1a1a24] border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
              />
            </div>
            <button
              onClick={verify}
              className="w-full bg-[#1a1a24] border border-purple-500/30 hover:bg-[#20202d] text-cyan-400 font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" /> Compare
            </button>
            
            {isMatch !== null && (
              <div className={`mt-6 p-4 rounded-xl border flex items-center justify-center font-bold text-lg ${
                isMatch 
                  ? "bg-green-500/10 border-green-500/30 text-green-400" 
                  : "bg-red-500/10 border-red-500/30 text-red-500"
              }`}>
                {isMatch ? "✅ MATCH" : "❌ DO NOT MATCH"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
