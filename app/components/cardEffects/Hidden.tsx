interface HiddenProps {
    children: any,
    unless: boolean
}

export default function Hidden({ children, unless }: HiddenProps) {
    return (
        <div>
            {unless ? children : <div className="size-24" />}
        </div>
    )
}
