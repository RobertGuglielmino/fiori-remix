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
        `mask-image-[url(/images/masks/mask1.png)]`,
        `mask-image-[url(/images/masks/mask2.png)]`,
        `mask-image-[url(/images/masks/mask3.png)]`,
        `mask-image-[url(/images/masks/mask4.png)]`,
        `mask-image-[url(/images/masks/mask5.png)]`,
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
