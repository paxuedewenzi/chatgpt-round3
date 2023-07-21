import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  // generates an input variable that accepts metadata input from the outside
  @Input() metadata: any;
  // generate an output variable that emits the form data
  @Output() submitform = new EventEmitter<any>();
  formSections: any[] = [];
  formData: any = {};
  isDisable: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.handleMetadata(this.metadata)
  }

  // create a function for submit button
  onSubmit() {
    this.submitform.emit(this.formData);
  }

  // Create a function to handle metadata
  handleMetadata(metadata: any) {
    this.metadata['modal'].forEach((item: any) => {
     const tmpp = {
        "title": item.section,
        "components": item.components,
        "order": item.order ? item.order : 999
     }
     this.formSections.push(tmpp)
    })
    // Sort the array formSections according to the order property
    this.formSections.sort((a, b) => {
      return a.order - b.order;
    })
    // Sort the components inside the formSections of the array by the order property
    this.formSections.forEach((section: any) => {
      section.components.sort((a: any, b: any) => {
        return a.order - b.order;
      })
    })
    console.log(this.formSections)
  }

  // Create a function to handle validation
  handleValidate(){
    let isDisableTmp = false;
    this.formSections.forEach((section: any) => {
      section.components.forEach((comp: any) => {
        if(comp?.rule?.required && !this.formData[comp.key]){
          isDisableTmp = true;
        }

        if(comp?.rule?.maxLength && this.formData[comp.key] && this.formData[comp.key]?.length > comp?.rule?.maxLength){
          isDisableTmp = true;
        }
      })
    })
    this.isDisable = isDisableTmp;
  }


}