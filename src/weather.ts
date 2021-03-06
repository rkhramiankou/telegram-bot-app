import { get } from 'lodash'
import axios from 'axios'

const weatherToken = process.env.OPENWEATHERMAP_TOKEN || 'set_your_token'

const iconGet = [
  '01d',
  '01n',
  '02d',
  '02n',
  '03d',
  '03n',
  '04d',
  '04n',
  '09d',
  '09n',
  '10d',
  '10n',
  '11d',
  '11n',
  '13d',
  '13n',
  '50d',
  '50n',
]
const iconTake = [
  '☀️',
  '🌙',
  '⛅️',
  '⛅️',
  '☁️',
  '☁️',
  '🌩',
  '🌩',
  '🌧',
  '🌧',
  '🌦',
  '🌦',
  '⛈',
  '⛈',
  '🌨',
  '🌨',
  '🌫',
  '🌫',
]
const windDir = ['C', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ', 'C']
const flags = [
  '🇦🇫',
  '🇦🇽',
  '🇦🇱',
  '🇩🇿',
  '🇦🇸',
  '🇦🇩',
  '🇦🇴',
  '🇦🇮',
  '🇦🇶',
  '🇦🇬',
  '🇦🇷',
  '🇦🇲',
  '🇦🇼',
  '🇦🇺',
  '🇦🇹',
  '🇦🇿',
  '🇧🇸',
  '🇧🇭',
  '🇧🇩',
  '🇧🇧',
  '🇧🇾',
  '🇧🇪',
  '🇧🇿',
  '🇧🇯',
  '🇧🇲',
  '🇧🇹',
  '🇧🇴',
  '🇧🇦',
  '🇧🇼',
  '🇧🇷',
  '🇮🇴',
  '🇻🇬',
  '🇧🇳',
  '🇧🇬',
  '🇧🇫',
  '🇧🇮',
  '🇰🇭',
  '🇨🇲',
  '🇨🇦',
  '🇮🇨',
  '🇨🇻',
  '🇧🇶',
  '🇰🇾',
  '🇨🇫',
  '🇹🇩',
  '🇨🇱',
  '🇨🇳',
  '🇨🇽',
  '🇨🇨',
  '🇨🇴',
  '🇰🇲',
  '🇨🇬',
  '🇨🇩',
  '🇨🇰',
  '🇨🇷',
  '🇨🇮',
  '🇭🇷',
  '🇨🇺',
  '🇨🇼',
  '🇨🇾',
  '🇨🇿',
  '🇩🇰',
  '🇩🇯',
  '🇩🇲',
  '🇩🇴',
  '🇪🇨',
  '🇪🇬',
  '🇸🇻',
  '🇬🇶',
  '🇪🇷',
  '🇪🇪',
  '🇪🇹',
  '🇪🇺',
  '🇫🇰',
  '🇫🇴',
  '🇫🇯',
  '🇫🇮',
  '🇫🇷',
  '🇬🇫',
  '🇵🇫',
  '🇹🇫',
  '🇬🇦',
  '🇬🇲',
  '🇬🇪',
  '🇩🇪',
  '🇬🇭',
  '🇬🇮',
  '🇬🇷',
  '🇬🇱',
  '🇬🇩',
  '🇬🇵',
  '🇬🇺',
  '🇬🇹',
  '🇬🇬',
  '🇬🇳',
  '🇬🇼',
  '🇬🇾',
  '🇭🇹',
  '🇭🇳',
  '🇭🇰',
  '🇭🇺',
  '🇮🇸',
  '🇮🇳',
  '🇮🇩',
  '🇮🇷',
  '🇮🇶',
  '🇮🇪',
  '🇮🇲',
  '🇮🇱',
  '🇮🇹',
  '🇯🇲',
  '🇯🇵',
  '🇯🇪',
  '🇯🇴',
  '🇰🇿',
  '🇰🇪',
  '🇰🇮',
  '🇽🇰',
  '🇰🇼',
  '🇰🇬',
  '🇱🇦',
  '🇱🇻',
  '🇱🇧',
  '🇱🇸',
  '🇱🇷',
  '🇱🇾',
  '🇱🇮',
  '🇱🇹',
  '🇱🇺',
  '🇲🇴',
  '🇲🇰',
  '🇲🇬',
  '🇲🇼',
  '🇲🇾',
  '🇲🇻',
  '🇲🇱',
  '🇲🇹',
  '🇲🇭',
  '🇲🇶',
  '🇲🇷',
  '🇲🇺',
  '🇾🇹',
  '🇲🇽',
  '🇫🇲',
  '🇲🇩',
  '🇲🇨',
  '🇲🇳',
  '🇲🇪',
  '🇲🇸',
  '🇲🇦',
  '🇲🇿',
  '🇲🇲',
  '🇳🇦',
  '🇳🇷',
  '🇳🇵',
  '🇳🇱',
  '🇳🇨',
  '🇳🇿',
  '🇳🇮',
  '🇳🇪',
  '🇳🇬',
  '🇳🇺',
  '🇳🇫',
  '🇰🇵',
  '🇲🇵',
  '🇳🇴',
  '🇴🇲',
  '🇵🇰',
  '🇵🇼',
  '🇵🇸',
  '🇵🇦',
  '🇵🇬',
  '🇵🇾',
  '🇵🇪',
  '🇵🇭',
  '🇵🇳',
  '🇵🇱',
  '🇵🇹',
  '🇵🇷',
  '🇶🇦',
  '🇷🇪',
  '🇷🇴',
  '🇷🇺',
  '🇷🇼',
  '🇼🇸',
  '🇸🇲',
  '🇸🇦',
  '🇸🇳',
  '🇷🇸',
  '🇸🇨',
  '🇸🇱',
  '🇸🇬',
  '🇸🇽',
  '🇸🇰',
  '🇸🇮',
  '🇬🇸',
  '🇸🇧',
  '🇸🇴',
  '🇿🇦',
  '🇰🇷',
  '🇸🇸',
  '🇪🇸',
  '🇱🇰',
  '🇧🇱',
  '🇸🇭',
  '🇰🇳',
  '🇱🇨',
  '🇵🇲',
  '🇻🇨',
  '🇸🇩',
  '🇸🇷',
  '🇸🇿',
  '🇸🇪',
  '🇨🇭',
  '🇸🇾',
  '🇹🇼',
  '🇹🇯',
  '🇹🇿',
  '🇹🇭',
  '🇹🇱',
  '🇹🇬',
  '🇹🇰',
  '🇹🇴',
  '🇹🇹',
  '🇹🇳',
  '🇹🇷',
  '🇹🇲',
  '🇹🇨',
  '🇹🇻',
  '🇻🇮',
  '🇺🇬',
  '🇺🇦',
  '🇦🇪',
  '🇬🇧',
  '🇺🇸',
  '🇺🇾',
  '🇺🇿',
  '🇻🇺',
  '🇻🇦',
  '🇻🇪',
  '🇻🇳',
  '🇼🇫',
  '🇪🇭',
  '🇾🇪',
  '🇿🇲',
  '🇿🇼',
]
const regions = [
  'AF',
  'AX',
  'AL',
  'DZ',
  'AS',
  'AD',
  'AO',
  'AI',
  'AQ',
  'AG',
  'AR',
  'AM',
  'AW',
  'AU',
  'AT',
  'AZ',
  'BS',
  'BH',
  'BD',
  'BB',
  'BY',
  'BE',
  'BZ',
  'BJ',
  'BM',
  'BT',
  'BO',
  'BA',
  'BW',
  'BR',
  'IO',
  'VG',
  'BN',
  'BG',
  'BF',
  'BI',
  'KH',
  'CM',
  'CA',
  'IC',
  'CV',
  'BQ',
  'KY',
  'CF',
  'TD',
  'CL',
  'CN',
  'CX',
  'CC',
  'CO',
  'KM',
  'CG',
  'CD',
  'CK',
  'CR',
  'CI',
  'HR',
  'CU',
  'CW',
  'CY',
  'CZ',
  'DK',
  'DJ',
  'DM',
  'DO',
  'EC',
  'EG',
  'SV',
  'GQ',
  'ER',
  'EE',
  'ET',
  'EU',
  'FK',
  'FO',
  'FJ',
  'FI',
  'FR',
  'GF',
  'PF',
  'TF',
  'GA',
  'GM',
  'GE',
  'DE',
  'GH',
  'GI',
  'GR',
  'GL',
  'GD',
  'GP',
  'GU',
  'GT',
  'GG',
  'GN',
  'GW',
  'GY',
  'HT',
  'HN',
  'HK',
  'HU',
  'IS',
  'IN',
  'ID',
  'IR',
  'IQ',
  'IE',
  'IM',
  'IL',
  'IT',
  'JM',
  'JP',
  'JE',
  'JO',
  'KZ',
  'KE',
  'KI',
  'XK',
  'KW',
  'KG',
  'LA',
  'LV',
  'LB',
  'LS',
  'LR',
  'LY',
  'LI',
  'LT',
  'LU',
  'MO',
  'MK',
  'MG',
  'MW',
  'MY',
  'MV',
  'ML',
  'MT',
  'MH',
  'MQ',
  'MR',
  'MU',
  'YT',
  'MX',
  'FM',
  'MD',
  'MC',
  'MN',
  'ME',
  'MS',
  'MA',
  'MZ',
  'MM',
  'NA',
  'NR',
  'NP',
  'NL',
  'NC',
  'NZ',
  'NI',
  'NE',
  'NG',
  'NU',
  'NF',
  'KP',
  'MP',
  'NO',
  'OM',
  'PK',
  'PW',
  'PS',
  'PA',
  'PG',
  'PY',
  'PE',
  'PH',
  'PN',
  'PL',
  'PT',
  'PR',
  'QA',
  'RE',
  'RO',
  'RU',
  'RW',
  'WS',
  'SM',
  'SA',
  'SN',
  'RS',
  'SC',
  'SL',
  'SG',
  'SX',
  'SK',
  'SI',
  'GS',
  'SB',
  'SO',
  'ZA',
  'KR',
  'SS',
  'ES',
  'LK',
  'BL',
  'SH',
  'KN',
  'LC',
  'PM',
  'VC',
  'SD',
  'SR',
  'SZ',
  'SE',
  'CH',
  'SY',
  'TW',
  'TJ',
  'TZ',
  'TH',
  'TL',
  'TG',
  'TK',
  'TO',
  'TT',
  'TN',
  'TR',
  'TM',
  'TC',
  'TV',
  'VI',
  'UG',
  'UA',
  'AE',
  'GB',
  'US',
  'UY',
  'UZ',
  'VU',
  'VA',
  'VE',
  'VN',
  'WF',
  'EH',
  'YE',
  'ZM',
  'ZW',
]

const getWeatherUrlForecast = (locationURL: string): string =>
  `http://api.openweathermap.org/data/2.5/forecast/daily?q=${encodeURI(
    locationURL,
  )}&units=metric&lang=ru&APPID=${weatherToken}`

const getWeatherUrlNow = (locationURL: string): string =>
  `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    locationURL,
  )}&units=metric&lang=ru&APPID=${weatherToken}`

const icon = (value: string): string => get(iconTake, iconGet.indexOf(value.toLowerCase()), '🙈')

const windDirection = (value: number): string => windDir[Math.round(value / 45)]

const getFlag = (value: string): string => get(flags, regions.indexOf(value.toUpperCase()), '🙊')

export const getWeather = async (location: string): Promise<string> => {
  try {
    const [infoForecast, infoNow] = await Promise.all([
      axios(getWeatherUrlForecast(location), { timeout: 5000 }).then((x) => x.data),
      axios(getWeatherUrlNow(location), { timeout: 5000 }).then((x) => x.data),
    ])

    const city = infoForecast.city.name
    const { country } = infoForecast.city
    const { temp } = infoNow.main
    const { humidity } = infoNow.main
    const wind = infoNow.wind.speed
    const dir = windDirection(infoNow.wind.deg)
    const dayTempHigh = infoForecast.list[0].temp.max
    const dayTempLow = infoForecast.list[0].temp.min
    const nextDayTempHigh = infoForecast.list[1].temp.max
    const nextDayTempLow = infoForecast.list[1].temp.min
    const nextNextDayTempHigh = infoForecast.list[2].temp.max
    const nextNextDayTempLow = infoForecast.list[2].temp.min
    const nowDescription = infoNow.weather[0].description
    const dayDescription = infoForecast.list[0].weather[0].description
    const nextDayDescription = infoForecast.list[1].weather[0].description
    const nextNextDayDescription = infoForecast.list[2].weather[0].description
    const nowIcon = icon(infoNow.weather[0].icon)
    const dayIcon = icon(infoForecast.list[0].weather[0].icon)
    const nextDayIcon = icon(infoForecast.list[1].weather[0].icon)
    const nextNextDayIcon = icon(infoForecast.list[2].weather[0].icon)
    const flag = getFlag(country)
    return `Город: ${city} регион: ${flag} ${country}\
              \nНаправление ветра: ${dir}, скорость: ${wind}м/с\
              \nТемпература: *${temp}°C*, влажность: ${humidity}%\
              \n${nowDescription} ${nowIcon}\
              \nСегодня: *${dayTempHigh}°C* / *${dayTempLow}°C*, ${dayDescription} ${dayIcon}\
              \nЗавтра: *${nextDayTempHigh}°C* / *${nextDayTempLow}°C*, ${nextDayDescription} ${nextDayIcon}\
              \nПослезавтра: *${nextNextDayTempHigh}°C* / *${nextNextDayTempLow}°C*, ${nextNextDayDescription} ${nextNextDayIcon}`
  } catch (e) {
    return 'Неверно выбран населенный пункт'
  }
}
