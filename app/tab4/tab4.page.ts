import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../foto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  urlImageStorage : string[] = [];

  constructor(private afStorage : AngularFireStorage, public fotoService: FotoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {}

  async ionViewDidEnter() {
    let condition = this.activatedRoute.snapshot.paramMap.get('condition');
    console.log(condition);
    if(condition == '3') {
      await this.fotoService.loadFoto();
      this.tampilkanData()
    }
  }

  tampilkanData() {
    this.urlImageStorage = [];
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          itemRef.getDownloadURL().then(url => {
            this.urlImageStorage.unshift(url)
          })
        })
      }).catch((error) =>{
        console.log(error)
      })
  }

  back() {
    this.router.navigate(['/tab3']);
  }

}
