import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimText',
})
export class TrimTextPipe implements PipeTransform {
  transform(value: string, ...args: number[]): string {
    let result = value.slice(0, args[0]);
    result += '...';
    return result;
  }
}
