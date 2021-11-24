SELECT reservations.*, properties.title, properties.cost_per_night, (SELECT avg(rating) FROM property_reviews) as average_rating
FROM reservations
JOIN properties ON properties.id = property_id
WHERE guest_id = 1
ORDER BY start_date
LIMIT 10;