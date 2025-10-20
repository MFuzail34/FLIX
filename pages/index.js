import Chat from '../components/Chat'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-6 border-b border-gray-800 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Flix.ai</h1>
        <div className="text-sm text-gray-400"></div>
      </header>

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-3xl h-[720px] bg-slate-950 rounded-2xl shadow-lg overflow-hidden flex flex-col">
          <Chat />
        </div>
      </main>

      <footer className="p-4 text-center text-xs text-gray-500">Built with ❤️ — Z.M.FUZAIL.</footer>
    </div>
  )
}
