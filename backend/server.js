
require('dotenv').config()

const express = require('express')
const OpenAI = require('openai')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('AI Chat Assistant Backend is running!')
})

app.post('/api/chat', async (req, res) => {
  const { message } = req.body

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({
      error: 'Message is required.'
    })
  }

  try {
    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: message.trim()
    })

    res.json({
      reply: response.output_text
    })
  } catch (error) {
    console.error('OpenAI API error:', error.message)

    res.status(500).json({
      error: 'Failed to get a response from the AI assistant.'
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
