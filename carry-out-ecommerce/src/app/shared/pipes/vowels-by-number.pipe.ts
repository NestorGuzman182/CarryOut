import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vowelsByNumber',
  standalone: true
})
export class VowelsByNumberPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    return value.replace(/[aA]/g, '4')
                .replace(/[eE]/g, '3')
                .replace(/[iI]/g, '1')
                .replace(/[oO]/g, '0')
                .replace(/[uU]/g, 'X');
  }
}
