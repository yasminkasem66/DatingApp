
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TRANSLATION_LOADER, TranslationLoader } from './translation-loader';

// Utility: get nested value by dot path
function getByPath(obj: Record<string, any>, path: string): any {
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

export type SupportedLang = 'en' | 'ar';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private currentLang: SupportedLang = (localStorage.getItem('app.lang') as SupportedLang) || 'en';
  private translationsCache = new Map<SupportedLang, Record<string, any>>();
  private lang$ = new BehaviorSubject<SupportedLang>(this.currentLang);

  constructor(@Inject(TRANSLATION_LOADER) private loader: TranslationLoader) {
    // Initialize language on service creation
    this.applyDocumentDirection(this.currentLang);
    this.ensureLoaded(this.currentLang);
  }

  /** Public API: get the current language */
  getCurrentLanguage(): SupportedLang {
    return this.currentLang;
  }

  /** Public API: set and load a language, update document direction */
  async setLanguage(lang: SupportedLang): Promise<void> {
    if (this.currentLang === lang) return;
    await this.ensureLoaded(lang);
    this.currentLang = lang;
    localStorage.setItem('app.lang', lang);
    this.applyDocumentDirection(lang);
    this.lang$.next(lang);
  }

  /** Public API: fetch a translation synchronously (fallback to key if missing) */
  getTranslation(key: string): string {
    const dict = this.translationsCache.get(this.currentLang) || {};
    const val = getByPath(dict, key);
    return typeof val === 'string' ? val : key;
  }

  /** Reactive stream to help pipes/components react to language changes */
  languageChanges$() {
    return this.lang$.asObservable();
  }

  /** Load and cache translations for a given language */
  private async ensureLoaded(lang: SupportedLang) {
    if (!this.translationsCache.has(lang)) {
      try {
        const data = await this.loader.load(lang);
        this.translationsCache.set(lang, data || {});
      } catch (err) {
        console.error(`[TranslationService] Failed to load language ${lang}`, err);
        // Fallback to empty object to avoid crashes
        this.translationsCache.set(lang, {});
      }
    }
  }

  /** Update document direction and RTL class */
  private applyDocumentDirection(lang: SupportedLang) {
    const html = document.documentElement;
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    html.classList.toggle('rtl', lang === 'ar');
    html.setAttribute('lang', lang);
  }
}
