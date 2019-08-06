UPDATE invoices
SET invoiceto = invoiceto::jsonb - 'email' || '{"email":"pathakdarpan2010@gmail.com"}'::jsonb
WHERE id='efab8d7c-2942-4883-8831-5ae5840c87c0'