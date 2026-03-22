import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function FormSectionCard({
    title,
    description,
    children,
    className,
    contentClassName,
}) {
    return (
        <Card className={cn("rounded-2xl border-zinc-200 shadow-sm", className)}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent className={cn("space-y-6", contentClassName)}>
                {children}
            </CardContent>
        </Card>
    );
}
