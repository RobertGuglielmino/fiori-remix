interface RippedCardProps {
    src: string;
    maskImage: number;
    maskPosition: string;
}

export default function RippedCard({
    maskImage,
    maskPosition,
    src,
}: RippedCardProps) {
    const MASK_IMAGES = [
        `mask-image-[url(https://d3vjinhen5j20w.cloudfront.net/mask1.webp)]`,
        `mask-image-[url(https://d3vjinhen5j20w.cloudfront.net/mask2.webp)]`,
        `mask-image-[url(https://d3vjinhen5j20w.cloudfront.net/mask3.webp)]`,
        `mask-image-[url(https://d3vjinhen5j20w.cloudfront.net/mask4.webp)]`,
        `mask-image-[url(https://d3vjinhen5j20w.cloudfront.net/mask5.webp)]`,
    ];

    return (
        <div className="relative w-full h-full">
            <img
                src={src}
                loading="lazy"
                className={`w-full h-full object-cover relative overflow-hidden rounded-xl transition-all duration-500 scale-90 grayscale rotate-[3deg] rayscale ${MASK_IMAGES[maskImage]} scale-[90%] mask-position-[50%_50%] mask-size-cover`}
            />
        </div>
    );
};
