import { Component, Input, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';
import { GuidHelper } from '../helpers/guid-helper';

@Component({
  template: '',
})
export class BaseControlComponent implements ControlValueAccessor {
  //#region Properties

  /**
   * Control label
   */
  protected _label: string;

  /**
   * Control name
   */
  protected _name: string;

  /**
   * Class of container
   */
  protected _containerClass = '';

  /**
   * Onchange Callback
   */
  protected _ngOnChangeCallback: (_: any) => void;

  /**
   * OnToucher Callback
   */
  protected _ngOnTouchedCallback: (_: any) => void;

  /**
   * IsComponentDisable
   */
  protected _isComponentDisabled = false;

  /**
   * Disable HTML
   */
  protected _disableByHTML = false;

  /**
   * Disable By HTML Value
   */
  protected _disableByHTMLValue = false;

  /** Model */
  protected _model: any;
  //#endRegion

  // #region Accessors

  /**
   * Set Tooltip Template
   */
  @Input() public tooltip: TemplateRef<any>;

  /**
   * Set Container Class
   */
  @Input('container-class')
  public set containerClass(value: string) {
    this._containerClass = value;
  }
  /** Get Container Class */
  public get containerClass(): string {
    return this._containerClass;
  }

  /** Set Control Label */
  @Input('label')
  public set label(value: string) {
    this._label = value;
  }

  /** Get Control Label */
  public get label(): string {
    return this._label;
  }

  /** Set component to be disabled */
  @Input('disabled')
  public set disabled(value: boolean) {
    this._disableByHTML = true;
    this._disableByHTMLValue = value;
    this._isComponentDisabled = value;
  }

  /** Get whether component is disabled or not.*/
  public get disable(): boolean {
    return this._isComponentDisabled;
  }

  /** Set control name. */
  @Input('name')
  public set name(value: string) {
    if (!value || value.length < 1) {
      throw new Error('Control name is invalid.');
    }

    this._name = value;
  }

  /** Get control name. */
  public get name(): string {
    if (!this._name) {
      this._name = GuidHelper.newGuid();
    }

    return this._name;
  }

  // Bind information from input to model.
  public set model(value: any) {
    this._model = value;
  }

  // Get model value.
  public get model(): any {
    return this._model;
  }

  /*
   * Whether component has been attached with any validators or not.
   * */
  public hasValidator(name: string, ngControl: NgControl): boolean {
    if (!ngControl) {
      return false;
    }

    const control = ngControl.control;
    if (!control) {
      return false;
    }

    if (!control.validator) {
      return false;
    }

    const validator = control.validator({} as AbstractControl);
    if (!validator) {
      return false;
    }

    return validator[name];
  }

  /*
   * Whether control is invalid or not.
   * */
  public isControlInvalid(ngControl: NgControl): boolean {
    if (!ngControl) {
      return false;
    }

    const control = ngControl.control;
    if (!control) {
      return false;
    }

    if (!(control.invalid && (control.dirty || control.touched))) {
      return false;
    }

    return true;
  }

  // Raised when on change function is initialized.
  public registerOnChange(fn: any): void {
    this._ngOnChangeCallback = fn;
  }

  // Raised when on touched function is initialized.
  public registerOnTouched(fn: any): void {
    this._ngOnTouchedCallback = fn;
  }

  // Called when disabled state is updated.
  public setDisabledState(isDisabled: boolean): void {
    this._isComponentDisabled = isDisabled;
  }

  // Raised when outer component updates value to current component.
  public writeValue(value: any): void {
    this._model = value;
  }

  //#endregion
}
