'use strict'

//кнопка логаута
let logoutButton = new LogoutButton();

logoutButton.action = click => ApiConnector.logout(response => {
  if (response.success === true) {
    return logoutButton.logoutClick(location.reload())
  }
})

ApiConnector.current(response => {
  console.log(response);
  if (response.success === true) {
    ProfileWidget.showProfile(response.data);
  }
})


//получение текущих курсов валют
const ratesBoard = new RatesBoard();


ApiConnector.getStocks(response => {
  console.log(response);

  if (response.success === true) {
    ratesBoard.clearTable();
    return ratesBoard.fillTable(response.data);
  }
})

setInterval(() => {
  ApiConnector.getStocks(response => {  
    if (response.success === true) {
      ratesBoard.clearTable();
      return ratesBoard.fillTable(response.data);
    }
  })
}, 6000);


//операции с деньгами
const myMoneyManager = new MoneyManager();

//пополнение баланса
myMoneyManager.addMoneyCallback = data => ApiConnector.addMoney(data, response => {
  console.log(response);
  if (response.success === true) {
    ProfileWidget.showProfile(response.data);
    myMoneyManager.setMessage(response.success, `Счет пополнен успешно`);
  } else {
    myMoneyManager.setMessage(response.success, `Ошибка ${response.error}`);
  }

});

//конвертация валюты
myMoneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney(data, response => {
  console.log(response);
  if (response.success === true) {
    ProfileWidget.showProfile(response.data);
    myMoneyManager.setMessage(response.success, `Валюта успешно конвертирована`);
  } else {
    myMoneyManager.setMessage(response.success, `Ошибка ${response.error}`);
  }
})

//перевод валюты
myMoneyManager.sendMoneyCallback = data => ApiConnector.transferMoney(data, response => {
  console.log(response);
  if (response.success === true) {
    ProfileWidget.showProfile(response.data);
    myMoneyManager.setMessage(response.success, `Средства успешно переведены`);
  } else {
    myMoneyManager.setMessage(response.success, `Ошибка ${response.error}`);
  }
})


//Работа с избранными
const favorite = new FavoritesWidget();

//Запрашиваем начальный список избранного
ApiConnector.getFavorites(response => {
  if (response.success === true) {
    favorite.clearTable();
    favorite.fillTable(response.data);
    myMoneyManager.updateUsersList(response.data);
  }
})

//Добавление пользователя в список избранных

favorite.addUserCallback = data => ApiConnector.addUserToFavorites(data, response => {
  console.log(response);
  if (response.success === true) {
    favorite.clearTable();
    favorite.fillTable(response.data);
    myMoneyManager.updateUsersList(response.data);
    favorite.setMessage(response.success, `Пользователь  добавлен в избранное`);
  } else {
    favorite.setMessage(response.success, `${response.error}`);
  }
});

favorite.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, response => {
  if (response.success === true) {
    favorite.clearTable();
    favorite.fillTable(response.data);
    myMoneyManager.updateUsersList(response.data);
    favorite.setMessage(response.success, `Пользователь удален из избранных`);
  } else {
    favorite.setMessage(response.success, `${response.error}`);
  }
})
