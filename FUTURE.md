# Future Architecture Notes

This document captures the intended production evolution for the Chit Fund Management system after the mock-data frontend prototype is complete.

## 1. Frontend scope

The current frontend is intentionally limited to the admin and office experience. It is designed to feel production-ready while remaining fully mock-data driven for local development.

## 2. Backend target

The eventual backend should provide:

- Authentication and session management
- Role-based permission enforcement
- Chit scheme and member management
- Installment and payment tracking
- Auction and prize calculation rules
- Customer and agent records
- Notifications and audit trail
- Reports and exports

## 3. Recommended data layer

Potential backend options:

- Supabase Postgres with auth and storage
- Node.js/Express API with PostgreSQL
- Any enterprise service layer exposing REST endpoints

The frontend has been structured so the service layer can swap from mock functions to real HTTP calls later with minimal UI churn.

## 4. Authorization model

The role and permission system should eventually be enforced server-side. Frontend role checks are only a user experience layer and should not be considered the security boundary.

## 5. Payment and banking integration

Production integration may include:

- UPI / bank transfers
- Razorpay or similar payment provider
- Bulk receipt generation
- Reconciliation reports
- Settlement calculation

These are intentionally not implemented in the current frontend.

## 6. Communication layer

Future communication features may include:

- SMS reminders
- WhatsApp alerting
- Email notifications
- Push notifications for agents and offices

These should be implemented through service adapters and queue-based workflows rather than direct frontend calls.

## 7. Audit and compliance

Every sensitive operation should be logged:

- User login and logout
- Customer updates
- Payment collection
- Auction result actions
- Scheme modifications
- Receipt cancellations or reversals

## 8. Mobile extension

The system is designed to support later mobile apps for:

- Customers
- Agents
- Office staff
- Supervisors

The shared business domain model should be reused across web and mobile layers.

## 9. Data model direction

The future schema should separate:

- Offices
- Schemes
- Groups
- Members
- Installments
- Payments
- Auctions
- Agents
- Users
- Activity logs

This is the same conceptual separation already represented in the frontend mock data.

## 10. Recommended migration path

1. Keep the current UI shell and routes stable.
2. Replace mock services one module at a time.
3. Introduce typed API responses and mapping adapters.
4. Add backend validation and permission enforcement.
5. Replace localStorage or mock auth flow with secure session handling.
6. Add integrations gradually: payments, notifications, reporting exports.

## 11. Conclusion

The current prototype is a realistic frontend specification of an operational chit fund management system. The future backend can be introduced without redesigning the UI by preserving the service abstraction and the role-based domain model.
