"use client";
import { ReactNode, useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import PrivateRoutes from "@/components/PrivateRoutes";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  let ws: any = null;
  const connectWebDocket = async () => {
    async function connectWebSocket() {
      ws = new WebSocket("wss://api.lol.com");
      // ws = new WebSocket("ws://localhost:4560");

      await FingerprintJS.load()
        .then((fp) => fp.get())
        .then((result) => {
          global.clientId1328 = result.visitorId;
          console.log("Visitor ID:", result.visitorId);
        });

      ws.onopen = function () {
        console.log("Connected to server");

        if (ws) {
          let interval = setInterval(() => {
            if (global?.userData) {
              let dataToSend: any = null;

              try {
                dataToSend = JSON.stringify([
                  {
                    userData: {
                      fullName:
                        global?.userData?.firstName +
                        " " +
                        global?.userData?.lastName,
                      email: global?.userData?.email,
                      userId: global?.userData?.userId,
                      activeTool: global?.activeTool
                        ? global?.activeTool
                        : "none",
                    },
                  },
                ]);

                // clearInterval(interval);
              } catch (error) {
                dataToSend = null;
                // clearInterval(interval);
              }

              if (dataToSend) {
                ws.send(dataToSend);
              }
            }
          }, 5000);
        } else {
          console.log("not connected at all.");
        }
      };

      ws.onclose = function () {
        console.log("Connection to server closed, reconnecting...");
      };

      ws.onerror = function (error) {
        console.log("WebSocket encountered error: ", error);
      };
    }

    if (!global.isInterval) {
      setInterval(() => {
        if (!ws || ws.readyState === WebSocket.CLOSED) {
          connectWebSocket();
        }
      }, 2000);
      global.isInterval = true;
    }

    connectWebSocket();
  };

  useEffect(() => {
    if (!global.checkOnline) {
      connectWebDocket();
      global.checkOnline = true;
    }
  }, []);

  return (
    <PrivateRoutes>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* <!-- ===== Header Start ===== --> */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
      </div>
    </PrivateRoutes>
  );
}
