import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { SmartHomeSettings } from '../Models/SmartHomeSettings';
import { DataService } from '../Services/data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  form;
  settings:SmartHomeSettings;
  customTheme: NgxMaterialTimepickerTheme = {
    container: {
        bodyBackgroundColor: '#fff',
        buttonColor: '#ffab40'
    },
    dial: {
        dialBackgroundColor: '#3f51b5',
    },
    clockFace: {
        clockFaceBackgroundColor: '#fdfcfc',
        clockHandColor: '#ffab40',
        clockFaceTimeInactiveColor: '#3f51b5'
    }
};
  constructor(private formBuilder:FormBuilder,private dataService:DataService) {
    this.dataService.getSettings().subscribe(data=>{
      this.settings=data;
      this.form=this.formBuilder.group({
        interval:[this.settings.interval,[Validators.required,Validators.min(1)]],
        workFrom:[this.getHoursFromMidnigt(this.settings.workingFrom),Validators.required],
        workTo:[this.getHoursFromMidnigt(this.settings.workingTo),Validators.required],
        power:[this.settings.power,Validators.required]
      });
    });
   }

   update(formValue){
    let fromArray=formValue.workFrom.split(":");
    let toArray=formValue.workTo.split(":");
    let workFrom=this.getMinutesFromMidnight(fromArray[0],fromArray[1]);
    let workTo=this.getMinutesFromMidnight(toArray[0],toArray[1]);
    let toEdit=new SmartHomeSettings();
    toEdit.id=this.settings.id;
    toEdit.interval=formValue.interval;
    toEdit.workingFrom=workFrom;
    toEdit.workingTo=workTo;
    toEdit.power=formValue.power;
    this.dataService.editSettings(toEdit).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: 'Settings successfully saved!',
        showConfirmButton: false,
        timer: 1500
      })
    },err=>{
      
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
      
    })
   }

   getHoursFromMidnigt(minutesFromMidnight){
     let hours=Math.floor(minutesFromMidnight/60);
     let minutes=minutesFromMidnight%60;
     return hours+":"+minutes;

   }
   getMinutesFromMidnight(hours,minutes){
    return (hours*60)+parseInt(minutes);
   }
  
  ngOnInit(): void {
  }

}
