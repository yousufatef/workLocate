import React from 'react';

type ImageType = {
    src: string;
    alt: string;
};

type ImageGridProps = {
    mainImage: ImageType;
    smallImages: ImageType[];
};

const ImageGrid: React.FC<ImageGridProps> = ({ mainImage, smallImages }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Main Image */}
            <div className="md:col-span-2 h-[300px] relative rounded-lg overflow-hidden">
                <img
                    src={mainImage.src}
                    alt={mainImage.alt}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Small Images Grid */}
            <div className="grid grid-cols-2 gap-4">
                {smallImages.map((image, index) => (
                    <div key={index} className="h-[140px] relative rounded-lg overflow-hidden">
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="object-cover w-full h-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGrid;