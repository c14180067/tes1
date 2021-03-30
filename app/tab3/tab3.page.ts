import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../foto.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  dataImage : any = [];

  constructor(private afStorage : AngularFireStorage, public fotoService: FotoService) {}

  async ionViewDidEnter() {
    await this.fotoService.loadFoto();
    this.tampilkanData()
  }

  tampilkanData() {
    this.dataImage = [];
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          itemRef.getDownloadURL().then(url => {
            var data = {
              'nama': itemRef.name,
              'url': url
            }
            this.dataImage.unshift(data)
          })
        })
      }).catch((error) =>{
        console.log(error)
      })
  }

}
