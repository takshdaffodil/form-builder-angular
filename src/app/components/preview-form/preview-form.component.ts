import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-preview-form',
  templateUrl: './preview-form.component.html',
  styleUrls: ['./preview-form.component.css'],
})
export class PreviewFormComponent implements OnInit {
  formControls: any[] = [];
  wholeFormData: any;

  constructor(
    public formservice: FormService,
    public router: Router,
    public location: Location
  ) {}

  ngOnInit(): void {
    this.formservice.formToPreview.subscribe((res: any) => {
      if (res) {
        this.formControls = res.actualForm;
        this.wholeFormData = res;
      }
    });
  }

  backToEdit() {
    this.router.navigate(['form-builder'], {
      queryParams: { id: this.wholeFormData.id },
    });
  }

  backToSavedForm() {
    this.formservice.formToPreview.next([]);
    this.router.navigate(['view-forms']);
  }

  backToFormBuild() {
    if (!this.wholeFormData?.id) {
      console.log(this.wholeFormData);
      this.formservice.formToPreview.next(this.formControls);
    } else {
      this.formservice.formToPreview.next([]);
      this.router.navigate(['form-builder']);
    }
  }
}
