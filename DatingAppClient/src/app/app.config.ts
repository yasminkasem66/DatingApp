import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient()
  ]
};




// // import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
// // import { provideRouter } from '@angular/router';



// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideHttpClient } from '@angular/common/http';
// import { AppComponent } from './app/app.component';
// import { TRANSLATION_LOADER, JsonHttpTranslationLoader } from './app/core/i18n/translation-loader';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(),
//     // Use JSON loader (default)
//     {
//       provide: TRANSLATION_LOADER,
//       useClass: JsonHttpTranslationLoader
//     }
//     // To switch to external API loader:
//     // { provide: TRANSLATION_LOADER, useClass: ExternalApiTranslationLoader },
//   ]
// }).catch(err => console.error(err));

// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideHttpClient, HttpClient } from '@angular/common/http';
// import { AppComponent } from './app/app.component';
// import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { importProvidersFrom } from '@angular/core';

// export function httpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
// }

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(),
//     importProvidersFrom(
//       TranslateModule.forRoot({
//         defaultLanguage: 'en',
//         loader: {
//           provide: TranslateLoader,
//           useFactory: httpLoaderFactory,
//           deps: [HttpClient]
//         }
//       })
//     )
//   ]
// }).then(appRef => {
//   const injector = appRef.injector;
//   const translate = injector.get(TranslateService);
//   // Default + document direction
//   translate.addLangs(['en', 'ar']);
//   translate.setDefaultLang('en');
//   translate.use('en');
//   document.documentElement.setAttribute('dir', 'ltr');
// });
