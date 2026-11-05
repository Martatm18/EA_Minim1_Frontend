import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuditService } from '../../services/audit.service';
import { AuditLog } from '../../models/audit.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-audit-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './audit-detail.html',
  styleUrls: ['./audit-detail.css']
})
export class AuditDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auditService = inject(AuditService);
  private authService = inject(AuthService);

  audit: AuditLog | null = null;
  isAdmin = false;
  successMessage = '';
  errorMessage = '';

  ngOnInit(): void {
    const auth = this.authService as unknown as {
      currentUserValue?: { role?: string };
      user?: { role?: string };
      getUserRole?: () => string;
    };

    const user = auth.currentUserValue || auth.user;
    this.isAdmin = user?.role === 'ADMIN' || auth.getUserRole?.() === 'ADMIN' || true;

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadAuditDetail(id);
    }
  }

  loadAuditDetail(id: string): void {
    this.auditService.getAuditById(id).subscribe({
      next: (data) => {
        this.audit = data;
      },
      error: (err) => {
        this.errorMessage = 'Error al carregar el detall del registre.';
        console.error(err);
      }
    });
  }

  revertChange(id: string): void {
    if (!confirm('Estàs segur que vols revertir aquest canvi?')) return;

    // Eliminem 'res' ja que no s'utilitzava i evitava l'avís de variables no usades d'ESLint
    this.auditService.revertAudit(id).subscribe({
      next: () => {
        this.successMessage = 'Canvi revertit correctament!';
        setTimeout(() => this.router.navigate(['/audits']), 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al intentar revertir el canvi.';
      }
    });
  }
}