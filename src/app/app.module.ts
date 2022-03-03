import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { MaterialAngularModule } from './material-angular.module';
import { HttpClientModule } from '@angular/common/http';
import { FormEditorComponent } from './components/form-editor/form-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteFieldComponent } from './components/delete-field/delete-field.component';
import { PreviewFormComponent } from './components/preview-form/preview-form.component';
import { ViewSavedFormsComponent } from './components/view-saved-forms/view-saved-forms.component';
import { SaveFormDialogComponent } from './components/save-form-dialog/save-form-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FormBuilderComponent,
    FormEditorComponent,
    DeleteFieldComponent,
    PreviewFormComponent,
    ViewSavedFormsComponent,
    SaveFormDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialAngularModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
