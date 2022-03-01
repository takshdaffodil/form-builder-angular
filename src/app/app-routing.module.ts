import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { PreviewFormComponent } from './components/preview-form/preview-form.component';
import { ViewSavedFormsComponent } from './components/view-saved-forms/view-saved-forms.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'form-builder',
    pathMatch: 'full',
  },
  {
    path: 'form-builder',
    component: FormBuilderComponent,
  },
  {
    path: 'preview-form',
    component: PreviewFormComponent,
  },
  {
    path: 'view-forms',
    component: ViewSavedFormsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
