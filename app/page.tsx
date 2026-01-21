// app/page.tsx
// ============================================================
// Apple-style Portfolio Homepage
// Tech: Next.js (App Router) + Tailwind CSS
// EDIT sections marked clearly below
// ============================================================

export default function Home() {
  return (
    <main className="bg-white text-slate-900">
      {/* ======================================================
          HERO SECTION
          EDIT HERE: Name, headline, description
      ======================================================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:24px_24px]" />

        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
            SOFTWARE • DATA • AUTOMATION
          </p>

          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            Building reliable systems
            <br className="hidden sm:block" />
            that scale cleanly.
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
            I’m Alex Ou, a senior Computer Science student focused on backend
            development, data pipelines, and automation. I’ve supported
            production IoT systems across 1,000+ devices and built FastAPI and
            PostgreSQL-backed platforms.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {/* EDIT HERE: Links */}
            <a
              href="https://github.com/alexou8"
              target="_blank"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/alexou8/"
              target="_blank"
              className="rounded-full border border-black/10 px-6 py-3 text-sm font-semibold hover:bg-black/5 transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ======================================================
          BIO SECTION
          EDIT HERE: Bio text
      ======================================================= */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight">Bio</h2>
        <p className="mt-5 max-w-3xl text-slate-600 leading-relaxed">
          I’m a Computer Science student at Wilfrid Laurier University with a
          strong interest in backend systems, data workflows, and operational
          reliability. I enjoy turning unstructured inputs into clean,
          dependable systems that support real-world use cases.
        </p>
      </section>

      {/* ======================================================
          PROJECTS SECTION
          EDIT HERE: Projects
      ======================================================= */}
      <section className="bg-slate-50 border-y border-black/5">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight">Projects</h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Card */}
            <div className="rounded-3xl bg-white p-6 border border-black/10 hover:shadow-lg transition">
              <h3 className="text-lg font-semibold">FareShare</h3>
              <p className="mt-2 text-sm text-slate-600">
                Backend services and database design for a ride-sharing
                platform, focusing on automated ingestion, validation, and
                reporting workflows.
              </p>
              <p className="mt-4 text-xs text-slate-500">
                FastAPI · PostgreSQL · Python
              </p>
            </div>

            {/* Project Card */}
            <div className="rounded-3xl bg-white p-6 border border-black/10 hover:shadow-lg transition">
              <h3 className="text-lg font-semibold">IoT Monitoring Platform</h3>
              <p className="mt-2 text-sm text-slate-600">
                Supported production IoT smart-lighting systems across 1,000+
                devices by analyzing telemetry, logs, and automating device
                provisioning.
              </p>
              <p className="mt-4 text-xs text-slate-500">
                Python · IoT · Monitoring
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          CONTACT SECTION
          EDIT HERE: Email
      ======================================================= */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight">Contact</h2>
        <p className="mt-4 text-slate-600">
          Interested in working together or discussing an internship?
        </p>

        <a
          href="mailto:alex.ou@wlu.ca"
          className="mt-6 inline-block rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
        >
          Email Me
        </a>
      </section>
    </main>
  );
}
