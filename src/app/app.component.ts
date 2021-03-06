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
    { id: this.uidV2(), price: 32 },
    { id: this.uidV2(), price: 30 },
  ];

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      name: [],
      address: fb.array([]),
    });

    this.listShoppingForm = fb.group({
      shopping: fb.array([]),
    });
    this.loadShopping();
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
  loadShopping() {
    this.shoppingList.forEach((item) => {
      const add = this.listShoppingForm.get('shopping') as FormArray;
      add.push(
        this.fb.group({
          item: item.price,
        })
      );
    });
    this.totalUnidades();
  }

  newShopping() {
    const add = this.listShoppingForm.get('shopping') as FormArray;
    add.push(
      this.fb.group({
        item: '1',
      })
    );
    const uid = this.uidV1();
    this.shoppingList.push({ id: uid, price: 1 });
    this.totalUnidades();
  }

  changeInputShopping(index: number, id: string) {
    const add = this.listShoppingForm.get('shopping') as FormArray;
    const value = add.at(index).value;
    this.setShoppingPrice(value, id);
  }

  totalUnit = 0;
  totalUnidades() {
    this.totalUnit = 0;
    this.shoppingList.forEach((item) => {
      this.totalUnit = this.totalUnit + Number(item?.price);
    });
  }

  subtractShopping(index: number, id: string) {
    const add = this.listShoppingForm.get('shopping') as FormArray;
    const valueItem = add.at(index).value;
    add
      .at(index)
      ?.get('item')
      ?.patchValue(Number(valueItem.item) - 1);
    const newValue = add.at(index).value;
    this.setShoppingPrice(newValue, id);
  }

  addShopping(index: number, id: string) {
    const add = this.listShoppingForm.get('shopping') as FormArray;
    const valueItem = add.at(index).value;
    add
      .at(index)
      ?.get('item')
      ?.patchValue(Number(valueItem.item) + 1);
    const newValue = add.at(index).value;
    this.setShoppingPrice(newValue, id);
  }

  setShoppingPrice(value: { item: string }, id: string) {
    this.shoppingList = this.shoppingList.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          price: Number(value.item),
        };
      }
      return item;
    });
    this.totalUnidades();
  }

  deleteShopping(index: number, id: string) {
    const add = this.listShoppingForm.get('shopping') as FormArray;
    add.removeAt(index);
    this.shoppingList = this.shoppingList.filter((item) => item.id !== id);
  }

  deleteAll() {
    const add = this.listShoppingForm.get('shopping') as FormArray;
    add.controls = [];
    this.listShoppingForm.reset();
    this.shoppingList = [];
  }

  //GENERATE UID
  private uidV1() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  private uidV2() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}
