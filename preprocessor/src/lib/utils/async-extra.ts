import { EventEmitter } from 'events';

export const p2g = async function* <T>(promise: Promise<T>) {
  try {
    yield await promise;
  } catch (e) {
    yield e as Error;
  }
};
