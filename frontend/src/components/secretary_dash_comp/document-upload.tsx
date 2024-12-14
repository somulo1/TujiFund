import React, { useState } from 'react';
import { DocumentIcon, PaperClipIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
}

export const DocumentUpload: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Meeting Minutes - November 2023.pdf',
      type: 'PDF',
      size: '2.5 MB',
      uploadDate: '2023-11-30'
    }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newDocument: Document = {
        id: (documents.length + 1).toString(),
        name: file.name,
        type: file.type.split('/')[1].toUpperCase(),
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setDocuments([...documents, newDocument]);
    }
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Document Management</h2>
        <div className="relative">
          <input
            type="file"
            className="hidden"
            id="file-upload"
            onChange={handleFileUpload}
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
          >
            <PaperClipIcon className="-ml-1 mr-2 h-5 w-5" />
            Upload Document
          </label>
        </div>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors"
          >
            <div className="flex items-center">
              <DocumentIcon className="h-8 w-8 text-indigo-600 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">{doc.name}</h3>
                <p className="text-xs text-gray-500">
                  {doc.type} • {doc.size} • Uploaded on {doc.uploadDate}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleDelete(doc.id)}
                className="text-red-600 hover:text-red-800"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {documents.length === 0 && (
        <div className="text-center py-12">
          <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
          <p className="mt-1 text-sm text-gray-500">Upload documents to get started</p>
        </div>
      )}
    </div>
  );
};
