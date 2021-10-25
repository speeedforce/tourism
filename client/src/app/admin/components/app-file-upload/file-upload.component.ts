import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor,  NG_VALUE_ACCESSOR } from '@angular/forms';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ],
  styleUrls: ['./file-upload.component.scss'],

})
export class FileUploadComponent implements ControlValueAccessor {
  onChange: Function;
  file: File | null = null;
 
  attachments: FileList | null = null;

  message: string;
  

  accept: string[];

  

  @Input()multiUpload: boolean;
  @Input()isValid: boolean;

  @Input()systemContent: { title: string, default: string, type: string };
  

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    if (this.multiUpload) {
      const files = event && event;
      this.onChange(files);
      this.attachments = files;

    } else {
      const file = event && event.item(0);
      this.onChange(file);
      this.file = file;
    }
  }

  constructor( private host: ElementRef<HTMLInputElement> ) {
   
  }

  writeValue( value: null ) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
    this.attachments = null;
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
  }



}


