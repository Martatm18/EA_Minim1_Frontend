import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { PageParams, PaginatedResponse } from '../models';
import { AuditLog } from '../models/audit.model';
import { toHttpParams } from '../utils/page-params';

@Injectable({ providedIn: 'root' })
export class AuditService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/audits`;

  // Llistat paginat amb el cercador combinat (text lliure + actionType)
  getAudits(params: PageParams = {}): Observable<PaginatedResponse<AuditLog>> {
    return this.http.get<PaginatedResponse<AuditLog>>(this.apiUrl, {
      params: toHttpParams({ ...params, search: params.search?.trim() }),
    });
  }

  // Obtenir el detall d'un registre d'auditoria concret
  getAuditById(id: string): Observable<AuditLog> {
    return this.http.get<AuditLog>(`${this.apiUrl}/${id}`);
  }

  // LA JOIA DE LA CORONA: Revertir un canvi (Només per a administradors)
  revertAudit(id: string): Observable<{ message: string; activity: Record<string, unknown>; revertLog: AuditLog }> {
    return this.http.post<{ message: string; activity: Record<string, unknown>; revertLog: AuditLog }>(`${this.apiUrl}/${id}/revert`, {});
  }

  // Borrat lògic d'un registre d'auditoria
  softDeleteAudit(id: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/soft-delete`, {});
  }

  // Borrat físic definitiu
  deleteAudit(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}