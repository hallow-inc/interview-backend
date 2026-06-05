/*
 * Shared schemas & types for the database and challenge outputs.
 *
 * These are defined with Zod so the same definition gives you both a static
 * TypeScript type (via `z.infer`) AND a runtime validator you can use to assert
 * that the data you return matches the expected shape. For example:
 *
 *     const results = await activity(db, 1)
 *     activityResultSchema.parse(results) // throws if the shape is wrong
 *
 * Feel free to extend these as you flesh out `activity` and `nextup`.
 */

import { z } from 'zod'

// --- Streak markers used by the activity UI ---
export const STREAK_NONE = 0
export const STREAK_START = 1
export const STREAK_MIDDLE = 2
export const STREAK_END = 3

export const streakSchema = z.union([
    z.literal(STREAK_NONE),
    z.literal(STREAK_START),
    z.literal(STREAK_MIDDLE),
    z.literal(STREAK_END),
])
export type Streak = z.infer<typeof streakSchema>

// --- Database tables ---
export const userSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    // JSON column — may arrive as a string that needs parsing into number[]
    categories: z.array(z.number().int()),
    timezone: z.string(),
    created_at: z.coerce.date(),
})
export type User = z.infer<typeof userSchema>

export const sessionSchema = z.object({
    id: z.number().int(),
    user_id: z.number().int(),
    prayer_id: z.number().int(),
    is_complete: z.boolean(),
    created_at: z.coerce.date(),
})
export type Session = z.infer<typeof sessionSchema>

export const collectionSchema = z.object({
    id: z.number().int(),
    category: z.number().int(),
    title: z.string(),
})
export type Collection = z.infer<typeof collectionSchema>

export const prayerSchema = z.object({
    id: z.number().int(),
    collection_id: z.number().int(),
    title: z.string(),
    order: z.number().int(),
})
export type Prayer = z.infer<typeof prayerSchema>

// --- `activity` output ---
export const activityEntrySchema = z.object({
    is_today: z.boolean(),
    has_session: z.boolean(),
    streak: streakSchema,
    date: z.iso.datetime(),
})
export type ActivityEntry = z.infer<typeof activityEntrySchema>

export const activityResultSchema = z.array(activityEntrySchema)
export type ActivityResult = z.infer<typeof activityResultSchema>

// --- `nextup` output ---
export const nextUpResultSchema = prayerSchema
export type NextUpResult = z.infer<typeof nextUpResultSchema>
