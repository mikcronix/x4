import { Component, OnInit } from '@angular/core';
import { ProductionEffect, StationModule, Ware } from '../../shared/services/model/model';
import { WareService } from '../../shared/services/ware.service';
import { ModuleService } from '../../shared/services/module.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { EntityDetailsComponent } from '../../shared/components/entity-details.component';

export interface ProductionWareData {
  ware: Ware;
  amount: number;
}

interface ProductionData {
  time: number;
  amount: number;
  method: string;
  name: string;
  wares: ProductionWareData[];
  effects?: ProductionEffect[];
}

@Component({
  templateUrl: './module-detail.component.html'
})
export class ModuleDetailComponent extends EntityDetailsComponent<StationModule> implements OnInit {
  public entityProduction: ProductionData[];

  constructor(private wareService: WareService, moduleService: ModuleService,
              route: ActivatedRoute, private titleService: Title) {
    super(moduleService, route);
  }

  ngOnInit(): void {
    this.titleService.setTitle('X4:Foundations - Modules');
    super.ngOnInit();
  }

  onEntityLoaded(entity: StationModule) {
    super.onEntityLoaded(entity);
  }

  getTotalMin(production: ProductionData) {
    let total = 0;
    production.wares.forEach(x => {
      total += x.amount * x.ware.price.min;
    });
    return total;
  }

  getTotalMax(production: ProductionData) {
    let total = 0;
    production.wares.forEach(x => {
      total += x.amount * x.ware.price.max;
    });
    return total;
  }

  getTotalAvg(production: ProductionData) {
    let total = 0;
    production.wares.forEach(x => {
      total += x.amount * x.ware.price.avg;
    });
    return total;
  }

  // noinspection JSMethodCanBeStatic
  getProductionTime(amount: number) {
    const minutes = Math.trunc(amount / 60);
    const seconds = amount - minutes * 60;

    let result = '';
    if (minutes > 0) {
      result += ' ' + minutes + (minutes === 1 ? ' minute' : ' minutes');
    }
    if (seconds > 0) {
      if (minutes > 1) {
        result += ' ';
      }
      result += seconds + (seconds === 1 ? ' second' : ' seconds');
    }

    return result;
  }
}