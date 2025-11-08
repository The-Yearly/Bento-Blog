export default function Footer() {
  return (
    <footer className="w-full bg-neutral-900/60 backdrop-blur-lg border-t border-neutral-700/40 text-neutral-300 py-4 flex flex-col items-center space-y-3">
      <a href="https://amrita.town" className="text-lg font-semibold tracking-wide hover:text-white transition">
        amrita.town
      </a>
      <div className="flex space-x-6 text-sm">
        <a href="https://amrita.town/prev" className="hover:text-white transition">
          ← prev
        </a>
        <a href="https://amrita.town/random" className="hover:text-white transition">
          ⚄ random
        </a>
        <a href="https://amrita.town/next" className="hover:text-white transition">
          next →
        </a>
      </div>
    </footer>
  );
}
