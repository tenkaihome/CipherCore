"use client";

import React, { useState } from "react";
import Header from "@/components/Header";

// Tool components
import JsonPrettify from "@/components/tools/JsonPrettify";
import JsonMinify from "@/components/tools/JsonMinify";
import RandomPort from "@/components/tools/RandomPort";
import RegexTester from "@/components/tools/RegexTester";
import NotImplemented from "@/components/tools/NotImplemented";
import ChmodCalculator from "@/components/tools/ChmodCalculator";
import JsonToCsv from "@/components/tools/JsonToCsv";
import SqlPrettify from "@/components/tools/SqlPrettify";
import YamlPrettify from "@/components/tools/YamlPrettify";
import XmlFormatter from "@/components/tools/XmlFormatter";
import EmailNormalizer from "@/components/tools/EmailNormalizer";
import CrontabGenerator from "@/components/tools/CrontabGenerator";
import DockerRunToCompose from "@/components/tools/DockerRunToCompose";
import GitCheatsheet from "@/components/tools/GitCheatsheet";
import RegexCheatsheet from "@/components/tools/RegexCheatsheet";
import BcryptTool from "@/components/tools/BcryptTool";

import { 
  GitBranch, Server, Clock, Braces, List, Database, 
  FileText, Box, CodeXml, AlignLeft, Mail, WholeWord,
  FileCode2, ShieldAlert
} from "lucide-react";

const toolsList = [
  { id: "bcrypt", name: "Bcrypt Hash", icon: <ShieldAlert className="w-4 h-4 text-fuchsia-400" /> },
  { id: "json-prettify", name: "JSON Formatter", icon: <Braces className="w-4 h-4 text-purple-400" /> },
  { id: "json-minify", name: "JSON Minifier", icon: <Braces className="w-4 h-4 text-purple-400" /> },
  { id: "json-csv", name: "JSON to CSV", icon: <List className="w-4 h-4 text-purple-400" /> },
  { id: "sql-prettify", name: "SQL Formatter", icon: <Database className="w-4 h-4 text-purple-400" /> },
  { id: "xml-formatter", name: "XML Formatter", icon: <CodeXml className="w-4 h-4 text-purple-400" /> },
  { id: "yaml-prettify", name: "YAML Formatter", icon: <AlignLeft className="w-4 h-4 text-purple-400" /> },
  { id: "regex-tester", name: "Regex Tester", icon: <WholeWord className="w-4 h-4 text-purple-400" /> },
  { id: "regex-cheatsheet", name: "Regex Guide", icon: <FileCode2 className="w-4 h-4 text-purple-400" /> },
  { id: "random-port", name: "Port Gen", icon: <Server className="w-4 h-4 text-purple-400" /> },
  { id: "crontab", name: "Crontab", icon: <Clock className="w-4 h-4 text-purple-400" /> },
  { id: "chmod", name: "Chmod", icon: <FileText className="w-4 h-4 text-purple-400" /> },
  { id: "docker-run-compose", name: "Docker Compose", icon: <Box className="w-4 h-4 text-purple-400" /> },
  { id: "email-normalizer", name: "Email Norm", icon: <Mail className="w-4 h-4 text-purple-400" /> },
  { id: "git-cheatsheet", name: "Git Guide", icon: <GitBranch className="w-4 h-4 text-purple-400" /> },
];

export default function Home() {
  const [activeToolId, setActiveToolId] = useState("bcrypt");

  const renderTool = () => {
    switch (activeToolId) {
      case "bcrypt": return <BcryptTool />;
      case "json-prettify": return <JsonPrettify />;
      case "json-minify": return <JsonMinify />;
      case "random-port": return <RandomPort />;
      case "regex-tester": return <RegexTester />;
      case "chmod": return <ChmodCalculator />;
      case "json-csv": return <JsonToCsv />;
      case "sql-prettify": return <SqlPrettify />;
      case "yaml-prettify": return <YamlPrettify />;
      case "xml-formatter": return <XmlFormatter />;
      case "email-normalizer": return <EmailNormalizer />;
      case "crontab": return <CrontabGenerator />;
      case "docker-run-compose": return <DockerRunToCompose />;
      case "git-cheatsheet": return <GitCheatsheet />;
      case "regex-cheatsheet": return <RegexCheatsheet />;
      default: return <NotImplemented />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#050508] relative text-purple-50">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#160024_1px,transparent_1px),linear-gradient(to_bottom,#160024_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>
      
      <Header />
      
      {/* Horizontal Nav */}
      <nav className="w-full border-b border-purple-900/30 bg-[#0a0a0f]/80 backdrop-blur-xl sticky top-20 z-10 hidden scrollbar-hide sm:flex overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 p-3 px-6 shrink-0 w-max">
          {toolsList.map(tool => (
            <button
              key={tool.id}
              onClick={() => setActiveToolId(tool.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                activeToolId === tool.id 
                  ? "bg-fuchsia-600/20 text-fuchsia-300 border border-fuchsia-500/30 shadow-[0_0_15px_rgba(192,38,211,0.2)]" 
                  : "text-purple-400 hover:text-fuchsia-200 hover:bg-purple-900/40 border border-transparent"
              }`}
            >
              {tool.icon}
              {tool.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto p-4 sm:p-8 pt-10 flex flex-col z-0 relative">
        <div className="w-full h-full flex-1 flex flex-col items-center">
          <div className="w-full max-w-4xl bg-[#0a0a0f] border border-purple-900/50 rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.05)] overflow-hidden min-h-[600px] mb-12">
            {renderTool()}
          </div>
        </div>
      </main>
    </div>
  );
}
