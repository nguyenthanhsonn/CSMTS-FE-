import type { ReactNode } from 'react';

export interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: { id: string; name: string }[];
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  selectClassName?: string;
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

export interface ToastContextValue {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

export interface ModalConfirmProps {
  isOpen: boolean;
  title: string;
  message: string;
  targetName?: string;
  type?: 'danger' | 'warning' | 'info';
  confirmText?: string;
  cancelText?: string;
  hasReasonInput?: boolean;
  reasonValue?: string;
  onReasonChange?: (val: string) => void;
  reasonLabel?: string;
  reasonPlaceholder?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export type EvaluationStepStatus = 'pending' | 'current' | 'completed' | 'rejected';

export type EvaluationWorkflowStep = {
  key: 'student_submit' | 'class_review' | 'admin_finalization' | string;
  label: string;
  status: EvaluationStepStatus;
  completedAt?: string | null;
};

export interface EvaluationStatusStepperProps {
  status?: string | null;
  statusLabel?: string | null;
  steps?: EvaluationWorkflowStep[] | null;
  compact?: boolean;
  className?: string;
}

export interface HeaderProps {
  onMenuClick: () => void;
}

export interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export interface MainLayoutProps {
  children: ReactNode;
}

export interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}
