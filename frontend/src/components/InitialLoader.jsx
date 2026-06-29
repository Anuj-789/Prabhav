function InitialLoader() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white">

      {/* Glow Ring */}
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-4 border-white/10"></div>
        <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-blue-400 border-r-cyan-400 animate-spin"></div>
      </div>

      {/* Brand */}
      <h1 className="mt-6 text-4xl font-bold tracking-wide bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-200 bg-clip-text text-transparent">
        Prabhav
      </h1>

      {/* Subtitle */}
      <p className="text-sm text-white/60 mt-2 text-center max-w-xs leading-5">
        Digital platform for storing my favorite literature, poems and stories
      </p>

      {/* Animated dots */}
      <div className="flex gap-1 mt-5">
        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
      </div>

      {/* Soft glow text bottom */}
      <p className="absolute bottom-6 text-xs text-white/30 tracking-widest">
        By:- Anuj Gupta
      </p>

    </div>
  );
}

export default InitialLoader;