export interface StatisticType {
  bookingsCount: number
  cancelledBookingAfterCheckInCount: number
  cancelledBookingBeforeCheckInCount: number
  cancelledBookingsCount: number
  newPropertiesCount: number
  newPropertyRequestsCount: number
  propertyTypeStats: PropertyTypeStatsType[]
  // top10Properties: Top10Properties[]
  totalProfit: number
  totalRenevue: number
}

export interface PropertyTypeStatsType {
  type: 'Room' | 'HomeStay' | 'House' | 'Apartment'
  totalBookings: number
  totalRevenue: number
}
