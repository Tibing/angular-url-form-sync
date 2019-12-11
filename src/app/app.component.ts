import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck, tap } from 'rxjs/operators';
import { merge, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form = new FormControl('');

  private queryFromForm$: Observable<string> = this.form.valueChanges
    .pipe(
      tap((query: string) => this.syncUrlState(query)),
    );

  private queryFromUrl$: Observable<string> = this.route.queryParams
    .pipe(
      pluck('query'),
    );

  resultingDataSet$: Observable<string> = merge(this.queryFromForm$, this.queryFromUrl$)
    .pipe(
      // query data or persist this query or do whatever
    );

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  private syncUrlState(query: string): void {
    this.router.navigate(['/'], { queryParams: { query } });
  }
}
