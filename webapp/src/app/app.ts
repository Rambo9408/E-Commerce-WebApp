import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { RouterService } from './services/routeservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule, MatButtonModule, FormsModule, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'webapp';
  isAdminRoute = false;
  isEmployeeRoute = false;
  isCustomerRoute = false;

  constructor(public routerService : RouterService) {  }
}
