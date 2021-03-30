import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService, Photo } from '../foto.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  condition = '2';
  urlImageStorage : string[] = [];
  selectedPhoto : Photo[] = [];

  constructor(public fotoService: FotoService, private afStorage : AngularFireStorage) {}

  async ngOnInit() {
    await this.fotoService.loadFoto();
  }

  tambahFoto() {
    this.fotoService.tambahFoto();
  }

  select(dataFoto) {
    console.log('selected');
    this.selectedPhoto.unshift(dataFoto);
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
  }
}
