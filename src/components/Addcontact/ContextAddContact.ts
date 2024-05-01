export const FormInput = () => {
  const formInput = [
    {
      name: "name",
      title: "Name",
      placeholder: "Enter name",
      icon: "account",
    },
    {
      name: "job_title",
      title: "Job title",
      placeholder: "Enter job title",
      icon: "briefcase",
    },
    {
      name: "company",
      title: "Company",
      placeholder: "Enter company",
      icon: "office-building",
    },
    {
      name: "phone",
      title: "Phone",
      placeholder: "Enter phone",
      icon: "cellphone",
      keyboardType: "phone-pad",
    },
    {
      name: "email",
      title: "Email",
      placeholder: "Enter email",
      icon: "email",
      keyboardType: "email-address",
    },
    {
      name: "fax",
      title: "Fax",
      placeholder: "Enter fax",
      icon: "fax",
      keyboardType: "phone-pad",
    },
    {
      name: "address",
      title: "Address",
      placeholder: "Enter address",
      icon: "map-marker",
      multiline: true,
    },
    {
      name: "note",
      title: "Note",
      placeholder: "Enter note",
      icon: "text-box",
      multiline: true,
    },
    {
      name: "website",
      title: "Website",
      placeholder: "Enter website",
      icon: "web",
      keyboardType: "url",
    },
  ];
  return formInput;
};
