import React from "react";

const SkeletonCard = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
            <div className="h-[400px] w-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-5">
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md mb-3"></div>
                <div className="flex justify-between items-center mt-4">
                    <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
