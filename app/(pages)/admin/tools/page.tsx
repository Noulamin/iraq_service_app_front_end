"use client";

import React, { FunctionComponent, useMemo, useState } from "react";
import Link from "next/link";
import { useToolsList } from "@/utils/tool/getToolsList";
import { useDeleteTool } from "@/utils/tool/deleteTool";
import Panel from "@/components/Panel";
import Table from "@/components/Table";
import LinkButton from "@/components/buttons/LinkButton";
import IconButton from "@/components/buttons/IconButton";
import CheckIcon from "@/components/icons/CheckIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import PencilSquare from "@/components/icons/PencilSquare";
import { checkIfImageUrl } from "@/utils/imageValidator";
import { useSearchToolByName } from "@/utils/tool/getToolByName";
type Props = {
  params: { clientId: string };
};

const ToolsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { isLoading, isError, data } = useToolsList();
  const [seachedTool, setSearchedTool] = useState<string>(null);

  const {
    mutate: deleteTool,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteTool();

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Are you sure you want to delete this tool ?",
      title: "Tool Delete",
    })
  );

  const {
    isLoading: isSearching,
    isError: isSearchError,
    data: searchedData,
  } = useSearchToolByName(seachedTool);

  const columnDef = useMemo(() => {
    return [
      {
        accessorKey: "tool_image",
        header: () => "Picture",
        cell: (info) => (
          <div>
            <img
              className="rounded-lg"
              src={
                checkIfImageUrl(info.getValue())
                  ? info.getValue()
                  : "/images/default_image.png"
              }
              alt="pic"
            />
          </div>
        ),
      },
      {
        accessorKey: "tool_name",
        header: () => "Name",
        cell: (info) => info.getValue() || "none",
      },
      {
        accessorKey: "tool_plan",
        header: () => "Plan",
        cell: (info) => info.getValue() || "none",
      },
      {
        accessorKey: "tool_day_price",
        header: () => "D Price",
        cell: (info) => (info.getValue() && "$" + info.getValue()) || "none",
      },
      {
        accessorKey: "tool_none_price_month",
        header: () => "M None",
        cell: (info) => (info.getValue() && "$" + info.getValue()) || "none",
      },
      {
        accessorKey: "tool_month_price",
        header: () => "M Price",
        cell: (info) => (info.getValue() && "$" + info.getValue()) || "none",
      },
      {
        accessorKey: "tool_none_price_year",
        header: () => "Y None",
        cell: (info) => (info.getValue() && "$" + info.getValue()) || "none",
      },
      {
        accessorKey: "tool_year_price",
        header: () => "Y Price",
        cell: (info) => (info.getValue() && "$" + info.getValue()) || "none",
      },
      {
        accessorKey: "isActive",
        header: () => "Is Active",
        cell: (info) =>
          (
            <div
              style={{
                backgroundColor:
                  info.getValue() === true
                    ? "green"
                    : info.getValue() === false && "#A020F0",
              }}
              className="px-3 py-1 rounded-lg text-white text-sm text-center"
            >
              {info.getValue() === true ? "Active" : "Inactive"}
            </div>
          ) || "none",
      },
      {
        accessorKey: "tool_id",
        header: () => "",
        cell: (info) => (
          <div className="flex justify-center gap-4">
            <IconButton
              buttonType="Danger"
              onClick={() => {
                open({
                  onConfirm: () => {
                    deleteTool(info.getValue());
                  },
                });
              }}
              disabled={isDeleted}
              isLoading={isDeleting}
            >
              {isDeleted ? (
                <CheckIcon className="w-5 h-5" />
              ) : (
                <TrashIcon className="w-5 h-5" />
              )}
            </IconButton>
            <Link href={`/manage/tools/${info.getValue() as number}/edit`}>
              <IconButton>
                <PencilSquare className="w-5 h-5" />
              </IconButton>
            </Link>
          </div>
        ),
      },
    ];
  }, []);

  return (
    <Panel
      title={"Tools List"}
      sideActions={
        <div className="flex gap-6 justify-center items-center">
          <input
            placeholder="Search tool by name"
            value={seachedTool}
            onChange={(event) => {
              setSearchedTool(event.target.value);
            }}
            className={
              "w-[300px] rounded border-[1.5px] border-black bg-white py-1 px-2 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            }
          />
          <LinkButton text={"Add New Tool"} href={`/manage/tools/new`} />
        </div>
      }
    >
      {isLoading && <div className="p-4 sm:p-6 xl:p-7.5">Loading...</div>}
      {data?.length === 0 && !seachedTool && (
        <div className="p-4 text-center sm:p-6 xl:p-7.5">
          No results to display.
        </div>
      )}
      {data && data?.length !== 0 && !seachedTool && (
        <Table
          onRowClick={() => {}}
          data={data.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )}
          columns={columnDef}
        />
      )}
      {isError ||
        (isSearchError && (
          <p role="alert" className="text-red text-sm p-5 font-bold">
            Cannot get data for some reason :(
          </p>
        ))}

      {isSearching && <div className="p-4 sm:p-6 xl:p-7.5">Searching ...</div>}
      {searchedData && searchedData.length == 0 && (
        <div className="p-4 sm:p-6 xl:p-7.5">
          No data associated with the given name.
        </div>
      )}

      {searchedData && searchedData.length != 0 && (
        <Table data={searchedData} columns={columnDef} />
      )}
    </Panel>
  );
};

export default ToolsPage;
