import {
  format,
  formatDistanceToNow,
  isPast,
  isToday,
  isTomorrow,
  isYesterday,
  isSameYear,
  parseISO,
} from 'date-fns';

/**
 * Format a date for display in lists (smart short format)
 * - "Today" if today
 * - "Tomorrow" if tomorrow
 * - "Yesterday" if yesterday
 * - "Mon, Jan 20" if this year
 * - "Jan 20, 2025" if different year
 */
export function formatListDate(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;

  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isYesterday(date)) return 'Yesterday';

  const targetYear = date.getFullYear();
  const currentYear = new Date().getFullYear();

  return isSameYear(date, new Date())
    ? format(date, 'EEE, MMM d')
    : format(date, 'MMM d, yyyy');
}

/**
 * Format a datetime for display (date + time)
 * - "Today at 2:30 PM" if today
 * - "Tomorrow at 2:30 PM" if tomorrow
 * - "Mon, Jan 20 at 2:30 PM" if this year
 * - "Jan 20, 2025 at 2:30 PM" if different year
 */
export function formatDateTime(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  const timeStr = format(date, 'h:mm a');

  if (isToday(date)) return `Today at ${timeStr}`;
  if (isTomorrow(date)) return `Tomorrow at ${timeStr}`;
  if (isYesterday(date)) return `Yesterday at ${timeStr}`;

  const dateStr = isSameYear(date, new Date())
    ? format(date, 'EEE, MMM d')
    : format(date, 'MMM d, yyyy');

  return `${dateStr} at ${timeStr}`;
}

/**
 * Format a relative time (how long ago)
 * - "2 minutes ago"
 * - "3 hours ago"
 * - "5 days ago"
 * Add 'ago' suffix if it's in the past
 */
export function formatRelativeTime(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  const isInPast = isPast(date);
  const relative = formatDistanceToNow(date, { addSuffix: false });

  return isInPast ? `${relative} ago` : `in ${relative}`;
}

/**
 * Format a deadline for bet cards
 * - "Closes in 2 hours" if < 1 day away
 * - "Closes Tomorrow at 2:30 PM" if tomorrow
 * - "Closes in 3 days" if < 1 week away
 * - "Closes Mon, Jan 20 at 2:30 PM" if < 1 month away
 */
export function formatDeadline(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  const now = new Date();
  const diffInHours = (date.getTime() - now.getTime()) / (1000 * 60 * 60);
  const diffInDays = diffInHours / 24;

  if (diffInHours < 1) {
    const minutes = Math.round(diffInHours * 60);
    return `Closes in ${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }

  if (diffInHours < 24) {
    const hours = Math.round(diffInHours);
    return `Closes in ${hours} hour${hours !== 1 ? 's' : ''}`;
  }

  if (isTomorrow(date)) {
    return `Closes ${formatDateTime(date)}`;
  }

  if (diffInDays < 7) {
    const days = Math.round(diffInDays);
    return `Closes in ${days} day${days !== 1 ? 's' : ''}`;
  }

  return `Closes ${formatListDate(date)}`;
}

/**
 * Format a time only (for times during the day)
 * - "2:30 PM"
 * - "14:30" (24h format with flag)
 */
export function formatTimeOnly(dateString: string | Date, use24h = false): string {
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  return format(date, use24h ? 'HH:mm' : 'h:mm a');
}

/**
 * Format a date range
 * - "Jan 20 - 22" if same month
 * - "Dec 28 - Jan 5" if different months/years
 */
export function formatDateRange(start: string | Date, end: string | Date): string {
  const startDate = typeof start === 'string' ? parseISO(start) : start;
  const endDate = typeof end === 'string' ? parseISO(end) : end;

  const startMonth = format(startDate, 'MMM');
  const endMonth = format(endDate, 'MMM');

  if (startMonth === endMonth) {
    return `${format(startDate, 'd')} - ${format(endDate, 'd MMM')}`;
  }

  return `${format(startDate, 'd MMM')} - ${format(endDate, 'd MMM')}`;
}

/**
 * Get a human-readable date status badge
 * - "Expires Today" (red)
 * - "Expires Tomorrow" (yellow)
 * - "Expires in 3 days" (blue)
 */
export function getExpiryStatus(dateString: string | Date): {
  label: string;
  variant: 'danger' | 'warning' | 'info';
} {
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  const now = new Date();
  const diffInHours = (date.getTime() - now.getTime()) / (1000 * 60 * 60);
  const diffInDays = diffInHours / 24;

  if (diffInHours < 0) {
    return { label: 'Expired', variant: 'danger' };
  }

  if (diffInHours < 24) {
    return { label: 'Expires Today', variant: 'danger' };
  }

  if (diffInDays < 2) {
    return { label: 'Expires Tomorrow', variant: 'warning' };
  }

  if (diffInDays < 7) {
    return {
      label: `Expires in ${Math.round(diffInDays)} days`,
      variant: 'warning',
    };
  }

  return { label: 'Active', variant: 'info' };
}
