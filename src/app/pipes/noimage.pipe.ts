import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(images: any[] ): string {
    return (!images) ? 'assets/img/noimage.png'
                     : (images.length > 0) ? images[0].url
                                           : null;
    //el path relativo es desde el index.html
  }

}
