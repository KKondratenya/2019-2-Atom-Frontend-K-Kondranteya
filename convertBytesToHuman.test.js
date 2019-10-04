/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman("12")).toBe(false)
  expect(convertBytesToHuman(-1)).toBe(false)
  expect(convertBytesToHuman({})).toBe(false)
  expect(convertBytesToHuman(function() {})).toBe(false)
  expect(convertBytesToHuman([])).toBe(false)
  expect(convertBytesToHuman(true)).toBe(false)
  expect(convertBytesToHuman(false)).toBe(false)
  expect(convertBytesToHuman(null)).toBe(false)
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(1)).toBe('1.00 B')
  expect(convertBytesToHuman(1024)).toBe('1.00 KB')
  expect(convertBytesToHuman(1024 * 1024)).toBe('1.00 MB')
  convertBytesToHuman(123123123) === '117.42 MB'
  // ...
});

// другая группа проверок
test('Проверка на отрицательные числа', () => {
  convertBytesToHuman(-1) !== '1 B'
  // ...
});

