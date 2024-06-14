import { BACK_END_API_URL } from '@/src/constant'
import { http } from '@/src/library/http'

const STATISTICS_PATH = `${BACK_END_API_URL}/api/statistics`

export const getStatistics = (dateStart: string, dateEnd: string) => {
  if (dateStart && dateEnd) {
    return http.get<{ data }>(
      `${STATISTICS_PATH}?From=${dateStart}&To=${dateEnd}`
    )
  }
  return http.get<{ data }>(`${STATISTICS_PATH}`)
}
