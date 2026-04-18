import { useParams } from "react-router";
export default function Article() {
  const { slug } = useParams();
  return <h1 className="text-3xl font-bold">Article: {slug}</h1>;
}
