import axios from 'axios';
import {
  toRegistrationServiceFormat,
  formatRegistrationForClient,
} from 'utils/json-transform';
import { leftPad } from 'utils';

const endpoint = 'registrations';
const location = process.env.NODE_ENV === 'development' ?
  'http://localhost:8001' : process.env.REACT_APP_REGISTRATION_SERVICE_URL;


const formatDate = date =>
  !Object.values(date).every(v => !!v) ?
  '' :
  `${date.year}-${leftPad(date.month)}-${leftPad(date.day)}`;

const transformFilters = ({ registrant_dob, registrant_ssn, ...rest }) => ({
  ...rest,
  registrant_dob: formatDate(registrant_dob),
  registrant_ssn: registrant_ssn.replace(/[^0-9A]/g, ''),
});

const formatQueryParams = (data) =>
  Object.entries(data)
  .reduce((accum, [key, value]) => {
    if (!value) {
      return accum;
    }

    return [
      ...accum,
      `${key}=${value}`,
    ];
  }, []).join('&');

export const getRegistrations = (filters) => {
  let url = `${location}/${endpoint}`;

  if (!filters.id) {
    const { id, ...otherFilters } = filters;
    url = `${url}?${formatQueryParams(transformFilters(otherFilters))}`;
  } else {
    url = `${url}/${filters.id}`;
  }

  return axios.get(url, {
    headers: {
      'Authorization': `Basic ${btoa('admin:ToBeChanged')}`
    }
  })
    .then(({ data }) => {
      const registrations = Array.isArray(data) ? data : [data];
      return registrations.map(formatRegistrationForClient);
    });
};

export const createRegistration = (registrationData) => {
  const transformedData = toRegistrationServiceFormat(registrationData);

  return axios.post(`${location}/${endpoint}`, transformedData, {
    headers: {
      'Authorization': `Basic ${btoa('admin:ToBeChanged')}`
    }
  })
    .then(response => response.data);
};

export const updateRegistration = ({ id, ...registrationData }) => {
  const transformedData = toRegistrationServiceFormat(registrationData);

  return axios.put(`${location}/${endpoint}/${id}`, transformedData, {
    headers: {
      'Authorization': `Basic ${btoa('admin:ToBeChanged')}`
    }
  })
    .then(({ data }) => formatRegistrationForClient(data));
}
