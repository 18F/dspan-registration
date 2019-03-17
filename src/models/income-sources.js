import applicable from './applicable';

const incomeTypes = [
  "selfEmployed",
  "unemployment",
  "cashAssistance",
  "disability",
  "socialSecurity",
  "veteransBenefits",
  "alimony",
  "childSupport",
  "otherSources",
];

export default () => ({
  ...incomeTypes.reduce((memo, type) => ({ ...memo, [type]: applicable(),  }), {}),
});
