import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService, Photo } from '../foto.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  condition = '2';
  urlImageStorage : string[] = [];
  selectedPhoto : Photo[] = [];

  constructor(public fotoService: FotoService, private afStorage : AngularFireStorage, public alertController: AlertController) {}

  async ngOnInit() {
    await this.fotoService.loadFoto();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Sukses',
      message: 'Foto berhasil di upload!',
      buttons: ['OK']
    });
    await alert.present();
  }

  tambahFoto() {
    this.fotoService.tambahFoto();
  }

  select(dataFoto, id) {
    if(!this.selectedPhoto.includes(dataFoto)) {
      document.getElementById(id).style.border = '5px solid'
      this.selectedPhoto.unshift(dataFoto);
    }
    else {
      document.getElementById(id).style.border = '0px solid'
      const index = this.selectedPhoto.indexOf(dataFoto);
      this.selectedPhoto.splice(index,1);
    }
  }

  uploadFoto() {
    if(this.selectedPhoto) {
      for(var i = 0; i < this.selectedPhoto.length; i++) {
        const imgFilePath = `imgStorage/${this.selectedPhoto[i].filePath}`
        this.afStorage.upload(imgFilePath, this.selectedPhoto[i].dataImage).then(() => {
         this.afStorage.storage.ref().child(imgFilePath).getDownloadURL().then(url => {
          this.urlImageStorage.unshift(url)
         });
        });
      }
    }
    this.selectedPhoto = [];
    this.presentAlert();
  }
}
