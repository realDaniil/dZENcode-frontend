"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const changeLanguage = (locale: "en" | "ru") => {
    const newPath = `/${locale}${pathname.replace(/^\/(en|ru)/, "")}`;
    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <div>
      <button onClick={() => changeLanguage("en")} disabled={isPending}>
        English
      </button>
      <button onClick={() => changeLanguage("ru")} disabled={isPending}>
        Русский
      </button>
    </div>
  );
}
