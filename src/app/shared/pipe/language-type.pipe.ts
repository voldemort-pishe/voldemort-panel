import { Pipe, PipeTransform } from '@angular/core';
import { LanguageType } from '../model/enumeration/language-type';

@Pipe({ name: 'languageType' })
export class LanguageTypePipe implements PipeTransform {
    transform(value: LanguageType): string {
        switch (value) {
            case LanguageType.En: return 'انگلیسی';
            case LanguageType.Fa: return 'فارسی';
            case LanguageType.Both: return 'هردو';
            default: return '[تعریف نشده]';
        }
    }
}
