import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' //This makes the service available globally across the app (singleton instance).
})
export class RouterService {
  isAdminRoute$ = new BehaviorSubject(false);
  isEmployeeRoute$ = new BehaviorSubject(false);
  isCustomerRoute$ = new BehaviorSubject(false);

  constructor(private router: Router) {
    //NavigationEnd is used in Angular's Router to detect when a navigation event has successfully completed.
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.isAdminRoute$.next(event.urlAfterRedirects.startsWith('/admin'));
      this.isEmployeeRoute$.next(event.urlAfterRedirects.startsWith('/employee'));
      this.isCustomerRoute$.next(event.urlAfterRedirects.startsWith('/user'));
    });
  }
}
