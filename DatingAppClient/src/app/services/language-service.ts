// src/app/core/services/language.service.ts
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type AppLang = 'en' | 'ar';
export type AppTheme = 'en-light' | 'ar-light';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private currentLang: AppLang = 'en';

  constructor(@Inject(DOCUMENT) private doc: Document) {}

  setLanguage(lang: AppLang) {
    this.currentLang = lang;
    const html = this.doc.documentElement;

    // Requirement: change dir and toggle 'rtl' class
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    html.classList.toggle('rtl', lang === 'ar');

    // DaisyUI theme switch
    const theme: AppTheme = lang === 'ar' ? 'ar-light' : 'en-light';
    html.setAttribute('data-theme', theme);

    // Optional: add lang attribute for screen readers
    html.setAttribute('lang', lang);
  }

  getLanguage() {
    return this.currentLang;
  }
}
