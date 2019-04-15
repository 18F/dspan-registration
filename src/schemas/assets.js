import { buildSchema, shapeOf, string } from './index';
import { isPositiveNumber } from 'validators';

const moneySchema = buildSchema(({ t }) =>
  shapeOf({
    moneyOnHand: string()
      .nullable()
      .required(t('errors.required'))
      .test('isPositiveNumber', t('errors.positiveNumber'), isPositiveNumber)
  })
);

const assetsSchema = shapeOf({
  basicInfo: moneySchema
});

export { moneySchema };
export default assetsSchema;
