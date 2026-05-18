# Coverage Report

## Загальне покриття
- Statements/Instructions: 100%
- Branches: 100%
- Functions/Methods: 100%
- Lines: 100%

## Аналіз

### Які функції/класи покриті найкраще?
`getScheduleType.js` — 100% по всіх метриках: Statements, Branches, Functions, Lines. `schedule.js` — 100% Statements, 100% Branches, 100% Functions, 100% Lines.

### Які потребують додаткових тестів?
`formHelper.js` — покрито лише 50%, функції не покриті зовсім. `handlerAxios.js` — 50% Statements, 0% Branches, 0% Functions. Однак ці файли не входять до Варіанту 6 і не є метою даного завдання.

### Чому деякі branches не покриті?
У моїх файлах `getScheduleType.js` і `schedule.js` всі branches покриті на 100% завдяки парним тестам — для кожного `if` написано тест де умова `true` і тест де умова `false`. Наприклад: `getScheduleType({ group: { id: 49 } })` покриває гілку true, а `getScheduleType({ group: { id: null } })` покриває гілку false.

## Скріншот
<img width="1492" height="801" alt="image" src="https://github.com/user-attachments/assets/6c25a05f-09bf-463d-998e-12a543377263" />

