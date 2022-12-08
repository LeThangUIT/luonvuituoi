import React from "react";
import Checkbox from "./formikCustomControl/CheckBox";
import Datetimepicker from "./formikCustomControl/DatetimePicker";
import DependentSelect from "./formikCustomControl/DependentSelect";
import EditorInput from "./formikCustomControl/EditorInput";
import ImagesInput from "./formikCustomControl/ImagesInput";
import Input from "./formikCustomControl/Input";
import Radiobutton from "./formikCustomControl/RadioButton";
import Select from "./formikCustomControl/Select";
import Textarea from "./formikCustomControl/Textarea";

const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest}></Input>;
    case "editorInput":
      return <EditorInput {...rest}></EditorInput>;
    case "imagesInput":
      return <ImagesInput {...rest}></ImagesInput>
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "dependentSelect":
      return <DependentSelect {...rest} />
    case "radio":
      return <Radiobutton {...rest} />;
    case "checkbox":
      return <Checkbox {...rest} />;
    case "time":
      return <Datetimepicker {...rest} />
    default:
      return null;
  }
};

export default FormikControl;
