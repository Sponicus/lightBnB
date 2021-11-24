
INSERT INTO users (id, name, email, password) 
VALUES (1, 'Andrew Spon', 'andrew.spon@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
(2, 'Briann Hoey', 'bri.hoey@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'), 
(3, 'Donald Donaldson', 'donald.donaldson@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, city, street, province, post_code, active)
VALUES (1, 1, 'Paradise Central', 'A nice relaxaing property hidden away from prying eyes.','www.fakeurl1.com','www.fakeurl2.com', 250, 3, 3, 4, 'Canada', 'Ottawa', '123 Spruce St','Ontario', 'N2F4UA', TRUE),
(2, 1, 'Soothing Falls', 'A wondeful lakeside cabin next to the falls by Pidgeon lake.', 'www.fakeurl3.com','www.fakeurl4.com', 210, 2, 2, 3, 'Canada', 'Buckhorn', '333 Pidgeon Lake Blvd','Ontario', 'N2F4UA', TRUE),
(3, 1, 'Free Real Estate', 'As the name implies.','www.fakeurl5.com','www.fakeurl6.com', 150, 1, 1, 1, 'Canada', 'Sudbury', '15 Arthur Rd', 'Ontario', 'N2F4UA', TRUE);

INSERT INTO reservations (id, guest_id, property_id, start_date, end_date)
VALUES (1, 2, 2, '2021-11-25', '2021-11-29'),
(2, 1, 1, '2021-11-25', '2021-11-29'),
(3, 3, 3, '2021-11-25', '2021-11-29');

INSERT INTO property_reviews (id, guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 1, 2, 5, 'messages'),
(2, 2, 2, 1, 5, 'messages'),
(3, 3, 3, 3, 2, 'messages');