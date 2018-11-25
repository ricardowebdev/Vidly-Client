import { Component, 
		 OnInit, 
		 ViewChild, 
		 ElementRef,
		 Input,
		 Output,
		 EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
	@ViewChild('alert') alert: ElementRef;
	@Input() message: String;
	@Input() type: String;
	@Output() close = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

	closeAlert() {
	    this.close.emit();
	}

}
