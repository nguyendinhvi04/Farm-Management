--
-- PostgreSQL database dump
--

\restrict BvdlT3hp9G76BZNE0APby8potNt8xLc4ogvMAikG8PoXUpQyhlGsAJBVRZP8fdY

-- Dumped from database version 16.10 (Homebrew)
-- Dumped by pg_dump version 16.10 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: animal_types; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.animal_types (id, name, average_lifespan, description, created_at, updated_at) FROM stdin;
1	Gà	5	Vật nuôi lấy thịt và trứng	2025-10-15 09:59:42.436818	2025-10-15 09:59:42.436818
2	Chicken	5	Poultry for meat and eggs	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
3	Cow	15	Dairy and beef cattle	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
4	Gà	5	Vật nuôi lấy thịt và trứng	2025-10-15 10:52:23.885363	2025-10-15 10:52:23.885363
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.roles (id, name) FROM stdin;
1	admin
2	farmer
3	employee
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.users (id, username, password_hash, role_id, email, created_at, updated_at) FROM stdin;
3	farmer_user	hashed_farmer_pass	2	farmer@farm.com	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
4	employee_user	hashed_employee_pass	3	employee@farm.com	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
1	admin	bDBtNaeQDvARkpJhJtYt9eWkwQlwM6hd237EpdDStwKiLCt4SHsCa	1	admin@farm.com	2025-10-15 09:59:42.436818	2025-10-15 11:03:11.064239
2	admin_user	bDBtNaeQDvARkpJhJtYt9eWkwQlwM6hd237EpdDStwKiLCt4SHsCa	1	admin@farm.com	2025-10-15 10:09:02.283497	2025-10-15 11:03:11.064239
\.


--
-- Data for Name: farms; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.farms (id, name, location, size, owner_id, created_at, updated_at) FROM stdin;
1	My Farm	Vietnam	100.00	1	2025-10-15 09:59:42.436818	2025-10-15 09:59:42.436818
2	Farm A	Vietnam North	50.00	1	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
3	Farm B	Vietnam South	100.00	2	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
4	My Farm	Vietnam	100.00	1	2025-10-15 10:52:23.88166	2025-10-15 10:52:23.88166
\.


--
-- Data for Name: animals; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.animals (id, farm_id, animal_type_id, type, quantity, health_status, vaccine_date, created_at, updated_at) FROM stdin;
1	1	1	Broiler	100	Healthy	2025-01-01	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
2	2	2	Dairy	20	Good	2025-02-15	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
\.


--
-- Data for Name: assignments; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.assignments (id, user_id, entity_id, entity_type, description, start_date, end_date, status, created_at, updated_at) FROM stdin;
1	3	1	plot	Care for Plot 1	2025-03-01	2025-07-01	assigned	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
2	3	1	animal	Feed animals	2025-01-01	2025-12-31	completed	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
\.


--
-- Data for Name: breeding_logs; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.breeding_logs (id, animal_id, breeding_date, offspring_quantity, description, created_at, updated_at) FROM stdin;
1	1	2025-06-01	50	Chicken breeding cycle	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
2	2	2025-07-15	5	Cow calving	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
\.


--
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.suppliers (id, farm_id, name, contact, address, created_at, updated_at) FROM stdin;
1	1	Supplier A	0123456789	\N	2025-10-15 09:59:42.436818	2025-10-15 09:59:42.436818
2	1	Supplier X	0123456789	Address X, Vietnam	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
3	2	Supplier Y	0987654321	Address Y, Vietnam	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
4	1	Supplier A	0123456789	\N	2025-10-15 10:52:23.882543	2025-10-15 10:52:23.882543
\.


--
-- Data for Name: fertilizers; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.fertilizers (id, name, composition, supplier_id, description, created_at, updated_at) FROM stdin;
1	NPK	N:20%, P:20%, K:15%	1	\N	2025-10-15 09:59:42.436818	2025-10-15 09:59:42.436818
2	NPK Fertilizer	N:20%, P:20%, K:15%	1	Balanced fertilizer	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
3	Organic Compost	Organic matter 50%	2	Natural soil enhancer	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
4	NPK	N:20%, P:20%, K:15%	1	\N	2025-10-15 10:52:23.885832	2025-10-15 10:52:23.885832
\.


--
-- Data for Name: care_logs; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.care_logs (id, entity_id, entity_type, action, description, date, user_id, fertilizer_id, created_at, updated_at) FROM stdin;
1	1	crop	Fertilizing	Applied NPK	2025-04-01	3	1	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
2	1	animal	Vaccinating	Annual vaccine	2025-05-01	3	\N	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
\.


--
-- Data for Name: crop_types; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.crop_types (id, name, growth_duration, description, created_at, updated_at) FROM stdin;
1	Lúa	120	Cây lương thực chính	2025-10-15 09:59:42.436818	2025-10-15 09:59:42.436818
2	Rice	120	Main staple crop	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
3	Vegetables	60	Leafy greens and roots	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
4	Lúa	120	Cây lương thực chính	2025-10-15 10:52:23.884822	2025-10-15 10:52:23.884822
\.


--
-- Data for Name: plots; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.plots (id, farm_id, name, area, soil_type, status, image_url, latitude, longitude, created_at, updated_at) FROM stdin;
1	1	Plot 1	10.00	Clay	active	http://example.com/plot1.jpg	21.02850000	105.85420000	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
2	1	Plot 2	15.00	Sandy	active	http://example.com/plot2.jpg	21.03000000	105.85600000	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
3	2	Plot 3	20.00	Loam	inactive	\N	\N	\N	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
\.


--
-- Data for Name: seasons; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.seasons (id, name, start_month, end_month, description, created_at, updated_at) FROM stdin;
1	Mùa Xuân	3	5	Mùa trồng cây ngắn ngày	2025-10-15 09:59:42.436818	2025-10-15 09:59:42.436818
2	Spring	3	5	Season for short-day crops	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
3	Summer	6	8	Hot season for tropical crops	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
4	Mùa Xuân	3	5	Mùa trồng cây ngắn ngày	2025-10-15 10:52:23.884022	2025-10-15 10:52:23.884022
\.


--
-- Data for Name: crops; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.crops (id, plot_id, crop_type_id, season_id, name, plant_date, harvest_date, quantity, status, created_at, updated_at) FROM stdin;
1	1	1	1	Paddy Rice	2025-03-01	2025-07-01	500.00	growing	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
2	2	2	2	Cabbage	2025-06-15	2025-08-15	200.00	growing	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.customers (id, farm_id, name, contact, address, created_at, updated_at) FROM stdin;
1	1	Customer X	0987654321	\N	2025-10-15 09:59:42.436818	2025-10-15 09:59:42.436818
2	1	Customer A	111222333	Address A, Vietnam	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
3	2	Customer B	444555666	Address B, Vietnam	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
4	1	Customer X	0987654321	\N	2025-10-15 10:52:23.883295	2025-10-15 10:52:23.883295
\.


--
-- Data for Name: environmental_data; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.environmental_data (id, plot_id, date, temperature, rainfall, humidity, other_notes, created_at, updated_at) FROM stdin;
1	1	2025-10-01	25.50	10.00	80.00	Sunny day	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
2	2	2025-10-02	26.00	5.00	75.00	Light rain	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
\.


--
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.inventory (id, farm_id, supplier_id, item_name, quantity, unit, price, created_at, updated_at) FROM stdin;
1	1	1	Seeds	100.00	kg	50.00	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
2	2	2	Feed	500.00	kg	20.00	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.orders (id, farm_id, customer_id, order_date, total_amount, status, description, created_at, updated_at) FROM stdin;
1	1	1	2025-10-01	1000.00	pending	Order for rice	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
2	2	2	2025-10-05	2000.00	shipped	Order for milk	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.order_items (id, order_id, entity_id, entity_type, quantity, price, created_at, updated_at) FROM stdin;
1	1	1	crop	100.00	10.00	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
2	2	1	animal	10.00	200.00	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.transactions (id, farm_id, order_id, type, amount, description, transaction_date, created_at, updated_at) FROM stdin;
1	1	1	income	1000.00	Sale of rice	2025-10-02	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
2	2	2	expense	500.00	Purchase of feed	2025-10-06	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
\.


--
-- Data for Name: user_farms; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.user_farms (user_id, farm_id) FROM stdin;
1	1
2	2
3	1
\.


--
-- Name: animal_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyendv
--

SELECT pg_catalog.setval('public.animal_types_id_seq', 4, true);


--
-- Name: animals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyendv
--

SELECT pg_catalog.setval('public.animals_id_seq', 2, true);


--
-- Name: assignments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyendv
--

SELECT pg_catalog.setval('public.assignments_id_seq', 2, true);


--
-- Name: breeding_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyendv
--

SELECT pg_catalog.setval('public.breeding_logs_id_seq', 2, true);


--
-- Name: care_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyendv
--

SELECT pg_catalog.setval('public.care_logs_id_seq', 2, true);


--
-- Name: crop_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyendv
--

SELECT pg_catalog.setval('public.crop_types_id_seq', 4, true);


--
-- Name: crops_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyendv
--

SELECT pg_catalog.setval('public.crops_id_seq', 2, true);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyendv
--

SELECT pg_catalog.setval('public.customers_id_seq', 4, true);


--
-- Name: environmental_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyendv
--

SELECT pg_catalog.setval('public.environmental_data_id_seq', 2, true);


--
-- Name: farms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyendv
--

SELECT pg_catalog.setval('public.farms_id_seq', 4, true);


--
-- Name: fertilizers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyendv
--

SELECT pg_catalog.setval('public.fertilizers_id_seq', 4, true);


--
-- Name: inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyendv
--

SELECT pg_catalog.setval('public.inventory_id_seq', 2, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyendv
--

SELECT pg_catalog.setval('public.order_items_id_seq', 2, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyendv
--

SELECT pg_catalog.setval('public.orders_id_seq', 2, true);


--
-- Name: plots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyendv
--

SELECT pg_catalog.setval('public.plots_id_seq', 3, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyendv
--

SELECT pg_catalog.setval('public.roles_id_seq', 5, true);


--
-- Name: seasons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyendv
--

SELECT pg_catalog.setval('public.seasons_id_seq', 4, true);


--
-- Name: suppliers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyendv
--

SELECT pg_catalog.setval('public.suppliers_id_seq', 4, true);


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyendv
--

SELECT pg_catalog.setval('public.transactions_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyendv
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- PostgreSQL database dump complete
--

\unrestrict BvdlT3hp9G76BZNE0APby8potNt8xLc4ogvMAikG8PoXUpQyhlGsAJBVRZP8fdY

