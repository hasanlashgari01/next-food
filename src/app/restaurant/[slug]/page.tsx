import Info from "../_components/Info";
import ModalMoreInfo from "../_components/ModalMoreInfo";

export const dynamic = "force-dynamic";

async function getData({ slug }: { slug: string }) {
  const res = await fetch(`http://localhost:5000/api/restaurant/slug/${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { restaurant, menu } = await getData({ slug });

  return (
    <div>
      <div className="container">
        <section className="mt-8">
          <aside>
            <div className="flex items-start justify-between">
              <Info
                logo={restaurant.logo}
                cover={restaurant.cover}
                name={restaurant.name}
                score={restaurant.score}
                count={0}
              />
              <ModalMoreInfo restaurantId={restaurant._id} />
            </div>
          </aside>
          <main></main>
        </section>
      </div>
    </div>
  );
};

export default page;
