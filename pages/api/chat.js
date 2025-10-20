import { queryLLM } from '../../lib/llm'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { message } = req.body || {}
  if (!message) return res.status(400).json({ error: 'Missing message' })

  try {
    const provider = (process.env.LLM_PROVIDER || 'claude').toLowerCase()
    const apiKey = provider === 'claude' ? process.env.CLAUDE_API_KEY : process.env.OPENAI_API_KEY
    if (!apiKey) return res.status(500).json({ error: 'API key not configured on server' })

    const reply = await queryLLM(provider, message, apiKey)
    return res.status(200).json({ reply })
  } catch (err) {
    console.error('LLM error', err)
    return res.status(500).json({ error: err.message || 'LLM request failed' })
  }
}
