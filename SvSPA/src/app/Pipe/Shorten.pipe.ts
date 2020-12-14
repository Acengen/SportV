import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: any): any {
        if(value.length > 10) {
          return value.substr(0,10);
        }
      return value;
  }

}
