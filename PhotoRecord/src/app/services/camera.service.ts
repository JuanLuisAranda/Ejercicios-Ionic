import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins,CameraResultType, CameraSource, FilesystemDirectory, Capacitor } from '@capacitor/core';
const { Camera} = Plugins

const {  Filesystem } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  imageOptions = {
    // Await para esperar a que llegue la foto y entonces la guarda
    quality: 50,
    allowEditing: false,
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera
  };

  constructor( private sanitizer: DomSanitizer ) {}

   // Copiado para la camara (Tomadas de https://capacitor.ionicframework.com/docs/apis/camera/)
  async takePicture(): Promise<string> {
    const originalPhoto = await Camera.getPhoto(this.imageOptions);
    const photoInTempStorage = await Filesystem.readFile({path: originalPhoto.path});
    const miliseconds = (new Date()).getTime();
    const fileName = miliseconds + ".jpg";

    await Filesystem.writeFile({
      data: photoInTempStorage.data,
      path: fileName, 
      directory: FilesystemDirectory.Data
    });

    const finalPhotoUri = await Filesystem.getUri({directory: FilesystemDirectory.Data, 
      path: fileName
    });

    const photoPath = Capacitor.convertFileSrc(finalPhotoUri.uri);

    console.log('\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
    console.log('\nURL1:  ' + finalPhotoUri.uri);
    console.log('\nURL2:  ' + photoPath);
    console.log('\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');


    return photoPath;
    
  }

}
