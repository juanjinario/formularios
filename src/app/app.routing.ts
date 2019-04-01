import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './components/template/template.component';
import { DataComponent } from './components/data/data.component';

const routes: Routes = [
  { path: 'data', component: DataComponent },
  { path: 'template', component: TemplateComponent },
  { path: 'home', component: TemplateComponent },
  { path: '', component: TemplateComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
