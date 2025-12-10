import { useState, useEffect, useRef } from 'react'

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('dendinho_chat_history')
    return saved ? JSON.parse(saved) : []
  })
  const [loading, setLoading] = useState(false)
  const [scrolling, setScrolling] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    localStorage.setItem('dendinho_chat_history', JSON.stringify(messages))
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg = { text: input, sender: 'user' }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      // Use environment variable for API URL or default to localhost
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const res = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      })
      const data = await res.json()
      
      const botMsg = { text: data.reply, sender: 'bot' }
      setMessages(prev => [...prev, botMsg])
    } catch (error) {
      console.error(error)
      const errorMsg = { text: "O dendinho é tão complexo que minha conexão caiu. Tente de novo.", sender: 'bot' }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-zinc-900 text-white font-sans overflow-hidden supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh]">
      {/* Header - Always visible at top */}
      <header className="flex-none p-4 border-b border-zinc-800 bg-zinc-900/95 backdrop-blur z-20 text-center shadow-md relative">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Advogada de dendinho bixo solto ⚖️
        </h1>
        <p className="text-zinc-500 text-xs mt-1">Defendendo o indefensável com fatos duvidosos</p>
      </header>

      {/* Chat History - Scrollable area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-zinc-600 opacity-50 space-y-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.69 9-8.25s-4.03-8.25-9-8.25S3 7.44 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
            </svg>
            <p>Faça sua reclamação. Eu tenho a defesa pronta.</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-zinc-800 text-zinc-100 rounded-tr-sm' 
                  : 'bg-purple-900/20 border border-purple-500/30 text-purple-100 rounded-tl-sm'
              }`}
            >
              <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
           <div className="flex justify-start">
             <div className="bg-zinc-800/50 p-3 rounded-2xl rounded-tl-sm flex items-center space-x-2">
               <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-75"></div>
               <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-150"></div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Always visible at bottom */}
      <div className="flex-none p-4 bg-zinc-900 border-t border-zinc-800 z-20 pb-safe">
        <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto flex items-end gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Do que você está reclamando hoje?"
            className="flex-1 bg-zinc-800 text-white rounded-2xl py-3 px-5 text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-zinc-800/80 transition-all placeholder:text-zinc-600"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-full transition-colors shadow-lg shadow-purple-900/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
