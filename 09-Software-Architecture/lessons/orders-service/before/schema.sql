create table products (sku text primary key, name text not null, price_cents int not null, stock int not null);
create table orders (
  id bigserial primary key,
  user_email text not null,
  status text not null,
  subtotal_cents int not null,
  tax_cents int not null,
  shipping_cents int not null,
  total_cents int not null,
  created_at timestamptz not null default now()
);
create table order_lines (
  order_id bigint not null references orders(id),
  sku text not null,
  qty int not null,
  unit_price_cents int not null
);
insert into products values ('SKU-MUG', 'Mug', 25000, 10), ('SKU-LAMP', 'Lamp', 120000, 1);
