"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useToggleTheme } from "@/hooks/useToggleTheme";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = useToggleTheme(setTheme);

  if (!resolvedTheme) return null;

  return (
    <Tabs value={resolvedTheme} className="basis-1/2">
      <TabsList className="w-full">
        <TabsTrigger
          value="light"
          render={
            <Button variant="ghost" onClick={(e) => toggleTheme("light", e)}>
              <SunIcon className="size-4" />
            </Button>
          }
        />

        <TabsTrigger
          value="dark"
          render={
            <Button variant="ghost" onClick={(e) => toggleTheme("dark", e)}>
              <MoonIcon className="size-4" />
            </Button>
          }
        />

        <TabsTrigger
          value="system"
          render={
            <Button variant="ghost" onClick={(e) => toggleTheme("system", e)}>
              <MonitorIcon className="size-4" />
            </Button>
          }
        />
      </TabsList>
    </Tabs>
  );
}
