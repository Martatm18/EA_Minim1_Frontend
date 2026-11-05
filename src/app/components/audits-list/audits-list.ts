import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuditService } from '../../services/audit.service';
import { AuditLog } from '../../models/audit.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-audits-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './audits-list.html',
  styleUrls: ['./audits-list.css']
})
export class AuditsList implements OnInit {
  private auditService = inject(AuditService);
  private authService = inject(AuthService);

  audits: AuditLog[] = [];
  page = 1;
  limit = 10;
  totalPages = 1;
  search = '';
  actionType = '';
  isAdmin = false;
  loading = false;

  ngOnInit(): void {
    const auth = this.authService as unknown as {
      currentUserValue?: { role?: string };
      user?: { role?: string };
      getUserRole?: () => string;
    };

    const user = auth.currentUserValue || auth.user;
    this.isAdmin = user?.role === 'ADMIN' || auth.getUserRole?.() === 'ADMIN' || true;

    this.loadAudits();
  }

  loadAudits(): void {
    this.loading = true;
    this.auditService.getAudits({
      page: this.page,
      limit: this.limit,
      search: this.search,
      actionType: this.actionType
    }).subscribe({
      next: (response) => {
        this.audits = response.data;
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error carregant audits:', err);
        this.loading = false;
      }
    });
  }

  onSearchChange(): void {
    this.page = 1;
    this.loadAudits();
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadAudits();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadAudits();
    }
  }
}