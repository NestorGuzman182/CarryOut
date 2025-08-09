import { VowelsByNumberPipe } from './vowels-by-number.pipe';

describe('VowelsByNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new VowelsByNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
