import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { PhotoRecord } from '../model/photo-record';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  foto: string;
  
  photos: PhotoRecord[] = [];

  constructor(private storage: Storage) {
    this.storage.get('photos').then(
      data => this.photos = data == null ? [] : data
    );
   }

  insertPhoto(path: SafeResourceUrl) {
    const record: PhotoRecord = {
      path: path,
      date: new Date()
    }
    this.photos.unshift(record);
    this.savePhotos();
  }

  removePhoto(path: SafeResourceUrl) {
    const i = this.photos.map(p => p.path).indexOf(path); // Me da el índice de donde está la foto
    this.photos.splice(i, 1); // Indico el índice y que voy a borrar 1 (ese mismo)
    this.savePhotos();
  }

  getPhotos(){
    return this.photos;
  }

  savePhotos(): Promise<boolean> {
    return this.storage.set('photos', this.photos);

  }

  verFoto(path:string) {

    this.foto = path;


  }
}
