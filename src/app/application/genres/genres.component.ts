import { Component, OnInit } from '@angular/core';
import { GenresService     } from './genres.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  constructor(private service: GenresService) { }

  ngOnInit() {
  }

}
