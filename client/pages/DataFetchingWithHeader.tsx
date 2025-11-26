import { useState } from "react";
import {
  GalleryVerticalEnd,
  SquareTerminal,
  Bot,
  BookOpen,
  Settings2,
  LifeBuoy,
  Send,
  ChevronsUpDown,
  ChevronRight,
  ChevronDown,
  Search,
  PanelLeft,
  ArrowDownUp,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
import { Link } from "react-router-dom";

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

export default function DataFetchingWithHeader() {
  const [playgroundOpen, setPlaygroundOpen] = useState(true);
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
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="offcanvas">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Documentation</span>
                  <span className="truncate text-xs">v1.0.1</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="h-10 pl-9 bg-background border-input"
              />
            </div>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarMenu>
              <Collapsible
                open={playgroundOpen}
                onOpenChange={setPlaygroundOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <SquareTerminal className="size-4" />
                      <span>Playground</span>
                      <ChevronDown
                        className={`ml-auto size-4 transition-transform ${
                          playgroundOpen ? "" : "-rotate-90"
                        }`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link to="/history">
                            <span>History</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link to="/starred">
                            <span>Starred</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link to="/settings">
                            <span>Settings</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Bot className="size-4" />
                  <span>Models</span>
                  <ChevronRight className="ml-auto size-4" />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <BookOpen className="size-4" />
                  <span>Documentation</span>
                  <ChevronRight className="ml-auto size-4" />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings2 className="size-4" />
                  <span>Settings</span>
                  <ChevronRight className="ml-auto size-4" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="sm">
                <LifeBuoy className="size-4" />
                <span className="text-xs">Support</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton size="sm">
                <Send className="size-4" />
                <span className="text-xs">Feedback</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                    SC
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">shadcn</span>
                  <span className="truncate text-xs">m@example.com</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-sidebar px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-muted-foreground">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col">
          <div className="border-b bg-sidebar px-6 py-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1 space-y-2">
                <h1 className="text-xl font-semibold">
                  今回の被評価者を決定する
                </h1>
                <p className="text-sm text-muted-foreground">
                  ここに文章が入ります。ここ���文章が入ります。ここに文章が入り���す。
                </p>
              </div>
              <Button size="lg" className="px-8">
                決定する
              </Button>
            </div>
          </div>

          <div className="flex-1 bg-background p-8">
            <div className="space-y-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-6">
                <div className="w-full md:w-[200px] space-y-2">
                  <Label htmlFor="department">部署</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="部署を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="エンタメ事業部">
                        エンタメ事業部
                      </SelectItem>
                      <SelectItem value="CTO室">CTO室</SelectItem>
                      <SelectItem value="社長室">社長室</SelectItem>
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
                  />
                </div>

                <div className="w-full md:w-[200px] space-y-2">
                  <Label htmlFor="joinDate">入社時期</Label>
                  <Input
                    id="joinDate"
                    placeholder="20XX.6-"
                    value={joinDate}
                    onChange={(e) => setJoinDate(e.target.value)}
                  />
                </div>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <TabsList className="grid w-full md:w-[400px] grid-cols-2 h-auto p-0 bg-transparent border-b rounded-none">
                    <TabsTrigger
                      value="target"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-blue-600 rounded-none pb-2.5"
                    >
                      <span className="text-xs font-semibold text-muted-foreground">
                        対象（80名）
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="excluded"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-blue-600 rounded-none pb-2.5"
                    >
                      <span className="text-xs font-semibold text-muted-foreground">
                        対象外(10名）
                      </span>
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
                      <Button className="whitespace-nowrap">
                        評価対象外にする
                      </Button>
                    </div>
                  </div>
                </div>

                <TabsContent value="target" className="mt-4">
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
                            <div className="flex items-center gap-2.5">
                              評価対象者
                              <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </TableHead>
                          <TableHead>
                            <div className="flex items-center gap-2.5">
                              雇用形態
                              <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </TableHead>
                          <TableHead>
                            <div className="flex items-center gap-2.5">
                              部署
                              <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </TableHead>
                          <TableHead>
                            <div className="flex items-center gap-2.5">
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
                                onCheckedChange={() =>
                                  toggleEmployee(employee.id)
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">
                                    {getInitials(employee.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">
                                  {employee.name}
                                </span>
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
                            <div className="flex items-center gap-2.5">
                              評価対象者
                              <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </TableHead>
                          <TableHead>
                            <div className="flex items-center gap-2.5">
                              雇用形態
                              <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </TableHead>
                          <TableHead>
                            <div className="flex items-center gap-2.5">
                              部署
                              <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </TableHead>
                          <TableHead>
                            <div className="flex items-center gap-2.5">
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
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
