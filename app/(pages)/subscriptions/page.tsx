"use client";
import { FunctionComponent, useEffect, useState } from "react";
import { useMyInfo } from "@/utils/user-info/getUserInfo";
import LaunchCard from "@/components/LaunchCard";
import axios from "axios";
import ToolErrorModal from "@/components/Modals/ToolErrorModal";
import ToolErrorExtention from "@/components/Modals/ToolErrorExtention";
import Panel from "@/components/Panel";
import { fullDateTimeFormat } from "@/utils/timeFormatting";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import DataStatsThree from "@/components/DataStats/DataStatsThree";

const Dashboard: FunctionComponent = () => {
  const { data } = useMyInfo();

  const [toolsData, setToolsData] = useState(global.globalAppsToolsData);
  const [activeApp, setActiveApp] = useState<number>(global.activeTool);
  const [isLoaded, setIsLoaded] = useState<boolean>(global.isLoaded);

  const [openErrorEx, setIsOpenErrorEx] = useState<boolean>(false);

  const [openErrorModal, setIsOpenErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(null);

  const [canLaunch, setCanLaunch] = useState<boolean>(false);

  window.addEventListener('message', function (event) {
    if (event.data.type === 'FROM_EXTENSION' && event.data.data.m === "Hello from the extension!" && event.data.data.v === "1.0.1") {
      if (!canLaunch) {
        setCanLaunch(true)
      }
    }
  });

  const launchApp = async (tool_id: number) => {
    setActiveApp(tool_id);
    global.activeTool = tool_id;
    setIsLoaded(null);
    global.isLoaded = null;
    setIsOpenErrorModal(false);
    setErrorMessage(null);
    global.isLoading = true;

    const token = localStorage.getItem("a");

    if (!token) {
      window.location.href = "/signin";
      return;
    }

    if (!canLaunch) {
      setIsOpenErrorEx(true);
      setIsLoaded(false);
      global.isLoaded = false;
      global.isLoading = false;
      return
    }

    let data = {
      appId: "wuXQpO8EsheI13FKKNn5p25DY92s6VtL",
      token: token,
      toolId: tool_id,
    };

    await axios
      .post("https://api.toolzmarket.com/api/user/get-session", data, {

        // .post("http://localhost:4560/api/user/get-session", data, {
        headers: {
          "Content-Type": "application/json",
          "User-Client": global.clientId1328, // Custom header for visitorId
        },
      })
      .then((res) => {
        if (res?.status === 200) {
          setIsLoaded(true);
          global.isLoaded = true;
          global.isLoading = false;

          // setTimeout(() => {

          // window.open("/newsession", "_blank")

          // Set a custom ID for the new window
          window.postMessage({ type: 'FROM_TM_APP', text: JSON.stringify(res.data) }, "*");


          // }, 500);
        }
      })
      .catch((error) => {
        setTimeout(() => {
          setErrorMessage("Something went wrong, Please try again later.");
          setIsOpenErrorModal(true);
          setIsLoaded(false);
          global.isLoaded = false;
          global.isLoading = false;
        }, 1000);
      });
  };

  useEffect(() => {
    document.title = 'Subscriptions';
    if (!toolsData) {
      let dataTools = [...data.toolsData];
      setToolsData(
        dataTools.sort((a, b) => {
          return a.tool_name.localeCompare(b.tool_name);
        })
      );
    }
  }, []);

  const { open: openNewUpdate } = useModal(
    getDangerActionConfirmationModal({
      msg: "A new version of toolzmarket has released with its new features and fixes, Download it from toolzmarket.com and install it, dont worry, YOU WONT HAVE TO DOWNLOAD IT ONCE AGAIN !!!",
      title: "New Update",
    })
  );

  const { open: openNewVersion } = useModal(
    getDangerActionConfirmationModal({
      msg: "An updated version of Toolzmarket Desktop is available. Do you want to restart Toolzmarket to apply the update?",
      title: "New Update Available",
    })
  );

  return (
    <>
      <h2 className="text-title-sm2 mb-9 px-3 font-bold text-black dark:text-white">
        My Tools & Plans
      </h2>

      {/* <DataStatsThree /> */}

      {data?.userToolsData?.length !== 0 &&
        <div className="grid w-full mb-9 px-10 gap-8 justify-center" style={{ gridTemplateColumns: "repeat(auto-fit, 330px)" }}>
          {data?.userToolsData?.map(
            (index: any) =>
              data?.toolsData?.find(
                (item: any) => item.tool_id == index.tool_id
              ) && (
                <LaunchCard
                  onClick={() => {
                    if (!global.isLoading) {
                      launchApp(
                        data?.toolsData?.find(
                          (item: any) => item.tool_id == index.tool_id
                        )?.tool_id
                      );
                    } else {
                      setErrorMessage(
                        "Wait for the loading app until it finishes loading."
                      );
                      setIsOpenErrorModal(true);
                    }
                  }}
                  activeApp={activeApp}
                  isLoaded={isLoaded}
                  key={index?.users_tools_id}
                  toolData={data?.toolsData?.find(
                    (item: any) => item.tool_id == index.tool_id
                  )}
                  endedAt={index.endedAt}
                />
              )
          )}
        </div>
      }


      {data?.userPacksData?.map((a: any, index: number) =>
        data?.packsData.find((f: any) => f.pack_id === a.pack_id) &&
        <div key={index} className="mb-[36px]">
          <Panel
            title={data?.packsData.find((f: any) => f.pack_id === a.pack_id).pack_name}
            sideActions={
              <>
                Pack expired at :{" "}
                {fullDateTimeFormat(a.endedAt)}
              </>
            }
            containerClassName="py-9"
          >
            <div className="grid w-full px-10 gap-8 justify-center" style={{ gridTemplateColumns: "repeat(auto-fit, 330px)" }}>
              {JSON.parse(data?.packsData?.find((b: any) => b.pack_id === a.pack_id)?.pack_tools || '[]').map((c) =>
                data?.toolsData.find((d: any) => d.tool_id === c) &&
                <LaunchCard
                  content={data?.toolsData.find((d: any) => d.tool_id === c).tool_content}
                  onClick={() => {
                    if (!global.isLoading) {
                      launchApp(data?.toolsData.find((d: any) => d.tool_id === c).tool_id);
                    } else {
                      setErrorMessage("Wait for the loading app until it finishes loading.");
                      setIsOpenErrorModal(true);
                    }
                  }}
                  activeApp={activeApp}
                  isLoaded={isLoaded}
                  key={data?.toolsData.find((d: any) => d.tool_id === c).tool_id}
                  toolData={data?.toolsData.find((d: any) => d.tool_id === c)}
                  endedAt={data?.toolsData.find((d: any) => d.tool_id === c).endedAt}
                />
              )}
            </div>
          </Panel>
        </div>
      )}


      {data?.userPlansData?.filter((item: any) => item.plan_name === "vip")
        .length !== 0 ? (
        <Panel
          title="Gold Plan"
          sideActions={
            <>
              Plan expired at :{" "}
              {fullDateTimeFormat(
                data?.userPlansData?.filter(
                  (item: any) => item.plan_name === "vip"
                )[0]?.endedAt
              )}
            </>
          }
          containerClassName="py-9"
        >
          <div className="grid w-full px-10 gap-8 justify-center" style={{ gridTemplateColumns: "repeat(auto-fit, 330px)" }}>
            {toolsData
              ?.filter((item: any) => item.tool_plan === "standard")
              .map((item: any) => (
                <LaunchCard
                  content={item.tool_content}
                  onClick={() => {
                    if (!global.isLoading) {
                      launchApp(item.tool_id);
                    } else {
                      setErrorMessage(
                        "Wait for the loading app until it finishes loading."
                      );
                      setIsOpenErrorModal(true);
                    }
                  }}
                  activeApp={activeApp}
                  isLoaded={isLoaded}
                  key={item.tool_id}
                  toolData={item}
                  endedAt={item.endedAt}
                />
              ))}
            {toolsData
              ?.filter((item: any) => item.tool_plan === "premium")
              .map((item: any) => (
                <LaunchCard
                  content={item.tool_content}
                  onClick={() => {
                    if (!global.isLoading) {
                      launchApp(item.tool_id);
                    } else {
                      setErrorMessage(
                        "Wait for the loading app until it finishes loading."
                      );
                      setIsOpenErrorModal(true);
                    }
                  }}
                  activeApp={activeApp}
                  isLoaded={isLoaded}
                  key={item.tool_id}
                  toolData={item}
                  endedAt={item.endedAt}
                />
              ))}
            {toolsData
              ?.filter((item: any) => item.tool_plan === "vip")
              .map((item: any) => (
                <LaunchCard
                  content={item.tool_content}
                  onClick={() => {
                    if (!global.isLoading) {
                      launchApp(item.tool_id);
                    } else {
                      setErrorMessage(
                        "Wait for the loading app until it finishes loading."
                      );
                      setIsOpenErrorModal(true);
                    }
                  }}
                  activeApp={activeApp}
                  isLoaded={isLoaded}
                  key={item.tool_id}
                  toolData={item}
                  endedAt={item.endedAt}
                />
              ))}
          </div>
        </Panel>
      ) : data?.userPlansData?.filter(
        (item: any) => item.plan_name === "premium"
      ).length !== 0 ? (
        <Panel
          title="Premium Plan"
          sideActions={
            <>
              Plan expired at :{" "}
              {fullDateTimeFormat(
                data?.userPlansData?.filter(
                  (item: any) => item.plan_name === "premium"
                )[0]?.endedAt
              )}
            </>
          }
          containerClassName="py-9"
        >
          <div className="grid w-full px-10 gap-8 justify-center" style={{ gridTemplateColumns: "repeat(auto-fit, 330px)" }}>
            {toolsData
              ?.filter((item: any) => item.tool_plan === "standard")
              .map((item: any) => (
                <LaunchCard
                  content={item.tool_content}
                  onClick={() => {
                    if (!global.isLoading) {
                      launchApp(item.tool_id);
                    } else {
                      setErrorMessage(
                        "Wait for the loading app until it finishes loading."
                      );
                      setIsOpenErrorModal(true);
                    }
                  }}
                  activeApp={activeApp}
                  isLoaded={isLoaded}
                  key={item.tool_id}
                  toolData={item}
                  endedAt={item.endedAt}
                />
              ))}
            {toolsData
              ?.filter((item: any) => item.tool_plan === "premium")
              .map((item: any) => (
                <LaunchCard
                  content={item.tool_content}
                  onClick={() => {
                    if (!global.isLoading) {
                      launchApp(item.tool_id);
                    } else {
                      setErrorMessage(
                        "Wait for the loading app until it finishes loading."
                      );
                      setIsOpenErrorModal(true);
                    }
                  }}
                  activeApp={activeApp}
                  isLoaded={isLoaded}
                  key={item.tool_id}
                  toolData={item}
                  endedAt={item.endedAt}
                />
              ))}
          </div>
        </Panel>
      ) : data?.userPlansData?.filter(
        (item: any) => item.plan_name === "standard"
      ).length !== 0 ? (
        <Panel
          title="Standard Plan"
          sideActions={
            <>
              Plan expired at :{" "}
              {fullDateTimeFormat(
                data?.userPlansData?.filter(
                  (item: any) => item.plan_name === "standard"
                )[0]?.endedAt
              )}
            </>
          }
          containerClassName="py-9"
        >
          <div className="grid w-full px-10 gap-8 justify-center" style={{ gridTemplateColumns: "repeat(auto-fit, 330px)" }}>
            {toolsData
              ?.filter((item: any) => item.tool_plan === "standard")
              .map((item: any) => (
                <LaunchCard
                  content={item.tool_content}
                  onClick={() => {
                    if (!global.isLoading) {
                      launchApp(item.tool_id);
                    } else {
                      setErrorMessage(
                        "Wait for the loading app until it finishes loading."
                      );
                      setIsOpenErrorModal(true);
                    }
                  }}
                  activeApp={activeApp}
                  isLoaded={isLoaded}
                  key={item.tool_id}
                  toolData={item}
                  endedAt={item.endedAt}
                />
              ))}
          </div>
        </Panel>
      ) : (
        data?.userToolsData?.length === 0 && data?.userPlansData?.length === 0 && data?.userPacksData?.length === 0 && (
          <p className="text-md text-center w-full dark:text-white">
            You do not have any active tools or plans yet.
          </p>
        )
      )}

      <ToolErrorModal
        message={errorMessage}
        modalOpen={openErrorModal}
        setModalOpen={setIsOpenErrorModal}
      />

      <ToolErrorExtention
        title={"Extension Not Detected or Outdated"}
        message={""}
        modalOpen={openErrorEx}
        setModalOpen={setIsOpenErrorEx}
      />
    </>
  );
};

export default Dashboard;
