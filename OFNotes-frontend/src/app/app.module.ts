import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarUsersComponent } from './sidebar-users/sidebar-users.component';
import { NoteComponent } from './note/note.component';
import { SidebarNotesComponent } from './sidebar-notes/sidebar-notes.component';
import { UserComponent } from './user/user.component';
import { SetupsComponent } from './setups/setups.component';
import { UsersService } from './users.service';
import { GlobalVariablesService } from './global-variables.service';
import { RouterModule, Routes } from '@angular/router';
const appRoutes: Routes = [
  { path: 'notes', component: SidebarNotesComponent,
   runGuardsAndResolvers: 'always' },
  { path: 'users', component: SidebarUsersComponent },
  { path: 'account', component: UserComponent },
  { path: 'setups', component: SetupsComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    SidebarNotesComponent,
    NoteComponent,
    SidebarUsersComponent,
    UserComponent,
    SetupsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false,
      onSameUrlNavigation: 'reload' }
    )
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
