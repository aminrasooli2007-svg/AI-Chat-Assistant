const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

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

  await new Promise((resolve) => setTimeout(resolve, 1000))

  const reply = `Hello! You said: ${message.trim()}`

  res.json({ reply })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})