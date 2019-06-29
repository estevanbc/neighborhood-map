
const api = 'https://api.foursquare.com/v2/'


/* let clientID = 'GIDGXQL1ZCS24T5OQDNZPYAYFWKLELY1SQPABYF4PNVGVWWK'
let clientSecret = 'QZK2LO4BWZEYFX23Y5LCI3JBL2OKZWR3RK3YGUN2ZJAJVP24' */

let clientID = 'M2SUMWEV3YAQ5HLSUMYM2GBA3FANMOU40YATM2X5J0DOKJHK'
let clientSecret = 'RJCNZJEZTGJYWGJHBQPKXL2C2ETYA5Q3CE432ZSBLRHATW3J'

export const explore = ({ lat, lng }, query) =>
  fetch(`${api}/venues/explore?client_id=${clientID}&client_secret=${clientSecret}&v=20180323&radius=1000&limit=50&ll=${lat},${lng}${query ? '&query=' + query : ''}`)
    .then(res => res.json())
    .then(data => placeExploreMapping(data))

export const get = (id) =>
  fetch(`${api}/venues/${id}?client_id=${clientID}&client_secret=${clientSecret}&v=20180323`)
    .then(res => res.json())
    .then(data => placeGetMapping(data))

const placeExploreMapping = (response) => {
  let places = [];

  response.response.groups.forEach(group => {
    places = places.concat(group.items.map(item => {
      return {
        source: 'FOURSQUARE',
        id: item.venue.id,
        name: item.venue.name,
        categories: item.venue.categories.map(category => {
          return {
            name: category.name,
            icon: category.icon
          }
        }),
        location: {
          address: item.venue.location.formattedAddress[0],
          lat: item.venue.location.lat,
          lng: item.venue.location.lng
        }
      }
    }));
  });

  return { total: response.response.totalResults, places }
}

const placeGetMapping = (response) => {
  let { venue } = response.response;
  return {
    source: 'FOURSQUARE',
    id: venue.id,
    name: venue.name,
    contact: venue.contact,
    url: venue.url,
    price: venue.price,
    rating: venue.rating,
    ratingColor: venue.ratingColor,
    hours: venue.hours,
    bestPhoto: venue.bestPhoto,
    categories: venue.categories.map(category => {
      return {
        name: category.name,
        icon: category.icon
      }
    }),
    location: {
      address: venue.location.formattedAddress[0]
    }
  }
}
