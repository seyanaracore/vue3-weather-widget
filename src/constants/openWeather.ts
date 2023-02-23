export const API_URL = 'https://api.openweathermap.org/data/2.5/weather'
export const WEATHER_LANG = 'en'
export const API_KEY = '389eb97974330697184bd3cff5ac6def'
export const TEMP_UNIT = 'metric'

export const BASE_CONFIG_REQUEST = {
  lang: WEATHER_LANG,
  units: TEMP_UNIT,
  APPID: API_KEY,
}

// eslint-disable-next-line no-shadow
export enum EWeatherAPIRequestParams {
  cityName = 'q',
  latitude = 'lat',
  longitude = 'lon',
}
