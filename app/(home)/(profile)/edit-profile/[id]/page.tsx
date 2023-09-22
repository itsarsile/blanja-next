import EditProfileCards from "./EditProfileCards";

export default async function Profile({ params }: { params: { id: number } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${params.id}`)
  const user = await res.json()
  return (
    <div className="p-10">
      <EditProfileCards user={user.userWithoutPassword}/>
    </div>
  );
}