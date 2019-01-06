import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Angular CRUD';
  api: string;
  myData:Array<any>;
  constructor(public http:Http,private toastr: ToastrService){

  }
  trackByFn(index, item) {
    return index;
  }

  showSuccessSaved() {
    this.toastr.success('Alerta', 'Datos guardados!');
    this.datassss();
  }

  showSuccessUpdate() {
    this.toastr.success('Alerta', 'Datos Actualizados!');
  }

  showSuccessDelete() {
    this.toastr.success('Alerta', 'Datos Eliminados!');
  }
  
  datassss(){
    this.api = 'https://parcu.herokuapp.com';
    this.http.get(this.api)
    .pipe(map(response => response.json()))
    .subscribe(res => this.myData = res);
    console.log("datas: " + this.myData);
  }

  sendPostRequest(name, email) {
    var headers = new Headers();
    headers.append('Access-Control-Allow-Headers' , 'Content-Type, Content-Length, Accept-Encoding');
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
    const requestOptions = new RequestOptions({ headers: headers });

    let postData = {
            "user": name,
            "password": email,
    }

    try {
      this.http.post("https://parcu.herokuapp.com/pot", postData)
      .subscribe(data => {
        //console.log(data['_body']);
        
       }, error => {
        console.log(error);
      });
      this.datassss();
      this.showSuccessSaved();
    } catch (error) {
      
    }
    
      
  }

  delete(id) {
    if(confirm("Seguro que quieres eliminar el post?")){
      var headers = new Headers();
      headers.append('Access-Control-Allow-Headers' , 'Content-Type, Content-Length, Accept-Encoding');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');
      const requestOptions = new RequestOptions({ headers: headers });
  
      let postData = {
              "id": id,
      }
  
      this.http.put("http://paunimal.com/angular/api/deletedata.php", postData, requestOptions)
        .subscribe(data => {
          console.log(data['_body']);
          this.datassss();
          this.showSuccessDelete();
         }, error => {
          console.log(error);
        });
    }else{

    }
   
      
  }

  //update
  update(id, nameU) {
    if(confirm("Actualizar?")){
      var headers = new Headers();
      headers.append('Access-Control-Allow-Headers' , 'Content-Type, Content-Length, Accept-Encoding');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');
      const requestOptions = new RequestOptions({ headers: headers });
  
      let postData = {
              "id": id,
              "name": nameU
      }
  
      this.http.put("http://paunimal.com/angular/api/update.php", postData, requestOptions)
        .subscribe(data => {
          console.log(data['_body']);
          this.datassss();
          this.showSuccessUpdate();
         }, error => {
          console.log(error);
        });
    }else{

    }
   
      
  }

  ngOnInit() {
    this.api = 'https://parcu.herokuapp.com/';
    this.http.get(this.api)
    .pipe(map(response => response.json()))
    .subscribe(res => this.myData = res);
    console.log("datas: " + this.myData);
  }

}
