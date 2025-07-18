import { Component } from '@angular/core';
import { BannerCarousel } from '../banner-carousel/banner-carousel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule, BannerCarousel, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  products = [
    {
      name: 'Redmi Note 12',
      price: 13999,
      image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/p/x/i/-original-imahdxq5dab5euhj.jpeg?q=70'
    },
    {
      name: 'Samsung Galaxy M14',
      price: 15999,
      image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/e/6/d/galaxy-m14-5g-sm-m146b-samsung-original-imagzvnkybtue5da.jpeg?q=70'
    },
    {
      name: 'Noise Smartwatche',
      price: 52999,
      image: 'https://rukminim2.flixcart.com/image/220/220/kz1lle80/smartwatch/m/f/q/-original-imagb54tb6fpurze.jpeg?q=60'
    },
    {
      name: 'Soft Toy',
      price: 52999,
      image: 'kidssection.webp'
    },
    {
      name: 'Beds',
      price: 52999,
      image: 'https://rukminim2.flixcart.com/image/220/220/jm9hfgw0/bed/h/g/g/king-na-rosewood-sheesham-bkwl05nhbs0401d1p-flipkart-perfect-original-imaf97cwhvgnwg95.jpeg?q=60'
    },
    {
      name: 'Apple iPhone 16 Pro',
      price: 52999,
      image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/o/h/m/-original-imah4jywmcz5ysz3.jpeg?q=70'
    }
  ];

  addToCart(product: any) {
    console.log('Adding to cart:', product);
    // your cart service logic here
  }

}
