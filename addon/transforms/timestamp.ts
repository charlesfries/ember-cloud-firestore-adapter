import { typeOf } from '@ember/utils';
import Transform from '@ember-data/serializer/transform';

import firebase from 'firebase/app';

export default class TimestampTransform extends Transform {
  public deserialize(value: Date | firebase.firestore.Timestamp): Date {
    if (value instanceof firebase.firestore.Timestamp) {
      return value.toDate();
    }

    return value;
  }

  public serialize(value: unknown): null | Date | firebase.firestore.FieldValue {
    if (typeOf(value) === 'date') {
      return value as Date;
    }
    if (value === null) {
      return value as null;
    }
    return firebase.firestore.FieldValue.serverTimestamp();
  }
}

declare module 'ember-data/types/registries/transform' {
  export default interface TransformRegistry {
    timestamp: TimestampTransform;
  }
}
