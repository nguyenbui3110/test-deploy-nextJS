export const routes = {
  home: {
    generatePath: () => '/',
  },
  authenticate: {
    generatePath: () => '/authenticate',
  },
  detailProperty: {
    generatePath: (id) => `/detail-property/${id}`,
  },
  myAccount: {
    generatePath: () => '/my-account',
  },
  hostProfile: {
    generatePath: (id) => `/host-profile/${id}`,
  },
  guestProfile: {
    generatePath: (id) => `/guest-profile/${id}`,
  },
  wishlist: {
    generatePath: () => '/wishlist',
  },
  guestManageBooking: {
    generatePath: () => '/guest-manage-bookings',
  },
  hostManageProperty: {
    generatePath: () => '/host-manage-property',
  },
  bookingResult: {
    sendData: {
      generatePath: (bookingSuccess: boolean) =>
        `/booking-result?bookingSuccess=${bookingSuccess}`,
    },
    generatePath: () => '/booking-result',
  },
  admin: {
    manageProperty: {
      generatePath: () => '/admin/manage-property',
    },
    manageAccounts: {
      generatePath: () => '/admin/manage-account',
    },
    manageStatistics: {
      generatePath: () => '/admin/manage-statistics',
    },
  },
}
