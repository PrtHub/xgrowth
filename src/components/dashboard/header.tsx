export function Header() {
    return (
        <header className="flex h-16 items-center justify-between border-b border-white/10 bg-white/5 px-6 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">Dashboard</h2>
            </div>
            <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-linear-gradient-to-br from-primary to-purple-400" />
            </div>
        </header>
    );
}
