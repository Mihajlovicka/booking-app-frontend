import { environment } from '../../../environments/environment';

const userBaseAPI = environment.auth_api;
const accommodationBaseAPI = environment.accommodation_api;
const bookingBaseAPI = environment.booking_api;
const notificationBaseAPI = environment.notification_api;

const authServiceAPI = userBaseAPI + 'auth/';
const userApi = userBaseAPI + 'user/';
const accommodationServiceAPI = accommodationBaseAPI + 'accommodations';

export const Path = {
  Register: authServiceAPI + 'register',
  Login: authServiceAPI + 'login',
  Equipment: accommodationServiceAPI + '/equipment',
  Accommodations: accommodationServiceAPI,
  User: userApi,
  ChangePassword: authServiceAPI + 'change-password',
};
