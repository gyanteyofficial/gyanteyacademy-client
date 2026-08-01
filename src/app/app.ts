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
  activeCaFilter = signal('All');
  activeCaSidebar = signal('Today');
  activeSmFilter = signal('All');
  activeSmSidebar = signal('All Study Material');

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

  // Current Affairs page data
  caSidebarItems = [
    { icon: '📅', name: 'Today' },
    { icon: '📆', name: 'This Week' },
    { icon: '🗓', name: 'This Month' },
    { icon: '📦', name: 'Monthly Capsule' },
    { icon: '📦', name: 'Yearly Capsule' },
    { icon: '📰', name: 'News in Shorts' },
    { icon: '✏️', name: 'Editorial Analysis' },
    { icon: '❓', name: 'Quiz' },
    { icon: '📊', name: 'Infographics' },
    { icon: '⭐', name: 'Important Days' },
    { icon: '🏛', name: 'Government Schemes' },
  ];

  caFilterTabs = ['All', 'National', 'International', 'Economy', 'Sports', 'Science & Tech'];

  caCategoryFilters = [
    { name: 'National' }, { name: 'International' }, { name: 'Economy' },
    { name: 'Banking & Finance' }, { name: 'Science & Tech' }, { name: 'Environment' },
    { name: 'Sports' }, { name: 'Awards & Honors' }, { name: 'Appointments' },
    { name: 'Reports & Indexes' },
  ];

  caArticles = [
    {
      tag: 'National', tagColor: '#e53e3e',
      title: 'India and Australia Hold 15th Military Training Exercise \'Austra Hind\'',
      desc: 'The 15th edition of India-Australia joint military exercise \'Austra Hind\' has been conducted in Perth, Australia.',
      date: '31 May 2024', readTime: '2 min read',
      img: 'https://images.unsplash.com/photo-1580130732478-4e339fb33746?w=290&h=170&fit=crop',
    },
    {
      tag: 'International', tagColor: '#38a169',
      title: 'World No Tobacco Day 2024 Observed Globally on 31 May',
      desc: 'World No Tobacco Day is observed every year to raise awareness about the harmful effects of tobacco use.',
      date: '31 May 2024', readTime: '3 min read',
      img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=290&h=170&fit=crop',
    },
    {
      tag: 'Economy', tagColor: '#d69e2e',
      title: 'RBI Keeps Repo Rate Unchanged at 6.50%',
      desc: 'The Reserve Bank of India kept the repo rate unchanged at 6.50% for the eighth consecutive time.',
      date: '31 May 2024', readTime: '2 min read',
      img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=290&h=170&fit=crop',
    },
    {
      tag: 'Sports', tagColor: '#7c3aed',
      title: 'IPL 2024: KKR Won by 8 Wickets Against SRH',
      desc: 'Kolkata Knight Riders won the match against Sunrisers Hyderabad by 8 wickets in a thrilling encounter.',
      date: '30 May 2024', readTime: '2 min read',
      img: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=290&h=170&fit=crop',
    },
    {
      tag: 'Science & Tech', tagColor: '#2b6cb0',
      title: 'ISRO Successfully Tests New Generation Rocket Engine',
      desc: 'ISRO has successfully tested the semi-cryogenic engine that will power the next generation launch vehicles.',
      date: '30 May 2024', readTime: '3 min read',
      img: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=290&h=170&fit=crop',
    },
  ];

  caTrendingTopics = [
    { num: 1, name: 'Lok Sabha Elections 2024' },
    { num: 2, name: 'India\'s Economic Growth' },
    { num: 3, name: 'Agniveer Scheme' },
    { num: 4, name: 'AI & Technology' },
    { num: 5, name: 'Climate Change' },
  ];

  setCaFilter(f: string) { this.activeCaFilter.set(f); }
  setCaSidebar(s: string) { this.activeCaSidebar.set(s); }

  // Study Materials page data
  smSidebarItems = [
    { icon: '📚', name: 'All Study Material' },
    { icon: '📝', name: 'Notes' },
    { icon: '📖', name: 'E-books' },
    { icon: '📋', name: 'PYQ Papers' },
    { icon: '🗂', name: 'Practice Sets' },
    { icon: '📊', name: 'Formula Sheets' },
    { icon: '💡', name: 'Important Topics' },
    { icon: '📄', name: 'Previous Year Papers' },
    { icon: '📙', name: 'Exam Guides' },
    { icon: '⬇️', name: 'Download History' },
    { icon: '🔖', name: 'Bookmarks' },
  ];

  smQuickLinks = [
    { icon: '📈', name: 'Trending Now' },
    { icon: '⬇️', name: 'Most Downloaded' },
    { icon: '⭐', name: 'Staff Picks' },
    { icon: '🏅', name: 'Top Rated' },
  ];

  smFilterTabs = ['All', 'SSC CGL', 'SSC CHSL', 'SSC MTS', 'SSC GD', 'CPO', 'Stenographer', 'Delhi Police'];

  smStatCards = [
    { icon: '📝', label: 'Notes', count: '1,250+', sub: 'Study Notes', color: '#7c3aed' },
    { icon: '📖', label: 'E-books', count: '320+', sub: 'E-books', color: '#10b981' },
    { icon: '📋', label: 'PYQ Papers', count: '850+', sub: 'PYQ Papers', color: '#f97316' },
    { icon: '🗂', label: 'Practice Sets', count: '1,100+', sub: 'Practice Sets', color: '#3b82f6' },
    { icon: '📊', label: 'Formula Sheets', count: '250+', sub: 'Formula Sheets', color: '#f59e0b' },
  ];

  smMaterials = [
    {
      icon: '📕', iconBg: '#fee2e2', badge: 'New',
      title: 'SSC CGL Tier 1 Complete Notes (All Subjects)',
      lang: 'English • Hindi', desc: 'Complete notes for Quant, Reasoning, English & GK.',
      downloads: '12.4K', size: '8.6 MB',
    },
    {
      icon: '📗', iconBg: '#dcfce7', badge: 'New',
      title: 'General Awareness eBook 2024',
      lang: 'English • Hindi', desc: '500+ pages eBook covering static GK, current affairs & more.',
      downloads: '8.7K', size: '12.3 MB',
    },
    {
      icon: '📘', iconBg: '#dbeafe', badge: 'New',
      title: 'SSC CGL Tier 1 Previous Year Papers (2018-2023)',
      lang: 'English • Hindi', desc: '6 years PYQ papers with detailed solutions.',
      downloads: '15.2K', size: '15.8 MB',
    },
    {
      icon: '📙', iconBg: '#fef9c3', badge: '',
      title: 'Quantitative Aptitude Practice Set – 50 Sets',
      lang: 'English', desc: '50 full-length practice sets with solutions.',
      downloads: '9.1K', size: '5.2 MB',
    },
    {
      icon: '📕', iconBg: '#fee2e2', badge: '',
      title: 'Important Formulas Sheet (All Subjects)',
      lang: 'English • Hindi', desc: 'Important formulas & shortcuts for quick revision.',
      downloads: '6.3K', size: '1.1 MB',
    },
  ];

  smTopDownloads = [
    { num: 1, icon: '📕', iconBg: '#fee2e2', name: 'SSC CGL Tier 1 Notes (All Subjects)', downloads: '12.4K Downloads' },
    { num: 2, icon: '📘', iconBg: '#dbeafe', name: 'SSC CGL Previous Year Papers (2018-23)', downloads: '15.2K Downloads' },
    { num: 3, icon: '📗', iconBg: '#dcfce7', name: 'General Awareness eBook 2024', downloads: '8.7K Downloads' },
    { num: 4, icon: '📙', iconBg: '#fef9c3', name: 'Quant 50 Practice Sets', downloads: '9.1K Downloads' },
    { num: 5, icon: '📕', iconBg: '#fee2e2', name: 'English Vocabulary eBook', downloads: '6.5K Downloads' },
  ];

  smTrendingMaterials = [
    'Static GK Important Topics',
    'Current Affairs Monthly PDF (May 2024)',
    'Reasoning Short Tricks PDF',
    'English Grammar Notes',
    'Science Important Notes',
  ];

  setSmFilter(f: string) { this.activeSmFilter.set(f); }
  setSmSidebar(s: string) { this.activeSmSidebar.set(s); }

  // Free Resources page data
  frSidebarItems = [
    { icon: '🏠', name: 'Overview' },
    { icon: '📝', name: 'Free Notes' },
    { icon: '📖', name: 'E-books' },
    { icon: '❓', name: 'Practice Questions' },
    { icon: '📄', name: 'Previous Year Papers' },
    { icon: '📋', name: 'Mock Tests (Free)' },
    { icon: '🎯', name: 'Daily Quizzes' },
    { icon: '📰', name: 'Current Affairs PDFs' },
    { icon: '🗓', name: 'Study Plan' },
    { icon: '📆', name: 'Exam Calendar' },
    { icon: '🔗', name: 'Important Links' },
    { icon: '🏛', name: 'Government Websites' },
    { icon: '🎓', name: 'Scholarship Updates' },
    { icon: '⬇️', name: 'Downloads' },
  ];
  activeFrSidebar = signal('Overview');

  frStats = [
    { count: '500+', label: 'Free Notes' },
    { count: '200+', label: 'E-books' },
    { count: '5,000+', label: 'Practice Questions' },
    { count: '300+', label: 'PYQ Papers' },
    { count: '50+', label: 'Mock Tests' },
    { count: 'Daily', label: 'Quizzes' },
  ];

  frCategories = [
    { icon: '📝', iconBg: '#ede9fe', iconColor: '#7c3aed', name: 'Free Notes', desc: 'Handwritten & prepared notes by toppers and experts', count: '500+ Resources' },
    { icon: '📖', iconBg: '#dcfce7', iconColor: '#16a34a', name: 'E-books', desc: 'Detailed e-books for complete syllabus preparation', count: '200+ Resources' },
    { icon: '❓', iconBg: '#fee2e2', iconColor: '#dc2626', name: 'Practice Questions', desc: 'Topic-wise questions to strengthen concepts', count: '5,000+ Questions' },
    { icon: '📄', iconBg: '#ffedd5', iconColor: '#ea580c', name: 'Previous Year Papers', desc: 'Subject-wise PYQs with solutions', count: '300+ Papers' },
    { icon: '📋', iconBg: '#ede9fe', iconColor: '#7c3aed', name: 'Mock Tests (Free)', desc: 'Free full length mock tests for all exams', count: '50+ Tests' },
    { icon: '🎯', iconBg: '#fef9c3', iconColor: '#ca8a04', name: 'Daily Quizzes', desc: 'Attempt daily quizzes and track your progress', count: '100+ Quizzes' },
    { icon: '📰', iconBg: '#ffedd5', iconColor: '#ea580c', name: 'Current Affairs PDFs', desc: 'Daily, Weekly & Monthly current affairs PDFs', count: '100+ PDFs' },
    { icon: '🗓', iconBg: '#dcfce7', iconColor: '#16a34a', name: 'Study Plan', desc: 'Expert recommended study plans for all exams', count: '20+ Plans' },
    { icon: '🔗', iconBg: '#dbeafe', iconColor: '#2563eb', name: 'Important Links', desc: 'Useful links for exam preparation', count: '50+ Links' },
  ];

  frResources = [
    { icon: '📕', iconBg: '#fee2e2', title: 'SSC CHSL Tier 1 Notes (All Subjects)', tag: 'Notes', tagColor: '#7c3aed', tagBg: '#ede9fe', lang: 'English', size: '2.6 MB', action: 'download' },
    { icon: '📗', iconBg: '#dcfce7', title: 'General Awareness eBook 2024', tag: 'E-book', tagColor: '#16a34a', tagBg: '#dcfce7', lang: 'English', size: '12.3 MB', action: 'download' },
    { icon: '📘', iconBg: '#dbeafe', title: 'SSC CGL Tier 1 Previous Year Papers (2018-2023)', tag: 'PYQ Papers', tagColor: '#2563eb', tagBg: '#dbeafe', lang: 'English', size: '15.8 MB', action: 'download' },
    { icon: '📙', iconBg: '#fef9c3', title: '1000 Important GK Questions', tag: 'Practice Questions', tagColor: '#ea580c', tagBg: '#ffedd5', lang: 'English', size: '1.8 MB', action: 'download' },
    { icon: '📋', iconBg: '#ede9fe', title: 'SSC MTS Free Mock Test #1', tag: 'Mock Test', tagColor: '#7c3aed', tagBg: '#ede9fe', lang: 'English', size: '—', action: 'attempt' },
  ];

  frMostDownloaded = [
    { num: 1, icon: '📕', iconBg: '#fee2e2', name: 'SSC CGL Tier 1 Notes (All Subjects)', downloads: '12.4K Downloads' },
    { num: 2, icon: '📘', iconBg: '#dbeafe', name: 'SSC CGL Previous Year Papers (2018-23)', downloads: '9.8K Downloads' },
    { num: 3, icon: '📗', iconBg: '#dcfce7', name: 'General Awareness eBook 2024', downloads: '8.7K Downloads' },
    { num: 4, icon: '📙', iconBg: '#fef9c3', name: 'Quant Formula Sheet', downloads: '7.2K Downloads' },
    { num: 5, icon: '📕', iconBg: '#fee2e2', name: '1000 Important GK Questions', downloads: '6.1K Downloads' },
  ];

  setFrSidebar(s: string) { this.activeFrSidebar.set(s); }

  // Download App page data
  appFeatures = [
    { icon: '▶', iconBg: '#fff0e8', iconColor: '#f97316', title: 'Learn on the Go', desc: 'Access all content anytime, anywhere' },
    { icon: '⬇', iconBg: '#e8f5e9', iconColor: '#16a34a', title: 'Download & Study', desc: 'Download lectures & PDFs for offline learning' },
    { icon: '🔔', iconBg: '#f0f0ff', iconColor: '#7c3aed', title: 'Stay Updated', desc: 'Get instant updates on courses & exams' },
    { icon: '🛡', iconBg: '#fff8e1', iconColor: '#f59e0b', title: 'Secure & Reliable', desc: 'Safe login and smooth learning experience' },
  ];

  appWhyChoose = [
    { icon: '📱', iconBg: '#f0f4ff', title: 'User Friendly', desc: 'Intuitive design for seamless learning' },
    { icon: '⚡', iconBg: '#fffbeb', title: 'Fast & Lightweight', desc: 'Optimized performance for smooth experience' },
    { icon: '☁', iconBg: '#eff6ff', title: 'Offline Access', desc: 'Download and study without internet' },
    { icon: '🔄', iconBg: '#f0fdf4', title: 'Regular Updates', desc: 'New content & features added regularly' },
  ];

  appTrustStats = [
    { icon: '⬇', iconColor: '#3b82f6', count: '50K+', label: 'Downloads' },
    { icon: '▶', iconColor: '#10b981', count: '4.8★', label: 'Ratings on Play Store' },
    { icon: '🍎', iconColor: '#666', count: '4.7★', label: 'Ratings on App Store' },
    { icon: '👥', iconColor: '#f97316', count: '50K+', label: 'Happy Users' },
  ];

  // About Us page data
  aboutHeroChecks = [
    'Quality Study Material',
    'Expert Guidance',
    'Mock Tests & Analysis',
    'Current Affairs Updates',
    'Aspirants Community',
  ];

  aboutStats = [
    { icon: '👥', count: '50,000+', label: 'Happy Students', color: '#f97316' },
    { icon: '📚', count: '500+', label: 'Study Resources', color: '#10b981' },
    { icon: '🏆', count: '10,000+', label: 'Mock Tests Attempted', color: '#7c3aed' },
    { icon: '⭐', count: '1000+', label: 'Success Stories', color: '#f59e0b' },
    { icon: '🏅', count: '4.8/5', label: 'Average Rating', color: '#ef4444' },
  ];

  aboutFeatures = [
    { icon: '📖', iconBg: '#fff3e8', title: 'Quality Content', desc: 'Curated and exam-focused study material for better understanding.' },
    { icon: '🎯', iconBg: '#fff0f0', title: 'Exam Focused', desc: 'Updated resources and mock tests designed to crack real exams.' },
    { icon: '👥', iconBg: '#f0fff4', title: 'Aspirant Driven', desc: 'A supportive community that motivates and inspires you.' },
    { icon: '🏆', iconBg: '#fffbeb', title: 'Proven Results', desc: 'Thousands of aspirants have achieved success with us.' },
    { icon: '⚡', iconBg: '#fef3ff', title: 'Always with You', desc: 'Learn anytime, anywhere on any device with ease.' },
  ];

  aboutMissionStats = [
    { icon: '👥', count: '50,000+', label: 'Students Empowered', color: '#f97316' },
    { icon: '📚', count: '500+', label: 'Study Resources', color: '#10b981' },
    { icon: '🏆', count: '10,000+', label: 'Mock Tests Attempted', color: '#7c3aed' },
    { icon: '⭐', count: '1000+', label: 'Success Stories', color: '#f59e0b' },
  ];

  teamMembers = [
    { name: 'Amit Sharma', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces' },
    { name: 'Priya Verma', role: 'Academic Head', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces' },
    { name: 'Rahul Singh', role: 'Content Lead', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces' },
    { name: 'Neha Yadav', role: 'Research Head', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=faces' },
    { name: 'Arjun Mehta', role: 'Tech Lead', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=faces' },
  ];

  socialChannels = [
    { icon: '▶', name: '/gyanteyacademy', color: '#ff0000', bg: '#fff0f0', label: 'YouTube' },
    { icon: '📷', name: '/gyantey.academy', color: '#e1306c', bg: '#fff0f6', label: 'Instagram' },
    { icon: 'f', name: '/gyanteyacademy', color: '#1877f2', bg: '#f0f4ff', label: 'Facebook' },
    { icon: '✈', name: '/gyanteyacademy', color: '#0088cc', bg: '#f0f8ff', label: 'Telegram' },
    { icon: '𝕏', name: '/gyanteyacademy', color: '#000', bg: '#f5f5f5', label: 'Twitter' },
    { icon: 'in', name: '/gyanteyacademy', color: '#0077b5', bg: '#f0f6ff', label: 'LinkedIn' },
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
