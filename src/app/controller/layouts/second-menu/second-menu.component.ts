import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { RouterModule, Router }   from '@angular/router';
import { ApiMethodService } from '../../../model/api-method.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-second-menu',
  templateUrl: '../../../view/layouts/second-menu/second-menu.component.html',
  styleUrls: ['../../../assets/css/layouts/second-menu/second-menu.component.css']
})


export class SecondMenuComponent implements OnInit {
	menuArr:any;
	popularArr:any;
    @Output() onMenuChange = new EventEmitter<string>();
	constructor(private router:Router, public apiService:ApiMethodService) { }

  ngOnInit() {
  	this.secondmenuDeafault();
  }

  secondmenuDeafault(){
		var ref = this;
		this.apiService.SecondMenuApi(function(res){
	//	 console.log("this is event category api response"+ JSON.stringify(res));
			ref.menuArr = res.data;

		});
	}

    

	getEventByCategory(value){
	this.onMenuChange.emit(value);	
	}



}
