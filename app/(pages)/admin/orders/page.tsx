"use client";

import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useOrdersList } from "@/utils/order/getOrdersList";
import { useAcceptToolOrder } from "@/utils/order/acceptToolOrder";
import { useDenyOrder } from "@/utils/order/denyOrder";
import Panel from "@/components/Panel";
import Table from "@/components/Table";
import LinkButton from "@/components/buttons/LinkButton";
import IconButton from "@/components/buttons/IconButton";
import CheckIcon from "@/components/icons/CheckIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import PencilSquare from "@/components/icons/PencilSquare";
import { fullDateTimeFormat } from "@/utils/timeFormatting";
import XMarkIcon from "@/components/icons/XMarkIcon";
import DotsIcon from "@/components/icons/DotsIcon";
import { useAcceptPlanOrder } from "@/utils/order/acceptPlanOrder";
import DataNavigateItem from "@/components/DataNavigateItem";
type Props = {
  params: { clientId: string };
};

const OrdersPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<"On Hold" | "accepted" | "denied">(null);

  const {
    isLoading,
    isFetching: isListFetching,
    isError,
    data,
    refetch,
  } = useOrdersList(page, filter);

  const {
    mutate: acceptToolOrder,
    isLoading: isAcceptingTool,
    isSuccess: isAcceptedTool,
  } = useAcceptToolOrder();

  const {
    mutate: acceptPlanOrder,
    isLoading: isAcceptingPlan,
    isSuccess: isAcceptedPlan,
  } = useAcceptPlanOrder();

  const {
    mutate: denyOrder,
    isLoading: isDenaying,
    isSuccess: isDenayed,
  } = useDenyOrder();

  const { open: openAcceptModal } = useModal(
    getDangerActionConfirmationModal({
      msg: "Are you sure you want to accept this order ?",
      title: "Accept Order",
    })
  );

  const { open: openDenyModal } = useModal(
    getDangerActionConfirmationModal({
      msg: "Are you sure you want to deny this order ?",
      title: "Deny Order",
    })
  );

  useEffect(() => {
    refetch();
  }, [isAcceptedTool, isAcceptedPlan, isDenayed, page, filter]);

  const columnDef = useMemo(() => {
    return [
      {
        accessorKey: "payment_method",
        header: () => "Method",
        cell: (info) =>
          (
            <img
              className="w-[80px]"
              src={info.getValue() === "cih" ? "/images/cih-bank.png/" : info.getValue() === "tijari" ? "/images/wafabank.png" : info.getValue() === "paypal" && "/images/paypal.png"}
              alt="image"
            />
          ) || "none",
      },
      {
        accessorKey: "product_name",
        header: () => "Product",
        cell: (info) => info.getValue() || "none",
      },
      {
        accessorKey: "buyer_name",
        header: () => "Buyer",
        cell: (info) => info.getValue() || "none",
      },
      {
        accessorKey: "buyer_email",
        header: () => "Buyer Email",
        cell: (info) => info.getValue() || "none",
      },
      {
        accessorKey: "period",
        header: () => "Period",
        cell: (info) => info.getValue() || "none",
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
              className="px-3 py-1 rounded-lg text-white text-sm text-center"
            >
              {info.getValue().charAt(0).toUpperCase() +
                info.getValue().slice(1)}
            </div>
          ) || "none",
      },
      {
        accessorKey: "order_id",
        header: () => "Actions",
        cell: (info) =>
          info?.row?.original?.status === "On Hold" &&
          info?.row?.original?.payment_method !== "paypal" && (
            <div className="flex justify-center gap-4">
              <IconButton
                buttonType="Success"
                onClick={() => {
                  openAcceptModal({
                    onConfirm: () => {
                      if (info.row.original.product_type === "tool") {
                        acceptToolOrder(info.getValue());
                      }
                      if (info.row.original.product_type === "pack") {
                        acceptPlanOrder(info.getValue());
                      }
                    },
                  });
                }}
                disabled={isAcceptingTool}
                isLoading={isAcceptingTool}
              >
                <DotsIcon className="w-5 h-5" />
              </IconButton>
              <IconButton
                buttonType="Danger"
                onClick={() => {
                  openDenyModal({
                    onConfirm: () => {
                      denyOrder(info.getValue());
                    },
                  });
                }}
                disabled={isDenaying}
                isLoading={isDenaying}
              >
                <DotsIcon className="w-5 h-5" />
              </IconButton>
            </div>
          ),
      },
    ];
  }, []);

  return (
    <Panel
      title={"Submitted Orders List"}
      sideActions={
        <div className="flex gap-8 justify-center items-center">
          <DataNavigateItem
            setPage={setPage}
            data={data}
            isFetching={isListFetching}
            page={page}
          />
          <div
            onClick={() => {
              setPage(1);
              setFilter(null);
            }}
            className="w-6 h-6 bg-white border flex justify-center items-center rounded-md cursor-pointer"
          >
            X
          </div>
          <div
            onClick={() => {
              setPage(1);
              setFilter("On Hold");
            }}
            className="w-6 h-6 bg-[#FFA500] rounded-md cursor-pointer"
          ></div>
          <div
            onClick={() => {
              setPage(1);
              setFilter("accepted");
            }}
            className="w-6 h-6 bg-[#008000] rounded-md cursor-pointer"
          ></div>
          <div
            onClick={() => {
              setPage(1);
              setFilter("denied");
            }}
            className="w-6 h-6 bg-[#FF0000] rounded-md cursor-pointer"
          ></div>
          {data && "Total Orders : " + data.dataCount}
        </div>
      }
    >
      {isLoading && <div className="p-4 sm:p-6 xl:p-7.5">Loading...</div>}
      {data?.orders?.length === 0 && (
        <div className="p-4 text-center sm:p-6 xl:p-7.5">
          No results to display.
        </div>
      )}
      {data && data?.orders?.length !== 0 && (
        <Table
          // onRowClick={(row) => {
          //   window.alert("Product Type : " + row.product_type);
          // }}
          data={data.orders}
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
