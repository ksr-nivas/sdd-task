import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/reducers/auth.reducer';
import { getLoggedInUser } from '../../../store/selectors/auth.selector';
import { take } from 'rxjs';
import { User } from '../../../modules/login/models/user.model';

@Component({
  selector: 'sdd-delete-confirmation',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteConfirmationComponent implements OnInit{
  readonly store = inject(Store<AuthState>);
  user!: User | undefined | null;

  constructor(public dialogRef: MatDialogRef<DeleteConfirmationComponent>,) { }

  ngOnInit(): void {
    this.store.select(getLoggedInUser).pipe(take(1)).subscribe({
      next: (user) => {
        this.user = user;
      }
    });
  }

  delete() {
    if(this.user?.permissions?.includes('D')) {
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(false);
    }
  }
}
