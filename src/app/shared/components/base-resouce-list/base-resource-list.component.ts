import { OnInit } from '@angular/core';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];

  constructor(private resourceService: BaseResourceService<T>) { }

  ngOnInit() {
    this.resourceService.getAll().subscribe(
      resources => this.resources = resources.sort((a, b) => b.id - a.id),
      err => console.error('Erro ao carregar a lista: ', err)
    );
  }

  deleteEntry(resource: T) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
      this.resourceService.delete(resource.id).subscribe(
        () => this.resources = this.resources.filter(element => element !== resource),
        err => alert('Erro ao tentar Excluir! Segue error: ' + err)
      );
    }
  }
}
