INSERT INTO invoices (id, orgId, firmId, invoiceNumber, invoiceFrom, invoiceTo, invoiceURL, invoiceDate, dueDate, amount, currency,
GST, GSTAmount, additionalAmount, deduction, finalAmount,reminderType, isPaid, lastReminderOn, nextReminderOn, isReminderEnabled, paymentType, paymentMadeOn, created_on)

VALUES

(
    'efab8d7c-2942-4883-8831-5ae5840c87c0',
    'c5d0e532-64ad-4c29-bb9a-2a3bbaffbe0d',
    'd034c728-702d-4fbd-8ff8-4528b68122da',
    'ABC_1496734',
    '{
        "name": "ABC Retail Pvt Ltd",
        "address": "AMC SEZ, block 4, tower 3, naraynpura, Bengalore - 560030",
        "email": "sales@abcretail.com",
        "phone": "9945873693"
    }',
    '{
        "name": "XYZ india Pvt Ltd",
        "address": "EMC Square, glof link, domlur layout, bengalore - 560038",
        "email": "pathakdarpan77@gmail.com",
        "phone": "9945873693"
    }',
    'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf',
    now(), 
    now(),
    43874.00,
    'INR',
    12,
    5264.88,
    0,
    0,
    49138.88,
    'EMAIL',
    false,
    null,
    now(),
    true,
    'ONLINE',
    null,
    now()
)