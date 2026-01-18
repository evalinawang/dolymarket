'use client';

import { useState, useRef } from 'react';
import { StakeInstance, BetParticipant } from '@/types';
import { useUploadProof } from '@/features/bets/useBets';
import { X, Upload, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProofUploadModalProps {
  betId: string;
  participant: BetParticipant;
  stakeInstance: StakeInstance;
  isOpen: boolean;
  onClose: () => void;
  onUploaded?: () => void;
}

export function ProofUploadModal({
  betId,
  participant,
  stakeInstance,
  isOpen,
  onClose,
  onUploaded,
}: ProofUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useUploadProof(betId);
  const isUploading = uploadMutation.isPending;
  const isCompleted = stakeInstance.status === 'completed';

  const proofType = stakeInstance.proofRequirement;

  const handleFileSelect = (file: File) => {
    // Validate file type
    if (proofType === 'PHOTO' && !file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }
    if (proofType === 'VIDEO' && !file.type.startsWith('video/')) {
      alert('Please select a valid video file');
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      await uploadMutation.mutateAsync({
        stakeInstanceId: stakeInstance.id,
        file: selectedFile,
        proofType: proofType as 'PHOTO' | 'VIDEO',
      });

      // Clear file selection
      setSelectedFile(null);
      setPreview(null);

      onUploaded?.();
      onClose();
    } catch (error) {
      console.error('Failed to upload proof:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 rounded-t-2xl z-50 max-h-[90vh] overflow-y-auto md:bottom-auto md:left-1/2 md:right-auto md:top-1/2 md:w-full md:max-w-md md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900">
          <h2 className="text-xl font-bold">
            {isCompleted ? 'Stake Completed' : `Upload ${proofType}`}
          </h2>
          <button
            onClick={onClose}
            disabled={isUploading}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {isCompleted ? (
            // Completed State
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6 flex flex-col items-center justify-center space-y-3">
                <CheckCircle2 size={48} className="text-green-600 dark:text-green-400" />
                <div className="text-center">
                  <h3 className="font-bold text-green-900 dark:text-green-100 text-lg">
                    Stake Completed!
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Your proof has been submitted.
                  </p>
                </div>
              </div>

              {stakeInstance.proofUpload && (
                <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3 space-y-2">
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
                    SUBMITTED PROOF
                  </p>
                  {proofType === 'PHOTO' && (
                    <img
                      src={stakeInstance.proofUpload.proofUrl}
                      alt="Proof"
                      className="w-full h-48 object-cover rounded"
                    />
                  )}
                  {proofType === 'VIDEO' && (
                    <video
                      src={stakeInstance.proofUpload.proofUrl}
                      controls
                      className="w-full h-48 rounded"
                    />
                  )}
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Submitted {new Date(stakeInstance.proofUpload.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            // Upload State
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Stake Required
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You lost this bet. Upload proof to complete your stake.
                </p>
              </div>

              {/* Upload Area */}
              <div
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={proofType === 'PHOTO' ? 'image/*' : 'video/*'}
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  capture="environment"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />

                {!preview ? (
                  <div className="space-y-2">
                    <Upload size={32} className="mx-auto text-gray-400" />
                    <div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                      >
                        Choose {proofType === 'PHOTO' ? 'Photo' : 'Video'}
                      </button>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        or drag and drop
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {proofType === 'PHOTO' && (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded"
                      />
                    )}
                    {proofType === 'VIDEO' && (
                      <video
                        src={preview}
                        controls
                        className="w-full h-48 rounded"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreview(null);
                      }}
                      className="text-red-600 dark:text-red-400 text-sm font-semibold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <div className="flex gap-2">
                  <AlertCircle size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {proofType === 'PHOTO'
                      ? 'Take a photo of yourself proving you completed the stake.'
                      : 'Record a video of yourself proving you completed the stake.'}
                  </p>
                </div>
              </div>

              {uploadMutation.isError && (
                <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Failed to upload proof. Please try again.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={onClose}
                  disabled={isUploading}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!selectedFile || isUploading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </span>
                  ) : (
                    'Upload'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
