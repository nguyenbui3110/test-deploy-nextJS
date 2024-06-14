import {
  PropertyTypeStatsType,
  StatisticType,
} from '@/src/page-components/Admin/ManageStatistic/constant'
import { ResponsiveBar } from '@nivo/bar'

interface BarCharType {
  TypeRoom: 'Room' | 'HomeStay' | 'House' | 'Apartment'
  QuantityBooking: number
}
interface PropsType {
  dataStatictis: StatisticType | undefined
  bookingCount: number
  cancelBookingBeforeCheckIn: number
  cancelBookingAfterCheckIn: number
}

const BarChartQuantityBooking = ({
  dataStatictis,
  bookingCount,
  cancelBookingBeforeCheckIn,
  cancelBookingAfterCheckIn,
}: PropsType) => {
  let mockBarData: BarCharType[] = [
    {
      TypeRoom: 'Room',
      QuantityBooking: 137,
    },
    {
      TypeRoom: 'HomeStay',
      QuantityBooking: 109,
    },
    {
      TypeRoom: 'House',
      QuantityBooking: 133,
    },
    {
      TypeRoom: 'Apartment',
      QuantityBooking: 80,
    },
  ]
  if (dataStatictis) {
    mockBarData = dataStatictis.propertyTypeStats.map(
      (typeRoome: PropertyTypeStatsType) => {
        return {
          TypeRoom: typeRoome.type,
          QuantityBooking: typeRoome.totalBookings,
        }
      }
    )
  }
  return (
    <>
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Số lượng Booking :{' '}
          <span className="text-[#352069] font-bold">{bookingCount}</span>
        </p>
        <p className="text-sm text-gray-500">
          Số lượng hủy Booking :{' '}
          <span className="text-[#352069] font-bold">
            {cancelBookingBeforeCheckIn + cancelBookingAfterCheckIn}
          </span>
        </p>
      </div>
      <ResponsiveBar
        data={mockBarData}
        colors={{ scheme: 'category10' }}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: '#12ae9b',
              },
            },
            legend: {
              text: {
                fill: '#12ae9b',
              },
            },
            ticks: {
              line: {
                stroke: '#12ae9b',
                strokeWidth: 1,
              },
              text: {
                fill: '#12ae9b',
              },
            },
          },
          legends: {
            text: {
              fill: '#12ae9b',
            },
          },
          tooltip: {
            container: {
              color: '#141b2d',
            },
          },
        }}
        keys={['QuantityBooking']}
        indexBy="TypeRoom"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'fries',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'sandwich',
            },
            id: 'lines',
          },
        ]}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.2]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Loại phòng',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Số lượng Booking',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
        }
      />
    </>
  )
}

export default BarChartQuantityBooking
