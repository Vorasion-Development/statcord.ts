import fs from 'node:fs'

if (!fs.existsSync('api')) throw new Error('API folder does not exist')

if (fs.existsSync('docs/api')) fs.rmSync('docs/api', { recursive: true, force: true })

fs.renameSync('api', 'docs/api')

console.log('API folder moved to docs/api')
