const { load } = require('cheerio')
const { MODEL_METADATA } = require('../data/modelMetadata')

const SOURCE_URL = 'https://ai.google.dev/gemini-api/docs/rate-limits'
const CACHE_TTL_MS = 1000 * 60 * 30 // 30 minutes

let cachedRateLimits = {
  fetchedAt: 0,
  data: null,
}

const normalizeCell = (value) =>
  value
    .replace(/\s+/g, ' ')
    .replace(/\u00a0/g, ' ')
    .trim()

const parseFreeTierTable = ($) => {
  const result = {}
  const table = $('#free-tier').nextAll('table').first()

  if (!table || !table.length) {
    return result
  }

  table.find('tbody tr').each((_, row) => {
    const cells = $(row).find('td')

    if (cells.length < 4) {
      return
    }

    const modelName = normalizeCell($(cells[0]).text())
    const rpm = normalizeCell($(cells[1]).text())
    const tpm = normalizeCell($(cells[2]).text())
    const rpd = normalizeCell($(cells[3]).text())

    if (!modelName) {
      return
    }

    result[modelName] = { rpm, tpm, rpd }
  })

  return result
}

const fetchRateLimitMap = async () => {
  const now = Date.now()
  const isCacheFresh = cachedRateLimits.data && now - cachedRateLimits.fetchedAt < CACHE_TTL_MS

  if (isCacheFresh) {
    return cachedRateLimits
  }

  try {
    const response = await fetch(SOURCE_URL, {
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; agenticChat/1.0; +https://github.com/)',
        accept: 'text/html,application/xhtml+xml',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch rate limits: ${response.status}`)
    }

    const html = await response.text()
    const $ = load(html)
    const map = parseFreeTierTable($)

    cachedRateLimits = {
      fetchedAt: now,
      data: map,
    }

    return cachedRateLimits
  } catch (error) {
    console.error('Unable to refresh rate limit data from Google Docs:', error)
    return {
      fetchedAt: cachedRateLimits.fetchedAt,
      data: cachedRateLimits.data,
    }
  }
}

const mergeMetadataWithRates = (rateMap, fetchedAt) => {
  const fetchedAtIso = typeof fetchedAt === 'number' ? new Date(fetchedAt).toISOString() : null

  return MODEL_METADATA.map((metadata) => {
    const rateInfo = rateMap[metadata.sourceName] ?? null
    return {
      ...metadata,
      rpm: rateInfo?.rpm ?? metadata.rpm,
      tpm: rateInfo?.tpm ?? metadata.tpm,
      rpd: rateInfo?.rpd ?? metadata.rpd,
      metadata: {
        source: SOURCE_URL,
        fetchedAt: fetchedAtIso,
      },
    }
  })
}

const getModelOptions = async () => {
  const { fetchedAt, data } = await fetchRateLimitMap()
  const rateMap = data ?? {}

  return mergeMetadataWithRates(rateMap, fetchedAt || null)
}

module.exports = {
  getModelOptions,
}
