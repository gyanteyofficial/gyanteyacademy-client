import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  currentSlide = signal(0);

  courses = [
    { name: 'SSC CGL 2027', subtitle: 'Complete Foundation', color: '#1a3c6e', hours: 320, videos: 600, price: 1999, originalPrice: 4999, badge: '🏅' },
    { name: 'SSC CHSL 2027', subtitle: 'Complete Course', color: '#1a5c2e', hours: 280, videos: 450, price: 1699, originalPrice: 3999, badge: '🏅' },
    { name: 'SSC MTS 2027', subtitle: 'Complete Course', color: '#5c3a1e', hours: 200, videos: 300, price: 999, originalPrice: 2499, badge: '🏅' },
    { name: 'SSC GD 2027', subtitle: 'Complete Course', color: '#1a3c6e', hours: 150, videos: 250, price: 799, originalPrice: 1999, badge: '🏅' },
    { name: 'SSC CPO 2027', subtitle: 'Complete Course', color: '#4a1a5c', hours: 180, videos: 280, price: 1499, originalPrice: 3499, badge: '🏅' },
    { name: 'Delhi Police 2027', subtitle: 'Complete Course', color: '#5c1a1a', hours: 160, videos: 240, price: 899, originalPrice: 1999, badge: '🏅' },
  ];

  currentAffairs = [
    { title: 'India and Australia Hold 15th Military Training...', tag: 'National', date: '31 May 2024' },
    { title: 'World No Tobacco Day 2024 Observed Globally', tag: 'International', date: '31 May 2024' },
    { title: 'RBI Keeps Repo Rate Unchanged at 6.50%', tag: 'Economy', date: '31 May 2024' },
  ];

  topPerformers = [
    { rank: 1, name: 'Rahul Kumar', exam: 'SSC CGL 2023', score: '720/720' },
    { rank: 2, name: 'Priya Singh', exam: 'SSC CHSL 2023', score: '718/720' },
    { rank: 3, name: 'Amit Verma', exam: 'SSC CGL 2023', score: '715/720' },
  ];

  prevSlide() {
    this.currentSlide.update(v => Math.max(0, v - 1));
  }

  nextSlide() {
    this.currentSlide.update(v => Math.min(this.courses.length - 5, v + 1));
  }
}
