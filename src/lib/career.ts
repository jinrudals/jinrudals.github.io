export interface Career {
  company: string;
  role: string;
  start: string; // YYYY-MM
  end?: string; // omit for current
  summary?: string;
  highlights?: string[];
}

// Add entries here, newest first.
export const career: Career[] = [];
