export const AdminHeader = ({ title, description }: { title: string; description: string }) => {
    return (
        <header>
            <h1 className="text-2xl font-title text-zinc-900 dark:text-zinc-100">
                {title}
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
                {description}
            </p>
        </header>
    );
};
