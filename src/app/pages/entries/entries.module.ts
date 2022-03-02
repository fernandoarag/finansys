import { NgModule } from '@angular/core';
import { IMaskModule } from 'angular-imask';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from 'src/app/shared/shared.module';

import { EntryFormComponent } from './category-form/entry-form.component';
import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from './entry-list/entry-list.component';

@NgModule({
  imports: [
    SharedModule,
    EntriesRoutingModule,
    CalendarModule,
    IMaskModule,
  ],
  declarations: [EntryListComponent, EntryFormComponent]
})
export class EntriesModule { }
