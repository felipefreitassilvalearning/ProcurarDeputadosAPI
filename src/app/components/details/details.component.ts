import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Deputado, DeputadoDetails } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  deputadoId!: string;
  deputado!: Deputado;
  routeSub!: Subscription;
  deputadoSub!: Subscription;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.routeSub = this.ActivatedRoute.params.subscribe((params: Params) => {
      this.deputadoId = params['id'];
      this.getDeputadoDetails(this.deputadoId);
    })
  }

  getDeputadoDetails(id: string): void {
    this.deputadoSub = this.httpService
      .getDeputadoDetails(id)
      .subscribe((deputadoResp: Deputado) => {
        this.deputado = deputadoResp;
      });
  }

  ngOnDestroy(): void {
    if (this.deputadoSub) {
      this.deputadoSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
