import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
const { Camera } = Plugins;
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { CameraService } from '../../services/camera.service';
import { PhotoService } from '../../services/photo.service';
import { ShareService } from '../../services/share.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PhotoRecord } from 'src/app/model/photo-record';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  

  foto: string;

  constructor(private cameraService: CameraService, private route: ActivatedRoute,
    private photoService: PhotoService, private shareService: ShareService, public alertController: AlertController) { }

  ngOnInit() {
    
  }

  verFoto(path:string) {

    this.photoService.verFoto(path);


  }

}
