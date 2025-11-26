import { AppLayout } from "@/components/AppLayout";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Table } from "lucide-react";

export default function Index() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl space-y-8 py-12">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-lg text-muted-foreground">
            Navigate to different pages:
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link to="/evaluator-selection">
            <Card className="cursor-pointer transition-all hover:border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Evaluator Selection
                </CardTitle>
                <CardDescription>
                  360度評価　評価者選定
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/data-fetching">
            <Card className="cursor-pointer transition-all hover:border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Table className="h-5 w-5" />
                  Data Fetching
                </CardTitle>
                <CardDescription>
                  今回の被評価者を決定する
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
