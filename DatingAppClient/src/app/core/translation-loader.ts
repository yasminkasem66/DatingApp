
// Interface for pluggable loaders
export interface TranslationLoader {
  load(lang: string): Promise<Record<string, any>>;
}

// Default JSON loader using HttpClient
import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class JsonHttpTranslationLoader implements TranslationLoader {
  constructor(private http: HttpClient) {}

  async load(lang: string): Promise<Record<string, any>> {
    // e.g., assets/i18n/en.json
    return await this.http.get<Record<string, any>>(`/assets/i18n/${lang}.json`).toPromise();
  }
}

// Example External API loader (replace URL with your endpoint)
@Injectable({ providedIn: 'root' })
export class ExternalApiTranslationLoader implements TranslationLoader {
  constructor(private http: HttpClient) {}

  async load(lang: string): Promise<Record<string, any>> {
    // Example: GET translations from API
    // Ensure CORS and proper caching on server side
    const url = `https://api.example.com/translations?lang=${encodeURIComponent(lang)}`;
    return await this.http.get<Record<string, any>>(url).toPromise();
  }
}

// DI token to let you swap loaders at bootstrap
