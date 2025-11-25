import { AppLayout } from "@/components/AppLayout";

interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p className="text-muted-foreground text-center max-w-md">
          This page is a placeholder. Continue prompting to add content to this page.
        </p>
      </div>
    </AppLayout>
  );
}
