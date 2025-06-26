"use client";

import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { useOrdersList } from "@/utils/order/getOrdersList";
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
import { useIssuesList } from "@/utils/issue/getIssuesList";
import { useGetUsersList } from "@/utils/users/getUsersList";
import InputField from "@/components/FormFields/InputField";
import { useSearchUserByEmail } from "@/utils/users/getUserByEmail";
import DataNavigateItem from "@/components/DataNavigateItem";
type Props = {
  params: { clientId: string };
};

const UsersPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const router = useRouter();

  const [seachedEmail, setSearchedEmail] = useState<string>(null);
  const [page, setPage] = useState<number>(1);

  const {
    isLoading: isListLoading,
    isFetching: isListFetching,
    data,
    isError,
    refetch,
  } = useGetUsersList(page);

  const { isLoading: isSearching, data: searchedData } =
    useSearchUserByEmail(seachedEmail);

  useEffect(() => {
    refetch();
  }, [page]);

  const columnDef = useMemo(() => {
    return [
      {
        accessorKey: "first_name",
        header: () => "First Name",
        cell: (info) => info.getValue() || "none",
      },
      {
        accessorKey: "last_name",
        header: () => "Last Name",
        cell: (info) => info.getValue() || "none",
      },
      {
        accessorKey: "email",
        header: () => "Email Address",
        cell: (info) => info.getValue() || "none",
      },
      {
        accessorKey: "isActive",
        header: () => "Is Account Active",
        cell: (info) =>
          (
            <div
              style={{
                backgroundColor:
                  info.getValue() === true
                    ? "green"
                    : info.getValue() === false && "#A020F0",
              }}
              className="px-2 py-1 w-min rounded-lg text-white text-xs text-center"
            >
              {info.getValue() === true ? "Active" : "Inactive"}
            </div>
          ) || "none",
      },
      {
        accessorKey: "role",
        header: () => "Role",
        cell: (info) =>
          (
            <div
              style={{
                backgroundColor:
                  info.getValue() === "admin"
                    ? "orange"
                    : info.getValue() === "client" && "#0000ff",
              }}
              className="px-2 py-1 w-min rounded-lg text-white text-xs text-center"
            >
              {info.getValue() === "admin" ? "Admin" : "Client"}
            </div>
          ) || "none",
      },
      {
        accessorKey: "createdAt",
        header: () => "Joined At",
        cell: (info) => fullDateTimeFormat(info.getValue()) || "none",
      },
    ];
  }, []);

  const SideActions = () => {
    return (
      <div className="flex gap-4">
        <div className="flex gap-4 justify-center items-center">
          {isListFetching && (
            <div className="inline-block h-[1.1rem] w-[1.1rem] animate-spin rounded-full border-[3px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          )}
          <button
            disabled={page === 1 || isListFetching}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            Previous
          </button>
          {data?.currentPage}/{data?.totalPages}
          <button
            disabled={page === data?.totalPages || isListFetching}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <Panel
      title={"Users List"}
      sideActions={
        <div className="flex gap-8 justify-center items-center">
          <DataNavigateItem
            setPage={setPage}
            data={data}
            isFetching={isListFetching}
            page={page}
          />
          <input
            placeholder="Search user by email"
            value={seachedEmail}
            onChange={(event) => {
              setSearchedEmail(event.target.value);
            }}
            className={
              "w-[300px] rounded border-[1.5px] border-black bg-white py-1 px-2 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            }
          />
          <p className="flex items-center">Total Users : {data?.dataCount}</p>
        </div>
      }
    >
      {isListLoading && <div className="p-4 sm:p-6 xl:p-7.5">Loading...</div>}
      {data && !seachedEmail && (
        <Table
          onRowClick={(Row) => {
            router.push(`/manage/users/${Row.user_id}`);
          }}
          data={data?.users}
          columns={columnDef}
        />
      )}

      {isSearching && <div className="p-4 sm:p-6 xl:p-7.5">Searching ...</div>}
      {searchedData && searchedData.length == 0 && (
        <div className="p-4 sm:p-6 xl:p-7.5">
          No data associated with the given email.
        </div>
      )}

      {searchedData && searchedData.length != 0 && (
        <Table
          onRowClick={(Row) => {
            router.push(`/manage/users/${Row.user_id}`);
          }}
          data={searchedData}
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

export default UsersPage;
