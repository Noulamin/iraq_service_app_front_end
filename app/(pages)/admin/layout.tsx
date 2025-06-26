import React, { FunctionComponent, PropsWithChildren } from "react";
import AdminTabs from "@/components/AdminTabs";

type Props = {
  params: { clientId: string };
};

const AdminLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  params: { clientId },
}) => {
  return (
    <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
      <AdminTabs />
      {children}
    </div>
  );
};

export default AdminLayout;
