import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { RouterService } from './services/routeservice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // protected title = 'webapp';
  isAdminRoute = false;
  isEmployeeRoute = false;
  isCustomerRoute = false;

  constructor(public routerService: RouterService) { }

  // ngOnInit() {
  //   this.routerService.isAdminRoute$.subscribe(isAdmin => this.isAdminRoute = isAdmin);
  // }
}
