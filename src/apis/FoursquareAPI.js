
const api = 'https://api.foursquare.com/v2/'


let clientID = 'GIDGXQL1ZCS24T5OQDNZPYAYFWKLELY1SQPABYF4PNVGVWWK'
let clientSecret = 'QZK2LO4BWZEYFX23Y5LCI3JBL2OKZWR3RK3YGUN2ZJAJVP24'

export const explore = ({ lat, lng }, query) =>
  fetch(`${api}/venues/explore?client_id=${clientID}&client_secret=${clientSecret}&v=20180323&limit=50&ll=${lat},${lng}&query=${query ? '&query=' + query : ''}`)
    .then(res => res.json())
    .then(data => placeMapping(data))

const placeMapping = (response) => {
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

  return { total: response.totalResults, places }
}
