"use client";

import React, { FunctionComponent } from "react";
import PageTabs from "@/components/PageTabs";
import { useMyInfo } from "@/utils/user-info/getUserInfo";

const AdminTabs: FunctionComponent = () => {
  const { data } = useMyInfo();

  return (
    <PageTabs
      backHref={`/dashboard`}
      tabs={
        data?.userData.email === "nouamanlamkadmxd@gmail.com"
          ? [
              {
                label: "Overview",
                href: `/admin/overview`,
              },
              {
                label: "Users",
                href: `/admin/users`,
              },
              {
                label: "Toolz",
                href: `/admin/tools`,
              },
              {
                label: "Packs",
                href: `/admin/packs`,
              },
              {
                label: "Orders",
                href: `/admin/orders`,
              },
              {
                label: "Issues",
                href: `/admin/issues`,
              },
              {
                label: "Releases",
                href: `/admin/releases`,
              },
            ]
          : [
              {
                label: "Overview",
                href: `/admin/overview`,
              },
              {
                label: "Users",
                href: `/admin/users`,
              },
              {
                label: "Toolz",
                href: `/admin/tools`,
              },
              {
                label: "Packs",
                href: `/admin/packs`,
              },
              {
                label: "Orders",
                href: `/admin/orders`,
              },
              {
                label: "Issues",
                href: `/admin/issues`,
              },
            ]
      }
      title={`Back To Dashboard`}
    />
  );
};

export default AdminTabs;
