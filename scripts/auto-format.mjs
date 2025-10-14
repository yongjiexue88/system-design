#!/usr/bin/env node

import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const filePath = fileURLToPath(import.meta.url)
const scriptsDir = path.dirname(filePath)
const repoRoot = path.resolve(scriptsDir, '..')

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'

const steps = [
  {
    name: 'Front-end lint (fix)',
    cwd: path.join(repoRoot, 'frontend-react'),
    args: ['run', 'lint:fix'],
  },
  {
    name: 'Front-end format',
    cwd: path.join(repoRoot, 'frontend-react'),
    args: ['run', 'format'],
  },
  {
    name: 'Back-end lint (fix)',
    cwd: path.join(repoRoot, 'backend-express'),
    args: ['run', 'lint:fix'],
  },
  {
    name: 'Back-end format',
    cwd: path.join(repoRoot, 'backend-express'),
    args: ['run', 'format'],
  },
]

for (const step of steps) {
  console.log(`\n▶ ${step.name}`)
  const result = spawnSync(npmCommand, step.args, {
    cwd: step.cwd,
    stdio: 'inherit',
  })

  if (result.status !== 0) {
    console.error(`\n✖ ${step.name} failed with code ${result.status}.`)
    process.exit(result.status ?? 1)
  }
}

console.log('\n✔ Auto lint & formatting completed successfully.')
