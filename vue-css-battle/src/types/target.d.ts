import { TargetData } from './target.d';
/**
 * Daily Target 组件的 props 类型
 */
export type TargetProps = {
  image?: string;
  isLocked?: boolean;
  isPlus?: boolean;
  isShowDate?: boolean;
  isToday?: boolean;
  highestScore?: string;
  isTransparent?: boolean;
  month?: string;
  day?: string;
  id?: string;
  colors?: string[];
};

export type TargetScore = {
  id: string;
  lastScore: string;
  highScore: string;
};

export interface TargetData {
  id: string;
  averageAccuracy?: number;
  averageScore?: number;
  month: string;
  day: string;
  image: string;
  imageColors: string[];
}
export interface TargetResponse {
  code: number;
  data: TargetData[];
  message: string;
}

export interface BattleUploadResponse {
  code: number;
  message: string;
  data: {
    similarity: number;
    score: number;
  } | null;
}

interface BattleFormDataFields {
  image: File;
  id: string;
  code: string;
}

export interface BattleUploadFormData extends FormData {
  append<K extends keyof BattleFormDataFields>(key: K, value: BattleFormDataFields[K]): void;
  get<K extends keyof BattleFormDataFields>(key: K): BattleFormDataFields[K] | null;
  has<K extends keyof BattleFormDataFields>(key: K): boolean;
}
