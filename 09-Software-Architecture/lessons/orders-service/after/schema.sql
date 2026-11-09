create schema catalog;
create table catalog.products (sku text primary key, name text not null, price_minor int not null, currency text not null, stock int not null check (stock >= 0));
insert into catalog.products values ('SKU-MUG', 'Mug', 25000, 'EGP', 10), ('SKU-LAMP', 'Lamp', 120000, 'EGP', 1);

create schema orders;
create table orders.orders (
  id uuid primary key,
  customer_email text not null,
  status text not null,
  currency text not null,
  subtotal_minor int not null,
  tax_minor int not null,
  shipping_minor int not null,
  total_minor int not null,
  version int not null,
  placed_at timestamptz not null
);
create table orders.order_lines (
  order_id uuid not null references orders.orders(id),
  sku text not null,
  qty int not null check (qty > 0),
  unit_price_minor int not null,
  primary key (order_id, sku)
);
create table orders.outbox (
  id bigint generated always as identity primary key,
  type text not null,
  payload jsonb not null,
  occurred_at timestamptz not null,
  published_at timestamptz
);
