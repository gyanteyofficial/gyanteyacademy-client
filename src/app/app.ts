import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  currentSlide = signal(0);
  showCoursesDropdown = signal(false);
  currentPage = signal('home');
  activeTestFilter = signal('All');

  examCategories = [
    { icon: '🏛', name: 'SSC', active: true },
    { icon: '🏦', name: 'Banking', active: false },
    { icon: '🚂', name: 'Railways', active: false },
    { icon: '📋', name: 'State Exams', active: false },
    { icon: '⚔️', name: 'Defence Exams', active: false },
    { icon: '🎓', name: 'Teaching Exams', active: false },
    { icon: '🏛', name: 'UPSC', active: false },
    { icon: '⚙️', name: 'Engineering Exams', active: false },
    { icon: '🏥', name: 'Medical Exams', active: false },
    { icon: '💡', name: 'Skill Development', active: false },
  ];

  sscExams = [
    { code: 'CGL', name: 'SSC CGL', subtitle: 'Combined Graduate Level', color: '#1a3c6e' },
    { code: 'CHSL', name: 'SSC CHSL', subtitle: 'Combined Higher Secondary Level', color: '#1a2e5c' },
    { code: 'MTS', name: 'SSC MTS', subtitle: 'Multi Tasking Staff', color: '#1e3a5f' },
    { code: 'GD', name: 'SSC GD', subtitle: 'General Duty Constable', color: '#2c3e6e' },
    { code: 'CPO', name: 'SSC CPO', subtitle: 'Central Police Organization', color: '#c0392b' },
    { code: 'STENO', name: 'SSC Stenographer', subtitle: 'Grade C & D', color: '#e67e22' },
    { code: 'DP', name: 'Delhi Police', subtitle: 'Constable & Head Constable', color: '#1a3c7e' },
    { code: 'OTHER', name: 'Other SSC Exams', subtitle: 'JE, Selection Post, Phase Exams', color: '#2d4a6e' },
  ];

  popularCourses = [
    { name: 'SSC CGL 2027', type: 'Complete Foundation Course', hours: 320, videos: 500, price: 1999, originalPrice: 4999, img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=80&h=60&fit=crop' },
    { name: 'SSC CHSL 2027', type: 'Complete Course', hours: 280, videos: 450, price: 1699, originalPrice: 3999, img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=80&h=60&fit=crop' },
    { name: 'SSC MTS 2027', type: 'Complete Course', hours: 200, videos: 300, price: 999, originalPrice: 2499, img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=80&h=60&fit=crop' },
    { name: 'SSC GD 2027', type: 'Complete Course', hours: 150, videos: 250, price: 799, originalPrice: 1999, img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=80&h=60&fit=crop' },
  ];

  whyLearnItems = [
    { icon: '👨‍🏫', title: 'Expert Faculty', desc: 'Learn from top educators' },
    { icon: '📚', title: 'Structured Courses', desc: 'Well organized & easy to follow' },
    { icon: '🔄', title: 'Regular Updates', desc: 'Syllabus updates as per latest exam pattern' },
    { icon: '📝', title: 'Mock Tests', desc: 'Topic-wise & full length tests' },
    { icon: '📊', title: 'Performance Analysis', desc: 'Track your progress and improve' },
  ];

  // Mock Tests page data
  mockTestFilters = ['All', 'SSC CGL', 'SSC CHSL', 'SSC MTS', 'SSC GD', 'SSC CPO', 'Stenographer', 'Delhi Police'];

  mockSidebarItems = [
    { icon: '📋', name: 'All Mock Tests', active: true },
    { icon: '📄', name: 'SSC CGL', active: false },
    { icon: '📄', name: 'SSC CHSL', active: false },
    { icon: '📄', name: 'SSC MTS', active: false },
    { icon: '📄', name: 'SSC GD', active: false },
    { icon: '📄', name: 'SSC CPO', active: false },
    { icon: '🎯', name: 'Stenographer', active: false },
    { icon: '🛡', name: 'Delhi Police', active: false },
    { icon: '⚙️', name: 'Custom Tests', active: false },
    { icon: '📰', name: 'Previous Papers', active: false },
    { icon: '📊', name: 'Test Series', active: false },
    { icon: '🔖', name: 'Bookmarks', active: false },
  ];

  latestMockTests = [
    { name: 'SSC CGL Full Length Mock Test #15', type: 'Full Length Test', questions: 100, mins: 60, marks: 200, attempts: 12458, color: '#3b82f6' },
    { name: 'SSC CGL Tier 1 Mock Test #14', type: 'Full Length Test', questions: 100, mins: 60, marks: 200, attempts: 9876, color: '#3b82f6' },
    { name: 'SSC CHSL Mock Test #12', type: 'Full Length Test', questions: 100, mins: 60, marks: 200, attempts: 6543, color: '#10b981' },
    { name: 'SSC MTS Mock Test #08', type: 'Full Length Test', questions: 100, mins: 60, marks: 200, attempts: 5321, color: '#f59e0b' },
    { name: 'SSC GD Constable Mock Test #10', type: 'Full Length Test', questions: 80, mins: 60, marks: 160, attempts: 7654, color: '#ef4444' },
  ];

  testSeriesList = [
    { name: 'SSC CGL Tier 1 Test Series 2024', tests: 25, fullLength: 25, progress: 60 },
    { name: 'SSC CHSL Tier 1 Test Series 2024', tests: 20, fullLength: 20, progress: 35 },
  ];

  topRankers = [
    { rank: 1, medal: '🥇', name: 'Rahul Kumar', score: '198/200', percentile: 99.8 },
    { rank: 2, medal: '🥈', name: 'Priya Singh', score: '196/200', percentile: 99.5 },
    { rank: 3, medal: '🥉', name: 'Amit Verma', score: '194/200', percentile: 99.2 },
  ];

  // Home page data
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

  navigate(page: string, e?: Event) {
    if (e) e.preventDefault();
    this.currentPage.set(page);
    this.showCoursesDropdown.set(false);
    window.scrollTo(0, 0);
  }

  toggleCoursesDropdown(e: Event) {
    e.stopPropagation();
    this.showCoursesDropdown.update(v => !v);
  }

  setTestFilter(f: string) {
    this.activeTestFilter.set(f);
  }

  @HostListener('document:click')
  closeDropdowns() {
    this.showCoursesDropdown.set(false);
  }

  prevSlide() {
    this.currentSlide.update(v => Math.max(0, v - 1));
  }

  nextSlide() {
    this.currentSlide.update(v => Math.min(this.courses.length - 5, v + 1));
  }
}
