import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import CategoryApi from "../../../../api/categoryApi";
import { PinkButton } from "../../../../sharedComponents/button";
import { toast } from "react-toastify";

import {
  ButtonClose,
  ModalBackground,
  ModalContainer,
  ModalFooter,
  ModalTitle,
} from "../../../../sharedComponents/modal";
import { Heading22 } from "../../../../sharedComponents/text";
import ProductApi from "../../../../api/productApi";
import VoucherApi from "../../../../api/voucherApi";

const Labell = styled.label`
  ${tw`w-[100px] p-4 rounded-lg border border-dashed`}
`;
const ImportModal = ({ typeModal, setShowImport }) => {
  const adminToken = localStorage.getItem("adminToken");
  const handleClose = () => {
    setShowImport(false);
  };

  const [selectedFile, setSelectedFile] = useState();

  const onSubmit = async () => {
    let formData = new FormData();
    formData.append("file", selectedFile);
    let res;
    switch (typeModal) {
      case "category":
        res = await CategoryApi.importFile({ formData, adminToken });
        break;
      case "product":
        res = await ProductApi.importFile({ formData, adminToken });
        break;
      case "voucher":
        res = await VoucherApi.importFile({ formData, adminToken });
        break;
      default:
      // code block
    }
    if (res.data.success) {
      setShowImport(false);
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setShowImport(false);
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <ModalBackground>
      <ModalContainer>
        <ButtonClose onClick={() => handleClose()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
          </svg>
        </ButtonClose>
        <ModalTitle>
          <Heading22>Import file</Heading22>
        </ModalTitle>
        <form>
          <label>
            <input
              // value={selectedFile}
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className=""
              type="file"
              accept=".xlsx"
            ></input>
          </label>
        </form>
        <ModalFooter>
          <PinkButton onClick={onSubmit}>Import</PinkButton>
        </ModalFooter>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ImportModal;
