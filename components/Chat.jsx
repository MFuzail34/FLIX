import { useState, useRef, useEffect } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const boxRef = useRef(null)

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight
  }, [messages])

  async function sendMessage(e) {
    e && e.preventDefault()
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      })
      const data = await res.json()
      const assistant = { role: 'assistant', content: data.reply || data.error || 'No reply' }
      setMessages(prev => [...prev, assistant])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: ' + err.message }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div ref={boxRef} className="chat-container overflow-y-auto p-6 space-y-4 flex-1">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-20">Start the conversation — say hi 👋</div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[70%] p-3 rounded-2xl ${m.role === 'user' ? 'bg-blue-600 ml-auto text-white' : 'bg-gray-800 mr-auto'}`}>
            <div className="whitespace-pre-wrap">{m.content}</div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t border-gray-700 flex gap-3">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 rounded-lg bg-gray-900 outline-none"
        />
        <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 disabled:opacity-50" disabled={loading}>
          {loading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  )
}
