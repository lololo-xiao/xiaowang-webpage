export default function Page() {
  return (
    <>
      {/* ── hero / vertical nav ── */}
      <section className="min-h-screen flex flex-col items-center justify-center gap-0 px-4">
        {/* name — small, understated */}
        <p className="text-xs tracking-[0.35em] uppercase mb-16 opacity-60">
          Xiao Wang
        </p>

        {/* nav items — vertical, icon + label */}
        <nav className="flex flex-col items-center gap-14">
          {/* about */}
          <a href="#about" className="nav-item flex flex-col items-center gap-3">
            <svg className="ink-icon" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* hand-drawn eye icon */}
              <ellipse cx="22" cy="22" rx="18" ry="11" stroke="#111" strokeWidth="1.5" strokeLinecap="round"
                strokeDasharray="0.5 0" />
              <circle cx="22" cy="22" r="6" stroke="#111" strokeWidth="1.5" />
              <circle cx="22" cy="22" r="2.5" fill="#111" />
              {/* subtle lash strokes */}
              <line x1="6" y1="18" x2="3" y2="14" stroke="#111" strokeWidth="1" strokeLinecap="round" />
              <line x1="38" y1="18" x2="41" y2="14" stroke="#111" strokeWidth="1" strokeLinecap="round" />
              <line x1="22" y1="11" x2="22" y2="7" stroke="#111" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span className="text-sm tracking-[0.2em] lowercase">about</span>
          </a>

          {/* small decorative line between items */}
          <div className="w-px h-10 bg-black/20" />

          {/* contact */}
          <a href="#contact" className="nav-item flex flex-col items-center gap-3">
            <svg className="ink-icon" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* hand-drawn paper crane / origami bird */}
              <path d="M8 32 L22 8 L36 32" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 8 L22 32" stroke="#111" strokeWidth="1" strokeLinecap="round" />
              <path d="M14 22 L22 16 L30 22" stroke="#111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              {/* small dot at peak */}
              <circle cx="22" cy="8" r="1.5" fill="#111" />
            </svg>
            <span className="text-sm tracking-[0.2em] lowercase">contact</span>
          </a>
        </nav>

        {/* scroll hint */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-8 bg-black animate-pulse" />
        </div>
      </section>

      {/* ── about section ── */}
      <section id="about" className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md section-content text-center">
          {/* small icon echo */}
          <svg className="mx-auto mb-8 opacity-40" width="28" height="28" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="22" cy="22" rx="18" ry="11" stroke="#111" strokeWidth="1.5" />
            <circle cx="22" cy="22" r="6" stroke="#111" strokeWidth="1.5" />
            <circle cx="22" cy="22" r="2.5" fill="#111" />
          </svg>

          <h2 className="text-2xl mb-8 tracking-wide">about</h2>

          <div className="space-y-5 text-base leading-relaxed opacity-80">
            <p>
              I want to build something.
            </p>
            <p>
              My dream since childhood has been to live a creative life.<br />
              By learning coding and AI, I want to use code to design and build
              something fun and potentially useful.<br />
            </p>
          </div>

          {/* links — styled like old-fashioned index entries */}
          <div className="mt-12 pt-8 border-t border-black/10">
            <ul className="flex justify-center gap-8 text-sm tracking-wider">
              <li>
                <a href="https://github.com/lololo-xiao" target="_blank" rel="noopener noreferrer" className="nav-item">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://x.com/XiaoWang_0102" target="_blank" rel="noopener noreferrer" className="nav-item">
                  X / Twitter
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/xiao-wang-5a5b20239/" target="_blank" rel="noopener noreferrer" className="nav-item">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── contact section ── */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md section-content text-center">
          {/* small icon echo */}
          <svg className="mx-auto mb-8 opacity-40" width="28" height="28" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 32 L22 8 L36 32" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 8 L22 32" stroke="#111" strokeWidth="1" strokeLinecap="round" />
            <circle cx="22" cy="8" r="1.5" fill="#111" />
          </svg>

          <h2 className="text-2xl mb-8 tracking-wide">contact</h2>

          <div className="space-y-5 text-base leading-relaxed opacity-80">
            <p>
              Reach me by email or find me on the platforms above.
            </p>
            <p className="text-lg">
              <a href="mailto:wangxiao02131@gmail.com" className="nav-item border-b border-black/30 pb-0.5">
                wangxiao02131@gmail.com
              </a>
            </p>
          </div>

          {/* small ornamental mark at bottom */}
          <div className="mt-16 opacity-20">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
              <circle cx="10" cy="10" r="3" stroke="#111" strokeWidth="1" />
              <line x1="10" y1="0" x2="10" y2="6" stroke="#111" strokeWidth="0.8" />
              <line x1="10" y1="14" x2="10" y2="20" stroke="#111" strokeWidth="0.8" />
              <line x1="0" y1="10" x2="6" y2="10" stroke="#111" strokeWidth="0.8" />
              <line x1="14" y1="10" x2="20" y2="10" stroke="#111" strokeWidth="0.8" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── footer ── */}
      <footer className="py-8 text-center text-xs tracking-widest opacity-30 uppercase">
        Xiao Wang &middot; 2026
      </footer>
    </>
  )
}
