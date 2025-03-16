
interface FlippedCardProps {
    src: string;
    alt: string;
    foil: boolean;
}

export default function FlippedCard({ src, alt, foil }: FlippedCardProps) {

    return (
        <div className="relative w-full h-full relative">
            <img
                src={src}
                alt={alt || "Interactive image"}
                className={`w-full h-full object-cover rounded-xl`}
                loading="lazy"
            />
            {foil && <div className="absolute inset-0 bg-foil-ray bg-400 animate-foil pointer-events-none rounded-lg" />}
        </div>
    );
};