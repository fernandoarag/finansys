import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  constructor(private categoryService: EntryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      res => this.entries = res.sort((after, before) => before.id - after.id),
      err => console.error('Erro ao carregar a lista: ', err)
    ).add(() => console.log('[GetAll][Entries]: Finally'));
  }

  deleteEntry(entry: Entry) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
      this.categoryService.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(element => element !== entry),
        err => alert('Erro ao tentar Excluir! Segue error: ' + err)
      );
    }
  }
}
