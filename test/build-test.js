import path from 'path'
import fs from 'fs'

import test from 'ava'
const __dirname = path.resolve()
const fixturesDir = path.join(__dirname, 'test/build-specs')

fs.readdirSync(fixturesDir).forEach(caseName => {
    test(`Should works for ${caseName.split('-').join(' ')}`, async t => {
        const fixtureDir = path.join(fixturesDir, caseName)

        const actual = (
            await import(path.join(fixtureDir, 'actual.js'))
        ).default()

        const expected = (
            await import(path.join(fixtureDir, 'expected.js'))
        ).default()

        t.deepEqual(actual, expected)
    })
})
