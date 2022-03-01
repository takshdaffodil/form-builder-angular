import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-view-saved-forms',
  templateUrl: './view-saved-forms.component.html',
  styleUrls: ['./view-saved-forms.component.css'],
})
export class ViewSavedFormsComponent implements OnInit {
  constructor(public formservice: FormService, public router: Router) {}
  displayedColumns = ['uuid', 'date'];
  dataSource: any;
  ngOnInit(): void {
    this.formservice.getAllSavedForms().subscribe((res) => {
      this.dataSource = res;
    });
  }
}
