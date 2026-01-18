'use client';

import { useState } from 'react';
import { useCircleDetail, useGenerateInviteCode } from '@/features/circles/useCircles';
import { AlertCircle, Loader, Copy, Link as LinkIcon, Check } from 'lucide-react';

interface InviteFlowProps {
  circleId: string;
  circleName: string;
}

export function InviteFlow({ circleId, circleName }: InviteFlowProps) {
  const { mutate: generateCode, isPending, data: inviteData } = useGenerateInviteCode(circleId);
  const [copied, setCopied] = useState(false);

  const handleGenerateCode = () => {
    generateCode();
  };

  const handleCopyCode = () => {
    if (inviteData?.code) {
      navigator.clipboard.writeText(inviteData.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyLink = () => {
    if (inviteData?.link) {
      navigator.clipboard.writeText(inviteData.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
      <h3 className="font-semibold mb-3">Invite Members</h3>

      {!inviteData ? (
        <button
          onClick={handleGenerateCode}
          disabled={isPending}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
        >
          {isPending && <Loader className="w-4 h-4 animate-spin" />}
          {isPending ? 'Generating...' : 'Generate Invite Code'}
        </button>
      ) : (
        <div className="space-y-3">
          {/* Invite Code */}
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
              Invite Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inviteData.code}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-slate-800 font-mono text-sm"
              />
              <button
                onClick={handleCopyCode}
                className="px-3 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 rounded-lg transition flex items-center gap-2"
                title="Copy code"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Share this code with friends
            </p>
          </div>

          {/* Invite Link */}
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
              Share Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inviteData.link}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-slate-800 font-mono text-sm truncate"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 rounded-lg transition flex items-center gap-2"
                title="Copy link"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Send this link to invite members
            </p>
          </div>

          {/* Share Button */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `Join ${circleName} on Stake`,
                  text: `Join my circle on Stake and start betting!`,
                  url: inviteData.link,
                });
              }
            }}
            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
          >
            <LinkIcon className="w-4 h-4" />
            Share via...
          </button>
        </div>
      )}
    </div>
  );
}
