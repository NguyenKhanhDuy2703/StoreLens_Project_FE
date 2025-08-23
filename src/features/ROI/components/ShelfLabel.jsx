export default function ShelfLabel({ children, style }) {
    return (
        <div
            className="px-4 py-2 rounded-lg bg-gray-100/60 text-gray-600 text-sm font-medium shadow-inner"
            style={style}
        >
            {children}
        </div>
    );
}