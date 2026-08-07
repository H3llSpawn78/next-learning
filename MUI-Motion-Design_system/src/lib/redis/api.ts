import { Redis } from "ioredis";

const redisUrl = process.env.REDIS_URL!;

// Singleton pattern for connection reuse
const globalForRedis = globalThis as unknown as {
	redis: Redis | undefined;
};

const redis =
	globalForRedis.redis ??
	new Redis(redisUrl, {
		maxRetriesPerRequest: 3,
		retryStrategy: (times) => {
			if (times > 3) return null;
			return Math.min(times * 100, 3000);
		},
	});

globalForRedis.redis = redis;

interface CacheOptions {
	ttl?: number;
	tags?: string[];
}

export async function getCache<T>(key: string): Promise<T | null> {
	const data = await redis.get(key);
	if (!data) {
		return null;
	}
	return JSON.parse(data) as T;
}

export async function setCache<T>(
	key: string,
	value: T,
	options: CacheOptions = {}
): Promise<void> {
	const { ttl = 300, tags = [] } = options;
	const data = JSON.stringify(value);

	if (ttl > 0) {
		await redis.setex(key, ttl, data);
	} else {
		await redis.set(key, data);
	}

	// Store tags for invalidation
	for (const tag of tags) {
		await redis.sadd(`tag:${tag}`, key);
	}
}

export async function deleteCache(key: string): Promise<void> {
	await redis.del(key);
}

export async function invalidateTag(tag: string): Promise<void> {
	const keys = await redis.smembers(`tag:${tag}`);
	if (keys.length > 0) {
		await redis.del(...keys);
		await redis.del(`tag:${tag}`);
	}
}

export async function getOrAdd<T>(
	key: string,
	ttl: number,
	callback: () => Promise<T>
): Promise<T> {
	const cached = await getCache<T>(key);
	if (cached !== null) {
		return cached;
	}

	const value = await callback();
	await setCache(key, value, { ttl });
	return value;
}

export async function getTTL(key: string): Promise<number | null> {
	const ttl = await redis.ttl(key);
	if (ttl === -2) {
		return null; // Key does not exist
	}
	if (ttl === -1) {
		return Infinity; // Key exists but has no associated expire
	}
	return ttl;
}
