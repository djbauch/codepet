export interface PetStats {
  totalCommits: number
  codingHours: number
  bugsFixed: number
  languagesLearned: number
  projectsCompleted: number
}

export interface Pet {
  name: string
  level: number
  xp: number
  happiness: number
  energy: number
  intelligence: number
  creativity: number
  stage: PetStage
  lastFed: number
  stats: PetStats
}

export type PetStage = 'egg' | 'baby' | 'teen' | 'adult' | 'master'

export interface PetStageInfo {
  emoji: string
  name: string
  minLevel: number
}

export interface Activity {
  id: string
  label: string
  xp: number
  effect: {
    intelligence?: number
    creativity?: number
    happiness?: number
    energy?: number
  }
}

export interface ActivityLog {
  id: number
  activity: string
  xp: number
  timestamp: string
}