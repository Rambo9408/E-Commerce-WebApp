import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  isAdminRoute$ = new BehaviorSubject(false);
  isEmployeeRoute$ = new BehaviorSubject(false);
  isCustomerRoute$ = new BehaviorSubject(false);

  constructor(private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.isAdminRoute$.next(event.urlAfterRedirects.startsWith('/admin'));
      this.isEmployeeRoute$.next(event.urlAfterRedirects.startsWith('/employee'));
      this.isCustomerRoute$.next(event.urlAfterRedirects.startsWith('/user'));
    });
  }
}
