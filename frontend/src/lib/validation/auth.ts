import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const memberRegistrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  phone: z.string().min(10, 'Invalid phone number'),
  national_id: z.string().min(6, 'Invalid ID number'),
  dob: z.string(),
  country: z.string().min(2, 'Invalid country'),
  gender: z.enum(['male', 'female', 'other']),
  occupation: z.string().min(2, 'Invalid occupation'),
  monthly_income: z.string().min(1, 'Invalid monthly income'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const groupRegistrationSchema = z.object({
  groupName: z.string().min(2, 'Group name must be at least 2 characters'),
  chairpersonName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  registrationNumber: z.string().min(6, 'Invalid registration number'),
  location: z.string().min(2, 'Invalid location'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
