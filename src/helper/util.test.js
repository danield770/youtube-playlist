import {
  youtubeDurationToTimeString,
  isValidId,
  getIdFromInputString,
  validate,
} from './util';

it('converts a youtube duration string to a timestring', () => {
  expect(youtubeDurationToTimeString('PT1H21M31S')).toEqual('1:21:31');
  expect(youtubeDurationToTimeString('PT1H3M7S')).toEqual('1:03:07');
  expect(youtubeDurationToTimeString('PT3M7S')).toEqual('03:07');
  expect(youtubeDurationToTimeString('PT3M')).toEqual('03:00');
  expect(youtubeDurationToTimeString('PT8S')).toEqual('00:08');
});

it('validates a youtube id with a regex', () => {
  expect(isValidId('abcde')).toBeFalsy();
  expect(isValidId('3ZEz-iposj8')).toBeTruthy();
  expect(isValidId('3ZEz-&posj8')).toBeFalsy();
});

it('returns an id from an input string or empty string on error', () => {
  expect(
    getIdFromInputString('https://www.youtube.com/watch?v=FnJGlAQmljU')
  ).toEqual('FnJGlAQmljU');
  expect(
    getIdFromInputString(
      'https://www.youtube.com/watch?v=FnJGlAQmljU&bla=fvebvseb&kookoomookoo=bla'
    )
  ).toEqual('FnJGlAQmljU');
  expect(getIdFromInputString('FnJGlAQmljU')).toEqual('FnJGlAQmljU');
  expect(getIdFromInputString('FnJGlAQmlj')).toEqual('');
  expect(
    getIdFromInputString('https://www.youtube.com/watch?id=FnJGlAQmljU')
  ).toEqual('');
  expect(getIdFromInputString('watch?v=FnJGlAQmljU')).toEqual('');
});

it('validates an input string and returns a validation object', () => {
  expect(validate('abcde')).toEqual({
    error: 'error: invalid url',
    isValidId: false,
  });
  expect(validate('3ZEz-&posj8')).toEqual({
    error: 'error: invalid youtube id',
    isValidId: false,
  });
  expect(
    validate(
      'https://www.youtube.com/watch?v=FnJGlAQmljU&bla=fvebvseb&kookoomookoo=bla'
    )
  ).toEqual({ id: 'FnJGlAQmljU', isValidId: true });
  expect(isValidId('3ZEz-&posj8')).toBeFalsy();
});
