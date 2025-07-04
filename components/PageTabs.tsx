"use client";

import React, { FunctionComponent } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import ArrowRight from "@/components/icons/ArrowRight";

type Tab = {
  label: string;
  href: string;
};

type Props = {
  tabs: Tab[];
  title: string;
  backHref: string;
};

const PageTabs: FunctionComponent<Props> = ({ tabs, title, backHref }) => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap items-baseline justify-between gap-2 px-6 border-b py-3 border-stroke dark:border-strokedark">
      <h3 className="flex items-center gap-2 text-xl font-semibold text-black dark:text-white">
        <Link href={backHref}>
          <ArrowRight className="rotate-180" height={12} width={24} />
        </Link>
        <span>{title}</span>
      </h3>
      <ul className="flex flex-wrap gap-3">
        {tabs.map(({ href, label }, index) => (
          <li key={href}>
            <Link
              href={href}
              className={clsx(
                "block rounded-md px-5 py-2 text-sm font-medium hover:bg-primary hover:text-white dark:hover:bg-primary md:text-base lg:px-6",
                pathname.startsWith(href)
                  ? "bg-primary text-white"
                  : "bg-[#e7e7e7] dark:bg-meta-4 text-black dark:text-white"
              )}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PageTabs;
