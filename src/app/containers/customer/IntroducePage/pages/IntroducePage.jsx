import React from "react";
import { Body } from "../../../../sharedComponents/body";
import { Heading26 } from "../../../../sharedComponents/text";
import { ContentContainer, HeadingTitle } from "../../HomePage/components/content";
import { UilAngleRightB } from "@iconscout/react-unicons";


function IntroducePage() {

  return (
    <Body>
      <ContentContainer>
        <HeadingTitle>
          <Heading26>Giới thiệu</Heading26>
          <UilAngleRightB></UilAngleRightB>
        </HeadingTitle>
      </ContentContainer>
    </Body>
  );
}

export default IntroducePage;
