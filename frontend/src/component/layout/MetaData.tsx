import { Helmet } from "react-helmet";

interface MetaDataProps {
  title: string;
}

const MetaData = ({ title }: MetaDataProps) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaData;
