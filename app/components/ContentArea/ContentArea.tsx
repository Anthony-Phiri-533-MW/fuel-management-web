'use client'

import React from 'react';

interface ContentAreaProps {
    selectedSection: string;
}

const ContentArea: React.FC<ContentAreaProps> = ({ selectedSection }) => {
    return (
        <div className="flex-1 p-4 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">{selectedSection}</h1>
            <p>This is the content for {selectedSection}.</p>
        </div>
    );
};

export default ContentArea;