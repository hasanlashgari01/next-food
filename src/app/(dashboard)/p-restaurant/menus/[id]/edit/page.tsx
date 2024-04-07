import { getMenuById } from "@/server-actions/restaurantAction";
import Form from "../../_components/Form";

interface Props {
  params: {
    id: string;
  };
}

export const dynamic = "force-dynamic";

const page: React.FC<Props> = async ({ params: { id } }) => {
  const { title, slug } = await getMenuById(id);

  return <Form isEdit={true} id={id} title={title} slug={slug} />;
};

export default page;
