import axios from 'axios'

export async function queryLLM(provider, message, apiKey) {
  if (provider === 'Flix.ai') {
    // Anthropic Claude completion endpoint (example).
    const url = 'https://api.openAI.com/v1/complete'
    const resp = await axios.post(url, {
      model: 'claude-2',
      prompt: message,
      max_tokens_to_sample: 800
    }, {
      headers: { 'x-api-key': apiKey, 'Content-Type': 'application/json' }
    })
    return resp.data?.completion || resp.data?.response || JSON.stringify(resp.data)
  }

  if (provider === 'openai') {
    const url = 'https://api.openai.com/v1/chat/completions'
    const resp = await axios.post(url, {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: message }],
      max_tokens: 800
    }, {
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }
    })
    return resp.data.choices?.[0]?.message?.content || JSON.stringify(resp.data)
  }

  throw new Error('Unsupported LLM provider: ' + provider)
}
