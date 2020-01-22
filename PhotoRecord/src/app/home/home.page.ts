import { Component } from "@angular/core";

// Importaciones para la camara (Tomadas de https://capacitor.ionicframework.com/docs/apis/camera/)
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
const { Camera } = Plugins;
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { CameraService } from '../services/camera.service';
import { PhotoService } from '../services/photo.service';
import { ShareService } from '../services/share.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {

  foto: string;
//activated route
  constructor(private router: Router, private cameraService: CameraService, private route: ActivatedRoute,
    private photoService: PhotoService, private shareService: ShareService, public alertController: AlertController) {}

  async takePicture(){
    const photoPath = await this.cameraService.takePicture();
    this.photoService.insertPhoto(photoPath);
    console.log("Ruta de la foto: " + photoPath);
  }

  removePhoto(path: SafeResourceUrl){
    this.photoService.removePhoto(path);
  }

  async presentAlertConfirm(path: string) {
    const alert = await this.alertController.create({
      header: 'Borrar foto',
      message: `¿Estas seguro? Vas a borrar la foto.`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Aceptar',
          handler: () => this.removePhoto(path)
        }
      ]
    });
    await alert.present();
  }

  sharePhoto(path:string) {
    this.shareService.sharePhoto(path);

  }
  verFoto(path:string) {

    this.router.navigateByUrl(
      `/details${ path != undefined ? '/' + path : ''}`
    );


  }

  
  
}
