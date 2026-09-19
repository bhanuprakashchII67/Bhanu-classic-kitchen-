# Bhanu Classic Kitchen — Cloud Kitchen Profit Dashboard

This project is the financial/analytics layer for a cloud kitchen whose order sources are **Zomato and Swiggy**.

## Product flow

Zomato POS + Swiggy POS -> integration backend -> unified orders/settlements -> expenses -> net profit dashboard.

The first release does **not** accept customer orders. It does not replace the restaurant POS.

## Current foundation

- Next.js + TypeScript frontend
- Supabase/Postgres data model
- Separate order and settlement records
- Platform-specific adapters planned for Zomato and Swiggy
- Expense tracking reuses the existing `expenses` table in the connected Supabase project
- Profit calculation is based on actual settlement deductions, not hard-coded commission percentages

## Next implementation steps

1. Add authenticated restaurant/outlet access and RLS policies.
2. Implement the Zomato POS adapter and webhook receiver after platform onboarding credentials are available.
3. Implement the Swiggy POS adapter using the authorized partner/POS API available to the kitchen.
4. Add settlement import/reconciliation.
5. Connect the dashboard to live Supabase data.
6. Add expense entry and daily/monthly profit reports.
