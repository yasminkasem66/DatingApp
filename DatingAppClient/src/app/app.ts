// import { Component, OnInit, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { Users } from './services/users';
// import { Member } from './models/member';
// import { CommonModule } from '@angular/common';
// import { LanguageService } from './services/language-service';
// import { UiButtonComponent } from "./shared/button/button";

// @Component({
//   selector: 'app-root',
//   imports: [CommonModule, UiButtonComponent],
//   templateUrl: './app.html',
//   styleUrl: './app.css',
// })
// export class App implements OnInit {
//   members = signal<Member[]>([]);
//   loading = signal<boolean>(false);

//   constructor(private membersService: Users, private langSvc: LanguageService) {
//     this.langSvc.setLanguage('en'); // or 'ar'
//   }

//   ngOnInit(): void {
//     this.loadMembers();
//   }

//   loadMembers() {
//     this.loading.set(true);
//     this.membersService.getMembers().subscribe({
//       next: (res) => {
//         this.loading.set(false);
//         this.members.set(res);
//       },
//       error: () => {
//         this.loading.set(false);
//       },
//     });
//   }
// }



import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from './core/i18n/translation.service';
import { AppTranslatePipe } from './core/i18n/translate.pipe';
import { LanguageSwitcherComponent } from './shared/i18n/language-switcher.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, AppTranslatePipe, LanguageSwitcherComponent],
  template: `
    <main class="p-4">
      <app-language-switcher></app-language-switcher>

      <h1 class="text-2xl font-semibold mt-4">
        {{ 'nav.home' | appTranslate }}
      </h1>

      <button class="px-4 py-2 rounded bg-teal-500 text-white mt-3">
        {{ 'buttons.save' | appTranslate }}
      </button>

      <p class="mt-4">
        <!-- Using the service function directly in TS and binding here -->
        {{ welcomeMessage() }}
      </p>
    </main>
  `
})
export class AppComponent {
  // Example of interpolation handled manually
  welcomeMessage = computed(() => {
    const raw = this.translation.getTranslation('messages.welcome');
    return raw.replace('{{name}}', 'Yasmin');
  });

  constructor(private translation: TranslationService) {}
}
