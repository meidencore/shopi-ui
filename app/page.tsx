import getMe from "./get-me";

export default async function Home() {
  const me = await getMe();
  console.log(me);
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}
