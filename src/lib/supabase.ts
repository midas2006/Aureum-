import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kyejpmmlxhpzxzwadnlq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5ZWpwbW1seGhwenh6d2FkbmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1Mzc2ODMsImV4cCI6MjA3MjExMzY4M30.hImk8pAwIIKfLAE02IvALqsBFfFvK2GtH8ZpzXpMZ8k'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  project_type: string;
  message?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  estimated_value: number;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
}

export interface DashboardStats {
  kpis: {
    totalLeads: number;
    conversionRate: number;
    revenuePipeline: number;
    newLeadsThisMonth: number;
  };
  charts: {
    leadsOverTime: {
      labels: string[];
      data: number[];
    };
    statusDistribution: {
      name: string;
      value: number;
      color: string;
    }[];
    revenueByType: {
      name: string;
      value: number;
      count: number;
    }[];
  };
  recentLeads: Lead[];
}