"use client";

import React, { FunctionComponent, useEffect, useState } from "react";
import Panel from "@/components/Panel";
import { useGetOverview } from "@/utils/overview/getOverVIewData";
import { useGetUsersOnlineStatus } from "@/utils/overview/getOnlineUsersCount";
import { useMyInfo } from "@/utils/user-info/getUserInfo";
import { useRouter } from "next/navigation";

type Props = {
  params: { clientId: string };
};

const OverViewPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const router = useRouter();

  const [toolzStatus, setToolzStatus] = useState<any>([]);

  const { data: userDetails } = useMyInfo();

  console.log(userDetails);

  const {
    isLoading: isDataLoading,
    isFetching: isDataFetching,
    data,
    refetch,
  } = useGetOverview();

  const {
    isLoading,
    isFetching,
    data: statusData,
    refetch: fetchUsersCounter,
  } = useGetUsersOnlineStatus();

  if (statusData) {
    statusData?.status?.sort((a: any, b: any) => {
      const emailA = a.email.toLowerCase();
      const emailB = b.email.toLowerCase();
      if (emailA < emailB) return -1;
      if (emailA > emailB) return 1;
      return 0;
    });
  }

  if (!global.isfetching) {
    setInterval(() => {
      refetch();
      fetchUsersCounter();
    }, 5000);
    global.isfetching = true;
  }

  useEffect(() => {
    document.title = 'lol';
    refetch();
    fetchUsersCounter();
  }, []);

  useEffect(() => {
    if (statusData?.status && userDetails) {
      if (statusData?.status?.length !== 0) {
        const counts = {};
        statusData?.status?.forEach((item: any) => {
          const toolId = item.activeTool;
          if (item.activeTool !== "none") {
            counts[toolId] = (counts[toolId] || 0) + 1;
          }
        });

        const result = [];
        for (const toolId in counts) {
          result.push({
            toolId: parseInt(toolId),
            counts: counts[toolId],
          });
        }
        setToolzStatus(result);
      }
    }
  }, [statusData]);

  return (
    <>
      <Panel
        title={"Global Status"}
        sideActions={
          <>
            {(isFetching || isDataFetching) && (
              <div className="inline-block h-[1.1rem] w-[1.1rem] animate-spin rounded-full border-[3px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            )}
          </>
        }
      >
        <div className="flex justify-between w-full gap-4 p-5">
          <div className="p-5 shadow-2xl rounded-lg h-[120px] w-full bg-black">
            <p>Users Online :</p>
            <p className="text-2xl py-2">{`${statusData?.online ? statusData?.online : 0} user`}</p>
          </div>
          <div className="flex justify-between items-center p-5 shadow-2xl rounded-lg h-[120px] w-full bg-black">
            <div>
              <p>Total Revenue :</p>
              <p className="text-2xl py-2">{`${data?.totalRevenue && data?.totalRevenue - 5500 - 597 - 265 - 302 - 2 - 928 - 3 - 420 - 71 - 600 - 382 - 489 + 12 - 216 - 1354 - 948 - 878 - 901 - 241 || 0} $`}</p>
            </div>
            <div>
              <svg className="h-17.5 w-17.5 -rotate-90 transform">
                <circle
                  className="text-stroke dark:text-strokedark"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="30"
                  cx="35"
                  cy="35"
                />
                <circle
                  className="text-primary"
                  strokeWidth="10"
                  strokeDasharray={30 * 2 * Math.PI}
                  strokeDashoffset={30 * 2 * Math.PI - ((data?.totalRevenue && data?.totalRevenue - 5500 - 597 - 265 - 302 - 2 - 928 - 3 - 420 - 71 - 600 - 382 - 489 + 12 - 216 - 1354 - 948 - 878 - 901 - 241 || 0) / 1000) * 30 * 2 * Math.PI}
                  stroke="currentColor"
                  fill="transparent"
                  r="30"
                  cx="35"
                  cy="35"
                />
              </svg>
            </div>
          </div>
        </div>
      </Panel>
      <Panel title="Toolz Status">
        <div className="flex flex-wrap w-full gap-4 p-5">
          {toolzStatus.length === 0 && (
            <p className=" text-center w-full">No status to show right now</p>
          )}
          {toolzStatus.map((item: any) => (
            <div className="p-5 shadow-2xl rounded-lg h-[120px] bg-black">
              <p>
                {
                  userDetails?.toolsData?.find(
                    (tool: any) => tool.tool_id === item?.toolId
                  )?.tool_name
                }
              </p>
              <p className="text-2xl py-2">{`${item?.counts} user`}</p>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Users Status">
        <div className="flex flex-wrap w-full gap-4 p-5">
          {statusData?.status?.length === 0 && (
            <p className=" text-center w-full">No status to show right now</p>
          )}
          {statusData?.status.length > 0 && (
            <div className="flex flex-wrap w-full gap-4 p-5">
              {statusData?.status.length > 0 &&
                statusData?.status?.map((item: any) => (
                  <div
                    onClick={() => {
                      router.push(`/manage/users/${item?.userId}`);
                    }}
                    className="cursor-pointer p-5 shadow-2xl rounded-lg h-[120px] bg-black relative"
                  >
                    <span className="absolute w-[11px] h-[11px] bg-[#00ff00b8] rounded-full top-[12px] right-[10px]"></span>
                    <p>{item?.fullName}</p>
                    <p>{item?.email}</p>
                    <p>
                      {userDetails?.toolsData?.find(
                        (tool: any) => tool.tool_id === item?.activeTool
                      )?.tool_name || "Nothing"}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </Panel>
    </>
  );
};

export default OverViewPage;
