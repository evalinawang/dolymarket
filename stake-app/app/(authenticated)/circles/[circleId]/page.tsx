'use client';

import { CircleDetailPage } from '@/components/circles/CircleDetailPage';

export default function CircleDetailsPage({
  params,
}: {
  params: { circleId: string };
}) {
  return <CircleDetailPage circleId={params.circleId} />;
}
