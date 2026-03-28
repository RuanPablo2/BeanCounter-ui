import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkThemeClass = 'dark-theme';

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.enableDarkMode();
    }
  }

  toggleTheme(): void {
    if (this.isDarkMode()) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }

  private enableDarkMode(): void {
    document.body.classList.add(this.darkThemeClass);
    localStorage.setItem('theme', 'dark');
  }

  private disableDarkMode(): void {
    document.body.classList.remove(this.darkThemeClass);
    localStorage.setItem('theme', 'light');
  }

  isDarkMode(): boolean {
    return document.body.classList.contains(this.darkThemeClass);
  }
}