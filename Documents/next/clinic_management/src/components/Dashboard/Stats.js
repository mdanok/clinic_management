import {
  CardDescription,
  CardTitle,
  CardHeader,
  Card,
  CardContent,
} from "@/components/ui/card";
export const Stats = ({ title, Icon, text, sub }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{text}</div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{sub}</p>
      </CardContent>
    </Card>
  );
};
