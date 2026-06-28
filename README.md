# Terra Araras

Plataforma de meditaciones y limpiezas energéticas guiadas en video y audio, con
suscripción mensual. Antes de entrar a la biblioteca, un agente de IA conversa
brevemente con cada persona para entender qué la trae.

Stack: Next.js (App Router) + Supabase (Auth/DB/Storage) + Vimeo (video privado) +
Claude (agente de intake) + Stripe y Mercado Pago (suscripciones). Pensado para
desplegar en Vercel.

## Puesta en marcha

### 1. Supabase

1. Creá un proyecto en [supabase.com](https://supabase.com).
2. En **SQL Editor**, ejecutá el contenido de `supabase/migrations/0001_init.sql`.
   Esto crea las tablas (`profiles`, `content_items`, `intake_sessions`,
   `subscriptions`), las políticas de RLS y el bucket privado `audio`.
3. En **Project Settings → API**, copiá `Project URL`, `anon public key` y
   `service_role key`.
4. Para convertir tu propio usuario en admin: registrate normalmente desde
   `/signup` y después, en el SQL Editor, corré:
   ```sql
   update public.profiles set role = 'admin' where email = 'tu-email@ejemplo.com';
   ```

### 2. Variables de entorno

Copiá `.env.example` a `.env.local` y completá:

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY` → de Supabase.
- `ANTHROPIC_API_KEY` → para el agente de intake conversacional.
- `VIMEO_ACCESS_TOKEN` → de tu cuenta Vimeo Pro/Business.
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`,
  `NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY` → de tu cuenta Stripe.
- `MERCADOPAGO_ACCESS_TOKEN`, `MERCADOPAGO_WEBHOOK_SECRET`,
  `MERCADOPAGO_MONTHLY_AMOUNT` → de tu cuenta Mercado Pago.

### 3. Videos (Vimeo)

1. Subí cada video a Vimeo y, en su configuración de privacidad, restringí la
   reproducción solo a tu dominio (evita que se incruste en otros sitios) y
   desactivá la descarga.
2. En el panel de admin (`/admin/content/new`) creá el contenido tipo "Video"
   pegando el **ID numérico** del video de Vimeo.

Importante: no existe protección 100% infalible contra grabación de pantalla.
Esta configuración evita la descarga y el reuso del link fuera del dominio, que
es lo que cubre la gran mayoría de los casos.

### 4. Audios

Se suben directo desde `/admin/content/new` (tipo "Audio"): el archivo va a un
bucket privado de Supabase Storage y se reproduce con una URL firmada que vence
en 60 segundos, generada en cada reproducción.

### 5. Pagos

- **Stripe**: creá un producto con precio recurrente mensual y poné su ID en
  `NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY`. Configurá un webhook hacia
  `/api/webhooks/stripe` escuchando `checkout.session.completed`,
  `customer.subscription.updated` y `customer.subscription.deleted`.
- **Mercado Pago**: configurá una notificación webhook hacia
  `/api/webhooks/mercadopago` para eventos de tipo `subscription_preapproval`.

### 6. Deploy en Vercel

1. En [vercel.com](https://vercel.com), importá este repositorio de GitHub.
2. Agregá las mismas variables de entorno del paso 2 (con los valores reales).
3. Deploy. Cada push a `main` se publica automáticamente.

## Desarrollo local

```bash
npm install
npm run dev
```

## Roles

- **user**: se registra, paga la suscripción y accede a la biblioteca según su
  estado de pago.
- **admin**: además accede a `/admin` para subir/editar/publicar contenido y
  ver el listado de suscriptores. Se asigna manualmente en la base (ver paso 1).
