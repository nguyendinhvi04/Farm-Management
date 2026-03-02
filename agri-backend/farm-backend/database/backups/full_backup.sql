--
-- PostgreSQL database dump
--

\restrict cNLP7GeCoxi2oX9W7AI7moQ0cMUAAyBh8Xviv9do9OahYlzlb2rxA9cph3BcACb

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
-- Name: update_timestamp(); Type: FUNCTION; Schema: public; Owner: nguyendv
--

CREATE FUNCTION public.update_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_timestamp() OWNER TO nguyendv;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: animal_types; Type: TABLE; Schema: public; Owner: nguyendv
--

CREATE TABLE public.animal_types (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    average_lifespan integer,
    description text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.animal_types OWNER TO nguyendv;

--
-- Name: animal_types_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyendv
--

CREATE SEQUENCE public.animal_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.animal_types_id_seq OWNER TO nguyendv;

--
-- Name: animal_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyendv
--

ALTER SEQUENCE public.animal_types_id_seq OWNED BY public.animal_types.id;


--
-- Name: animals; Type: TABLE; Schema: public; Owner: nguyendv
--

CREATE TABLE public.animals (
    id integer NOT NULL,
    farm_id integer NOT NULL,
    animal_type_id integer,
    type character varying(50),
    quantity integer,
    health_status character varying(50),
    vaccine_date date,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT animals_quantity_check CHECK ((quantity >= 0))
);


ALTER TABLE public.animals OWNER TO nguyendv;

--
-- Name: animals_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyendv
--

CREATE SEQUENCE public.animals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.animals_id_seq OWNER TO nguyendv;

--
-- Name: animals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyendv
--

ALTER SEQUENCE public.animals_id_seq OWNED BY public.animals.id;


--
-- Name: assignments; Type: TABLE; Schema: public; Owner: nguyendv
--

CREATE TABLE public.assignments (
    id integer NOT NULL,
    user_id integer NOT NULL,
    entity_id integer NOT NULL,
    entity_type text NOT NULL,
    description text,
    start_date date,
    end_date date,
    status text DEFAULT 'assigned'::text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT assignments_entity_type_check CHECK ((entity_type = ANY (ARRAY['plot'::text, 'crop'::text, 'animal'::text]))),
    CONSTRAINT assignments_status_check CHECK ((status = ANY (ARRAY['assigned'::text, 'completed'::text])))
);


ALTER TABLE public.assignments OWNER TO nguyendv;

--
-- Name: assignments_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyendv
--

CREATE SEQUENCE public.assignments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.assignments_id_seq OWNER TO nguyendv;

--
-- Name: assignments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyendv
--

ALTER SEQUENCE public.assignments_id_seq OWNED BY public.assignments.id;


--
-- Name: breeding_logs; Type: TABLE; Schema: public; Owner: nguyendv
--

CREATE TABLE public.breeding_logs (
    id integer NOT NULL,
    animal_id integer NOT NULL,
    breeding_date date,
    offspring_quantity integer,
    description text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.breeding_logs OWNER TO nguyendv;

--
-- Name: breeding_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyendv
--

CREATE SEQUENCE public.breeding_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.breeding_logs_id_seq OWNER TO nguyendv;

--
-- Name: breeding_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyendv
--

ALTER SEQUENCE public.breeding_logs_id_seq OWNED BY public.breeding_logs.id;


--
-- Name: care_logs; Type: TABLE; Schema: public; Owner: nguyendv
--

CREATE TABLE public.care_logs (
    id integer NOT NULL,
    entity_id integer NOT NULL,
    entity_type text NOT NULL,
    action character varying(100),
    description text,
    date date NOT NULL,
    user_id integer,
    fertilizer_id integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT care_logs_entity_type_check CHECK ((entity_type = ANY (ARRAY['crop'::text, 'animal'::text])))
);


ALTER TABLE public.care_logs OWNER TO nguyendv;

--
-- Name: care_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyendv
--

CREATE SEQUENCE public.care_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.care_logs_id_seq OWNER TO nguyendv;

--
-- Name: care_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyendv
--

ALTER SEQUENCE public.care_logs_id_seq OWNED BY public.care_logs.id;


--
-- Name: crop_types; Type: TABLE; Schema: public; Owner: nguyendv
--

CREATE TABLE public.crop_types (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    growth_duration integer,
    description text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.crop_types OWNER TO nguyendv;

--
-- Name: crop_types_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyendv
--

CREATE SEQUENCE public.crop_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.crop_types_id_seq OWNER TO nguyendv;

--
-- Name: crop_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyendv
--

ALTER SEQUENCE public.crop_types_id_seq OWNED BY public.crop_types.id;


--
-- Name: crops; Type: TABLE; Schema: public; Owner: nguyendv
--

CREATE TABLE public.crops (
    id integer NOT NULL,
    plot_id integer NOT NULL,
    crop_type_id integer,
    season_id integer,
    name character varying(100),
    plant_date date,
    harvest_date date,
    quantity numeric(10,2),
    status text DEFAULT 'growing'::text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT crops_quantity_check CHECK ((quantity >= (0)::numeric)),
    CONSTRAINT crops_status_check CHECK ((status = ANY (ARRAY['growing'::text, 'harvested'::text, 'failed'::text])))
);


ALTER TABLE public.crops OWNER TO nguyendv;

--
-- Name: crops_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyendv
--

CREATE SEQUENCE public.crops_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.crops_id_seq OWNER TO nguyendv;

--
-- Name: crops_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyendv
--

ALTER SEQUENCE public.crops_id_seq OWNED BY public.crops.id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: nguyendv
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    farm_id integer NOT NULL,
    name character varying(100) NOT NULL,
    contact character varying(255),
    address text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.customers OWNER TO nguyendv;

--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyendv
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customers_id_seq OWNER TO nguyendv;

--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyendv
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: environmental_data; Type: TABLE; Schema: public; Owner: nguyendv
--

CREATE TABLE public.environmental_data (
    id integer NOT NULL,
    plot_id integer NOT NULL,
    date date NOT NULL,
    temperature numeric(5,2),
    rainfall numeric(5,2),
    humidity numeric(5,2),
    other_notes text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.environmental_data OWNER TO nguyendv;

--
-- Name: environmental_data_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyendv
--

CREATE SEQUENCE public.environmental_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.environmental_data_id_seq OWNER TO nguyendv;

--
-- Name: environmental_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyendv
--

ALTER SEQUENCE public.environmental_data_id_seq OWNED BY public.environmental_data.id;


--
-- Name: farms; Type: TABLE; Schema: public; Owner: nguyendv
--

CREATE TABLE public.farms (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    location character varying(255),
    size numeric(10,2),
    owner_id integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.farms OWNER TO nguyendv;

--
-- Name: farms_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyendv
--

CREATE SEQUENCE public.farms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.farms_id_seq OWNER TO nguyendv;

--
-- Name: farms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyendv
--

ALTER SEQUENCE public.farms_id_seq OWNED BY public.farms.id;


--
-- Name: fertilizers; Type: TABLE; Schema: public; Owner: nguyendv
--

CREATE TABLE public.fertilizers (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    composition text,
    supplier_id integer,
    description text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.fertilizers OWNER TO nguyendv;

--
-- Name: fertilizers_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyendv
--

CREATE SEQUENCE public.fertilizers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fertilizers_id_seq OWNER TO nguyendv;

--
-- Name: fertilizers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyendv
--

ALTER SEQUENCE public.fertilizers_id_seq OWNED BY public.fertilizers.id;


--
-- Name: inventory; Type: TABLE; Schema: public; Owner: nguyendv
--

CREATE TABLE public.inventory (
    id integer NOT NULL,
    farm_id integer NOT NULL,
    supplier_id integer,
    item_name character varying(100),
    quantity numeric(10,2),
    unit character varying(20),
    price numeric(10,2),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.inventory OWNER TO nguyendv;

--
-- Name: inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyendv
--

CREATE SEQUENCE public.inventory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inventory_id_seq OWNER TO nguyendv;

--
-- Name: inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyendv
--

ALTER SEQUENCE public.inventory_id_seq OWNED BY public.inventory.id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: nguyendv
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    farm_id integer NOT NULL,
    order_id integer,
    type text NOT NULL,
    amount numeric(10,2) NOT NULL,
    description text,
    transaction_date date,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT transactions_type_check CHECK ((type = ANY (ARRAY['income'::text, 'expense'::text])))
);


ALTER TABLE public.transactions OWNER TO nguyendv;

--
-- Name: monthly_profit; Type: VIEW; Schema: public; Owner: nguyendv
--

CREATE VIEW public.monthly_profit AS
 SELECT farm_id,
    EXTRACT(year FROM transaction_date) AS year,
    EXTRACT(month FROM transaction_date) AS month,
    (sum(
        CASE
            WHEN (type = 'income'::text) THEN amount
            ELSE (0)::numeric
        END) - sum(
        CASE
            WHEN (type = 'expense'::text) THEN amount
            ELSE (0)::numeric
        END)) AS profit
   FROM public.transactions
  GROUP BY farm_id, (EXTRACT(year FROM transaction_date)), (EXTRACT(month FROM transaction_date));


ALTER VIEW public.monthly_profit OWNER TO nguyendv;

--
-- Name: order_items; Type: TABLE; Schema: public; Owner: nguyendv
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer NOT NULL,
    entity_id integer NOT NULL,
    entity_type text NOT NULL,
    quantity numeric(10,2) NOT NULL,
    price numeric(10,2) NOT NULL,
    subtotal numeric(10,2) GENERATED ALWAYS AS ((quantity * price)) STORED,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT order_items_entity_type_check CHECK ((entity_type = ANY (ARRAY['crop'::text, 'animal'::text])))
);


ALTER TABLE public.order_items OWNER TO nguyendv;

--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyendv
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_id_seq OWNER TO nguyendv;

--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyendv
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: nguyendv
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    farm_id integer NOT NULL,
    customer_id integer,
    order_date date NOT NULL,
    total_amount numeric(10,2),
    status text DEFAULT 'pending'::text,
    description text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT orders_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'shipped'::text, 'delivered'::text, 'cancelled'::text])))
);


ALTER TABLE public.orders OWNER TO nguyendv;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyendv
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO nguyendv;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyendv
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: plots; Type: TABLE; Schema: public; Owner: nguyendv
--

CREATE TABLE public.plots (
    id integer NOT NULL,
    farm_id integer NOT NULL,
    name character varying(50),
    area numeric(10,2),
    soil_type character varying(50),
    status text DEFAULT 'active'::text,
    image_url character varying(255),
    latitude numeric(10,8),
    longitude numeric(11,8),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT plots_status_check CHECK ((status = ANY (ARRAY['active'::text, 'inactive'::text])))
);


ALTER TABLE public.plots OWNER TO nguyendv;

--
-- Name: plots_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyendv
--

CREATE SEQUENCE public.plots_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.plots_id_seq OWNER TO nguyendv;

--
-- Name: plots_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyendv
--

ALTER SEQUENCE public.plots_id_seq OWNED BY public.plots.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: nguyendv
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.roles OWNER TO nguyendv;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyendv
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO nguyendv;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyendv
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: seasons; Type: TABLE; Schema: public; Owner: nguyendv
--

CREATE TABLE public.seasons (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    start_month integer,
    end_month integer,
    description text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.seasons OWNER TO nguyendv;

--
-- Name: seasons_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyendv
--

CREATE SEQUENCE public.seasons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.seasons_id_seq OWNER TO nguyendv;

--
-- Name: seasons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyendv
--

ALTER SEQUENCE public.seasons_id_seq OWNED BY public.seasons.id;


--
-- Name: suppliers; Type: TABLE; Schema: public; Owner: nguyendv
--

CREATE TABLE public.suppliers (
    id integer NOT NULL,
    farm_id integer NOT NULL,
    name character varying(100) NOT NULL,
    contact character varying(255),
    address text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.suppliers OWNER TO nguyendv;

--
-- Name: suppliers_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyendv
--

CREATE SEQUENCE public.suppliers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.suppliers_id_seq OWNER TO nguyendv;

--
-- Name: suppliers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyendv
--

ALTER SEQUENCE public.suppliers_id_seq OWNED BY public.suppliers.id;


--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyendv
--

CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transactions_id_seq OWNER TO nguyendv;

--
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyendv
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- Name: user_farms; Type: TABLE; Schema: public; Owner: nguyendv
--

CREATE TABLE public.user_farms (
    user_id integer NOT NULL,
    farm_id integer NOT NULL
);


ALTER TABLE public.user_farms OWNER TO nguyendv;

--
-- Name: users; Type: TABLE; Schema: public; Owner: nguyendv
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password_hash character varying(255) NOT NULL,
    role_id integer,
    email character varying(100),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO nguyendv;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyendv
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO nguyendv;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyendv
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: animal_types id; Type: DEFAULT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.animal_types ALTER COLUMN id SET DEFAULT nextval('public.animal_types_id_seq'::regclass);


--
-- Name: animals id; Type: DEFAULT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.animals ALTER COLUMN id SET DEFAULT nextval('public.animals_id_seq'::regclass);


--
-- Name: assignments id; Type: DEFAULT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.assignments ALTER COLUMN id SET DEFAULT nextval('public.assignments_id_seq'::regclass);


--
-- Name: breeding_logs id; Type: DEFAULT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.breeding_logs ALTER COLUMN id SET DEFAULT nextval('public.breeding_logs_id_seq'::regclass);


--
-- Name: care_logs id; Type: DEFAULT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.care_logs ALTER COLUMN id SET DEFAULT nextval('public.care_logs_id_seq'::regclass);


--
-- Name: crop_types id; Type: DEFAULT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.crop_types ALTER COLUMN id SET DEFAULT nextval('public.crop_types_id_seq'::regclass);


--
-- Name: crops id; Type: DEFAULT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.crops ALTER COLUMN id SET DEFAULT nextval('public.crops_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: environmental_data id; Type: DEFAULT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.environmental_data ALTER COLUMN id SET DEFAULT nextval('public.environmental_data_id_seq'::regclass);


--
-- Name: farms id; Type: DEFAULT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.farms ALTER COLUMN id SET DEFAULT nextval('public.farms_id_seq'::regclass);


--
-- Name: fertilizers id; Type: DEFAULT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.fertilizers ALTER COLUMN id SET DEFAULT nextval('public.fertilizers_id_seq'::regclass);


--
-- Name: inventory id; Type: DEFAULT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.inventory ALTER COLUMN id SET DEFAULT nextval('public.inventory_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: plots id; Type: DEFAULT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.plots ALTER COLUMN id SET DEFAULT nextval('public.plots_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: seasons id; Type: DEFAULT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.seasons ALTER COLUMN id SET DEFAULT nextval('public.seasons_id_seq'::regclass);


--
-- Name: suppliers id; Type: DEFAULT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.suppliers ALTER COLUMN id SET DEFAULT nextval('public.suppliers_id_seq'::regclass);


--
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


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
-- Data for Name: farms; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.farms (id, name, location, size, owner_id, created_at, updated_at) FROM stdin;
1	My Farm	Vietnam	100.00	1	2025-10-15 09:59:42.436818	2025-10-15 09:59:42.436818
2	Farm A	Vietnam North	50.00	1	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
3	Farm B	Vietnam South	100.00	2	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
4	My Farm	Vietnam	100.00	1	2025-10-15 10:52:23.88166	2025-10-15 10:52:23.88166
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
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.inventory (id, farm_id, supplier_id, item_name, quantity, unit, price, created_at, updated_at) FROM stdin;
1	1	1	Seeds	100.00	kg	50.00	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
2	2	2	Feed	500.00	kg	20.00	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.order_items (id, order_id, entity_id, entity_type, quantity, price, created_at, updated_at) FROM stdin;
1	1	1	crop	100.00	10.00	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
2	2	1	animal	10.00	200.00	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.orders (id, farm_id, customer_id, order_date, total_amount, status, description, created_at, updated_at) FROM stdin;
1	1	1	2025-10-01	1000.00	pending	Order for rice	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
2	2	2	2025-10-05	2000.00	shipped	Order for milk	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
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
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.roles (id, name) FROM stdin;
1	admin
2	farmer
3	employee
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
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.suppliers (id, farm_id, name, contact, address, created_at, updated_at) FROM stdin;
1	1	Supplier A	0123456789	\N	2025-10-15 09:59:42.436818	2025-10-15 09:59:42.436818
2	1	Supplier X	0123456789	Address X, Vietnam	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
3	2	Supplier Y	0987654321	Address Y, Vietnam	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
4	1	Supplier A	0123456789	\N	2025-10-15 10:52:23.882543	2025-10-15 10:52:23.882543
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
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: nguyendv
--

COPY public.users (id, username, password_hash, role_id, email, created_at, updated_at) FROM stdin;
3	farmer_user	hashed_farmer_pass	2	farmer@farm.com	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
4	employee_user	hashed_employee_pass	3	employee@farm.com	2025-10-15 10:09:02.283497	2025-10-15 10:09:02.283497
1	admin	bDBtNaeQDvARkpJhJtYt9eWkwQlwM6hd237EpdDStwKiLCt4SHsCa	1	admin@farm.com	2025-10-15 09:59:42.436818	2025-10-15 11:03:11.064239
2	admin_user	bDBtNaeQDvARkpJhJtYt9eWkwQlwM6hd237EpdDStwKiLCt4SHsCa	1	admin@farm.com	2025-10-15 10:09:02.283497	2025-10-15 11:03:11.064239
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
-- Name: animal_types animal_types_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.animal_types
    ADD CONSTRAINT animal_types_pkey PRIMARY KEY (id);


--
-- Name: animals animals_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.animals
    ADD CONSTRAINT animals_pkey PRIMARY KEY (id);


--
-- Name: assignments assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.assignments
    ADD CONSTRAINT assignments_pkey PRIMARY KEY (id);


--
-- Name: breeding_logs breeding_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.breeding_logs
    ADD CONSTRAINT breeding_logs_pkey PRIMARY KEY (id);


--
-- Name: care_logs care_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.care_logs
    ADD CONSTRAINT care_logs_pkey PRIMARY KEY (id);


--
-- Name: crop_types crop_types_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.crop_types
    ADD CONSTRAINT crop_types_pkey PRIMARY KEY (id);


--
-- Name: crops crops_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.crops
    ADD CONSTRAINT crops_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: environmental_data environmental_data_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.environmental_data
    ADD CONSTRAINT environmental_data_pkey PRIMARY KEY (id);


--
-- Name: farms farms_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.farms
    ADD CONSTRAINT farms_pkey PRIMARY KEY (id);


--
-- Name: fertilizers fertilizers_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.fertilizers
    ADD CONSTRAINT fertilizers_pkey PRIMARY KEY (id);


--
-- Name: inventory inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: plots plots_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.plots
    ADD CONSTRAINT plots_pkey PRIMARY KEY (id);


--
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: seasons seasons_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.seasons
    ADD CONSTRAINT seasons_pkey PRIMARY KEY (id);


--
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: user_farms user_farms_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.user_farms
    ADD CONSTRAINT user_farms_pkey PRIMARY KEY (user_id, farm_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: idx_animals_farm_id; Type: INDEX; Schema: public; Owner: nguyendv
--

CREATE INDEX idx_animals_farm_id ON public.animals USING btree (farm_id);


--
-- Name: idx_care_logs_entity; Type: INDEX; Schema: public; Owner: nguyendv
--

CREATE INDEX idx_care_logs_entity ON public.care_logs USING btree (entity_id, entity_type);


--
-- Name: idx_crops_plot_id; Type: INDEX; Schema: public; Owner: nguyendv
--

CREATE INDEX idx_crops_plot_id ON public.crops USING btree (plot_id);


--
-- Name: idx_environmental_data_plot_date; Type: INDEX; Schema: public; Owner: nguyendv
--

CREATE INDEX idx_environmental_data_plot_date ON public.environmental_data USING btree (plot_id, date);


--
-- Name: idx_plots_farm_id; Type: INDEX; Schema: public; Owner: nguyendv
--

CREATE INDEX idx_plots_farm_id ON public.plots USING btree (farm_id);


--
-- Name: idx_transactions_farm_id; Type: INDEX; Schema: public; Owner: nguyendv
--

CREATE INDEX idx_transactions_farm_id ON public.transactions USING btree (farm_id);


--
-- Name: animal_types update_animal_types_timestamp; Type: TRIGGER; Schema: public; Owner: nguyendv
--

CREATE TRIGGER update_animal_types_timestamp BEFORE UPDATE ON public.animal_types FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: animals update_animals_timestamp; Type: TRIGGER; Schema: public; Owner: nguyendv
--

CREATE TRIGGER update_animals_timestamp BEFORE UPDATE ON public.animals FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: assignments update_assignments_timestamp; Type: TRIGGER; Schema: public; Owner: nguyendv
--

CREATE TRIGGER update_assignments_timestamp BEFORE UPDATE ON public.assignments FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: breeding_logs update_breeding_logs_timestamp; Type: TRIGGER; Schema: public; Owner: nguyendv
--

CREATE TRIGGER update_breeding_logs_timestamp BEFORE UPDATE ON public.breeding_logs FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: care_logs update_care_logs_timestamp; Type: TRIGGER; Schema: public; Owner: nguyendv
--

CREATE TRIGGER update_care_logs_timestamp BEFORE UPDATE ON public.care_logs FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: crop_types update_crop_types_timestamp; Type: TRIGGER; Schema: public; Owner: nguyendv
--

CREATE TRIGGER update_crop_types_timestamp BEFORE UPDATE ON public.crop_types FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: crops update_crops_timestamp; Type: TRIGGER; Schema: public; Owner: nguyendv
--

CREATE TRIGGER update_crops_timestamp BEFORE UPDATE ON public.crops FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: customers update_customers_timestamp; Type: TRIGGER; Schema: public; Owner: nguyendv
--

CREATE TRIGGER update_customers_timestamp BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: environmental_data update_environmental_data_timestamp; Type: TRIGGER; Schema: public; Owner: nguyendv
--

CREATE TRIGGER update_environmental_data_timestamp BEFORE UPDATE ON public.environmental_data FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: farms update_farms_timestamp; Type: TRIGGER; Schema: public; Owner: nguyendv
--

CREATE TRIGGER update_farms_timestamp BEFORE UPDATE ON public.farms FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: fertilizers update_fertilizers_timestamp; Type: TRIGGER; Schema: public; Owner: nguyendv
--

CREATE TRIGGER update_fertilizers_timestamp BEFORE UPDATE ON public.fertilizers FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: inventory update_inventory_timestamp; Type: TRIGGER; Schema: public; Owner: nguyendv
--

CREATE TRIGGER update_inventory_timestamp BEFORE UPDATE ON public.inventory FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: order_items update_order_items_timestamp; Type: TRIGGER; Schema: public; Owner: nguyendv
--

CREATE TRIGGER update_order_items_timestamp BEFORE UPDATE ON public.order_items FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: orders update_orders_timestamp; Type: TRIGGER; Schema: public; Owner: nguyendv
--

CREATE TRIGGER update_orders_timestamp BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: plots update_plots_timestamp; Type: TRIGGER; Schema: public; Owner: nguyendv
--

CREATE TRIGGER update_plots_timestamp BEFORE UPDATE ON public.plots FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: seasons update_seasons_timestamp; Type: TRIGGER; Schema: public; Owner: nguyendv
--

CREATE TRIGGER update_seasons_timestamp BEFORE UPDATE ON public.seasons FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: suppliers update_suppliers_timestamp; Type: TRIGGER; Schema: public; Owner: nguyendv
--

CREATE TRIGGER update_suppliers_timestamp BEFORE UPDATE ON public.suppliers FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: transactions update_transactions_timestamp; Type: TRIGGER; Schema: public; Owner: nguyendv
--

CREATE TRIGGER update_transactions_timestamp BEFORE UPDATE ON public.transactions FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: users update_users_timestamp; Type: TRIGGER; Schema: public; Owner: nguyendv
--

CREATE TRIGGER update_users_timestamp BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: animals animals_animal_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.animals
    ADD CONSTRAINT animals_animal_type_id_fkey FOREIGN KEY (animal_type_id) REFERENCES public.animal_types(id) ON DELETE SET NULL;


--
-- Name: animals animals_farm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.animals
    ADD CONSTRAINT animals_farm_id_fkey FOREIGN KEY (farm_id) REFERENCES public.farms(id) ON DELETE CASCADE;


--
-- Name: assignments assignments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.assignments
    ADD CONSTRAINT assignments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: breeding_logs breeding_logs_animal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.breeding_logs
    ADD CONSTRAINT breeding_logs_animal_id_fkey FOREIGN KEY (animal_id) REFERENCES public.animals(id) ON DELETE CASCADE;


--
-- Name: care_logs care_logs_fertilizer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.care_logs
    ADD CONSTRAINT care_logs_fertilizer_id_fkey FOREIGN KEY (fertilizer_id) REFERENCES public.fertilizers(id) ON DELETE SET NULL;


--
-- Name: care_logs care_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.care_logs
    ADD CONSTRAINT care_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: crops crops_crop_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.crops
    ADD CONSTRAINT crops_crop_type_id_fkey FOREIGN KEY (crop_type_id) REFERENCES public.crop_types(id) ON DELETE SET NULL;


--
-- Name: crops crops_plot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.crops
    ADD CONSTRAINT crops_plot_id_fkey FOREIGN KEY (plot_id) REFERENCES public.plots(id) ON DELETE CASCADE;


--
-- Name: crops crops_season_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.crops
    ADD CONSTRAINT crops_season_id_fkey FOREIGN KEY (season_id) REFERENCES public.seasons(id) ON DELETE SET NULL;


--
-- Name: customers customers_farm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_farm_id_fkey FOREIGN KEY (farm_id) REFERENCES public.farms(id) ON DELETE CASCADE;


--
-- Name: environmental_data environmental_data_plot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.environmental_data
    ADD CONSTRAINT environmental_data_plot_id_fkey FOREIGN KEY (plot_id) REFERENCES public.plots(id) ON DELETE CASCADE;


--
-- Name: farms farms_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.farms
    ADD CONSTRAINT farms_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: fertilizers fertilizers_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.fertilizers
    ADD CONSTRAINT fertilizers_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.suppliers(id) ON DELETE SET NULL;


--
-- Name: inventory inventory_farm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_farm_id_fkey FOREIGN KEY (farm_id) REFERENCES public.farms(id) ON DELETE CASCADE;


--
-- Name: inventory inventory_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.suppliers(id) ON DELETE SET NULL;


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: orders orders_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- Name: orders orders_farm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_farm_id_fkey FOREIGN KEY (farm_id) REFERENCES public.farms(id) ON DELETE CASCADE;


--
-- Name: plots plots_farm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.plots
    ADD CONSTRAINT plots_farm_id_fkey FOREIGN KEY (farm_id) REFERENCES public.farms(id) ON DELETE CASCADE;


--
-- Name: suppliers suppliers_farm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_farm_id_fkey FOREIGN KEY (farm_id) REFERENCES public.farms(id) ON DELETE CASCADE;


--
-- Name: transactions transactions_farm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_farm_id_fkey FOREIGN KEY (farm_id) REFERENCES public.farms(id) ON DELETE CASCADE;


--
-- Name: transactions transactions_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE SET NULL;


--
-- Name: user_farms user_farms_farm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.user_farms
    ADD CONSTRAINT user_farms_farm_id_fkey FOREIGN KEY (farm_id) REFERENCES public.farms(id) ON DELETE CASCADE;


--
-- Name: user_farms user_farms_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.user_farms
    ADD CONSTRAINT user_farms_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyendv
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict cNLP7GeCoxi2oX9W7AI7moQ0cMUAAyBh8Xviv9do9OahYlzlb2rxA9cph3BcACb

