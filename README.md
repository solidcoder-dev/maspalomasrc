# My club

Simple frontend to handle club information.

## EmailJS setup (SEPA notification)

Configure EmailJS to send the SEPA notice from the frontend.

1) Create an EmailJS template with params: `title`, `to_email`, `message`.
   - Use `{{{message}}}` in the template body so HTML renders correctly.
2) Create an EmailJS service.
   - Example: Gmail SMTP.
   - In Gmail: enable 2FA, disable "skip password when possible".
   - Create an app password at https://myaccount.google.com/apppasswords.
   - Use your Gmail address and the generated app password as SMTP credentials.
3) Get your EmailJS public key from the EmailJS account settings.

Create a `.env` file with:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Notes:
- This setup is free with EmailJS limits (check their plan for quotas).
