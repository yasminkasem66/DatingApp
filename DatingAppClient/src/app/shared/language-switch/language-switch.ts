import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService, SupportedLang } from '../../core/i18n/translation.service';

@Component({
  standalone: true,
  selector: 'app-language-switcher',
  imports: [CommonModule],
  template: `
    <div class="inline-flex gap-2 items-center">
      <button
        type="button"
        class="px-3 py-1 rounded border"
        [class.bg-gray-200]="currentLang() === 'en'"
        (click)="switch('en')"
      >
        EN
      </button>

      <button
        type="button"
        class="px-3 py-1 rounded border"
        [class.bg-gray-200]="currentLang() === 'ar'"
        (click)="switch('ar')"
      >
        AR
      </button>
    </div>

    <p class="mt-3 text-sm text-gray-600">
      Current language: <strong>{{ currentLang() }}</strong>
    </p>
  `,
})
export class LanguageSwitcherComponent {
  // Using Angular signals to reflect current language
  currentLang = signal<SupportedLang>(this.translation.getCurrentLanguage());

  constructor(private translation: TranslationService) {
    this.translation.languageChanges$().subscribe((lang) => this.currentLang.set(lang));
  }

  async switch(lang: SupportedLang) {
    await this.translation.setLanguage(lang);
  }
}





// import { Component } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';

// @Component({
//   standalone: true,
//   selector: 'app-lang-switcher-ngx',
//   template: `
//     <button (click)="switch('en')">EN</button>
//     <button (click)="switch('ar')">AR</button>
//   `
// })
// export class LangSwitcherNgxComponent {
//   constructor(private translate: TranslateService) {}

//   switch(lang: 'en' | 'ar') {
//     this.translate.use(lang);
//     // RTL/LTR handling
//     document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
//     document.documentElement.classList.toggle('rtl', lang === 'ar');
//     document.documentElement.setAttribute('lang', lang);
//   }
// }
