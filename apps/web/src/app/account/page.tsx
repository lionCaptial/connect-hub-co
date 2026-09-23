import { redirect } from 'next/navigation';
import { ROUTES } from '@/config/navigation';

export default function AccountPage() {
  redirect(ROUTES.ACCOUNT_SERVICE_REQUESTS);
}
