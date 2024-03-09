import { useTranslation } from "react-i18next";

export const FormInput = () => {
  const formInput = [
    {
      name: "name",
      title: t("Screen_AddContact_FormInput_Label_Name"),
      placeholder: t("Screen_AddContact_FormInput_Placeholder_Name"),
      icon: "account",
    },
    {
      name: "job_title",
      title: t("Screen_AddContact_FormInput_Label_JobTitle"),
      placeholder: t("Screen_AddContact_FormInput_Placeholder_JobTitle"),
      icon: "briefcase",
    },
    {
      name: "company",
      title: t("Screen_AddContact_FormInput_Label_Company"),
      placeholder: t("Screen_AddContact_FormInput_Placeholder_Company"),
      icon: "office-building",
    },
    {
      name: "phone",
      title: t("Screen_AddContact_FormInput_Label_Phone"),
      placeholder: t("Screen_AddContact_FormInput_Placeholder_Phone"),
      icon: "cellphone",
      keyboardType: "phone-pad",
    },
    {
      name: "email",
      title: t("Screen_AddContact_FormInput_Label_Email"),
      placeholder: t("Screen_AddContact_FormInput_Placeholder_Email"),
      icon: "email",
      keyboardType: "email-address",
    },
    {
      name: "fax",
      title: t("Screen_AddContact_FormInput_Label_Fax"),
      placeholder: t("Screen_AddContact_FormInput_Placeholder_Fax"),
      icon: "fax",
      keyboardType: "phone-pad",
    },
    {
      name: "address",
      title: t("Screen_AddContact_FormInput_Label_Address"),
      placeholder: t("Screen_AddContact_FormInput_Placeholder_Address"),
      icon: "map-marker",
      multiline: true,
    },
    {
      name: "note",
      title: t("Screen_AddContact_FormInput_Label_Note"),
      placeholder: t("Screen_AddContact_FormInput_Placeholder_Note"),
      icon: "text-box",
      multiline: true,
    },
    {
      name: "website",
      title: t("Screen_AddContact_FormInput_Label_Website"),
      placeholder: t("Screen_AddContact_FormInput_Placeholder_Website"),
      icon: "web",
      keyboardType: "url",
    },
  ];
  return formInput;
};

export const DuplicateModel = () => {
  const duplicateModel = {
    title: t("Screen_AddContact_Modal_Duplicate_Title"),
    message: t("Screen_AddContact_Modal_Duplicate_Message"),
    cancel: t("Screen_AddContact_Modal_Duplicate_Cancel"),
    submit: t("Screen_AddContact_Modal_Duplicate_Submit"),
  };
  return duplicateModel;
};

export const DuplicateInfoModel = (owner) => {
  const duplicateInfoModel = {
    title: t("Screen_AddContact_Modal_DuplicateInfo_Title"),
    message: t("Screen_AddContact_Modal_DuplicateInfo_Message", {
      owner: owner,
    }),
    cancel: t("Screen_AddContact_Modal_DuplicateInfo_Cancel"),
    submit: t("Screen_AddContact_Modal_DuplicateInfo_Submit"),
  };
  return duplicateInfoModel;
};
