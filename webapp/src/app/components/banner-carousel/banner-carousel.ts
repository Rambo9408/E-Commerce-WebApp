import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-banner-carousel',
  imports: [FormsModule,CommonModule],
  templateUrl: './banner-carousel.html',
  styleUrl: './banner-carousel.css'
})
export class BannerCarousel implements OnInit {
  banners: string[] = [
    'flightbook.webp',
    'ferniture.webp',
    'mobile.webp'
  ];

  currentIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.autoSlide();
  }

  autoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.banners.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.banners.length) % this.banners.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

}
