import { portfolioData } from '@/lib/data';

export function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-20 px-6 md:px-12 py-24 border-t border-slate-100 bg-white">
      <div className="max-w-[1100px] mx-auto w-full">
        {/* Section header */}
        <span className="block font-sans text-[0.78rem] font-bold uppercase tracking-[0.08em] text-[#3b82f6] mb-8">
          01 — ABOUT
        </span>

        {/* Main Grid: Left content, Right cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-start mb-16">
          
          {/* Left Column */}
          <div className="flex flex-col gap-8 font-sans">
            <h2 className="text-5xl md:text-[3.25rem] font-extrabold text-slate-900 leading-[1.15] tracking-tight font-sans">
              Computer Science student & developer.
            </h2>

            
            <div className="flex flex-col gap-6 text-[1.05rem] text-slate-600 leading-relaxed font-normal">
              <p>
                I&apos;m a B.Tech CSE undergraduate at SR University, Warangal, with a passion for building things that solve real problems. My foundation is strong in data structures, algorithms, and object-oriented design.
              </p>
              <p>
                I approach development with discipline — consistent practice on LeetCode, clean modular code, and an ownership mindset. Whether it&apos;s a robust backend system or a web interface, I aim for clarity and correctness.
              </p>
              <p>
                Currently building toward a software engineering career, I&apos;m eager to contribute to teams that value quality and continuous learning.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 font-sans">
            {/* Top Card: Currently Focused On */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm">
              <span className="block text-[0.75rem] font-bold uppercase tracking-[0.08em] text-slate-400 mb-4">
                CURRENTLY FOCUSED ON
              </span>
              <ul className="flex flex-col gap-3.5 text-[0.92rem] text-slate-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="text-slate-900 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                  <span>DSA practice on LeetCode</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-slate-900 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                  <span>Software application development</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-slate-900 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                  <span>Exploring AI & Machine Learning</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-slate-900 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                  <span>Full-stack web fundamentals</span>
                </li>
              </ul>
            </div>

            {/* Bottom Card: Location */}
            <div className="bg-[#0f172a] rounded-2xl p-8 text-white flex flex-col gap-6 shadow-sm">
              <div className="flex flex-col gap-1.5">
                <span className="block text-[0.75rem] font-bold uppercase tracking-[0.08em] text-slate-400">
                  LOCATION
                </span>
                <h3 className="text-xl font-bold tracking-tight">
                  Warangal, Telangana
                </h3>
                <span className="text-xs text-slate-400">
                  India · IST (UTC+5:30)
                </span>
              </div>
              
              <div className="h-[1px] w-full bg-slate-800" />
              
              <p className="text-xs text-slate-400 leading-relaxed">
                Available for remote or on-site roles
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="border-t border-slate-100 pt-10 grid grid-cols-3 gap-6 md:gap-12 max-w-[600px] font-sans">
          <div className="flex flex-col gap-1">
            <span className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
              245+
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              LeetCode Problems
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
              5
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Projects Built
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
              7.4
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              CGPA / 10
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}



