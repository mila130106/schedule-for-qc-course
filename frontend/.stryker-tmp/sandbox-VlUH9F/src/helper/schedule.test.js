// @ts-nocheck
import {divideLessonsByOneHourLesson, getColorByFullness} from './schedule';

const teacherAndSubjectAreTheSame = [
    {
        subject_for_site: 'Web-дизайн',
        teacher_for_site: "Куб'як",
    },
    {
        subject_for_site: 'Web-дизайн',
        teacher_for_site: "Куб'як",
    },
];

const teacherTheSame = [
    {
        subject_for_site: 'Системи штучного інтелекту',
        teacher_for_site: 'Мельник',
    },
    {
        lesson_type: 'LECTURE',
        teacher_for_site: 'Мельник',
    },
];

const teacherIsNotTheSame = [
    {
        subject_for_site: 'Системи штучного інтелекту',
        teacher_for_site: 'Мельник',
    },
    {
        subject_for_site: 'Інтелектуальні інформаційні системи',
        teacher_for_site: "Куб'як",
    },
];

const threeElementsWithTeacherChange = [
    {
        subject_for_site: 'Web-дизайн',
        teacher_for_site: 'Иванов',
    },
    {
        subject_for_site: 'Веб-розробка',
        teacher_for_site: 'Петров',
    },
    {
        subject_for_site: 'Мобільний розвиток',
        teacher_for_site: 'Сідоров',
    },
];

const singleElementArray = [
    {
        subject_for_site: 'Web-дизайн',
        teacher_for_site: 'Іванов',
    },
];

const lessons = [
    {
        id: 767,
        hours: 2,
    },
    {
        id: 784,
        hours: 3,
    },
];

const items = [
    {
        lesson: {
            id: 767,
            hours: 2,
        },
    },
    {
        lesson: {
            id: 772,
            hours: 2,
        },
    },
];

const lessonsWithZeroHours = [
    {
        id: 767,
        hours: 0,
    },
    {
        id: 784,
        hours: 2,
    },
];

const itemsWithAllLessonPresent = [
    {
        lesson: {
            id: 767,
            hours: 2,
        },
    },
    {
        lesson: {
            id: 767,
            hours: 2,
        },
    },
    {
        lesson: {
            id: 784,
            hours: 3,
        },
    },
    {
        lesson: {
            id: 784,
            hours: 3,
        },
    },
    {
        lesson: {
            id: 784,
            hours: 3,
        },
    },
];

describe('behavior of divideLessonsByOneHourLesson function', () => {
    describe('Positive scenarios', () => {
        test('should return lessons with one-hour duration each which length equal amount of all hours of lessons', () => {
            // Arrange
            // Act
            const result = divideLessonsByOneHourLesson([], lessons);
            // Assert
            expect(result.length).toBe(5);
        });

        test('should return lessons with one-hour duration each which length equal amount of all hours of lessons minus amount of items which exist in lessons', () => {
            // Arrange
            // Act
            const result = divideLessonsByOneHourLesson(items, lessons);
            // Assert
            expect(result.length).toBe(4);
        });

        test('should divide lessons correctly when all items are already present', () => {
            // Arrange
            // Act
            const result = divideLessonsByOneHourLesson(itemsWithAllLessonPresent, lessons);
            // Assert
            expect(result.length).toBe(0);
        });
    });

    describe('Edge cases', () => {
        test('should return empty array when lessons array is empty', () => {
            // Arrange
            // Act
            const result = divideLessonsByOneHourLesson(items, []);
            // Assert
            expect(result.length).toBe(0);
            expect(Array.isArray(result)).toBe(true);
        });

        test('should return empty array when hours equals 0', () => {
            // Arrange
            const lessonsWithZeroHoursOnly = [
                {
                    id: 767,
                    hours: 0,
                },
            ];
            // Act
            const result = divideLessonsByOneHourLesson([], lessonsWithZeroHoursOnly);
            // Assert
            expect(result.length).toBe(0);
        });

        test('should handle lessons with mixed hours including 0', () => {
            // Arrange
            // Act
            const result = divideLessonsByOneHourLesson([], lessonsWithZeroHours);
            // Assert
            expect(result.length).toBe(2);
        });

        test('should return correct count when items list is null/undefined', () => {
            // Arrange
            // Act
            const result = divideLessonsByOneHourLesson(undefined, lessons);
            // Assert
            expect(result.length).toBe(5);
        });
    });
});

describe('behavior of getColorByFullness function', () => {
    describe('Positive scenarios', () => {
        test('should add css class "available" if  array of groups is empty', () => {
            // Arrange
            // Act
            const result = getColorByFullness([]);
            // Assert
            expect(result).toBe('available');
        });

        test('should add css class "possible" if  lesson is not the same and teacher is the same', () => {
            // Arrange
            // Act
            const result = getColorByFullness(teacherTheSame);
            // Assert
            expect(result).toBe('possible');
        });

        test('should add css class "not-allow" if teacher is not the same', () => {
            // Arrange
            // Act
            const result = getColorByFullness(teacherIsNotTheSame);
            // Assert
            expect(result).toBe('not-allow');
        });

        test('should add css class "allow" if lesson and teacher are the same', () => {
            // Arrange
            // Act
            const result = getColorByFullness(teacherAndSubjectAreTheSame);
            // Assert
            expect(result).toBe('allow');
        });
    });

    describe('Edge cases and default parameters', () => {
        test('should return "available" when called without arguments (default parameter)', () => {
            // Arrange
            // Act
            const result = getColorByFullness();
            // Assert
            expect(result).toBe('available');
        });

        test('should handle array with single element', () => {
            // Arrange
            // Act
            const result = getColorByFullness(singleElementArray);
            // Assert
            expect(result).toBe('allow');
        });

        test('should return "not-allow" with three or more elements with teacher change', () => {
            // Arrange
            // Act
            const result = getColorByFullness(threeElementsWithTeacherChange);
            // Assert
            expect(result).toBe('not-allow');
        });

        test('should return "available" when passed undefined explicitly', () => {
            // Arrange
            // Act
            const result = getColorByFullness(undefined);
            // Assert
            expect(result).toBe('available');
        });

        test('should detect when lesson subject changes even with same teacher - returns possible', () => {
            // Arrange
            const differentSubjectsSameTeacher = [
                {
                    subject_for_site: 'Math',
                    teacher_for_site: 'Smith',
                },
                {
                    subject_for_site: 'Physics',
                    teacher_for_site: 'Smith',
                },
                {
                    subject_for_site: 'Chemistry',
                    teacher_for_site: 'Smith',
                },
            ];
            // Act
            const result = getColorByFullness(differentSubjectsSameTeacher);
            // Assert
            expect(result).toBe('possible');
        });

        test('should return "not-allow" when teacher changes in second element', () => {
            // Arrange
            const teacherChangeInSecond = [
                {
                    subject_for_site: 'Math',
                    teacher_for_site: 'Smith',
                },
                {
                    subject_for_site: 'Math',
                    teacher_for_site: 'Jones',
                },
            ];
            // Act
            const result = getColorByFullness(teacherChangeInSecond);
            // Assert
            expect(result).toBe('not-allow');
        });

        test('should verify strict equality check for subjects (not just truthy/falsy)', () => {
            // Arrange
            const emptyStringSubject = [
                {
                    subject_for_site: 'Math',
                    teacher_for_site: 'Smith',
                },
                {
                    subject_for_site: '',
                    teacher_for_site: 'Smith',
                },
            ];
            // Act
            const result = getColorByFullness(emptyStringSubject);
            // Assert
            expect(result).toBe('possible');
        });

        test('should correctly handle AND condition (both lesson and teacher must be same for allow)', () => {
            // Arrange
            const sameSubjectDifferentTeacher = [
                {
                    subject_for_site: 'Math',
                    teacher_for_site: 'Smith',
                },
                {
                    subject_for_site: 'Math',
                    teacher_for_site: 'Jones',
                },
            ];
            // Act
            const result = getColorByFullness(sameSubjectDifferentTeacher);
            // Assert
            // Since teacher is different, should be 'not-allow', not 'allow'
            expect(result).toBe('not-allow');
        });
    });
});

describe('behavior of addClassDayBoard and removeClassDayBoard functions', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="Monday-1"></div>
            <div class="Monday-1"></div>
            <div class="Monday-1"></div>
        `;
    });

    test('should add hover-line and focus-class classes when addClassDayBoard is called', () => {
        // Arrange
        const targetElement = document.querySelector('#Monday-1');
        const weekElements = document.querySelectorAll('.Monday-1');

        // Act
        addClassDayBoard('Monday', 1);

        // Assert
        expect(targetElement.classList.contains('focus-class')).toBe(true);
        expect(weekElements[0].classList.contains('hover-line')).toBe(true);
        expect(weekElements[1].classList.contains('hover-line')).toBe(true);
    });

    test('should remove hover-line and focus-class classes when removeClassDayBoard is called', () => {
        // Arrange
        const targetElement = document.querySelector('#Monday-1');
        const weekElements = document.querySelectorAll('.Monday-1');
        targetElement.classList.add('focus-class');
        weekElements[0].classList.add('hover-line');
        weekElements[1].classList.add('hover-line');

        // Act
        removeClassDayBoard('Monday', 1);

        // Assert
        expect(targetElement.classList.contains('focus-class')).toBe(false);
        expect(weekElements[0].classList.contains('hover-line')).toBe(false);
        expect(weekElements[1].classList.contains('hover-line')).toBe(false);
    });
});
