import { environment } from '../../../environments/environment';

const userBaseAPI = environment.auth_api;
const accommodationBaseAPI = environment.accommodation_api;
const bookingBaseAPI = environment.booking_api;
export const notificationBaseAPI = environment.notification_api;

const authServiceAPI = userBaseAPI + 'auth/';
const userApi = userBaseAPI + 'user/';
const accommodationServiceAPI = accommodationBaseAPI + 'accommodations';
const reviewServiceAPI = bookingBaseAPI + 'reviews';
const notificationServiceAPI = notificationBaseAPI + 'notification';

export const Path = {
  Register: authServiceAPI + 'register',
  Login: authServiceAPI + 'login',
  Equipment: accommodationServiceAPI + '/equipment',
  Accommodations: accommodationServiceAPI,
  User: userApi,
  ChangePassword: authServiceAPI + 'change-password',
  Booking: bookingBaseAPI,
  Reviews: reviewServiceAPI,
  Notification: notificationServiceAPI
};
