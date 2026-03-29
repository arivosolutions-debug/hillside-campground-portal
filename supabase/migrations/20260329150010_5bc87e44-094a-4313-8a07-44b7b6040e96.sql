-- Block public SELECT on enquiries (only service role can read)
CREATE POLICY "Only service role can read enquiries"
ON public.enquiries
FOR SELECT
TO authenticated
USING (false);

-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can submit enquiries" ON public.enquiries;

-- Add a restrictive INSERT policy (block direct client inserts; edge function uses service role)
CREATE POLICY "Only service role can insert enquiries"
ON public.enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (false);

-- Add email format check constraint
ALTER TABLE public.enquiries
ADD CONSTRAINT enquiries_email_format
CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');

-- Add length constraints
ALTER TABLE public.enquiries
ADD CONSTRAINT enquiries_name_length CHECK (char_length(name) <= 100);

ALTER TABLE public.enquiries
ADD CONSTRAINT enquiries_email_length CHECK (char_length(email) <= 255);

ALTER TABLE public.enquiries
ADD CONSTRAINT enquiries_phone_length CHECK (char_length(phone) <= 30);

ALTER TABLE public.enquiries
ADD CONSTRAINT enquiries_message_length CHECK (char_length(message) <= 5000);