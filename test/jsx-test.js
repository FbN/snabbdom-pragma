import path from 'path'
import fs from 'fs'

import test from 'ava'
const __dirname = path.resolve()
const fixturesDir = path.join(__dirname, 'test/jsx-specs')

fs.readdirSync(fixturesDir).forEach(caseName => {
    // test(`trans - Should Bublé transform ${caseName
    //     .split('-')
    //     .join(' ')}`, async t => {
    //     const fixtureDir = path.join(fixturesDir, caseName)
    //
    //     const actual = (await import('buble')).default.transform(
    //         fs.readFileSync(path.join(fixtureDir, 'actual.js')).toString(),
    //         {
    //             transforms: {
    //                 modules: false,
    //                 arrow: false,
    //                 parameterDestructuring: false
    //             },
    //             jsx: 'Snabbdom.createElement'
    //         }
    //     ).code
    //
    //     const transform = fs
    //         .readFileSync(path.join(fixtureDir, 'transform-buble.js'))
    //         .toString()
    //
    //     t.is(actual.trim(), transform.trim())
    // })

    // test(`trans - Should Babel transform ${caseName
    //     .split('-')
    //     .join(' ')}`, async t => {
    //     const fixtureDir = path.join(fixturesDir, caseName)
    //
    //     const actual = (await import('babel-core')).default.transform(
    //         fs.readFileSync(path.join(fixtureDir, 'actual.js')).toString(),
    //         {
    //             plugins: [
    //                 [
    //                     'transform-react-jsx',
    //                     { pragma: 'Snabbdom.createElement' }
    //                 ]
    //             ]
    //         }
    //     ).code
    //
    //     let transform = fs
    //         .readFileSync(path.join(fixtureDir, 'transform-babel.js'))
    //         .toString()
    //
    //     transform = transform.replace(/\r/gm, '')
    //
    //     t.is(actual.trim(), transform.trim())
    // })

    test(`trans - Should Traceur transform ${caseName
        .split('-')
        .join(' ')}`, async t => {
        const fixtureDir = path.join(fixturesDir, caseName)

        const actual = (await import('traceur')).default.compile(
            fs.readFileSync(path.join(fixtureDir, 'actual.js')).toString(),
            {
                jsx: 'Snabbdom.createElement',
                modules: false,
                outputLanguage: 'es6'
            }
        )

        let transform = fs
            .readFileSync(path.join(fixtureDir, 'transform-traceur.js'))
            .toString()

        transform = transform.replace(/\r/gm, '')

        t.is(actual.trim(), transform.trim())
    })
    //
    // test(`trans - Should Typescript transform ${caseName
    //     .split('-')
    //     .join(' ')}`, async t => {
    //     const fixtureDir = path.join(fixturesDir, caseName)
    //     const actual = (await import('typescript')).default.transpileModule(
    //         fs.readFileSync(path.join(fixtureDir, 'actual.js')).toString(),
    //         {
    //             compilerOptions: {
    //                 jsx: 'react',
    //                 jsxFactory: 'Snabbdom.createElement',
    //                 target: 'es6'
    //             }
    //         }
    //     ).outputText
    //
    //     const transform = fs
    //         .readFileSync(path.join(fixtureDir, 'transform-typescript.js'))
    //         .toString()
    //
    //     t.is(actual.trim(), transform.trim())
    // })
})
