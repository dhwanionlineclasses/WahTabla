"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Loader2 } from "lucide-react";
import { useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string | null;
  title?: string;
}

export function PdfModal({
  isOpen,
  onClose,
  pdfUrl,
  title = "PDF Viewer",
}: PdfModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!pdfUrl) return null;

  // Reset loading state when modal opens
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setIsLoading(true);
      setHasError(false);
    }
    onClose();
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

   const handleOverlayInteraction = (e: React.MouseEvent | React.TouchEvent | React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  // You can still use the toolbar parameters if needed
  const pdfUrlWithParams = `${pdfUrl}#toolbar=0&statusbar=0&messages=0&navpanes=0&scrollbar=1`;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl w-full max-h-[70%] h-full pt-8">
        <DialogHeader className="sr-only">
          <DialogTitle>
            Document Viewer
          </DialogTitle>
          <DialogDescription>
            Dhwani pdf Viewer
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 pt-0">
          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10 rounded-md">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600 text-sm">Loading PDF...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10 rounded-md">
              <div className="text-center">
                <div className="text-red-500 mb-4">
                  <X className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Failed to load PDF</p>
                </div>
                <Button
                  onClick={() => window.open(pdfUrl, "_blank")}
                  variant="outline"
                  size="sm"
                >
                  Open in New Tab
                </Button>
              </div>
            </div>
          )}

          {/* PDF Iframe */}
          <iframe
            src={pdfUrlWithParams}
            className="w-full h-full border rounded-md"
            title="PDF Viewer"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            style={{ display: isLoading ? "none" : "block" }}
            onContextMenu={handleOverlayInteraction}
          />

          {!isLoading && !hasError && (
            <div
              className="absolute inset-0 z-10 cursor-default"
              onContextMenu={handleOverlayInteraction}
              onMouseDown={handleOverlayInteraction}
              onMouseUp={handleOverlayInteraction}
              onClick={handleOverlayInteraction}
              onDoubleClick={handleOverlayInteraction}
              onTouchStart={handleOverlayInteraction}
              onTouchEnd={handleOverlayInteraction}
              onDragStart={handleOverlayInteraction}
              onDrop={handleOverlayInteraction}
              onKeyDown={handleOverlayInteraction}
              style={{
                backgroundColor: 'transparent',
                pointerEvents: 'auto', // Capture all pointer events
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
