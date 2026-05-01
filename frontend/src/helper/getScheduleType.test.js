import {getScheduleType} from './getScheduleType';
import {FULL, GROUP, TEACHER, DEPARTMENT} from '../constants/scheduleTypes';

describe('getScheduleType function', () => {
    describe('Positive scenarios', () => {
        it('should return type full if values is empty', () => {
            // Arrange
            const values = {};
            // Act
            const result = getScheduleType(values);
            // Assert
            expect(result).toEqual(FULL);
        });

        it('should return type group if group had id', () => {
            // Arrange
            const group = { id: 49 };
            // Act
            const result = getScheduleType({ group });
            // Assert
            expect(result).toEqual(GROUP);
        });

        it('should return type teacher if teacher had id', () => {
            // Arrange
            const teacher = { id: 49 };
            // Act
            const result = getScheduleType({ teacher });
            // Assert
            expect(result).toEqual(TEACHER);
        });

        it('should return type department if department had id', () => {
            // Arrange
            const department = { id: 5 };
            // Act
            const result = getScheduleType({ department });
            // Assert
            expect(result).toEqual(DEPARTMENT);
        });

        it('should return type group when group, teacher and department all have ids (priority: group > teacher > department)', () => {
            // Arrange
            const values = {
                group: { id: 49 },
                teacher: { id: 10 },
                department: { id: 5 }
            };
            // Act
            const result = getScheduleType(values);
            // Assert
            expect(result).toEqual(GROUP);
        });

        it('should return type teacher when teacher and department have ids (priority: teacher > department)', () => {
            // Arrange
            const values = {
                teacher: { id: 10 },
                department: { id: 5 }
            };
            // Act
            const result = getScheduleType(values);
            // Assert
            expect(result).toEqual(TEACHER);
        });

        it('should return type full when all fields are filled but with zero id', () => {
            // Arrange
            const values = {
                group: { id: 0 },
                teacher: { id: 0 },
                department: { id: 0 }
            };
            // Act
            const result = getScheduleType(values);
            // Assert
            expect(result).toEqual(FULL);
        });
    });

    describe('Edge cases - Null and empty values', () => {
        it('should return type full when group id is null', () => {
            // Arrange
            const group = { id: null };
            // Act
            const result = getScheduleType({ group });
            // Assert
            expect(result).toEqual(FULL);
        });

        it('should return type full when teacher id is null', () => {
            // Arrange
            const teacher = { id: null };
            // Act
            const result = getScheduleType({ teacher });
            // Assert
            expect(result).toEqual(FULL);
        });

        it('should return type full when department id is null', () => {
            // Arrange
            const department = { id: null };
            // Act
            const result = getScheduleType({ department });
            // Assert
            expect(result).toEqual(FULL);
        });

        it('should return type full with nested empty objects', () => {
            // Arrange
            const values = {
                group: {},
                teacher: {},
                department: {}
            };
            // Act
            const result = getScheduleType(values);
            // Assert
            expect(result).toEqual(FULL);
        });

        it('should return type full when values is empty object with all properties as empty objects', () => {
            // Arrange
            const values = {
                group: { name: 'Group Name' },
                teacher: { name: 'Teacher Name' },
                department: { name: 'Department Name' }
            };
            // Act
            const result = getScheduleType(values);
            // Assert
            expect(result).toEqual(FULL);
        });
    });
});
