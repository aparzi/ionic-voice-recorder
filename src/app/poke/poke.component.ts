import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-poke',
  templateUrl: './poke.component.html'
})
export class PokeComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => this.router.navigate([`poke/${params?.section}`]));
  }
}
