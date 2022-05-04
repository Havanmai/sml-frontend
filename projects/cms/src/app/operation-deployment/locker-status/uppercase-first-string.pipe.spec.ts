import { UppercaseFirstStringPipe } from './uppercase-first-string.pipe';

describe('UppercaseFirstStringPipe', () => {
  it('create an instance', () => {
    const pipe = new UppercaseFirstStringPipe();
    expect(pipe).toBeTruthy();
  });
});
