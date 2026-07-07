import { LucideIcon } from 'lucide-react';
import { ChangeEvent } from 'react';
import { EvidenceFile } from './evidence-file.type';

export interface WelcomeBannerProps {
  displayName: string;
}

export interface StatItem {
  icon: LucideIcon;
  label: string;
  value: string | number;
  bg: string;
  iconColor: string;
  trend: string;
  trendColor: string;
}

export interface StatsGridProps {
  stats: StatItem[];
}

export interface NotificationItem {
  type: string;
  title: string;
  description: string;
  borderColor: string;
  bg: string;
  textColor: string;
  descColor: string;
  dot: string;
}

export interface NotificationCardProps {
  notifications: NotificationItem[];
}

export interface ResultBannerProps {
  semester: string;
  academicYear: string;
  rating: string;
  totalScore: number;
  rankBadgeClass: (rank: string) => string;
}

export interface ScoreItem {
  label: string;
  icon: LucideIcon;
  score: number;
  max: number;
  color: string;
  textColor: string;
}

export interface DetailScoresCardProps {
  scoreBreakdown: ScoreItem[];
}

export interface ReviewerCommentsCardProps {
  reviewerComments: string;
}

export interface RankBenefitsCardProps {
  rating: string;
}

export interface EvidenceGroupCardProps {
  group: { id: string; name: string };
  groupEvidences: EvidenceFile[];
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>, criteriaId: string) => void;
  handleDelete: (id: string) => void;
  formatFileSize: (bytes: number) => string;
}
