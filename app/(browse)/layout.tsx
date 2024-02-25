export default function BrowseLayout({ children }: { children: React.ReactNode }) {
    return <>
        <div className="flex h-full">
            {children}
        </div>
    </>
};