import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowDownUp } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  employmentType: string;
  department: string;
  joinDate: string;
}

const mockEmployees: Employee[] = Array.from({ length: 20 }, (_, i) => ({
  id: `emp-${i + 1}`,
  name: "山田 花子",
  employmentType: "正社員",
  department: "エンタメ事業本部",
  joinDate: "2025/11/17",
}));

export default function DataFetching() {
  const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(
    new Set(["emp-1", "emp-2", "emp-3"]),
  );
  const [department, setDepartment] = useState("エンタメ事業部");
  const [memberName, setMemberName] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [activeTab, setActiveTab] = useState("target");

  const toggleEmployee = (id: string) => {
    const newSelected = new Set(selectedEmployees);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedEmployees(newSelected);
  };

  const toggleAll = () => {
    if (selectedEmployees.size === mockEmployees.length) {
      setSelectedEmployees(new Set());
    } else {
      setSelectedEmployees(new Set(mockEmployees.map((e) => e.id)));
    }
  };

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return parts.map((p) => p[0]).join("");
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-6">
          <div className="flex-1 space-y-2">
            <Label htmlFor="department">部署</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger id="department" className="w-full md:w-[200px]">
                <SelectValue placeholder="部署を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="エンタメ事業部">エンタメ事業部</SelectItem>
                <SelectItem value="CTO室">CTO室</SelectItem>
                <SelectItem value="社���室">社長室</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 space-y-2">
            <Label htmlFor="memberName">メンバー名</Label>
            <Input
              id="memberName"
              placeholder="山田　花子"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="w-full md:w-[200px] space-y-2">
            <Label htmlFor="joinDate">入社時期</Label>
            <Input
              id="joinDate"
              placeholder="20XX.6-"
              value={joinDate}
              onChange={(e) => setJoinDate(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <TabsList className="grid w-full md:w-[400px] grid-cols-2">
              <TabsTrigger
                value="target"
                className="data-[state=active]:border-b-4 data-[state=active]:border-blue-600 rounded-none"
              >
                対象（80名）
              </TabsTrigger>
              <TabsTrigger
                value="excluded"
                className="data-[state=active]:border-b-4 data-[state=active]:border-blue-600 rounded-none"
              >
                対象外(10名）
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="text-lg font-bold">
                {selectedEmployees.size}名選択
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="whitespace-nowrap">
                  前回のデータを反映
                </Button>
                <Button className="whitespace-nowrap">評価対象外にする</Button>
              </div>
            </div>
          </div>

          <TabsContent value="target" className="mt-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={
                          selectedEmployees.size === mockEmployees.length
                        }
                        onCheckedChange={toggleAll}
                      />
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        評価対象者
                        <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        雇用形態
                        <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        部署
                        <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        入社日
                        <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedEmployees.has(employee.id)}
                          onCheckedChange={() => toggleEmployee(employee.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {getInitials(employee.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{employee.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{employee.employmentType}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.joinDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="excluded" className="mt-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox />
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        評価対象者
                        <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        雇用形態
                        <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        部署
                        <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        入社日
                        <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-muted-foreground py-8"
                    >
                      対象外のメンバーはいません
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
