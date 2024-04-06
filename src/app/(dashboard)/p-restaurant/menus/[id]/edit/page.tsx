import Form from "../../_components/Form";

interface Props {
  params: {
    id: string;
  };
}

const page: React.FC<Props> = ({ params: { id } }) => {
  return <Form isEdit={true} id={id} />;
};

export default page;
