import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-preview-form',
  templateUrl: './preview-form.component.html',
  styleUrls: ['./preview-form.component.css'],
})
export class PreviewFormComponent implements OnInit {
  formControls: any[] = [];

  constructor(public formservice: FormService, public router: Router) {}

  ngOnInit(): void {
    this.formservice.formToPreview.subscribe((res: any) => {
      if (res) {
        this.formControls = res;
      }
    });
  }

  backToFormBuilder() {
    this.router.navigate(['form-builder']);
  }

  backToSavedForm() {
    this.formservice.formToPreview.next([]);
    this.router.navigate(['view-forms']);
  }
}
