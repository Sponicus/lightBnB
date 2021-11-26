const properties = require('./json/properties.json');
const users = require('./json/users.json');
const {Pool} = require('pg');

const pool = new Pool ({user: 'vagrant', password: '123', host: 'localhost', database:'lightbnb'})

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((result) => result.rows[0])
    .catch((err) => {
      console.error(err.message);
    });
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithId = (id) => {
  return pool
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message)
    });
};

// const getUserWithId = function(id) {
//   return Promise.resolve(users[id]);
// }
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  // const values = [user.name, user.email, user.password]
  return pool
  .query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`, [user.name, user.email, user.password])
  .then((result) => result.rows[0])
  .catch((err) => {
    console.log(err.message)
  });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool
  .query(`SELECT reservations.*, properties.title, properties.cost_per_night, (SELECT avg(rating) FROM property_reviews) as average_rating
  FROM reservations
  JOIN properties ON properties.id = property_id
  WHERE guest_id = $1
  ORDER BY start_date
  LIMIT $2;`, [guest_id, limit])
  .then((result) => result.rows)
  .catch((err) => {
    console.log(err.message)
  });
};

exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
 const getAllProperties = function (options, limit = 10) {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  JOIN users ON users.id = owner_id
  JOIN reservations ON reservations.id = reservation_id
  `;
  // if city is a param
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }
////////////NEED TO COMPLETE OWNER ID//////////////////
  if (options.owner_id) {
    if (queryParams.length > 0) {
      queryString += 'AND ';
    } else { 
      queryString += 'WHERE ';
    }
    queryParams.push(`%${options.owner_id}%`);
    queryString =+ `WHERE user LIKE $${queryParams.length} `;
  }
//////////////seek code review//////////////////
  if (options.minimum_price_per_night) {
    
    if (queryParams.length > 0) {
      queryString += 'AND ';
    } else { 
      queryString += 'WHERE ';
    }
    
    queryParams.push(options.minimum_price_per_night * 100);
    queryString += `cost_per_night >= $${queryParams.length} `;

  }
/////////////////////seek code review///////////////
  if (options.maximum_price_per_night) {

    if (queryParams.length > 0) {
      queryString += 'AND ';
    } else { 
      queryString += 'WHERE ';
    }
    
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += `cost_per_night <= $${queryParams.length} `;

  }

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  return pool.query(queryString, queryParams)
  .then((res) => res.rows)
  .catch((err) => {
    console.error(err);
  })
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
