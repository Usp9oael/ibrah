// breadcrumbs.service.ts

import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {
  private breadcrumbs$ = new BehaviorSubject<any[]>([]);

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const breadcrumbs = this.createBreadcrumbs(this.router.routerState.root.snapshot);
      this.breadcrumbs$.next(breadcrumbs);
    });
  }

  getBreadcrumbs() {
    return this.breadcrumbs$.asObservable();
  }

  private createBreadcrumbs(route: ActivatedRouteSnapshot, crumbs: any[] = []): any[] {
    const label = route.data['breadcrumb'] || route.routeConfig?.path;
    const path = route.url.map(segment => segment.path).join('/');
    const breadcrumb = {
      label: label,
      url: '/' + path
    };
    const newCrumbs = [...crumbs, breadcrumb];
    if (route.firstChild) {
      return this.createBreadcrumbs(route.firstChild, newCrumbs);
    }
    return newCrumbs;
  }
}
