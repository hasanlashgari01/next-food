import { getFoodById } from "@/server-actions/restaurantAction";
import Form from "../../_components/Form";

interface Props {
  params: {
    id: string;
  };
}

export const dynamic = "force-dynamic";

const page: React.FC<Props> = async ({ params: { id } }) => {
  const food = await getFoodById(id);

  return <Form isEdit={true} id={id} data={food} />;
};

export default page;
