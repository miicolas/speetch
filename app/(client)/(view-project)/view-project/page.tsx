import ProjectSearchForm from "@/components/forms/project-search-form";

export default function ViewProject() {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold">Discover your project</h1>
            <p className="text-sm text-muted-foreground">
                Search for your project by name or email
            </p>
            <ProjectSearchForm />
        </div>
    );
}
