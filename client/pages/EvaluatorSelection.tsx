import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User, X, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Evaluator {
  id: string;
  name: string;
  department: string;
}

const allEvaluators: Evaluator[] = [
  { id: "1", name: "秋元 優", department: "エンタメ事業本部" },
  { id: "2", name: "及川 直樹", department: "CTO室" },
  { id: "3", name: "大木 健伍", department: "エンタメ事業本部" },
  { id: "4", name: "太田 慎一", department: "CTO室" },
  { id: "5", name: "大竹 拓歩", department: "社長室" },
  { id: "6", name: "大野 賢人", department: "エンタメ事業本部" },
  { id: "7", name: "大能 千裕", department: "社長室" },
  { id: "8", name: "岡本 泰宏", department: "社長室" },
];

export default function EvaluatorSelection() {
  const [superiorEvaluators, setSuperiorEvaluators] = useState<Evaluator[]>([
    { id: "s1", name: "鈴木 悠太", department: "上司" },
    { id: "s2", name: "小澤 昂大", department: "上司" },
  ]);
  const [colleagueEvaluators, setColleagueEvaluators] = useState<Evaluator[]>([
    { id: "c1", name: "加藤 結香", department: "同僚" },
    { id: "c2", name: "太田 慎一", department: "同僚" },
    { id: "c3", name: "永澤 諒也", department: "同僚" },
  ]);
  const [otherEvaluator, setOtherEvaluator] = useState("");
  const [openSuperior, setOpenSuperior] = useState(false);
  const [openColleague, setOpenColleague] = useState(false);

  const removeEvaluator = (
    list: Evaluator[],
    setter: React.Dispatch<React.SetStateAction<Evaluator[]>>,
    id: string
  ) => {
    setter(list.filter((e) => e.id !== id));
  };

  const addEvaluator = (
    list: Evaluator[],
    setter: React.Dispatch<React.SetStateAction<Evaluator[]>>,
    evaluator: Evaluator,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!list.find((e) => e.id === evaluator.id)) {
      setter([...list, evaluator]);
    }
    setOpen(false);
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-6xl space-y-8 py-8 md:py-14">
        <div className="space-y-4 md:space-y-6">
          <h1 className="text-xl font-semibold md:text-2xl">
            360度評価　評価者選定
          </h1>

          <div className="space-y-4 rounded-lg border border-border bg-card p-5 md:p-6">
            <div className="border-b border-border pb-3 md:pb-4">
              <div className="flex flex-col gap-1.5 md:gap-2">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-base font-medium md:text-lg">回答期限</h2>
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-red-50 px-3.5 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    残り3日
                  </Badge>
                </div>
                <p className="text-base md:text-lg">2025年12月10日 23:59</p>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="purpose" className="border-b border-border">
                <AccordionTrigger className="py-2.5 text-base font-medium hover:no-underline md:py-3">
                  360度評価の目的
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed">
                  <div className="space-y-3">
                    <p>1. 個人の成長と自己実現</p>
                    <p>
                      ・「本人の成長のきっかけ」「よりフェアな報酬分配」「セルフアウェアネスの向上」につながる
                    </p>
                    <p>
                      ・評価されることで、自分の課題に気づき、行動を変える動機
                    </p>
                    <p>・自己実現を後押しする「育成の装置」としての役割</p>
                    <p className="pt-2">2. 評価者側の成長・自己実現</p>
                    <p>・評価者自身も、他者を見る中で自己理解を深める</p>
                    <p>
                      ・正しく評価するには、高い視座・責任感・マネジメント経験が求められるため、評価を通じてマネジメントの質も向上する
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="criteria">
                <AccordionTrigger className="py-2.5 text-base font-medium hover:no-underline md:py-3">
                  評価者の選定基準
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed">
                  <div className="space-y-2">
                    <p>
                      ・
                      原則として、前回と同じ評価者を選定してください（評価の一貫性を保つため、過去の評価者と同じメンバーを基本としつつ、必要に応じて今回分の追加・調整を行ってください）
                    </p>
                    <p>
                      ・
                      関わりのある事業部、プロジェクトから評価者を選定してください
                    </p>
                    <p>
                      ・
                      過去3ヶ月間に毎週1回以上関与しており、その合計時間が月20時間以上の人を「全員」選定してください
                    </p>
                    <p>
                      ・
                      上記の基準で選定した人が5人未満の場合は、月20時間未満の関与時間でも関わりのある人を追加してください
                    </p>
                    <p>
                      ・
                      組織図を確認し、直属の上司とその上に位置する上司（役員）も選択してください（不明確な場合は、直属の上司に確認してください）
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="space-y-2.5">
          <h2 className="text-lg font-medium md:text-xl">
            あなたを評価する上司・同僚を選択してください。
          </h2>

          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-5 md:p-6">
              <div className="space-y-4">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">上司評価者</h3>
                  <p className="text-sm text-muted-foreground">
                    直属の上司とその上に位置する上司（役員）がデフォルトで表示されます。
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {superiorEvaluators.map((evaluator) => (
                    <div
                      key={evaluator.id}
                      className="flex items-center gap-3 rounded-md border border-border bg-background px-3.5 py-2.5"
                    >
                      <User className="h-5 w-5" />
                      <span className="text-sm font-medium md:text-base">
                        {evaluator.name}
                      </span>
                      <button
                        onClick={() =>
                          removeEvaluator(
                            superiorEvaluators,
                            setSuperiorEvaluators,
                            evaluator.id
                          )
                        }
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <Popover open={openSuperior} onOpenChange={setOpenSuperior}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openSuperior}
                      className="w-full justify-between"
                    >
                      <span className="text-muted-foreground">
                        評価者を追加
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 md:w-[400px]" align="start">
                    <Command>
                      <CommandInput placeholder="評価者を検索" />
                      <CommandList>
                        <CommandEmpty>評価者が見つかりません。</CommandEmpty>
                        <CommandGroup>
                          {allEvaluators.map((evaluator) => (
                            <CommandItem
                              key={evaluator.id}
                              value={evaluator.name}
                              onSelect={() =>
                                addEvaluator(
                                  superiorEvaluators,
                                  setSuperiorEvaluators,
                                  evaluator,
                                  setOpenSuperior
                                )
                              }
                              className="flex items-center justify-between gap-5 py-2"
                            >
                              <span>{evaluator.name}</span>
                              <Badge
                                variant="secondary"
                                className="rounded-full bg-secondary text-muted-foreground"
                              >
                                {evaluator.department}
                              </Badge>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-5 md:p-6">
              <div className="space-y-4">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">同僚評価者</h3>
                  <p className="text-sm text-muted-foreground">
                    前回の評価者がデフォルトで表示されます。
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {colleagueEvaluators.map((evaluator) => (
                    <div
                      key={evaluator.id}
                      className="flex items-center gap-3 rounded-md border border-border bg-background px-3.5 py-2.5"
                    >
                      <User className="h-5 w-5" />
                      <span className="text-sm font-medium md:text-base">
                        {evaluator.name}
                      </span>
                      <button
                        onClick={() =>
                          removeEvaluator(
                            colleagueEvaluators,
                            setColleagueEvaluators,
                            evaluator.id
                          )
                        }
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <Popover open={openColleague} onOpenChange={setOpenColleague}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openColleague}
                      className="w-full justify-between"
                    >
                      <span className="text-muted-foreground">
                        評価者を追加
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 md:w-[400px]" align="start">
                    <Command>
                      <CommandInput placeholder="評価者を検索" />
                      <CommandList>
                        <CommandEmpty>評価者が見つかりません。</CommandEmpty>
                        <CommandGroup>
                          {allEvaluators.map((evaluator) => (
                            <CommandItem
                              key={evaluator.id}
                              value={evaluator.name}
                              onSelect={() =>
                                addEvaluator(
                                  colleagueEvaluators,
                                  setColleagueEvaluators,
                                  evaluator,
                                  setOpenColleague
                                )
                              }
                              className="flex items-center justify-between gap-5 py-2"
                            >
                              <span>{evaluator.name}</span>
                              <Badge
                                variant="secondary"
                                className="rounded-full bg-secondary text-muted-foreground"
                              >
                                {evaluator.department}
                              </Badge>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-5 md:p-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-medium">その他評価者</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    社外メンバーを評価者として指定することも可能です。
                    <br className="hidden md:block" />
                    会社のカルチャーに深い理解を持って、共通の目標に向けて取り組んでいる人の中から選出してください。
                  </p>
                </div>

                <Input
                  placeholder="評価者を入力"
                  value={otherEvaluator}
                  onChange={(e) => setOtherEvaluator(e.target.value)}
                  className="h-10"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button size="lg" className="px-8 font-semibold">
            送信する
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
