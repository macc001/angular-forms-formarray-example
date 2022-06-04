import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form: FormGroup;
  listShoppingForm: FormGroup;
  shoppingList = [
    { id: 1, price: 2 },
    { id: 2, price: 32 },
    { id: 3, price: 30 },
  ];

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      name: [],
      address: fb.array([]),
    });

    this.listShoppingForm = fb.group({
      shopping: fb.array([]),
    });
    this.addShopping();
  }

  addNewAddressGroup() {
    const add = this.form.get('address') as FormArray;
    add.push(
      this.fb.group({
        street: [],
        city: [],
      })
    );
  }

  deleteAddressGroup(index: number) {
    const add = this.form.get('address') as FormArray;
    add.removeAt(index);
  }

  deleteEmpty() {
    let indexToRemove = [];
    let fromArray = this.form.get('address') as FormArray;

    fromArray.controls.forEach((control, index) => {
      if (!control.value.street) {
        indexToRemove.push(index);
      }
    });
    indexToRemove.reverse().forEach((index) => {
      fromArray.removeAt(index);
    });
  }

  // SHOPPING
  addShopping() {
    this.shoppingList.forEach((item) => {
      const add = this.listShoppingForm.get('shopping') as FormArray;
      add.push(
        this.fb.group({
          item: '0',
        })
      );
    });
  }

  changeInputShopping() {
    console.log(this.listShoppingForm.value);
  }
}
