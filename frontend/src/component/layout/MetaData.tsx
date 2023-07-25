import React from "react";
import { Helmet } from "react-helmet";

interface MetaDataProps {
  title: string;
}

const MetaData: React.FC<MetaDataProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaData;
