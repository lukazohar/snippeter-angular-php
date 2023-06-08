import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(value: string, strToReplace: string, replacementStr: string): string {
    if(!value || ! strToReplace || ! replacementStr)
      return value;
      
    const test = value.replace("\t", "AAAAAA");
    
    return test
  }

}
