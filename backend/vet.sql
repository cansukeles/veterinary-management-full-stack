--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.0

-- Started on 2024-03-07 21:51:14 +03

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
-- TOC entry 3651 (class 0 OID 18327)
-- Dependencies: 216
-- Data for Name: animal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.animal (id, breed, colour, date_of_birth, gender, name, species, customer_id) FROM stdin;
16	Tabby	Black	2015-02-10	Male	Kariş	Cat	3
1	Tabby	Gray & White	2022-06-29	Female	Miso	Cat	1
22	Tabby	Black & White	2022-06-29	Male	Soya	Cat	2
23	Tabby	Black & White	2015-02-10	Male	Yeti	Cat	6
24	Labrador Retriever	Black	2014-06-15	Male	Gölge	Dog	7
\.


--
-- TOC entry 3653 (class 0 OID 18336)
-- Dependencies: 218
-- Data for Name: appointment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appointment (id, appointment_date, doctor_id, animal_id) FROM stdin;
2	2023-12-08 10:00:00	1	1
1	2023-12-08 09:00:00	1	1
4	2023-12-13 14:00:00	7	16
5	2023-12-12 17:00:00	6	24
6	2023-12-16 17:00:00	3	22
\.


--
-- TOC entry 3655 (class 0 OID 18343)
-- Dependencies: 220
-- Data for Name: available_date; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.available_date (id, doctor_id, available_date) FROM stdin;
1	1	2023-12-08
2	2	2023-12-11
4	6	2023-12-12
5	7	2023-12-13
6	2	2023-12-14
7	1	2023-12-15
8	3	2023-12-16
\.


--
-- TOC entry 3657 (class 0 OID 18350)
-- Dependencies: 222
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customer (id, address, city, mail, name, phone) FROM stdin;
3	Koşuyolu / Kadıköy	İstanbul	dilos@tandir.com	Dilan Tanal	5544902767
2	Koşuyolu / Kadıköy	İstanbul	cansu@keles.com	Cansu Keles	5543902543
6	Koşuyolu / Kadıköy	Istanbul	fatihdırag@gmail.com	Fatih Dırağ	5345639856
7	Etiler / Beşiktaş	Istanbul	alicaglar@gmail.com	Ali Çağlar	5438959584
1	Koşuyolu / Kadıköy	Istanbul	oncel@keles.com	Öncel Keleş	5369876543
\.


--
-- TOC entry 3664 (class 0 OID 18426)
-- Dependencies: 229
-- Data for Name: deneme; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.deneme ("arrayColumn") FROM stdin;
\.


--
-- TOC entry 3659 (class 0 OID 18359)
-- Dependencies: 224
-- Data for Name: doctor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctor (id, address, city, mail, name, phone) FROM stdin;
2	Fıstıkağacı / Üsküdar	İstanbul	kemal@vetart.com	Kemal Özkan	0216 345 56 35
3	Fıstıkağacı / Üsküdar	İstanbul	alper@vetart.com	Alper Tavşan	0216 345 56 35
1	Fıstıkağacı / Üsküdar	İstanbul	ceren@vetart.com	Ceren Artıran	0216 345 56 35
6	Fıstıkağacı / Üsküdar	İstanbul	deniz@vetart.com	Koray Musluer	0216 345 56 35
7	Fıstıkağacı / Üsküdar	İstanbul	deniz@vetart.com	Rukiye Kurt	0216 345 56 35
\.


--
-- TOC entry 3663 (class 0 OID 18406)
-- Dependencies: 228
-- Data for Name: report; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.report (id, diagnosis, price, title, appointment_id) FROM stdin;
5	brucellosis	2000	Brucellosis Report	4
13	brucellosis	2000	Brucellosis Report 2	6
14	Combination	500	Combination Report 	1
1	Rabies	500	Rabies Report	5
2	Covid	750	Covid Report	2
\.


--
-- TOC entry 3661 (class 0 OID 18368)
-- Dependencies: 226
-- Data for Name: vaccine; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vaccine (id, code, name, protection_finish_date, protection_start_date, animal_id, report_id) FROM stdin;
1	80B55V08	Rabies Vaccine	2023-12-15	2023-06-15	24	1
28	30B55V07	Combination Vaccine	2024-07-12	2024-01-12	1	14
29	80B55V12	Rabies Vaccine	2024-03-15	2023-03-15	16	1
30	80B55V14	Rabies Vaccine	2024-05-25	2023-05-25	22	1
31	30B55V14	Combination Vaccine	2023-06-25	2023-01-25	23	14
\.


--
-- TOC entry 3677 (class 0 OID 0)
-- Dependencies: 215
-- Name: animal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.animal_id_seq', 24, true);


--
-- TOC entry 3678 (class 0 OID 0)
-- Dependencies: 217
-- Name: appointment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appointment_id_seq', 6, true);


--
-- TOC entry 3679 (class 0 OID 0)
-- Dependencies: 219
-- Name: available_date_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.available_date_id_seq', 8, true);


--
-- TOC entry 3680 (class 0 OID 0)
-- Dependencies: 221
-- Name: customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customer_id_seq', 7, true);


--
-- TOC entry 3681 (class 0 OID 0)
-- Dependencies: 223
-- Name: doctor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.doctor_id_seq', 7, true);


--
-- TOC entry 3682 (class 0 OID 0)
-- Dependencies: 227
-- Name: report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.report_id_seq', 14, true);


--
-- TOC entry 3683 (class 0 OID 0)
-- Dependencies: 225
-- Name: vaccine_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vaccine_id_seq', 31, true);


-- Completed on 2024-03-07 21:51:14 +03

--
-- PostgreSQL database dump complete
--

