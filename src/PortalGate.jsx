import { useEffect, useState } from "react";

export default function PortalGate({ onBack, onSuccess }) {
  const [name, setName] = useState("");
  const [passed, setPassed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalized = name.trim().toLowerCase();
    if (normalized === "charmer") {
      setPassed(true);
    } else {
      setError("Hmm, that doesn't sound right. Try again ✨");
    }
  };

  if (passed) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <HeartsBackground />
        <div className="relative z-10 mx-auto max-w-xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur px-8 py-10 shadow-xl">
            <div>
              <svg viewBox="0 0 140 130" className="mx-auto h-28 w-28 text-pink-500">
                <defs>
                  <linearGradient id="lg" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
                <path
                  d="M70 120 C-10 70 20 10 55 25 C70 32 70 48 70 48 C70 48 70 32 85 25 C120 10 150 70 70 120 Z"
                  fill="url(#lg)"
                  className="animate-pulse"
                />
              </svg>
              <h1 className="mt-6 text-3xl sm:text-4xl font-black tracking-tight">I know you will come here, I love you sanu 💜</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">The portal recognizes you. Ready to enter the hidden album?</p>
              <div className="mt-6">
                <button
                  onClick={onSuccess}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brand-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow hover:shadow-md transition-shadow"
                >
                  Enter Gallery →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur px-4 py-3">
          <div className="font-semibold">Secret Portal</div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/90 dark:hover:bg-white/15"
          >
            ← Back
          </button>
        </div>
      </header>
      <main className="py-12">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-8 shadow">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Knock, knock 🔒</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              What name have you saved me as on your phone?
            </p>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type the name..."
                className="w-full rounded-xl border border-slate-900/10 dark:border-white/10 bg-white/90 dark:bg-slate-800/80 px-4 py-3 outline-none focus:ring-2 ring-brand-400/70 placeholder:text-slate-400"
              />
              {error ? (
                <div className="text-sm text-rose-500">{error}</div>
              ) : null}
              <div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brand-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow hover:shadow-md transition-shadow"
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

function HeartsBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-0">
      {[...Array(16)].map((_, i) => (
        <Heart key={i} i={i} />
      ))}
    </div>
  );
}

function Heart({ i }) {
  const left = 5 + (i * 6) % 90;
  const delay = (i % 5) * 0.6;
  return (
    <svg
      viewBox="0 0 24 24"
      className="absolute text-pink-400/70"
      style={{ left: left + "%", bottom: "-20px", width: 24 + (i % 3) * 8, height: 24 + (i % 3) * 8, animation: `rise 6s ${delay}s infinite linear` }}
    >
      <path d="M12 21s-6.716-4.39-9.172-8.2C.374 9.99 1.72 6.6 4.8 6.6c2 0 3.2 1.4 3.2 1.4S9.2 6.6 11.2 6.6c3.08 0 4.426 3.39 1.972 6.2C18.716 16.61 12 21 12 21z" fill="currentColor" />
      <style>{`@keyframes rise{0%{transform:translateY(0) scale(1);opacity:.6}70%{opacity:.5}100%{transform:translateY(-120vh) scale(1.2);opacity:0}}`}</style>
    </svg>
  );
}


