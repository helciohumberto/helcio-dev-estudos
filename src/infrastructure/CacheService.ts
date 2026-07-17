import Redis from "ioredis"

const redis = new Redis({
    host: "localhost",
    port: 6379,
})

redis.on("error", (err) => {
    console.error("Redis erro:", err)
})

export class CacheService {
    async get(key: string): Promise<string | null> {
        try {
            return await redis.get(key)
        } catch (e) {
            console.error("Cache get erro:", e)
            return null
        }
    }

    async set(key: string, value: string, ttlSegundos: number): Promise<void> {
        try {
            await redis.set(key, value, "EX", ttlSegundos)
        } catch (e) {
            console.error("Cache set erro:", e)
        }
    }

    async invalidar(key: string): Promise<void> {
        try {
            await redis.del(key)
        } catch (e) {
            console.error("Cache del erro:", e)
        }
    }
}