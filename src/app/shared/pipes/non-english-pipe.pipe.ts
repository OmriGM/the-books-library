import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name:'nonEnglish'
})
export class NonEnglishPipePipe implements PipeTransform {

  transform(value: any, args?: any) {
    if(value)
      return value.replace(/[^A-Za-z() 0-9,.]/g, '');
  }
}
