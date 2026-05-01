# Coverage Report

## Загальне покриття
- Statements/Instructions: 30.5%
- Branches: 11%
- Functions/Methods: 8.82%
- Lines: 32.46%

## Аналіз
- Найкраще покриті файли: файли з константами (`src/constants/...`) та утиліти/хелпери, зокрема `src/helper/getScheduleType.js` та `src/helper/schedule.js`.
- Погано покриті файли: більшість компонентів React у `src/components/...`, сторінок у `src/containers/...`, та UI-логіка, яка не має інтеграційних/рендер-тестів.
- Причини низького покриття:
  - Переважна частина коду — це UI-компоненти з численними умовними рендерами, які не були протестовані.
  - Багато branch-кейсів не покриті через відсутність тестів для різних станів компонента і залежностей `document`/DOM.
  - Функціональні тести фокусуються на утилітах, але не на складних маршрутах і сторінках.
- Висновок: поки що має сенс додати тести для компонентів і сторінок, особливо ті, що приймають різні пропси і рендерять conditional markup.

## Mutation report
- JavaScript mutation testing (Stryker) для `src/helper/getScheduleType.js` та `src/helper/schedule.js` показало 100% mutation score.
- Кількість мутантів: 66, killed: 64, survived: 0, timeout: 2.
- Вижилих мутантів немає. Найбільш важливі покриті сценарії: `getScheduleType` для DEPARTMENT/priority/edge-cases та `schedule.js` для `getColorByFullness`, `divideLessonsByOneHourLesson`, `addClassDayBoard`, `removeClassDayBoard`.

## Скріншот
[Додайте скріншот coverage report]
