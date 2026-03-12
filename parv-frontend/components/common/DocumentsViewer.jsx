import Link from 'next/link';
import React from 'react';

const DocumentViewer = ({ src = "" ,name}) => {
    const getFileType = (url) => {
        if (!url) return null;
        const extension = url.split('.').pop().toLowerCase();
        if (extension === 'pdf') return 'pdf';
        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(extension)) return 'image';
        return 'unknown';
    };
    
    const fileType = getFileType(src);

    return (
        <div className="p-2 rounded bg-gray-100 w-40 h-auto cursor-pointer">
            <Link href={src} target="_blank">
                <div className="flex items-center gap-2 mb-2">
                    {
                        fileType === 'pdf' ? (
                            <img src="/icons/pdf.png" width={25} height={25} alt="pdf" />
                        ) : fileType === 'image' ? (
                            <img src="/icons/img_icon.png" width={25} height={25} alt="image" />
                        ) : (
                            <img src="/icons/file_icon.png" width={25} height={25} alt="file" />
                        )
                    }
                    <p>{fileType === 'pdf' ? 'PDF Document' : fileType === 'image' ? 'Image' : 'File'}</p>
                </div>

                {fileType === 'pdf' ? (
                    <iframe 
                    // src={src}
                    src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(src)}`} 
                    type="application/pdf" 
                    className="w-full max-h-40 rounded" 
                    />
                ) : fileType === 'image' ? (
                    <img src={src} className="w-full max-h-40 rounded" alt="document" />
                ) : (
                    <div className="text-sm text-red-500">Unsupported file</div>
                )}

                <div className="py-1 text-xs font-semibold">
                    {name || 'Document'}
                </div>
            </Link>
        </div>
    );
};

export default DocumentViewer;
