import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, FormsModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'webapp';
}
