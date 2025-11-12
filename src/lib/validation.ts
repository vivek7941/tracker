import { z } from "zod";

// Validation schemas for all forms

export const expenseSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  amount: z
    .string()
    .trim()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(parseFloat(val)), "Amount must be a valid number")
    .refine((val) => parseFloat(val) > 0, "Amount must be positive")
    .refine((val) => parseFloat(val) < 10000000, "Amount must be less than 1 crore")
    .refine((val) => isFinite(parseFloat(val)), "Amount must be finite"),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
});

export const goalSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Goal name is required")
    .max(100, "Goal name must be less than 100 characters"),
  target_amount: z
    .string()
    .trim()
    .min(1, "Target amount is required")
    .refine((val) => !isNaN(parseFloat(val)), "Target amount must be a valid number")
    .refine((val) => parseFloat(val) > 0, "Target amount must be positive")
    .refine((val) => parseFloat(val) < 100000000, "Target amount must be less than 10 crores")
    .refine((val) => isFinite(parseFloat(val)), "Target amount must be finite"),
  current_amount: z
    .string()
    .trim()
    .refine((val) => !isNaN(parseFloat(val)), "Current amount must be a valid number")
    .refine((val) => parseFloat(val) >= 0, "Current amount cannot be negative")
    .refine((val) => parseFloat(val) < 100000000, "Current amount must be less than 10 crores")
    .refine((val) => isFinite(parseFloat(val)), "Current amount must be finite"),
  deadline: z.string().min(1, "Deadline is required"),
});

export const budgetSchema = z.object({
  category: z.string().min(1, "Category is required"),
  budgetAmount: z
    .string()
    .trim()
    .min(1, "Budget amount is required")
    .refine((val) => !isNaN(parseFloat(val)), "Budget amount must be a valid number")
    .refine((val) => parseFloat(val) > 0, "Budget amount must be positive")
    .refine((val) => parseFloat(val) < 10000000, "Budget amount must be less than 1 crore")
    .refine((val) => isFinite(parseFloat(val)), "Budget amount must be finite"),
  period: z.string().min(1, "Period is required"),
});

export const financialSummarySchema = z.object({
  balance: z
    .string()
    .trim()
    .min(1, "Balance is required")
    .refine((val) => !isNaN(parseFloat(val)), "Balance must be a valid number")
    .refine((val) => parseFloat(val) >= 0, "Balance cannot be negative")
    .refine((val) => parseFloat(val) < 1000000000, "Balance must be less than 100 crores")
    .refine((val) => isFinite(parseFloat(val)), "Balance must be finite"),
  income: z
    .string()
    .trim()
    .min(1, "Income is required")
    .refine((val) => !isNaN(parseFloat(val)), "Income must be a valid number")
    .refine((val) => parseFloat(val) >= 0, "Income cannot be negative")
    .refine((val) => parseFloat(val) < 1000000000, "Income must be less than 100 crores")
    .refine((val) => isFinite(parseFloat(val)), "Income must be finite"),
  expenses: z
    .string()
    .trim()
    .min(1, "Expenses is required")
    .refine((val) => !isNaN(parseFloat(val)), "Expenses must be a valid number")
    .refine((val) => parseFloat(val) >= 0, "Expenses cannot be negative")
    .refine((val) => parseFloat(val) < 1000000000, "Expenses must be less than 100 crores")
    .refine((val) => isFinite(parseFloat(val)), "Expenses must be finite"),
  savings: z
    .string()
    .trim()
    .min(1, "Savings is required")
    .refine((val) => !isNaN(parseFloat(val)), "Savings must be a valid number")
    .refine((val) => parseFloat(val) >= 0, "Savings cannot be negative")
    .refine((val) => parseFloat(val) < 1000000000, "Savings must be less than 100 crores")
    .refine((val) => isFinite(parseFloat(val)), "Savings must be finite"),
});

export const authSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(72, "Password must be less than 72 characters"),
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .optional(),
});
