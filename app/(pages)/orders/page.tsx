"use client";

import React, { FunctionComponent, useEffect, useMemo } from "react";
import Panel from "@/components/Panel";
import Table from "@/components/Table";
import LinkButton from "@/components/buttons/LinkButton";
import { useMyInfo } from "@/utils/user-info/getUserInfo";
import { fullDateTimeFormat } from "@/utils/timeFormatting";
import LoadingButton from "@/components/LoadingButton";

type Props = {
  params: { clientId: string };
};

const OrdersPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { data, isLoading, isFetching, isError, refetch } = useMyInfo();

  useEffect(() => {
    document.title = 'Orders';
  }, [])

  const columnDef = useMemo(() => {
    return [
      {
        accessorKey: "order_id",
        header: () => "Order Id",
        cell: (info) => info.getValue() || "none",
      },
      {
        accessorKey: "product_name",
        header: () => "Product",
        cell: (info) =>
          (
            <>
              {"1 " +
                info?.row?.original?.period +
                " of " +
                info?.row?.original?.product_name +
                (info?.row?.original?.product_type == "plan" ? " plan" : "")}
            </>
          ) || "none",
      },
      {
        accessorKey: "payment_method",
        header: () => "Payment Method",
        cell: (info) =>
          (
            <img
              src={info.getValue() === "cih" ? "/images/cih-bank.png/" : info.getValue() === "tijari" ? "/images/wafabank.png" : info.getValue() === "paypal" && "/images/paypal.png"}
              alt="logo"
              style={{ width: "80px" }}
            />
          ) || "none",
      },
      {
        accessorKey: "amount",
        header: () => "Amount",
        cell: (info) => "$" + info.getValue() || "none",
      },
      {
        accessorKey: "createdAt",
        header: () => "Ordered At",
        cell: (info) => fullDateTimeFormat(info.getValue()) || "none",
      },
      {
        accessorKey: "status",
        header: () => "Status",
        cell: (info) =>
          (
            <div
              style={{
                backgroundColor:
                  info.getValue() === "accepted" || info.getValue() === "completed"
                    ? "green"
                    : info.getValue() === "denied"
                      ? "red"
                      : "orange",
              }}
              className="px-3 w-min whitespace-pre py-1 rounded-lg text-white text-sm text-center"
            >
              {info.getValue().charAt(0).toUpperCase() +
                info.getValue().slice(1)}
            </div>
          ) || "none",
      },
    ];
  }, []);

  return (
    <Panel
      title={"Orders list"}
      sideActions={
        <LoadingButton
          title="Reload"
          onClick={() => {
            refetch();
          }}
          isLoading={isFetching}
          isDisabled={isFetching}
        />
      }
    >
      {isLoading && <div className="p-4 sm:p-6 xl:p-7.5">Loading...</div>}
      {data?.userOrdersData?.length === 0 && (
        <div className="p-4 text-center sm:p-6 xl:p-7.5">
          You have no orders yet.
        </div>
      )}
      {data && data?.userOrdersData?.length !== 0 && (
        <Table
          onRowClick={() => { }}
          data={data?.userOrdersData}
          columns={columnDef}
        />
      )}
      {isError && (
        <p role="alert" className="text-red text-sm p-5 font-bold">
          Cannot get data for some reason :(
        </p>
      )}
    </Panel>
  );
};

export default OrdersPage;
