export type AuditActionType = 'CREATE' | 'UPDATE' | 'DELETE' | 'RESTORE' | 'REVERT';

export interface ChangeDetail {
  fieldName: string;          // String
  oldValue?: string;          // String
  newValue?: string;          // String
  isModified: boolean;        // Boolean
  changedAt: Date;            // Date
}

export interface AuditLog {
  _id: string;
  activityId: string | { _id: string; title: string; category: string }; 
  authorId: string | { _id: string; name: string; email: string };    
  actionType: AuditActionType;
  changes: ChangeDetail[];
  previousActivityState?: Record<string, unknown>; 
  deleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}