import { Component, OnInit } from '@angular/core';
import { ApiMethodService } from '../../model/api-method.service';
import { RouterModule, Router,ActivatedRoute }   from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Component({
  selector: 'app-event-detail',
  templateUrl: '../../view/event-detail/event-detail.component.html',
  styleUrls: ['../../assets/css/event-detail/event-detail.component.css','../../assets/css/Templatic-Shortcodes/style.css']
})
export class EventDetailComponent implements OnInit {
  eventDetail:any
  selectedData:any;
  data:Object;
 
  constructor(private route: ActivatedRoute,private apiService: ApiMethodService) {

  }

  ngOnInit() {
    //    this.data['popular_event']={};
    // this.data['event_data']={};
    this.selectedData = this.route.snapshot.params['id'];
    // console.log(this.selectedData)
   this.getEventDetail(this.selectedData);
      this.popularEvent(1);
    
  }

  getEventDetail(value){
    console.log(value);
    var refreg = this;
    this.apiService.EventDetail(value,function(res){
      console.log(JSON.stringify(refreg.data));
      if(typeof(refreg.data)=='undefined'){
         refreg.data = {};
      }
      refreg.eventDetail = res.data;
      refreg.data['event_data'] = res.data[0];
       console.log("Asd");
      
    });
  }

  popularEvent(value){
    var ref = this;
    this.apiService.popularEventApi(value,function(res){
      if(typeof(ref.data)=='undefined'){
         ref.data = {};
      }
      console.log(JSON.stringify(ref.data));
      ref.data['popular_event'] = {
        popularArr : res.data.data,
        popularTotal : res.data.last_page,
        currentPage : res.data.current_page,     
      };

    });

  }

  createRange(number){
    var links = [];
    for(var i = 1; i <= number; i++){
      links.push(i);
    }
    
    return links;
  }

  getEventPagination(ev_id){
    this.popularEvent(ev_id);
  }
}

