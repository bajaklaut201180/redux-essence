const { combineReducers, createStore } = Redux;

// ACTION CREATOR [TAKE A FORM]
const actionRentCar = (name, car, payment, profitSharing) => {
  // ACTION [FORM]
  return {
    type: 'RENT_CAR',
    payload: {
      name, car, payment, profitSharing
    }
  }
}

const actionSubscribeCar = (car, registrationFee) => {
  return {
    type: 'SUBSCRIBE_CAR',
    payload: {
      car, registrationFee
    }
  }
}

const actionUnsubscribeCar = (car) => {
  return {
    type: 'UNSUBSCRIBE_CAR',
    payload: {
      car
    }
  }
}

// REDUCER [DEPARTEMENT]
const departementAccounting = (bagOfMoney = 0, action) => {
  switch(action.type){
    case 'SUBSCRIBE_CAR':
      return bagOfMoney + action.payload.registrationFee;
    case 'RENT_CAR':
      return bagOfMoney + action.payload.payment - action.payload.profitSharing;
    default:
      return bagOfMoney;
  }
}

const departementWarehouse = (listOfCar = [], action) => {
  switch(action.type){
    case 'SUBSCRIBE_CAR':
      return [...listOfCar, action.payload.car];
    case 'UNSUBSCRIBE_CAR':
      return listOfCar.filter(car => car !== action.payload.car);
    default:
      return listOfCar;
  }
}

const departementRentHistory = (rentHistory = [], action) => {
  switch(action.type){
    case 'RENT_CAR':
      return [...rentHistory, action.payload];
    default:
      return rentHistory;
  }
}

// COMBINE REDUCERS
const AllDepartements = combineReducers({
  accounting: departementAccounting,
  warehouse: departementWarehouse,
  rentHistory: departementRentHistory
});

// STORE
const store = createStore(AllDepartements);

// DIPATCH [FORM RECEIVER]
store.dispatch(actionSubscribeCar('avanza', 100));
store.dispatch(actionSubscribeCar('fortuner', 200));
store.dispatch(actionSubscribeCar('pajero', 200));
store.dispatch(actionSubscribeCar('kijang', 150));
store.dispatch(actionSubscribeCar('lancer', 100));
store.dispatch(actionSubscribeCar('brio', 50));
store.dispatch(actionSubscribeCar('alphard', 300));
store.dispatch(actionSubscribeCar('hiace', 250));

// cek log
console.log(store.getState());
