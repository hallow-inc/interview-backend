/*
 * Structural validator for a candidate's `activity` implementation. It ONLY validates the shape of the
 * result, not the actual answer.
 *
 * npm test                  # validates activity(db, 1)
 * TEST_USER_ID=4 npm test   # validate against a different user
 *
 * Requires the database to be up (`npm run setup` / `npm run db:start`).
 * Exits non-zero if any check fails.
 */

import 'dotenv/config'
import assert from 'node:assert/strict'
import database from './database'
import activity from './activity'
import { activityResultSchema, STREAK_START, STREAK_MIDDLE, STREAK_END } from './types'

const USER_ID = Number(process.env.TEST_USER_ID ?? 1)
const dayKey = (d: Date | string): string => new Date(d).toISOString().slice(0, 10)

let passed = 0
const failures: string[] = []
async function test(name: string, fn: () => void | Promise<void>): Promise<void> {
    try {
        await fn()
        passed++
        console.log(`  ✓ ${name}`)
    } catch (err) {
        failures.push(name)
        console.log(`  ✗ ${name}`)
        console.log(`      ${(err as Error).message.split('\n').join('\n      ')}`)
    }
}

async function main() {
    const db = database()
    try {
        const result = await activity(db, USER_ID)
        const user = await db('users').select('created_at').where({ id: USER_ID }).first()

        console.log(`activity(db, ${USER_ID}) — ${result.length} entries\n`)
        assert.ok(user, `seed data must contain user ${USER_ID}`)

        await test('output matches activityResultSchema', () => {
            activityResultSchema.parse(result)
        })

        await test('not empty (covers created_at through today)', () => {
            assert.ok(result.length > 0)
        })

        await test('days are contiguous & ascending — no gaps, no duplicates', () => {
            for (let i = 1; i < result.length; i++) {
                const deltaDays = Math.round(
                    (new Date(result[i].date).getTime() - new Date(result[i - 1].date).getTime()) /
                        86_400_000,
                )
                assert.equal(
                    deltaDays,
                    1,
                    `entry ${i} (${result[i].date}) is ${deltaDays} day(s) after the previous`,
                )
            }
        })

        await test("starts on the user's created_at day", () => {
            assert.equal(dayKey(result[0].date), dayKey(user.created_at))
        })

        await test('is_today is set on exactly the final entry, and it is today', () => {
            assert.equal(result.filter((e) => e.is_today).length, 1, 'exactly one entry should be is_today')
            assert.equal(result[result.length - 1].is_today, true, 'today must be the last entry')
            assert.equal(dayKey(result[result.length - 1].date), dayKey(new Date()))
        })

        await test('each streak runs start → middle → end in the order the spec requires', () => {
            const expectedOrder = (length: number): number[] => {
                if (length === 1) return [STREAK_MIDDLE]
                if (length === 2) return [STREAK_START, STREAK_END]
                return [STREAK_START, ...Array(length - 2).fill(STREAK_MIDDLE), STREAK_END]
            }
            let run: number[] = []
            const checkRun = (endIndex: number) => {
                if (run.length === 0) return
                assert.deepEqual(
                    run,
                    expectedOrder(run.length),
                    `streak ending ${result[endIndex - 1].date} (length ${run.length}) is out of order`,
                )
                run = []
            }
            for (let i = 0; i < result.length; i++) {
                if (result[i].has_session) run.push(result[i].streak)
                else checkRun(i)
            }
            checkRun(result.length)
        })

        console.log()
        if (failures.length) {
            console.log(`${passed} passed, ${failures.length} failed`)
            process.exitCode = 1
        } else {
            console.log(`All ${passed} checks passed`)
        }
    } finally {
        await db.destroy()
    }
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
