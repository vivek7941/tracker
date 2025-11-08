-- Add currency and notification preferences to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS currency text DEFAULT 'INR',
ADD COLUMN IF NOT EXISTS notification_budget_alerts boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS notification_goal_updates boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS notification_savings_tips boolean DEFAULT true;