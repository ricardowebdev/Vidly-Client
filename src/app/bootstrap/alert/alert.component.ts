import { Component, 
		 OnInit, 
		 ViewChild, 
		 ElementRef,
		 Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
	@ViewChild('alert') alert: ElementRef;
	@Input() message: String;
	@Input() type: String;

    constructor() { }

    ngOnInit() {
    }

	closeAlert() {
	    this.alert.nativeElement.classList.remove('show');
	}

	setAlert() {
		this.alert.nativeElement.classList.add('show');
	}    
}
