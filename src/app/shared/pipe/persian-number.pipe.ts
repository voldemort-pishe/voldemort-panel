import { Pipe, PipeTransform } from '@angular/core';
import { HelpersService } from '../services/helpers.service';

@Pipe({ name: 'persianNumber' })
export class PersianNumberPipePipe implements PipeTransform {

  constructor(private helpersService: HelpersService) { }

  transform(value: string): String {
    return this.helpersService.toPersianNumber(value);
  }
}
