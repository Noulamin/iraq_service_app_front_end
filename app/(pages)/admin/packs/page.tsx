"use client";

import React, { FunctionComponent, useMemo, useState } from "react";
import Link from "next/link";
import { usePacksList } from "@/utils/pack/getPacksList";
import { useDeletePack } from "@/utils/pack/deletePack";
import Panel from "@/components/Panel";
import Table from "@/components/Table";
import IconButton from "@/components/buttons/IconButton";
import CheckIcon from "@/components/icons/CheckIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import PencilSquare from "@/components/icons/PencilSquare";
import { checkIfImageUrl } from "@/utils/imageValidator";
import LinkButton from "@/components/buttons/LinkButton";

type Props = {
  params: { clientId: string };
};

const ToolsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { isLoading, isError, data } = usePacksList();

  const {
    mutate: deletePack,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeletePack();

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Are you sure you want to delete this pack ?",
      title: "Pack Delete",
    })
  );

  const columnDef = useMemo(() => {
    return [
      {
        accessorKey: "pack_name",
        header: () => "Name",
        cell: (info) => info.getValue() || "none",
      },
      {
        accessorKey: "pack_tools",
        header: () => "Tools included",
        cell: (info) => JSON.parse(info.getValue()).length + " tools" || "none",
      },
      {
        accessorKey: "pack_price",
        header: () => "Pack price",
        cell: (info) => "$" + info.getValue() || "none",
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
              className="px-3 py-1 w-min rounded-lg text-white text-sm text-center"
            >
              {info.getValue() === true ? "Active" : "Inactive"}
            </div>
          ) || "none",
      },
      {
        accessorKey: "pack_id",
        header: () => "",
        cell: (info) => (
          <div className="flex justify-center gap-4">
            <IconButton
              buttonType="Danger"
              onClick={() => {
                open({
                  onConfirm: () => {
                    deletePack(info.getValue());
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
            <Link href={`/manage/packs/${info.getValue() as number}/edit`}>
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
      title={"Packs List"}
      sideActions={
        <div className="flex gap-6 justify-center items-center">
          <LinkButton text={"Add New Pack"} href={`/manage/packs/new`} />
        </div>
      }
    >
      {isLoading && <div className="p-4 sm:p-6 xl:p-7.5">Loading...</div>}
      {data?.length === 0 && (
        <div className="p-4 text-center sm:p-6 xl:p-7.5">
          No results to display.
        </div>
      )}
      {data && data?.length !== 0 && (
        <Table
          onRowClick={() => { }}
          data={data.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )}
          columns={columnDef}
        />
      )}
    </Panel>
  );
};

export default ToolsPage;
