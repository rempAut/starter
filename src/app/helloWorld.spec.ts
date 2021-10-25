import { helloWorld } from './HelloWorld';

test('returns Hello World from TS', () => {
    expect(helloWorld()).toBe('Hello World from TS');
});
