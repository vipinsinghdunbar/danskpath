export default function WelcomeView({ setActive }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] grid place-items-center p-4">
      <div className="bg-white rounded-[16px] border border-[var(--border)] p-6 max-w-[400px] text-center">
        <h1 className="text-[24px] font-[700]">Welcome to DanskPath</h1>
        <p className="mt-2 text-[14px] text-[var(--muted)]">Find your Danish level — 5-min check</p>
        <button onClick={()=>setActive('simple-landing')} className="mt-6 w-full bg-[var(--ink)] text-white py-3 rounded-full">Start →</button>
      </div>
    </div>
  );
}
