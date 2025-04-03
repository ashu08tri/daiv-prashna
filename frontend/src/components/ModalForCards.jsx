import React from 'react'

function ModalForCards({ item, onClose }) {
    if (!item) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 overflow-y-auto max-h-[80vh] relative" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-2 right-2 hover:text-gray-900 text-xl font-semibold text-red-700" onClick={onClose}>
                    ✕
                </button>
                <h2 className="text-2xl font-bold mb-4">{item.title || item.name}</h2>
                {item.image && <img src={item.image} alt={item.title || item.name} className="w-full rounded mb-4" />}
                <p>{item.description || item.review}</p>
                {item.rating && <p className="mt-2">⭐ {item.rating}/5</p>}
                {item.author && <p className="text-sm text-gray-600">By {item.author}</p>}
            </div>
        </div>
    );
};


export default ModalForCards;