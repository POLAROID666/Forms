var currentTab = 0; // Текущая вкладка будет первой вкладкой (0)
showTab(currentTab); // Отображение текущей вкладки

function showTab(n) {
  // Эта функция будет отображать указанную вкладку формы...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... и зафиксируйте предыдущие/следующие кнопки:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Отправить";
  } else {
    document.getElementById("nextBtn").innerHTML = "Далее";
  }
  //... и запустить функцию, которая будет отображать правильный индикатор шага:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // Эта функция определит, какая вкладка будет отображаться
  var x = document.getElementsByClassName("tab");
  // Выйдите из функции, если какое-либо поле в текущей вкладке является недопустимым:
  if (n == 1 && !validateForm()) return false;
  // Скрыть текущую вкладку:
  x[currentTab].style.display = "none";
  // Увеличение или уменьшение текущей вкладки на 1:
  currentTab = currentTab + n;
  // если вы дошли до конца формы...
  if (currentTab >= x.length) {
    // ... форма будет отправлена:
    document.getElementById("regForm").submit();
    return false;
  }
  // В противном случае отобразите правильную вкладку:
  showTab(currentTab);
}

function validateForm() {
  // Эта функция занимается проверкой полей формы
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // Цикл, который проверяет каждое поле ввода на текущей вкладке:
  for (i = 0; i < y.length; i++) {
    // Если поле пусто...
    if (y[i].value == "") {
      // добавьте в поле класс "invalid":
      y[i].className += " invalid";
      // и установите текущий допустимый статус в false
      valid = false;
    }
  }
  // Если действительный статус равен true, отметьте шаг как завершенный и действительный:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // верните действительный статус
}

function fixStepIndicator(n) {
  // Эта функция удаляет класс "active" из всех шагов...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... и добавляет класс "active" на текущем шаге:
  x[n].className += " active";
}