import path from 'path'
import fs from 'fs'

import test from 'ava'
const __dirname = path.resolve()
const fixturesDir = path.join(__dirname, 'test/jsx-custom-modules-specs')

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
    //             jsx:
    //                 'Snabbdom.createElementWithModules({"attrs": "", "props": ""})'
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
    //     const actual = (async import('babel-core').transform(
    //         fs.readFileSync(path.join(fixtureDir, 'actual.js')).toString(),
    //         {
    //             plugins: [
    //                 [
    //                     'transform-react-jsx',
    //                     {
    //                         pragma:
    //                             'Snabbdom.createElementWithModules({"attrs": "", "props": ""})'
    //                     }
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
                jsx:
                    'Snabbdom.createElementWithModules({"attrs": "", "props": ""})',
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
})
