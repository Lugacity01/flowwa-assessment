Project Overview

This project is a Rewards & Referral Dashboard built with React and Supabase.
Users can sign up, log in, earn points daily, invite friends, and redeem rewards based on their points.

The system focuses on good user experience, security, and real backend logic, not just UI.

Key Features
* Email and Google authentication
* Email verification on signup
* Protected routes (users must be logged in)
* Mandatory profile completion before dashboard access
* Daily streak rewards (+5 points per day)
* Referral system (+25 points per successful referral)
* Rewards redemption based on points
* Skeleton loaders for better loading experience


Tech Stack
* Frontend: React + Tailwind CSS
* Backend: Supabase (Auth, Database, RPC functions)
* Auth: Email/Password and Google OAuth


How It Works (Simple Flow)
1. User signs up and receives a verification email
2. User logs in
3. If profile is incomplete, the user must complete it
4. User earns points via daily streaks and referrals
5. Points can be redeemed for rewards


Assumptions
* Email verification is enabled in Supabase
* Users must verify email before full access
* Rewards are stored in the database, not hard-coded
* Coming Soon rewards are defined by points_required = 0
* Profile data is stored in a profiles table
* Referral rewards are handled using a Supabase RPC function
* Skeleton loaders and spinners are used for better UX
