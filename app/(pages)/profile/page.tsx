"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputField from "@/components/FormFields/InputField";
import Panel from "@/components/Panel";
import { useMyInfo } from "@/utils/user-info/getUserInfo";
import { useEffect } from "react";

const Profile = () => {
  const { data } = useMyInfo();

  useEffect(() => {
    document.title = data?.userData?.firstName + " " + data?.userData?.lastName + " | App";
  },[])
  
  return (
    <>
      <Breadcrumb pageName="Profile" />
      <div className="w-[50%]">
        <Panel title="Profile Details" containerClassName="p-6">
          <InputField
            className={"w-full mb-4.5"}
            label={"First Name"}
            type={"text"}
            value={data?.userData?.firstName}
            disabled
          />
          <InputField
            className={"w-full mb-4.5"}
            label={"Last Name"}
            type={"text"}
            value={data?.userData?.lastName}
            disabled
          />
          <InputField
            className={"w-full mb-4.5"}
            label={"Email Address"}
            type={"text"}
            value={data?.userData?.email}
            disabled
          />
        </Panel>
      </div>
    </>
  );
};

export default Profile;
