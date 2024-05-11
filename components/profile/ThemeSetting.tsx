"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

import { Checkbox } from "@/components/ui/checkbox";

function ThemeSetting() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const [mounted, setMounted] = useState(false);
  const [checkbox, setCheckbox] = useState(
    currentTheme === "dark" ? true : false
  );
  const [deviceCheckbox, setDeviceCheckbox] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!checkbox) {
      setTheme("Light");
    } else {
      setTheme("dark");
    }
  }, [checkbox]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 mx-6 dark:text-white">
      <div className="flex items-center gap-4">
        <p className="text-sm">Display Dark mode:</p>
        <div className="flex">
          <input
            readOnly
            className="dark-mode-toggle-input hidden w-0 h-0"
            type="checkbox"
            checked={checkbox}
          />
          <label
            className="dark-mode-toggle-label"
            onClick={() => {
              setCheckbox((prev) => !prev);
            }}
          >
            <SunIcon className="sun" />

            <MoonIcon className="moon" />
          </label>
        </div>
      </div>
      {/* <div className="flex items-center gap-4">
        <p>Device settings:</p>
        <Checkbox
          checked={deviceCheckbox}
          onCheckedChange={() => {
            if (currentTheme === "system") {
              setTheme("system");
            } else {
              setTheme("");
            }
          }}
        />
      </div> */}
    </div>
  );
}

export default ThemeSetting;
