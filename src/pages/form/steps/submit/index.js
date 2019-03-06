import React from 'react';
import withLocale from 'components/with-locale';
import Wizard from 'components/wizard';
import FormikField, { FormikRadioGroup } from 'components/formik-field';
import ErrorAlert from 'components/error-alert';

class SignAndSubmit extends React.Component {
  render() {
    const { handleChange, sectionName, registerStep, t } = this.props;

    return (
      <Wizard.Context>
        {(values) => {
          return (
            <Wizard.Step
              header={t('submit.header')}
              registerStep={registerStep}
              modelName="submit"
            >
              <ErrorAlert text={values.errors && values.errors.server ? t('submit.error') : null} />
              <h2>{t('submit.lede')}</h2>
              <div style={{overflow: 'auto', height: '200px' }} className="border-1px padding-4">
                { t('submit.eula') }
              </div>
              <FormikRadioGroup
                options={[{
                  label: t('submit.agree'),
                  value: true
                }, {
                  label: t('submit.disagree'),
                  value: false
                }]}
                onChange={handleChange}
                name="submit.acceptedTerms"
              />
              <FormikField
                labelText={t('submit.label')}
                name="submit.signature"
                onChange={handleChange}
              />
            </Wizard.Step>
          )
        }}
      </Wizard.Context>
    )
  }
}

export { SignAndSubmit }
export default withLocale(SignAndSubmit);
