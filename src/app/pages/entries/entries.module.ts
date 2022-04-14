import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { NgModule } from '@angular/core';
import { IMaskModule } from 'angular-imask';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from 'src/app/shared/shared.module';

import { EntriesRoutingModule } from './entries-routing.module';

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
