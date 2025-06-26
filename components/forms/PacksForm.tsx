'use client'

import * as Yup from "yup";
import React, { FunctionComponent, useCallback, useState, useEffect } from "react";
import { Formik, FormikHelpers } from "formik";
import InputField from "@/components/FormFields/InputField";
import Button from "@/components/buttons/Button";
import { NewPacksReqDto } from "@/types/packs/new-packs-req-dto";
import { useCreatePack } from "@/utils/pack/createPack";
import { useRouter } from "next/navigation";
import { useGetPack } from "@/utils/pack/getPack";
import { useUpdatePack } from "@/utils/pack/updatePack";
import FormikCheckboxItem from "../FormFields/FormikCheckboxItem";
import { useMyInfo } from "@/utils/user-info/getUserInfo";

type FormType = NewPacksReqDto;

const initialValues: FormType = {
  pack_name: "",
  pack_tools: "",
  pack_price: 1,
  isActive: true,
};

export const packsSchema: Yup.ObjectSchema<FormType> = Yup.object().shape({
  pack_id: Yup.number(),
  pack_name: Yup.string().required("Please enter pack name."),
  pack_tools: Yup.string(),
  pack_price: Yup.number().required("Please enter pack price."),
  isActive: Yup.boolean(),
});

type PropsType = {
  mode: string;
  packId?: number;
};

export const PacksForm: FunctionComponent<PropsType> = ({ mode, packId }) => {
  const router = useRouter();

  const { data: userData } = useMyInfo();

  const [checkedTools, setCheckedTools] = useState<number[]>([]);
  const [isToolsError, setIsToolsError] = useState<boolean>(false);

  const { data: packData, isLoading: isDataLoading } = useGetPack(packId);

  const { mutate: create, isLoading: isCreating } = useCreatePack();
  const { mutate: update, isLoading: isUpdating } = useUpdatePack();

  const onSubmit = useCallback(
    (values: FormType, { resetForm }: FormikHelpers<FormType>) => {

      if (checkedTools.length === 0) {
        setIsToolsError(true)
        return
      }
      else {
        setIsToolsError(false)
      }

      values.pack_tools = JSON.stringify(checkedTools);

      if (mode === "edit") {
        update(
          {
            ...values,
            pack_id: packId,
          },
          {
            onSuccess: () => {
              resetForm;
              router.push(`/admin/packs`);
            },
          }
        );
      } else if (mode === "new") {
        create(values, {
          onSuccess: () => {
            resetForm();
            router.push(`/admin/packs`);
          },
        });
      }
    },
    [create, checkedTools]
  );

  const handleCheckboxChange = (toolId: number) => {
    setCheckedTools((prevCheckedTools) =>
      prevCheckedTools.includes(toolId)
        ? prevCheckedTools.filter((id) => id !== toolId)
        : [...prevCheckedTools, toolId]
    );
  };

  const pastData = (data: FormType) => {

    if (checkedTools.length === 0 && data?.pack_tools) {
      data.pack_tools = typeof data?.pack_tools === 'string' ? data?.pack_tools : ""
      setCheckedTools(typeof data?.pack_tools === 'string' ? JSON.parse(data?.pack_tools) : data?.pack_tools)
    }

    return data
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={
        mode === "edit"
          && packData
          ? pastData(packData)
          : initialValues
      }
      onSubmit={onSubmit}
      validationSchema={packsSchema}
    >
      {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
        <form onSubmit={handleSubmit} className="flex">
          <div className="p-6.5 w-full">
            {
              mode === "edit" && isDataLoading ? (
                <p className="mb-6.5 p-4 py-2 rounded-md w-min whitespace-pre bg-red font-bold text-white">
                  Previous Data Are Loading ...
                </p>
              ) : <>
                <InputField
                  className={"w-full mb-4.5"}
                  required={true}
                  id={"pack_name"}
                  label={"Pack name"}
                  type={"text"}
                  placeholder={"Enter pack name"}
                  value={values.pack_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.pack_name && errors.pack_name}
                />

                <div className="flex flex-wrap gap-5 rounded-md w-full border-[2px] border-black p-4 mb-4.5">
                  {userData && userData.toolsData?.map((item: any, index: number) => (
                    <div
                      onClick={() => { handleCheckboxChange(item.tool_id) }}
                      key={index}
                      className="flex border-[2px] border-black rounded-md px-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="mr-2 cursor-pointer"
                        value={item.tool_id}
                        checked={checkedTools.includes(item.tool_id)}
                        onChange={() => { }}
                      />
                      <p>{item.tool_name}</p>
                    </div>
                  ))}
                </div>

                {isToolsError && (
                  <p className="w-full text-start text-red mb-4.5">
                    Select at least one tool
                  </p>
                )}

                <InputField
                  className={"w-full mb-4.5"}
                  required={true}
                  id={"pack_price"}
                  label={"Pack price in $"}
                  type={"number"}
                  min={1}
                  max={500}
                  placeholder={"Enter pack price"}
                  value={values.pack_price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.pack_price && errors.pack_price}
                />

                <FormikCheckboxItem
                  label={"Is Active ?"}
                  id="isActive"
                  name="isActive"
                  value={values.isActive}
                />

                <Button
                  type={"submit"}
                  style={{ marginTop: "17px" }}
                  disabled={isCreating || isUpdating}
                  isLoading={isCreating || isUpdating}
                  formNoValidate={true}
                  loadingText={mode === "edit" ? "Updating ..." : "Creating ..."}
                >
                  {mode === "edit" ? "Update Pack" : "Create Pack"}
                </Button>
              </>}
          </div>
        </form>
      )}
    </Formik>
  );
};

export default PacksForm;
