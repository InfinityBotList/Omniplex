import { useSuspenseQuery, useQuery } from '@tanstack/react-query'
import type { Bot, BotIndex, BotsAllResponse, BotsRandomResponse, Pack, PacksAllResponse } from '~/types/api'
import { logger } from './logger'

const API_BASE = 'https://spider.omniplex.gg'

export const botKeys = {
  all: () => ['bots'] as const,
  index: () => [...botKeys.all(), 'index'] as const,
  random: () => [...botKeys.all(), 'random'] as const,
  list: () => [...botKeys.all(), 'list'] as const,
  detail: (id: string) => [...botKeys.all(), id] as const,
}

export const packKeys = {
  all: () => ['packs'] as const,
  list: () => [...packKeys.all(), 'list'] as const,
  detail: (id: string) => [...packKeys.all(), id] as const,
}

export const searchKeys = {
  all: () => ['search'] as const,
  query: (q: string) => [...searchKeys.all(), q] as const,
}

// Bot queries
export const useBotsIndex = () => {
  return useSuspenseQuery({
    queryKey: botKeys.index(),
    queryFn: async () => {
      try {
        const res = await fetch(`${API_BASE}/bots/@index`)
        if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch bots index`)
        return res.json() as Promise<BotIndex>
      } catch (error) {
        console.error('API Error:', error)
        // Return mock data for development
        return {
          certified: [],
          top_voted: [],
          recent: []
        } as BotIndex
      }
    },
  })
}

export const useBotsRandom = () => {
  return useSuspenseQuery({
    queryKey: botKeys.random(),
    queryFn: async () => {
      try {
        const res = await fetch(`${API_BASE}/bots/@random`)
        if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch random bots`)
        return res.json() as Promise<BotsRandomResponse>
      } catch (error) {
        console.error('API Error:', error)
        return { bots: [] } as BotsRandomResponse
      }
    },
  })
}

export const useBots = (page = 1) => {
  return useSuspenseQuery({
    queryKey: [...botKeys.list(), page],
    queryFn: async () => {
      try {
        const res = await fetch(`${API_BASE}/bots/@all?page=${page}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch bots`)
        return res.json() as Promise<BotsAllResponse>
      } catch (error) {
        console.error('API Error:', error)
        return { count: 0, per_page: 0, results: [] } as BotsAllResponse
      }
    },
  })
}

// Pack queries
export const usePacks = (page = 1) => {
  return useSuspenseQuery({
    queryKey: [...packKeys.list(), page],
    queryFn: async () => {
      try {
        const res = await fetch(`${API_BASE}/packs/@all?page=${page}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch packs`)
        return res.json() as Promise<PacksAllResponse>
      } catch (error) {
        console.error('API Error:', error)
        return { count: 0, per_page: 0, results: [] } as PacksAllResponse
      }
    },
  })
}

// Search query
export const useSearch = (query: string) => {
  return useQuery({
    queryKey: searchKeys.query(query),
    queryFn: async () => {
      const startTime = performance.now()
      logger.debug(`🔍 Searching for: "${query}"`)
      
      const searchPayload = { 
        query: query.trim(),
        target_types: ['bot', 'server', 'pack']
      }
      logger.debug(`Search payload:`, searchPayload)
      
      try {
        const res = await fetch(`${API_BASE}/list/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(searchPayload),
        })
        
        const duration = Math.round(performance.now() - startTime)
        
        if (!res.ok) {
          const errorText = await res.text()
          logger.warn(`Search API returned ${res.status}`)
          logger.debug(`Response body:`, errorText)
          throw new Error(`HTTP ${res.status}: Search failed - ${errorText}`)
        }
        
        const data = await res.json()
        logger.logApiCall('POST', '/list/search', duration)
        logger.logPerformance(`Search query: "${query.substring(0, 30)}${query.length > 30 ? '...' : ''}"`, duration)
        logger.debug(`Search results received:`, data)
        
        return data
      } catch (error) {
        const duration = Math.round(performance.now() - startTime)
        logger.error(`Search failed after ${duration}ms:`, error)
        throw error
      }
    },
    enabled: !!query.trim(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
