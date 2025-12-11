
import { Pipe, PipeTransform, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslationService } from './translation.service';

@Pipe({
  name: 'appTranslate',
  standalone: true,
  pure: false
})
export class AppTranslatePipe implements PipeTransform, OnDestroy {
  private sub: Subscription;

  constructor(private t: TranslationService, private cdr: ChangeDetectorRef) {
    this.sub = this.t.languageChanges$().subscribe(() => this.cdr.markForCheck());
  }

  transform(key: string): string {
    return this.t.getTranslation(key);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
