const express = require('express')
const { getModelOptions } = require('../services/modelService')

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const models = await getModelOptions()
    res.json({ models })
  } catch (error) {
    console.error('Failed to retrieve model options', error)
    res.status(500).json({
      error: 'Unable to retrieve model options from Google AI documentation.',
    })
  }
})

module.exports = router
