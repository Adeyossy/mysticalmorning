import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { collection, doc, Firestore, writeBatch } from 'firebase/firestore';
import { concatMap, from, map, Observable } from 'rxjs';
import { HomeComponent } from 'src/app/home/home.component';
import { BasicOrder, BasicOrderSummary, Order, ORDER_COLLECTION, TimeOfMeal } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { DayOfWeek, Subscription, SubscriptionExpanded, SUBSCRIPTION_COLLECTION } from 'src/app/models/subscription';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-new-subscription',
  templateUrl: './new-subscription.component.html',
  styleUrls: ['./new-subscription.component.css']
})
export class NewSubscriptionComponent implements OnInit {
  stepNumber = 0;
  declare stepsHeadings: string[];
  isPopupOpen = false;
  products$: Observable<Product[]> = new Observable();

  subscriptionKeys: DayOfWeek[] = ["sundays", "mondays", "tuesdays", "wednesdays", "thursdays", "fridays",
    "saturdays"];
  selectedDays = this.subscriptionKeys.map(day => "");
  filteredDays: DayOfWeek[] = [];
  typesOfMeal = ["Breakfast", "Lunch", "Dinner"] as const;
  typesOfMealIcons = ["cloud-sun", "sun", "moon"];

  currentDay = 0;
  typeOfMealCount = 0;

  basicSubscription: SubscriptionExpanded = {
    mondays: [],
    tuesdays: [],
    wednesdays: [],
    thursdays: [],
    fridays: [],
    saturdays: [],
    sundays: []
  }

  subscriptionSummary: [DayOfWeek, BasicOrder[]][] = [];
  subscriptionBatch$ = new Observable<boolean>();
  // subscriptionStart = Intl.DateTimeFormat('en-NG').format(new Date());
  todaysDate = new Date().toISOString().slice(0, 10);
  subscriptionStart = "";
  subscriptionEnd = "";

  deliveryBackup = '';
  deliveryContact = '';
  deliveryLocation = '';

  orderDelivery = {
    deliveryBackup: '',
    deliveryContact: '',
    deliveryLocation: ''
  }

  message = "";

  constructor(private router: ActivatedRoute, public subService: SubscriptionService,
    public firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.stepsHeadings = this.subService.steps.map(step => step.heading);

    console.log("Date => ", new Date().toISOString());
    console.log("Date => ", Intl.DateTimeFormat().format(new Date()));

    this.products$ = this.firebaseService.anonLogin$().pipe(
      concatMap(_userCredential => this.firebaseService.getCollection$<Product>('products')),
      map(products => products.map(product => new Product().parseProduct(product)))
    );

    // const today = new Date().getDay();

    // if (today < 6) {
    //   const days = this.subscriptionKeys.splice(0, today + 1);
    //   this.subscriptionKeys.push(...days);
    // }

  }

  filter(d: string) {
    return d !== ""
  }

  setStartDate (val: string) {
    console.log("val => ", val);
  }

  rearrange() {
    const milliDiff = Date.parse(this.subscriptionEnd) - Date.parse(this.subscriptionStart);
    const weekDiff = Math.floor(milliDiff / (1000 * 60 * 60 * 24 * 7));
    console.log("Week diff => ", weekDiff);
    const day = new Date(this.subscriptionStart).getDay();
    const daysOfTheWeek = this.subService.daysOfTheWeek.slice();
    if (day > 0) {
      const days = daysOfTheWeek.splice(0, day);
      daysOfTheWeek.push(...days);
    }
    this.subscriptionKeys = daysOfTheWeek;
    this.stepNumber = 1;
  }

  valiDate (dateString: string) {
    const timestamp = Date.parse(dateString);
    if (isNaN(timestamp)) return false;
    if (timestamp < Date.now()) return false;
    return true;
  }

  openPopUp(currentDay?: number, mealType?: number) {
    this.isPopupOpen = true;
    if (currentDay) this.currentDay = currentDay;
    if (mealType) this.typeOfMealCount = mealType;
  }

  previous() {
    if (this.typeOfMealCount % this.typesOfMeal.length === 0) --this.currentDay;
    --this.typeOfMealCount;
  }

  next() {
    if (this.typeOfMealCount % this.typesOfMeal.length === 2) ++this.currentDay;
    ++this.typeOfMealCount;
  }

  done() {
    this.isPopupOpen = false;
    this.stepNumber = 2;
    this.currentDay = 0;
    this.typeOfMealCount = 0;
  }

  toggleDayOfWeek(dayOfWeek: string, position: number) {
    const selectedDays = this.selectedDays.slice();
    selectedDays[position] = selectedDays[position] ? "" : `${dayOfWeek}`;
    this.selectedDays = selectedDays;
    this.filteredDays = selectedDays.filter(this.filter).map(m => m.toLowerCase()) as unknown as
      Array<DayOfWeek>;
  }

  getBasicOrder(selectedDay: DayOfWeek) {
    return this.basicSubscription[selectedDay].filter(f => f.timeOfMeal ===
      this.typesOfMeal[this.typeOfMealCount % this.typesOfMeal.length])
      .flatMap(b => b.items).map(p => p.id);
  }

  getBasicOrdersForDay() {
    const filteredDays = this.selectedDays.filter(this.filter);
    const dayOfWeek = filteredDays[this.currentDay % filteredDays.length].toLowerCase() as
      DayOfWeek;
    return this.basicSubscription[dayOfWeek];
  }

  onItemClicked(product: Product) {
    const typeOfMeal = this.typesOfMeal[this.typeOfMealCount % this.typesOfMeal.length];
    const basicOrdersForDay = this.getBasicOrdersForDay();

    if (basicOrdersForDay.length > 0) {
      const daytimeMeal = basicOrdersForDay.find(sub => sub.timeOfMeal === typeOfMeal);
      if (daytimeMeal) {
        const alreadyExists = daytimeMeal.items.find(p => product.id === p.id);
        if (alreadyExists) {
          daytimeMeal.items = daytimeMeal.items.filter(p => p.id !== product.id);
        }
        else {
          daytimeMeal.items.push(product);
        }
        daytimeMeal.price = daytimeMeal.items.map(m => m.price).reduce((acc, curr) => acc + curr, 0);
      } else {
        basicOrdersForDay.push({
          items: [product],
          timeOfMeal: typeOfMeal,
          price: Number(product.price)
        })
      }
    } else {
      const basicOrder: BasicOrder = {
        items: [product],
        timeOfMeal: typeOfMeal,
        price: Number(product.price)
      };
      basicOrdersForDay.push(basicOrder);
    }

    this.subscriptionSummary = this.getSubscriptionKeys();
    // this.message = this.generateMessage();
  }

  addPlates(product: Product) {
    const typeOfMeal = this.typesOfMeal[this.typeOfMealCount % this.typesOfMeal.length];
    const basicOrdersForDay = this.getBasicOrdersForDay();
    const daytimeMeal = basicOrdersForDay.find(sub => sub.timeOfMeal === typeOfMeal);
    if (daytimeMeal) {
      daytimeMeal.items.push(product);
      daytimeMeal.price = daytimeMeal.items.map(m => m.price).reduce((acc, curr) => acc + curr, 0);
    }
    this.subscriptionSummary = this.getSubscriptionKeys();
  }

  removePlate(product: Product) {
    const typeOfMeal = this.typesOfMeal[this.typeOfMealCount % this.typesOfMeal.length];
    const basicOrdersForDay = this.getBasicOrdersForDay();
    const daytimeMeal = basicOrdersForDay.find(sub => sub.timeOfMeal === typeOfMeal);
    if (daytimeMeal) {
      daytimeMeal.items.splice(daytimeMeal.items.findIndex(item => item.id === product.id), 1);
      daytimeMeal.price = daytimeMeal.items.map(m => m.price).reduce((acc, curr) => acc + curr, 0);
    }
    this.subscriptionSummary = this.getSubscriptionKeys();
  }

  getSubscriptionKeys() {
    const keyValue = [];
    for (let i = 0; i < this.subscriptionKeys.length; i++) {
      let dayOfWeek = this.subscriptionKeys[i] as DayOfWeek;
      keyValue.push([dayOfWeek, this.basicSubscription[dayOfWeek]]);
    }
    return keyValue as [DayOfWeek, BasicOrder[]][];
  }

  productsToNames(items: Product[]) {
    const productNames = items.map((p, i) => {
      const itemOnly = items.filter(item => item.name === p.name);
      if (itemOnly.length > 1) {

        return `${p.name} (x${itemOnly.length})`;
      }
      return p.name;
    });

    const productNamesSet = new Set(productNames);

    return [...productNamesSet].join(", ");
  }

  productsToIds(items: Product[]) {
    return items.map(p => p.id).join(", ");
  }

  findByMealType(items: BasicOrder[], meal: string) {
    return items.find(i => i.timeOfMeal === meal);
  }

  calculateTotal(items: BasicOrder[]) {
    return items.map(b => b.price).reduce((acc, curr) => acc + curr, 0);
  }

  calculateWeeklyTotal() {
    return this.subscriptionSummary.map(ss => this.calculateTotal(ss[1]))
      .reduce((acc, curr) => acc + curr, 0);
  }

  onlyNumbers(contact: string) {
    const orderDelivery = Object.assign({}, this.orderDelivery);
    if (!isNaN(parseInt(contact))) orderDelivery.deliveryContact = contact;

    this.orderDelivery = orderDelivery;
  }

  getHour(timeOfMeal: TimeOfMeal) {
    switch (timeOfMeal) {
      case 'Breakfast':
        return "07";

      case 'Lunch':
        return "13";

      case 'Dinner':
        return "19";
    }
  }

  createOrder(refId: string, index: number, basicOrders: BasicOrder[], timeOfMeal: TimeOfMeal,
    userId: string, subscriptionId: string, weeksInMilli: number) {
    const date = this.subscriptionStart ? new Date(Date.parse(this.subscriptionStart) + weeksInMilli) 
      : new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString();
    const monthPadded = month.length < 2 ? `0${month}` : month;
    const day = date.getDate() + index;
    const dayPadded = day.toString().length < 2 ? `0${day}` : day;
    const hour = this.getHour(timeOfMeal);
    const newDate = `${year}-${monthPadded}-${dayPadded}T${hour}:00`;
    // console.log("newDate => ", newDate);

    const order: Order = {
      deliveryBackup: this.orderDelivery.deliveryBackup,
      deliveryContact: this.orderDelivery.deliveryContact,
      deliveryLocation: this.orderDelivery.deliveryLocation,
      orderId: refId,
      orderDate: Date.now(),
      timeOfMeal: timeOfMeal,
      deliveryDate: Date.parse(newDate),
      items: basicOrders.flatMap(b => b.items.map(p => p.id)),
      price: this.calculateTotal(basicOrders),
      userId,
      isCancelled: false,
      isConfirmed: false,
      isDelivered: false,
      isNeglected: false,
      paymentMethod: "transfer",
      subscriptionId
    };
    return order;
  }

  createSubscription() {
    this.subscriptionBatch$ = this.firebaseService.getFirestore$().pipe(
      concatMap(db => this.firebaseService.getFirebaseUser$().pipe(
        concatMap(user => {
          const batch = writeBatch(db);
          const subscriptionRef = doc(collection(db, SUBSCRIPTION_COLLECTION));
          const date = Date.now();
          const subscription: Subscription = {
            dateCancelled: 0,
            dateCreated: date,
            dateModified: date,
            startDate: Date.parse(this.subscriptionStart),
            endDate: Date.parse(this.subscriptionEnd),
            subscriptionId: subscriptionRef.id,
            userId: user!.uid,
            mondays: this.basicSubscription.mondays.map(b => this.productsToIds(b.items)).join(", "),
            tuesdays: this.basicSubscription.tuesdays.map(b => this.productsToIds(b.items)).join(", "),
            wednesdays: this.basicSubscription.wednesdays.map(b => this.productsToIds(b.items)).join(", "),
            thursdays: this.basicSubscription.thursdays.map(b => this.productsToIds(b.items)).join(", "),
            fridays: this.basicSubscription.fridays.map(b => this.productsToIds(b.items)).join(", "),
            saturdays: this.basicSubscription.saturdays.map(b => this.productsToIds(b.items)).join(", "),
            sundays: this.basicSubscription.sundays.map(b => this.productsToIds(b.items)).join(", ")
          };

          this.subscriptionSummary.forEach(([dayOfWeek, basicOrderSummary], index) => {
            const ordersByTimeOfMeal = this.typesOfMeal.map(meal => {
              const basicOrdersPerMeal = this.basicSubscription[dayOfWeek]
                .filter(basicOrder => basicOrder.timeOfMeal === meal);
              if (basicOrdersPerMeal.length > 0) {
                const milliDiff = Date.parse(this.subscriptionEnd) - Date.parse(this.subscriptionStart);
                const weekInMilli = 1000 * 60 * 60 * 24 * 7;
                const weekDiff = Math.floor(milliDiff / weekInMilli);
                for (let w = 0; w <= weekDiff; w++) {
                  if (milliDiff >= weekInMilli * w) {
                    const orderRef = doc(collection(db, ORDER_COLLECTION));
                  const order = this.createOrder(orderRef.id, index, basicOrdersPerMeal, meal,
                    user!.uid, subscriptionRef.id, w * weekInMilli);
                  batch.set(orderRef, order);
                  }
                }
                return '';                  
              }
              return '';
            });
            // subscription[dayOfWeek] = ordersByTimeOfMeal.filter(o => o !== "");
          });

          batch.set(subscriptionRef, subscription);

          return from(batch.commit()).pipe(map(_void => true));
        })
      ))
    )
  }

  uploadSubscription() {
    this.stepNumber = 4;
    this.message = this.generateMessage();
    this.createSubscription();
  }

  generateMessage() {
    let message = "This is my meal subscription plan\n\n";
    const currencyOptions = {
      style: "currency",
      currency: "NGN",
      currencyDisplay: "narrowSymbol"
    };

    // const subscriptionSummary: [DayOfWeek, BasicOrder[]][] = [
    //   ["mondays", [{ items: [], price: 0, timeOfMeal: 'Breakfast' }]],
    //   ["mondays", [{ items: [], price: 0, timeOfMeal: 'Lunch' }]]
    // ];

    for (let i = 0; i < this.subscriptionSummary.length; i++) {
      const [dayOfWeek, basicOrders] = this.subscriptionSummary[i];
      if (basicOrders.length > 0) {
        message = message.concat(dayOfWeek.toUpperCase(), ':\n');
        for (let j = 0; j < this.typesOfMeal.length; j++) {
          const meal = this.typesOfMeal[j];
          if (meal) message = message.concat(meal, '\n');
          const found = this.findByMealType(basicOrders, this.typesOfMeal[j])
          if (found) {
            message = message.concat(this.productsToNames(found.items), '\n');
            message = message.concat(found.price.toLocaleString("en-NG", currencyOptions));
          }

          message = message.concat('\n\n');
        }

        message = message.concat("TOTAL:", '\n');
        message = message.concat(this.calculateTotal(basicOrders)
          .toLocaleString("en-NG", currencyOptions), '\n\n');
      }
    }

    message = message.concat("Total for 1 Week: \n", this.calculateWeeklyTotal()
      .toLocaleString("en-NG", currencyOptions), "\n\n");

    message = message.concat("DELIVERY DETAILS:\n");
    message = message.concat("Location: ", this.orderDelivery.deliveryLocation, "\n");
    message = message.concat("Contact: ", this.orderDelivery.deliveryContact, "\n");
    message = message.concat("Backup: ", this.orderDelivery.deliveryBackup, "\n");

    const encodedMessage = encodeURI(message);
    return encodedMessage;
  }
}
